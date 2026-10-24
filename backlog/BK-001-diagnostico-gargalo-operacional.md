---
id: "BK-001"
title: "BK-001: Diagnóstico do Gargalo Operacional e Registro"
type: "backlog"
status: "completed"
created: "2026-02-15"
priority: "must-have"
points: 5
parent: "EP1"
epic_id: "EPIC-01"
tags: ["descoberta", "requisitos", "ods2", "campo"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: ["docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md", "docs/termo_feedback/Termo_de_Feedback_da_Comunidade.pdf"]
---

# BK-001: Diagnóstico do Gargalo Operacional e Registro

## Contexto & Cenário Operacional
Antes da intervenção, a Associação Comunitária Pão e Vida (ACPV) gerenciava a doação de mantimentos e cestas para 300 famílias através de um caderno físico ('caderno azul') e fichas de papel na sede (Zona Leste de São Paulo). Esse modelo arcaico gerava filas de espera superiores a 2 horas, descompasso crônico entre o estoque físico e o registrado, e risco de perda de alimentos perecíveis por ausência de despacho ordenado (FIFO). Persona central de coordenação: Sra. Maria da Conceição Santos.

> **História de Usuário:**  
> *"Como coordenador da ONG, quero identificar e registrar os gargalos do fluxo manual de doações, para planejar uma solução tecnológica focada na última milha."*

## Contrato Técnico & Regras Inegociáveis
Levantamento estrito de requisitos sem retenção de dados sensíveis desnecessários. Toda documentação deve preservar a dignidade das famílias atendidas em vulnerabilidade extrema, alinhando-se à Meta 2.1 do ODS 2 (Fome Zero). É proibido criar processos burocráticos que aumentem o atrito de atendimento.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Mapeamento do fluxo de entrada e saída de mantimentos**
  - **Dado que** que o fluxo manual dependia exclusivamente de anotações no caderno azul
  - **Quando** a investigação de campo e entrevistas forem consolidadas
  - **Então** o diagnóstico deve elencar os 4 gargalos críticos (estoque cego, filas, perecibilidade e falta de comprovação de entrega).
- [x] **Delimitação de impacto no ODS 2.1**
  - **Dado que** as famílias assistidas com risco de insegurança alimentar
  - **Quando** os critérios de triagem forem definidos
  - **Então** o software deve priorizar a rastreabilidade da última milha sem exigir documentos invasivos (CPF/RG).

## Fora de Escopo (Zero Over-Engineering)
Desenvolvimento de módulos de faturamento, folha de pagamento ou CRM comercial.

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md`
- **Documentação e Evidências:** `docs/termo_feedback/Termo_de_Feedback_da_Comunidade.pdf`

## Evidências de Validação
- Entrevistas em campo com Maria da Conceição Santos (Coordenação Geral) e voluntários operacionais.
- Diagnóstico formalizado e incorporado ao relatório da Experiência Prática I.
- Termo de Feedback da Comunidade assinado atestando o diagnóstico e a entrega do projeto.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-001. -->
