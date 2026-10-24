# 📋 Gerenciamento de Backlog e Governança do Ciclo SDLC

Este diretório abriga a documentação e o controle analítico do backlog de produto e engenharia do **Sistema de Gestão Logística e Voluntariado — ONG Conecta Vidas**. O planejamento e a execução estão estruturados em perfeita harmonia com as quatro experiências práticas da disciplina de **Projeto de Software (Cruzeiro do Sul Virtual)**, além do roadmap de evolução pós-MVP.

---

## 🧭 Arquitetura do Backlog

O backlog está organizado em arquivos modulares orientados ao ciclo de vida de desenvolvimento de software (SDLC):

| Arquivo | Escopo & Experiência Prática | Foco Metodológico | Status |
| :--- | :--- | :--- | :---: |
| [`controle_backlog.json`](controle_backlog.json) | **Matriz Global de Controle** | Base de dados JSON com esquema estruturado, métricas consolidadas, critérios de aceite e rastreabilidade | 🟢 Ativo |
| [`ep01_descoberta_e_requisitos.md`](ep01_descoberta_e_requisitos.md) | **Experiência Prática I** | Investigação de campo, entrevistas empáticas, ODS 2, personas, delimitação de escopo e indicadores iniciais | 🟢 Concluído |
| [`ep02_arquitetura_e_especificacao.md`](ep02_arquitetura_e_especificacao.md) | **Experiência Prática II** | Modelagem relacional, arquitetura REST, requisitos funcionais (RF01-04), segurança (OWASP), acessibilidade (WCAG AA) e protocolo de testes | 🟢 Concluído |
| [`ep03_implementacao_e_qualidade.md`](ep03_implementacao_e_qualidade.md) | **Experiência Prática III** | Codificação defensiva, suíte Pytest 100% coverage, pipeline CI GitHub Actions, 2 rodadas de validação com João Batista e refatoração de chips visuais | 🟢 Concluído |
| [`ep04_deploy_monitoramento_e_encerramento.md`](ep04_deploy_monitoramento_e_encerramento.md) | **Experiência Prática IV** | Deploy contínuo em nuvem pública (GitHub Pages HTTPS), monitoramento sintético 24/7, governança LGPD, impacto social medido e termo formal de aceite | 🟢 Concluído |
| [`ep05_futuras_melhorias_e_pwa.md`](ep05_futuras_melhorias_e_pwa.md) | **Evolução Contínua (Roadmap)** | Arquitetura Local-First, Progressive Web App (PWA), resiliência desconectada via IndexedDB e roteirização multi-paradas | 🟡 Planejado |

---

## 📊 Métricas Consolidadas do Ciclo de Desenvolvimento

* **Total de Itens Gerenciados:** 22 itens de trabalho
* **Itens Homologados e Entregues:** 19 itens (100% do escopo acadêmico)
* **Itens Futuros Mapeados:** 3 itens (arquitetura Local-First e otimizações)
* **Pontos de História Entregues:** 89 Story Points
* **Cobertura de Testes Automatizados:** 100% (12 testes via Pytest)
* **Uptime Operacional em Produção:** 100% (Latência média de 39ms com nó regional Fastly Edge em SP)
* **Aderência aos Indicadores de Impacto Social (ODS 2.1):**
  * *Tempo de Triagem e Check-in:* Reduzido em **63%** (de 92s para 34s, superando a meta de 50%).
  * *Taxa de Desperdício de Alimentos:* **0%** durante todo o ciclo de operação (eliminando perdas por validade).

---

## 🎯 Metodologia de Priorização (MoSCoW)

Para viabilizar a entrega individual em regime autônomo com máxima confiabilidade técnica e zero complexidade acidental (*Zero Over-Engineering*), adotou-se o framework de priorização **MoSCoW**:

1. **Must Have (Obrigatório):**
   * Validação de estoque físico antes de despachar (`RF01`);
   * Escala mobile personalizada com isolamento de dados (`RF02`);
   * Baixa da entrega com modal de confirmação defensiva e bloqueio de duplicidade (`RF03`);
   * Acessibilidade WCAG 2.1 AA com botões $\ge 44\text{px}$, chips visuais de alto contraste e independência de cor (`RNF04`);
   * Automação de testes com 100% de cobertura e pipeline de CI (`QA-CI-01`, `QA-CI-02`);
   * Deploy público em nuvem com HTTPS nativo (`DEP-01`).
2. **Should Have (Importante):**
   * Despacho dinâmico para GPS externo via URL Scheme universal (`RF04`);
   * Monitoramento sintético contínuo com Health Check a cada 6h (`MON-01`);
   * Arquitetura PWA Local-First para resiliência offline em áreas periféricas (`PWA-01`, `SYNC-01`).
3. **Could Have (Desejável):**
   * Algoritmo de roteirização multi-pontos para redução de trajeto (`ROTA-01`).
4. **Won't Have (Deliberadamente Fora do Escopo):**
   * Integrações caras com APIs de nuvem com faturamento em dólar;
   * Módulo bancário/financeiro e leitura de código de barras físico;
   * Coleta invasiva de biometria ou fotos de famílias vulneráveis (em conformidade com a LGPD).

---

## 🔗 Consumo do Arquivo de Controle

O arquivo [`controle_backlog.json`](controle_backlog.json) é o ponto central de rastreabilidade. Ele pode ser consumido diretamente por scripts de automação, ferramentas de CI/CD ou importado em softwares de gerenciamento ágil (como Jira, Linear ou Azure DevOps) para alimentar pipelines de entrega contínua.
