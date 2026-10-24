# 🔮 Backlog de Evoluções Futuras — Arquitetura Local-First e Resiliência Offline

> **Marco Operacional:** Evolução Contínua Pós-MVP (EP5)  
> **Tema Central:** Arquitetura Local-First, Progressive Web App (PWA), Persistência Desconectada e Roteirização Inteligente  
> **Origem dos Requisitos:** Reflexão discursiva da Experiência Prática IV e aprendizados empíricos nas rotas da periferia  

---

## 🎯 1. Contexto e Motivação Técnica

Durante as validações de campo na Zona Leste de São Paulo, constatou-se que a infraestrutura de telecomunicações nas comunidades periféricas apresenta alta volatilidade:
* Os voluntários frequentemente trafegam por vielas ou galpões de alvenaria densa onde o sinal 3G/4G oscila ou é completamente interrompido.
* Embora o MVP atual possua latência ultra-baixa quando conectado, a dependência de requisições web síncronas pode bloquear a baixa da entrega ou impedir a visualização imediata da escala na ausência de rede.

Para assegurar **resiliência operacional absoluta**, este backlog estrutura a migração para o paradigma **Local-First**, permitindo que o sistema funcione com 100% de autonomia desconectada.

---

## 📋 2. Itens do Backlog de Evolução Técnica

### [BK-020] Transformação em Progressive Web App (PWA) e Cache com Service Worker
* **Código:** `PWA-01`
* **Tipo:** Arquitetura / Front-End
* **Prioridade (MoSCoW):** Should Have
* **Pontos de História:** 8
* **História de Usuário:**
  > *Como voluntário operando em áreas periféricas sem sinal de internet, quero que o aplicativo permaneça totalmente operante no navegador do meu celular mesmo offline, para que eu possa consultar os endereços e donativos da rota sem interrupções.*
* **Critérios de Aceitação:**
  - [ ] Criação do arquivo `manifest.json` com ícones, tema (paleta Conecta Vidas Laranja/Stone) e modo `display: standalone`.
  - [ ] Implementação de Service Worker (`sw.js`) com estratégia de cache *Stale-While-Revalidate* para assets estáticos (HTML, Tailwind CSS, Fontes).
  - [ ] Capacidade de instalação do ícone do aplicativo na tela inicial do Android e iOS sem passar por lojas proprietárias.

---

### [BK-021] Persistência Transacional Local em IndexedDB
* **Código:** `SYNC-01`
* **Tipo:** Banco de Dados / Persistência Local
* **Prioridade (MoSCoW):** Should Have
* **Pontos de História:** 8
* **História de Usuário:**
  > *Como motorista voluntário, quero registrar a confirmação da entrega fisicamente mesmo sem conexão, gravando os dados no meu aparelho para sincronização automática posterior.*
* **Critérios de Aceitação:**
  - [ ] Criação de *Object Stores* no IndexedDB local do navegador (`entregas_locais`, `fila_sincronizacao`, `estoque_snapshot`).
  - [ ] Gravação determinística da transição para status `Concluído` com timestamp local ISO-8601.
  - [ ] Emissão de feedback visual multimodal no card informando: *"Gravado localmente — Sincronização pendente ⏳"*.

---

### [BK-022] Sincronização em Segundo Plano (Background Sync) com Resolução de Conflitos
* **Código:** `SYNC-02`
* **Tipo:** DevOps / Resiliência de Rede
* **Prioridade (MoSCoW):** Should Have
* **Pontos de História:** 5
* **História de Usuário:**
  > *Como coordenadora da ONG na sede, quero que as baixas registradas pelos voluntários na rua sincronizem automaticamente com o estoque da sede assim que o aparelho retomar conexão, sem divergências contábeis.*
* **Critérios de Aceitação:**
  - [ ] Utilização da *Background Synchronization API* acionada pelo evento `sync` do Service Worker.
  - [ ] Fila de despacho com retentativas exponenciais (*exponential backoff*).
  - [ ] Algoritmo determinístico de resolução de conflitos baseado em carimbo temporal e idempotência transacional.

---

### [BK-023] Otimização Algorítmica Multi-Paradas para Roteirização Veicular
* **Código:** `ROTA-01`
* **Tipo:** Otimização / Logística
* **Prioridade (MoSCoW):** Could Have
* **Pontos de História:** 5
* **História de Usuário:**
  > *Como motorista da van da ONG, quero que o sistema ordene automaticamente a sequência de famílias a visitar com base na proximidade geográfica, para reduzir o tempo total de percurso e economizar combustível.*
* **Critérios de Aceitação:**
  - [ ] Ordenação das paradas minimizando a distância total Euclidiana/Manhattan dos pontos cadastrados.
  - [ ] Geração de link multi-waypoint para navegação sequencial no Google Maps ou Waze.
  - [ ] Estimativa de redução adicional de 20% no tempo total gasto no mutirão.

---

### [BK-024] Auditoria Social Multimodal Sem Quebra de Privacidade
* **Código:** `AUDIT-01`
* **Tipo:** Governança / Auditoria
* **Prioridade (MoSCoW):** Could Have
* **Pontos de História:** 3
* **História de Usuário:**
  > *Como auditor social da instituição parceira, quero que a entrega registre comprovação digital não-invasiva (ex: confirmação por código numérico de 4 dígitos informado pela família), garantindo auditabilidade sem fotografar pessoas vulneráveis.*
* **Critérios de Aceitação:**
  - [ ] Envio prévio de token numérico descartável por SMS ou WhatsApp para o responsável familiar.
  - [ ] Campo opcional na tela de baixa para inserção do código no ato da entrega.
  - [ ] Total conformidade com a LGPD, preservando a dignidade humana.
