#!/usr/bin/env python3
"""
Backlog-as-Code CLI — Projeto Conecta Vidas.

Framework de governança ágil baseado nas práticas canônicas do LegalSync.
Sincroniza atomicamente o arquivo de índice JSON (backlog/controle_backlog.json)
e os arquivos individuais Markdown em backlog/BK-XXX-*.md.

Usa estritamente a biblioteca padrão do Python (sem dependências externas).
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import re
import subprocess
import sys
import unicodedata
from dataclasses import dataclass
from pathlib import Path

# Suporte a UTF-8 no Windows PowerShell
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = Path(__file__).resolve().parent.parent
INDEX_FILE = BASE_DIR / "backlog" / "controle_backlog.json"
BACKLOG_DIR = BASE_DIR / "backlog"
TEMPLATE_FILE = BACKLOG_DIR / "_TEMPLATE.md"

FRONTMATTER_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.S)
HTML_COMMENT_RE = re.compile(r"<!--.*?-->", re.S)

STATUS_MAP = {
    "completed": "Concluído",
    "in-progress": "Em Andamento",
    "pending": "Planejado",
    "planned": "Planejado"
}


class BacklogError(Exception):
    """Exceção segura e informativa para comandos de backlog."""
    pass


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_text(path: Path, text: str) -> None:
    path.write_text(text, encoding="utf-8")


def parse_frontmatter(text: str) -> dict[str, str] | None:
    match = FRONTMATTER_RE.match(text)
    if not match:
        return None
    data: dict[str, str] = {}
    for line in match.group(1).splitlines():
        field = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
        if field:
            data[field.group(1)] = field.group(2).strip().strip('"').strip("'")
    return data


def set_frontmatter_status(text: str, status: str) -> str:
    match = FRONTMATTER_RE.match(text)
    if not match:
        raise BacklogError("Arquivo Markdown não possui frontmatter YAML.")
    block = match.group(1)
    new_block, count = re.subn(r"(?m)^status:[^\r\n]*", f'status: "{status}"', block, count=1)
    if count == 0:
        raise BacklogError("Frontmatter não contém o campo 'status'.")
    return text[: match.start(1)] + new_block + text[match.end(1):]


def section_body(text: str, heading: str) -> str | None:
    lines = text.splitlines()
    try:
        start = next(i for i, line in enumerate(lines) if line.strip().lower() == heading.lower())
    except StopIteration:
        return None
    body: list[str] = []
    for line in lines[start + 1:]:
        if line.startswith("## "):
            break
        body.append(line)
    return "\n".join(body)


def has_real_content(body: str | None) -> bool:
    if body is None:
        return False
    return bool(HTML_COMMENT_RE.sub("", body).strip())


def append_to_section(text: str, heading: str, entry: str) -> str:
    newline = "\r\n" if "\r\n" in text else "\n"
    lines = text.splitlines()
    try:
        start = next(i for i, line in enumerate(lines) if line.strip().lower() == heading.lower())
    except StopIteration:
        while lines and not lines[-1].strip():
            lines.pop()
        lines += ["", heading, "", entry]
        return newline.join(lines) + newline
    end = len(lines)
    for i in range(start + 1, len(lines)):
        if lines[i].startswith("## "):
            end = i
            break
    insert_at = end
    while insert_at > start + 1 and not lines[insert_at - 1].strip():
        insert_at -= 1
    lines.insert(insert_at, entry)
    return newline.join(lines) + newline


def slugify(title: str) -> str:
    ascii_title = unicodedata.normalize("NFKD", title).encode("ascii", "ignore").decode()
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_title.lower()).strip("-")
    return slug[:50].rstrip("-") or "item"


def load_index() -> dict:
    if not INDEX_FILE.exists():
        raise BacklogError(f"Arquivo de índice '{INDEX_FILE}' não encontrado.")
    return json.loads(read_text(INDEX_FILE))


def save_index(data: dict) -> None:
    items = data.get("items", [])
    concluidos = sum(1 for i in items if i.get("status") == "completed")
    pts_totais = sum(i.get("points", 0) for i in items)
    pts_entregues = sum(i.get("points", 0) for i in items if i.get("status") == "completed")

    if "metadata" in data:
        data["metadata"]["total_itens"] = len(items)
        data["metadata"]["itens_concluidos"] = concluidos
        data["metadata"]["pontos_totais"] = pts_totais
        data["metadata"]["pontos_entregues"] = pts_entregues

    write_text(INDEX_FILE, json.dumps(data, indent=2, ensure_ascii=False) + "\n")


# --------------------------------------------------------------------------- #
# Comandos CLI
# --------------------------------------------------------------------------- #
def cmd_list(args):
    data = load_index()
    items = data.get("items", [])
    meta = data.get("metadata", {})

    print(f"\n📦 Backlog do Projeto: {meta.get('projeto', 'Conecta Vidas')}")
    print(f"{'ID':<8} {'Marco':<6} {'Prioridade':<12} {'Status':<14} {'Pts':<4} {'Título'}")
    print("-" * 80)
    for i in items:
        status_pt = STATUS_MAP.get(i.get("status", ""), i.get("status", ""))
        print(f"{i.get('id', ''):<8} {i.get('marco', ''):<6} {i.get('priority', ''):<12} {status_pt:<14} {i.get('points', 0):<4} {i.get('title', '')[:45]}")
    print("-" * 80)
    print(f"Total: {meta.get('total_itens', len(items))} | Concluídos: {meta.get('itens_concluidos', 0)} | Pontos: {meta.get('pontos_entregues', 0)} / {meta.get('pontos_totais', 0)}\n")


def cmd_validate(args):
    data = load_index()
    items = data.get("items", [])
    print(f"\n🔍 Validando integridade de {INDEX_FILE.relative_to(BASE_DIR)} e arquivos Markdown...")

    errors: list[str] = []
    for item in items:
        item_id = item.get("id")
        file_rel = item.get("file")
        if not file_rel:
            errors.append(f"[{item_id}] Item no JSON não especifica o campo 'file'.")
            continue

        file_path = BASE_DIR / file_rel
        if not file_path.exists():
            errors.append(f"[{item_id}] Arquivo Markdown '{file_rel}' não existe.")
            continue

        content = read_text(file_path)
        fm = parse_frontmatter(content)
        if not fm:
            errors.append(f"[{item_id}] Arquivo '{file_rel}' não possui frontmatter YAML válido.")
            continue

        if fm.get("id") != item_id:
            errors.append(f"[{item_id}] ID no frontmatter ('{fm.get('id')}') difere do JSON ('{item_id}').")

        if fm.get("status") != item.get("status"):
            errors.append(f"[{item_id}] Status no frontmatter ('{fm.get('status')}') difere do JSON ('{item.get('status')}').")

        # Se concluído, exige evidências reais
        if item.get("status") == "completed":
            ev_body = section_body(content, "## Evidências de Validação")
            if not has_real_content(ev_body):
                errors.append(f"[{item_id}] Item marcado como 'completed' mas '## Evidências de Validação' está vazia.")

        # Valida existência de artefatos declarados
        val = item.get("validation", {})
        for layer, paths in val.items():
            for p in paths:
                target_p = BASE_DIR / p
                if not target_p.exists():
                    errors.append(f"[{item_id}] Artefato de validação '{p}' declarado em '{layer}' não existe.")

    if errors:
        print(f"\n❌ Falha na validação do backlog ({len(errors)} erro(s) encontrado(s)):")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)

    print(f"✅ Backlog 100% íntegro e consistente! {len(items)} itens validados sem erros.\n")


def cmd_start(args):
    data = load_index()
    target_id = args.id.upper()
    item = next((i for i in data.get("items", []) if i.get("id").upper() == target_id), None)
    if not item:
        raise BacklogError(f"Item '{target_id}' não encontrado no índice de backlog.")

    if item.get("status") == "completed":
        print(f"Aviso: O item '{target_id}' já está homologado e concluído.")
        return

    # Atualiza JSON
    item["status"] = "in-progress"
    save_index(data)

    # Atualiza Markdown
    file_path = BASE_DIR / item["file"]
    if file_path.exists():
        content = read_text(file_path)
        new_content = set_frontmatter_status(content, "in-progress")
        write_text(file_path, new_content)

    print(f"✅ Item '{target_id}' ({item.get('title')}) transicionado para 'in-progress' no JSON e no Markdown.")


def cmd_close(args):
    data = load_index()
    target_id = args.id.upper()
    item = next((i for i in data.get("items", []) if i.get("id").upper() == target_id), None)
    if not item:
        raise BacklogError(f"Item '{target_id}' não encontrado no índice de backlog.")

    file_path = BASE_DIR / item["file"]
    if not file_path.exists():
        raise BacklogError(f"Arquivo Markdown '{item['file']}' não encontrado.")

    print(f"\n🧪 Executando suíte de testes automatizados para homologar '{target_id}'...")
    res = subprocess.run([sys.executable, "-m", "pytest", "-v", "--tb=short"], cwd=BASE_DIR)
    if res.returncode != 0:
        print(f"\n❌ Abortado: Os testes automatizados quebraram. Corrija os testes antes de fechar '{target_id}'.", file=sys.stderr)
        sys.exit(1)

    # Verifica se há evidências registradas no markdown
    content = read_text(file_path)
    ev_body = section_body(content, "## Evidências de Validação")
    if not has_real_content(ev_body):
        raise BacklogError(f"O arquivo '{item['file']}' precisa conter evidências reais de validação antes do fechamento.")

    # Atualiza JSON
    item["status"] = "completed"
    save_index(data)

    # Atualiza Markdown
    new_content = set_frontmatter_status(content, "completed")
    write_text(file_path, new_content)

    print(f"🎉 Item '{target_id}' ({item.get('title')}) homologado e fechado como 'completed'!")


def cmd_finding(args):
    data = load_index()
    target_id = args.id.upper()
    item = next((i for i in data.get("items", []) if i.get("id").upper() == target_id), None)
    if not item:
        raise BacklogError(f"Item pai '{target_id}' não encontrado.")

    file_path = BASE_DIR / item["file"]
    if not file_path.exists():
        raise BacklogError(f"Arquivo Markdown '{item['file']}' não encontrado.")

    hoje = dt.date.today().isoformat()
    entry = f"- **[{hoje}] Achado Técnico:** {args.descricao}"
    content = read_text(file_path)
    new_content = append_to_section(content, "## Achados Derivados", entry)
    write_text(file_path, new_content)

    print(f"✅ Achado derivado registrado com sucesso em '{item['file']}'.")


def cmd_new(args):
    data = load_index()
    item_id = args.id.upper()
    if any(i.get("id").upper() == item_id for i in data.get("items", [])):
        raise BacklogError(f"Item com ID '{item_id}' já existe no backlog.")

    slug = slugify(args.title)
    filename = f"{item_id}-{slug}.md"
    file_rel = f"backlog/{filename}"
    file_path = BACKLOG_DIR / filename

    template = read_text(TEMPLATE_FILE)
    hoje = dt.date.today().isoformat()

    content = template.replace("{{ID}}", item_id)
    content = content.replace("{{TITLE}}", args.title)
    content = content.replace("{{CREATED}}", hoje)
    content = content.replace("{{PARENT}}", args.parent or "EP3")
    content = content.replace("{{EPIC_ID}}", args.epic or "EPIC-03")
    content = content.replace("{{DISCOVERED_IN}}", args.discovered_in or "N/A")
    content = content.replace("{{TAGS}}", '"novo", "melhoria"')

    write_text(file_path, content)

    data.setdefault("items", []).append({
        "id": item_id,
        "file": file_rel,
        "title": args.title,
        "status": "pending",
        "epic_id": args.epic or "EPIC-03",
        "parent": args.parent or "EP3",
        "marco": args.parent or "EP3",
        "priority": args.priority or "should-have",
        "points": args.points or 5,
        "tags": ["novo", "melhoria"],
        "validation": {
            "tooling": ["scripts/backlog.py"]
        }
    })
    save_index(data)
    print(f"✨ Novo item '{item_id}' criado com sucesso em '{file_rel}'!")


def main():
    parser = argparse.ArgumentParser(description="CLI de Backlog-as-Code — Projeto Conecta Vidas")
    subparsers = parser.add_subparsers(dest="comando", required=True)

    # list
    p_list = subparsers.add_parser("list", help="Lista todos os itens do backlog")
    p_list.set_defaults(func=cmd_list)

    # validate
    p_val = subparsers.add_parser("validate", help="Valida sincronismo estrito entre JSON e arquivos Markdown")
    p_val.set_defaults(func=cmd_validate)

    # start
    p_start = subparsers.add_parser("start", help="Inicia o ciclo de execução de um item (muda para in-progress)")
    p_start.add_argument("id", help="ID do item (ex: BK-020)")
    p_start.set_defaults(func=cmd_start)

    # close
    p_close = subparsers.add_parser("close", help="Executa testes e homologa o encerramento de um item (completed)")
    p_close.add_argument("id", help="ID do item (ex: BK-020)")
    p_close.set_defaults(func=cmd_close)

    # finding
    p_finding = subparsers.add_parser("finding", help="Registra um achado ou débito derivado em um item")
    p_finding.add_argument("id", help="ID do item pai (ex: BK-015)")
    p_finding.add_argument("descricao", help="Descrição detalhada do achado")
    p_finding.set_defaults(func=cmd_finding)

    # new
    p_new = subparsers.add_parser("new", help="Cria um novo item a partir do template canônico")
    p_new.add_argument("id", help="Novo ID (ex: BK-023)")
    p_new.add_argument("title", help="Título do item")
    p_new.add_argument("--parent", help="Marco ou pai (ex: EP3, EP5_FUTURO)", default="EP3")
    p_new.add_argument("--epic", help="ID do Épico (ex: EPIC-03)", default="EPIC-03")
    p_new.add_argument("--priority", help="Prioridade MoSCoW", default="should-have")
    p_new.add_argument("--points", help="Pontos de história", type=int, default=5)
    p_new.add_argument("--discovered-in", help="ID do item de origem", default="N/A")
    p_new.set_defaults(func=cmd_new)

    args = parser.parse_args()
    try:
        args.func(args)
    except BacklogError as e:
        print(f"\n❌ Erro: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
