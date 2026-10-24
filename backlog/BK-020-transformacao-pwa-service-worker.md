---
id: "BK-020"
title: "BK-020: Implementação de Arquitetura Local-First com Service Worker e PWA"
type: "backlog"
status: "pending"
created: "2026-05-15"
priority: "should-have"
points: 8
parent: "EP5_FUTURO"
epic_id: "EPIC-05"
tags: ["pwa", "service-worker", "local-first", "offline"]
validation:
  tests: ["tests/test_interface_acessibilidade.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-020: Implementação de Arquitetura Local-First com Service Worker e PWA

## Contexto & Cenário Operacional
Em várias travessas da Zona Leste onde a cobertura celular é nula, o voluntário precisa continuar visualizando sua escala de entrega. A transformação em Progressive Web App (PWA) garantirá operação offline imediata.

> **História de Usuário:**  
> *"Como voluntário operando em áreas periféricas sem sinal de internet, quero que o aplicativo permaneça operando no navegador mesmo offline, para consultar rotas e donativos sem interrupções."*

## Contrato Técnico & Regras Inegociáveis
Arquivo manifest.json com display: standalone; Service Worker (sw.js) com estratégia Stale-While-Revalidate para assets estáticos; suporte a instalação na tela inicial no Android e iOS sem app store.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [ ] **Operação completa em modo offline**
  - **Dado que** o aplicativo previamente carregado
  - **Quando** o dispositivo perder completamente a conexão com a internet
  - **Então** as telas de login e escala devem continuar acessíveis e navegáveis.

## Fora de Escopo (Zero Over-Engineering)
Publicação em lojas fechadas (Google Play Store ou Apple App Store).

## Validação Declarada
- **Testes Automatizados:** `tests/test_interface_acessibilidade.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
<!-- Pendente: item planejado no roadmap pós-MVP -->

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-020. -->
