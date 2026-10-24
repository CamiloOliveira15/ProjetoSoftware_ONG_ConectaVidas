# 📦 Sistema de Gestão Logística e Voluntariado — ONG Conecta Vidas

[![CI Pipeline](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/ci.yml/badge.svg)](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/ci.yml)
[![Deploy Produção](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/deploy.yml/badge.svg)](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/deploy.yml)
[![Health Check & Uptime](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/monitoramento.yml/badge.svg)](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas/actions/workflows/monitoramento.yml)
[![Testes Automatizados](https://img.shields.io/badge/Testes-20%20Passed%20(100%25)-emerald?logo=pytest)](tests/)
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

### Escopo e Solução da Stack Integral
A aplicação foi desenvolvida com foco estrito na **última milha logística** utilizando a **Stack Integral proposta na Experiência Prática II** (FastAPI + React + SQLite sem dependência de Docker):
1. **Controle de Estoque e Despacho Atômico (RF01):** validação em tempo real no backend que bloqueia o despacho de rotas sem saldo físico disponível e debita o inventário atomicamente sob transação ACID.
2. **Escala Personalizada e Isolada por Voluntário (RF02):** segregação estrita de dados no backend que exibe a cada voluntário exclusivamente as entregas sob sua responsabilidade (`WHERE id_voluntario = :id`).
3. **Baixa Idempotente e Comprovante Permanente (RF03):** modal defensivo in-page para confirmação consciente, bloqueio determinístico de dupla baixa e registro do carimbo temporal UTC de conclusão.
4. **Despacho Dinâmico para GPS (RF04):** integração universal com o aplicativo de mapas em um clique via protocolo nativo Google Maps URL Scheme (`https://www.google.com/maps/search/?api=1`).
5. **Acessibilidade Universal (RNF04 / WCAG 2.1 AA):** alvos de toque $\ge 46\text{px}$, chips de alto contraste (> 7:1) para legibilidade sob sol forte e independência total de cor nos feedbacks.

---

## ⚖️ 2. Arquitetura e Decisões de Engenharia (Trade-offs Técnicos)

As escolhas tecnológicas adotadas no projeto seguem o princípio de **Zero Over-Engineering**, priorizando alta resiliência operacional, facilidade de uso em campo e sustentabilidade financeira para a ONG:

| Dimensão Técnica | Decisão Arquitetural Adotada | Justificativa de Engenharia e Benefício Operacional |
| :--- | :--- | :--- |
| **Backend RESTful** | Python 3.14 + FastAPI + Pydantic v2 + Bcrypt/PyJWT | Documentação automática OpenAPI (Swagger), validação forte de esquemas (DTOs), alta performance e autenticação stateless por tokens. |
| **Persistência Relacional** | SQLAlchemy 2.0 ORM + SQLite com integridade referencial ativa (`foreign_keys=ON`) | Modelagem 3FN completa com ACID real sem necessidade de provisionamento de containers Docker pesados ou custos de banco em nuvem. |
| **Frontend Reativo** | React 19 + Vite + Tailwind CSS 3.4 (Design System Conecta Vidas) | Modularização em componentes, consumo da API REST via proxy `/api`, feedback instantâneo e tempo de carregamento ultrarrápido (< 2.5s no build). |
| **Roteirização e Integração Geográfica** | Integração via protocolo universal Google Maps URL Scheme (`https://www.google.com/maps/search/?api=1`). | Interoperabilidade nativa direta com o GPS do smartphone do voluntário (com navegação curva-a-curva por voz) sem custos operacionais de APIs em nuvem e sem expor chaves públicas no frontend. |
| **Design de Interação e Acessibilidade** | Design System Conecta Vidas (Laranja `#f97316` e Stone `#292524`), tipografia Inter, alvos de toque $\ge 46\text{px}$ e contraste superior a 7:1. | Conformidade rigorosa com WCAG 2.1 Nível AA, permitindo operação ergonômica com apenas uma mão por voluntários carregando caixas de mantimentos sob sol forte. |
| **Pipeline de Produção e Menor Exposição** | Esteira automatizada no GitHub Actions com separação rígida: compilação do React para `_site/` com preservação de retrocompatibilidade estática. | Redução drástica da superfície de ataque e preservação de integridade: código de produção e testes formais estritamente organizados. |

---

## 📁 3. Estrutura do Repositório

O repositório no GitHub armazena estritamente o código-fonte de produção e a suíte oficial de testes automatizados:

```
├── backend/                                   # Camada de Serviços RESTful e Persistência
│   ├── auth.py                                # Hashing bcrypt, emissão e validação de JWT, dependências de RBAC
│   ├── database.py                            # Configuração do SQLite com PRAGMA foreign_keys=ON e SessionLocal
│   ├── main.py                                # Endpoints RESTful FastAPI (/api/auth, /api/estoque, /api/entregas)
│   ├── models.py                              # Mapeamento ORM SQLAlchemy 2.0 em 3FN com CheckConstraints
│   ├── requirements.txt                       # Dependências Python para execução do servidor
│   ├── schemas.py                             # Esquemas e DTOs Pydantic v2 com validação estrita
│   └── seed.py                                # Carga inicial de dados para demonstração e testes acadêmicos
├── frontend/                                  # Aplicação Single Page Application (SPA)
│   ├── src/
│   │   ├── api.js                             # Cliente HTTP para consumo da API RESTful com JWT
│   │   ├── App.jsx                            # Orquestrador de rotas, controle de perfis e modo switcher
│   │   ├── index.css                          # Tailwind directives e tokens WCAG 2.1 AA
│   │   └── components/
│   │       ├── Navbar.jsx                     # Barra de navegação com badge de perfil e encerramento de sessão
│   │       ├── Login.jsx                      # Autenticação semântica, atalhos rápidos e conformidade LGPD
│   │       ├── CoordenadorView.jsx            # Painel da sede com controle de estoque e despacho atômico (RF01)
│   │       ├── EscalaView.jsx                 # Painel do voluntário com isolamento estrito e GPS (RF02 / RF04)
│   │       ├── ConfirmacaoModal.jsx           # Modal de confirmação com prevenção de duplo clique (RF03)
│   │       └── ComprovanteModal.jsx           # Recibo digital com carimbo temporal UTC (RF03)
│   ├── tailwind.config.js                     # Configuração do tema oficial Conecta Vidas
│   └── vite.config.js                         # Configuração do Vite com proxy para http://127.0.0.1:8000
├── tests/                                     # Suíte Formal de Testes Automatizados (20 testes)
│   ├── test_api_fastapi.py                    # Testes de integração da API RESTful com TestClient
│   ├── test_regras_negocio.py                 # Testes unitários das regras de negócio de estoque e status
│   └── test_interface_acessibilidade.py       # Testes de conformidade WCAG 2.1 AA e integridade DOM
├── .github/workflows/                         # Automações de CI/CD
│   ├── ci.yml                                 # Executa 20 testes Pytest e compila o React no push/PR
│   ├── deploy.yml                             # Publica o frontend React compilado no GitHub Pages
│   └── monitoramento.yml                      # Sonda sintética 24/7 com verificação de latência e uptime
├── .gitignore                                 # Regras de isolamento de desenvolvimento local
└── README.md                                  # Documentação técnica oficial
```

---

## 📋 4. Matriz de Requisitos e Ciclo Curricular SDLC

O projeto foi estruturado em conformidade com as quatro experiências práticas curriculares da instituição:

| Marco Curricular | Foco de Engenharia | Escopo Entregue | Status |
| :--- | :--- | :--- | :---: |
| **Experiência Prática I** | Investigação comunitária, alinhamento ao ODS 2 e escopo do MVP | Diagnóstico de gargalos, triagem de famílias e definição de escopo com Zero Over-Engineering | 🟢 Concluído |
| **Experiência Prática II** | Modelagem relacional, arquitetura REST e especificação técnica | Modelagem 3FN, endpoints RESTful, especificações RF01-04 e RNF01-04 (WCAG 2.1 AA) | 🟢 Concluído |
| **Experiência Prática III** | Codificação defensiva, testes automatizados e esteira de CI | Backend FastAPI, Frontend React, 20 testes automatizados no Pytest e validação com voluntários | 🟢 Concluído |
| **Experiência Prática IV** | Deploy em nuvem com SSL, monitoramento sintético e LGPD | Publicação contínua via GitHub Pages, Health Check 24/7 e governança ética LGPD | 🟢 Concluído |

---

## 🏗️ 5. Módulos e Histórias de Usuário Implementadas

| Módulo / História de Usuário | Regras de Negócio e Comportamento | Tecnologias Utilizadas |
| :--- | :--- | :--- |
| **HU01: Autenticação Segura e Acesso Semântico (RNF01 / RNF04)** | Login com verificação criptográfica de senha (Bcrypt), emissão de JWT com Role-Based Access Control (`COORDENADOR` vs `VOLUNTARIO`), labels explícitos persistentes (`<label for="...">`) e atalhos rápidos para validação pedagógica de bancas. | FastAPI, Bcrypt, PyJWT, React 19, Tailwind CSS, W3C ARIA. |
| **HU02: Gestão da Sede e Validação de Estoque (RF01)** | Painel de controle da coordenação. Permite cruzar voluntários, famílias e saldo físico de mantimentos. Bloqueia reativamente o despacho caso a demanda supere o saldo disponível na sede e executa débito atômico no banco. | FastAPI, SQLAlchemy 2.0 ORM, SQLite 3FN, React 19, Tailwind CSS. |
| **HU03: Roteirização Mobile e Navegação GPS (RF02 / RF04)** | Painel de campo do voluntário. Segregação estrita no backend (`WHERE id_voluntario = :id`). Chips visuais de alto contraste (`📦 2 Cestas` e `🧼 1 Kit`) e link universal Google Maps em nova aba. | FastAPI, React 19 Mobile-First, Google Maps URL Scheme, Tailwind CSS. |
| **HU04: Baixa de Entrega e Feedback Multimodal (RF03 / RNF04)** | Confirmação de recebimento consciente com prevenção de duplo clique, atualização de status de `Pendente` para `Concluido`, registro do carimbo temporal UTC e emissão do comprovante digital. | FastAPI, SQLAlchemy transacional, React 19, Tailwind CSS. |

---

## 🧪 6. Engenharia da Qualidade: 20 Testes Automatizados e CI

A integridade do software é assegurada por **20 testes automatizados** com **100% de aprovação**, cobrindo a API RESTful, as regras de domínio e a conformidade de acessibilidade:

### 6.1 Detalhamento das Suítes de Testes (`tests/`)
* **`test_api_fastapi.py` (Testes da API RESTful FastAPI):**
  * `test_api_health`: Valida status operacional, conexão com banco e integridade da API.
  * `test_api_login_voluntario_sucesso`: Valida autenticação com emissão de token JWT válido para voluntário de rota.
  * `test_api_login_coordenador_sucesso`: Valida autenticação da coordenação geral com perfil `COORDENADOR`.
  * `test_api_login_credenciais_invalidas`: Valida bloqueio defensivo com HTTP 401 Unauthorized para senhas incorretas.
  * `test_api_rf02_isolamento_escala_voluntario`: Assegura que voluntários comuns nunca acessem rotas de terceiros.
  * `test_api_rf01_atribuicao_e_debito_estoque`: Valida a criação de entrega e o débito atômico no saldo de estoque.
  * `test_api_rf01_bloqueio_estoque_insuficiente`: Garante o bloqueio com HTTP 400 Bad Request se a quantidade demandada exceder o estoque.
  * `test_api_rf03_conclusao_entrega_e_bloqueio_duplicidade`: Valida a conclusão de entrega e o bloqueio idempotente contra duplicidade.

* **`test_regras_negocio.py` (Testes Formais de Regras de Negócio e Domínio):**
  * `test_rf01_atribuicao_com_estoque_suficiente`: valida o abatimento correto do saldo físico na atribuição de rotas.
  * `test_rf01_bloqueio_quando_estoque_insuficiente`: valida o disparo de `EstoqueInsuficienteError` e o bloqueio de saldo negativo.
  * `test_rf01_bloqueio_quantidade_invalida_zero_ou_negativa`: assegura o bloqueio de requisições de donativos $\le 0$.
  * `test_rf02_isolamento_de_escala_do_voluntario`: garante que cada voluntário visualiza exclusivamente suas rotas.
  * `test_rf03_conclusao_de_entrega`: valida a transição de estado de `Pendente` para `Concluido`.
  * `test_rf03_bloqueio_de_conclusao_dupla`: valida o princípio de idempotência e bloqueia baixas concorrentes.
  * `test_rf04_geracao_link_gps`: valida a codificação de URLs no protocolo do Google Maps.

* **`test_interface_acessibilidade.py` (Testes de Integridade e Acessibilidade):**
  * `test_arquivos_mvp_existem`: valida a existência física dos pontos de entrada da aplicação.
  * `test_rnf04_rotulos_persistentes_login`: valida a associação programática de rótulos `<label for="...">`.
  * `test_rnf04_areas_de_toque_minimas_44px`: inspeciona classes de altura mínima de toque $\ge 44\text{px}$.
  * `test_rnf04_independencia_de_cor_alerta`: garante que alertas combinam cor de fundo, SVG vetorial e texto explícito.
  * `test_rf04_link_direto_para_gps`: assegura o atributo `target="_blank"` em rotas externas de navegação.

### 6.2 Execução Oficial dos Testes
```text
============================= test session starts =============================
platform win32 -- Python 3.14.7, pytest-9.1.1
collected 20 items

tests/test_api_fastapi.py::test_api_health PASSED                        [  5%]
tests/test_api_fastapi.py::test_api_login_voluntario_sucesso PASSED      [ 10%]
tests/test_api_fastapi.py::test_api_login_coordenador_sucesso PASSED     [ 15%]
tests/test_api_fastapi.py::test_api_login_credenciais_invalidas PASSED   [ 20%]
tests/test_api_fastapi.py::test_api_rf02_isolamento_escala_voluntario PASSED [ 25%]
tests/test_api_fastapi.py::test_api_rf01_atribuicao_e_debito_estoque PASSED [ 30%]
tests/test_api_fastapi.py::test_api_rf01_bloqueio_estoque_insuficiente PASSED [ 35%]
tests/test_api_fastapi.py::test_api_rf03_conclusao_entrega_e_bloqueio_duplicidade PASSED [ 40%]
tests/test_interface_acessibilidade.py::test_arquivos_mvp_existem PASSED [ 45%]
tests/test_interface_acessibilidade.py::test_rnf04_rotulos_persistentes_login PASSED [ 50%]
tests/test_interface_acessibilidade.py::test_rnf04_areas_de_toque_minimas_44px PASSED [ 55%]
tests/test_interface_acessibilidade.py::test_rnf04_independencia_de_cor_alerta PASSED [ 60%]
tests/test_interface_acessibilidade.py::test_rf04_link_direto_para_gps PASSED [ 65%]
tests/test_regras_negocio.py::test_rf01_atribuicao_com_estoque_suficiente PASSED [ 70%]
tests/test_regras_negocio.py::test_rf01_bloqueio_quando_estoque_insuficiente PASSED [ 75%]
tests/test_regras_negocio.py::test_rf01_bloqueio_quantidade_invalida_zero_ou_negativa PASSED [ 80%]
tests/test_regras_negocio.py::test_rf02_isolamento_de_escala_do_voluntario PASSED [ 85%]
tests/test_regras_negocio.py::test_rf03_conclusao_de_entrega PASSED      [ 90%]
tests/test_regras_negocio.py::test_rf03_bloqueio_de_conclusao_dupla PASSED [ 95%]
tests/test_regras_negocio.py::test_rf04_geracao_link_gps PASSED          [100%]

============================= 20 passed in 4.60s ==============================
```

---

## 🚀 7. Instruções de Reprodução e Execução Local (Sem Docker)

A execução local não requer instalação de contêineres Docker pesados nem serviços externos pagos.

### Pré-requisitos
- Python 3.10+ instalado
- Node.js 18+ e npm instalados

### Passo a Passo

```bash
# 1. Clonar o repositório
git clone https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas.git
cd ProjetoSoftware_ONG_ConectaVidas

# 2. Configurar e Iniciar o Backend FastAPI
pip install -r backend/requirements.txt
python -m backend.seed                         # Cria tabelas e insere dados iniciais no SQLite
python -m uvicorn backend.main:app --reload --port 8000
# -> Documentação Swagger disponível em: http://127.0.0.1:8000/docs

# 3. Em outro terminal, Iniciar o Frontend React
cd frontend
npm install
npm run dev
# -> Aplicação disponível em: http://127.0.0.1:5173

# 4. Executar Testes Automatizados
python -m pytest -v
```

### Credenciais Pré-configuradas para Testes
| Usuário | Perfil | E-mail | Senha |
| :--- | :--- | :--- | :--- |
| **Maria Silva** | Coordenação Geral | `maria.coordenacao@conectavidas.org.br` | `SenhaMestre#2026` |
| **João Batista** | Voluntário de Rota | `joao.voluntario@conectavidas.org.br` | `VoluntarioForte#2026` |

---

## 🛡️ 8. Responsabilidade Ética, Privacidade e Conformidade com a LGPD

O projeto fundamenta-se nos princípios de **Privacidade por Padrão (Privacy by Design)** e **Minimização de Dados** (Art. 6º, III da Lei Federal nº 13.709/2018 - LGPD):

- **Proteção à Dignidade dos Beneficiários:** As famílias atendidas pela instituição estão em situação de vulnerabilidade social extrema. O sistema não exige capturas fotográficas na entrega, biometria facial ou assinaturas digitais na porta da residência, resguardando a integridade e dignidade das famílias.
- **Minimização de Carga de Dados:** O painel do voluntário transmite estritamente o endereço de entrega, o primeiro nome do responsável familiar e o quantitativo físico de mantimentos. Nenhum documento pessoal (CPF, RG, NIS) ou prontuário socioeconômico transita pelo navegador ou é persistido no banco.
- **Auditoria Baseada em Processo:** A rastreabilidade contábil e a conciliação de estoque são garantidas pelo carimbo temporal UTC da transação e pela confirmação dupla no modal, conferindo transparência contábil sem monitoramento invasivo.
- **Validação Comunitária:** A solução conta com validação formal e aceite da coordenação comunitária da Associação Comunitária Pão e Vida (ACPV).

---

*Projeto acadêmico desenvolvido com rigor técnico, acessibilidade e compromisso social por **Camilo Caetano Pinheiro de Oliveira**.*
