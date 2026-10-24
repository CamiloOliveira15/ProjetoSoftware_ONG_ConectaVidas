"""
Suíte de Testes Automatizados da API RESTful FastAPI — Projeto Conecta Vidas
Valida endpoints, contratos DTOs, autenticação JWT, integridade referencial e invariantes.
"""

import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.seed import inicializar_banco

client = TestClient(app)


@pytest.fixture(autouse=True)
def setup_db():
    inicializar_banco()


def obter_token(email: str, password: str) -> str:
    res = client.post("/api/auth/login", json={"email": email, "password": password})
    assert res.status_code == 200
    return res.json()["access_token"]


def test_api_health():
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "UP"
    assert data["banco_conectado"] is True


def test_api_login_voluntario_sucesso():
    res = client.post("/api/auth/login", json={"email": "joao.voluntario@conectavidas.org", "password": "12345678"})
    assert res.status_code == 200
    data = res.json()
    assert "access_token" in data
    assert data["usuario"]["perfil"] == "VOLUNTARIO"
    assert data["usuario"]["nome_completo"] == "João Batista"


def test_api_login_coordenador_sucesso():
    res = client.post("/api/auth/login", json={"email": "maria.coordenadora@conectavidas.org", "password": "admin123"})
    assert res.status_code == 200
    data = res.json()
    assert data["usuario"]["perfil"] == "COORDENADOR"


def test_api_login_credenciais_invalidas():
    res = client.post("/api/auth/login", json={"email": "joao.voluntario@conectavidas.org", "password": "senha-errada"})
    assert res.status_code == 401
    assert "E-mail ou senha incorretos" in res.json()["detail"]


def test_api_rf02_isolamento_escala_voluntario():
    token_joao = obter_token("joao.voluntario@conectavidas.org", "12345678")
    res = client.get("/api/entregas", headers={"Authorization": f"Bearer {token_joao}"})
    assert res.status_code == 200
    entregas = res.json()
    assert len(entregas) >= 1
    for e in entregas:
        assert e["voluntario_nome"] == "João Batista"
        assert "link_gps" in e
        assert "google.com/maps" in e["link_gps"]


def test_api_rf01_atribuicao_e_debito_estoque():
    token_coord = obter_token("maria.coordenadora@conectavidas.org", "admin123")

    # Obter estoque atual de leite em pó (id 3)
    res_est = client.get("/api/estoque", headers={"Authorization": f"Bearer {token_coord}"})
    assert res_est.status_code == 200
    estoque_inicial = next(i for i in res_est.json() if i["id_item"] == 3)
    qtd_inicial = estoque_inicial["quantidade_disponivel"]

    # Atribuir entrega com 2 latas de leite
    payload = {
        "id_voluntario": 2,  # João
        "id_familia": 2,     # Família Santos
        "demandas": [{"id_item": 3, "quantidade": 2}]
    }
    res_post = client.post("/api/entregas", json=payload, headers={"Authorization": f"Bearer {token_coord}"})
    assert res_post.status_code == 201
    nova_entrega = res_post.json()
    assert nova_entrega["status"] == "Pendente"
    assert nova_entrega["familia_nome"] == "Família Santos"

    # Verificar que o estoque foi debitado atomicamente
    res_est_pos = client.get("/api/estoque", headers={"Authorization": f"Bearer {token_coord}"})
    estoque_final = next(i for i in res_est_pos.json() if i["id_item"] == 3)
    assert estoque_final["quantidade_disponivel"] == qtd_inicial - 2


def test_api_rf01_bloqueio_estoque_insuficiente():
    token_coord = obter_token("maria.coordenadora@conectavidas.org", "admin123")
    payload = {
        "id_voluntario": 2,
        "id_familia": 3,
        "demandas": [{"id_item": 1, "quantidade": 9999}]  # Excede saldo
    }
    res = client.post("/api/entregas", json=payload, headers={"Authorization": f"Bearer {token_coord}"})
    assert res.status_code == 400
    assert "Estoque insuficiente" in res.json()["detail"]


def test_api_rf03_conclusao_entrega_e_bloqueio_duplicidade():
    token_joao = obter_token("joao.voluntario@conectavidas.org", "12345678")

    # Obter a primeira entrega pendente do João
    res_list = client.get("/api/entregas", headers={"Authorization": f"Bearer {token_joao}"})
    assert res_list.status_code == 200
    entrega_pendente = next((e for e in res_list.json() if e["status"] == "Pendente"), None)
    assert entrega_pendente is not None

    id_entrega = entrega_pendente["id_entrega"]

    # Concluir entrega
    res_patch = client.patch(f"/api/entregas/{id_entrega}/concluir", headers={"Authorization": f"Bearer {token_joao}"})
    assert res_patch.status_code == 200
    dados_concluidos = res_patch.json()
    assert dados_concluidos["status"] == "Concluido"
    assert "UTC" in dados_concluidos["concluido_em"]

    # Idempotência: tentar concluir novamente deve retornar erro 400
    res_dupla = client.patch(f"/api/entregas/{id_entrega}/concluir", headers={"Authorization": f"Bearer {token_joao}"})
    assert res_dupla.status_code == 400
    assert "já foi concluída anteriormente" in res_dupla.json()["detail"]
