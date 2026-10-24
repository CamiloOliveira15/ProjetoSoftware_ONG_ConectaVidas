---
id: "BK-004"
title: "BK-004: Modelagem de Dados Relacional e Normalização 3FN"
type: "backlog"
status: "completed"
created: "2026-03-02"
priority: "must-have"
points: 5
parent: "EP2"
epic_id: "EPIC-02"
tags: ["modelagem", "database", "3fn", "integridade"]
validation:
  tests: ["tests/test_regras_negocio.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-004: Modelagem de Dados Relacional e Normalização 3FN

## Contexto & Cenário Operacional
A dispersão de anotações causava perda de controle sobre quais donativos pertenciam a qual família e qual voluntário era o responsável pelo transporte. Modelou-se um esquema relacional contemplando: Voluntários, Famílias, Donativos (Estoque), Entregas e Itens_Entrega.

> **História de Usuário:**  
> *"Como desenvolvedor de software, quero modelar a base de dados em 3ª Forma Normal (3FN), para garantir integridade referencial e evitar anomalias de atualização."*

## Contrato Técnico & Regras Inegociáveis
Chaves estrangeiras com integridade estrita; unicidade de identificadores; status de entrega limitado ao enum `Pendente`, `Concluido`, `Cancelado`. Quantidades de itens devem ser obrigatoriamente inteiros maiores que zero.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Normalização e ausência de redundâncias**
  - **Dado que** as entidades do domínio de doações
  - **Quando** aplicada a normalização relacional
  - **Então** todas as tabelas devem estar na 3FN, sem dependências transitivas ou atributos multivalorados.
- [x] **Integridade transacional no débito de estoque**
  - **Dado que** uma entrega associada a itens de estoque
  - **Quando** a entrega for atribuída
  - **Então** cada item do estoque deve abater a quantidade de forma atômica e consistente.

## Fora de Escopo (Zero Over-Engineering)
Bancos NoSQL ou grafos não relacionais.

## Validação Declarada
- **Testes Automatizados:** `tests/test_regras_negocio.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
- Entidades ItemEstoque, Entrega e ServicoLogistica implementadas em tests/test_regras_negocio.py.
- Suíte de testes valida débito atômico, integridade de status e exceções de negócio com 100% de cobertura.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-004. -->
