---
id: "BK-022"
title: "BK-022: Otimização Algorítmica Multi-Paradas para Rotas de Distribuição"
type: "backlog"
status: "pending"
created: "2026-05-20"
priority: "could-have"
points: 5
parent: "EP5_FUTURO"
epic_id: "EPIC-05"
tags: ["algoritmos", "roteirizacao", "tsp", "logistica"]
validation:
  tests: ["tests/test_regras_negocio.py"]
  tooling: ["scripts/backlog.py"]
---

# BK-022: Otimização Algorítmica Multi-Paradas para Rotas de Distribuição

## Contexto & Cenário Operacional
Quando um voluntário recebe uma escala com 8 ou 10 famílias no mesmo bairro, a ordem de entrega definida intuitivamente costuma gerar ziguezagues e desperdício de combustível pago pela própria comunidade. Um algoritmo heurístico simples (Nearest Neighbor + 2-opt) resolverá o problema do caixeiro viajante (TSP).

> **História de Usuário:**  
> *"Como coordenador de logística, quero que o sistema sugira a ordem ótima de entrega das paradas, para minimizar a quilometragem percorrida e o consumo de combustível."*

## Contrato Técnico & Regras Inegociáveis
Cálculo heurístico estático no cliente sem depender de APIs pagas de otimização de frota; tempo de cálculo inferior a 200ms para até 20 paradas; tolerância a coordenadas aproximadas.

## Critérios de Aceite (Cenários BDD / Gherkin)
- [ ] **Otimização da sequência de paradas**
  - **Dado que** uma lista com 6 endereços de entrega atribuídos ao voluntário
  - **Quando** acionado o otimizador de rota
  - **Então** o sistema deve reordenar as paradas reduzindo a distância total estimada em pelo menos 15%.

## Fora de Escopo (Zero Over-Engineering)
Modelagem avançada com restrição de janelas de tempo estritas por família.

## Validação Declarada
- **Testes Automatizados:** `tests/test_regras_negocio.py`
- **Ferramental:** `scripts/backlog.py`

## Evidências de Validação
<!-- Pendente: item planejado no roadmap pós-MVP -->

## Achados Derivados
<!-- Débitos técnicos, bugs ou melhorias descobertas durante a execução de BK-022. -->
