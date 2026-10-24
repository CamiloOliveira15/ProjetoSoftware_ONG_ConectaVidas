---
name: backlog-start
description: Inicia e estrutura a execução de um item de backlog do projeto Conecta Vidas. Use sempre ao iniciar uma funcionalidade, correção, melhoria de acessibilidade ou teste.
---

# Backlog Start — Ativação e Planejamento da Tarefa

## 1. Ativação no Catálogo de Backlog
Execute no terminal:
```powershell
python scripts/backlog.py start <ID>
```
Exemplo:
```powershell
python scripts/backlog.py start BK-009
```
O script verifica se o item existe em `backlog/controle_backlog.json` e atualiza seu status para `Em Andamento`.

## 2. Discovery e Checagem de Pré-Requisitos
1. Consulte o item em `backlog/controle_backlog.json` e o markdown da Experiência Prática correspondente (`backlog/ep0*.md`).
2. Leia a regra aplicável em `.agents/rules/`:
   - Para interface e acessibilidade: `.agents/rules/frontend-acessibilidade-ux.md`;
   - Para testes e lógica de backend: `.agents/rules/qualidade-testes-seguranca.md`;
   - Para conformidade ética e ODS: `.agents/rules/governanca-academica-ods.md`.
3. Verifique se a mudança respeita a premissa de **Zero Over-Engineering** e os princípios da LGPD.

## 3. Declaração do Plano de Entrega
Antes de alterar código, declare:
- Requisitos funcionais ou não funcionais afetados;
- Componentes e telas impactadas;
- Testes automatizados que comprovarão a conclusão no Pytest.
