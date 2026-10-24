---
id: "BK-017"
title: "BK-017: Deploy Contínuo em Nuvem Pública via GitHub Pages com Isolamento"
type: "backlog"
status: "completed"
created: "2026-05-02"
priority: "must-have"
points: 5
parent: "EP4"
epic_id: "EPIC-04"
tags: ["deploy", "seguranca", "github-pages", "nuvem"]
validation:
  tooling: ["scripts/backlog.py"]
  docs: [".github/workflows/deploy.yml"]
---

# BK-017: Deploy Contínuo em Nuvem Pública via GitHub Pages com Isolamento

## Contexto & Cenário Operacional
A publicação da aplicação em produção exigia disponibilidade 24/7 sem custos para a ONG, com certificado SSL/HTTPS nativo e isolamento estrito: arquivos de desenvolvimento, agentes e testes não podem vazar para a URL pública.

> **História de Usuário:**  
> *"Como usuário final e avaliador, quero acessar a aplicação diretamente pela internet sob conexão segura (HTTPS), sem necessidade de instalação local."*

## Contrato Técnico & Regras Inegociáveis
Pipeline deploy.yml empacotando exclusivamente os artefatos de produção em `_site/`; bloqueio de vazamento das pastas .agents, scripts, tests e backlog; URL pública ativa sob HTTPS.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Publicação com certificado HTTPS**
  - **Dado que** a aplicação publicada no GitHub Pages
  - **Quando** o usuário acessar https://camilooliveira15.github.io/ProjetoSoftware_ONG_ConectaVidas/
  - **Então** a página inicial deve responder com código HTTP 200 sob conexão segura SSL/HTTPS.
- [x] **Isolamento estrito dos artefatos de desenvolvimento**
  - **Dado que** o site em produção
  - **Quando** alguém tentar acessar URLs de desenvolvimento como /AGENTS.md ou /scripts/backlog.py
  - **Então** o servidor deve retornar código HTTP 404 (Not Found).

## Fora de Escopo (Zero Over-Engineering)
Servidores dedicados com custos mensais em dólares.

## Validação Declarada
- **Ferramental:** `scripts/backlog.py`
- **Documentação e Evidências:** `.github/workflows/deploy.yml`

## Evidências de Validação
- Workflow deploy.yml configurado no GitHub Actions com separação de ambiente.
- Aplicação em produção acessível e operando com 100% de disponibilidade.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-017. -->
