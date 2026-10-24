# 📋 Backlog-as-Code & Governança SDLC — ONG Conecta Vidas

Este diretório abriga a documentação e o controle analítico de backlog do **Sistema de Gestão Logística e Voluntariado — ONG Conecta Vidas**, estruturado no framework **Backlog-as-Code** inspirado nas práticas canônicas de engenharia de software do LegalSync.

---

## 🧭 Arquitetura do Backlog-as-Code

O backlog adota atomicidade estrita entre a base de dados de controle ([`controle_backlog.json`](controle_backlog.json)) e **arquivos individuais Markdown para cada item de trabalho**, garantindo rastreabilidade sem desvio de status (*status drift*):

```
backlog/
├── controle_backlog.json                      # Single Source of Truth estruturado em JSON
├── README.md                                  # Guia de governança, MoSCoW e catálogo analítico
├── _TEMPLATE.md                               # Template canônico para novos itens de backlog
├── BK-001-diagnostico-gargalo-operacional.md  # EP1: Investigação e Diagnóstico
├── BK-002-mapeamento-triagem-checkin.md       # EP1: Triagem Ágil de Famílias
├── BK-003-definicao-limite-escopo-mvp.md      # EP1: Limite de Escopo (Zero Over-Engineering)
├── BK-004-modelagem-dados-relacional.md       # EP2: Normalização 3FN e Integridade
├── BK-005-especificacao-autenticacao-segura.md # EP2: Autenticação Semântica e Perfis
├── BK-006-blindagem-vulnerabilidades-owasp.md # EP2: Mitigações OWASP Top 10
├── BK-007-meta-desempenho-redes-moveis.md     # EP2: RNF03 Desempenho e Latência
├── BK-008-acessibilidade-universal-wcag.md    # EP2: RNF04 Acessibilidade WCAG 2.1 AA
├── BK-009-painel-coordenador-validacao-estoque.md # EP3: RF01 Validação Reativa de Estoque
├── BK-010-painel-mobile-escalas-isolamento.md # EP3: RF02 Escala e Isolamento de Dados
├── BK-011-despacho-dinamico-rota-gps.md       # EP3: RF04 Despacho para Google Maps
├── BK-012-modal-defensivo-confirmacao-baixa.md # EP3: RF03 Modal Defensivo e Idempotência
├── BK-013-suite-testes-automatizados-pytest.md # EP3: Suíte Pytest com 100% Coverage
├── BK-014-automacao-pipeline-ci-actions.md    # EP3: Pipeline de Integração Contínua (CI)
├── BK-015-primeira-rodada-validacao-campo.md  # EP3: Validação de Campo e Atritos (Rodada 1)
├── BK-016-refatoracao-chips-alto-contraste.md # EP3: Refatoração Visual e Rodada 2
├── BK-017-deploy-seguro-github-pages.md       # EP4: Deploy em Nuvem com Isolamento
├── BK-018-monitoramento-sintetico-health-check.md # EP4: Health Check Sintético 24/7
├── BK-019-governanca-etica-minimizacao-lgpd.md # EP4: LGPD e Termo de Aceite da Comunidade
├── BK-020-transformacao-pwa-service-worker.md # EP5_FUTURO: PWA e Cache Offline
├── BK-021-persistencia-local-indexeddb.md     # EP5_FUTURO: Fila Transacional IndexedDB
└── BK-022-otimizacao-algoritmica-multi-paradas.md # EP5_FUTURO: Algoritmo TSP de Roteirização
```

---

## 🛠️ Automação via CLI (`scripts/backlog.py`)

A governança do backlog é auditada e operada via ferramenta CLI em Python puro (sem dependências externas):

```bash
# 1. Validar sincronismo estrito entre JSON e arquivos Markdown
python scripts/backlog.py validate

# 2. Listar itens com marco, prioridade, status e pontos
python scripts/backlog.py list

# 3. Iniciar o ciclo de trabalho de um item (muda para 'in-progress')
python scripts/backlog.py start BK-020

# 4. Homologar e encerrar um item (executa testes automatizados e valida evidências)
python scripts/backlog.py close BK-020

# 5. Registrar um achado técnico ou débito derivado
python scripts/backlog.py finding BK-015 "Atrito identificado na leitura de mantimentos sob sol forte"

# 6. Criar um novo item estruturado a partir do template
python scripts/backlog.py new BK-023 "Notificações Push para Voluntários" --parent EP5_FUTURO --points 5
```

---

## 📊 Catálogo Completo dos 22 Itens de Backlog

| ID | Marco | Título do Item | Prioridade | Status | Pts | Arquivo Detalhado |
| :---: | :---: | :--- | :---: | :---: | :---: | :--- |
| **BK-001** | EP1 | Diagnóstico do Gargalo Operacional e Registro | Must Have | 🟢 Concluído | 5 | [`BK-001-diagnostico-gargalo-operacional.md`](BK-001-diagnostico-gargalo-operacional.md) |
| **BK-002** | EP1 | Mapeamento da Triagem e Check-in Rápido de Famílias | Must Have | 🟢 Concluído | 5 | [`BK-002-mapeamento-triagem-checkin.md`](BK-002-mapeamento-triagem-checkin.md) |
| **BK-003** | EP1 | Definição do Limite de Escopo do MVP (Zero Over-Engineering) | Must Have | 🟢 Concluído | 3 | [`BK-003-definicao-limite-escopo-mvp.md`](BK-003-definicao-limite-escopo-mvp.md) |
| **BK-004** | EP2 | Modelagem de Dados Relacional e Normalização 3FN | Must Have | 🟢 Concluído | 5 | [`BK-004-modelagem-dados-relacional.md`](BK-004-modelagem-dados-relacional.md) |
| **BK-005** | EP2 | Especificação de Autenticação Segura com Hash e Perfis | Must Have | 🟢 Concluído | 3 | [`BK-005-especificacao-autenticacao-segura.md`](BK-005-especificacao-autenticacao-segura.md) |
| **BK-006** | EP2 | Blindagem Contra Vulnerabilidades do OWASP Top 10 | Must Have | 🟢 Concluído | 5 | [`BK-006-blindagem-vulnerabilidades-owasp.md`](BK-006-blindagem-vulnerabilidades-owasp.md) |
| **BK-007** | EP2 | Meta Objetiva de Desempenho e Portabilidade em Redes Móveis | Must Have | 🟢 Concluído | 3 | [`BK-007-meta-desempenho-redes-moveis.md`](BK-007-meta-desempenho-redes-moveis.md) |
| **BK-008** | EP2 | Acessibilidade Universal para Operação em Trânsito (WCAG 2.1 AA) | Must Have | 🟢 Concluído | 5 | [`BK-008-acessibilidade-universal-wcag.md`](BK-008-acessibilidade-universal-wcag.md) |
| **BK-009** | EP3 | Painel do Coordenador com Validação Reativa de Saldo de Estoque | Must Have | 🟢 Concluído | 8 | [`BK-009-painel-coordenador-validacao-estoque.md`](BK-009-painel-coordenador-validacao-estoque.md) |
| **BK-010** | EP3 | Painel Mobile de Escalas com Isolamento Estrito por Voluntário | Must Have | 🟢 Concluído | 5 | [`BK-010-painel-mobile-escalas-isolamento.md`](BK-010-painel-mobile-escalas-isolamento.md) |
| **BK-011** | EP3 | Despacho Dinâmico de Rota para Aplicativos GPS Externos | Should Have | 🟢 Concluído | 3 | [`BK-011-despacho-dinamico-rota-gps.md`](BK-011-despacho-dinamico-rota-gps.md) |
| **BK-012** | EP3 | Modal Defensivo de Confirmação de Baixa com Prevenção de Toques | Must Have | 🟢 Concluído | 5 | [`BK-012-modal-defensivo-confirmacao-baixa.md`](BK-012-modal-defensivo-confirmacao-baixa.md) |
| **BK-013** | EP3 | Suíte Completa de Testes Automatizados com Pytest | Must Have | 🟢 Concluído | 8 | [`BK-013-suite-testes-automatizados-pytest.md`](BK-013-suite-testes-automatizados-pytest.md) |
| **BK-014** | EP3 | Automação do Pipeline de Integração Contínua (GitHub Actions) | Must Have | 🟢 Concluído | 5 | [`BK-014-automacao-pipeline-ci-actions.md`](BK-014-automacao-pipeline-ci-actions.md) |
| **BK-015** | EP3 | Primeira Rodada de Validação em Campo e Mapeamento de Atritos | Must Have | 🟢 Concluído | 5 | [`BK-015-primeira-rodada-validacao-campo.md`](BK-015-primeira-rodada-validacao-campo.md) |
| **BK-016** | EP3 | Refatoração de Interface para Chips de Alto Contraste | Must Have | 🟢 Concluído | 8 | [`BK-016-refatoracao-chips-alto-contraste.md`](BK-016-refatoracao-chips-alto-contraste.md) |
| **BK-017** | EP4 | Deploy Contínuo em Nuvem Pública via GitHub Pages com Isolamento | Must Have | 🟢 Concluído | 5 | [`BK-017-deploy-seguro-github-pages.md`](BK-017-deploy-seguro-github-pages.md) |
| **BK-018** | EP4 | Monitoramento Sintético Contínuo e Health Check Automatizado | Must Have | 🟢 Concluído | 5 | [`BK-018-monitoramento-sintetico-health-check.md`](BK-018-monitoramento-sintetico-health-check.md) |
| **BK-019** | EP4 | Governança Ética, Minimização de Dados (LGPD) e Termo de Aceite | Must Have | 🟢 Concluído | 5 | [`BK-019-governanca-etica-minimizacao-lgpd.md`](BK-019-governanca-etica-minimizacao-lgpd.md) |
| **BK-020** | EP5_FUTURO | Implementação de Arquitetura Local-First com Service Worker e PWA | Should Have | 🟡 Planejado | 8 | [`BK-020-transformacao-pwa-service-worker.md`](BK-020-transformacao-pwa-service-worker.md) |
| **BK-021** | EP5_FUTURO | Sincronização em Segundo Plano (Background Sync) e IndexedDB | Should Have | 🟡 Planejado | 8 | [`BK-021-persistencia-local-indexeddb.md`](BK-021-persistencia-local-indexeddb.md) |
| **BK-022** | EP5_FUTURO | Otimização Algorítmica Multi-Paradas para Rotas de Distribuição | Could Have | 🟡 Planejado | 5 | [`BK-022-otimizacao-algoritmica-multi-paradas.md`](BK-022-otimizacao-algoritmica-multi-paradas.md) |

---

## 🎯 Padrão de Seções de Cada Item de Backlog

Cada arquivo `BK-XXX-*.md` possui estrutura padronizada:

1. **Frontmatter YAML:** Metadados estruturados (`id`, `title`, `type`, `status`, `created`, `priority`, `points`, `parent`, `epic_id`, `tags`, `validation`).
2. **Contexto & Cenário Operacional:** O gargalo concreto na comunidade e a persona afetada (João Batista / Maria da Conceição).
3. **Contrato Técnico & Regras Inegociáveis:** Invariantes de negócio, falha fechada, WCAG 2.1 AA e LGPD.
4. **Critérios de Aceite (BDD / Gherkin):** Cenários Dado/Quando/Então com caixas de seleção `[x]` para itens homologados.
5. **Fora de Escopo (Zero Over-Engineering):** Limites conscientes para manter a arquitetura sustentável.
6. **Validação Declarada:** Arquivos de testes, ferramental e relatórios associados.
7. **Evidências de Validação:** Comandos executados e resultados observados comprovando a entrega real.
8. **Achados Derivados:** Histórico de melhorias ou débitos gerados durante a execução do item.
