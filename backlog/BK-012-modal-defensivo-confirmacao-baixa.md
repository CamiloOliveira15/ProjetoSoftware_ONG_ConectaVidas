---
id: "BK-012"
title: "BK-012: Modal Defensivo de Confirmação de Baixa com Prevenção de Toques"
type: "backlog"
status: "completed"
created: "2026-04-12"
priority: "must-have"
points: 5
parent: "EP3"
epic_id: "EPIC-03"
tags: ["frontend", "ux-defensiva", "baixa", "rf03"]
validation:
  tests: ["tests/test_regras_negocio.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-012: Modal Defensivo de Confirmação de Baixa com Prevenção de Toques

## Contexto & Cenário Operacional
Em trânsito, toques involuntários na tela poderiam registrar baixas falsas de entrega antes que os alimentos fossem realmente entregues à família. Criou-se o modal defensivo Confirmacao.html (RF03) com botões literais e transição para comprovante permanente.

> **História de Usuário:**  
> *"Como voluntário em campo, quero um diálogo claro de confirmação antes de concluir a entrega, para evitar baixas acidentais causadas pelo celular no bolso ou em trânsito."*

## Contrato Técnico & Regras Inegociáveis
Botões com rótulos descritivos e literais ('Voltar' e 'Confirmar Entrega'); idempotência obrigatória: tentativas de concluir entrega já finalizada devem levantar TransicaoStatusInvalidaError.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Prevenção de clique acidental no modal**
  - **Dado que** o voluntário clicando no botão de dar baixa
  - **Quando** o modal for apresentado
  - **Então** a ação só é efetivada se o usuário clicar explicitamente em 'Confirmar Entrega'.
- [x] **Idempotência da baixa (bloqueio de dupla baixa)**
  - **Dado que** uma entrega já com status 'Concluido'
  - **Quando** houver nova chamada de conclusão
  - **Então** o sistema deve lançar TransicaoStatusInvalidaError e impedir duplicidade de registro.

## Fora de Escopo (Zero Over-Engineering)
Exigência de assinatura na tela ou foto da entrega (proteção LGPD).

## Validação Declarada
- **Testes Automatizados:** `tests/test_regras_negocio.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
- Implementado em Confirmacao.html.
- Testes test_rf03_conclusao_de_entrega e test_rf03_bloqueio_de_conclusao_dupla passando com sucesso.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-012. -->
