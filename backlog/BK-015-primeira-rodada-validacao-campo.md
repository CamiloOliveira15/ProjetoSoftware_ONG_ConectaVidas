---
id: "BK-015"
title: "BK-015: Primeira Rodada de Validação em Campo e Mapeamento de Atritos"
type: "backlog"
status: "completed"
created: "2026-04-20"
priority: "must-have"
points: 5
parent: "EP3"
epic_id: "EPIC-03"
tags: ["validacao", "campo", "usabilidade", "feedback"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: ["docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md"]
---

# BK-015: Primeira Rodada de Validação em Campo e Mapeamento de Atritos

## Contexto & Cenário Operacional
A primeira rodada de testes foi realizada com o voluntário João Batista operando sob sol forte do meio-dia. Revelou dois atritos críticos: 1) dificuldade de leitura da lista de mantimentos em texto corrido (92 segundos para localizar a rota); 2) dúvida cognitiva se a entrega tinha sido gravada no sistema após fechar o modal.

> **História de Usuário:**  
> *"Como líder de projeto, quero realizar uma rodada de testes de usabilidade com o voluntário em trânsito, para identificar pontos de atrito antes do lançamento final."*

## Contrato Técnico & Regras Inegociáveis
Registro fidedigno das métricas observadas sem alteração artificial de resultados; mapeamento claro das oportunidades de melhoria.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Registro estruturado dos tempos de tarefa**
  - **Dado que** o voluntário executando as tarefas de autenticação, busca e baixa
  - **Quando** cronometrado o tempo de execução na Rodada 1
  - **Então** os tempos devem ser registrados formalmente: Autenticação (14s), Rota (92s), Baixa (18s) e Satisfação (Nota 4).

## Fora de Escopo (Zero Over-Engineering)
Testes de laboratório com eye-tracking.

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md`

## Evidências de Validação
- Relatório completo da Rodada 1 documentado na Seção 5 de docs/evidencias/EVIDENCIAS_EXPERIENCIA_PRATICA_3.md.
- Atritos categorizados para implementação imediata no BK-016.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-015. -->
