---
trigger: glob
globs: "tests/**/*.py, .github/workflows/*.yml"
description: "Padrões de engenharia de qualidade, suíte de testes com Pytest, 100% de cobertura e segurança OWASP Top 10."
---

# Engenharia da Qualidade, Testes e Segurança

## 1. Suíte de Testes Automatizados (Pytest)
- **Localização:** Todo teste automatizado reside estritamente em `tests/`.
- **Camadas de Teste:**
  1. *Regras de Negócio e Serviços (`test_regras_negocio.py`):* Validações determinísticas de cálculo de saldo, bloqueio de estoque insuficiente, isolamento de rotas e idempotência na conclusão.
  2. *Integridade e Acessibilidade (`test_interface_acessibilidade.py`):* Inspeção do DOM, validação de alvos de toque $\ge 44\text{px}$, rótulos acessíveis e atributos de despacho seguro para GPS (`target="_blank"`).
- **Cobertura Contínua de 100%:** Nenhuma linha de lógica de negócios pode existir sem assert correspondente. O relatório oficial deve atestar 100% de cobertura.

## 2. Blindagem OWASP Top 10
- **OWASP A01 (Broken Access Control):** Filtragem estrita de dados no backend por `id_voluntario`. O voluntário em campo não pode acessar registros de outras rotas (prevenção contra IDOR).
- **OWASP A03 (Injection & XSS):** 
  - Tratamento parametrizado de entradas de dados, tratando inputs exclusivamente como valores e não como comandos executáveis.
  - Sanitização de strings variáveis inseridas no DOM para neutralizar injeções de script (`<script>`).
- **OWASP A05 (Security Misconfiguration & Senhas):** 
  - Proibição absoluta de senhas em texto limpo no repositório. Uso de hashes criptográficos robustos com salt.
  - Ausência de segredos ou tokens comitados no código.

## 3. Automação CI/CD no GitHub Actions
- Todo push ou PR deve disparar o job `qualidade-e-testes` em Ubuntu Latest.
- O pipeline só é aprovado se todos os testes passarem sem avisos críticos.
- O workflow de monitoramento sintético (`monitoramento.yml`) executa sondas HTTP de disponibilidade a cada 6 horas com alerta de status DOWN em caso de resposta diferente de HTTP 200 ou latência superior a 1.5s.
