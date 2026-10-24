"""
Testes Automatizados de Integridade e Acessibilidade do Front-End React (RNF04 e WCAG AA)
Projeto de Software — ONG Conecta Vidas
Autor: Camilo Caetano Pinheiro de Oliveira
"""

import os
import re
import pytest

DIRETORIO_RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_COMPONENTS = os.path.join(DIRETORIO_RAIZ, "frontend", "src", "components")


def carregar_componente(nome_arquivo: str) -> str:
    caminho = os.path.join(FRONTEND_COMPONENTS, nome_arquivo)
    assert os.path.exists(caminho), f"Componente obrigatório '{nome_arquivo}' não encontrado em {FRONTEND_COMPONENTS}."
    with open(caminho, "r", encoding="utf-8") as f:
        return f.read()


def test_arquivos_mvp_existem():
    """Verifica a presença dos componentes React fundamentais do fluxo da aplicação."""
    componentes_esperados = [
        "Login.jsx",
        "EscalaView.jsx",
        "ConfirmacaoModal.jsx",
        "CoordenadorView.jsx",
        "ComprovanteModal.jsx"
    ]
    for comp in componentes_esperados:
        caminho = os.path.join(FRONTEND_COMPONENTS, comp)
        assert os.path.isfile(caminho), f"Componente '{comp}' ausente na pasta do frontend React."


def test_rnf04_rotulos_persistentes_login():
    """RNF04: O Login deve conter tags <label> explícitas e associadas aos campos para acessibilidade."""
    jsx = carregar_componente("Login.jsx")
    assert "<label" in jsx, "A tela de Login deve conter rótulos <label> explícitos."
    assert 'htmlFor="login-email"' in jsx, "Label de e-mail deve estar associado programaticamente ao input."
    assert 'htmlFor="login-password"' in jsx, "Label de senha deve estar associado programaticamente ao input."


def test_rnf04_areas_de_toque_minimas_44px():
    """RNF04: Todos os botões interativos principais devem ter altura mínima >= 44px (min-h-[4...])."""
    componentes = ["Login.jsx", "EscalaView.jsx", "ConfirmacaoModal.jsx", "CoordenadorView.jsx"]
    padrao_min_h = re.compile(r'min-h-\[(4[4-9]|5[0-9])px\]')

    for comp in componentes:
        jsx = carregar_componente(comp)
        matches = padrao_min_h.findall(jsx)
        assert len(matches) >= 1, f"O componente {comp} deve conter classes de área de toque mínima >= 44px."


def test_rnf04_independencia_de_cor_alerta():
    """RNF04 / ODS 2: O alerta e modal devem conter texto afirmativo e símbolo visual explícito."""
    jsx = carregar_componente("ConfirmacaoModal.jsx")
    assert "Confirmar Recebimento da Doação" in jsx or "Confirmar Entrega" in jsx, "Modal deve ter texto afirmativo claro."
    assert "<svg" in jsx, "Modal deve ter ícone visual explícito garantindo independência de cor."


def test_rf04_link_direto_para_gps():
    """RF04: A tela de escala deve possuir link para despacho de rota no Google Maps com target='_blank'."""
    jsx = carregar_componente("EscalaView.jsx")
    assert "google.com/maps/search/?api=1" in jsx, "Link de navegação GPS deve estar presente na Escala."
    assert 'target="_blank"' in jsx, "Link do mapa deve abrir externamente sem fechar a escala."
