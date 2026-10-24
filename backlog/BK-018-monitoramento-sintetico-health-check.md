---
id: "BK-018"
title: "BK-018: Monitoramento Sintético Contínuo e Health Check Automatizado"
type: "backlog"
status: "completed"
created: "2026-05-05"
priority: "must-have"
points: 5
parent: "EP4"
epic_id: "EPIC-04"
tags: ["monitoramento", "health-check", "uptime", "sre"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: [".github/workflows/monitoramento.yml"]
---

# BK-018: Monitoramento Sintético Contínuo e Health Check Automatizado

## Contexto & Cenário Operacional
A sustentabilidade da entrega exigia vigilância contínua para garantir que a aplicação web não sofresse quedas silenciosas. Foi implementado o workflow sintético .github/workflows/monitoramento.yml.

> **História de Usuário:**  
> *"Como engenheiro responsável, quero que um robô verifique o status da aplicação a cada 6 horas, para detectar qualquer indisponibilidade imediatamente."*

## Contrato Técnico & Regras Inegociáveis
Agendamento cron '0 */6 * * *'; verificação de código HTTP 200; medição de latência; validação de conteúdo semântico no DOM; falha aberta (exit 1 e status DOWN) caso o serviço responda com erro.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Disparo periódico do Health Check**
  - **Dado que** o workflow agendado a cada 6 horas
  - **Quando** executada a requisição curl na URL de produção
  - **Então** deve registrar código HTTP 200, latência < 1.5s e confirmar a presença da string 'ONG Conecta Vidas'.

## Fora de Escopo (Zero Over-Engineering)
Agentes pagos de APM como Datadog ou New Relic.

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `.github/workflows/monitoramento.yml`

## Evidências de Validação
- Workflow ativo e executando a cada 6h no GitHub Actions.
- Status atual: STATUS: UP (100% Uptime / Latência 39ms).

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-018. -->
