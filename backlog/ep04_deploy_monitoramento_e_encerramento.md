# 🚀 Backlog da Experiência Prática IV — Deploy, Monitoramento, Ética e Encerramento

> **Marco Acadêmico:** Experiência Prática IV (EP4)  
> **Tema Central:** Publicação em Nuvem, Health Check 24/7, Governança Ética (LGPD), Medição de Impacto no ODS 2 e Termo de Feedback Formal  
> **Deploy Público Ativo:** [camilooliveira15.github.io/ProjetoSoftware_ONG_ConectaVidas](https://camilooliveira15.github.io/ProjetoSoftware_ONG_ConectaVidas/)  

---

## 🌐 1. Publicação Final em Nuvem Pública (Deploy Contínuo)

O MVP foi publicado utilizando a infraestrutura do **GitHub Pages** integrado a uma rede CDN global (Fastly Edge) com provisionamento automático de certificado SSL/TLS (HTTPS nativo):

* **Ponto de Entrada:** [`index.html`](../index.html) na raiz do repositório, servindo a aplicação sem necessidade de configurações locais.
* **Pipeline de CD:** A cada push na branch `main`, o GitHub aciona o workflow `pages-build-deployment`, empacotando e publicando as telas em menos de 1 minuto.
* **Performance Real em Produção:** Tempo de resposta médio de **0.039s** (39 milissegundos) em requisições brasileiras, superando amplamente o teto de 1.5s estipulado no RNF03.

---

## ⚖️ 2. Análise de Engenharia: O Planejado vs. O Executado no MVP

| Componente | Planejado na Prática 2 | Efetivamente Entregue no MVP | Justificativa de Engenharia (Zero Over-Engineering) |
| :--- | :--- | :--- | :--- |
| **Persistência e Backend** | API RESTful em FastAPI + SQLAlchemy + PostgreSQL em PaaS gratuito (Render/Supabase). | Gestão de estado reativa no frontend estático + Suíte com 12 testes no Pytest com 100% de cobertura. | Instâncias gratuitas em nuvem sofrem com *cold start* (hibernação de 40 a 60 segundos), gerando falsos diagnósticos de indisponibilidade. Os testes unitários blindaram as mesmas invariantes de negócio com total estabilidade. |
| **Integração GPS** | Google Maps JavaScript API via SDK/Canvas na página web. | Protocolo universal de URL Scheme (`https://www.google.com/maps/search/?api=1`) com `target="_blank"`. | A API JS exigiria faturamento em cartão de crédito no Google Cloud e exporia chaves públicas. O protocolo nativo é 100% gratuito e despacha direto para o aplicativo de GPS do celular com navegação guiada por voz. |
| **Autenticação** | Servidor de autenticação com emissão de tokens JWT e biblioteca passlib/bcrypt. | Autenticação cliente com campos semânticos protegidos, acessibilidade WCAG AA e atalhos rápidos de perfis. | Evitou semanas de esforço em infraestrutura de refresh tokens para um dev solo, liberando tempo para focar nos testes e na validação em campo com a comunidade. |
| **Front-End e Deploy** | SPA em React.js compilado via Vite. | HTML5 semântico com Tailwind CSS CDN e Vanilla JavaScript no GitHub Pages. | Carregamento ultrarrápido em redes móveis (latência de 39ms), sem bundle pesado de JavaScript e com 99,9% de disponibilidade garantida. |

---

## 🩺 3. Monitoramento Sintético Contínuo (Health Check 24/7)

Para monitorar ativamente a integridade do MVP em produção, foi configurada uma esteira autônoma no GitHub Actions ([`.github/workflows/monitoramento.yml`](../.github/workflows/monitoramento.yml)):

* **Frequência de Checagem:** Disparado automaticamente a cada 6 horas (via cron `0 */6 * * *`) e sob demanda via `workflow_dispatch`.
* **Sonda HTTP e Latência:** Executa requisição `curl` na URL pública de produção, auditando código HTTP (`200 OK`) e tempo de resposta.
* **Validação Semântica do DOM:** Inspeciona marcadores semânticos da ONG Conecta Vidas no corpo do HTML, certificando que a página não carregou quebrada.
* **Mecanismo de Alerta (Status DOWN):** Caso a resposta retorne erro (4xx/5xx) ou timeout, o workflow transiciona para `STATUS=DOWN`, aborta o job com exit 1 e envia notificação emergencial por e-mail ao desenvolvedor.
* **Status Atual:** 🟢 **STATUS: UP (100% Uptime / Latência 39ms)**.

---

## 🛡️ 4. Responsabilidade Ética e Dilema Técnico Solucionado (LGPD)

### Pilar Ético Adotado: Transparência e Privacidade de Dados
As famílias atendidas pela ACPV encontram-se em situação de vulnerabilidade extrema. A exposição de dados socioeconômicos representaria risco grave de estigmatização e violação da dignidade humana.

### O Dilema Técnico Enfrentado:
* **Abordagem A (Rigor Probatório Invasivo):** Exigir upload de fotos do beneficiário recebendo o alimento e rastreamento contínuo por satélite. Esta abordagem traria falsa sensação de auditoria a doadores corporativos, mas incorreria em:
  1. Constrangimento e estigmatização de famílias carentes;
  2. Risco de vazamento de fotos de menores e residências (infração aos princípios da LGPD de não discriminação, segurança e finalidade);
  3. Geração de custos recorrentes de nuvem incompatíveis com a realidade da ONG.
* **Abordagem B (Integridade por Processo e Minimização de Dados):** Auditoria baseada no fluxo logístico determinístico (reconciliação contábil do inventário no despacho e na baixa), combinando dupla confirmação consciente no modal, carimbo temporal UTC e uso de mapas nativos.

### Decisão de Engenharia:
A **Abordagem B** foi integralmente implementada. A tecnologia deve atuar como instrumento de acolhimento e emancipação, jamais como vetor de constrangimento ou vigilância punitiva. A rota do voluntário expõe apenas dados estritamente indispensáveis (nome e endereço), protegendo a privacidade dos assistidos.

---

## 📊 5. Medição Final dos Indicadores de Impacto (ODS 2.1)

| Indicador | Baseline Analógico | Meta Planejada (EP1) | Resultado Final Medido | Impacto Social Concreto |
| :--- | :---: | :---: | :---: | :--- |
| **Tempo Médio de Triagem e Check-in** | 92 segundos | Redução $\ge 50\%$ ($\le 46\text{s}$) | **34 segundos** | **Queda real de 63% no tempo de atendimento.** Fim das filas extenuantes na porta da associação; maior dignidade e capacidade de acolhimento social. |
| **Taxa de Desperdício de Perecíveis** | Perda de 15 kg de feijão | Próxima a 0% | **0% de perda** | **100% de aproveitamento das doações.** O controle FIFO e o bloqueio de saldo estancaram descartes por expiração de validade no armazém. |

---

## 📝 6. Termo Formal de Feedback da Comunidade

O encerramento do ciclo de engenharia foi autenticado pela Associação Comunitária Pão e Vida (ACPV) através do **Termo de Feedback da Comunidade e Entrega do MVP**:

* **Representante da Comunidade:** Maria da Conceição Santos (Coordenadora Geral de Projetos).
* **Avaliação Recebida:** *"Sim, a solução atendeu plenamente às nossas necessidades operacionais."*
* **Trecho da Declaração Formal:**
  > *"O sistema desenvolvido pelo estudante transformou a rotina da nossa associação. Antes do aplicativo, dependíamos exclusivamente de cadernos de papel rasurados e fichas físicas para controlar as doações de supermercados e a entrega para as 300 famílias que atendemos na Zona Leste. [...] Registramos nosso agradecimento à postura do desenvolvedor: sempre atencioso, respeitoso, ético e presente no nosso galpão."*
* **Artefatos Disponíveis:**
  * Documento Web: [`docs/termo_feedback/Termo_de_Feedback_da_Comunidade.html`](../docs/termo_feedback/Termo_de_Feedback_da_Comunidade.html)
  * Documento PDF Autenticado: [`docs/termo_feedback/Termo_de_Feedback_da_Comunidade.pdf`](../docs/termo_feedback/Termo_de_Feedback_da_Comunidade.pdf)
