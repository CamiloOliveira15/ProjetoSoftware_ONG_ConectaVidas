---
id: "BK-003"
title: "BK-003: Definição do Limite de Escopo do MVP (Zero Over-Engineering)"
type: "backlog"
status: "completed"
created: "2026-02-22"
priority: "must-have"
points: 3
parent: "EP1"
epic_id: "EPIC-01"
tags: ["arquitetura", "escopo", "zero-overengineering"]
validation:
  tests: ["tests/test_interface_acessibilidade.py"]
  docs: ["README.md"]
---

# BK-003: Definição do Limite de Escopo do MVP (Zero Over-Engineering)

## Contexto & Cenário Operacional
A tentação em projetos acadêmicos de adicionar microserviços, Kubernetes, bancos pagos em nuvem ou frameworks pesados geraria sobrecarga desnecessária e custos em dólar inviáveis para uma ONG sem fins lucrativos. O escopo foi blindado sob o princípio Zero Over-Engineering: foco estrito nas 4 telas essenciais da última milha.

> **História de Usuário:**  
> *"Como arquiteto de software, quero delimitar rigorosamente o escopo funcional do MVP, para entregar valor rápido sem complexidade acidental ou custos desnecessários."*

## Contrato Técnico & Regras Inegociáveis
Proibição terminante de componentes pagos ou arquiteturas que exijam cartão de crédito para manter o sistema online. Adoção de padrões abertos (HTML5, Tailwind CSS via CDN, Google Maps URL Scheme universal).

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Fronteira arquitetural fechada**
  - **Dado que** os requisitos funcionais propostos
  - **Quando** a arquitetura for consolidada
  - **Então** o MVP deve se limitar a: Login seguro, Painel do Coordenador com estoque, Escala do Voluntário com GPS e Modal de Baixa com feedback.

## Fora de Escopo (Zero Over-Engineering)
Módulos de telemetria veicular em tempo real, pagamento de frete ou geofencing automático.

## Validação Declarada
- **Testes Automatizados:** `tests/test_interface_acessibilidade.py`
- **Documentação e Evidências:** `README.md`

## Evidências de Validação
- Escopo fechado formalizado no README.md e aprovado pela coordenação da disciplina.
- Verificação automatizada em test_arquivos_mvp_existem garantindo a presença estrita dos arquivos fundamentais.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-003. -->
