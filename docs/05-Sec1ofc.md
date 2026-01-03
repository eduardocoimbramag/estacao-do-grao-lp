# 05 — Seção 1 (Hero) — Ajuste Oficial (laydesk2) sem overflow e com altura “1 tela − menu”

## Objetivo

Corrigir a **Seção 1 (Hero)** para o layout **laydesk2** garantindo:
- **Altura da seção** = **(1 tela − menu)**.
- **Sem overflow vertical** (nada cortado, nada ultrapassando o limite).
- **Título visível** (não pode ficar “por baixo” do menu/header).
- **Layout alinhado** e enquadrado em **1366×768 real @ zoom 100%**.

> **Importante:** esta documentação descreve a implementação **somente para laydesk2**.  
> Não alterar mobile, laydesk1, laydesk3.

---

## Base real (medição do seu ambiente)

Você mediu em **1366×768 @ zoom 100%**:
- `window.innerHeight = 599`
- `window.devicePixelRatio = 1`

O `Header` é `fixed` e tem altura `h-16` = **4rem = 64px** (`components/header.tsx`).

### Orçamento de altura (cálculo)

- **Altura total disponível (viewport real)**: **599px**
- **Menu/Header fixo**: **64px**

\[
\text{Área útil para a seção} = 599 - 64 = 535\text{px}
\]

**Meta:** a seção Hero precisa “caber” em **~535px** (sem scroll interno e sem cortar as métricas).

---

## Diagnóstico do problema (print laydesk2)

### Sintomas reportados
- **H1 não aparece** → provável conteúdo “passando por baixo” do header fixo.
- **Final do conteúdo ultrapassa** → métricas começam a ser cortadas/ficam fora do limite.

### Causa mais provável
- O `Header` é **fixed** em todos os layouts.
- No laydesk3 já existe um padrão de compensação:
  - `main { padding-top: 4rem; }`
  - seções com `height: calc(100vh - 4rem)`
- No **laydesk2**, hoje não existe essa compensação global, e o Hero ainda está com:
  - `min-h-screen` e `pt-20`/`pb-8` no Tailwind (muito espaço vertical para uma área útil de 535px).

---

## Estrutura atual do Hero (referência)

Arquivo: `components/hero/Hero.tsx`

Blocos verticais:
1. **H1** (classe `laydesk2-hero-title` + `laydesk3-hero-h1`)
2. **Grid 2 colunas** (carousel à esquerda + texto/cards à direita)
3. **Métricas** (container `div.laydesk3-hero-metrics` com `mt-6 sm:mt-8 lg:mt-10`)

Observação: apesar do nome `laydesk3-hero-section`, essa classe está presente no Hero em todos layouts; a separação real vem do **media query**.

---

## Mudanças propostas (somente laydesk2)

### Arquivo alvo
- `app/globals.css`

### Media query alvo (laydesk2 real)

Usar o bloco já existente:

```css
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* ajustes laydesk2 aqui */
}
```

> Esse range foi calibrado para o seu ambiente (innerHeight 599 em 1366×768 real).

---

## Implementação proposta (CSS)

### 1) Compensar header fixed (resolver “título embaixo do menu”)

Adicionar no **laydesk2**:
- `main { padding-top: 4rem !important; }`
- `html { scroll-padding-top: 4rem; }`
- `section[id] { scroll-margin-top: 4rem; }`

**E** padronizar a altura do Hero para “1 tela − menu”:
- `.laydesk3-hero-section { height: calc(100svh - 4rem) }`

### 2) Cortar paddings verticais gigantes do Tailwind no Hero (sem mudar o “original”)

No laydesk2, zerar os paddings do `section` que vêm do Tailwind (`pt-20`, `pb-8`):
- `.laydesk3-hero-section { padding-top: 0; padding-bottom: 0; }`

Depois, controlar o espaçamento com padding menor no **container interno** (o 1º `div` dentro da section):
- `.laydesk3-hero-section > div { padding-top: 0.75rem; padding-bottom: 0.75rem; }`

### 3) Orçamento do conteúdo (reduzir gaps/margens para caber em 535px)

Regras recomendadas:
- **H1**:
  - reduzir `margin-bottom` para `0.5rem`
  - manter `line-height` por volta de `1.05–1.1` (evitar “comer” altura)
- **Grid 2 colunas**:
  - `gap` ~ `0.75rem` (12px)
  - `align-items: center`
  - `grid-template-columns: 1.15fr 0.85fr` (dar mais espaço ao carousel sem estourar altura)
- **Caixa do texto** (direita):
  - reduzir padding interno para `0.75rem`
- **Métricas**:
  - reduzir `margin-top` para `0.5rem`–`0.75rem`
  - reduzir padding dos cards para `0.5rem`–`0.75rem`
  - reduzir tipografia das labels (ex.: `0.65rem`)

### CSS completo (pronto para colar dentro do laydesk2)

```css
/* ============================================
   SEÇÃO 1 (Hero) — Ajuste oficial laydesk2
   Base: 1366×768 real @100% → innerHeight ≈ 599
   Área útil = innerHeight - header(64px) ≈ 535px
   ============================================ */

@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* 1) Compensar header fixed */
  main {
    padding-top: 4rem !important; /* 64px */
  }
  html {
    scroll-padding-top: 4rem;
  }
  section[id] {
    scroll-margin-top: 4rem;
  }

  /* 2) Hero = 1 tela - menu */
  .laydesk3-hero-section {
    height: calc(100svh - 4rem) !important;
    min-height: calc(100svh - 4rem) !important;
    max-height: calc(100svh - 4rem) !important;
    overflow: hidden !important;
    padding-top: 0 !important;   /* remove pt-20 do Tailwind */
    padding-bottom: 0 !important;/* remove pb-8 do Tailwind */
  }

  /* Container interno do Hero (1º div dentro da section) */
  .laydesk3-hero-section > div {
    height: 100% !important;
    min-height: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }

  /* 3) Título: garantir visibilidade + economizar altura */
  h1.laydesk2-hero-title {
    margin-top: 0 !important;
    margin-bottom: 0.5rem !important;
    line-height: 1.08 !important;
  }

  /* 4) Grid principal (carousel + texto) */
  .laydesk3-hero-section .grid-cols-1.md\\:grid-cols-2 {
    flex: 1 1 auto !important;
    min-height: 0 !important;
    align-items: center !important;
    gap: 0.75rem !important;
    grid-template-columns: 1.15fr 0.85fr !important;
  }

  /* Coluna direita: reduzir gap (texto + 3 cards) */
  .laydesk3-hero-section .grid-cols-1.md\\:grid-cols-2 > div:last-child {
    gap: 0.75rem !important;
  }

  /* Caixa do texto (primeiro bloco da coluna direita) */
  .laydesk3-hero-section .grid-cols-1.md\\:grid-cols-2 > div:last-child > div:first-child {
    padding: 0.75rem !important; /* reduz p-2..p-5 */
  }

  /* 5) Métricas: caber sem cortar */
  .laydesk3-hero-metrics {
    margin-top: 0.75rem !important; /* reduz mt-6..mt-10 */
    gap: 0.75rem !important;       /* reduz md:gap-4 lg:gap-5 */
  }
  .laydesk3-hero-metrics > div {
    padding: 0.5rem !important;    /* reduz p-2..p-4 */
    gap: 0.35rem !important;       /* reduz gap interno */
  }
  .laydesk3-hero-metrics > div > div:first-child {
    font-size: 1.1rem !important;  /* reduz text-lg..text-4xl */
    line-height: 1.1 !important;
  }
  .laydesk3-hero-metrics > div > div:last-child {
    font-size: 0.65rem !important; /* reduz label */
    line-height: 1 !important;
  }
}
```

---

## Por que esses valores “fecham a conta” (rápido)

Área útil ≈ **535px**.

Com o CSS acima, a seção fica:
- padding interno (top+bottom) ≈ 24px
- H1 + margin ≈ 45–60px (dependendo da fonte)
- métricas (3 cards compactos) ≈ 90–120px
- sobra para o grid principal ≈ 535 − (24 + 55 + 110) ≈ **346px**

Isso é suficiente para:
- carousel (aspect ratio atual + max-width natural)
- bloco de texto + 3 cards, com gaps reduzidos

---

## Checklist de validação (obrigatório)

Em **1366×768 @100%** (innerHeight ~599):
- [ ] H1 aparece completamente e não fica atrás do menu
- [ ] Hero ocupa **exatamente** a área abaixo do header (sem “sobrar” e sem “cortar”)
- [ ] Nenhum scroll/overflow no Hero
- [ ] Carousel visível (sem colapsar)
- [ ] Métricas totalmente visíveis (sem cortar a base)

Não-regressão:
- [ ] laydesk1 sem mudanças
- [ ] laydesk3 sem mudanças
- [ ] mobile sem mudanças


