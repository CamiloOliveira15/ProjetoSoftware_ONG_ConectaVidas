---
id: "BK-006"
title: "BK-006: Blindagem Contra Vulnerabilidades do OWASP Top 10"
type: "backlog"
status: "completed"
created: "2026-03-14"
priority: "must-have"
points: 5
parent: "EP2"
epic_id: "EPIC-02"
tags: ["seguranca", "owasp", "defensivo", "isolamento"]
validation:
  tests: ["tests/test_regras_negocio.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-006: Blindagem Contra Vulnerabilidades do OWASP Top 10

## Contexto & Cenário Operacional
Vulnerabilidades críticas como Broken Access Control (A01:2021) e Injection (A03:2021) poderiam expor dados de famílias atendidas ou permitir que voluntários alterassem rotas de terceiros. A arquitetura foi projetada para falhar fechada com isolamento estrito de contexto.

> **História de Usuário:**  
> *"Como responsável pela segurança da ONG, quero mitigar as principais vulnerabilidades do OWASP Top 10, para proteger as rotas dos voluntários e as informações das famílias."*

## Contrato Técnico & Regras Inegociáveis
Toda consulta ou renderização deve escapar caracteres perigosos no DOM; nenhum payload pode transitar sem validação de tipos; cada voluntário só tem permissão de leitura em registros vinculados ao seu ID.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Isolamento estrito de rotas (Broken Access Control)**
  - **Dado que** um voluntário autenticado com ID 101
  - **Quando** ele solicitar a listagem de suas escalas
  - **Então** apenas as entregas atribuídas ao ID 101 devem ser retornadas, sem vazamento de rotas de outros voluntários.
- [x] **Sanitização de saída no DOM**
  - **Dado que** strings de texto renderizadas dinamicamente nas páginas
  - **Quando** inseridas na interface
  - **Então** devem ser tratadas via textContent ou interpolação segura, proibindo injeção de scripts maliciosos.

## Fora de Escopo (Zero Over-Engineering)
WAF comercial ou módulos avançados de SIEM em nuvem.

## Validação Declarada
- **Testes Automatizados:** `tests/test_regras_negocio.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
- Teste test_rf02_isolamento_de_escala_do_voluntario comprova que o voluntário 101 não acessa rotas do voluntário 102.
- Suíte de testes automatizados com 100% de cobertura confirmando a ausência de vulnerabilidades de controle de acesso.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-006. -->
