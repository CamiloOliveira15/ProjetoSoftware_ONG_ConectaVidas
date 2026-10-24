"""
Carga Inicial de Dados (Seed) — Projeto Conecta Vidas
Cria as tabelas e popula com os cenários reais da comunidade (ACPV),
suportando credenciais pedagógicas da bancada acadêmica e de homologação.
"""

from datetime import datetime, timezone
from backend.database import Base, SessionLocal, engine
from backend.models import Entrega, EstoqueDonativo, FamiliaAssistida, ItemEntrega, Voluntario
from backend.auth import gerar_hash_senha


def inicializar_banco():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # 1. Usuários da Coordenação e Voluntários de Campo
        usuarios_seed = [
            # Maria da Conceição Santos (Coordenação) - E-mail padrão e alias acadêmico
            {
                "nome_completo": "Maria da Conceição Santos",
                "email": "maria.coordenadora@conectavidas.org",
                "telefone_celular": "(11) 98765-4321",
                "senha": "admin123",
                "perfil": "COORDENADOR"
            },
            {
                "nome_completo": "Maria Silva (Coordenação Geral)",
                "email": "maria.coordenacao@conectavidas.org.br",
                "telefone_celular": "(11) 98765-4321",
                "senha": "SenhaMestre#2026",
                "perfil": "COORDENADOR"
            },
            # João Batista (Voluntário) - E-mail padrão e alias acadêmico
            {
                "nome_completo": "João Batista",
                "email": "joao.voluntario@conectavidas.org",
                "telefone_celular": "(11) 91234-5678",
                "senha": "12345678",
                "perfil": "VOLUNTARIO"
            },
            {
                "nome_completo": "João Batista (Voluntário de Rota)",
                "email": "joao.voluntario@conectavidas.org.br",
                "telefone_celular": "(11) 91234-5678",
                "senha": "VoluntarioForte#2026",
                "perfil": "VOLUNTARIO"
            }
        ]

        for u in usuarios_seed:
            existente = db.query(Voluntario).filter(Voluntario.email == u["email"]).first()
            if not existente:
                db.add(Voluntario(
                    nome_completo=u["nome_completo"],
                    email=u["email"],
                    telefone_celular=u["telefone_celular"],
                    hash_senha=gerar_hash_senha(u["senha"]),
                    status_ativo=True,
                    perfil=u["perfil"]
                ))
            else:
                # Atualiza a senha para garantir validade imediata
                existente.hash_senha = gerar_hash_senha(u["senha"])
                existente.status_ativo = True
        db.commit()

        # 2. Estoque de Donativos
        if db.query(EstoqueDonativo).count() == 0:
            cestas = EstoqueDonativo(
                descricao_item="Cestas Básicas",
                quantidade_disponivel=15,
                perecivel=True,
                data_validade="2026-11-30"
            )
            higiene = EstoqueDonativo(
                descricao_item="Kits Higiene",
                quantidade_disponivel=28,
                perecivel=False,
                data_validade=None
            )
            leite = EstoqueDonativo(
                descricao_item="Leite em Pó Integral",
                quantidade_disponivel=40,
                perecivel=True,
                data_validade="2026-12-15"
            )
            db.add_all([cestas, higiene, leite])
            db.commit()

        # 3. Famílias Assistidas
        if db.query(FamiliaAssistida).count() == 0:
            f1 = FamiliaAssistida(
                nome_responsavel="Dona Sebastiana de Jesus",
                endereco_completo="Rua da Esperança, 142 - Jardim Helena, São Paulo - SP",
                telefone_contato="(11) 97111-2233",
                quantidade_membros=5
            )
            f2 = FamiliaAssistida(
                nome_responsavel="Antônio Carlos Ferreira",
                endereco_completo="Travessa das Palmeiras, 58 - Itaim Paulista, São Paulo - SP",
                telefone_contato="(11) 98222-3344",
                quantidade_membros=3
            )
            f3 = FamiliaAssistida(
                nome_responsavel="Francisca Alves dos Santos",
                endereco_completo="Rua Boa Vista, 210 - São Miguel Paulista, São Paulo - SP",
                telefone_contato="(11) 99333-4455",
                quantidade_membros=6
            )
            db.add_all([f1, f2, f3])
            db.commit()

        # 4. Entrega Inicial para Demonstração
        if db.query(Entrega).count() == 0:
            vol = db.query(Voluntario).filter(Voluntario.perfil == "VOLUNTARIO").first()
            fam = db.query(FamiliaAssistida).first()
            item = db.query(EstoqueDonativo).first()

            if vol and fam and item:
                entrega_demo = Entrega(
                    id_voluntario=vol.id_voluntario,
                    id_familia=fam.id_familia,
                    data_agendada=datetime.now(timezone.utc).strftime("%d/%m/%Y"),
                    status="Pendente"
                )
                db.add(entrega_demo)
                db.flush()

                item_entrega = ItemEntrega(
                    id_entrega=entrega_demo.id_entrega,
                    id_item=item.id_item,
                    quantidade=2
                )
                db.add(item_entrega)
                db.commit()

    finally:
        db.close()


if __name__ == "__main__":
    inicializar_banco()
    print("[OK] Banco de dados populado com sucesso!")
