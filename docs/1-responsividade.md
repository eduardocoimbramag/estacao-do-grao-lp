# Documentação: Padronização de Responsividade - Hero + Header

## 📋 Visão Geral

Este documento define os padrões de breakpoints e comportamento responsivo para a primeira seção (Hero) e Header do site Estação do Grão, corrigindo "pontos ruins" em larguras médias/altas (900–1100px).

---

## 1. Padrões de Breakpoints

### Breakpoints do Tailwind (padrão)
```
sm:  640px  - Tablets pequenos, ajustes de tipografia
md:  768px  - INICIA grid em 2 colunas no Hero
lg:  1024px - Aumenta gaps e tipografia
xl:  1280px - Max-width do container, pequenos refinos
2xl: 1536px - Limitar largura do container para evitar esticar demais
```

### Container Padrão do Site
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Conteúdo */}
</div>
```

### Regra de Ouro (Anti-escape/Overflow)
- Em grids: sempre usar `min-w-0` ou `overflow-hidden` nos filhos com conteúdo variável
- Evitar `min-w-[320px]` nas laterais do header/hero
- Usar `shrink-0` ao invés de widths fixos

---

## 2. Header - Alinhamento Sólido em Todas as Larguras

### Estrutura com Grid 3 Colunas

```jsx
<header className="border-b border-cream-200/10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-[auto,1fr,auto] items-center h-20">
      
      {/* Coluna 1: Logo (auto) */}
      <div className="flex items-center shrink-0">
        <a href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="font-serif text-xl text-cream-50">Estação do Grão</span>
        </a>
      </div>
      
      {/* Coluna 2: Nav (1fr - expansível) */}
      <nav className="hidden md:flex justify-center items-center gap-5 md:gap-6 lg:gap-8 xl:gap-10 min-w-0">
        <button className="font-semibold text-base md:text-lg text-cream-50 hover:text-coffee-500 transition-colors">
          Sobre
        </button>
        <button className="font-semibold text-base md:text-lg text-cream-50 hover:text-coffee-500 transition-colors">
          Serviços
        </button>
        <button className="font-semibold text-base md:text-lg text-cream-50 hover:text-coffee-500 transition-colors">
          Galeria
        </button>
      </nav>
      
      {/* Coluna 3: CTA + Menu Mobile (auto) */}
      <div className="flex items-center justify-end gap-3 shrink-0">
        {/* Trocar para lg+ se faltar espaço em md */}
        <a 
          href="#contato" 
          className="hidden lg:inline-flex px-4 py-2 bg-coffee-500 hover:bg-accent text-coffee-900 font-semibold rounded-lg transition-colors"
        >
          Orçamento
        </a>
        <button 
          className="md:hidden p-2 text-cream-50" 
          aria-label="Toggle menu"
        >
          {/* Ícone hamburger */}
        </button>
      </div>
      
    </div>
  </div>
</header>
```

### Justificativa
- **Grid 3 colunas**: `grid-cols-[auto,1fr,auto]`
  - `auto` = logo (largura do conteúdo)
  - `1fr` = nav (espaço flexível)
  - `auto` = CTA (largura do conteúdo)
- **Centralização real** do menu
- **Evita overflow** do CTA em 900–1100px
- **Sem min-widths fixas** nas laterais

---

## 3. Hero - Grid & Colunas (Alinhados pelo Topo)

### A) Grid Principal

```jsx
<section className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* H1 centralizado */}
    <h1 className="font-serif text-cream-50 font-bold tracking-tight text-center mb-8 md:mb-10 lg:mb-12
      text-[clamp(2rem,3vw+1rem,3.25rem)] md:text-[clamp(2.5rem,2.2vw+1.2rem,3.5rem)]">
      Café Gourmet e Baristas para Eventos
    </h1>

    {/* Grid 2 colunas a partir de md */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-14 items-start">
      
      {/* Coluna 1: Slideshow */}
      <div className="relative min-w-0">
        {/* ... slideshow ... */}
      </div>
      
      {/* Coluna 2: Stack (Texto + 3 cards compactos) */}
      <div className="self-start flex flex-col max-w-full gap-4 md:gap-5 w-full">
        {/* ... texto + cards ... */}
      </div>
      
    </div>
  </div>
</section>
```

### B) Regras Anti-Escape

1. **Coluna 1 e 2**: usar `min-w-0` quando necessário (principalmente com long words)
2. **Evitar `mx-auto`** na coluna 2 (apertava a largura)
3. **Usar `w-full` e `max-w-full`** em wrappers
4. **Ordem mobile**: Slide → Texto → Card1 → Card2 → Card3 (stacking natural)

### C) Gaps Progressivos

```
gap-6    - Mobile/Tablet
md:gap-8 - Desktop pequeno (768px+)
lg:gap-12 - Desktop médio (1024px+)
xl:gap-14 - Desktop grande (1280px+)
```

---

## 4. Slideshow (Coluna Esquerda)

### Estrutura Completa

```jsx
<div 
  className="relative min-w-0" 
  role="region" 
  aria-roledescription="carousel" 
  aria-label="Galeria Estação do Grão"
  onKeyDown={handleKey}
  tabIndex={0}
  onMouseEnter={() => (hoverRef.current = true)}
  onMouseLeave={() => (hoverRef.current = false)}
>
  {/* Container Embla */}
  <div className="overflow-hidden rounded-2xl ring-1 ring-cream-50/15 shadow-2xl" ref={emblaRef}>
    <div className="flex">
      {images.map((src, idx) => (
        <div className="relative min-w-0 flex-[0_0_100%]" key={idx}>
          <div className="relative aspect-[4/3] lg:aspect-[16/10] w-full">
            <Image
              src={src}
              alt={`Foto ${idx + 1} do serviço de café para eventos`}
              fill
              className="object-cover select-none"
              sizes="(min-width:1536px) 720px, (min-width:1280px) 640px, (min-width:1024px) 560px, (min-width:768px) 50vw, 100vw"
              priority={idx === 0}
            />
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Controles Prev/Next */}
  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 pointer-events-none">
    <button
      type="button"
      onClick={() => emblaApi?.scrollPrev()}
      className="inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full 
        bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-2xl ring-1 ring-cream-50/20 
        transition-colors shadow-lg pointer-events-auto"
      aria-label="Imagem anterior"
    >
      ‹
    </button>
    <button
      type="button"
      onClick={() => emblaApi?.scrollNext()}
      className="inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full 
        bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-2xl ring-1 ring-cream-50/20 
        transition-colors shadow-lg pointer-events-auto"
      aria-label="Próxima imagem"
    >
      ›
    </button>
  </div>
</div>
```

### Características

- **Aspect ratio estável**: `aspect-[4/3]` até md, `aspect-[16/10]` em lg para visual mais "wide"
- **Sizes otimizados**: progressivos por breakpoint
- **Botões responsivos**: `h-10 w-10` → `md:h-11 md:w-11`
- **Posicionamento consistente**: centralizados verticalmente com `top-1/2 -translate-y-1/2`

---

## 5. Coluna Direita - Stack (Texto + 3 Cards Compactos)

### Estrutura Completa

```jsx
<div className="self-start flex flex-col max-w-full gap-4 md:gap-5 w-full">
  
  {/* Bloco de Texto */}
  <div className="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-800/20 p-5 md:p-6 lg:p-6 shadow-2xl w-full">
    <p className="text-cream-50/90 text-[clamp(0.98rem,0.35vw+0.95rem,1.125rem)] leading-relaxed text-center md:text-left md:max-w-none">
      Transforme o café do seu evento em uma experiência inesquecível! Levamos café espresso premium,
      baristas profissionais e personalização de marca para eventos corporativos, feiras, congressos e casamentos.
    </p>
  </div>

  {/* Cards Compactos */}
  <FeatureItemCompact 
    icon={<Users className="w-5 h-5" />} 
    title="Baristas Profissionais" 
  />
  <FeatureItemCompact 
    icon={<Sparkles className="w-5 h-5" />} 
    title="Personalização com sua Marca" 
  />
  <FeatureItemCompact 
    icon={<Coffee className="w-5 h-5" />} 
    title="Alto Fluxo de Atendimento" 
  />
  
</div>
```

### Características

- **Tipografia com CLAMP**: `text-[clamp(0.98rem,0.35vw+0.95rem,1.125rem)]` evita "salto" entre md e lg
- **Gaps homogêneos**: `gap-4 md:gap-5` sem "afrouxar" em md
- **Largura total**: `w-full max-w-full` sem margens que estreitam
- **Alinhamento**: `self-start` para alinhar pelo topo com o slideshow

---

## 6. Componente FeatureItemCompact

### Implementação Completa

```tsx
// components/hero/FeatureItemCompact.tsx
"use client";

import { ReactNode } from "react";

type FeatureItemCompactProps = {
  icon: ReactNode;
  title: string;
};

export default function FeatureItemCompact({ icon, title }: FeatureItemCompactProps) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-800/15 hover:bg-coffee-800/25 transition-colors">
      <div className="flex items-center gap-2.5 px-4 py-3">
        <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
          {icon}
        </span>
        <span className="text-cream-50 font-semibold text-sm md:text-base leading-none">
          {title}
        </span>
      </div>
    </div>
  );
}
```

### Especificações

- **Tamanho reduzido**: `px-4 py-3`
- **Ícone**: `w-5 h-5` (~20px), `flex-shrink-0`
- **Tipografia**: `text-sm md:text-base`
- **Layout**: ícone e texto na mesma linha (`flex items-center`)
- **Largura**: `w-full max-w-full` sem overflow
- **Estilo**: `rounded-xl`, `ring-1`, hover sutil

---

## 7. Tipografia do H1 (Fluida, Sem Quebras Feias)

### Implementação com Clamp

```jsx
<h1 className="font-serif text-cream-50 font-bold tracking-tight text-center mb-8 md:mb-10 lg:mb-12
  text-[clamp(2rem,3vw+1rem,3.25rem)] 
  md:text-[clamp(2.5rem,2.2vw+1.2rem,3.5rem)]">
  Café Gourmet e Baristas para Eventos
</h1>
```

### Por que Clamp?

- **Evita jumps** entre `text-4xl`/`text-5xl`
- **Granularidade** entre 900–1100px (zona crítica)
- **Escala suave** conforme viewport aumenta
- **Mobile**: 2rem (32px) → 3.25rem (52px)
- **Desktop**: 2.5rem (40px) → 3.5rem (56px)

---

## 8. Gaps, Margens e Alturas por Breakpoint

### Tabela de Referência

| Elemento | Classes | Valores |
|----------|---------|---------|
| **Grid principal** | `gap-6 md:gap-8 lg:gap-12 xl:gap-14` | 24px → 32px → 48px → 56px |
| **Espaço vertical seção** | `py-12 sm:py-16 lg:py-20` | 48px → 64px → 80px |
| **Stack coluna direita** | `gap-4 md:gap-5` | 16px → 20px |
| **Margem abaixo H1** | `mb-8 md:mb-10 lg:mb-12` | 32px → 40px → 48px |
| **Header nav gaps** | `gap-5 md:gap-6 lg:gap-8 xl:gap-10` | 20px → 24px → 32px → 40px |
| **Espaço p/ próxima seção** | `mt-12 sm:mt-14 lg:mt-16` | 48px → 56px → 64px |

---

## 9. Armadilhas Comuns (Evitar)

### ❌ Problemas Frequentes

1. **`min-w-[320px]` nas laterais**
   - **Problema**: "Quebra" md–lg e joga CTA para fora
   - **Solução**: Substituir por `shrink-0`

2. **`mx-auto` na coluna direita do Hero**
   - **Problema**: Estreita demais a coluna
   - **Solução**: Remover e usar `w-full`/`max-w-full`

3. **Cards reutilizados com padding grande**
   - **Problema**: Extrapolam a coluna
   - **Solução**: Criar variante compacta (`px-4 py-3`, `text-sm`)

4. **Widths fixos em px**
   - **Problema**: Não se adaptam ao viewport
   - **Solução**: Usar `auto`, `1fr`, `shrink-0`

5. **Falta de `min-w-0` em grid items**
   - **Problema**: Conteúdo longo causa overflow
   - **Solução**: Adicionar `min-w-0` ou `overflow-hidden`

---

## 10. Teste em 6 Ranges (Obrigatório)

### 📱 Range 1: 360–480px (Mobile Pequeno)
- ✅ 1 coluna
- ✅ Slider cheio
- ✅ Texto + 3 cards empilhados limpos
- ✅ Tipografia legível
- ✅ Espaçamentos consistentes

### 📱 Range 2: 640–767px (SM - Tablet Pequeno)
- ✅ 1 coluna ainda
- ✅ Tipografia fluida sem saltar
- ✅ Gaps aumentam levemente
- ✅ CTA no header oculto

### 💻 Range 3: 768–899px (MD "Apertado")
- ✅ 2 colunas no Hero
- ✅ CTA pode continuar hidden
- ✅ Nada deve cortar
- ✅ Nav centralizado perfeitamente
- ✅ Texto + cards dentro do "box"

### 💻 Range 4: 900–1100px (MD Crítico - ZONA DE RISCO)
- ✅ 2 colunas equilibradas
- ✅ Texto + cards dentro do "box"
- ✅ Nav central perfeito
- ✅ CTA aparece (lg)
- ✅ **SEM OVERFLOW** em texto/cards
- ✅ **SEM QUEBRAS** de layout

### 🖥️ Range 5: 1200–1366px (LG - Desktop Médio)
- ✅ Gaps maiores
- ✅ Tudo equilibrado
- ✅ Tipografia aumenta
- ✅ CTA visível
- ✅ Nav com espaçamento confortável

### 🖥️ Range 6: ≥1536px (2XL - Desktop Grande)
- ✅ Largura contida pelo container (max-w-7xl)
- ✅ Nada "esgarça"
- ✅ Proporções mantidas
- ✅ Gaps máximos aplicados

---

## 11. Checklist de Aceitação

### Header
- [ ] Grid 3 colunas: `grid-cols-[auto,1fr,auto]`
- [ ] Menu REALMENTE centralizado
- [ ] CTA nunca extrapola (hidden até lg)
- [ ] Sem `min-w` fixos nas laterais
- [ ] `shrink-0` aplicado nas colunas laterais

### Hero
- [ ] Colunas top-aligned: `items-start`
- [ ] Coluna direita é stack (texto + 3 compact cards)
- [ ] Gap consistente: `gap-4 md:gap-5`
- [ ] Em 900–1100px NÃO há quebra de layout
- [ ] Nenhum overflow no texto/cards

### Tipografia
- [ ] H1 com clamp: sem "pulos" entre md e lg
- [ ] Texto com clamp ou progressão suave
- [ ] Cards com `text-sm md:text-base`

### Slideshow
- [ ] Aspect estável: `aspect-[4/3] lg:aspect-[16/10]`
- [ ] `sizes` configurados corretamente
- [ ] Botões com tamanho responsivo
- [ ] `min-w-0` aplicado

### Layout Geral
- [ ] Nenhum `min-w` rígido forçando overflow
- [ ] `min-w-0` aplicado onde necessário
- [ ] Em mobile: ordem natural em coluna
- [ ] Espaçamentos consistentes em todos os ranges

### Paleta & Estilos
- [ ] Cores preservadas (coffee, cream, accent)
- [ ] Rings e bordas consistentes
- [ ] Sombras aplicadas corretamente
- [ ] Transições suaves

---

## 12. Implementação - Ordem de Execução

### Fase 1: Header
1. Converter layout para grid 3 colunas
2. Remover `min-w` fixos
3. Adicionar `shrink-0` nas laterais
4. Ajustar gaps progressivos
5. Testar em 6 ranges

### Fase 2: Hero - H1
1. Aplicar clamp na tipografia
2. Ajustar margens responsivas
3. Testar legibilidade

### Fase 3: Hero - Grid
1. Ajustar gaps progressivos
2. Confirmar `items-start`
3. Adicionar `min-w-0` onde necessário

### Fase 4: Hero - Slideshow
1. Ajustar aspect ratios
2. Configurar `sizes`
3. Ajustar botões
4. Testar navegação

### Fase 5: Hero - Coluna Direita
1. Garantir `w-full max-w-full`
2. Ajustar gaps
3. Aplicar clamp no texto
4. Integrar cards compactos

### Fase 6: Componente Compact
1. Criar/ajustar FeatureItemCompact
2. Garantir ícone + texto inline
3. Testar largura total

### Fase 7: Validação
1. Testar nos 6 ranges
2. Verificar checklist completo
3. Ajustes finais

---

## 13. Referências Rápidas

### Container
```jsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Grid 3 Colunas (Header)
```jsx
<div className="grid grid-cols-[auto,1fr,auto] items-center h-20">
```

### Grid 2 Colunas (Hero)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-14 items-start">
```

### Clamp Typography
```jsx
// H1
text-[clamp(2rem,3vw+1rem,3.25rem)] md:text-[clamp(2.5rem,2.2vw+1.2rem,3.5rem)]

// Texto corpo
text-[clamp(0.98rem,0.35vw+0.95rem,1.125rem)]
```

### Gaps Progressivos
```jsx
gap-4 md:gap-5           // Stack vertical
gap-6 md:gap-8 lg:gap-12 xl:gap-14  // Grid principal
gap-5 md:gap-6 lg:gap-8 xl:gap-10   // Nav header
```

---

## 14. Arquivos Afetados

```
components/
├── header.tsx              → Ajustar grid 3 colunas
└── hero/
    ├── Hero.tsx            → Ajustar grid, tipografia, gaps
    └── FeatureItemCompact.tsx → Confirmar specs compactas
```

---

## 15. Notas Finais

- **Prioridade**: Zona crítica 900–1100px
- **Foco**: Sem overflow, alinhamento top, largura total
- **Teste**: Nos 6 ranges obrigatoriamente
- **Paleta**: Preservar 100% (coffee/cream/accent)
- **Acessibilidade**: Manter ARIA labels e navegação por teclado

---

**Data de Criação**: 2025-01-13  
**Versão**: 1.0  
**Status**: Pronto para implementação

