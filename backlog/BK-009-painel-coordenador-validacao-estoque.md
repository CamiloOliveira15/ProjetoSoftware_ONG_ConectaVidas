---
id: "BK-009"
title: "BK-009: Painel do Coordenador com Validação Reativa de Saldo de Estoque"
type: "backlog"
status: "completed"
created: "2026-04-02"
priority: "must-have"
points: 8
parent: "EP3"
epic_id: "EPIC-03"
tags: ["frontend", "backend", "estoque", "rf01"]
validation:
  tests: ["tests/test_regras_negocio.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-009: Painel do Coordenador com Validação Reativa de Saldo de Estoque

## Contexto & Cenário Operacional
Antes deste módulo, voluntários eram despachados para a rua e descobriam na hora de carregar o carro que não havia cestas básicas suficientes no galpão. O módulo Coordenador.html (RF01) implementou controle reativo que bloqueia a atribuição se o saldo físico for insuficiente.

> **História de Usuário:**  
> *"Como coordenador na sede, quero despachar rotas cruzando voluntários e famílias com validação imediata de estoque, para impedir saídas sem mantimentos físicos disponíveis."*

## Contrato Técnico & Regras Inegociáveis
Toda atribuição deve verificar atomicamente o saldo de cada item solicitado. Se demanda > disponível, lançar obrigatoriamente EstoqueInsuficienteError. Quantidades <= 0 devem levantar QuantidadeInvalidaError. Proibido retornar valores vazios ou mascarar exceções.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Atribuição bem-sucedida com débito de estoque**
  - **Dado que** um estoque com 15 cestas básicas e demanda de 2 cestas
  - **Quando** o coordenador atribuir a entrega
  - **Então** o sistema deve confirmar a rota e o saldo de cestas deve ser reduzido para 13.
- [x] **Bloqueio estrito de estoque insuficiente**
  - **Dado que** um estoque com 1 cesta básica e demanda de 2 cestas
  - **Quando** o coordenador tentar atribuir a entrega
  - **Então** o sistema deve bloquear a operação, levantar EstoqueInsuficienteError e manter o estoque em 1.

## Fora de Escopo (Zero Over-Engineering)
Integração automática com código de barras de leitura a laser.

## Validação Declarada
- **Testes Automatizados:** `tests/test_regras_negocio.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
- Implementado na tela Coordenador.html e coberto por testes unitários formais:
  * test_rf01_atribuicao_com_estoque_suficiente (PASSED)
  * test_rf01_bloqueio_quando_estoque_insuficiente (PASSED)
  * test_rf01_bloqueio_quantidade_invalida_zero_ou_negativa (PASSED)

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-009. -->
