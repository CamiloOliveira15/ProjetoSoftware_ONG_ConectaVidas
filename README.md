# 📦 Sistema de Gestão Logística e Voluntariado — ONG Conecta Vidas

> **Projeto de Software — Experiência Prática 2**  
> **Estudante:** Camilo Caetano Pinheiro de Oliveira | **RA:** 45928321  
> **Curso:** CST em Análise e Desenvolvimento de Sistemas — Cruzeiro do Sul Virtual  
> **Identidade Visual:** Inspirada e aprimorada a partir do Design System do [MiauApoio](https://github.com/CamiloOliveira15/ProjetoFaculdade_ONGs)  

---

## 📖 1. Sobre o Projeto e Conexão Social (ODS 2)

O **Sistema de Gestão Logística da ONG Conecta Vidas** é um protótipo de software desenhado para sanar a grave desorganização analógica na distribuição de donativos alimentares e kits de higiene. O projeto digitaliza a "última milha" logística, substituindo pranchetas de papel e grupos informais de WhatsApp por uma interface limpa, acessível e focada em quem está na rua.

### Conexão Direta com a ODS 2 (Fome Zero e Agricultura Sustentável)
* **Meta 2.1:** Garantir o acesso a alimentos seguros, nutritivos e suficientes durante todo o ano para famílias em situação de vulnerabilidade.
* **Impacto Logístico:** O software assegura que o alimento arrecadado seja escoado com rastreabilidade, evitando que cestas básicas perecíveis estraguem no estoque da ONG por falta de roteirização.

---

## 🤝 2. Sinergia Curricular: Da Captação à Operação de Campo

Este projeto fecha o ciclo de engenharia de software iniciado no projeto anterior:

```
[ PROJETO ANTERIOR: MiauApoio ]                [ PROJETO ATUAL: Conecta Vidas ]
   (Desenvolvimento Front-End)                         (Projeto de Software)
             │                                                   │
  • Portal Institucional Público                      • Painel do Coordenador (RF01)
  • Cadastro de Voluntários (AWS)                     • App Mobile do Voluntário em Campo
  • Captação e Dashboard Administrativo               • Escala, Roteirização GPS e Baixa
             │                                                   │
             └───────────────> [ DESIGN SYSTEM ] <───────────────┘
                               • Paleta Laranja (#f97316) & Stone (#292524)
                               • Tipografia Inter e Alto Contraste (WCAG AA)
                               • Filosofia Zero Over-Engineering
```

---

## 📋 3. Matriz de Rastreabilidade de Requisitos

| Código | Tipo | Descrição no Relatório Acadêmico | Tela Correspondente |
| :---: | :---: | :--- | :--- |
| **RF01** | Funcional | O coordenador registra nova entrega, vinculando voluntário ativo, família assistida e mantimentos com validação de estoque físico. | [`Coordenador.html`](Coordenador.html) |
| **RF02** | Funcional | O sistema exibe para o voluntário logado exclusivamente a sua escala do dia, com dados da família e donativos a retirar. | [`Escala.html`](Escala.html) |
| **RF03** | Funcional | O voluntário atualiza o status logístico para "Concluída" diretamente pela interface com feedback multimodal. | [`Confirmacao.html`](Confirmacao.html) e [`EscalaConcluida.html`](EscalaConcluida.html) |
| **RF04** | Funcional | Geração de link dinâmico para despachar as coordenadas diretamente no GPS nativo (Google Maps / Waze). | [`Escala.html`](Escala.html) |
| **RNF01** | Não Funcional | Segurança de acesso com autenticação tokenizada e proteção de senhas via hash robusto. | [`Login.html`](Login.html) |
| **RNF02** | Não Funcional | Segurança OWASP: isolamento de rotas e filtragem estrita (voluntário não acessa dados de terceiros). | Todas as telas |
| **RNF03** | Não Funcional | Desempenho e carregamento rápido em conexão móvel 3G ($\le 3,0\text{ s}$). | HTML/Tailwind CDN leve |
| **RNF04** | Não Funcional | Acessibilidade WCAG 2.1 AA: Alvos de toque $\ge 44\text{px}$, contraste $> 4.5:1$ e independência de cor. | Todas as telas |

---

## 📱 4. As Telas do Protótipo e Capturas Oficiais

O projeto possui as **3 telas obrigatórias** exigidas pela rubrica da Cruzeiro do Sul, acompanhadas das **telas complementares** que materializam a visão do coordenador e o fechamento do mutirão:

### 🌟 As 3 Telas Oficiais da Rubrica Acadêmica

| Tela Oficial | Arquivo HTML | Captura Renderizada (.png) | Descrição do Fluxo |
| :--- | :---: | :---: | :--- |
| **Tela 1 — Entrada Principal** | [`Login.html`](Login.html) | [`Tela1_Login.png`](Tela1_Login.png) | Portal de segurança com credenciais pré-carregadas (`joao.voluntario@conectavidas.org`), rótulos permanentes e botão de entrada acessível. |
| **Tela 2 — Execução Central** | [`Escala.html`](Escala.html) | [`Tela2_Escala.png`](Tela2_Escala.png) | Painel móvel de campo com card da **Família Silva** (2 Cestas e 1 Kit Higiene), rota para GPS e ação de atualização de status. |
| **Tela 3 — Alertas e Resultados** | [`Confirmacao.html`](Confirmacao.html) | [`Tela3_Confirmacao.png`](Tela3_Confirmacao.png) | Modal sobreposto de prevenção de toques acidentais (*"Confirmar Entrega"*) e **Toast inferior** com cor verde + ícone ✔️ + texto afirmativo. |

### 🚀 Telas Complementares de Engenharia de Software

| Tela Complementar | Arquivo HTML | Captura Renderizada (.png) | O que Demonstra no Projeto |
| :--- | :---: | :---: | :--- |
| **Tela 4 — Painel do Coordenador** | [`Coordenador.html`](Coordenador.html) | [`Tela4_Coordenador.png`](Tela4_Coordenador.png) | **Materialização do RF01:** O coordenador seleciona o voluntário, a família e subtrai do estoque físico disponível na sede da ONG. |
| **Tela 5 — Escala Pós-Entrega** | [`EscalaConcluida.html`](EscalaConcluida.html) | [`Tela5_EscalaConcluida.png`](Tela5_EscalaConcluida.png) | **Fechamento do RF03:** Exibe o card da Família Silva com status *Concluído às 09:44 ✔* e 100% da rota do mutirão finalizada. |
| **Tela 6 — Recuperação de Acesso** | [`EsqueciSenha.html`](EsqueciSenha.html) | — | Fluxo acessível de redefinição de credencial, evitando links quebrados. |

---

## 🖼️ Galeria Visual do Protótipo

### Telas Oficiais para Submissão na Plataforma:
| Tela 1: Login | Tela 2: Escala do Voluntário | Tela 3: Modal e Toast |
| :---: | :---: | :---: |
| ![Tela 1](Tela1_Login.png) | ![Tela 2](Tela2_Escala.png) | ![Tela 3](Tela3_Confirmacao.png) |

### Telas Complementares de Arquitetura:
| Tela 4: Painel do Coordenador (RF01) | Tela 5: Escala 100% Concluída (RF03) |
| :---: | :---: |
| ![Tela 4](Tela4_Coordenador.png) | ![Tela 5](Tela5_EscalaConcluida.png) |

---

## ♿ 5. Princípios de Acessibilidade Aplicados (WCAG 2.1 AA)

1. **Áreas de Toque Expandidas (Touch Targets):**
   * Todos os botões principais possuem entre **46px e 48px** de altura útil, superando os 44px exigidos pela norma para que voluntários consigam operar o sistema com uma mão só enquanto carregam caixas.
2. **Alto Contraste Contra Luz Solar:**
   * Textos informativos na cor `stone-800` (`#292524`) sobre cartões brancos e fundo `stone-100` (`#f5f5f4`), atingindo índice de contraste superior a **7:1** (muito acima do piso de 4.5:1 da WCAG AA).
3. **Independência de Cor (Color Independence):**
   * Nenhum feedback depende apenas de cor. O Toast de sucesso e os badges conjugam **cor verde + ícone explícito (✔️) + texto afirmativo literal**, assegurando clareza para pessoas com daltonismo ou sob ofuscamento solar.

---

## 🧪 6. Roteiro e Critérios da Validação Prática com Usuário

Conforme registrado no relatório acadêmico (Seções 25 a 28):
* **Participante:** João Batista (Voluntário Operacional da ONG Conecta Vidas).
* **Protocolo:** Observação Direta com técnica *Think-Aloud* (Pensar Alto) em ambiente externo sob luz natural.
* **Tarefas Testadas:**
  1. *Tarefa 1:* Autenticação e entrada no sistema (`Login.html` $\rightarrow$ `Escala.html`).
  2. *Tarefa 2:* Localização da Família Silva e acionamento do GPS (`Escala.html`).
  3. *Tarefa 3:* Baixa da entrega no modal e leitura do alerta acessível (`Confirmacao.html`).
* **Critérios de Aceitação:**
  * Taxa de sucesso de **100%** nas três tarefas.
  * Tempo do fluxo central $\le 120\text{ segundos}$.
  * Nota de satisfação $\ge 4$ (Escala Likert de 1 a 5).

---

## 💻 7. Como Executar e Navegar

O projeto adota uma arquitetura **100% sem over-engineering**, sem dependência de Node.js, compilação de pacotes ou banco de dados local para visualização:

1. **Abertura Imediata:**
   * Basta dar duplo clique no arquivo [`Login.html`](Login.html) para abrir diretamente no seu navegador web preferido (Chrome, Edge, Firefox, Safari).
2. **Fluxo Interativo de Navegação:**
   * **No Login:** Clique em **"Entrar"** para ir para a Escala do Voluntário, ou em **"Acesso do Coordenador (RF01)"** para ver a tela administrativa.
   * **Na Escala:** Clique em **"Abrir no Mapa"** para testar a integração com o Google Maps, ou em **"Atualizar Status"** para abrir o modal de confirmação.
   * **Na Confirmação:** Clique em **"Confirmar Entrega"** para ver o Toast e ser direcionado para a tela comemorativa de **Escala Concluída**.
3. **Modo Mobile no Navegador:**
   * Pressione `F12` no teclado para abrir as Ferramentas do Desenvolvedor e ative o botão de dispositivo móvel (*Toggle Device Toolbar*) para visualizar na proporção exata de smartphone.

---

*Desenvolvido com rigor acadêmico e compromisso social por **Camilo Caetano Pinheiro de Oliveira**.*
