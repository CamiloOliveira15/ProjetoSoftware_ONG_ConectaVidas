---
name: backlog-close
description: Homologa e encerra um item de backlog do projeto Conecta Vidas com execução de testes automatizados e evidências reais. Use ao finalizar a implementação de um item.
---

# Backlog Close — Portão de Homologação e Fechamento

## 1. Pré-Requisitos Mandatórios
Antes de homologar o item:
1. Todos os critérios de aceitação do item devem estar satisfeitos.
2. Não deve haver nenhum dado sensível exposto (senhas em texto limpo, RA/RGM de estudantes ou dados socioassistenciais de beneficiários).
3. A suíte completa de testes automatizados deve passar com 100% de sucesso.

## 2. Execução da Homologação
Execute o CLI oficial de fechamento:
```powershell
python scripts/backlog.py close <ID>
```
Exemplo:
```powershell
python scripts/backlog.py close BK-009
```

O comando:
- Dispara automaticamente a suíte de testes `python -m pytest -v`;
- Se todos os testes forem aprovados, atualiza o status do item para `Concluído` em `backlog/controle_backlog.json`;
- Incrementa os contadores de métricas consolidadas do projeto;
- Se algum teste falhar, a operação é abortada imediatamente com código de erro, preservando o status anterior.

## 3. Pós-Fechamento e Versionamento
- Registre o commit semântico correspondente (`feat:`, `fix:`, `test:`, `docs:`);
- Verifique se o README ou as evidências exigem atualização.
