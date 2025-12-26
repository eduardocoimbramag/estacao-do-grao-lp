# Correção de Responsividade — Seção "Nossos Serviços" (laydesk2)

## Objetivo

Este documento descreve as correções necessárias para resolver problemas de **overflow** e **conteúdo muito grande** na seção "Nossos Serviços" especificamente para o layout **laydesk2** (resolução 1368×768).

**Importante:** Todas as alterações devem ser aplicadas **exclusivamente** no `laydesk2`, sem modificar outros layouts (laydesk1, laydesk3, laymob1, laymob2).

---

## Problemas Identificados

1. **Overflow vertical:** A seção usa `h-[calc(100vh-4rem)]` que pode causar overflow em telas com altura reduzida (768px)
2. **Conteúdo muito grande:** Tamanhos de fonte, espaçamentos e paddings são grandes demais para a resolução 1368×768
3. **Espaçamentos excessivos:** Margins e paddings ocupam muito espaço vertical

---

## Estrutura da Seção

A seção "Nossos Serviços" está localizada em:
- **Arquivo principal:** `app/page.tsx` (linhas 18-38)
- **Componente do carrossel:** `components/sections/services-carousel.tsx`

### Elementos que precisam de ajuste:

1. **Section container** (`app/page.tsx` linha 19-21)
2. **Container interno** (linha 23)
3. **Header da seção** (linha 25)
4. **Título h2** (linha 26)
5. **Parágrafo** (linha 29)
6. **Carrossel container** (`services-carousel.tsx` linha 85)
7. **Cards do carrossel** (linha 93-176)
8. **Imagens dos cards** (linha 116)
9. **Textos dos cards** (linha 128-174)

---

## Implementação Proposta

### Localização no CSS

Todas as regras devem ser adicionadas no bloco `laydesk2` em `app/globals.css`, dentro da media query:

```css
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  /* Regras aqui */
}
```

---

## 1. Ajustes na Section Principal

### Problema
A seção usa `h-[calc(100vh-4rem)]` que força altura fixa, causando overflow.

### Solução
Adicionar classe `laydesk2-servicos-section` e ajustar altura:

```css
/* app/globals.css - dentro do bloco laydesk2 */

/* Section: Remover altura fixa e usar min-height */
.laydesk2-servicos-section {
  min-height: auto !important;
  height: auto !important;
  padding-top: 2rem !important;
  padding-bottom: 2rem !important;
}
```

**Aplicar no componente:**
```tsx
// app/page.tsx - linha 19
<section
  id="nossos-servicos"
  className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] flex flex-col justify-center bg-coffee-700/50 overflow-x-hidden w-full laydesk2-servicos-section"
>
```

---

## 2. Ajustes no Container Interno

### Problema
Padding vertical (`py-4 sm:py-3 lg:py-4`) e horizontal (`px-2.5 sm:px-4 md:px-6 lg:px-8`) são grandes demais.

### Solução
Reduzir padding vertical e horizontal:

```css
/* Container interno: Reduzir padding */
.laydesk2-servicos-container {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}
```

**Aplicar no componente:**
```tsx
// app/page.tsx - linha 23
<div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-3 lg:py-4 box-border laydesk2-servicos-container">
```

---

## 3. Ajustes no Header da Seção

### Problema
Margin-bottom (`mb-8 sm:mb-6`) e espaçamento vertical (`space-y-3`) são excessivos.

### Solução
Reduzir espaçamentos:

```css
/* Header: Reduzir margin-bottom e espaçamento vertical */
.laydesk2-servicos-header {
  margin-bottom: 1.5rem !important;
}

.laydesk2-servicos-header > * + * {
  margin-top: 0.75rem !important;
}
```

**Aplicar no componente:**
```tsx
// app/page.tsx - linha 25
<header className="mb-8 sm:mb-6 text-center space-y-3 laydesk2-servicos-header">
```

---

## 4. Ajustes no Título (h2)

### Problema
Tamanho de fonte (`text-2xl sm:text-3xl lg:text-4xl`) é grande demais.

### Solução
Reduzir tamanho da fonte:

```css
/* Título: Reduzir tamanho da fonte */
.laydesk2-servicos-title {
  font-size: 1.5rem !important; /* equivalente a text-2xl */
  line-height: 1.75rem !important;
}
```

**Aplicar no componente:**
```tsx
// app/page.tsx - linha 26
<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cream-50 font-montserrat laydesk2-servicos-title">
```

---

## 5. Ajustes no Parágrafo

### Problema
Tamanho de fonte (`text-sm sm:text-base`) pode ser reduzido.

### Solução
Manter ou reduzir ligeiramente:

```css
/* Parágrafo: Reduzir tamanho da fonte */
.laydesk2-servicos-description {
  font-size: 0.875rem !important; /* equivalente a text-sm */
  line-height: 1.25rem !important;
}
```

**Aplicar no componente:**
```tsx
// app/page.tsx - linha 29
<p className="text-sm sm:text-base text-cream-50/80 max-w-2xl mx-auto font-montserrat laydesk2-servicos-description">
```

---

## 6. Ajustes no Container do Carrossel

### Problema
Padding vertical (`py-2 sm:py-6`) é grande demais.

### Solução
Reduzir padding vertical:

```css
/* Container do carrossel: Reduzir padding vertical */
.laydesk2-servicos-carousel-container {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/sections/services-carousel.tsx - linha 85
<div className="overflow-hidden cursor-grab active:cursor-grabbing py-2 sm:py-6 w-full max-w-[100vw] laydesk2-servicos-carousel-container" ref={emblaRef}>
```

---

## 7. Ajustes nos Cards do Carrossel

### Problema
Padding horizontal (`px-3 sm:px-3 md:px-4`) e espaçamentos internos são grandes.

### Solução
Reduzir padding dos cards:

```css
/* Cards: Reduzir padding horizontal */
.laydesk2-servicos-card {
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/sections/services-carousel.tsx - linha 93
<article
  key={`${card.id}-${index}`}
  className="
    min-w-[60vw] sm:min-w-[70%] md:min-w-[45%] lg:min-w-[33.333%]
    max-w-[60vw] sm:max-w-none
    px-3 sm:px-3 md:px-4
    box-border
    laydesk2-servicos-card
  "
>
```

---

## 8. Ajustes nas Imagens dos Cards

### Problema
Altura das imagens (`h-32 sm:h-40`) e padding do container (`p-4 sm:p-5`) são grandes.

### Solução
Reduzir altura das imagens e padding:

```css
/* Container da imagem: Reduzir padding */
.laydesk2-servicos-image-container {
  padding: 0.75rem !important;
}

/* Imagem: Reduzir altura */
.laydesk2-servicos-image {
  height: 6rem !important; /* equivalente a h-24 */
}
```

**Aplicar no componente:**
```tsx
// components/sections/services-carousel.tsx - linha 115
<div className="relative flex items-center justify-center p-4 sm:p-5 laydesk2-servicos-image-container">
  <div className="relative h-32 sm:h-40 w-full rounded-lg overflow-hidden laydesk2-servicos-image">
```

---

## 9. Ajustes nos Textos dos Cards

### Problema
Tamanhos de fonte e espaçamentos são grandes:
- Título: `text-lg sm:text-xl`
- Subtítulo: `text-xs sm:text-sm`
- Descrição: `text-xs sm:text-sm`
- Espaçamento: `space-y-2`, `px-4 pb-4`

### Solução
Reduzir tamanhos e espaçamentos:

```css
/* Container de texto: Reduzir padding e espaçamento */
.laydesk2-servicos-card-content {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
  padding-bottom: 0.75rem !important;
  gap: 0.5rem !important;
}

/* Título do card: Reduzir tamanho */
.laydesk2-servicos-card-title {
  font-size: 1rem !important; /* equivalente a text-base */
  line-height: 1.5rem !important;
}

/* Subtítulo do card: Reduzir tamanho */
.laydesk2-servicos-card-subtitle {
  font-size: 0.75rem !important; /* equivalente a text-xs */
  line-height: 1rem !important;
}

/* Descrição do card: Reduzir tamanho */
.laydesk2-servicos-card-description {
  font-size: 0.75rem !important; /* equivalente a text-xs */
  line-height: 1.125rem !important;
}

/* CTA Button: Reduzir padding */
.laydesk2-servicos-card-cta {
  padding-top: 0.5rem !important;
}

.laydesk2-servicos-card-cta a {
  padding: 0.375rem 1rem !important;
  font-size: 0.75rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/sections/services-carousel.tsx - linha 128
<div className="space-y-2 px-4 pb-4 text-center laydesk2-servicos-card-content">
  <h3 className="text-lg sm:text-xl font-semibold text-cream-50 font-montserrat laydesk2-servicos-card-title">
  
  {/* linha 136 */}
  <p className="text-xs sm:text-sm font-medium text-coffee-500 font-montserrat laydesk2-servicos-card-subtitle">
  
  {/* linha 143 */}
  <p className="text-xs sm:text-sm text-cream-50/80 leading-relaxed font-montserrat laydesk2-servicos-card-description">
  
  {/* linha 157 */}
  <div className="pt-3 laydesk2-servicos-card-cta">
```

---

## 10. Ajustes nos Botões de Navegação (Desktop)

### Problema
Margin-top (`mt-3`) e tamanhos dos botões podem ser reduzidos.

### Solução
Reduzir espaçamento:

```css
/* Botões de navegação: Reduzir margin-top */
.laydesk2-servicos-nav {
  margin-top: 0.5rem !important;
}

/* Botões: Reduzir tamanho */
.laydesk2-servicos-nav button {
  padding: 0.5rem !important;
}

.laydesk2-servicos-nav svg {
  width: 16px !important;
  height: 16px !important;
}
```

**Aplicar no componente:**
```tsx
// components/sections/services-carousel.tsx - linha 183
<div className="hidden lg:flex justify-center items-center gap-4 mt-3 laydesk2-servicos-nav">
```

---

## 11. Ajustes nos Indicadores Mobile

### Problema
Margin-top (`mt-6`) é grande demais.

### Solução
Reduzir margin-top:

```css
/* Indicadores mobile: Reduzir margin-top */
.laydesk2-servicos-indicators {
  margin-top: 1rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/sections/services-carousel.tsx - linha 256
<div className="flex lg:hidden justify-center gap-3 mt-6 laydesk2-servicos-indicators">
```

---

## Resumo das Classes CSS

Todas as classes devem ser adicionadas no bloco `laydesk2` em `app/globals.css`:

```css
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  /* 1. Section */
  .laydesk2-servicos-section { }
  
  /* 2. Container */
  .laydesk2-servicos-container { }
  
  /* 3. Header */
  .laydesk2-servicos-header { }
  
  /* 4. Título */
  .laydesk2-servicos-title { }
  
  /* 5. Parágrafo */
  .laydesk2-servicos-description { }
  
  /* 6. Container do carrossel */
  .laydesk2-servicos-carousel-container { }
  
  /* 7. Cards */
  .laydesk2-servicos-card { }
  
  /* 8. Imagens */
  .laydesk2-servicos-image-container { }
  .laydesk2-servicos-image { }
  
  /* 9. Textos dos cards */
  .laydesk2-servicos-card-content { }
  .laydesk2-servicos-card-title { }
  .laydesk2-servicos-card-subtitle { }
  .laydesk2-servicos-card-description { }
  .laydesk2-servicos-card-cta { }
  
  /* 10. Navegação */
  .laydesk2-servicos-nav { }
  
  /* 11. Indicadores */
  .laydesk2-servicos-indicators { }
}
```

---

## Checklist de Implementação

Antes de implementar, verifique:

- [ ] Todas as classes CSS estão dentro do bloco `laydesk2` em `app/globals.css`
- [ ] Todas as classes foram adicionadas nos componentes correspondentes
- [ ] Nenhuma alteração foi feita em outros layouts
- [ ] Testado em resolução 1368×768
- [ ] Verificado que não há overflow vertical
- [ ] Verificado que o conteúdo está proporcionalmente reduzido
- [ ] Testado que outros layouts (laydesk1, laydesk3, mobile) não foram afetados

---

## Ordem de Implementação Recomendada

1. **Primeiro:** Ajustar a section e container (itens 1-2) para resolver overflow
2. **Segundo:** Ajustar header e textos (itens 3-5) para reduzir altura
3. **Terceiro:** Ajustar carrossel e cards (itens 6-9) para reduzir conteúdo
4. **Quarto:** Ajustar navegação e indicadores (itens 10-11) para finalizar

---

## Notas Importantes

1. **Especificidade:** Use `!important` quando necessário para sobrescrever classes Tailwind
2. **Teste incremental:** Implemente e teste cada grupo de ajustes antes de continuar
3. **Valores:** Os valores sugeridos são estimativas. Ajuste conforme necessário após testes
4. **Mobile-first:** Lembre-se que o projeto é mobile-first. As classes base são para mobile, então os ajustes do laydesk2 sobrescrevem apenas nessa resolução específica

---

## Referências

- **Documentação de layouts:** `docs/03-LAYOUTS.md`
- **Arquivo principal de estilos:** `app/globals.css`
- **Seção "Nossos Serviços":** `app/page.tsx` (linhas 18-38)
- **Componente do carrossel:** `components/sections/services-carousel.tsx`

