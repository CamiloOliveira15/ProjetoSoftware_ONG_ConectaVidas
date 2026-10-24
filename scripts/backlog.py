#!/usr/bin/env python3
"""
CLI de Gerenciamento do Backlog-as-Code — Projeto Conecta Vidas.

Inspirado na governança canônica do LegalSync e adaptado para o ciclo
acadêmico de Engenharia de Software (Cruzeiro do Sul / ACPV).

Utiliza estritamente a biblioteca padrão do Python (sem dependências externas).
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

# Garante suporte a UTF-8 em consoles Windows (cp1252)
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = Path(__file__).resolve().parent.parent
BACKLOG_FILE = BASE_DIR / "backlog" / "controle_backlog.json"


def carregar_backlog() -> dict:
    if not BACKLOG_FILE.exists():
        print(f"Erro: Arquivo '{BACKLOG_FILE}' não encontrado.", file=sys.stderr)
        sys.exit(1)
    with open(BACKLOG_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def salvar_backlog(dados: dict) -> None:
    # Recalcula métricas consolidadas
    itens = dados.get("itens_backlog", [])
    total = len(itens)
    concluidos = sum(1 for i in itens if i.get("status") in ("Concluído", "completed"))
    planejados = sum(1 for i in itens if i.get("status") in ("Planejado", "planned"))
    pts_concluidos = sum(i.get("pontos_historia", 0) for i in itens if i.get("status") in ("Concluído", "completed"))
    pts_futuros = sum(i.get("pontos_historia", 0) for i in itens if i.get("status") in ("Planejado", "planned"))

    if "projeto" in dados and "metricas_consolidadas" in dados["projeto"]:
        dados["projeto"]["metricas_consolidadas"]["total_itens_backlog"] = total
        dados["projeto"]["metricas_consolidadas"]["itens_concluidos"] = concluidos
        dados["projeto"]["metricas_consolidadas"]["itens_planejados_futuro"] = planejados
        dados["projeto"]["metricas_consolidadas"]["pontos_historia_concluidos"] = pts_concluidos
        dados["projeto"]["metricas_consolidadas"]["pontos_historia_futuros"] = pts_futuros

    with open(BACKLOG_FILE, "w", encoding="utf-8") as f:
        json.dump(dados, f, indent=2, ensure_ascii=False)
        f.write("\n")


def cmd_list(args):
    dados = carregar_backlog()
    itens = dados.get("itens_backlog", [])
    print(f"\n📦 Backlog do Projeto: {dados.get('projeto', {}).get('nome', '')}")
    print(f"{'ID':<8} {'Marco':<6} {'Prioridade':<12} {'Status':<15} {'Pts':<4} {'Título'}")
    print("-" * 80)
    for i in itens:
        status = i.get("status", "N/A")
        print(f"{i.get('id', ''):<8} {i.get('marco', ''):<6} {i.get('prioridade', ''):<12} {status:<15} {i.get('pontos_historia', 0):<4} {i.get('titulo', '')[:45]}")
    metricas = dados.get("projeto", {}).get("metricas_consolidadas", {})
    print("-" * 80)
    print(f"Total: {metricas.get('total_itens_backlog', len(itens))} | Concluídos: {metricas.get('itens_concluidos', 0)} | Pontos Entregues: {metricas.get('pontos_historia_concluidos', 0)}\n")


def cmd_start(args):
    dados = carregar_backlog()
    target_id = args.id.upper()
    item = next((i for i in dados.get("itens_backlog", []) if i.get("id").upper() == target_id), None)
    if not item:
        print(f"Erro: Item '{target_id}' não encontrado no backlog.", file=sys.stderr)
        sys.exit(1)

    status_atual = item.get("status")
    if status_atual in ("Concluído", "completed"):
        print(f"Aviso: O item '{target_id}' já está homologado e concluído. Não foi alterado.")
        return

    item["status"] = "Em Andamento"
    salvar_backlog(dados)
    print(f"✅ Item '{target_id}' ({item.get('titulo')}) atualizado para 'Em Andamento'.")


def cmd_close(args):
    dados = carregar_backlog()
    target_id = args.id.upper()
    item = next((i for i in dados.get("itens_backlog", []) if i.get("id").upper() == target_id), None)
    if not item:
        print(f"Erro: Item '{target_id}' não encontrado no backlog.", file=sys.stderr)
        sys.exit(1)

    print(f"\n🧪 Executando portão de validação e testes automatizados para fechar '{target_id}'...")
    res = subprocess.run([sys.executable, "-m", "pytest", "-v", "--tb=short"], cwd=BASE_DIR)
    if res.returncode != 0:
        print(f"\n🚨 BLOQUEIO: Os testes automatizados falharam. O item '{target_id}' NÃO foi fechado.", file=sys.stderr)
        sys.exit(res.returncode)

    item["status"] = "Concluído"
    salvar_backlog(dados)
    print(f"\n🎉 SUCESSO: Todos os testes passaram! Item '{target_id}' homologado e encerrado como 'Concluído'.")


def cmd_finding(args):
    dados = carregar_backlog()
    itens = dados.get("itens_backlog", [])
    # Determina próximo ID
    max_num = 0
    for i in itens:
        part = i.get("id", "").replace("BK-", "")
        if part.isdigit():
            max_num = max(max_num, int(part))
    novo_id = f"BK-{max_num + 1:03d}"

    novo_item = {
        "id": novo_id,
        "epic_id": args.epic or "EPIC-12",
        "marco": "EP5_FUTURO",
        "codigo_requisito": f"ACHADO-{max_num + 1:03d}",
        "titulo": args.titulo,
        "tipo": "Achado / Débito Técnico",
        "prioridade": args.prioridade,
        "status": "Planejado",
        "pontos_historia": args.pontos,
        "user_story": f"Como stakeholder, identificou-se a necessidade de {args.titulo.lower()}.",
        "criterios_aceite": [args.descricao],
        "artefatos_relacionados": [],
        "indicador_ods": "Sustentabilidade e Confiabilidade"
    }

    itens.append(novo_item)
    salvar_backlog(dados)
    print(f"✅ Novo achado registrado com sucesso: {novo_id} - '{args.titulo}' (Status: Planejado).")


def cmd_validate(args):
    dados = carregar_backlog()
    itens = dados.get("itens_backlog", [])
    print("\n🔍 Validando integridade de backlog/controle_backlog.json...")
    erros = []
    ids_vistos = set()
    for idx, item in enumerate(itens):
        item_id = item.get("id")
        if not item_id:
            erros.append(f"Item #{idx} sem ID.")
        elif item_id in ids_vistos:
            erros.append(f"ID duplicado: {item_id}.")
        ids_vistos.add(item_id)

        for campo in ("titulo", "prioridade", "status", "epic_id"):
            if not item.get(campo):
                erros.append(f"Item {item_id} sem campo obrigatório '{campo}'.")

    if erros:
        print(f"🚨 {len(erros)} inconsistência(s) encontrada(s):", file=sys.stderr)
        for e in erros:
            print(f"  - {e}", file=sys.stderr)
        sys.exit(1)

    print(f"✅ Backlog 100% íntegro e consistente! {len(itens)} itens validados sem erros.\n")


def main():
    parser = argparse.ArgumentParser(description="CLI do Backlog-as-Code — Projeto Conecta Vidas")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list
    p_list = subparsers.add_parser("list", help="Lista todos os itens do backlog")
    p_list.set_defaults(func=cmd_list)

    # start
    p_start = subparsers.add_parser("start", help="Ativa um item para 'Em Andamento'")
    p_start.add_argument("id", help="Identificador do item (ex: BK-009)")
    p_start.set_defaults(func=cmd_start)

    # close
    p_close = subparsers.add_parser("close", help="Executa testes e homologa fechamento do item")
    p_close.add_argument("id", help="Identificador do item (ex: BK-009)")
    p_close.set_defaults(func=cmd_close)

    # finding
    p_finding = subparsers.add_parser("finding", help="Registra um achado ou débito técnico")
    p_finding.add_argument("--titulo", required=True, help="Título do achado")
    p_finding.add_argument("--descricao", required=True, help="Descrição técnica")
    p_finding.add_argument("--epic", default="EPIC-12", help="ID do épico relacionado")
    p_finding.add_argument("--prioridade", default="Could Have", choices=["Must Have", "Should Have", "Could Have"])
    p_finding.add_argument("--pontos", type=int, default=3, help="Estimativa de Story Points")
    p_finding.set_defaults(func=cmd_finding)

    # validate
    p_validate = subparsers.add_parser("validate", help="Valida a consistência do JSON de controle")
    p_validate.set_defaults(func=cmd_validate)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
