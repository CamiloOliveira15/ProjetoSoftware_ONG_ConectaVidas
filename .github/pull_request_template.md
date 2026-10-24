## 📌 Descrição da Mudança
<!-- Descreva de forma concisa o que foi implementado nesta Pull Request -->
Implementação e aprimoramento do fluxo logístico de campo para a ONG Conecta Vidas, cobrindo autenticação, consulta de rotas com GPS, confirmação de entrega e controle de estoque físico.

## 🎯 Requisitos Atendidos
- [x] **RF01:** Atribuição de rotas pelo coordenador com débito automático no estoque físico.
- [x] **RF02:** Visualização de escala diária exclusiva do voluntário em trânsito.
- [x] **RF03:** Atualização de status para 'Concluído' com modal de segurança e toast.
- [x] **RF04:** Integração dinâmica com navegação externa (Google Maps / Waze).
- [x] **RNF04:** Acessibilidade WCAG 2.1 AA (contraste > 4.5:1, alvos >= 44px e independência de cor).

## 🧪 Testes Automatizados Executados
- [x] Testes unitários de regras de negócio (`tests/test_regras_negocio.py`) — **Aprovados (6/6)**.
- [x] Testes de acessibilidade e integridade HTML (`tests/test_interface_acessibilidade.py`) — **Aprovados (5/5)**.
- [x] Pipeline de CI (`.github/workflows/ci.yml`) validado e executando sem erros.

## 🔍 Checklist de Auto-Revisão Técnica
- [x] O código segue os padrões do design system (paleta Laranja MiauApoio & Neutros Stone).
- [x] Não há dados confidenciais ou senhas em texto limpo expostas no código.
- [x] A interface foi testada sob condições de luz solar direta e toque com uma mão só.
- [x] Nenhuma dependência pesada desnecessária foi introduzida (*zero over-engineering*).

---
*Revisado e submetido por: **Camilo Caetano Pinheiro de Oliveira (RA 45928321)***
