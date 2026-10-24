---
trigger: glob
globs: "*.html, tests/test_interface_acessibilidade.py, docs/assets/*"
description: "Contratos de acessibilidade WCAG 2.1 AA, design system MiauApoio, áreas de toque e feedback de usuário em campo."
---

# Frontend, Acessibilidade e Experiência do Usuário (UX)

## 1. Design System e Identidade Visual (MiauApoio $\rightarrow$ Conecta Vidas)
- **Paleta de Cores Oficial:**
  - Primária (Ação / Destaque): Laranja Tailwind (`bg-orange-500`, `hover:bg-orange-600`, `#f97316`).
  - Neutra (Fundo e Tipografia): Stone (`bg-stone-50`, `text-stone-800`, `text-stone-900`, `#292524`).
  - Sucesso / Status: Emerald (`bg-emerald-600`, `text-emerald-800`).
- **Tipografia:** Google Fonts `Inter` com hierarquia semântica rigorosa (`<h1>` único, subtítulos e pesos visíveis).

## 2. Acessibilidade Obrigatória (WCAG 2.1 Nível AA)
- **Áreas de Toque Mínimas (Touch Targets):** Todos os botões interativos e links primários devem ter altura mínima $\ge 44\text{px}$ (calibrados com classe utilitária `min-h-[46px]` ou `min-h-[48px]`), garantindo operação com apenas uma mão por voluntários segurando caixas.
- **Relação de Contraste:** Relação mínima de contraste de 4.5:1 para texto normal contra o fundo (calibrada para $> 7:1$ nos chips visuais para permitir leitura instantânea sob luz solar direta).
- **Independência de Cor:** Mensagens de confirmação e erro jamais dependem unicamente de cor. É mandatória a tríade:
  1. Cor de fundo semântica (verde/laranja);
  2. Ícone vetorial SVG explícito (checkmark/alerta);
  3. Texto explicativo afirmativo em linguagem natural.
- **Rótulos Persistentes:** Todo `<input>` deve ter um `<label>` correspondente com atributo `for` vinculado ao `id`, proibindo a substituição de rótulos apenas por placeholders voláteis.

## 3. Feedback Multimodal e Prevenção de Erros
- Modais de confirmação in-page devem adotar botões descritivos e literais (`Voltar` e `Confirmar Entrega`), prevenindo toques acidentais em trânsito.
- A conclusão da entrega deve transicionar o estado para comprovante permanente com carimbo de horário (`Concluído às 09:44 ✔`), bloqueando reenvios e conferindo segurança cognitiva ao voluntário.
