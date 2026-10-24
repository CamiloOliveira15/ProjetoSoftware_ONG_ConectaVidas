# Sistema de Gestão Logística e Voluntariado — Instruções de Agente

Este arquivo é o contrato canônico de governança para qualquer agente de IA ou desenvolvedor atuando neste repositório acadêmico (**Projeto de Software — CST em Análise e Desenvolvimento de Sistemas, Cruzeiro do Sul Virtual** em cooperação com a **Associação Comunitária Pão e Vida - ACPV / ONG Conecta Vidas**).

Regras de domínio ficam em `.agents/rules/`; fluxos operacionais repetíveis ficam em `.agents/skills/`; o catálogo estruturado de tarefas fica em `backlog/controle_backlog.json`.

---

## 🧭 Rotas e Fluxos Obrigatórios

1. **Gestão do Backlog:**
   - Inicie qualquer tarefa, requisito ou refatoração executando a skill `backlog-start` ou via CLI `python scripts/backlog.py start <ID>`.
   - Homologue e encerre entregas exclusivamente com a skill `backlog-close` ou `python scripts/backlog.py close <ID>` (exige que 100% dos testes passem e evidências reais sejam registradas).
   - Registre débitos técnicos, bugs ou achados fora do escopo com a skill `backlog-finding` ou `python scripts/backlog.py finding`.
2. **Portão de Qualidade Pré-Entrega:**
   - Execute a skill `grill-me` antes de homologar qualquer entrega para auditar conformidade com LGPD, ausência de dados sensíveis e acessibilidade WCAG 2.1 AA.
3. **Execução de Testes:**
   - Toda alteração de código exige execução da suíte completa de testes via `python -m pytest -v`. Nenhuma entrega é aceita com testes quebrados ou cobertura inferior a 100%.

---

## 🔒 Regras Gerais e Inegociáveis

- **Mentalidade de Produção & Erro Silencioso é BUG:** Zero tolerância a `except Exception: pass`. Exceções de negócio (`EstoqueInsuficienteError`, `QuantidadeInvalidaError`, `TransicaoStatusInvalidaError`) devem ser propagadas de forma determinística. Retornos vazios (`[]` ou `None`) não podem mascarar falhas de execução.
- **Privacidade e LGPD (Lei nº 13.709/2018):** Princípio da Minimização de Dados inegociável. É terminantemente proibido registrar números de documentos pessoais (CPF/RG), dados acadêmicos privados (RA/RGM), dados socioeconômicos sensíveis ou exigir fotos/biometria das famílias em vulnerabilidade.
- **Zero Over-Engineering:** Manter a arquitetura leve, mobile-first e livre de complexidade acidental. Não adicionar frameworks pesados, contêineres desnecessários ou APIs em nuvem com faturamento em dólar quando soluções estáticas ou protocolos universais (ex: Google Maps URL Scheme) atenderem plenamente aos requisitos.
- **Acessibilidade Universal (WCAG 2.1 AA):** Botões e alvos de toque com altura mínima $\ge 44\text{px}$ (`min-h-[46px]`), contraste de texto superior a 4.5:1 (alcançado > 7:1) e independência total de cor em alertas visuais (cor + texto afirmativo + ícone semântico SVG).
- **Governança de Commits:** Utilização rigorosa do padrão *Conventional Commits* (`feat:`, `fix:`, `test:`, `docs:`, `ci:`, `refactor:`).
