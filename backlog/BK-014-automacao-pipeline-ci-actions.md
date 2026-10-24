---
id: "BK-014"
title: "BK-014: Automação do Pipeline de Integração Contínua (GitHub Actions)"
type: "backlog"
status: "completed"
created: "2026-04-18"
priority: "must-have"
points: 5
parent: "EP3"
epic_id: "EPIC-03"
tags: ["ci", "github-actions", "qualidade", "automacao"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: [".github/workflows/ci.yml"]
---

# BK-014: Automação do Pipeline de Integração Contínua (GitHub Actions)

## Contexto & Cenário Operacional
A governança do repositório exigia que nenhum commit na branch main ou develop pudesse ser aprovado sem validação automática dos testes de integridade e acessibilidade. Criou-se o workflow .github/workflows/ci.yml.

> **História de Usuário:**  
> *"Como mantenedor do projeto, quero que a esteira de CI execute os testes a cada push e pull request, para impedir a integração de código quebrado."*

## Contrato Técnico & Regras Inegociáveis
Execução em container limpo Ubuntu Latest; instalação de dependências mínimas; falha imediata caso qualquer teste quebre.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Execução automática na esteira de CI**
  - **Dado que** um push ou pull request aberto para main ou develop
  - **Quando** o GitHub Actions disparar o pipeline
  - **Então** o job deve executar os 12 testes no pytest e sinalizar sucesso com badge verde.

## Fora de Escopo (Zero Over-Engineering)
Runners auto-hospedados ou matrizes com múltiplos sistemas operacionais legados.

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `.github/workflows/ci.yml`

## Evidências de Validação
- Workflow ci.yml configurado e operacional no repositório.
- Badge de CI verde integrado no README.md principal.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-014. -->
