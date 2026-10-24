---
id: "BK-016"
title: "BK-016: Refatoração de Interface para Chips de Alto Contraste"
type: "backlog"
status: "completed"
created: "2026-04-24"
priority: "must-have"
points: 8
parent: "EP3"
epic_id: "EPIC-03"
tags: ["frontend", "refatoracao", "alto-contraste", "ux"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: ["docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md"]
---

# BK-016: Refatoração de Interface para Chips de Alto Contraste

## Contexto & Cenário Operacional
Para resolver os atritos da Rodada 1, a interface da Escala.html foi reformulada com chips visuais de alto contraste (`📦 2 Cestas Básicas` e `🧼 1 Kit Higiene`) e foi criada a tela de comprovante permanente EscalaConcluida.html com o carimbo 'Concluído ✔ — Entregue às 09:44'.

> **História de Usuário:**  
> *"Como voluntário sob luz solar direta, quero visualizar os itens da doação em blocos visuais destacados (chips), para conferir os mantimentos instantaneamente."*

## Contrato Técnico & Regras Inegociáveis
Relação de contraste > 7:1 nos chips visuais; persistência do status concluído no DOM; redução comprovada de pelo menos 50% no tempo de busca na Rodada 2.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Redução comprovada do tempo de localização de rota**
  - **Dado que** o voluntário João Batista repetindo o teste na Rodada 2
  - **Quando** utilizar a interface com chips visuais
  - **Então** o tempo de busca deve cair de 92s para 34s (redução de 63%) e a nota de satisfação subir para 5 (Muito Fácil).

## Fora de Escopo (Zero Over-Engineering)
Customização de cores individuais por usuário.

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md`

## Evidências de Validação
- Rodada 2 executada com sucesso: tempo caiu para 34 segundos (redução de 63%).
- Implementados chips destacados em Escala.html e comprovante em EscalaConcluida.html.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-016. -->
