# Relatório de Execução e Evidências — Experiência Prática III

> **Disciplina:** Projeto de Software | **CST em Análise e Desenvolvimento de Sistemas**  
> **Instituição:** Cruzeiro do Sul Virtual  
> **Estudante:** Camilo Caetano Pinheiro de Oliveira  
> **Projeto:** Sistema de Gestão Logística e Voluntariado — ONG Conecta Vidas  

---

## 🎯 1. Apresentação do Desafio e Escopo de Engenharia

Na **Experiência Prática III**, o projeto avançou da modelagem teórica e prototipação diretamente para a **implementação técnica, garantia da qualidade e validação em campo**. 

O objetivo central foi consolidar uma cultura madura de engenharia de software através de:
1. Versionamento rigoroso no **GitHub** e governança de código;
2. Práticas de auto-revisão via **Pull Request (PR)** com checklist técnico;
3. Criação e execução de **testes automatizados (unitários e de integração)**;
4. Automação do pipeline de **Integração Contínua (CI)** com **GitHub Actions**;
5. Condução de **duas rodadas reais de validação com contato externo da comunidade** (João Batista), registrando os feedbacks e os ajustes concretos incorporados ao sistema.

---

## 🐙 2. Controle de Versão e Práticas de Pull Request (PR)

### 2.1 Estrutura de Branches e Commits Semânticos
O repositório foi estruturado utilizando o fluxo de ramificação (*branching model*) para isolar o desenvolvimento de novas funcionalidades da branch principal (`main`):

* **Branch Principal:** `main` (código homologado, estável e testado).
* **Branch de Funcionalidade:** `feature/escala-e-testes` (desenvolvimento das regras de negócio, testes e telas).
* **Padrão de Commits:** Utilização de *Conventional Commits* (`feat:`, `test:`, `ci:`, `docs:`, `fix:`), garantindo rastreabilidade do histórico de desenvolvimento.

### 2.2 Template de Pull Request e Checklist de Auto-Revisão
Para padronizar o processo de revisão por pares (*Code Review*) e auto-revisão, foi implementado o template oficial em `.github/pull_request_template.md`:

```markdown
## 📌 Descrição da Mudança
Implementação do fluxo logístico de campo para a ONG Conecta Vidas (RF01 a RF04).

## 🎯 Requisitos Atendidos
- [x] RF01: Atribuição de rotas e débito de estoque físico.
- [x] RF02: Escala exclusiva do voluntário logado.
- [x] RF03: Atualização de status para 'Concluído' com modal e toast.
- [x] RF04: Geração de link dinâmico para Google Maps (GPS).
- [x] RNF04: Acessibilidade WCAG AA (alvos >= 44px, contraste > 4.5:1 e independência de cor).

## 🔍 Checklist de Auto-Revisão Técnica
- [x] Ausência de senhas em texto limpo (segurança OWASP).
- [x] Aderência rigorosa à paleta MiauApoio (Laranja e Stone).
- [x] Zero over-engineering (arquitetura leve sem dependências desnecessárias).
```

---

## 🧪 3. Testes Automatizados (Unitários e de Integração)

A verificação da qualidade de software foi materializada por uma suíte completa de testes automatizados utilizando **pytest** no Python 3.14, cobrindo tanto as regras de negócio do back-end quanto a integridade do front-end:

### 3.1 Suíte 1: Regras de Negócio e Serviços (`tests/test_regras_negocio.py`)
1. **`test_rf01_atribuicao_com_estoque_suficiente`:** Valida que o coordenador registra a entrega e o sistema subtrai corretamente 2 cestas e 1 kit higiene do estoque físico.
2. **`test_rf01_bloqueio_quando_estoque_insuficiente`:** Garante que o sistema lança `EstoqueInsuficienteError` caso a quantidade solicitada exceda o saldo disponível (impede estoque negativo).
3. **`test_rf02_isolamento_de_escala_do_voluntario`:** Comprova a filtragem estrita de dados (o voluntário ID 101 não acessa rotas do ID 102, atendendo ao RNF02).
4. **`test_rf03_conclusao_de_entrega`:** Testa a transição de estado da entrega de "Pendente" para "Concluído".
5. **`test_rf03_bloqueio_de_conclusao_dupla`:** Lança exceção de regra de negócio ao tentar concluir uma entrega que já foi baixada.
6. **`test_rf04_geracao_link_gps`:** Valida a codificação de URL para inicialização de rotas no Google Maps.

### 3.2 Suíte 2: Integridade e Acessibilidade (`tests/test_interface_acessibilidade.py`)
1. **`test_arquivos_mvp_existem`:** Verifica a presença física de todos os arquivos HTML essenciais.
2. **`test_rnf04_rotulos_persistentes_login`:** Comprova a presença programática de `<label for="...">` associados aos inputs.
3. **`test_rnf04_areas_de_toque_minimas_44px`:** Inspeciona expressões regulares para garantir que os botões possuem classes `min-h-[46px]` / `min-h-[48px]` ($\ge 44\text{px}$).
4. **`test_rnf04_independencia_de_cor_alerta`:** Valida que o Toast combina cor verde + texto afirmativo + símbolo SVG universal.
5. **`test_rf04_link_direto_para_gps`:** Assegura que o link do mapa possui atributo `target="_blank"`.

### 3.3 Evidência de Execução Local dos Testes
```text
============================= test session starts =============================
platform win32 -- Python 3.14.7, pytest-9.1.1, pluggy-1.6.0
collected 11 items

tests/test_interface_acessibilidade.py::test_arquivos_mvp_existem PASSED        [  9%]
tests/test_interface_acessibilidade.py::test_rnf04_rotulos_persistentes_login PASSED [ 18%]
tests/test_interface_acessibilidade.py::test_rnf04_areas_de_toque_minimas_44px PASSED [ 27%]
tests/test_interface_acessibilidade.py::test_rnf04_independencia_de_cor_alerta PASSED [ 36%]
tests/test_interface_acessibilidade.py::test_rf04_link_direto_para_gps PASSED [ 45%]
tests/test_regras_negocio.py::test_rf01_atribuicao_com_estoque_suficiente PASSED [ 54%]
tests/test_regras_negocio.py::test_rf01_bloqueio_quando_estoque_insuficiente PASSED [ 63%]
tests/test_regras_negocio.py::test_rf02_isolamento_de_escala_do_voluntario PASSED [ 72%]
tests/test_regras_negocio.py::test_rf03_conclusao_de_entrega PASSED            [ 81%]
tests/test_regras_negocio.py::test_rf03_bloqueio_de_conclusao_dupla PASSED     [ 90%]
tests/test_regras_negocio.py::test_rf04_geracao_link_gps PASSED                [100%]

============================= 11 passed in 0.17s ==============================
```

---

## ⚙️ 4. Pipeline de Integração Contínua (CI - GitHub Actions)

Para garantir que nenhuma alteração quebre os testes ou viole as regras de acessibilidade, foi configurado o pipeline automatizado em `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline - MVP ONG Conecta Vidas

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  qualidade-e-testes:
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Checkout do Repositório
        uses: actions/checkout@v4

      - name: 🐍 Configurar Ambiente Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: 📦 Instalar Dependências de Teste
        run: |
          python -m pip install --upgrade pip
          pip install pytest

      - name: 🧪 Executar Testes Automatizados (Regras de Negócio)
        run: python -m pytest -v --tb=short
```

---

## 👥 5. Validação em Campo com a Comunidade (Duas Rodadas)

Conforme exigido pelo desafio, o MVP foi submetido a **duas rodadas de validação presencial em ambiente externo** (sob luz natural e rede móvel) com o representante da comunidade **João Batista** (Voluntário Operacional em campo da ONG Conecta Vidas).

### 5.1 Rodada 1 de Validação (Protótipo Inicial)
* **Condições do Teste:** Realizado no pátio da ONG às 10h da manhã (sob luz solar direta), smartphone em conexão móvel 3G.
* **Resultados e Métricas Coletadas:**
  * **Tarefa 1 (Autenticação no Login):** Sucesso autônomo em **14 segundos**.
  * **Tarefa 2 (Localizar Família Silva e Acionar GPS):** Sucesso com hesitação em **92 segundos** (dentro do teto de 120s, mas com lentidão).
  * **Tarefa 3 (Confirmar Baixa da Entrega):** Sucesso em **18 segundos**.
  * **Taxa de Sucesso:** 100%.
  * **Nota de Satisfação (Escala Likert de 1 a 5):** **Nota 4** ("Fácil").
* **Feedbacks e Dores Levantadas pelo Usuário:**
  1. *Dificuldade de leitura sob sol intenso:* Os itens da doação (2 cestas e 1 kit higiene) estavam em texto contínuo, exigindo que o voluntário parasse para ler com atenção enquanto segurava caixas físicas de alimentos.
  2. *Insegurança sobre a baixa:* Após o fechamento do modal e o sumiço do toast, o card voltava ao estado original sem um registro permanente visível de que aquela família já havia sido concluída.
  3. *Questionamento operacional:* João perguntou: *"Como o pessoal da sede sabe que nós temos cestas suficientes para entregar antes de me passarem essa rota?"*.

---

### 5.2 Ajustes Concretos Realizados no Sistema (Iteração Técnica)

Com base direta nos feedbacks coletados na Rodada 1, foram implementadas melhorias substanciais no código:

1. **Ajuste 1 — Reformulação Visual para Alto Contraste (Padrão MiauApoio):**
   * Adoção dos tokens Stone (`#292524`) e Laranja (`#f97316`) com relação de contraste superior a 7:1.
   * Criação de **chips visuais destacados** para cada item (`📦 2 Cestas Básicas` e `🧼 1 Kit Higiene`), permitindo conferência visual instantânea sem esforço sob a luz do sol.
2. **Ajuste 2 — Criação da Tela de Escala Concluída (`EscalaConcluida.html`):**
   * Implementação do estado pós-baixa permanente: a Família Silva passa a exibir o badge **"Concluído ✔ — Entregue às 09:44"**, eliminando qualquer dúvida sobre a gravação do registro.
3. **Ajuste 3 — Criação do Painel do Coordenador (`Coordenador.html`):**
   * Atendimento integral ao **RF01**, permitindo que o coordenador visualize o saldo de estoque físico em tempo real (ex: 15 cestas disponíveis) antes de despachar a rota para o voluntário.
4. **Ajuste 4 — Redação Literal dos Botões do Modal:**
   * Ajuste dos botões da Tela 3 para **"Voltar"** e **"Confirmar Entrega"**, prevenindo toques acidentais e reforçando a clareza da ação.

---

### 5.3 Rodada 2 de Validação (MVP Aprimorado)
* **Condições do Teste:** Mesmo participante (João Batista), mesmo ambiente externo e horário similar com forte incidência solar.
* **Resultados e Métricas Comparativas:**

| Tarefa Avaliada | Métrica Limite | Resultado Rodada 1 | Resultado Rodada 2 (Após Ajustes) | Evolução Observada |
| :--- | :---: | :---: | :---: | :--- |
| **Tarefa 1: Login** | — | 14 s | **9 s** | Entrada imediata com botão tátil largo. |
| **Tarefa 2: Localizar Rota e GPS** | $\le 120\text{ s}$ | 92 s | **34 s** | **Redução de 63% no tempo.** Chips visuais permitiram leitura imediata sob o sol. |
| **Tarefa 3: Confirmação e Baixa** | — | 18 s | **11 s** | Modal direto e feedback permanente na tela verde. |
| **Taxa de Conclusão** | 100% | 100% | **100%** | Zero intervenções necessárias do avaliador. |
| **Satisfação Geral (Likert)** | $\ge 4$ | Nota 4 | **Nota 5 (Muito Fácil)** | Percepção de segurança e agilidade máxima. |

* **Depoimento do Participante (João Batista na Rodada 2):**
  > *"Agora sim! Ficou muito mais nítido debaixo do sol. Bati o olho nas caixinhas laranjas e já vi que eram 2 cestas e 1 kit sem precisar ficar forçando a vista. E depois que confirmei, a tela ficou verde com o horário da entrega gravado, o que me dá certeza absoluta de que não preciso mandar mensagem para ninguém avisando."*

---

## 🏁 6. Conclusão e Autoavaliação da Experiência

A Experiência Prática III consolidou o ciclo de vida completo do software:
* A aplicação das **duas rodadas de validação** comprovou empiricamente que o design centrado no usuário e a acessibilidade (RNF04) não são meros conceitos teóricos, mas fatores determinantes para a eficiência logística e o combate ao desperdício de alimentos (**ODS 2**).
* A estruturação da **suíte com 11 testes automatizados (pytest)** e do **pipeline de CI (GitHub Actions)** assegura que o MVP atende a critérios profissionais de qualidade, estabilidade e manutenibilidade.
* O projeto atinge 100% dos requisitos acadêmicos da Cruzeiro do Sul Virtual com excelência técnica, código limpo e zero *over-engineering*.
