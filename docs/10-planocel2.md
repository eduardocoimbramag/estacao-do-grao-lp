# Plano de Ajustes Mobile 2 (Celular) — Laymob

**Status:** Implementação aplicada (apenas laymob1 e laymob2; layouts desktop inalterados).

---

## Regra geral

**Todas as modificações descritas abaixo são exclusivas dos layouts mobile (laymob1 e laymob2).** Nenhum layout desktop (laydesk1, laydesk2, laydesk3) deve ser alterado.

- **laymob1:** `max-width: 639px` (smartphones pequenos)
- **laymob2:** `min-width: 640px` e `max-width: 767px` (smartphones grandes / tablet pequeno)

Referência: `docs/03-LAYOUTS.md` e `docs/09-planocel.md`.

---

## Resumo das modificações

| # | Seção | Problema | Objetivo |
|---|--------|----------|----------|
| 1 | Hero | Botões do slideshow (anterior/próximo) ultrapassam os limites da imagem | Botões ficarem **dentro** da área da imagem |
| 2 | O que é a Estação do Grão? | Overflow apenas no **iPhone SE**; nos demais aparelhos está ok | Corrigir overflow **somente** em viewport equivalente ao iPhone SE |
| 3 | O que é a Estação do Grão? | Botão "Ver Serviços" com tamanho diferente do "Solicitar Orçamento" | "Ver Serviços" com o **mesmo tamanho** que "Solicitar Orçamento" |
| 4 | Nossos Serviços | Card em destaque cortado no topo e na base | Ajustar para o card em relevância aparecer **inteiro** (sem corte) |
| 5 | Regiões Atendidas | Seção e imagem do mapa pequenas em todos os aparelhos mobile | **Aumentar** altura/tamanho da seção e da imagem do mapa |
| 6 | Personalização / Poderes do Café | Seção precisa de scroll para não ficar excessivamente longa | **Reverter** essa seção ao comportamento anterior (com scroll) |

---

## Detalhamento por item

### 1) Hero — Botões do slideshow dentro da imagem

- **Onde:** `components/hero/Hero.tsx` + `app/globals.css` (blocos laymob1 e laymob2).
- **Situação:** Os botões ‹ e › (anterior/próximo) do carrossel estão posicionados de forma a “sair” dos limites da imagem do slideshow.
- **Objetivo:** Manter os botões **dentro** da área da imagem (por exemplo, com `position: absolute` em relação ao container do slideshow e `inset`/margens que não ultrapassem as bordas; ou reduzir/ajustar `left`/`right` e tamanho dos botões).
- **Escopo:** Apenas laymob1 e laymob2 (classes/estilos `.laymob1-hero-*` e `.laymob2-hero-*` ou equivalentes).

---

### 2) O que é a Estação do Grão? — Overflow só no iPhone SE

- **Onde:** `components/OpenMenuIntro.tsx` + `app/globals.css`.
- **Situação:** A seção está boa em tamanho nos demais aparelhos; apenas no **iPhone SE** ocorre overflow (conteúdo saindo da tela ou scroll indesejado).
- **Objetivo:** Aplicar correções de overflow **somente** para viewports equivalentes ao iPhone SE.
- **Sugestão técnica:** Usar uma media query mais restrita dentro do contexto mobile, por exemplo `max-width: 375px` (cobre iPhone SE 2ª/3ª geração e menores) ou `max-width: 390px`. Pode ser uma subclasse dentro de laymob1 (ex.: `.laymob1-sec2-iphone-se`) aplicada apenas quando `max-width: 375px` (ou 390px), sem alterar laydesk.
- **Escopo:** Apenas essa faixa de largura (iPhone SE); demais laymob e todos os laydesk inalterados.

---

### 3) O que é a Estação do Grão? — Botão "Ver Serviços" igual ao "Solicitar Orçamento"

- **Onde:** `components/OpenMenuIntro.tsx` + `app/globals.css` (laymob1 e laymob2).
- **Situação:** No final da seção há dois botões: "Ver Serviços" e "Solicitar Orçamento"; "Ver Serviços" está com tamanho diferente (geralmente menor).
- **Objetivo:** Fazer o botão "Ver Serviços" ter o **mesmo tamanho** que o botão "Solicitar Orçamento" (mesma largura e/ou altura, conforme o layout atual do "Solicitar Orçamento").
- **Sugestão técnica:** Em laymob, aplicar às âncoras/botões da área de CTA (ex.: `.laymob1-sec2-cta a`, `.laymob2-sec2-cta a`) estilos como `flex: 1 1 0`, `min-width: 0`, `width: 100%` no container, ou `width: 50%`/valores iguais para ambos, de forma que os dois fiquem idênticos em tamanho.
- **Escopo:** Apenas laymob1 e laymob2.

---

### 4) Nossos Serviços — Card em destaque sem corte no topo/base

- **Onde:** `app/page.tsx` (seção #nossos-servicos) + `components/sections/services-carousel.tsx` + `app/globals.css` (laymob1 e laymob2).
- **Situação:** O card em relevância (central/ativo) do carrossel está cortado no **topo** e na **parte inferior**.
- **Objetivo:** Ajustar padding/margem/altura da section e do container do carrossel em laymob para que o card em destaque seja exibido **por completo** (sem corte superior nem inferior).
- **Sugestão técnica:** Em laymob, aumentar `padding-top` e `padding-bottom` da section e/ou do container do carrossel; ou garantir `min-height`/`height` que acomode o card inteiro; evitar `overflow: hidden` que corte o card ou compensar com padding. Não alterar laydesk.
- **Escopo:** Apenas laymob1 e laymob2.

---

### 5) Regiões Atendidas — Seção e mapa maiores

- **Onde:** `components/audience.tsx` + `app/globals.css` (laymob1 e laymob2).
- **Situação:** A seção "Regiões Atendidas" e a **imagem do mapa** estão pequenas em todos os aparelhos mobile.
- **Objetivo:** **Aumentar** a altura (e, se fizer sentido, a largura) da seção e o tamanho da imagem do mapa em laymob.
- **Sugestão técnica:** Em laymob, por exemplo: aumentar `min-height` da section (ex.: `min-height: 80vh` ou valor fixo maior); no container da imagem do mapa, aumentar `max-width` (ex.: de `120px` para algo como `180px` ou `200px` em laymob1) e/ou altura; garantir que a imagem tenha espaço e não fique comprimida.
- **Escopo:** Apenas laymob1 e laymob2.

---

### 6) Personalização / Poderes do Café — Voltar a ter scroll

- **Onde:** `components/split-screen-content.tsx` + `app/globals.css` (laymob1 e laymob2).
- **Situação:** Esta é a única seção que **precisa** de scroll; sem scroll a seção fica excessivamente longa.
- **Objetivo:** **Reverter** o comportamento dessa seção ao que era antes (permitir scroll vertical), para que o conteúdo não fique “espremido” em uma tela.
- **Sugestão técnica:** Em laymob, remover ou relaxar regras que impeçam scroll nessa seção (ex.: `height: auto` e `min-height: auto` já estão; garantir `overflow-y: auto` no container de conteúdo das abas; não forçar `height: 100vh` ou `overflow: hidden` que impeçam o scroll). Objetivo: seção rolável como antes, apenas em laymob.
- **Escopo:** Apenas laymob1 e laymob2.

---

## Onde fazer as alterações

| Item | Arquivos principais | Onde no CSS |
|------|---------------------|-------------|
| 1 | `Hero.tsx`, `globals.css` | Blocos `@media (max-width: 639px)` e `@media (min-width: 640px) and (max-width: 767px)` — estilos para botões do carrossel Hero |
| 2 | `OpenMenuIntro.tsx`, `globals.css` | Nova media query restrita (ex.: `max-width: 375px`) ou subclasse em laymob1 para iPhone SE |
| 3 | `OpenMenuIntro.tsx`, `globals.css` | Mesmos blocos laymob — estilos para os dois botões de CTA |
| 4 | `page.tsx`, `services-carousel.tsx`, `globals.css` | Blocos laymob — section #nossos-servicos e container do carrossel (padding/height/overflow) |
| 5 | `audience.tsx`, `globals.css` | Blocos laymob — section "Regiões Atendidas" e container da imagem do mapa |
| 6 | `split-screen-content.tsx`, `globals.css` | Blocos laymob — remover/ajustar regras que impedem scroll; garantir `overflow-y: auto` onde necessário |

---

## Ordem sugerida de implementação

1. **Item 6** — Reverter scroll na seção Personalização/Poderes do Café (rápido e independente).
2. **Item 1** — Botões do Hero dentro da imagem (evita conflito visual).
3. **Item 3** — Igualar tamanho dos botões "Ver Serviços" e "Solicitar Orçamento".
4. **Item 2** — Ajuste de overflow só para iPhone SE (media query restrita).
5. **Item 4** — Card de Nossos Serviços sem corte (padding/altura em laymob).
6. **Item 5** — Aumentar seção e mapa em Regiões Atendidas.

---

## Próximos passos (após autorização)

1. Obter autorização para implementar.
2. Implementar **somente** em laymob (laymob1 e laymob2); não alterar laydesk1, laydesk2, laydesk3.
3. Testar em viewports pequenas (ex.: 320px, 375px), iPhone SE e dispositivos reais se possível.
4. Atualizar este documento com "Status: Implementação aplicada" quando concluído.

---

## Referências

- **Layouts e breakpoints:** `docs/03-LAYOUTS.md`
- **Plano mobile anterior:** `docs/09-planocel.md`
- **Estilos globais e laymobs:** `app/globals.css` (seção "LAYOUTS MOBILE")
