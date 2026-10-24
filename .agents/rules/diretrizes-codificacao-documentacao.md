---
trigger: model_decision
description: "Diretrizes de escrita de código, convenções de nomenclatura, documentação e tratamento de erros do projeto acadêmico Conecta Vidas."
---

# Diretrizes de Codificação e Documentação

## 1. Tratamento Defensivo de Erros e Exceções
- **Erro silencioso é BUG:** É estritamente proibido capturar exceções de forma genérica sem tratativa ou log (`except Exception: pass`).
- Todas as regras de negócio devem disparar exceções semânticas dedicadas e documentadas:
  - `EstoqueInsuficienteError`: quando a demanda de despacho for superior ao saldo físico em armazém;
  - `QuantidadeInvalidaError`: quando quantidades solicitadas forem $\le 0$ ou não inteiras;
  - `TransicaoStatusInvalidaError`: quando tentar alterar status de entregas já finalizadas.
- Proibição de retornos vazios (`[]` ou `None`) para mascarar falhas.

## 2. Padrões de Nomenclatura e Idioma
- **Documentação, Backlog e Relatórios:** Redigidos em Português do Brasil (PT-BR) com clareza técnica e respeito empático aos usuários da comunidade.
- **Identificadores de Código (Python / JS):** Classes em `PascalCase`, métodos, funções e variáveis em `snake_case` (Python) ou `camelCase` (JavaScript), preservando termos autoexplicativos alinhados ao domínio logístico.
- Todo arquivo markdown de documentação ou backlog deve possuir metadados claros, rastreabilidade bidirecional e tabelas legíveis.

## 3. Comentários e Docstrings
- Comente a **razão de negócio, regra ou restrição de acessibilidade/segurança**, e não apenas a sintaxe trivial.
- Métodos de serviço e classes de modelo devem possuir docstrings explicando o mapeamento com os requisitos funcionais (`RF01`, `RF02`, `RF03`, `RF04`, `RNF04`).
