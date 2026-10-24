---
id: "BK-010"
title: "BK-010: Painel Mobile de Escalas com Isolamento Estrito por Voluntário"
type: "backlog"
status: "completed"
created: "2026-04-06"
priority: "must-have"
points: 5
parent: "EP3"
epic_id: "EPIC-03"
tags: ["frontend", "mobile", "escala", "rf02"]
validation:
  tests: ["tests/test_regras_negocio.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-010: Painel Mobile de Escalas com Isolamento Estrito por Voluntário

## Contexto & Cenário Operacional
Na rotina de campo, João Batista precisa consultar sua escala sem ser sobrecarregado com as rotas de outros motoristas. O painel Escala.html (RF02) exibe exclusivamente as entregas designadas ao voluntário logado com badges de status claros.

> **História de Usuário:**  
> *"Como voluntário em campo, quero visualizar apenas a minha lista de entregas do dia em uma interface limpa, para manter o foco na rota sem distrações nem vazamento de dados."*

## Contrato Técnico & Regras Inegociáveis
Isolamento obrigatório por id_voluntario; renderização em card mobile responsivo; indicação explícita do status de cada entrega ('Pendente' em amarelo/âmbar ou 'Concluído' em verde).

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Isolamento da escala por voluntário**
  - **Dado que** múltiplas entregas atribuídas a voluntários distintos
  - **Quando** o voluntário 101 acessar sua escala
  - **Então** apenas as entregas do voluntário 101 devem ser listadas, sem expor registros do voluntário 102.

## Fora de Escopo (Zero Over-Engineering)
Chat em tempo real entre voluntários no aplicativo móvel.

## Validação Declarada
- **Testes Automatizados:** `tests/test_regras_negocio.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
- Implementado em Escala.html.
- Validado pelo teste automatizado test_rf02_isolamento_de_escala_do_voluntario passando 100% verde.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-010. -->
