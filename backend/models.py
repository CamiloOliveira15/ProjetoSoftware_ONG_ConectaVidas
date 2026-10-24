"""
Modelos de Dados Relacionais em 3FN — Projeto Conecta Vidas
Em conformidade com a Modelagem Relacional da Experiência Prática II.
"""

from sqlalchemy import Boolean, CheckConstraint, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from backend.database import Base


class Voluntario(Base):
    __tablename__ = "voluntarios"

    id_voluntario = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome_completo = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    telefone_celular = Column(String(20), nullable=False)
    hash_senha = Column(String(255), nullable=False)
    status_ativo = Column(Boolean, default=True, nullable=False)
    perfil = Column(String(20), default="VOLUNTARIO", nullable=False)  # COORDENADOR ou VOLUNTARIO

    entregas = relationship("Entrega", back_populates="voluntario")


class EstoqueDonativo(Base):
    __tablename__ = "estoque_donativos"

    id_item = Column(Integer, primary_key=True, index=True, autoincrement=True)
    descricao_item = Column(String(100), nullable=False)
    quantidade_disponivel = Column(Integer, nullable=False, default=0)
    perecivel = Column(Boolean, default=False, nullable=False)
    data_validade = Column(String(20), nullable=True)

    __table_args__ = (
        CheckConstraint("quantidade_disponivel >= 0", name="chk_estoque_nao_negativo"),
    )

    itens_entrega = relationship("ItemEntrega", back_populates="item_estoque")


class FamiliaAssistida(Base):
    __tablename__ = "familias_assistidas"

    id_familia = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nome_responsavel = Column(String(100), nullable=False)
    endereco_completo = Column(String(200), nullable=False)
    telefone_contato = Column(String(20), nullable=False)
    quantidade_membros = Column(Integer, default=1, nullable=False)

    entregas = relationship("Entrega", back_populates="familia")


class Entrega(Base):
    __tablename__ = "entregas"

    id_entrega = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_voluntario = Column(Integer, ForeignKey("voluntarios.id_voluntario"), nullable=False)
    id_familia = Column(Integer, ForeignKey("familias_assistidas.id_familia"), nullable=False)
    data_agendada = Column(String(30), nullable=False)
    status = Column(String(20), default="Pendente", nullable=False)  # Pendente, Concluido, Cancelado
    concluido_em = Column(String(30), nullable=True)

    __table_args__ = (
        CheckConstraint("status IN ('Pendente', 'Concluido', 'Cancelado')", name="chk_status_valido"),
    )

    voluntario = relationship("Voluntario", back_populates="entregas")
    familia = relationship("FamiliaAssistida", back_populates="entregas")
    itens = relationship("ItemEntrega", back_populates="entrega", cascade="all, delete-orphan")


class ItemEntrega(Base):
    __tablename__ = "itens_entrega"

    id_item_entrega = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_entrega = Column(Integer, ForeignKey("entregas.id_entrega"), nullable=False)
    id_item = Column(Integer, ForeignKey("estoque_donativos.id_item"), nullable=False)
    quantidade = Column(Integer, nullable=False, default=1)

    __table_args__ = (
        CheckConstraint("quantidade > 0", name="chk_quantidade_positiva"),
    )

    entrega = relationship("Entrega", back_populates="itens")
    item_estoque = relationship("EstoqueDonativo", back_populates="itens_entrega")
