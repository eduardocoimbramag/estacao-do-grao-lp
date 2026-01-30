# Plano de Ajustes Mobile 3 (Celular) — Correções Reforçadas Laymob

**Status:** Implementação aplicada (apenas laymob1 e laymob2; layouts desktop inalterados).

---

## Regra geral

**Todas as modificações descritas abaixo são exclusivas dos layouts mobile (laymob1 e laymob2).** Nenhum layout desktop (laydesk1, laydesk2, laydesk3) deve ser alterado.

- **laymob1:** `max-width: 639px` (smartphones pequenos)
- **laymob2:** `min-width: 640px` e `max-width: 767px` (smartphones grandes / tablet pequeno)

Referência: `docs/03-LAYOUTS.md`, `docs/09-planocel.md` e `docs/10-planocel2.md`.

---

## Contexto

Os itens 1, 2, 3 e 5 do plano anterior (`docs/10-planocel2.md`) **não foram solucionados adequadamente**. O item 4 foi implementado mas precisa de ajuste adicional (aumentar ainda mais).

Este documento descreve **ajustes reforçados e mais agressivos** para garantir que os problemas sejam efetivamente corrigidos.

---

## Resumo das modificações

| # | Seção | Problema | Status anterior | Objetivo |
|---|--------|----------|-----------------|----------|
| 1 | O que é a Estação do Grão? | Overflow no iPhone SE | **NÃO SOLUCIONADO** | Corrigir overflow **definitivamente** no iPhone SE (max-width 375px) com redução de padding, font-size e height da section |
| 2 | O que é a Estação do Grão? | Botões "Ver Serviços" e "Solicitar Orçamento" com tamanhos diferentes | **NÃO SOLUCIONADO** | Forçar os dois botões com padding, width e font-size **idênticos** usando !important |
| 3 | Nossos Serviços | Card em destaque cortado no topo e na base | **NÃO SOLUCIONADO** | Aumentar padding-top/bottom **ainda mais** ou remover scale no card ativo em laymob |
| 4 | Regiões Atendidas | Seção e mapa pequenos (implementado, mas **precisa aumentar mais**) | Parcialmente solucionado | **Aumentar ainda mais** min-height da section (ex.: 85vh-95vh) e mapa (300px laymob1, 350px laymob2) |
| 5 | Personalização / Poderes do Café | Seção precisa de scroll (não está permitindo scroll) | **NÃO SOLUCIONADO** | Forçar `height: auto !important` e `min-height` muito maior, `overflow-y: visible !important` para permitir scroll da página |

---

## Detalhamento por item

### 1) O que é a Estação do Grão? — Overflow iPhone SE (REFORÇADO)

- **Onde:** `components/OpenMenuIntro.tsx` + `app/globals.css` (media query `max-width: 375px`).
- **Problema anterior:** A media query foi adicionada mas o overflow persiste. Possíveis causas: altura da section ainda muito restrita (`h-[calc(100vh-4rem)]` do Tailwind não está sendo sobrescrito), padding interno muito grande, vídeo e lista ocupando muito espaço.
- **Objetivo reforçado:**
  - **Forçar** `height: auto !important` na section `#apresentacao` para iPhone SE, removendo qualquer altura fixa.
  - **Reduzir drasticamente** padding-top/bottom da section (ex.: `0.5rem`).
  - **Reduzir** padding lateral do container (`.laymob1-sec2-container`).
  - **Reduzir** altura máxima do vídeo mobile (`.aspect-[9/16]`), ex.: de 360px para 220px-240px.
  - **Reduzir** gap entre vídeo e lista (`grid-cols-[1.4fr_1fr]` gap de 2.5 para 1.5 ou 1rem).
  - **Reduzir** font-size do título e subtítulo mobile.
  - **Reduzir** espaçamento da lista de bullets (`space-y-5` para `space-y-3` ou menos).
  - Garantir `overflow-y: visible !important` para permitir scroll se necessário.
- **Sugestão técnica:** Aumentar especificidade da media query (usar `#apresentacao.laymob1-sec2-section.laymob1-sec2-iphone-se` ou adicionar classe específica no componente e no CSS com !important em todas as propriedades de height/padding/font).

---

### 2) O que é a Estação do Grão? — Botões idênticos (REFORÇADO)

- **Onde:** `components/OpenMenuIntro.tsx` (container `.laymob1-sec2-cta`) + `app/globals.css` (laymob1 e laymob2).
- **Problema anterior:** Adicionado `flex: 1 1 0` mas os botões ainda têm tamanhos diferentes. Possíveis causas: padding diferente nos botões (um tem `px-4 py-2.5` com `font-light uppercase tracking-[0.16em]` e o outro tem `font-normal uppercase tracking-[0.08em]`), ou o tracking/font-weight estão causando diferença visual, ou o Tailwind `flex-1` está sobrescrevendo o CSS.
- **Objetivo reforçado:**
  - **Forçar** ambos os links/âncoras com `padding: 1rem !important` (ou valor fixo idêntico) para laymob.
  - **Forçar** ambos com `font-size: 0.875rem !important` (14px) e `line-height: 1.25rem !important` idênticos.
  - **Forçar** `width: calc(50% - 0.25rem) !important` em ambos (metade do container menos metade do gap), ou `flex: 1 1 0 !important` + `min-width: 0 !important` + `max-width: 50% !important`.
  - **Forçar** `box-sizing: border-box !important`.
  - Garantir que o container (`.laymob1-sec2-cta`) tenha `display: flex !important`, `justify-content: space-between !important` ou `justify-content: stretch !important`.
  - Se necessário, sobrescrever as classes Tailwind `font-light` e `font-normal` com `font-weight: 400 !important` (ou 300, desde que ambos sejam iguais) em laymob.
- **Sugestão técnica:** Adicionar seletores muito específicos no CSS laymob, ex.: `.laymob1-sec2-cta a[href="#nossos-servicos"]` e `.laymob1-sec2-cta a[href="#contato"]` com valores idênticos de padding, font-size, width, etc.

---

### 3) Nossos Serviços — Card sem corte (REFORÇADO)

- **Onde:** `app/page.tsx` (section #nossos-servicos) + `components/sections/services-carousel.tsx` + `app/globals.css` (laymob1 e laymob2).
- **Problema anterior:** Padding de 1.5rem foi adicionado na section mas o card ainda está cortado. Possíveis causas: a section tem `h-[calc(100vh-4rem)]` fixo e `overflow: hidden`, então mesmo com padding o card que escala para `scale-105` (no ativo) extrapola; ou o carrossel tem `py-2` que é insuficiente; ou o container do carrossel precisa de mais espaço vertical.
- **Objetivo reforçado:**
  - **Aumentar** padding-top/bottom da `.laymob1-servicos-section` para **3rem ou 4rem** (em vez de 1.5rem).
  - **Aumentar** padding-top/bottom do `.laymob1-servicos-container` para **1rem ou 1.5rem** (em vez de 0.5rem).
  - **Aumentar** padding-top/bottom do carrossel (`.laymob1-servicos-carousel` ou o div com `py-2`) para **py-4 ou py-6** em laymob (via CSS `padding-top/bottom: 1.5rem !important` ou `2rem !important`).
  - **Remover scale no card ativo** em laymob: `.laymob1-servicos-carousel article` com `transform: scale(1) !important` (ou seja, desabilitar o `scale-105` que faz o card crescer e ultrapassar limites).
  - Garantir que a section em laymob tenha `overflow: visible !important` ou `overflow-y: visible !important` se o objetivo for permitir que o card "saia" levemente da section (se não cortar, pode ficar visível).
- **Sugestão técnica:** Aplicar `padding: 2rem 0.75rem !important` na section e/ou container em laymob, e desabilitar o scale (`transform: scale(1) !important; opacity: 1 !important`) no card quando estiver dentro de laymob.

---

### 4) Regiões Atendidas — Seção e mapa AINDA MAIORES

- **Onde:** `components/audience.tsx` + `app/globals.css` (laymob1 e laymob2).
- **Situação:** Implementado com `min-height: 70vh`, mapa `200px` (laymob1) e `220px` (laymob2). Usuário quer **aumentar ainda mais**.
- **Objetivo reforçado:**
  - **Aumentar** `min-height` da section para **85vh-95vh** em laymob1 e **80vh-90vh** em laymob2.
  - **Aumentar** `max-width` do mapa para **280px-300px** em laymob1 e **320px-350px** em laymob2.
  - **Aumentar** padding-top/bottom da section se necessário (já temos 2rem; manter ou aumentar para 2.5rem-3rem).
  - **Aumentar** gap entre elementos internos se fizer sentido (título, mapa, cards).
- **Sugestão técnica:** Em laymob, `.laymob1-audience-section { min-height: 90vh !important; }` e `.laymob1-audience-map { max-width: 300px !important; }`. Para laymob2, `min-height: 85vh` e mapa `350px`.

---

### 5) Personalização / Poderes do Café — Scroll DEFINITIVO

- **Onde:** `components/split-screen-content.tsx` + `app/globals.css` (laymob1 e laymob2).
- **Problema anterior:** Implementado `height: auto`, `min-height: 60vh`, `overflow-y: visible`, mas o scroll não está funcionando. Possíveis causas: a section ainda tem `h-[calc(100vh-4rem)]` do Tailwind que está prevalecendo (especificidade maior ou !important no Tailwind v4), ou o `overflow-hidden` da section está impedindo o scroll, ou o conteúdo interno (mobile div) tem `h-full` que faz 100% de uma altura que não cresceu.
- **Objetivo reforçado:**
  - **Forçar** `height: auto !important` e remover qualquer altura fixa na `.laymob1-split-section` e `.laymob2-split-section`.
  - **Aumentar** `min-height` da section para **100vh ou 120vh** (mais que o necessário) para garantir que o conteúdo caiba e, se exceder, o scroll da **página** funcione.
  - **Forçar** `overflow-y: visible !important` e `overflow-x: hidden !important` na section.
  - **Remover** ou sobrescrever `overflow: hidden` que possa estar na section.
  - No componente, a div mobile (`block sm:hidden h-full flex flex-col`) tem `h-full` — em laymob, adicionar uma classe (ex.: `.laymob1-split-mobile-content`) e no CSS forçar `min-height: 60vh !important` ou `height: auto !important` para que o conteúdo das tabs expanda.
  - Garantir que o container das tabs (o que tem `overflow-y-auto` no motion.div) tenha `max-height: none !important` ou `height: auto !important` em laymob para não limitar.
- **Sugestão técnica:** Adicionar no componente uma classe específica para o mobile wrapper (ex.: `laymob1-split-mobile-wrapper`) e no CSS laymob forçar `height: auto !important`, `min-height: 80vh !important`, `overflow: visible !important`. E no inner content area (tabs), garantir `overflow-y: auto !important` e `max-height: none !important`.

---

## Onde fazer as alterações

| Item | Arquivos principais | Onde no CSS | Classes a adicionar nos componentes |
|------|---------------------|-------------|-------------------------------------|
| 1 | `OpenMenuIntro.tsx`, `globals.css` | Media query `@media (max-width: 375px)` — aumentar especificidade e reduzir todos os tamanhos/padding | Pode adicionar classe `.laymob1-sec2-iphone-se-strict` na section ou nos wrappers internos |
| 2 | `OpenMenuIntro.tsx`, `globals.css` | Blocos laymob1/laymob2 — seletores específicos para cada botão (por href) com valores idênticos | Classes já existem (`.laymob1-sec2-cta`); ajustar CSS com !important |
| 3 | `page.tsx`, `services-carousel.tsx`, `globals.css` | Blocos laymob1/laymob2 — aumentar padding section/container e desabilitar scale do card | Pode adicionar `.laymob1-servicos-card-active` nos cards e desabilitar transform |
| 4 | `audience.tsx`, `globals.css` | Blocos laymob1/laymob2 — aumentar min-height section e max-width mapa | Classes já existem (`.laymob1-audience-section`, `.laymob1-audience-map`); aumentar valores |
| 5 | `split-screen-content.tsx`, `globals.css` | Blocos laymob1/laymob2 — forçar height: auto, min-height maior, overflow visible | Adicionar classe ao wrapper mobile (ex.: `.laymob1-split-mobile-wrapper`) e forçar height/overflow |

---

## Ordem sugerida de implementação

1. **Item 5** — Scroll definitivo (mais crítico: seção não funcional sem scroll).
2. **Item 1** — iPhone SE overflow (impacta UX em dispositivo comum).
3. **Item 3** — Card sem corte (problema visual que afeta apresentação).
4. **Item 2** — Botões idênticos (detalhe de consistência).
5. **Item 4** — Aumentar ainda mais seção/mapa (ajuste adicional).

---

## Estratégia de implementação (por item)

### Item 1 — iPhone SE overflow (max-width 375px)

**Arquivo: `app/globals.css`**

Substituir ou reforçar a media query existente `@media (max-width: 375px)`:

```css
@media (max-width: 375px) {
  #apresentacao.laymob1-sec2-section.laymob1-sec2-iphone-se {
    height: auto !important;
    min-height: auto !important;
    max-height: none !important;
    overflow-y: visible !important;
    overflow-x: hidden !important;
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }
  
  #apresentacao.laymob1-sec2-iphone-se .laymob1-sec2-container {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  
  /* Título mobile menor */
  #apresentacao.laymob1-sec2-iphone-se h2 {
    font-size: 1.25rem !important;
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }
  
  /* Subtítulo mobile menor */
  #apresentacao.laymob1-sec2-iphone-se p.text-sm {
    font-size: 0.75rem !important;
  }
  
  /* Vídeo mobile menor */
  #apresentacao.laymob1-sec2-iphone-se [class*="aspect-"] {
    max-height: 220px !important;
  }
  
  /* Grid gap menor */
  #apresentacao.laymob1-sec2-iphone-se [class*="grid-cols"] {
    gap: 1rem !important;
  }
  
  /* Lista bullets compacta */
  #apresentacao.laymob1-sec2-iphone-se ul {
    row-gap: 0.75rem !important;
  }
  
  /* Parágrafo compacto */
  #apresentacao.laymob1-sec2-iphone-se p.text-xs {
    font-size: 0.75rem !important;
    line-height: 1.25rem !important;
  }
}
```

---

### Item 2 — Botões idênticos

**Arquivo: `app/globals.css` (dentro dos blocos laymob1 e laymob2)**

Substituir ou reforçar as regras de `.laymob1-sec2-cta`:

```css
/* laymob1 */
.laymob1-sec2-cta {
  display: flex !important;
  gap: 0.5rem !important;
  width: 100% !important;
}

.laymob1-sec2-cta a {
  flex: 1 1 0 !important;
  min-width: 0 !important;
  max-width: 50% !important;
  padding: 0.625rem 1rem !important; /* py-2.5 px-4 */
  font-size: 0.875rem !important; /* text-sm */
  line-height: 1.25rem !important;
  font-weight: 400 !important; /* forçar mesmo weight */
  letter-spacing: 0.05em !important; /* tracking uniforme */
  text-align: center !important;
  box-sizing: border-box !important;
}

/* laymob2: mesmos valores */
.laymob2-sec2-cta { ... }
.laymob2-sec2-cta a { ... }
```

---

### Item 3 — Card sem corte

**Arquivo: `app/globals.css` (blocos laymob1 e laymob2)**

Aumentar padding e desabilitar scale:

```css
/* laymob1 */
.laymob1-servicos-section {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
  overflow-y: visible !important; /* permite card ultrapassar levemente se necessário */
}

.laymob1-servicos-container {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

/* Carrossel: padding vertical maior */
.laymob1-servicos-carousel > div[ref] {
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}

/* Desabilitar scale no card ativo */
.laymob1-servicos-carousel article {
  transform: scale(1) !important;
  opacity: 1 !important;
}

/* laymob2: mesmos ajustes */
```

---

### Item 4 — Seção e mapa ainda maiores

**Arquivo: `app/globals.css` (blocos laymob1 e laymob2)**

```css
/* laymob1 */
.laymob1-audience-section {
  min-height: 90vh !important;
  padding-top: 2.5rem !important;
  padding-bottom: 2.5rem !important;
}

.laymob1-audience-map {
  max-width: 300px !important;
}

/* laymob2 */
.laymob2-audience-section {
  min-height: 85vh !important;
}

.laymob2-audience-map {
  max-width: 350px !important;
}
```

---

### Item 5 — Scroll definitivo

**Arquivo: `components/split-screen-content.tsx`**

Adicionar classe ao wrapper mobile:

```tsx
<div className="block sm:hidden h-full flex flex-col laymob1-split-mobile-wrapper laymob2-split-mobile-wrapper">
```

**Arquivo: `app/globals.css` (blocos laymob1 e laymob2)**

```css
/* laymob1 */
.laymob1-split-section {
  height: auto !important;
  min-height: 100vh !important;
  max-height: none !important;
  overflow-x: hidden !important;
  overflow-y: visible !important;
}

.laymob1-split-mobile-wrapper {
  height: auto !important;
  min-height: 80vh !important;
}

.laymob1-split-mobile-wrapper > div[class*="overflow-y-auto"] {
  max-height: none !important;
  overflow-y: auto !important;
}

/* laymob2: mesmos ajustes */
```

---

## Próximos passos (após autorização)

1. Obter autorização para implementar.
2. Aplicar os ajustes **reforçados** apenas em laymob (laymob1 e laymob2).
3. Testar em iPhone SE real ou DevTools (320px, 375px) e demais aparelhos mobile.
4. Iterar se necessário com valores ainda maiores/menores conforme feedback.
5. Atualizar este documento com "Status: Implementação aplicada" quando concluído.

---

## Referências

- **Layouts e breakpoints:** `docs/03-LAYOUTS.md`
- **Plano mobile 1:** `docs/09-planocel.md`
- **Plano mobile 2:** `docs/10-planocel2.md` (implementado mas insuficiente)
- **Estilos globais e laymobs:** `app/globals.css` (seção "LAYOUTS MOBILE")
