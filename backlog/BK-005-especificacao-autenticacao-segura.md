---
id: "BK-005"
title: "BK-005: Especificação de Autenticação Segura com Hash e Perfis"
type: "backlog"
status: "completed"
created: "2026-03-08"
priority: "must-have"
points: 3
parent: "EP2"
epic_id: "EPIC-02"
tags: ["seguranca", "autenticacao", "acessibilidade", "rnf01"]
validation:
  tests: ["tests/test_interface_acessibilidade.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-005: Especificação de Autenticação Segura com Hash e Perfis

## Contexto & Cenário Operacional
A interface de login é o portal de entrada do sistema. Exigia suporte a perfis distintos (`COORDENADOR` e `VOLUNTARIO`), prevenção de senhas em texto limpo e aderência aos padrões de acessibilidade com rótulos persistentes para leitores de tela.

> **História de Usuário:**  
> *"Como coordenador ou voluntário, quero autenticar-me com credenciais seguras e rótulos semânticos explícitos, para acessar meu painel correspondente com clareza."*

## Contrato Técnico & Regras Inegociáveis
Rótulo <label for='...'> obrigatório e visível para cada campo de entrada; alternância de visibilidade de senha com atributo aria-label; feedback de erro sem expor detalhes internos do sistema.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Rótulos semânticos explícitos**
  - **Dado que** a tela de login carregada no navegador
  - **Quando** inspecionados os campos de e-mail e senha
  - **Então** ambos devem possuir tags <label> associadas via atributo 'for' aos IDs 'email' e 'password'.
- [x] **Controle de visibilidade da senha**
  - **Dado que** o campo de senha preenchido
  - **Quando** o usuário acionar o botão de alternância do olho
  - **Então** o tipo do input deve alternar entre 'password' e 'text' mantendo a acessibilidade.

## Fora de Escopo (Zero Over-Engineering)
Autenticação por biometria ou hardware keys (FIDO2) no MVP.

## Validação Declarada
- **Testes Automatizados:** `tests/test_interface_acessibilidade.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
- Implementado em Login.html e index.html com Tailwind e W3C ARIA.
- Validado pelo teste automatizado test_rnf04_rotulos_persistentes_login passando 100% verde.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-005. -->
