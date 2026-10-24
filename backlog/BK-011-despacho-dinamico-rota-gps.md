---
id: "BK-011"
title: "BK-011: Despacho Dinâmico de Rota para Aplicativos GPS Externos"
type: "backlog"
status: "completed"
created: "2026-04-09"
priority: "should-have"
points: 3
parent: "EP3"
epic_id: "EPIC-03"
tags: ["gps", "maps", "integracao", "rf04"]
validation:
  tests: ["tests/test_interface_acessibilidade.py", "tests/test_regras_negocio.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-011: Despacho Dinâmico de Rota para Aplicativos GPS Externos

## Contexto & Cenário Operacional
Digitar endereços complexos da periferia manualmente no aplicativo de GPS enquanto dirige gera distração e risco no trânsito. O RF04 implementou integração em um clique via protocolo universal Google Maps URL Scheme.

> **História de Usuário:**  
> *"Como voluntário motorista, quero acionar a navegação GPS com um clique sobre o endereço da família, para ser guiado por voz até o destino sem redigitar o endereço."*

## Contrato Técnico & Regras Inegociáveis
URL encoded estrita no formato `https://www.google.com/maps/search/?api=1&query={endereco_encoded}`. Atributo target='_blank' obrigatório para que a navegação externa abra sem encerrar a sessão da escala.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Codificação segura da rota GPS**
  - **Dado que** um endereço contendo espaços e caracteres especiais (ex: 'Rua das Flores, 123')
  - **Quando** o link de rota for gerado
  - **Então** a URL deve conter os parâmetros codificados via URL encoding seguro e target='_blank'.

## Fora de Escopo (Zero Over-Engineering)
SDK fechado do Google Maps embutido via canvas web pago.

## Validação Declarada
- **Testes Automatizados:** `tests/test_interface_acessibilidade.py`
- **Testes Automatizados:** `tests/test_regras_negocio.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
- Testes test_rf04_link_direto_para_gps e test_rf04_geracao_link_gps passando com sucesso.
- Verificado em campo no smartphone Android abrindo diretamente o app nativo do Google Maps.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-011. -->
