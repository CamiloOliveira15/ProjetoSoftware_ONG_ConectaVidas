---
id: "BK-019"
title: "BK-019: Governança Ética, Minimização de Dados (LGPD) e Termo de Aceite"
type: "backlog"
status: "completed"
created: "2026-05-10"
priority: "must-have"
points: 5
parent: "EP4"
epic_id: "EPIC-04"
tags: ["etica", "lgpd", "privacidade", "ods2", "termo"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: ["docs/termo_feedback/Termo_de_Feedback_da_Comunidade.pdf", "docs/termo_feedback/Termo_de_Feedback_da_Comunidade.html"]
---

# BK-019: Governança Ética, Minimização de Dados (LGPD) e Termo de Aceite

## Contexto & Cenário Operacional
A Associação Comunitária Pão e Vida atende famílias em extrema vulnerabilidade. O projeto adotou o princípio de Minimização de Dados (Art. 6º, III da LGPD): zero coleta de CPF, RG, fotos ou biometria. A entrega foi homologada por termo formal assinado pela coordenação e pelo voluntário.

> **História de Usuário:**  
> *"Como líder comunitária, quero que o software respeite a privacidade das famílias atendidas e comprove o aceite formal da entrega, para assegurar a idoneidade da parceria."*

## Contrato Técnico & Regras Inegociáveis
Proibição estrita de cadastramento de documentos fiscais ou fotos das famílias beneficiárias; Termo de Feedback da Comunidade disponibilizado nos formatos HTML, DOCX e PDF assinado.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Conformidade integral com a LGPD**
  - **Dado que** os fluxos de dados do aplicativo
  - **Quando** auditados os payloads transmitidos
  - **Então** nenhum número de CPF, documento pessoal ou prontuário socioeconômico deve ser transmitido ou armazenado.
- [x] **Homologação comunitária com Termo de Feedback**
  - **Dado que** o encerramento da Experiência Prática IV
  - **Quando** apresentado o Termo de Feedback da Comunidade
  - **Então** deve conter a assinatura e o aceite formal da coordenação e do voluntário operacional.

## Fora de Escopo (Zero Over-Engineering)
Coleta de cookies rastreadores ou telemetria invasiva de marketing.

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `docs/termo_feedback/Termo_de_Feedback_da_Comunidade.pdf`
- **Documentação e Evidências:** `docs/termo_feedback/Termo_de_Feedback_da_Comunidade.html`

## Evidências de Validação
- Termo de Feedback da Comunidade assinado por Maria da Conceição Santos e João Batista em docs/termo_feedback/.
- Auditoria de código confirma ausência total de campos de CPF ou fotos no frontend e nos testes.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-019. -->
