# Documentação: Otimização Mobile da Seção Hero

## ⚠️ AVISO IMPORTANTE

Esta implementação otimiza completamente a experiência mobile da seção Hero (primeira seção do site), adaptando espaçamentos, tipografia, layout, carrossel e interações para dispositivos móveis, garantindo uma experiência excelente em celulares.

---

## 📋 Objetivo

Adaptar a seção Hero para oferecer uma experiência excelente em dispositivos móveis, garantindo que:

1. ✅ O conteúdo seja legível e acessível em telas pequenas
2. ✅ Os espaçamentos sejam adequados para mobile
3. ✅ A tipografia seja otimizada para leitura em celular
4. ✅ O carrossel de imagens funcione perfeitamente em mobile
5. ✅ Os cards de features sejam bem dimensionados
6. ✅ A seção não use `h-screen` em mobile (permitir scroll natural)
7. ✅ O layout seja intuitivo e não sobrecarregue a tela
8. ✅ A experiência seja fluida e agradável
9. ✅ O título não cause overflow horizontal
10. ✅ As métricas sejam bem apresentadas em mobile

---

## 🔍 Análise do Problema Atual

### Estrutura Atual

```tsx
<section className="relative h-screen flex flex-col justify-center bg-[#452911]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
    <h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-4 md:mb-5 lg:mb-6 uppercase whitespace-nowrap !text-[clamp(2.5rem,2.5vw,3rem)]">
      Café Gourmet e Baristas para Eventos
    </h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-7 items-end">
      {/* Slideshow */}
      <div className="relative min-w-0">
        {/* Carrossel de imagens */}
      </div>
      
      {/* Texto + Cards compactos */}
      <div className="self-start flex flex-col max-w-full gap-4 md:gap-5 w-full">
        {/* Texto */}
        <div className="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-card p-4 md:p-4 lg:p-5 shadow-2xl w-full">
          <p className="text-cream-50 text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-6 hyphens-none md:max-w-none">
            {/* Texto descritivo */}
          </p>
        </div>
        
        {/* Cards compactos */}
        <FeatureItemCompact />
      </div>
    </div>
    
    {/* Grid de Métricas */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mt-8 lg:mt-10">
      {/* Cards de métricas */}
    </div>
  </div>
</section>
```

### Problemas Identificados em Mobile

#### 1. **Altura Fixa (`h-screen`) em Mobile**
- **Problema:** `h-screen` força a seção a ter exatamente 100vh, mesmo que o conteúdo seja maior
- **Impacto:** Em mobile, o conteúdo pode ser cortado ou forçar scroll horizontal
- **Solução:** Usar `h-screen` apenas em desktop (`lg:h-screen`), permitir altura natural em mobile

#### 2. **Título com `whitespace-nowrap`**
- **Problema:** `whitespace-nowrap` impede quebra de linha, causando overflow horizontal em telas pequenas
- **Impacto:** Título pode sair da tela ou causar scroll horizontal
- **Solução:** Remover `whitespace-nowrap` em mobile, permitir quebra de linha

#### 3. **Título com Clamp Muito Grande**
- **Problema:** `!text-[clamp(2.5rem,2.5vw,3rem)]` pode ser grande demais em mobile (40px mínimo)
- **Impacto:** Título ocupa muito espaço vertical em mobile
- **Solução:** Ajustar clamp para valores menores em mobile

#### 4. **Grid com `items-end`**
- **Problema:** `items-end` alinha itens pela base, pode não funcionar bem em mobile com conteúdo empilhado
- **Impacto:** Layout pode ficar desalinhado em mobile
- **Solução:** Usar `items-start` em mobile, `items-end` apenas em desktop

#### 5. **Slideshow com Aspect Ratio Grande**
- **Problema:** `aspect-[4/3.5]` pode ser grande demais em mobile, ocupando muito espaço vertical
- **Impacto:** Slideshow domina a tela em mobile
- **Solução:** Usar aspect ratio menor em mobile

#### 6. **Controles do Carrossel Muito Grandes**
- **Problema:** Botões com `h-10 w-10 md:h-11 md:w-11` podem ser grandes demais em mobile
- **Impacto:** Controles ocupam muito espaço e podem atrapalhar visualização
- **Solução:** Reduzir tamanho dos controles em mobile

#### 7. **Espaçamentos Muito Grandes**
- **Problema:** `gap-4 md:gap-5 lg:gap-6 xl:gap-7`, `mb-4 md:mb-5 lg:mb-6`, `mt-8 lg:mt-10` podem ser grandes em mobile
- **Impacto:** Muito espaço desperdiçado em telas pequenas
- **Solução:** Reduzir espaçamentos em mobile, aumentar progressivamente

#### 8. **Texto com Indentação Grande**
- **Problema:** `indent-6` (24px) pode ser grande demais em mobile
- **Impacto:** Indentação ocupa espaço horizontal precioso
- **Solução:** Reduzir ou remover indentação em mobile

#### 9. **Cards de Métricas com Padding Grande**
- **Problema:** `p-3 md:p-4` pode ser grande em mobile
- **Impacto:** Cards ocupam muito espaço vertical
- **Solução:** Reduzir padding em mobile

#### 10. **Grid de Métricas com Gap Grande**
- **Problema:** `gap-4 lg:gap-5` pode ser grande em mobile
- **Impacto:** Espaçamento excessivo entre cards
- **Solução:** Reduzir gap em mobile

---

## 🎯 Estratégia Proposta

### Princípios

1. **Mobile-First com Breakpoints Progressivos:**
   - Mobile (< 640px): Layout compacto, espaçamentos reduzidos
   - Tablet (640px - 1024px): Espaçamentos moderados
   - Desktop (≥ 1024px): Layout atual (já está bom)

2. **Altura Adaptativa:**
   - Mobile: Altura natural (sem `h-screen`), permitir scroll
   - Desktop: `h-screen` para centralização vertical

3. **Espaçamentos Responsivos:**
   - Mobile: Espaçamentos menores (ex: `mb-3`, `gap-3`, `py-6`)
   - Tablet: Espaçamentos moderados (ex: `mb-4`, `gap-4`, `py-8`)
   - Desktop: Espaçamentos maiores (ex: `mb-6`, `gap-6`, `py-8`)

4. **Tipografia Responsiva:**
   - Mobile: Tamanhos adequados para leitura (ex: `text-sm`, `text-lg`)
   - Desktop: Tamanhos maiores (ex: `text-base`, `text-xl`)

5. **Carrossel Otimizado:**
   - Mobile: Aspect ratio menor, controles menores
   - Desktop: Aspect ratio maior, controles maiores

6. **Título Responsivo:**
   - Mobile: Permitir quebra de linha, tamanho menor
   - Desktop: Linha única, tamanho maior

---

## 📊 Análise Detalhada e Propostas

### 1. Container Principal da Seção

#### Estado Atual

```tsx
<section className="relative h-screen flex flex-col justify-center bg-[#452911]">
```

**Problema:** `h-screen` força altura fixa em mobile, cortando conteúdo.

#### Proposta

```tsx
<section className="relative min-h-screen lg:h-screen flex flex-col justify-center bg-[#452911] py-8 sm:py-12 lg:py-0">
```

**Mudanças:**
- Remover `h-screen` em mobile, usar `min-h-screen` para garantir altura mínima
- Adicionar `lg:h-screen` para manter comportamento atual em desktop
- Adicionar `py-8 sm:py-12 lg:py-0` para padding vertical em mobile/tablet (remover em desktop onde flexbox centraliza)

**Justificativa:**
- `min-h-screen` garante que a seção tenha pelo menos 100vh, mas pode crescer se necessário
- `lg:h-screen` mantém comportamento atual em desktop
- Padding vertical em mobile/tablet garante espaçamento adequado do header fixo

---

### 2. Container Interno (max-w-7xl)

#### Estado Atual

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
```

**Problema:** Padding vertical pode ser ajustado para mobile.

#### Proposta

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
```

**Mudanças:**
- Mudar `py-4 sm:py-6 lg:py-8` para `py-3 sm:py-4 lg:py-6` (reduzir padding vertical em mobile)

**Justificativa:**
- Padding reduzido em mobile economiza espaço vertical
- Padding aumenta progressivamente em telas maiores

---

### 3. Título Principal (h1)

#### Estado Atual

```tsx
<h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-4 md:mb-5 lg:mb-6 uppercase whitespace-nowrap !text-[clamp(2.5rem,2.5vw,3rem)]">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Problema:** `whitespace-nowrap` causa overflow horizontal, clamp pode ser grande demais.

#### Proposta

```tsx
<h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 uppercase !text-[clamp(1.5rem,4vw,2.5rem)] sm:!text-[clamp(2rem,3vw,2.75rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)] sm:whitespace-nowrap">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Mudanças:**
- Remover `whitespace-nowrap` em mobile, adicionar `sm:whitespace-nowrap` (permitir quebra em mobile)
- Ajustar clamp: `!text-[clamp(1.5rem,4vw,2.5rem)]` em mobile (24px-40px), `sm:!text-[clamp(2rem,3vw,2.75rem)]` em tablet (32px-44px), `lg:!text-[clamp(2.5rem,2.5vw,3rem)]` em desktop (40px-48px)
- Mudar `mb-4 md:mb-5 lg:mb-6` para `mb-3 sm:mb-4 md:mb-5 lg:mb-6` (reduzir margin-bottom em mobile)

**Justificativa:**
- Quebra de linha em mobile previne overflow horizontal
- Clamp menor em mobile economiza espaço vertical
- Margin-bottom reduzido em mobile economiza espaço

---

### 4. Grid Principal (Slideshow + Texto/Cards)

#### Estado Atual

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-7 items-end">
```

**Problema:** `items-end` pode não funcionar bem em mobile, gaps podem ser grandes.

#### Proposta

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 items-start md:items-end">
```

**Mudanças:**
- Mudar `gap-4 md:gap-5 lg:gap-6 xl:gap-7` para `gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7` (reduzir gap em mobile)
- Mudar `items-end` para `items-start md:items-end` (alinhar ao topo em mobile, base em desktop)

**Justificativa:**
- Gap reduzido em mobile economiza espaço vertical
- Alinhamento ao topo em mobile funciona melhor com conteúdo empilhado

---

### 5. Container do Slideshow

#### Estado Atual

```tsx
<div className="relative min-w-0" role="region" aria-roledescription="carousel" aria-label="Galeria de fotos Estação do Grão" onKeyDown={handleKey} tabIndex={0} onMouseEnter={() => (hoverRef.current = true)} onMouseLeave={() => (hoverRef.current = false)}>
  <div className="overflow-hidden rounded-2xl ring-1 ring-cream-50/15 shadow-2xl" ref={emblaRef}>
    <div className="flex">
      {images.map((src, idx) => (
        <div className="relative min-w-0 flex-[0_0_100%]" key={idx}>
          <div className="relative aspect-[4/3.5] lg:aspect-[16/11] w-full overflow-hidden">
```

**Problema:** Aspect ratio `aspect-[4/3.5]` pode ser grande demais em mobile.

#### Proposta

```tsx
<div className="relative min-w-0" role="region" aria-roledescription="carousel" aria-label="Galeria de fotos Estação do Grão" onKeyDown={handleKey} tabIndex={0} onMouseEnter={() => (hoverRef.current = true)} onMouseLeave={() => (hoverRef.current = false)}>
  <div className="overflow-hidden rounded-2xl ring-1 ring-cream-50/15 shadow-2xl" ref={emblaRef}>
    <div className="flex">
      {images.map((src, idx) => (
        <div className="relative min-w-0 flex-[0_0_100%]" key={idx}>
          <div className="relative aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[16/11] w-full overflow-hidden">
```

**Mudanças:**
- Mudar `aspect-[4/3.5] lg:aspect-[16/11]` para `aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[16/11]` (aspect ratio menor em mobile)

**Justificativa:**
- Aspect ratio menor em mobile (`4/3` = 1.33) economiza espaço vertical comparado a `4/3.5` (1.14)
- Aspect ratio aumenta progressivamente em telas maiores

---

### 6. Controles do Carrossel

#### Estado Atual

```tsx
<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 pointer-events-none">
  <button
    type="button"
    onClick={() => emblaApi?.scrollPrev()}
    className="inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
    aria-label="Imagem anterior"
  >
    ‹
  </button>
  <button
    type="button"
    onClick={() => emblaApi?.scrollNext()}
    className="inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
    aria-label="Próxima imagem"
  >
    ›
  </button>
</div>
```

**Problema:** Botões com `h-10 w-10` podem ser grandes demais em mobile, `px-3` pode ser pequeno.

#### Proposta

```tsx
<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 sm:px-3 pointer-events-none">
  <button
    type="button"
    onClick={() => emblaApi?.scrollPrev()}
    className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-xl sm:text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
    aria-label="Imagem anterior"
  >
    ‹
  </button>
  <button
    type="button"
    onClick={() => emblaApi?.scrollNext()}
    className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-xl sm:text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
    aria-label="Próxima imagem"
  >
    ›
  </button>
</div>
```

**Mudanças:**
- Mudar `px-3` para `px-2 sm:px-3` (reduzir padding horizontal em mobile)
- Mudar `h-10 w-10 md:h-11 md:w-11` para `h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11` (botões menores em mobile)
- Mudar `text-2xl` para `text-xl sm:text-2xl` (ícone menor em mobile)

**Justificativa:**
- Botões menores em mobile ocupam menos espaço e não atrapalham visualização
- Padding reduzido em mobile aproxima botões das bordas
- Ícone menor mantém proporção com botão menor

---

### 7. Container de Texto e Cards

#### Estado Atual

```tsx
<div className="self-start flex flex-col max-w-full gap-4 md:gap-5 w-full">
```

**Problema:** `gap-4` pode ser grande em mobile.

#### Proposta

```tsx
<div className="self-start flex flex-col max-w-full gap-3 sm:gap-4 md:gap-5 w-full">
```

**Mudanças:**
- Mudar `gap-4 md:gap-5` para `gap-3 sm:gap-4 md:gap-5` (reduzir gap em mobile)

**Justificativa:**
- Gap reduzido em mobile economiza espaço vertical

---

### 8. Card de Texto Descritivo

#### Estado Atual

```tsx
<div className="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-card p-4 md:p-4 lg:p-5 shadow-2xl w-full">
  <p className="text-cream-50 text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-6 hyphens-none md:max-w-none">
    Transforme o café do seu evento em uma <span className="text-coffee-500 font-bold">experiência inesquecível</span>...
  </p>
</div>
```

**Problema:** `p-4` pode ser grande, `indent-6` (24px) pode ser grande demais em mobile.

#### Proposta

```tsx
<div className="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-card p-3 sm:p-4 lg:p-5 shadow-2xl w-full">
  <p className="text-cream-50 text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-3 sm:indent-4 md:indent-6 hyphens-none md:max-w-none">
    Transforme o café do seu evento em uma <span className="text-coffee-500 font-bold">experiência inesquecível</span>...
  </p>
</div>
```

**Mudanças:**
- Mudar `p-4 md:p-4 lg:p-5` para `p-3 sm:p-4 lg:p-5` (reduzir padding em mobile)
- Mudar `indent-6` para `indent-3 sm:indent-4 md:indent-6` (reduzir indentação em mobile)

**Justificativa:**
- Padding reduzido em mobile economiza espaço
- Indentação reduzida em mobile economiza espaço horizontal

---

### 9. Cards Compactos (FeatureItemCompact)

#### Estado Atual

```tsx
<div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-card hover:bg-coffee-700/40 transition-colors">
  <div className="flex items-center gap-2 px-3 py-2">
    <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
      {icon}
    </span>
    <span className="text-cream-50 font-semibold text-xs md:text-sm leading-none">
      {title}
    </span>
  </div>
</div>
```

**Problema:** `px-3 py-2` pode ser pequeno, `gap-2` pode ser pequeno, `text-xs` pode ser pequeno.

#### Proposta

```tsx
<div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-card hover:bg-coffee-700/40 transition-colors">
  <div className="flex items-center gap-2.5 sm:gap-2 px-3.5 sm:px-3 py-2.5 sm:py-2">
    <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
      {icon}
    </span>
    <span className="text-cream-50 font-semibold text-xs sm:text-xs md:text-sm leading-tight sm:leading-none">
      {title}
    </span>
  </div>
</div>
```

**Mudanças:**
- Mudar `gap-2` para `gap-2.5 sm:gap-2` (gap ligeiramente maior em mobile)
- Mudar `px-3` para `px-3.5 sm:px-3` (padding horizontal ligeiramente maior em mobile)
- Mudar `py-2` para `py-2.5 sm:py-2` (padding vertical ligeiramente maior em mobile)
- Mudar `leading-none` para `leading-tight sm:leading-none` (line-height melhor em mobile)

**Justificativa:**
- Padding e gap ligeiramente maiores em mobile melhoram legibilidade e área de toque
- Line-height melhor em mobile melhora legibilidade

---

### 10. Grid de Métricas

#### Estado Atual

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mt-8 lg:mt-10">
```

**Problema:** `gap-4` pode ser grande, `mt-8` pode ser grande.

#### Proposta

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mt-6 sm:mt-8 lg:mt-10">
```

**Mudanças:**
- Mudar `gap-4 lg:gap-5` para `gap-3 sm:gap-4 lg:gap-5` (reduzir gap em mobile)
- Mudar `mt-8 lg:mt-10` para `mt-6 sm:mt-8 lg:mt-10` (reduzir margin-top em mobile)

**Justificativa:**
- Gap e margin-top reduzidos em mobile economizam espaço vertical

---

### 11. Cards de Métricas

#### Estado Atual

```tsx
<div className="p-3 md:p-4 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-2">
  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500">
    + 100 mil
  </div>
  <div className="text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-2">
    <span>☕</span>
    <span>cafés servidos</span>
  </div>
</div>
```

**Problema:** `p-3` pode ser pequeno, `gap-2` pode ser pequeno, tamanhos de fonte podem ser ajustados.

#### Proposta

```tsx
<div className="p-3.5 sm:p-3 md:p-4 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-2.5 sm:gap-2">
  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500">
    + 100 mil
  </div>
  <div className="text-sm sm:text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-2">
    <span>☕</span>
    <span>cafés servidos</span>
  </div>
</div>
```

**Mudanças:**
- Mudar `p-3 md:p-4` para `p-3.5 sm:p-3 md:p-4` (padding ligeiramente maior em mobile)
- Mudar `gap-2` para `gap-2.5 sm:gap-2` (gap ligeiramente maior em mobile)
- Mudar `text-2xl md:text-3xl lg:text-4xl` para `text-xl sm:text-2xl md:text-3xl lg:text-4xl` (número menor em mobile)
- Mudar `text-base md:text-lg` para `text-sm sm:text-base md:text-lg` (texto menor em mobile)

**Justificativa:**
- Padding e gap ligeiramente maiores em mobile melhoram apresentação
- Tamanhos de fonte menores em mobile economizam espaço e mantêm hierarquia

---

## 📋 Checklist de Implementação

### Fase 1: Container Principal da Seção
- [ ] 1.1. Mudar `h-screen` para `min-h-screen lg:h-screen`
- [ ] 1.2. Adicionar `py-8 sm:py-12 lg:py-0` para padding vertical responsivo
- [ ] 1.3. Manter `flex flex-col justify-center` (centralização em desktop)
- [ ] 1.4. Manter `bg-[#452911]` (background)
- [ ] 1.5. Manter `relative` (posicionamento)

### Fase 2: Container Interno (max-w-7xl)
- [ ] 2.1. Mudar `py-4 sm:py-6 lg:py-8` para `py-3 sm:py-4 lg:py-6`
- [ ] 2.2. Manter `px-4 sm:px-6 lg:px-8` (padding horizontal)
- [ ] 2.3. Manter `max-w-7xl mx-auto` (container)

### Fase 3: Título Principal (h1)
- [ ] 3.1. Remover `whitespace-nowrap`, adicionar `sm:whitespace-nowrap`
- [ ] 3.2. Ajustar clamp: `!text-[clamp(1.5rem,4vw,2.5rem)] sm:!text-[clamp(2rem,3vw,2.75rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)]`
- [ ] 3.3. Mudar `mb-4 md:mb-5 lg:mb-6` para `mb-3 sm:mb-4 md:mb-5 lg:mb-6`
- [ ] 3.4. Manter `font-montserrat text-cream-50 font-bold tracking-tight text-center uppercase`

### Fase 4: Grid Principal
- [ ] 4.1. Mudar `gap-4 md:gap-5 lg:gap-6 xl:gap-7` para `gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7`
- [ ] 4.2. Mudar `items-end` para `items-start md:items-end`
- [ ] 4.3. Manter `grid-cols-1 md:grid-cols-2` (layout responsivo)

### Fase 5: Slideshow - Aspect Ratio
- [ ] 5.1. Mudar `aspect-[4/3.5] lg:aspect-[16/11]` para `aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[16/11]`
- [ ] 5.2. Manter estrutura do carrossel

### Fase 6: Controles do Carrossel
- [ ] 6.1. Mudar `px-3` para `px-2 sm:px-3`
- [ ] 6.2. Mudar `h-10 w-10 md:h-11 md:w-11` para `h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11`
- [ ] 6.3. Mudar `text-2xl` para `text-xl sm:text-2xl`
- [ ] 6.4. Aplicar em ambos os botões (anterior e próximo)

### Fase 7: Container de Texto e Cards
- [ ] 7.1. Mudar `gap-4 md:gap-5` para `gap-3 sm:gap-4 md:gap-5`
- [ ] 7.2. Manter `self-start flex flex-col max-w-full w-full`

### Fase 8: Card de Texto Descritivo
- [ ] 8.1. Mudar `p-4 md:p-4 lg:p-5` para `p-3 sm:p-4 lg:p-5`
- [ ] 8.2. Mudar `indent-6` para `indent-3 sm:indent-4 md:indent-6`
- [ ] 8.3. Manter `text-[clamp(0.875rem,0.3vw+0.85rem,1rem)]` (já está responsivo)

### Fase 9: Cards Compactos (FeatureItemCompact)
- [ ] 9.1. Mudar `gap-2` para `gap-2.5 sm:gap-2`
- [ ] 9.2. Mudar `px-3` para `px-3.5 sm:px-3`
- [ ] 9.3. Mudar `py-2` para `py-2.5 sm:py-2`
- [ ] 9.4. Mudar `leading-none` para `leading-tight sm:leading-none`
- [ ] 9.5. Aplicar em TODOS os cards (3 cards)

### Fase 10: Grid de Métricas
- [ ] 10.1. Mudar `gap-4 lg:gap-5` para `gap-3 sm:gap-4 lg:gap-5`
- [ ] 10.2. Mudar `mt-8 lg:mt-10` para `mt-6 sm:mt-8 lg:mt-10`
- [ ] 10.3. Manter `grid-cols-1 md:grid-cols-3` (layout responsivo)

### Fase 11: Cards de Métricas
- [ ] 11.1. Mudar `p-3 md:p-4` para `p-3.5 sm:p-3 md:p-4`
- [ ] 11.2. Mudar `gap-2` para `gap-2.5 sm:gap-2`
- [ ] 11.3. Mudar `text-2xl md:text-3xl lg:text-4xl` para `text-xl sm:text-2xl md:text-3xl lg:text-4xl`
- [ ] 11.4. Mudar `text-base md:text-lg` para `text-sm sm:text-base md:text-lg`
- [ ] 11.5. Aplicar em TODOS os cards (3 cards de métricas)

### Fase 12: Verificação Geral
- [ ] 12.1. Verificar que todas as mudanças foram aplicadas
- [ ] 12.2. Verificar que não há erros de sintaxe
- [ ] 12.3. Verificar que a estrutura HTML está correta
- [ ] 12.4. Verificar que todas as classes Tailwind são válidas
- [ ] 12.5. Verificar que o carrossel funciona corretamente
- [ ] 12.6. Verificar que o título não causa overflow horizontal

---

## 🔍 Código Completo das Mudanças

### 1. Container Principal da Seção

```tsx
// ANTES
<section className="relative h-screen flex flex-col justify-center bg-[#452911]">

// DEPOIS
<section className="relative min-h-screen lg:h-screen flex flex-col justify-center bg-[#452911] py-8 sm:py-12 lg:py-0">
```

### 2. Container Interno (max-w-7xl)

```tsx
// ANTES
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">

// DEPOIS
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
```

### 3. Título Principal (h1)

```tsx
// ANTES
<h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-4 md:mb-5 lg:mb-6 uppercase whitespace-nowrap !text-[clamp(2.5rem,2.5vw,3rem)]">
  Café Gourmet e Baristas para Eventos
</h1>

// DEPOIS
<h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 uppercase !text-[clamp(1.5rem,4vw,2.5rem)] sm:!text-[clamp(2rem,3vw,2.75rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)] sm:whitespace-nowrap">
  Café Gourmet e Baristas para Eventos
</h1>
```

### 4. Grid Principal

```tsx
// ANTES
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 xl:gap-7 items-end">

// DEPOIS
<div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 items-start md:items-end">
```

### 5. Slideshow - Aspect Ratio

```tsx
// ANTES
<div className="relative aspect-[4/3.5] lg:aspect-[16/11] w-full overflow-hidden">

// DEPOIS
<div className="relative aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[16/11] w-full overflow-hidden">
```

### 6. Controles do Carrossel

```tsx
// ANTES
<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 pointer-events-none">
  <button
    type="button"
    onClick={() => emblaApi?.scrollPrev()}
    className="inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
    aria-label="Imagem anterior"
  >
    ‹
  </button>
  <button
    type="button"
    onClick={() => emblaApi?.scrollNext()}
    className="inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
    aria-label="Próxima imagem"
  >
    ›
  </button>
</div>

// DEPOIS
<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 sm:px-3 pointer-events-none">
  <button
    type="button"
    onClick={() => emblaApi?.scrollPrev()}
    className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-xl sm:text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
    aria-label="Imagem anterior"
  >
    ‹
  </button>
  <button
    type="button"
    onClick={() => emblaApi?.scrollNext()}
    className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-xl sm:text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
    aria-label="Próxima imagem"
  >
    ›
  </button>
</div>
```

### 7. Container de Texto e Cards

```tsx
// ANTES
<div className="self-start flex flex-col max-w-full gap-4 md:gap-5 w-full">

// DEPOIS
<div className="self-start flex flex-col max-w-full gap-3 sm:gap-4 md:gap-5 w-full">
```

### 8. Card de Texto Descritivo

```tsx
// ANTES
<div className="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-card p-4 md:p-4 lg:p-5 shadow-2xl w-full">
  <p className="text-cream-50 text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-6 hyphens-none md:max-w-none">
    Transforme o café do seu evento em uma <span className="text-coffee-500 font-bold">experiência inesquecível</span>...
  </p>
</div>

// DEPOIS
<div className="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-card p-3 sm:p-4 lg:p-5 shadow-2xl w-full">
  <p className="text-cream-50 text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-3 sm:indent-4 md:indent-6 hyphens-none md:max-w-none">
    Transforme o café do seu evento em uma <span className="text-coffee-500 font-bold">experiência inesquecível</span>...
  </p>
</div>
```

### 9. Cards Compactos (FeatureItemCompact)

```tsx
// ANTES
<div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-card hover:bg-coffee-700/40 transition-colors">
  <div className="flex items-center gap-2 px-3 py-2">
    <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
      {icon}
    </span>
    <span className="text-cream-50 font-semibold text-xs md:text-sm leading-none">
      {title}
    </span>
  </div>
</div>

// DEPOIS
<div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-card hover:bg-coffee-700/40 transition-colors">
  <div className="flex items-center gap-2.5 sm:gap-2 px-3.5 sm:px-3 py-2.5 sm:py-2">
    <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
      {icon}
    </span>
    <span className="text-cream-50 font-semibold text-xs sm:text-xs md:text-sm leading-tight sm:leading-none">
      {title}
    </span>
  </div>
</div>
```

**Aplicar em TODOS os cards:** 3 cards (Coffee, Sparkles, Store)

### 10. Grid de Métricas

```tsx
// ANTES
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 mt-8 lg:mt-10">

// DEPOIS
<div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 mt-6 sm:mt-8 lg:mt-10">
```

### 11. Cards de Métricas

```tsx
// ANTES
<div className="p-3 md:p-4 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-2">
  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500">
    + 100 mil
  </div>
  <div className="text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-2">
    <span>☕</span>
    <span>cafés servidos</span>
  </div>
</div>

// DEPOIS
<div className="p-3.5 sm:p-3 md:p-4 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-2.5 sm:gap-2">
  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500">
    + 100 mil
  </div>
  <div className="text-sm sm:text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-2">
    <span>☕</span>
    <span>cafés servidos</span>
  </div>
</div>
```

**Aplicar em TODOS os cards:** 3 cards de métricas

---

## ⚠️ Cuidados Especiais

### 1. Título sem Overflow Horizontal

**Problema Potencial:** Título longo pode causar overflow horizontal em mobile.

**Solução:**
- Remover `whitespace-nowrap` em mobile
- Permitir quebra de linha natural
- Usar clamp responsivo para tamanho de fonte
- Testar em diferentes larguras de tela (360px, 375px, 414px)

---

### 2. Carrossel Funcionando Corretamente

**Problema Potencial:** Carrossel pode não funcionar bem em mobile.

**Solução:**
- Manter estrutura do Embla Carousel
- Garantir que controles sejam acessíveis (área de toque adequada)
- Testar navegação por toque (swipe)
- Testar navegação por botões
- Verificar que autoplay funciona corretamente

---

### 3. Aspect Ratio do Slideshow

**Problema Potencial:** Aspect ratio muito grande ou muito pequeno pode causar problemas visuais.

**Solução:**
- Usar `aspect-[4/3]` em mobile (1.33 - mais quadrado)
- Usar `aspect-[4/3.5]` em tablet (1.14 - mais retangular)
- Usar `aspect-[16/11]` em desktop (1.45 - mais retangular)
- Testar visualmente em diferentes resoluções

---

### 4. Cards Compactos Legíveis

**Problema Potencial:** Cards podem ficar muito pequenos em mobile.

**Solução:**
- Aumentar ligeiramente padding em mobile (`px-3.5 py-2.5`)
- Melhorar line-height em mobile (`leading-tight`)
- Garantir que texto seja legível
- Testar com textos longos

---

### 5. Métricas Bem Apresentadas

**Problema Potencial:** Números e textos podem ficar pequenos demais em mobile.

**Solução:**
- Usar tamanhos de fonte responsivos
- Garantir contraste adequado
- Manter hierarquia visual
- Testar legibilidade

---

### 6. Espaçamentos Consistentes

**Problema Potencial:** Espaçamentos inconsistentes entre elementos.

**Solução:**
- Usar sistema de espaçamento responsivo consistente
- Mobile: espaçamentos menores (ex: `mb-3`, `gap-3`, `p-3`)
- Tablet: espaçamentos moderados (ex: `mb-4`, `gap-4`, `p-4`)
- Desktop: espaçamentos maiores (ex: `mb-6`, `gap-6`, `p-5`)

---

## 🎯 Resultado Esperado

### Mobile (< 640px)

- ✅ Seção com altura natural (permite scroll)
- ✅ Título quebra linha corretamente (sem overflow horizontal)
- ✅ Espaçamentos reduzidos e adequados
- ✅ Tipografia legível e bem dimensionada
- ✅ Carrossel com aspect ratio adequado
- ✅ Controles do carrossel menores e bem posicionados
- ✅ Cards compactos legíveis e bem espaçados
- ✅ Métricas bem apresentadas
- ✅ Conteúdo não cortado ou sobreposto

### Tablet (640px - 1024px)

- ✅ Espaçamentos moderados
- ✅ Tipografia adequada
- ✅ Layout responsivo funcionando
- ✅ Transição suave entre mobile e desktop
- ✅ Título em linha única (se couber)

### Desktop (≥ 1024px)

- ✅ Layout atual mantido (já está bom)
- ✅ Centralização vertical funcionando
- ✅ Espaçamentos maiores
- ✅ Experiência premium

---

## 📊 Tabela Comparativa: Antes vs Depois

| Elemento | Estado Atual (Mobile) | Proposta (Mobile) | Proposta (Desktop) |
|----------|----------------------|-------------------|-------------------|
| **Section altura** | `h-screen` (fixo) | `min-h-screen` (flexível) | `lg:h-screen` (fixo) |
| **Section padding** | Sem padding vertical | `py-8 sm:py-12` | `lg:py-0` |
| **Container padding** | `py-4` (16px) | `py-3` (12px) | `lg:py-6` (24px) |
| **Título** | `whitespace-nowrap` + clamp grande | Quebra linha + clamp menor | `lg:whitespace-nowrap` + clamp maior |
| **Grid gap** | `gap-4` (16px) | `gap-3` (12px) | `lg:gap-6` (24px) |
| **Grid items** | `items-end` | `items-start` | `md:items-end` |
| **Slideshow aspect** | `aspect-[4/3.5]` (1.14) | `aspect-[4/3]` (1.33) | `lg:aspect-[16/11]` (1.45) |
| **Controles tamanho** | `h-10 w-10` (40px) | `h-9 w-9` (36px) | `md:h-11 md:w-11` (44px) |
| **Texto padding** | `p-4` (16px) | `p-3` (12px) | `lg:p-5` (20px) |
| **Texto indent** | `indent-6` (24px) | `indent-3` (12px) | `md:indent-6` (24px) |
| **Cards gap** | `gap-2` (8px) | `gap-2.5` (10px) | `sm:gap-2` (8px) |
| **Métricas gap** | `gap-4` (16px) | `gap-3` (12px) | `lg:gap-5` (20px) |
| **Métricas margin** | `mt-8` (32px) | `mt-6` (24px) | `lg:mt-10` (40px) |

---

## 🔍 Validação e Testes

### Testes Funcionais
- [ ] Seção permite scroll em mobile quando conteúdo é maior que viewport
- [ ] Título não causa overflow horizontal em mobile
- [ ] Carrossel funciona corretamente (swipe, botões, autoplay)
- [ ] Controles do carrossel são acessíveis (área de toque adequada)
- [ ] Cards compactos são legíveis
- [ ] Métricas são legíveis e bem apresentadas
- [ ] Layout não quebra em diferentes resoluções

### Testes de Layout
- [ ] Conteúdo não é cortado em mobile
- [ ] Espaçamentos são adequados em mobile
- [ ] Tipografia é legível em mobile
- [ ] Grid funciona corretamente (1 coluna mobile, 2 colunas desktop)
- [ ] Slideshow não quebra layout
- [ ] Cards não quebram layout
- [ ] Header fixo não sobrepõe conteúdo
- [ ] Título quebra linha corretamente

### Testes Responsivos
- [ ] Mobile 360px: Layout funciona, título quebra linha
- [ ] Mobile 375px: Layout funciona, título quebra linha
- [ ] Mobile 414px: Layout funciona, título quebra linha
- [ ] Tablet 768px: Layout funciona, título em linha única (se couber)
- [ ] Tablet 1024px: Layout funciona, layout de 2 colunas
- [ ] Desktop 1280px: Layout funciona (mantém comportamento atual)
- [ ] Desktop 1920px: Layout funciona (mantém comportamento atual)

### Testes Visuais
- [ ] Visual geral harmonioso em mobile
- [ ] Espaçamentos equilibrados
- [ ] Tipografia legível
- [ ] Cores e contrastes adequados
- [ ] Transições suaves entre breakpoints
- [ ] Experiência fluida e agradável
- [ ] Carrossel visualmente atraente

---

## 📐 Breakpoints Utilizados

### Tailwind CSS (Padrão)

```
sm:  640px  - Tablet pequeno, ajustes de tipografia e espaçamento
md:  768px  - Tablet, layout de 2 colunas, ajustes moderados
lg:  1024px - Desktop, layout completo, h-screen, espaçamentos maiores
xl:  1280px - Desktop grande, pequenos refinos
2xl: 1536px - Desktop muito grande, limitar largura do container
```

### Estratégia de Breakpoints

- **Mobile (< 640px):** Layout compacto, espaçamentos reduzidos, título quebra linha
- **Tablet (640px - 1024px):** Espaçamentos moderados, transição suave, título pode ser linha única
- **Desktop (≥ 1024px):** Layout atual (já está bom), centralização vertical, título linha única

---

## ✅ Status

- 📝 **Documentação:** Completa e detalhada
- ⏳ **Implementação:** Aguardando autorização
- ⚠️ **Complexidade:** Média (muitas mudanças, mas todas bem definidas)
- 🎯 **Objetivo:** Otimizar experiência mobile da seção Hero sem quebrar desktop

---

## 🚀 Próximos Passos

1. **Revisar esta documentação minuciosamente**
2. **Autorizar implementação**
3. **Implementar mudanças fase por fase (seguir checklist)**
4. **Testar em diferentes dispositivos e resoluções**
5. **Verificar que desktop não foi afetado**
6. **Validar que mobile está funcionando perfeitamente**
7. **Verificar que carrossel funciona corretamente**
8. **Verificar que título não causa overflow horizontal**
9. **Verificar que não há regressões**

---

## 🔄 Reversão

Se algo der errado, todas as mudanças podem ser revertidas:

```bash
# Reverter arquivo específico
git checkout HEAD -- components/hero/Hero.tsx
git checkout HEAD -- components/hero/FeatureItemCompact.tsx
```

---

## 📝 Notas Finais

1. **Mobile-First:** A estratégia é mobile-first, com melhorias progressivas para telas maiores.

2. **Título Responsivo:** O título permite quebra de linha em mobile para prevenir overflow horizontal, mas mantém linha única em telas maiores.

3. **Altura Adaptativa:** A seção usa `min-h-screen` em mobile (permite scroll) e `h-screen` em desktop (centralização vertical).

4. **Carrossel Otimizado:** O carrossel tem aspect ratio menor em mobile e controles menores, mas mantém funcionalidade completa.

5. **Espaçamentos Responsivos:** Todos os espaçamentos são responsivos, economizando espaço em mobile e mantendo conforto em desktop.

6. **Tipografia Responsiva:** Todos os textos têm tamanhos responsivos, garantindo legibilidade em todas as telas.

7. **Preservação do Desktop:** Todas as mudanças preservam o comportamento atual em desktop (já está bom).

8. **Testes Obrigatórios:** Testar em diferentes dispositivos e resoluções é essencial para garantir qualidade, especialmente o título em diferentes larguras.

---

**IMPORTANTE:** Esta documentação propõe uma solução completa e detalhada para otimizar a experiência mobile da seção Hero. Seguir **exatamente** como descrito, implementando fase por fase e testando após cada fase, especialmente o comportamento do título em diferentes larguras de tela.

