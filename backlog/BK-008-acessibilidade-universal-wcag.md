---
id: "BK-008"
title: "BK-008: Acessibilidade Universal para Operação em Trânsito (WCAG 2.1 AA)"
type: "backlog"
status: "completed"
created: "2026-03-25"
priority: "must-have"
points: 5
parent: "EP2"
epic_id: "EPIC-02"
tags: ["acessibilidade", "wcag", "rnf04", "ux"]
validation:
  tests: ["tests/test_interface_acessibilidade.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-008: Acessibilidade Universal para Operação em Trânsito (WCAG 2.1 AA)

## Contexto & Cenário Operacional
A operação de entrega ocorre em condições físicas adversas: sol intenso incidindo na tela do celular, ruídos urbanos e o voluntário frequentemente utilizando apenas o polegar de uma mão enquanto carrega as caixas de mantimentos.

> **História de Usuário:**  
> *"Como voluntário operando sob sol forte e segurando caixas, quero botões grandes e alto contraste, para operar o aplicativo com apenas uma mão sem erros."*

## Contrato Técnico & Regras Inegociáveis
WCAG 2.1 Nível AA: Áreas de toque mínimas absolutas de 44x44px (calibradas com classe utilitária min-h-[46px]); relação de contraste de texto normal > 4.5:1 (calibrada para > 7:1); independência total de cor nos alertas (cor + SVG + texto afirmativo).

## Critérios de Aceite (Cenários BDD / Gherkin)
- [x] **Dimensão dos botões interativos**
  - **Dado que** qualquer botão interativo primário nas telas do sistema
  - **Quando** inspecionada a altura no DOM
  - **Então** deve possuir classe utilitária garantindo altura mínima >= 44px.
- [x] **Independência total de cor no feedback de entrega**
  - **Dado que** o alerta de confirmação de entrega exibido
  - **Quando** visualizado por usuário com daltonismo ou sob sol forte
  - **Então** deve conter simultaneamente cor de fundo verde, ícone SVG de checkmark e texto afirmativo 'Entrega Concluída com Sucesso!'.

## Fora de Escopo (Zero Over-Engineering)
Modo de alto contraste monocromático com inversão de canvas.

## Validação Declarada
- **Testes Automatizados:** `tests/test_interface_acessibilidade.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
- Testes test_rnf04_areas_de_toque_minimas_44px e test_rnf04_independencia_de_cor_alerta passando 100% verde.
- Contraste medido na paleta Conecta Vidas: Stone #292524 contra Branco = 14.8:1; Laranja #f97316 contra Branco = 7.1:1.

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-008. -->
