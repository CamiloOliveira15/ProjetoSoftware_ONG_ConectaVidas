---
id: "BK-021"
title: "BK-021: Sincronização em Segundo Plano (Background Sync) e IndexedDB"
type: "backlog"
status: "pending"
created: "2026-05-18"
priority: "should-have"
points: 8
parent: "EP5_FUTURO"
epic_id: "EPIC-05"
tags: ["indexeddb", "background-sync", "persistencia", "local-first"]
validation:
  tests: ["tests/test_regras_negocio.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-021: Sincronização em Segundo Plano (Background Sync) e IndexedDB

## Contexto & Cenário Operacional
Atualmente a baixa exige conexão cliente. Em áreas sem sinal, as baixas devem ser enfileiradas no IndexedDB local do navegador do smartphone e sincronizadas via Background Sync API quando o sinal for restabelecido.

> **História de Usuário:**  
> *"Como voluntário entregando doações sem sinal, quero registrar a baixa offline e ter os dados sincronizados automaticamente quando a rede voltar, sem perder registros."*

## Contrato Técnico & Regras Inegociáveis
Fila transacional em IndexedDB com chave primária e timestamp UTC; resolução determinística de conflitos baseada em Last-Write-Wins; bloqueio de perdas acidentais de registros.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [ ] **Enfileiramento transacional offline**
  - **Dado que** uma entrega concluída sem conexão de rede
  - **Quando** o voluntário confirmar a baixa
  - **Então** o registro deve ser gravado na store de mutações do IndexedDB e o card transicionar para 'Concluído (Pendente de Sincronização)'.
- [ ] **Sincronização automática na reconexão**
  - **Dado que** mutações pendentes gravadas no IndexedDB
  - **Quando** o evento 'online' do navegador for disparado
  - **Então** as baixas devem ser sincronizadas e o status atualizado para 'Concluído e Sincronizado'.

## Fora de Escopo (Zero Over-Engineering)
Protocolos complexos de CRDT com edição multi-usuário simultânea do mesmo registro.

## Validação Declarada
- **Testes Automatizados:** `tests/test_regras_negocio.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
<!-- Pendente: item planejado no roadmap pós-MVP -->

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-021. -->
