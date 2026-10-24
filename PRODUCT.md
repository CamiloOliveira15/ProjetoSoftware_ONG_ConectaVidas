# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Maria da Conceição Santos (Coordenação Geral na Sede ACPV):** Responsável pelo controle de donativos físicos no armazém comunitário, montagem ágil de rotas de entrega e despacho imediato para voluntários de campo.
- **João Batista (Voluntário de Rota / Entregador de Campo):** Opera em trânsito urbano em São Paulo, necessitando de visualização clara de escalas de entrega, dados essenciais de beneficiários, rotas diretas para GPS (Google Maps) e confirmação defensiva de baixa sem atrito.

## Product Purpose

O **Conecta Vidas** é um sistema web acadêmico de gestão logística humanitária e voluntariado desenvolvido no curso de CST em Análise e Desenvolvimento de Sistemas (Cruzeiro do Sul Virtual) em cooperação com a Associação Comunitária Pão e Vida (ACPV). Seu propósito é assegurar eficiência na última milha de distribuição de alimentos perecíveis e materiais de higiene, mitigando o desperdício e fortalecendo a segurança alimentar no âmbito do ODS 2.1 (Fome Zero).

## Positioning

Diferente de sistemas corporativos pesados de ERP ou interfaces genéricas de planilhas, o Conecta Vidas é uma plataforma comunitária humanizada, acolhedora e solidária (inspirada na filosofia MiauApoio). Prioriza dignidade, simplicidade operacional, minimização estrita de dados (LGPD) e zero custo de infraestrutura (zero over-engineering).

## Operating Context

- Operação em trânsito e em armazém comunitário com conectividade intermitente.
- Iluminação variável (luz solar direta na rua e iluminação artificial de galpão na sede).
- Acesso tanto em smartphones populares (voluntários) quanto em notebooks e desktops (coordenação).

## Capabilities and Constraints

- **RF01:** Gestão de estoque físico na sede com débito atômico em transação segura SQLite WAL.
- **RF02:** Escalas de entrega isoladas por voluntário autenticado com JWT.
- **RF03:** Baixa defensiva de entregas com comprovante digital auditável e bloqueio de duplicidade.
- **RF04:** Integração nativa e universal de geolocalização via Google Maps URL Scheme.
- **RNF04 / WCAG 2.1 AA:** Alvos de toque $\ge 44\text{px}$, contraste $\ge 4.5:1$, rótulos persistentes, independência de cor em alertas e zero emojis.
- **LGPD (Lei nº 13.709/2018):** Minimização de dados inegociável — proibido registrar CPF/RG, biometria ou dados socioeconômicos sensíveis.

## Brand Commitments

- **Identidade:** Conecta Vidas • Associação Comunitária Pão e Vida (ACPV).
- **Tom de Voz:** Humano, solidário, confiável, transparente e respeitoso.
- **Cores Oficiais:** Laranja solidário (`#c2410c` / `#ea580c`), fundo quente em pedra natural (`#faf9f6`), e detalhes em esmeralda acolhedor para entregas concluídas.

## Evidence on Hand

- Banco de dados relacional SQLite com histórico real de 17 entregas e 3 categorias de donativos (Cestas Básicas, Kits de Higiene, Leite em Pó).
- 20 testes automatizados no pytest cobrindo 100% dos requisitos de negócio e acessibilidade.

## Product Principles

1. **Dignidade e Acolhimento:** Uma ONG precisa de uma interface acolhedora, calorosa e intuitiva, não de um terminal corporativo frio.
2. **Clareza sem Sobrecarga:** Entregar a informação essencial imediatamente, sem formulários desnecessários ou camadas de menus complexos.
3. **Robustez Acessível:** Funcionar para qualquer voluntário em qualquer dispositivo com alvos de toque amplos e contraste impecável.
4. **Respeito aos Dados:** Segurança e privacidade por design sob o princípio da minimização.
