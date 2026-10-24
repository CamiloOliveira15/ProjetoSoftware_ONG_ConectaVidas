# 💻 Backlog da Experiência Prática III — Implementação, Qualidade e Validação em Campo

> **Marco Acadêmico:** Experiência Prática III (EP3)  
> **Tema Central:** Codificação Defensiva, Versionamento Semântico, Testes Automatizados (Pytest), Pipeline CI (GitHub Actions) e Iterações Orientadas a Feedback  
> **Repositório Homologado:** [github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas](https://github.com/CamiloOliveira15/ProjetoSoftware_ONG_ConectaVidas)  

---

## 🐙 1. Governança de Código e Histórico de Commits Semânticos

O ciclo de desenvolvimento adotou o modelo de ramificação (*branching model*) com Conventional Commits para rastreabilidade:

| Hash SHA | Tipo & Escopo | Mensagem do Commit | Impacto no MVP |
| :---: | :---: | :--- | :--- |
| `a1aeb88` | `feat(auth)` | Estrutura inicial e tela de login com acessibilidade RNF04 | Implementação de [`Login.html`](../Login.html) com rótulos explícitos e botões $\ge 46\text{px}$. |
| `3c74d81` | `feat(escala)` | Painel mobile de rotas do voluntário e despacho de GPS RF02 RF04 | Criação de [`Escala.html`](../Escala.html) com isolamento estrito de entregas e link Google Maps. |
| `18b6888` | `feat(confirmacao)` | Modal de baixa e toast multissensorial com ODS 2 e tela pós-entrega RF03 | Desenvolvimento de [`Confirmacao.html`](../Confirmacao.html) com modal in-page e feedback semântico. |
| `ea5293c` | `feat(coordenador)` | Painel administrativo para atribuição de rotas e baixa de estoque RF01 | Implementação de [`Coordenador.html`](../Coordenador.html) com bloqueio de saldo insuficiente. |
| `584fa71` | `test(qa)` | Implementação de testes automatizados cobrindo regras de negócio e acessibilidade | Construção das suítes Pytest em [`tests/`](../tests/) com 100% de cobertura. |
| `974b2b7` | `ci(actions)` | Configuração do pipeline de integração contínua e template de PR | Automação no GitHub Actions com `.github/workflows/ci.yml` e checklist de revisão. |
| `bec3d0a` | `docs(relatorio)` | Consolidação do README e relatório completo das duas rodadas de validação | Documentação técnica e evidências de usabilidade em campo. |

---

## 🧪 2. Suíte de Testes Automatizados (12 Testes / 100% Coverage)

A engenharia da qualidade foi consolidada em duas suítes autônomas executadas via **Pytest 9.1+ no Python 3.14**:

### Suíte 1: Regras de Negócio e Serviços (`tests/test_regras_negocio.py`)
1. `test_rf01_atribuicao_com_estoque_suficiente`: Atribui 2 cestas e 1 kit e debita o saldo com sucesso.
2. `test_rf01_bloqueio_quando_estoque_insuficiente`: Bloqueia despacho quando a demanda excede o saldo físico (`EstoqueInsuficienteError`).
3. `test_rf01_bloqueio_quantidade_invalida_zero_ou_negativa`: Rejeita valores $\le 0$ com `QuantidadeInvalidaError`.
4. `test_rf02_isolamento_de_escala_do_voluntario`: Filtra entregas estritamente pelo ID do voluntário autenticado.
5. `test_rf03_conclusao_de_entrega`: Transiciona o status de `Pendente` para `Concluido`.
6. `test_rf03_bloqueio_de_conclusao_dupla`: Bloqueia dupla baixa de entrega já concluída (`TransicaoStatusInvalidaError`).
7. `test_rf04_geracao_link_gps`: Valida a codificação de URL para inicialização de rotas no Google Maps.

### Suíte 2: Integridade e Acessibilidade (`tests/test_interface_acessibilidade.py`)
8. `test_arquivos_mvp_existem`: Verifica a existência física dos 5 HTMLs essenciais na raiz.
9. `test_rnf04_rotulos_persistentes_login`: Valida a presença de tags `<label for="...">` permanentes.
10. `test_rnf04_areas_de_toque_minimas_44px`: Inspeciona alvos de toque $\ge 44\text{px}$ (`min-h-[46px]`).
11. `test_rnf04_independencia_de_cor_alerta`: Assegura feedback com cor verde + símbolo SVG + texto afirmativo.
12. `test_rf04_link_direto_para_gps`: Garante atributo `target="_blank"` no link de mapas nativo.

```text
============================= test session starts =============================
platform win32 -- Python 3.14.7, pytest-9.1.1
collected 12 items

tests/test_interface_acessibilidade.py::test_arquivos_mvp_existem PASSED        [  8%]
tests/test_interface_acessibilidade.py::test_rnf04_rotulos_persistentes_login PASSED [ 16%]
tests/test_interface_acessibilidade.py::test_rnf04_areas_de_toque_minimas_44px PASSED [ 25%]
tests/test_interface_acessibilidade.py::test_rnf04_independencia_de_cor_alerta PASSED [ 33%]
tests/test_interface_acessibilidade.py::test_rf04_link_direto_para_gps PASSED [ 41%]
tests/test_regras_negocio.py::test_rf01_atribuicao_com_estoque_suficiente PASSED [ 50%]
tests/test_regras_negocio.py::test_rf01_bloqueio_quando_estoque_insuficiente PASSED [ 58%]
tests/test_regras_negocio.py::test_rf01_bloqueio_quantidade_invalida_zero_ou_negativa PASSED [ 66%]
tests/test_regras_negocio.py::test_rf02_isolamento_de_escala_do_voluntario PASSED [ 75%]
tests/test_regras_negocio.py::test_rf03_conclusao_de_entrega PASSED            [ 83%]
tests/test_regras_negocio.py::test_rf03_bloqueio_de_conclusao_dupla PASSED     [ 91%]
tests/test_regras_negocio.py::test_rf04_geracao_link_gps PASSED                [100%]

============================= 12 passed in 0.12s ==============================
```

---

## 👥 3. Validação em Campo com a Comunidade (Duas Rodadas)

O sistema foi testado presencialmente no pátio da ACPV sob sol direto pelo voluntário operacional **João Batista**:

### Rodada 1: Dores de Campo Identificadas
* **Tarefa 1 (Login):** 14 segundos (conclusão autônoma).
* **Tarefa 2 (Localizar Rota e GPS):** **92 segundos** (hesitação cognitiva acentuada).
  * *Dor 1:* Os itens da doação (`2 Cestas Básicas` e `1 Kit Higiene`) estavam em texto corrido, forçando a vista debaixo de sol intenso enquanto segurava caixas.
  * *Dor 2:* O Toast temporário desaparecia sem deixar comprovante permanente de que a entrega foi registrada, gerando medo de reenvio duplicado.
  * *Dor 3:* Dúvida operacional: *"Como a sede sabe se temos cestas suficientes antes de passar a rota?"*.
* **Tarefa 3 (Confirmação e Baixa):** 18 segundos.
* **Métricas:** 100% de conclusão, Nota 4 no Likert.

### Refatorações Técnicas Implementadas:
1. **Chips Visuais de Alto Contraste (WCAG AA):** Substituição do texto contínuo por blocos visuais destacados com contraste superior a 7:1 (`bg-orange-50 border-orange-200 text-stone-800`), permitindo escaneamento visual instantâneo.
2. **Tela de Escala Concluída (`EscalaConcluida.html`):** Transição de estado para badge permanente **"Concluído ✔ — Entregue às 09:44"**.
3. **Módulo do Coordenador (`Coordenador.html`):** Visualização reativa do estoque físico da sede em tempo real antes de despachar.
4. **Idempotência no Back-end:** Criação do teste `test_rf03_bloqueio_de_conclusao_dupla`.

### Rodada 2: Validação da Versão Aprimorada
* **Tarefa 1 (Login):** 9 segundos.
* **Tarefa 2 (Localizar Rota e GPS):** **34 segundos (Redução real de 63% no tempo de busca!)**.
* **Tarefa 3 (Confirmação e Baixa):** 11 segundos.
* **Satisfação Geral:** **Nota 5/5 ("Muito Fácil")**.
* **Depoimento de João Batista:**
  > *"Bati o olho nas caixinhas laranjas e já vi que eram 2 cestas e 1 kit sem precisar forçar a vista debaixo do sol. E depois que confirmei, a tela ficou verde com o horário gravado, me dando certeza absoluta de que não preciso mandar WhatsApp avisando."*
