---
name: grill-me
description: Auditoria pré-entrega rigorosa do projeto Conecta Vidas. Avalia zero vazamento de dados (LGPD), 100% de testes passando, acessibilidade WCAG 2.1 AA e zero over-engineering.
---

# Grill-Me — Portão de Auditoria e Revisão Pré-Entrega

Antes de submeter qualquer entrega acadêmica ou consolidar alterações em `main`, responda e valide o checklist rigoroso:

## 1. Auditoria de Privacidade e Dados Sensíveis (LGPD)
- [ ] O repositório está 100% livre de identificadores acadêmicos privados (como RA ou RGM)?
- [ ] O código e os formulários não expõem CPFs, dados bancários, comprovantes de renda ou informações socioassistenciais íntimas?
- [ ] A baixa de entregas respeita a dignidade das famílias sem exigir fotos invasivas ou biometria?

## 2. Acessibilidade Universal (WCAG 2.1 AA)
- [ ] Todos os botões e alvos de toque interativos possuem altura mínima $\ge 44\text{px}$ (`min-h-[46px]`)?
- [ ] Os chips visuais e textos mantêm contraste superior a 4.5:1 (ou $> 7:1$) legíveis sob sol intenso?
- [ ] Os alertas de sucesso e erro possuem independência de cor (cor + texto literal + ícone vetorial SVG)?
- [ ] Os campos de formulário possuem `<label for="...">` permanentes e semanticamente associados?

## 3. Engenharia de Qualidade e Código Defensivo
- [ ] Todos os 12 testes do Pytest estão passando (`python -m pytest -v`) com 0 falhas?
- [ ] A cobertura de código das regras de negócio permanece em 100%?
- [ ] Não há nenhum `except Exception: pass` ou retorno vazio que mascare estados de erro?
- [ ] A lógica de estoque impede estados negativos (`EstoqueInsuficienteError`)?
- [ ] A conclusão de entrega é idempotente, impedindo baixas duplas do mesmo item?

## 4. Filosofia Zero Over-Engineering
- [ ] A arquitetura permanece leve e direta, sem dependências externas pagas ou desnecessárias?
- [ ] O link para GPS externo utiliza o protocolo universal e gratuito de URL Scheme nativo (`google.com/maps/search/?api=1`) com `target="_blank"`?

Se todas as respostas forem afirmativas, o código está homologado para entrega.
