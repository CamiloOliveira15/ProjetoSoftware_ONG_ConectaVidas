"""
Módulo de Testes Automatizados Unitários e de Integração
Projeto de Software — ONG Conecta Vidas (Experiência Prática III)
Autor: Camilo Caetano Pinheiro de Oliveira
"""

import pytest


# ==============================================================================
# Modelos e Regras de Negócio do MVP (Alinhadas às Seções 12, 13 e 16 do Relatório)
# ==============================================================================

class EstoqueInsuficienteError(Exception):
    """Exceção levantada quando a quantidade a separar excede o estoque físico."""
    pass


class QuantidadeInvalidaError(ValueError):
    """Exceção levantada quando a quantidade solicitada for menor ou igual a zero."""
    pass


class TransicaoStatusInvalidaError(Exception):
    """Exceção levantada ao tentar alterar status de entrega já finalizada."""
    pass


class ItemEstoque:
    def __init__(self, id_item: int, descricao: str, quantidade: int, perecivel: bool):
        self.id_item = id_item
        self.descricao = descricao
        self.quantidade = quantidade
        self.perecivel = perecivel

    def debitar(self, quantidade: int):
        if not isinstance(quantidade, int) or quantidade <= 0:
            raise QuantidadeInvalidaError(
                f"A quantidade a debitar deve ser um número inteiro positivo. Recebido: {quantidade}"
            )
        if quantidade > self.quantidade:
            raise EstoqueInsuficienteError(
                f"Estoque insuficiente de '{self.descricao}'. Disponível: {self.quantidade}, Solicitado: {quantidade}"
            )
        self.quantidade -= quantidade


class Entrega:
    STATUS_VALIDOS = {"Pendente", "Concluido", "Cancelado"}

    def __init__(self, id_entrega: int, id_voluntario: int, id_familia: int, itens: list):
        self.id_entrega = id_entrega
        self.id_voluntario = id_voluntario
        self.id_familia = id_familia
        self.itens = itens  # Lista de tuplas (ItemEstoque, quantidade)
        self.status = "Pendente"

    def concluir(self):
        if self.status != "Pendente":
            raise TransicaoStatusInvalidaError(
                f"Apenas entregas com status 'Pendente' podem ser concluídas. Status atual: '{self.status}'"
            )
        self.status = "Concluido"

    def gerar_link_gps(self, endereco: str) -> str:
        """RF04 - Geração de link dinâmico para GPS nativo."""
        import urllib.parse
        endereco_encoded = urllib.parse.quote(endereco)
        return f"https://www.google.com/maps/search/?api=1&query={endereco_encoded}"


class ServicoLogistica:
    def __init__(self):
        self.entregas = []

    def atribuir_entrega(self, id_entrega: int, id_voluntario: int, id_familia: int, demandas: list) -> Entrega:
        """RF01 - Coordenador registra entrega e debita estoque com integridade referencial."""
        # Valida e debita todos os itens antes de confirmar o despacho
        for item, qtd in demandas:
            item.debitar(qtd)

        entrega = Entrega(id_entrega, id_voluntario, id_familia, demandas)
        self.entregas.append(entrega)
        return entrega

    def obter_escala_voluntario(self, id_voluntario: int) -> list:
        """RF02 / RNF02 - Filtragem estrita de entregas exclusivas do voluntário autenticado."""
        return [e for e in self.entregas if e.id_voluntario == id_voluntario]


# ==============================================================================
# Suíte de Testes Automatizados (pytest)
# ==============================================================================

def test_rf01_atribuicao_com_estoque_suficiente():
    """RF01: Coordenador atribui 2 cestas e 1 kit higiene com sucesso e debita estoque."""
    servico = ServicoLogistica()
    cestas = ItemEstoque(id_item=1, descricao="Cestas Básicas", quantidade=15, perecivel=True)
    higiene = ItemEstoque(id_item=2, descricao="Kits Higiene", quantidade=28, perecivel=False)

    entrega = servico.atribuir_entrega(
        id_entrega=1042,
        id_voluntario=101,  # João Voluntário
        id_familia=1,       # Família Silva
        demandas=[(cestas, 2), (higiene, 1)]
    )

    assert entrega.status == "Pendente"
    assert cestas.quantidade == 13  # 15 - 2
    assert higiene.quantidade == 27  # 28 - 1
    assert len(servico.entregas) == 1


def test_rf01_bloqueio_quando_estoque_insuficiente():
    """RF01: Sistema deve impedir atribuição caso a demanda exceda o estoque disponível."""
    servico = ServicoLogistica()
    cestas = ItemEstoque(id_item=1, descricao="Cestas Básicas", quantidade=1, perecivel=True)

    with pytest.raises(EstoqueInsuficienteError) as exc_info:
        servico.atribuir_entrega(
            id_entrega=1043,
            id_voluntario=101,
            id_familia=2,
            demandas=[(cestas, 2)]  # Solicita 2 quando só há 1
        )

    assert "Estoque insuficiente" in str(exc_info.value)
    assert cestas.quantidade == 1  # Estoque não foi violado


def test_rf01_bloqueio_quantidade_invalida_zero_ou_negativa():
    """RF01 / Segurança: Impede atribuições com quantidades zero ou negativas (defesa contra falhas)."""
    servico = ServicoLogistica()
    cestas = ItemEstoque(id_item=1, descricao="Cestas Básicas", quantidade=10, perecivel=True)

    with pytest.raises(QuantidadeInvalidaError):
        servico.atribuir_entrega(1044, 101, 2, [(cestas, 0)])

    with pytest.raises(QuantidadeInvalidaError):
        servico.atribuir_entrega(1045, 101, 2, [(cestas, -3)])


def test_rf02_isolamento_de_escala_do_voluntario():
    """RF02 / RNF02: O voluntário deve visualizar exclusivamente a sua própria escala."""
    servico = ServicoLogistica()
    cestas = ItemEstoque(1, "Cesta Básica", 50, True)

    # Cria entrega para João (ID 101) e para Mariana (ID 102)
    servico.atribuir_entrega(1, id_voluntario=101, id_familia=1, demandas=[(cestas, 1)])
    servico.atribuir_entrega(2, id_voluntario=102, id_familia=2, demandas=[(cestas, 1)])

    escala_joao = servico.obter_escala_voluntario(id_voluntario=101)
    
    assert len(escala_joao) == 1
    assert escala_joao[0].id_voluntario == 101
    assert escala_joao[0].id_entrega == 1


def test_rf03_conclusao_de_entrega():
    """RF03: Voluntário conclui a entrega com sucesso, alterando o status para 'Concluido'."""
    cestas = ItemEstoque(1, "Cesta Básica", 10, True)
    entrega = Entrega(id_entrega=1042, id_voluntario=101, id_familia=1, itens=[(cestas, 2)])

    assert entrega.status == "Pendente"
    entrega.concluir()
    assert entrega.status == "Concluido"


def test_rf03_bloqueio_de_conclusao_dupla():
    """RF03: Impede que uma entrega já finalizada seja confirmada novamente."""
    cestas = ItemEstoque(1, "Cesta Básica", 10, True)
    entrega = Entrega(id_entrega=1042, id_voluntario=101, id_familia=1, itens=[(cestas, 2)])
    entrega.concluir()

    with pytest.raises(TransicaoStatusInvalidaError):
        entrega.concluir()


def test_rf04_geracao_link_gps():
    """RF04: Gera URL compatível com Google Maps nativo contendo o endereço da família."""
    entrega = Entrega(1042, 101, 1, [])
    endereco = "Rua das Flores, 123, Bairro Esperança"
    link = entrega.gerar_link_gps(endereco)

    assert "google.com/maps/search/?api=1" in link
    assert "Rua%20das%20Flores" in link
