---
name: Conecta Vidas
description: Sistema humanitário e comunitário de gestão logística de alimentos da última milha (ODS 2.1)
colors:
  primary: "#c2410c"
  primary-hover: "#9a3412"
  primary-light: "#fff7ed"
  canvas: "#faf9f6"
  surface: "#ffffff"
  border: "#e7e5e4"
  text-main: "#1c1917"
  text-muted: "#57534e"
  status-success: "#047857"
  status-success-bg: "#f0fdf4"
  status-warning: "#b45309"
  status-warning-bg: "#fffbeb"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.01em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    height: "46px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.md}"
    height: "46px"
---

# Design System Conecta Vidas (Impeccable Anti-Slop + MiauApoio)

## Overview
O sistema visual do Conecta Vidas foi concebido para expressar acolhimento comunitário, solidariedade e transparência na entrega de alimentos pela Associação Comunitária Pão e Vida (ACPV). Rejeita o visual genérico de "IA slop" (cartões isolados repetitivos com azulejos de ícones soltos em fundo cinza vazio) e evita o peso corporativo frio de softwares corporativos (como LegalSync). Em vez disso, adota uma linguagem calorosa, humana e de alta usabilidade (inspirada no MiauApoio).

## Colors
- **Primária Solidária:** Laranja vibrante (`#c2410c` / `#9a3412`), atendendo ao contraste WCAG 2.1 AA ($\ge 4.8:1$).
- **Canvas Neutro Quente:** `#faf9f6` (tom de pedra natural / casca de ovo), garantindo leitura confortável e sensação humana.
- **Superfícies de Dados:** `#ffffff` com bordas sutis em `#e7e5e4` e sombras suaves de 1px.
- **Semântica:** Esmeralda (`#047857`) para baixas confirmadas e Âmbar acolhedor (`#b45309`) para rotas pendentes.

## Typography
- Tipografia do sistema operacional nativo (-apple-system, BlinkMacSystemFont, Segoe UI) para renderização nítida sem carregamento externo lento.
- Escala tipográfica comedida (títulos em 1.5rem a 1.75rem, corpo em 0.875rem / 14px, legendas em 0.75rem / 12px).
- Numerais tabulares para dados logísticos e datas.
- Regra Anti-Slop: Proibido o uso de eyebrows ou kickers artificiais acima de títulos.

## Layout
- **Aproveitamento das Laterais:** O layout preenche a tela de forma generosa (`max-w-7xl` e `w-full` com padding de `px-6` a `px-10`), eliminando os vazios laterais de monitores widescreen sem perder legibilidade.
- **Central da Sede:** Disposição orgânica em duas áreas de trabalho: painel de rastreabilidade de entregas (amplo) e painel lateral de armazém/despacho ágil.
- **Visão de Campo:** Grade flexível de cartões de rota (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) que preenchem harmoniosamente o espaço horizontal.

## Elevation & Depth
- Profundidade plana e tátil: bordas de 1px com sombra mínima (`shadow-[0_1px_3px_rgba(0,0,0,0.04)]`).
- Sem sombras duras de bloco nem efeitos excessivos de vidro difuso.

## Shapes
- Raios de curvatura acolhedores: `rounded-xl` (12px) e `rounded-2xl` (16px) para cartões e inputs.
- Alvos de toque acessíveis: botões e controles com altura mínima $\ge 44\text{px}$ (`min-h-[46px]`).

## Components
- **Navbar Humanizada:** Topo acolhedor com identidade visual ACPV, controle de abas Apple-style e indicador de perfil acessível.
- **Tabela de Entregas:** Linhas com espaçamento confortável, busca instantânea e badges semânticos de status.
- **Cartões de Rota (Visão de Campo):** Tickets com dados essenciais do beneficiário, donativos em tags limpas, navegação GPS e botão de baixa de rota.
- **Modais Defensivos:** Diálogos com foco protegido para confirmação de entrega e recibo digital com código hash auditável.

## Do's and Don'ts
- **DO:** Usar ícones vetoriais SVG consistentes para cada ação.
- **DO:** Garantir alvos de toque acessíveis $\ge 44\text{px}$ para voluntários operando em trânsito.
- **DO:** Manter contraste mínimo de 4.5:1 em todos os textos e controles.
- **DON'T:** Nunca usar emojis na interface.
- **DON'T:** Evitar modelos de cartões repetitivos vazios ou números soltos desprovidos de contexto.
- **DON'T:** Não usar o visual de software corporativo frio ou terminologias complexas de ERP.
