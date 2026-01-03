# 07 — Hero (Seção 1) — Ajustes finos (laydesk2) + Clareza de classes + Cards (documentação)

## Objetivo

Aplicar ajustes **exclusivos no laydesk2** para:
1. **Clareza**: remover a confusão da classe `laydesk3-hero-section` sendo usada em regras do laydesk2 (sem alterar outros layouts).
2. **Alinhamento**: aproximar e centralizar horizontalmente **imagem (slideshow à esquerda)** e **conteúdo (coluna direita)** sem mudar o “tamanho perfeito” atual da imagem.
3. **Cards da direita**: criar “controles” (CSS) para ajustar:
   - tamanho da fonte
   - padding do card
   - line-height
   - espaçamento entre cards
   - espaçamento ícone↔texto

> **Importante:** este documento **não implementa nada**. É apenas guia para aplicar depois.

---

## 1) Por que aparece `laydesk3-hero-section` dentro do laydesk2?

Hoje, no componente `Hero`, a `<section>` do Hero usa a classe `laydesk3-hero-section` (nome infeliz), mas ela **não significa “laydesk3”** de fato — é só um **hook de CSS** que está presente em todos layouts.

O que define se a regra vale para laydesk2 é **o media query**, por exemplo:

- laydesk2: `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)`
- laydesk3: `@media (min-width: 1024px) and (max-height: 579px)`

### Ajuste recomendado (para não confundir mais)

Quando você autorizar, a forma “correta” é renomear/normalizar:

- **Adicionar** uma classe neutra no Hero, ex.: `hero-section` no `<section>`
- (Opcional) manter `laydesk3-hero-section` por compatibilidade temporária
- Migrar o CSS para usar `.hero-section` e só depois remover o nome antigo

**Vantagem:** o CSS fica legível e ninguém acha que o laydesk2 “está usando laydesk3”.

---

## 2) Aproximar e centralizar imagem + conteúdo (laydesk2)

Você mostrou que o HTML é essencialmente:

- Grid 2 colunas:
  - coluna esquerda: `[aria-roledescription="carousel"]`
  - coluna direita: `div.self-start.flex.flex-col ...`

### Problema percebido

- Há um “vão” grande entre a imagem e o conteúdo.
- Você quer **manter o tamanho atual** da imagem, mas fazer os dois blocos ficarem **mais próximos** e **centralizados horizontalmente** como um conjunto.

### Estratégia (laydesk2-only)

No laydesk2, atuar em 3 pontos:

1) **Grid**: reduzir `gap` e centralizar o conjunto (`justify-content`/`justify-items`).
2) **Coluna direita**: remover o `self-start` (via CSS) para ela alinhar no centro vertical do grid.
3) **Wrapper do slideshow**: garantir que ele fique com `margin: 0` (ou centralizado) sem empurrar o layout.

### CSS proposto (somente laydesk2)

Colar dentro do media query do laydesk2:

```css
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* +++INICIO SECAO HERO+++ */

  /* (A) Grid principal (imagem + conteúdo): aproximar e centralizar */
  .laydesk3-hero-section .grid-cols-1.md\\:grid-cols-2 {
    column-gap: 0.5rem !important; /* distância entre imagem e conteúdo (antes: 0.75rem) */
    justify-content: center !important; /* centraliza as colunas dentro do container */
    justify-items: center !important;   /* centraliza itens do grid */
  }

  /* (B) Coluna direita: tirar o "self-start" para não ficar "colada no topo" */
  .laydesk3-hero-section .grid-cols-1.md\\:grid-cols-2 > div:last-child {
    align-self: center !important; /* substitui o self-start do Tailwind */
  }

  /* (C) Coluna esquerda (carousel): garantir alinhamento central */
  .laydesk3-hero-section [aria-roledescription="carousel"] {
    justify-self: center !important;
  }

  /* (D) Ajuste fino: caso o wrapper do slideshow esteja criando margem lateral */
  .laydesk3-hero-section [aria-roledescription="carousel"] > div {
    margin-left: 0 !important;  /* se você quiser colar mais no conteúdo */
    margin-right: 0 !important; /* idem */
  }

  /* +++FIM SECAO HERO+++ */
}
```

> Observação: o item (D) só é necessário se você realmente quiser “encostar mais”.
> Se quiser manter centralizado com margens automáticas, deixe como está.

---

## 3) Cards da coluna direita (controles de padding/font/gaps) — laydesk2

### Estrutura

Na coluna direita do Hero:
- o 1º bloco é a **caixa de texto** (`rounded-2xl ... bg-coffee-card ...`)
- os 3 blocos seguintes são os **cards** (`w-full max-w-full overflow-hidden rounded-xl ...`)

### Estratégia de seletor (sem alterar JSX)

Vamos mirar **“todos os filhos da coluna direita, exceto o primeiro”**:

```css
.laydesk3-hero-section .grid-cols-1.md\\:grid-cols-2 > div:last-child > *:not(:first-child)
```

### CSS proposto (somente laydesk2)

```css
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* +++INICIO SECAO HERO / CARDS+++ */

  /* (1) Espaçamento entre cards (distância entre cada div card) */
  .laydesk3-hero-section .grid-cols-1.md\\:grid-cols-2 > div:last-child {
    gap: 0.5rem !important; /* controla a distância entre texto + cards */
  }

  /* (2) Card: padding geral (mexe no tamanho do card) */
  .laydesk3-hero-section .grid-cols-1.md\\:grid-cols-2 > div:last-child > *:not(:first-child) {
    /* padding do "card" (wrapper) */
    padding: 0 !important; /* o padding real está no div interno (abaixo); manter 0 aqui */
  }

  /* (3) Card: padding interno (onde fica ícone + texto) */
  .laydesk3-hero-section
    .grid-cols-1.md\\:grid-cols-2
    > div:last-child
    > *:not(:first-child)
    > div {
    padding-left: 0.75rem !important;  /* px (antes: px-2.5 / sm:px-3) */
    padding-right: 0.75rem !important; /* px */
    padding-top: 0.5rem !important;    /* py */
    padding-bottom: 0.5rem !important; /* py */
    gap: 0.5rem !important;            /* distância ícone ↔ texto */
  }

  /* (4) Texto do card (fonte + line-height) */
  .laydesk3-hero-section
    .grid-cols-1.md\\:grid-cols-2
    > div:last-child
    > *:not(:first-child)
    > div
    > span:last-child {
    font-size: 0.75rem !important; /* tamanho da fonte */
    line-height: 1.1 !important;   /* distância entre linhas */
  }

  /* (5) Ícone do card (tamanho) */
  .laydesk3-hero-section
    .grid-cols-1.md\\:grid-cols-2
    > div:last-child
    > *:not(:first-child)
    svg {
    width: 16px !important;
    height: 16px !important;
  }

  /* +++FIM SECAO HERO / CARDS+++ */
}
```

---

## Checklist de validação (laydesk2)

Em 1366×768 @100% (innerHeight ~599):
- [ ] imagem mantém o tamanho atual
- [ ] imagem + conteúdo ficam mais próximos
- [ ] conjunto (imagem + conteúdo) fica centralizado horizontalmente
- [ ] cards com tamanho/padding/font exatamente como desejado
- [ ] zero overflow na seção (a regra “1 tela − menu” continua)


