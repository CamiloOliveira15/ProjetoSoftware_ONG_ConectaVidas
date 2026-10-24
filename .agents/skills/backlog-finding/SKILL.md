---
name: backlog-finding
description: Registra um achado, bug, atrito operacional ou débito técnico fora do escopo imediato no controle de backlog do projeto Conecta Vidas.
---

# Backlog Finding — Registro Estruturado de Achados e Débitos

## 1. Quando Utilizar
- Durante a implementação de uma tarefa, ao descobrir um bug não previsto;
- Ao identificar oportunidades de refatoração ou melhorias de acessibilidade que ampliariam o escopo da entrega atual;
- Ao detectar potenciais riscos de conectividade (ex: necessidade de operação offline em zonas periféricas).
- **Regra:** Nunca mascare falhas com fallbacks silenciosos e nunca amplie silenciosamente a entrega sem registrar o achado.

## 2. Execução do Registro
Execute o CLI:
```powershell
python scripts/backlog.py finding --titulo "<Título do Achado>" --epic <ID_EPICO> --prioridade <Must|Should|Could> --descricao "<Detalhes>"
```

O comando:
- Gera um novo identificador sequencial `BK-xxx`;
- Adiciona o item ao array de `itens_backlog` em `backlog/controle_backlog.json` com status `Planejado`;
- Atualiza o total de itens no sumário consolidado de métricas.
