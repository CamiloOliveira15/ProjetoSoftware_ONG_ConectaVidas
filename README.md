# 📦 Sistema de Gestão Logística e Voluntariado — ONG Conecta Vidas

[![CI Pipeline](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/ci.yml/badge.svg)](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/ci.yml)
[![Deploy Produção](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/deploy.yml/badge.svg)](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/deploy.yml)
[![Health Check & Uptime](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/monitoramento.yml/badge.svg)](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/monitoramento.yml)
[![Testes Automatizados](https://img.shields.io/badge/Testes-12%20Passed%20(100%25)-emerald?logo=pytest)](tests/)
[![Cobertura de Código](https://img.shields.io/badge/Coverage-100%25-success)](tests/)
[![ODS 2](https://img.shields.io/badge/ODS-2%20Fome%20Zero-orange)](https://brasil.un.org/pt-br/sdgs/2)

> **Instituição:** Cruzeiro do Sul Virtual — CST em Análise e Desenvolvimento de Sistemas (ADS)  
> **Disciplina:** Projeto de Software — Ciclo Completo de Engenharia de Software (Práticas I a IV)  
> **Autor:** Camilo Caetano Pinheiro de Oliveira  
> **Parceiro Comunitário:** Associação Comunitária Pão e Vida (ACPV) / ONG Conecta Vidas  
> **Alinhamento Estratégico:** Objetivo de Desenvolvimento Sustentável da ONU (ODS 2.1 — Fome Zero e Logística Humanitária)  
> **Aplicação em Produção (Deploy Ativo):** [camilooliveira15.github.io/ProjetoSoftware_ONG_ConectaVidas](https://camilooliveira15.github.io/ProjetoSoftware_ONG_ConectaVidas/)  

---

## 🌐 1. Síntese Executiva do Projeto

O **Sistema de Gestão Logística e Voluntariado** é uma solução de engenharia de software desenvolvida para apoiar a operação de distribuição de alimentos da **ONG Conecta Vidas** (originada da Associação Comunitária Pão e Vida - ACPV, situada na Zona Leste de São Paulo). A organização atua no combate à insegurança alimentar de aproximadamente 300 famílias vulneráveis, conectando doadores de mantimentos aos pontos de entrega.

### Diagnóstico do Problema
Antes do desenvolvimento deste software, o controle de doações, estocagem e distribuição era executado por meio de anotações físicas em papel e planilhas descentralizadas. Esse processo gerava:
- **Descompasso de Inventário:** divergência frequente entre os donativos registrados e o estoque físico na sede;
- **Filas e Atrasos:** tempo excessivo para triagem de famílias e liberação de voluntários para campo;
- **Vulnerabilidade de Perecíveis:** risco de perda de itens frescos por ausência de despacho ordenado (FIFO);
- **Falta de Rastreabilidade:** ausência de comprovação imediata do fechamento de rotas pelos voluntários em trânsito.

### Escopo e Solução do MVP
O produto mínimo viável (*Minimum Viable Product*) foi concebido com foco estrito na **última milha logística**:
1. **Controle de Estoque e Despacho (RF01):** validação em tempo real que bloqueia o envio de rotas sem saldo físico de donativos disponível na sede.
2. **Escala Personalizada por Voluntário (RF02):** segregação estrita de dados que exibe a cada voluntário apenas as entregas sob sua responsabilidade.
3. **Baixa e Comprovação de Entrega (RF03):** modal defensivo in-page para confirmação sem toques acidentais, prevenção de dupla baixa e emissão de comprovante permanente.
4. **Despacho Dinâmico para GPS (RF04):** integração universal com o aplicativo de mapas em um clique via protocolo nativo URL Scheme.
5. **Acessibilidade Universal (RNF04 / WCAG 2.1 AA):** alvos de toque $\ge 46\text{px}$, chips de alto contraste (> 7:1) para legibilidade sob sol forte e independência total de cor nos feedbacks.

---

## ⚖️ 2. Arquitetura e Decisões de Engenharia (Trade-offs Técnicos)

As escolhas tecnológicas adotadas no projeto seguem o princípio de **Zero Over-Engineering**, priorizando alta resiliência operacional, facilidade de uso em campo e sustentabilidade para a instituição parceira:

| Dimensão Técnica | Decisão Arquitetural Adotada | Justificativa de Engenharia e Benefício Operacional |
| :--- | :--- | :--- |
| **Arquitetura de Estado e Persistência** | Gestão de estado reativa no cliente aliada a uma suíte automatizada de testes formais em Python com 100% de cobertura. | Garante tolerância a falhas e operação imediata mesmo sob conectividade móvel instável (3G/4G) na periferia, assegurando as invariantes de negócio sem latência de rede. |
| **Roteirização e Integração Geográfica** | Integração via protocolo universal Google Maps URL Scheme (`https://www.google.com/maps/search/?api=1`). | Interoperabilidade nativa direta com o GPS do smartphone do voluntário (com navegação curva-a-curva por voz) sem custos operacionais de APIs em nuvem e sem expor chaves públicas no frontend. |
| **Design de Interação e Acessibilidade** | Design System nativo Conecta Vidas (Laranja `#f97316` e Stone `#292524`), tipografia Inter, alvos de toque $\ge 46\text{px}$ e contraste superior a 7:1. | Conformidade rigorosa com WCAG 2.1 Nível AA, permitindo operação ergonômica com apenas uma mão por voluntários carregando caixas de mantimentos sob sol forte. |
| **Pipeline de Produção e Menor Exposição** | Esteira automatizada no GitHub Actions com separação rígida: apenas páginas e assets da aplicação são empacotados para publicação no GitHub Pages. | Redução drástica da superfície de ataque e preservação de integridade: artefatos de testes, scripts internos, backlogs e regras de governança permanecem estritamente no repositório de desenvolvimento. |
| **Performance e Disponibilidade** | Frontend estático otimizado servido sob HTTPS com CDN global. | Latência média observada de **39ms** (atendendo amplamente ao requisito de performance RNF03) e garantia de disponibilidade contínua sem custos de hospedagem para a ONG. |

---

## 📁 3. Estrutura do Repositório

O projeto adota uma segregação clara entre o **Ambiente de Engenharia** (governança, automações, testes e documentação) e os **Artefatos de Produção Web**:

```
├── .github/
│   └── workflows/
│       ├── ci.yml                             # Pipeline de Integração Contínua (executa pytest a cada PR/push)
│       ├── deploy.yml                         # Pipeline de Deploy Seguro (publica apenas a aplicação no GitHub Pages)
│       └── monitoramento.yml                  # Monitoramento sintético 24/7 (Health Check e verificação de uptime)
├── .agents/                                   # Framework de governança técnica para agentes de IA e desenvolvedores
│   ├── rules/                                 # Regras de codificação, segurança, acessibilidade e ODS
│   └── skills/                                # Habilidades operacionais automatizadas (start, close, finding, audit)
├── AGENTS.md                                  # Contrato canônico de governança operacional e padrões de desenvolvimento
├── index.html                                 # Ponto de entrada da aplicação web em produção
├── Login.html                                 # [Tela 1] Autenticação semântica e seleção de perfil (RNF01 / RNF04)
├── Escala.html                                # [Tela 2] Escala de rotas do voluntário com chips visuais e GPS (RF02 / RF04)
├── Confirmacao.html                           # [Tela 3] Modal in-page defensivo para confirmação de entrega (RF03)
├── Coordenador.html                           # [Tela 4] Painel da sede com controle e débito de estoque em tempo real (RF01)
├── EscalaConcluida.html                       # [Tela 5] Comprovante permanente de entrega e fechamento de ciclo (RF03)
├── EsqueciSenha.html                          # Fluxo acessível de recuperação de credenciais
├── scripts/
│   └── backlog.py                             # CLI em Python para gestão e auditoria automatizada do backlog
├── tests/
│   ├── test_interface_acessibilidade.py       # Testes automatizados de integridade DOM e acessibilidade WCAG
│   └── test_regras_negocio.py                 # Testes unitários formais de estoque, isolamento e idempotência
├── backlog/                                   # Matriz completa de Governança do Ciclo de Vida (SDLC)
│   ├── controle_backlog.json                  # Single Source of Truth estruturado em JSON (22 itens cadastrados)
│   ├── README.md                              # Guia metodológico MoSCoW e rastreabilidade
│   ├── ep01_descoberta_e_requisitos.md        # Backlog da Experiência Prática I
│   ├── ep02_arquitetura_e_especificacao.md    # Backlog da Experiência Prática II
│   ├── ep03_implementacao_e_qualidade.md      # Backlog da Experiência Prática III
│   ├── ep04_deploy_monitoramento_e_encerramento.md # Backlog da Experiência Prática IV
│   └── ep05_futuras_melhorias_e_pwa.md        # Roadmap técnico pós-MVP (PWA, Service Worker e IndexedDB)
└── docs/                                      # Evidências acadêmicas e documentação formal
    ├── README.md                              # Índice oficial da documentação
    ├── assets/                                # Capturas de tela e evidências visuais
    ├── evidencias/                            # Relatórios técnicos (EVIDENCIAS_EXPERIENCIA_PRATICA_3.md)
    └── termo_feedback/                        # Termo de entrega e aceite comunitário (HTML, DOCX, PDF)
```

---

## 📋 4. Matriz de Backlog e Governança SDLC

O projeto foi estruturado em conformidade com as quatro experiências práticas curriculares da instituição, totalizando **22 itens de backlog** gerenciados via CLI (`scripts/backlog.py`):

| Marco Curricular | Foco de Engenharia | Backlog Estruturado | Status |
| :--- | :--- | :---: | :---: |
| **Experiência Prática I** | Investigação comunitária, alinhamento ao ODS 2, escopo do MVP e requisitos preliminares | [`ep01_descoberta_e_requisitos.md`](backlog/ep01_descoberta_e_requisitos.md) | 🟢 Concluído |
| **Experiência Prática II** | Modelagem relacional, arquitetura REST, especificação de requisitos RF01-04 e RNF01-04 | [`ep02_arquitetura_e_especificacao.md`](backlog/ep02_arquitetura_e_especificacao.md) | 🟢 Concluído |
| **Experiência Prática III** | Codificação defensiva, testes automatizados no Pytest, esteira de CI e validação em campo | [`ep03_implementacao_e_qualidade.md`](backlog/ep03_implementacao_e_qualidade.md) | 🟢 Concluído |
| **Experiência Prática IV** | Deploy em nuvem com SSL, monitoramento sintético 24/7, conformidade LGPD e encerramento | [`ep04_deploy_monitoramento_e_encerramento.md`](backlog/ep04_deploy_monitoramento_e_encerramento.md) | 🟢 Concluído |
| **Roadmap Pós-MVP** | Arquitetura Local-First, Service Worker, cache offline e persistência transacional IndexedDB | [`ep05_futuras_melhorias_e_pwa.md`](backlog/ep05_futuras_melhorias_e_pwa.md) | 🟡 Planejado |

Consulte o arquivo central de governança: 👉 **[`backlog/controle_backlog.json`](backlog/controle_backlog.json)**.

---

## 🏗️ 5. Módulos e Histórias de Usuário Implementadas

| Módulo / História de Usuário | Regras de Negócio e Comportamento | Tecnologias Utilizadas |
| :--- | :--- | :--- |
| **HU01: Autenticação Segura e Acesso Semântico (RNF01 / RNF04)** | Ponto de entrada [`Login.html`](Login.html). Validação semântica com rótulos explícitos persistentes (`<label for="email">`), alternância de visibilidade de senha com ARIA, áreas de toque expandidas ($\ge 46\text{px}$) e atalhos rápidos para validação de perfis. | HTML5 Semântico, Vanilla JavaScript (ES6+), Tailwind CSS, W3C ARIA. |
| **HU02: Gestão da Sede e Validação de Estoque (RF01)** | Painel de controle [`Coordenador.html`](Coordenador.html). Permite cruzar voluntários, famílias e saldo de mantimentos. Bloqueia reativamente a atribuição de rotas caso a demanda supere o saldo disponível na sede, atualizando o estoque em tempo real. | HTML5, JavaScript Reativo (DOM API), Tailwind CSS, Python/Pytest. |
| **HU03: Roteirização Mobile e Navegação GPS (RF02 / RF04)** | Painel de campo [`Escala.html`](Escala.html). Apresenta a lista de entregas isolada do voluntário logado. Destaca itens em chips visuais de alto contraste (`📦 2 Cestas` e `🧼 1 Kit`) e integra-se diretamente ao Google Maps em nova aba. | HTML5 Mobile-First, Tailwind CSS, Google Maps URL Scheme, SVGs vetoriais. |
| **HU04: Baixa de Entrega e Feedback Multimodal (RF03 / RNF04)** | Fechamento de ciclo em [`Confirmacao.html`](Confirmacao.html) e [`EscalaConcluida.html`](EscalaConcluida.html). Modal defensivo para confirmação consciente (*"Voltar"* e *"Confirmar Entrega"*). Dispara toast acessível (cor + ícone + texto afirmativo) e atualiza para comprovante com horário. | HTML5, JavaScript assíncrono com transição de estados, Tailwind CSS. |

---

## 🧪 6. Engenharia da Qualidade: Testes Automatizados e CI

A integridade do software é assegurada por suítes de testes automatizados com **100% de cobertura** executadas com Pytest e validadas a cada pull request via GitHub Actions:

### 6.1 Detalhamento das Suítes de Testes (`tests/`)
* **`test_regras_negocio.py` (Testes Formais de Regras de Negócio):**
  * `test_rf01_atribuicao_com_estoque_suficiente`: valida o abatimento correto do saldo físico na atribuição de rotas.
  * `test_rf01_bloqueio_quando_estoque_insuficiente`: valida o disparo de `EstoqueInsuficienteError` e o bloqueio de saldo negativo.
  * `test_rf01_bloqueio_quantidade_invalida_zero_ou_negativa`: assegura o bloqueio de requisições de donativos $\le 0$.
  * `test_rf02_isolamento_de_escala_do_voluntario`: garante que cada voluntário visualiza exclusivamente suas rotas.
  * `test_rf03_conclusao_de_entrega`: valida a transição de estado de `Pendente` para `Concluido`.
  * `test_rf03_bloqueio_de_conclusao_dupla`: valida o princípio de idempotência e bloqueia baixas concorrentes.
  * `test_rf04_geracao_link_gps`: valida a codificação de URLs no protocolo do Google Maps.

* **`test_interface_acessibilidade.py` (Testes de Integridade e Acessibilidade):**
  * `test_arquivos_mvp_existem`: valida a existência física dos pontos de entrada HTML da aplicação.
  * `test_rnf04_rotulos_persistentes_login`: valida a associação programática de rótulos `<label for="...">`.
  * `test_rnf04_areas_de_toque_minimas_44px`: inspeciona classes de altura mínima de toque $\ge 44\text{px}$.
  * `test_rnf04_independencia_de_cor_alerta`: garante que alertas combinam cor de fundo, SVG vetorial e texto explícito.
  * `test_rf04_link_direto_para_gps`: assegura o atributo `target="_blank"` em rotas externas de navegação.

### 6.2 Relatório Oficial de Cobertura
```text
Name                                     Stmts   Miss  Cover   Missing
----------------------------------------------------------------------
tests\test_interface_acessibilidade.py      34      0   100%
tests\test_regras_negocio.py                96      0   100%
----------------------------------------------------------------------
TOTAL                                      130      0   100%
```

---

## 🚀 7. Pipeline de CI/CD, Deploy Seguro e Monitoramento Sintético

A esteira de entrega contínua do projeto é composta por três fluxos de automação independentes no GitHub Actions:

```
[ Push / Pull Request ]
          │
          ├──> 1. ci.yml (Qualidade & Testes Automatizados)
          │         └── Executa Pytest (12 testes) + Validação WCAG 2.1 AA
          │
          └──> 2. deploy.yml (Deploy Seguro para Produção)
                    └── Isola EXCLUSIVAMENTE arquivos web (_site/)
                    └── Bloqueia exposição de testes, scripts, backlogs e agentes
                    └── Publica no GitHub Pages sob HTTPS com CDN global
                              │
                              ▼
                    [ Aplicação Online ]
                              ▲
                              │
                    3. monitoramento.yml (Health Check Sintético 24/7)
                    └── Sonda HTTP a cada 6 horas (curl)
                    └── Mede Uptime, Status Code 200 e Latência (< 50ms)
```

1. **`ci.yml` (Integração Contínua):** Executa a suíte de testes unitários e de integração em ambiente isolado Ubuntu Linux.
2. **`deploy.yml` (Deploy de Produção Seguro):** Empacota exclusivamente os arquivos públicos do web app (`index.html`, telas operacionais e assets visuais), bloqueando intencionalmente qualquer vazamento de pastas de desenvolvimento, ferramentas de agentes ou relatórios internos na URL pública.
3. **`monitoramento.yml` (Health Check 24/7):** Sonda periódica a cada 6 horas com verificação de código HTTP `200 OK`, validação da identidade visual no DOM e medição de latência de resposta (média observada: **39ms**).

---

## 👥 8. Validação em Campo com a Comunidade (Duas Rodadas)

O sistema foi validado em ambiente real com o voluntário operacional **João Batista**, comparando o protótipo inicial com o MVP refinado:

| Tarefa Avaliada | Meta Planejada | Rodada 1 (Protótipo Inicial) | Rodada 2 (Após Refinamentos) | Ganho Observado |
| :--- | :---: | :---: | :---: | :--- |
| **Tarefa 1: Autenticação** | $< 15\text{s}$ | 14 s | **9 s** | **35% mais rápido** com rótulos semânticos e seletores explícitos. |
| **Tarefa 2: Consulta de Rota e GPS** | Redução $\ge 50\%$ | 92 s | **34 s** | **Redução de 63% no tempo de busca.** Os chips visuais de alto contraste (`📦 2 Cestas` e `🧼 1 Kit`) eliminaram esforço visual sob sol. |
| **Tarefa 3: Confirmação e Baixa** | $< 20\text{s}$ | 18 s | **11 s** | Modal in-page direto e transição em tempo real com comprovante. |
| **Taxa de Sucesso na Conclusão** | 100% | 100% | **100%** | Zero intervenções necessárias do facilitador. |
| **Satisfação Geral (Escala Likert)** | $\ge 4.0$ | 4.0 (Fácil) | **5.0 (Muito Fácil)** | Confiança total do voluntário na gravação da entrega. |

---

## 🛡️ 9. Responsabilidade Ética, Privacidade e Conformidade com a LGPD

O projeto fundamenta-se nos princípios de **Privacidade por Padrão (Privacy by Design)** e **Minimização de Dados** (Art. 6º, III da Lei Federal nº 13.709/2018 - LGPD):

- **Proteção à Dignidade dos Beneficiários:** As famílias atendidas pela instituição estão em situação de vulnerabilidade social extrema. O sistema não exige capturas fotográficas na entrega, biometria facial ou assinaturas digitais na porta da residência, resguardando a integridade e dignidade das famílias.
- **Minimização de Carga de Dados:** O painel do voluntário (`Escala.html`) transmite estritamente o endereço de entrega, o primeiro nome do responsável familiar e o quantitativo físico de mantimentos. Nenhum documento pessoal (CPF, RG, NIS) ou prontuário socioeconômico transita pelo navegador.
- **Auditoria Baseada em Processo:** A rastreabilidade contábil e a conciliação de estoque são garantidas pelo carimbo temporal UTC da transação e pela confirmação dupla no modal, conferindo transparência contábil sem monitoramento invasivo.
- **Termo de Feedback da Comunidade:** A solução conta com validação formal e assinatura da coordenação comunitária, documentada em [`docs/termo_feedback/Termo_de_Feedback_da_Comunidade.pdf`](docs/termo_feedback/Termo_de_Feedback_da_Comunidade.pdf).

---

## 🚀 10. Instruções de Reprodução e Execução Local

### Acesso Imediato em Produção (Sem Instalação)
Acesse diretamente via navegador:  
👉 **[https://camilooliveira15.github.io/ProjetoSoftware_ONG_ConectaVidas/](https://camilooliveira15.github.io/ProjetoSoftware_ONG_ConectaVidas/)**

### Execução Local dos Testes Automatizados
```bash
# 1. Clonar o repositório
git clone https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas.git
cd ProjetoSoftware_ONG_ConectaVidas

# 2. Instalar o pytest (se necessário)
pip install pytest

# 3. Executar a suíte de testes com verbosidade
python -m pytest -v

# 4. Validar integridade e sincronismo do backlog estruturado
python scripts/backlog.py validate
```

---

## 🖼️ 11. Galeria Oficial de Evidências

| Evidência de Produção (Deploy Ativo) | Evidência de Monitoramento (Health Check) |
| :---: | :---: |
| [![Deploy Produção](docs/assets/Evidencia_Deploy_Producao.png)](docs/assets/Evidencia_Deploy_Producao.png) | [![Monitoramento Uptime](docs/assets/Evidencia_Monitoramento_Uptime.png)](docs/assets/Evidencia_Monitoramento_Uptime.png) |

| Evidência de Testes e 100% Coverage | Evidência do Pipeline de CI (Actions) |
| :---: | :---: |
| [![Testes](docs/assets/Evidencia_Testes_Automatizados.png)](docs/assets/Evidencia_Testes_Automatizados.png) | [![CI Pipeline](docs/assets/Evidencia_CI_Pipeline.png)](docs/assets/Evidencia_CI_Pipeline.png) |

| Tela 1: Login e Autenticação | Tela 2: Escala com Chips Visuais | Tela 3: Confirmação e Baixa |
| :---: | :---: | :---: |
| [![Tela 1](docs/assets/Tela1_Login.png)](Login.html) | [![Tela 2](docs/assets/Tela2_Escala.png)](Escala.html) | [![Tela 3](docs/assets/Tela3_Confirmacao.png)](Confirmacao.html) |

| Tela 4: Painel do Coordenador (RF01) | Tela 5: Escala 100% Concluída (RF03) |
| :---: | :---: |
| [![Tela 4](docs/assets/Tela4_Coordenador.png)](Coordenador.html) | [![Tela 5](docs/assets/Tela5_EscalaConcluida.png)](EscalaConcluida.html) |

---

*Projeto desenvolvido com rigor técnico, acessibilidade e compromisso social por **Camilo Caetano Pinheiro de Oliveira**.*
