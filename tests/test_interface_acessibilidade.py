"""
Testes Automatizados de Integridade e Acessibilidade do Front-End (RNF04 e WCAG AA)
Projeto de Software — ONG Conecta Vidas
Autor: Camilo Caetano Pinheiro de Oliveira
"""

import os
import re
import pytest

DIRETORIO_RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def carregar_html(nome_arquivo: str) -> str:
    caminho = os.path.join(DIRETORIO_RAIZ, nome_arquivo)
    assert os.path.exists(caminho), f"Arquivo obrigatório '{nome_arquivo}' não encontrado."
    with open(caminho, "r", encoding="utf-8") as f:
        return f.read()


def test_arquivos_mvp_existem():
    """Verifica a presença dos arquivos HTML fundamentais do fluxo."""
    arquivos_esperados = [
        "Login.html",
        "Escala.html",
        "Confirmacao.html",
        "Coordenador.html",
        "EscalaConcluida.html"
    ]
    for arquivo in arquivos_esperados:
        caminho = os.path.join(DIRETORIO_RAIZ, arquivo)
        assert os.path.isfile(caminho), f"Arquivo '{arquivo}' ausente no repositório."


def test_rnf04_rotulos_persistentes_login():
    """RNF04: O Login deve conter tags <label> explícitas e associadas aos campos para acessibilidade."""
    html = carregar_html("Login.html")
    assert "<label" in html, "A tela de Login deve conter rótulos <label> explícitos."
    assert 'for="email"' in html, "Label de e-mail deve estar associado programaticamente ao input."
    assert 'for="password"' in html, "Label de senha deve estar associado programaticamente ao input."


def test_rnf04_areas_de_toque_minimas_44px():
    """RNF04: Todos os botões interativos principais devem ter altura mínima >= 44px (min-h-[4...])."""
    arquivos = ["Login.html", "Escala.html", "Confirmacao.html", "Coordenador.html"]
    padrao_min_h = re.compile(r'min-h-\[(4[4-9]|5[0-9])px\]')

    for arquivo in arquivos:
        html = carregar_html(arquivo)
        matches = padrao_min_h.findall(html)
        assert len(matches) >= 1, f"O arquivo {arquivo} deve conter classes de área de toque mínima >= 44px."


def test_rnf04_independencia_de_cor_alerta():
    """RNF04 / ODS 2: O alerta de sucesso deve conter texto afirmativo e símbolo visual explícito."""
    html = carregar_html("Confirmacao.html")
    assert "Entrega Concluída com Sucesso!" in html, "Alerta deve ter texto explicativo afirmativo."
    assert "<svg" in html, "Alerta deve ter ícone visual explícito garantindo independência de cor."


def test_rf04_link_direto_para_gps():
    """RF04: A tela de escala deve possuir link para despacho de rota no Google Maps com target='_blank'."""
    html = carregar_html("Escala.html")
    assert "google.com/maps/search/?api=1" in html, "Link de navegação GPS deve estar presente na Escala."
    assert 'target="_blank"' in html, "Link do mapa deve abrir externamente sem fechar a escala."
