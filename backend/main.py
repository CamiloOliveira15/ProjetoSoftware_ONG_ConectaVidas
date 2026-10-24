"""
API RESTful FastAPI — Sistema de Gestão Logística e Voluntariado (ONG Conecta Vidas)
Implementação oficial da stack proposta na Experiência Prática II.
"""

from datetime import datetime, timezone
import urllib.parse
from typing import List, Optional
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from backend.auth import criar_access_token, exigir_coordenador, obter_usuario_atual, verificar_senha
from backend.database import get_db
from backend.models import Entrega, EstoqueDonativo, FamiliaAssistida, ItemEntrega, Voluntario
from backend.schemas import (
    EntregaCreate,
    EntregaResponse,
    EstoqueItemResponse,
    FamiliaResponse,
    ItemEntregaDetailResponse,
    LoginRequest,
    MensagemResponse,
    TokenResponse,
    UsuarioResponse,
    VoluntarioSimpleResponse,
)
from backend.seed import inicializar_banco

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    inicializar_banco()
    yield

app = FastAPI(
    title="ONG Conecta Vidas — API Logística e Voluntariado",
    description="API RESTful oficial para gestão de estoque físico, escalas de voluntários e rotas da última milha.",
    version="2.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:4173",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------------- #
# Health Check e Diagnóstico
# --------------------------------------------------------------------------- #
@app.get("/api/health", tags=["Monitoramento"])
def health_check(db: Session = Depends(get_db)):
    try:
        vol_count = db.query(Voluntario).count()
        return {
            "status": "UP",
            "projeto": "ONG Conecta Vidas",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "banco_conectado": True,
            "total_voluntarios": vol_count
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Falha de integridade na conexão com o banco: {str(e)}"
        )


# --------------------------------------------------------------------------- #
# Autenticação e Perfil (RNF01)
# --------------------------------------------------------------------------- #
@app.post("/api/auth/login", response_model=TokenResponse, tags=["Autenticação"])
def login(dados: LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(Voluntario).filter(Voluntario.email == dados.email.lower().strip()).first()
    if not usuario or not verificar_senha(dados.password, usuario.hash_senha):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos."
        )

    if not usuario.status_ativo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cadastro de voluntário inativo. Contate a coordenação."
        )

    token = criar_access_token(dados={"sub": usuario.email, "role": usuario.perfil, "id": usuario.id_voluntario})
    return {
        "access_token": token,
        "token_type": "bearer",
        "usuario": usuario
    }


@app.get("/api/auth/me", response_model=UsuarioResponse, tags=["Autenticação"])
def obter_meu_perfil(usuario: Voluntario = Depends(obter_usuario_atual)):
    return usuario


# --------------------------------------------------------------------------- #
# Estoque de Donativos (RF01)
# --------------------------------------------------------------------------- #
@app.get("/api/estoque", response_model=List[EstoqueItemResponse], tags=["Estoque"])
def listar_estoque(db: Session = Depends(get_db), _: Voluntario = Depends(obter_usuario_atual)):
    return db.query(EstoqueDonativo).order_by(EstoqueDonativo.id_item).all()


# --------------------------------------------------------------------------- #
# Voluntários e Famílias (Gestão da Sede)
# --------------------------------------------------------------------------- #
@app.get("/api/voluntarios", response_model=List[VoluntarioSimpleResponse], tags=["Coordenação"])
def listar_voluntarios(db: Session = Depends(get_db), _: Voluntario = Depends(exigir_coordenador)):
    return db.query(Voluntario).filter(Voluntario.status_ativo == True).all()


@app.get("/api/familias", response_model=List[FamiliaResponse], tags=["Coordenação"])
def listar_familias(db: Session = Depends(get_db), _: Voluntario = Depends(exigir_coordenador)):
    return db.query(FamiliaAssistida).all()


# --------------------------------------------------------------------------- #
# Entregas, Escalas e Roteirização (RF01, RF02, RF03, RF04)
# --------------------------------------------------------------------------- #
def formatar_entrega_response(e: Entrega) -> dict:
    itens_formatados = []
    for item in e.itens:
        itens_formatados.append({
            "id_item_entrega": item.id_item_entrega,
            "id_item": item.id_item,
            "descricao_item": item.item_estoque.descricao_item if item.item_estoque else "Item",
            "quantidade": item.quantidade
        })

    end_encoded = urllib.parse.quote(e.familia.endereco_completo)
    link_gps = f"https://www.google.com/maps/search/?api=1&query={end_encoded}"

    return {
        "id_entrega": e.id_entrega,
        "id_voluntario": e.id_voluntario,
        "voluntario_nome": e.voluntario.nome_completo if e.voluntario else "N/A",
        "id_familia": e.id_familia,
        "familia_nome": e.familia.nome_responsavel if e.familia else "N/A",
        "endereco_completo": e.familia.endereco_completo if e.familia else "N/A",
        "telefone_contato": e.familia.telefone_contato if e.familia else "N/A",
        "data_agendada": e.data_agendada,
        "status": e.status,
        "concluido_em": e.concluido_em,
        "link_gps": link_gps,
        "itens": itens_formatados
    }


@app.get("/api/entregas", response_model=List[EntregaResponse], tags=["Entregas"])
def listar_entregas(
    id_voluntario: Optional[int] = None,
    status_filtro: Optional[str] = None,
    usuario: Voluntario = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    query = db.query(Entrega)

    # Se for voluntário de campo, aplica ISOLAMENTO ESTRITO (RF02 / OWASP A01)
    if usuario.perfil == "VOLUNTARIO":
        query = query.filter(Entrega.id_voluntario == usuario.id_voluntario)
    else:
        # Coordenador pode filtrar por voluntário se desejar
        if id_voluntario:
            query = query.filter(Entrega.id_voluntario == id_voluntario)

    if status_filtro:
        query = query.filter(Entrega.status == status_filtro)

    entregas = query.order_by(Entrega.id_entrega.desc()).all()
    return [formatar_entrega_response(e) for e in entregas]


@app.post("/api/entregas", response_model=EntregaResponse, status_code=status.HTTP_201_CREATED, tags=["Entregas"])
def criar_atribuicao_entrega(
    dados: EntregaCreate,
    db: Session = Depends(get_db),
    _: Voluntario = Depends(exigir_coordenador)
):
    # RF01: Validação de Voluntário e Família
    voluntario = db.query(Voluntario).filter(Voluntario.id_voluntario == dados.id_voluntario).first()
    if not voluntario:
        raise HTTPException(status_code=404, detail="Voluntário selecionado não encontrado.")

    familia = db.query(FamiliaAssistida).filter(FamiliaAssistida.id_familia == dados.id_familia).first()
    if not familia:
        raise HTTPException(status_code=404, detail="Família selecionada não encontrada.")

    # RF01: Validação Reativa e Atômica de Saldo de Estoque
    itens_para_atualizar = []
    for d in dados.demandas:
        item_estoque = db.query(EstoqueDonativo).filter(EstoqueDonativo.id_item == d.id_item).with_for_update().first()
        if not item_estoque:
            raise HTTPException(status_code=404, detail=f"Item de donativo (ID {d.id_item}) não encontrado no estoque.")

        if d.quantidade <= 0:
            raise HTTPException(status_code=400, detail="A quantidade solicitada deve ser maior que zero.")

        if d.quantidade > item_estoque.quantidade_disponivel:
            raise HTTPException(
                status_code=400,
                detail=f"Estoque insuficiente de '{item_estoque.descricao_item}'. Disponível: {item_estoque.quantidade_disponivel}, Solicitado: {d.quantidade}."
            )
        itens_para_atualizar.append((item_estoque, d.quantidade))

    # Realizar débitos atômicos
    for item_estoque, qtd in itens_para_atualizar:
        item_estoque.quantidade_disponivel -= qtd

    hoje_str = datetime.now(timezone.utc).strftime("%d/%m/%Y")
    nova_entrega = Entrega(
        id_voluntario=dados.id_voluntario,
        id_familia=dados.id_familia,
        data_agendada=hoje_str,
        status="Pendente"
    )
    db.add(nova_entrega)
    db.flush()

    for item_estoque, qtd in itens_para_atualizar:
        item_rel = ItemEntrega(
            id_entrega=nova_entrega.id_entrega,
            id_item=item_estoque.id_item,
            quantidade=qtd
        )
        db.add(item_rel)

    db.commit()
    db.refresh(nova_entrega)
    return formatar_entrega_response(nova_entrega)


@app.patch("/api/entregas/{id_entrega}/concluir", response_model=EntregaResponse, tags=["Entregas"])
def concluir_entrega(
    id_entrega: int,
    usuario: Voluntario = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    entrega = db.query(Entrega).filter(Entrega.id_entrega == id_entrega).first()
    if not entrega:
        raise HTTPException(status_code=404, detail="Entrega não encontrada.")

    # RF02 / Isolamento: Se for voluntário, só pode dar baixa na sua própria entrega
    if usuario.perfil == "VOLUNTARIO" and entrega.id_voluntario != usuario.id_voluntario:
        raise HTTPException(status_code=403, detail="Você não tem permissão para alterar rotas de outros voluntários.")

    # RF03 / Idempotência: Bloqueio estrito de dupla baixa
    if entrega.status == "Concluido":
        raise HTTPException(
            status_code=400,
            detail=f"Esta entrega já foi concluída anteriormente às {entrega.concluido_em or 'horário registrado'}."
        )

    hora_atual = datetime.now(timezone.utc).strftime("%H:%M")
    entrega.status = "Concluido"
    entrega.concluido_em = f"{hora_atual} UTC"
    db.commit()
    db.refresh(entrega)
    return formatar_entrega_response(entrega)
