# 🏛️ Backlog da Experiência Prática II — Desenho Lógico, Arquitetura e Modelagem

> **Marco Acadêmico:** Experiência Prática II (EP2)  
> **Tema Central:** Arquitetura de Software, Modelagem Relacional, Requisitos Priorizados e Segurança Defensiva  
> **Conceitos Curriculares:** Arquitetura Cliente-Servidor RESTful e Modelagem de Dados Relacional Normalizada  
> **Competência do Egresso:** *"Projetar, desenvolver, analisar, testar, implantar e manter sistemas computacionais de informação, selecionando e aplicando ferramentas, metodologias, linguagens e tecnologias adequadas para a resolução de problemas."*  

---

## 🏗️ 1. Decisões Arquiteturais e Fundamentação

1. **Separação de Preocupações (Separation of Concerns):** Adoção do modelo Cliente-Servidor com API RESTful, isolando a interface gráfica (Front-end responsivo) da lógica de negócios e persistência (Back-end), viabilizando consumo multiplataforma leve e seguro.
2. **Normalização e Integridade Referencial:** Modelagem de tabelas independentes conectadas por chaves primárias e estrangeiras, eliminando redundâncias e prevenindo anomalias de atualização e concorrência.
3. **Análise Diferencial de Mercado:**
   * *Bússola Social:* Focado em governança e captação financeira de alto custo, sem solução tática de última milha.
   * *Atados:* Excelente em recrutamento de pessoas, porém desconectado do controle de estoque físico e despacho de campo.
   * *Diferencial do MVP Conecta Vidas:* Unificação da tríade logística em uma única tela: **Voluntário Escalado + Donativo Separado + Família Roteirizada**.

---

## 🗄️ 2. Modelagem Relacional Simplificada de Dados

| Entidade / Tabela | Identificador Primário (PK) | Atributos Principais & Tipos | Regras e Restrições de Integridade | Relacionamentos |
| :--- | :--- | :--- | :--- | :--- |
| **`Voluntarios`** | `id_voluntario` (Integer) | `nome_completo` (String)<br>`email` (String)<br>`telefone_celular` (String)<br>`hash_senha` (String)<br>`status_ativo` (Boolean) | `email` único e obrigatório;<br>`hash_senha` gerado com bcrypt (sem texto limpo). | 1:N com `Entregas` |
| **`Estoque_Donativos`** | `id_item` (Integer) | `descricao_item` (String)<br>`quantidade_disponivel` (Integer)<br>`perecivel` (Boolean)<br>`data_validade` (Date) | `CHECK (quantidade_disponivel >= 0)` impedindo estoque negativo;<br>`data_validade` obrigatória se perecível. | 1:N com `Entregas` |
| **`FamiliasAssistidas`** | `id_familia` (Integer) | `nome_responsavel` (String)<br>`endereco_completo` (String)<br>`telefone_contato` (String)<br>`quantidade_membros` (Integer) | Minimização de dados: sem coleta de dados sensíveis desnecessários (LGPD). | 1:N com `Entregas` |
| **`Entregas`** | `id_entrega` (Integer) | `data_agendada` (Timestamp)<br>`quantidade_separada` (Integer)<br>`status_entrega` (String) | `status` restrito a `{"Pendente", "Concluido", "Cancelado"}`;<br>Vínculo obrigatório com as 3 FKs. | N:1 com `Voluntarios`, `Estoque_Donativos` e `FamiliasAssistidas` |

---

## 📋 3. Requisitos Funcionais Priorizados (MoSCoW)

### [BK-009] RF01: Atribuição de Entrega com Validação de Saldo de Estoque
* **Prioridade:** Must Have (Obrigatório) | **Story Points:** 8
* **Descrição Técnica:** O coordenador registra uma entrega vinculando voluntário ativo, família assistida e quantitativo de donativos. O sistema valida se `quantidade_separada <= quantidade_disponivel`. Caso contrário, bloqueia a transação com `EstoqueInsuficienteError`.
* **Evidência de Cumprimento:** A entrega é gravada na lista geral, o estoque é deduzido atomicamente e a interface emite alerta afirmativo.

### [BK-010] RF02: Escala Exclusiva do Voluntário Logado com Isolamento Estrito
* **Prioridade:** Must Have (Obrigatório) | **Story Points:** 5
* **Descrição Técnica:** A interface móvel do voluntário consulta apenas as entregas com `id_voluntario` correspondente ao usuário autenticado, impedindo acesso a dados de outros voluntários (proteção contra IDOR / Broken Access Control).
* **Evidência de Cumprimento:** Ao autenticar-se, o voluntário visualiza unicamente os seus beneficiários do dia e donativos designados.

### [BK-012] RF03: Baixa de Entrega com Modal Defensivo e Prevenção de Duplicidade
* **Prioridade:** Must Have (Obrigatório) | **Story Points:** 5
* **Descrição Técnica:** Permite ao voluntário transicionar o status de `Pendente` para `Concluido`. O sistema rejeita transições em entregas já concluídas (`TransicaoStatusInvalidaError`).
* **Evidência de Cumprimento:** O botão é desativado permanentemente, o status do card transiciona para finalizado e o coordenador recebe a atualização em tempo real.

### [BK-011] RF04: Despacho Dinâmico de Rota para Navegação GPS Nativa
* **Prioridade:** Should Have (Desejável) | **Story Points:** 3
* **Descrição Técnica:** O card da entrega codifica o endereço em uma URL padronizada do Google Maps (`https://www.google.com/maps/search/?api=1&query=...`) com `target="_blank"`, iniciando o app de mapas com navegação veicular por voz.
* **Evidência de Cumprimento:** Clique no botão abre instantaneamente o trajeto no GPS do dispositivo sem deslogar ou fechar o sistema.

---

## 🛡️ 4. Requisitos Não Funcionais (Segurança, Acessibilidade e Performance)

* **RNF01 (Autenticação e Senhas):** Proibição estrita de senhas em texto limpo, MD5 ou SHA-1. Adoção de algoritmo de hash adaptativo (bcrypt com salt) e tokens de sessão.
* **RNF02 (Conformidade OWASP Top 10):**
  * *A03:2021 Injection:* Blindagem contra SQL Injection através de consultas parametrizadas e ORM.
  * *A03:2021 Injection:* Proteção contra Cross-Site Scripting (XSS) via sanitização de inputs e escape seguro no DOM.
  * *A01:2021 Broken Access Control:* Autorização estrita baseada em perfis e filtragem de rotas no servidor.
* **RNF03 (Performance em Redes Móveis):** Renderização completa do fluxo central de escalas em tempo inferior a 3.0s sob perfil simulado de conexão móvel Fast 3G (1.5 Mbps / 50ms latência).
* **RNF04 (Acessibilidade WCAG 2.1 AA):**
  * Alvos de toque com área mínima absoluta de 44x44px (`min-h-[46px]`);
  * Relação de contraste mínima de 4.5:1 (alcançado > 7:1 na paleta Conecta Vidas);
  * Independência total de cor: alertas combinando cor + ícone semântico SVG + mensagem explicativa.

---

## 🧪 5. Roteiro Planejado de Validação em Campo (João Batista)

* **Participante:** João Batista (Voluntário Operacional de Campo da ACPV).
* **Condições:** Teste presencial sob luz solar direta em smartphone próprio com rede móvel.
* **Tarefas Operacionais Definidas:**
  1. *Tarefa 1 (Autenticação):* Login seguro com seleção de perfil e checagem de senha protegida.
  2. *Tarefa 2 (Consulta de Rota e GPS):* Localização da Família Silva, checagem de donativos e acionamento do Google Maps.
  3. *Tarefa 3 (Confirmação e Baixa):* Execução da baixa no modal e conferência do comprovante multissensorial.
* **Critérios Metrificados de Aceitação:**
  * Taxa de conclusão das tarefas = 100% (autonomia sem intervenção);
  * Tempo máximo na tarefa central $\le 120\text{ s}$;
  * Nota de satisfação na escala Likert (1 a 5) $\ge 4$ ("Fácil").
