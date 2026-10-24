# 🌾 Backlog da Experiência Prática I — Investigação e Diagnóstico Comunitário

> **Marco Acadêmico:** Experiência Prática I (EP1)  
> **Tema Central:** Descoberta de Produto, Diagnóstico Empírico e Conexão com o ODS 2  
> **Comunidade Parceira:** Associação Comunitária Pão e Vida (ACPV) / ONG Conecta Vidas (Zona Leste de São Paulo)  
> **Stakeholders Chave:** Sra. Maria da Conceição (Coordenadora de Projetos) e Voluntários Operacionais  

---

## 🎯 1. Visão Geral e Contexto da Descoberta

A Associação Comunitária Pão e Vida (ACPV) atua há dez anos na promoção da segurança alimentar, operando como um banco de alimentos comunitário que arrecada mantimentos de supermercados parceiros e doadores locais para atender cerca de **300 famílias em vulnerabilidade socioeconômica**. 

A investigação in loco revelou que a entidade enfrentava severos estrangulamentos devido à gestão estritamente manual:
1. **Desperdício Invisível:** Anotações em cadernos físicos sem ordenação temporal resultavam na perda de alimentos perecíveis no fundo do armazém (ocorrência documentada de descarte de 15 kg de feijão vencido).
2. **Filas Extenuantes:** Controle de beneficiários em fichas alfabéticas de papel provocava triagem lenta (média de 92 segundos por atendimento), expondo famílias a longas esperas ao ar livre sob sol ou chuva.
3. **Sobrecarga dos Voluntários:** Esforço burocrático excessivo que desviava a equipe do acolhimento social humanizado.

---

## 👥 2. Personas e Público-Alvo Mapeados

* **Usuário Direto Primário:** Coordenadores da ONG (ex: Maria da Conceição, ~55 anos, letramento digital intermediário) e voluntários operacionais de campo (rotativos, entre 20 e 60 anos, alta mobilidade com smartphone sob luz solar e Wi-Fi instável).
* **Beneficiários Indiretos:** As 300 famílias vulneráveis da comunidade, que se beneficiam com alimentos em prazos adequados, atendimento ágil e tratamento digno.

---

## 📋 3. Itens do Backlog da Experiência Prática I

### [BK-001] Investigação Contextual e Registro de Doações com Controle FIFO
* **Código:** `HU-EP1-01`
* **Tipo:** Descoberta de Produto / Regra de Negócio
* **Prioridade (MoSCoW):** Must Have
* **Pontos de História:** 5
* **História de Usuário:**
  > *Como voluntário de triagem, quero registrar a entrada de doações de alimentos perecíveis indicando a data de validade através de uma interface simples no celular, para garantir que o sistema rastreie os prazos e alerte visualmente sobre os produtos prioritários para distribuição (FIFO - First-In, First-Out), evitando o desperdício de comida.*
* **Critérios de Aceitação:**
  - [x] Condução de observação contextual in loco na rotina física de recebimento de doações.
  - [x] Entrevista semiestruturada registrando o descarte prévio de alimentos por falta de controle de validade.
  - [x] Estruturação da regra de priorização FIFO para itens perecíveis no planejamento do MVP.

---

### [BK-002] Check-in Digital de Beneficiários e Descentralização da Triagem
* **Código:** `HU-EP1-02`
* **Tipo:** Descoberta de Produto / Usabilidade
* **Prioridade (MoSCoW):** Must Have
* **Pontos de História:** 5
* **História de Usuário:**
  > *Como coordenadora da distribuição, quero pesquisar o nome ou número de uma família beneficiária e registrar a entrega da cesta básica de forma rápida com poucos toques na tela, para agilizar o atendimento na porta da associação, reduzindo as filas e mantendo histórico confiável de recebimento.*
* **Critérios de Aceitação:**
  - [x] Identificação do tempo baseline do atendimento analógico (92 segundos com fichas físicas).
  - [x] Definição de meta de redução mínima de 50% no tempo médio de triagem.
  - [x] Previsão de interface com botões táteis largos para uso rápido sem exigir treinamento extensivo.

---

### [BK-003] Painel Centralizado de Alertas de Vencimento
* **Código:** `HU-EP1-03`
* **Tipo:** Descoberta de Produto / Monitoramento de Estoque
* **Prioridade (MoSCoW):** Should Have
* **Pontos de História:** 5
* **História de Usuário:**
  > *Como gestor de armazém, quero visualizar um painel (dashboard) central que destaque imediatamente os lotes de alimentos que expiram nos próximos 7 a 15 dias, para planejar a montagem das cestas básicas atempadamente sem necessidade de procurar caixas esquecidas nas prateleiras.*
* **Critérios de Aceitação:**
  - [x] Definição de marcadores visuais para itens com proximidade de vencimento.
  - [x] Integração conceitual entre o saldo do estoque e as escalas diárias de entrega.

---

### [BK-004] Delimitação de Escopo e Diretriz de Zero Over-Engineering
* **Código:** `HU-EP1-04`
* **Tipo:** Arquitetura / Planejamento
* **Prioridade (MoSCoW):** Must Have
* **Pontos de História:** 3
* **História de Usuário:**
  > *Como arquiteto de software individual, quero estabelecer limites claros para o MVP, para concentrar esforços nos gargalos reais e entregar uma aplicação operacional dentro do prazo acadêmico.*
* **Critérios de Aceitação:**
  - [x] Exclusão formal de leitura ótica de códigos de barras ou integração XML com supermercados.
  - [x] Exclusão formal de módulo bancário, conciliação financeira e emissão de notas fiscais.
  - [x] Exclusão de compilação de aplicativos móveis nativos para publicação em lojas (App Store/Google Play).
  - [x] Adoção da arquitetura Web Responsiva Mobile-First.

---

## 📈 4. Indicadores de Resultado Estabelecidos

1. **Tempo Médio de Triagem e Check-in por Família (Quantitativo):**
   * *Baseline:* 92 segundos por família no modelo analógico com fichas de papel.
   * *Meta de Sucesso:* Redução igual ou superior a 50% ($\le 46\text{s}$).
   * *Conexão com ODS:* Dignidade no atendimento às famílias vulneráveis e eliminação de aglomerações.
2. **Taxa de Desperdício de Alimentos Perecíveis (Quantitativo):**
   * *Baseline:* Perdas crônicas relatadas (ex: 15 kg de feijão descartados no mês anterior).
   * *Meta de Sucesso:* Redução da taxa para próxima a 0%.
   * *Conexão com ODS:* Meta 2.1 do ODS 2 (Fome Zero) — todo alimento arrecadado deve chegar à mesa de quem precisa.
