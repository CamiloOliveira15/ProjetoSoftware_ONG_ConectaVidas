---
id: "BK-002"
title: "BK-002: Mapeamento da Triagem e Check-in Rápido de Famílias"
type: "backlog"
status: "completed"
created: "2026-02-18"
priority: "must-have"
points: 5
parent: "EP1"
epic_id: "EPIC-01"
tags: ["processos", "triagem", "ux", "ods2"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: ["docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md"]
---

# BK-002: Mapeamento da Triagem e Check-in Rápido de Famílias

## Contexto & Cenário Operacional
A conferência manual de nomes em fichas de papel consumia em média 15 minutos por família atendida na sede, gerando aglomerações e atritos no portão da instituição. Foi necessário mapear um fluxo simplificado de check-in com tempo operacional inferior a 2 minutos por atendimento.

> **História de Usuário:**  
> *"Como voluntário de atendimento na sede, quero uma rotina ágil de conferência das famílias cadastradas, para reduzir o tempo de espera nas filas de atendimento presencial."*

## Contrato Técnico & Regras Inegociáveis
A triagem deve operar com identificadores simples (nome do responsável familiar e endereço do domicílio), bloqueando qualquer exigência de biometria ou fotos das famílias beneficiárias, respeitando o Art. 6º, III da LGPD.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Agilidade de atendimento na triagem**
  - **Dado que** uma família comparecendo à sede no dia do mutirão
  - **Quando** o voluntário consultar a lista operacional
  - **Então** o registro de atendimento deve ser localizado em menos de 30 segundos.
- [x] **Prevenção de duplicidade no mesmo mutirão**
  - **Dado que** uma família já atendida no ciclo corrente
  - **Quando** houver nova tentativa de check-in
  - **Então** o sistema deve sinalizar que os donativos daquela rota já foram alocados.

## Fora de Escopo (Zero Over-Engineering)
Integração com sistemas governamentais (CadÚnico) que exigissem webservices externos.

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md`

## Evidências de Validação
- Validação de fluxo operacional no mutirão com tempo de atendimento reduzido de 15 min para 2 min.
- Aprovado pelos voluntários da triagem e registrado no relatório de campo.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-002. -->
