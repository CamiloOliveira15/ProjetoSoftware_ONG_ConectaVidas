"""
DTOs e Schemas Pydantic para Validação Estrita de Dados — Projeto Conecta Vidas
"""

from typing import List, Optional
from pydantic import BaseModel, ConfigDict, EmailStr, Field


# Autenticação
class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=4)


class UsuarioResponse(BaseModel):
    id_voluntario: int
    nome_completo: str
    email: str
    telefone_celular: str
    perfil: str
    status_ativo: bool

    model_config = ConfigDict(from_attributes=True)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario: UsuarioResponse


# Estoque
class EstoqueItemResponse(BaseModel):
    id_item: int
    descricao_item: str
    quantidade_disponivel: int
    perecivel: bool
    data_validade: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


# Voluntários
class VoluntarioSimpleResponse(BaseModel):
    id_voluntario: int
    nome_completo: str
    email: str
    telefone_celular: str
    perfil: str

    model_config = ConfigDict(from_attributes=True)


# Famílias
class FamiliaResponse(BaseModel):
    id_familia: int
    nome_responsavel: str
    endereco_completo: str
    telefone_contato: str
    quantidade_membros: int

    model_config = ConfigDict(from_attributes=True)


# Itens da Entrega
class ItemDemandaCreate(BaseModel):
    id_item: int
    quantidade: int = Field(..., gt=0, description="Quantidade deve ser maior que zero")


class ItemEntregaDetailResponse(BaseModel):
    id_item_entrega: int
    id_item: int
    descricao_item: str
    quantidade: int

    model_config = ConfigDict(from_attributes=True)


# Entregas
class EntregaCreate(BaseModel):
    id_voluntario: int
    id_familia: int
    demandas: List[ItemDemandaCreate] = Field(..., min_length=1)


class EntregaResponse(BaseModel):
    id_entrega: int
    id_voluntario: int
    voluntario_nome: str
    id_familia: int
    familia_nome: str
    endereco_completo: str
    telefone_contato: str
    data_agendada: str
    status: str
    concluido_em: Optional[str] = None
    link_gps: str
    itens: List[ItemEntregaDetailResponse]

    model_config = ConfigDict(from_attributes=True)


class MensagemResponse(BaseModel):
    sucesso: bool
    mensagem: str
