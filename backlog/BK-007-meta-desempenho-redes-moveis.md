---
id: "BK-007"
title: "BK-007: Meta Objetiva de Desempenho e Portabilidade em Redes Móveis"
type: "backlog"
status: "completed"
created: "2026-03-20"
priority: "must-have"
points: 3
parent: "EP2"
epic_id: "EPIC-02"
tags: ["performance", "mobile", "rnf03", "latencia"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: [".github/workflows/monitoramento.yml"]
---

# BK-007: Meta Objetiva de Desempenho e Portabilidade em Redes Móveis

## Contexto & Cenário Operacional
Os voluntários de entrega operam em regiões periféricas da Zona Leste onde o sinal 4G/5G oscila frequentemente. O RNF03 definiu que a aplicação deve carregar completamente em menos de 3.0s sob perfil simulado de conexão Fast 3G.

> **História de Usuário:**  
> *"Como voluntário dirigindo o veículo de entregas, quero que o aplicativo carregue instantaneamente mesmo sob conexão móvel fraca (3G), para não travar durante o trajeto."*

## Contrato Técnico & Regras Inegociáveis
Frontend estático ultra-leve sem compilações pesadas em runtime; eliminação de bibliotecas desnecessárias; tempo de resposta HTTP inferior a 1.5s em produção com tempo médio alcançado < 50ms.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Tempo de carregamento em rede móvel**
  - **Dado que** uma conexão com velocidade reduzida (Fast 3G simulada)
  - **Quando** o usuário acessar a aplicação
  - **Então** a tela de login e de escala devem estar totalmente interativas em menos de 1.5s.
- [x] **Tempo de resposta HTTP em produção**
  - **Dado que** uma requisição sintética de monitoramento
  - **Quando** a URL pública for consultada
  - **Então** o tempo total de resposta deve ser inferior a 100ms.

## Fora de Escopo (Zero Over-Engineering)
Compressão Brotli customizada no servidor (gerenciada nativamente pela CDN do GitHub Pages).

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `.github/workflows/monitoramento.yml`

## Evidências de Validação
- Medição sintética registrada no workflow de monitoramento: tempo de resposta médio de 0.039s (39ms).
- Payload total da página inferior a 35KB, atendendo com folga à meta de 3.0s do RNF03.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-007. -->
