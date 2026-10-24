---
trigger: model_decision
description: "Alinhamento com o ODS 2 (Fome Zero), conformidade com a LGPD, quatro experiências práticas e termos de aceite comunitário."
---

# Governança Acadêmica, ODS 2 e LGPD

## 1. Conexão Curricular com o ODS 2 (Fome Zero)
- Todo requisito do projeto deve responder direta ou indiretamente à **Meta 2.1 da ONU**: *"garantir o acesso de todas as pessoas, em particular os pobres e pessoas em situações vulneráveis, a alimentos seguros, nutritivos e suficientes durante todo o ano"*.
- **Indicadores Chave de Avaliação:**
  1. *Tempo Médio de Triagem e Check-in por Família:* Meta de redução $\ge 50\%$ (alcançado 63%, de 92s para 34s);
  2. *Taxa de Desperdício de Alimentos Perecíveis:* Meta de 0% de perdas no galpão através da lógica FIFO (First-In, First-Out).

## 2. Conformidade com a LGPD e Minimização de Dados (Lei nº 13.709/2018)
- **Privacidade por Design (Privacy by Design):** As famílias assistidas pela ACPV estão em vulnerabilidade socioeconômica extrema. O software deve protegê-las contra qualquer constrangimento ou discriminação.
- **Minimização de Payload:** A rota do voluntário expõe exclusivamente endereço, primeiro nome do responsável familiar e mantimentos a entregar. É proibido trafegar CPF, RG, NIS, dados bancários ou prontuário socioassistencial.
- **Proibição de Vigilância Invasiva:** É vedada a exigência de fotos dos beneficiários recebendo alimentos ou coleta biométrica. A auditoria apoia-se na integridade do fluxo contábil (despacho na sede e baixa consciente no modal).
- **Proteção de Dados do Estudante:** Números de matrícula acadêmica (RA/RGM) não devem ser expostos no repositório público.

## 3. Rastreabilidade das Quatro Experiências Práticas
- **EP1:** Diagnóstico Comunitário, Descoberta com Persona, ODS 2 e Escopo Preliminar.
- **EP2:** Arquitetura REST, Modelagem Relacional, Requisitos RF01-04 e RNF01-04, Acessibilidade WCAG AA e Protocolo de Validação.
- **EP3:** Versionamento Git com Conventional Commits, Suíte Pytest 100%, Pipeline CI GitHub Actions e 2 Rodadas de Validação com João Batista.
- **EP4:** Publicação no GitHub Pages HTTPS, Monitoramento Sintético 24/7, Resolução de Dilema Ético (LGPD) e Termo Formal de Aceite da Comunidade.
