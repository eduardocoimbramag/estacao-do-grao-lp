# 13 - Redução de Espaçamentos "Nossos Serviços" (laymob apenas)

**Status:** Implementação aplicada (apenas laymob1 e laymob2; layouts desktop inalterados).

---

## Contexto

Usuário solicitou redução de diversos espaçamentos na seção "Nossos Serviços" no mobile, indicados por marcações vermelhas nos prints:

1. Espaçamento grande no **topo da seção** (acima do título)
2. Espaçamento grande **entre título e subtítulo**
3. Espaçamento grande **entre subtítulo e cards do carrossel**
4. Espaçamento grande **abaixo dos cards** (antes dos indicadores/dots)
5. Espaçamento grande **abaixo dos indicadores** (final da seção)
6. **Line-height muito grande** no título dos cards do carrossel

---

## Modificações Aplicadas

### 1. Arquivo `app/page.tsx`

#### Header da seção (linhas 25-33)

**ANTES:**
```tsx
<header className="mb-8 sm:mb-6 text-center space-y-3 ...">
```

**DEPOIS:**
```tsx
<header className="mb-3 sm:mb-6 text-center space-y-1.5 ...">
```

**Mudanças:**
- `mb-8` → `mb-3` (32px → 12px) - reduz espaço entre subtítulo e carrossel
- `space-y-3` → `space-y-1.5` (12px → 6px) - reduz espaço entre título e subtítulo

---

### 2. Arquivo `components/sections/services-carousel.tsx`

#### A. Container do Embla (linha 85)

**ANTES:**
```tsx
<div className="... py-16 sm:py-6 ..." ref={emblaRef}>
```

**DEPOIS:**
```tsx
<div className="... py-8 sm:py-6 ..." ref={emblaRef}>
```

**Mudanças:**
- `py-16` → `py-8` (64px → 32px vertical padding no mobile)
- Mantém proteção contra corte mas reduz espaçamento excessivo

#### B. Título do card (linha 132)

**ANTES:**
```tsx
<h3 className="text-lg sm:text-xl font-medium text-cream-50 font-satoshi ...">
```

**DEPOIS:**
```tsx
<h3 className="text-lg sm:text-xl font-medium text-cream-50 font-satoshi leading-tight ...">
```

**Mudanças:**
- Adicionado `leading-tight` (line-height: 1.25) para reduzir espaçamento entre linhas do título

#### C. Indicadores de paginação mobile (linha 249)

**ANTES:**
```tsx
<div className="flex lg:hidden justify-center gap-3 mt-6 ...">
```

**DEPOIS:**
```tsx
<div className="flex lg:hidden justify-center gap-3 mt-2 ...">
```

**Mudanças:**
- `mt-6` → `mt-2` (24px → 8px) - reduz espaço entre cards e dots

---

### 3. Arquivo `app/globals.css`

#### A. Seção `.laymob1-servicos-section`

**ANTES:**
```css
padding-top: 4rem !important;     /* 64px */
padding-bottom: 4rem !important;  /* 64px */
```

**DEPOIS:**
```css
padding-top: 1.5rem !important;    /* 24px */
padding-bottom: 1.5rem !important; /* 24px */
```

#### B. Container `.laymob1-servicos-container`

**ANTES:**
```css
padding-top: 2rem !important;    /* 32px */
padding-bottom: 2rem !important; /* 32px */
```

**DEPOIS:**
```css
padding-top: 1rem !important;     /* 16px */
padding-bottom: 0.5rem !important; /* 8px */
```

#### C. Carrossel `.laymob1-servicos-carousel`

**ANTES:**
```css
padding-top: 4rem !important;    /* 64px */
padding-bottom: 4rem !important; /* 64px */
```

**DEPOIS:**
```css
padding-top: 2rem !important;    /* 32px */
padding-bottom: 1rem !important; /* 16px */
```

**Mesmas alterações aplicadas para `.laymob2-*`**

---

## Resumo dos Valores

| Elemento | Propriedade | Antes | Depois | Redução |
|----------|-------------|-------|--------|---------|
| Header section | `mb-` | 32px | 12px | -62.5% |
| Header section | `space-y-` | 12px | 6px | -50% |
| Embla container | `py-` | 64px | 32px | -50% |
| Título card | `leading-` | default (~1.5) | tight (1.25) | -16.7% |
| Dots mobile | `mt-` | 24px | 8px | -66.7% |
| Section | `padding-top` | 64px | 24px | -62.5% |
| Section | `padding-bottom` | 64px | 24px | -62.5% |
| Container | `padding-top` | 32px | 16px | -50% |
| Container | `padding-bottom` | 32px | 8px | -75% |
| Carrossel | `padding-top` | 64px | 32px | -50% |
| Carrossel | `padding-bottom` | 64px | 16px | -75% |

---

## Impacto Visual

### Antes:
- Seção muito "espaçada" com grandes áreas em branco
- Cards pareciam "distantes" do título
- Indicadores muito abaixo dos cards
- Título dos cards com linhas muito separadas

### Depois:
- Conteúdo mais **compacto e próximo**
- Hierarquia visual mantida mas mais eficiente
- Melhor aproveitamento do espaço vertical no mobile
- Título dos cards mais legível e elegante

---

## Observações Técnicas

1. **Proteção contra corte mantida:** Mesmo com redução, o `py-8` (32px) no Embla container ainda protege contra corte dos cards, pois:
   - Scale está desabilitado no mobile (`sm:scale-105`)
   - Overflow está em `visible` em todos os níveis
   - Margin adicional de 1rem nos articles

2. **Responsividade preservada:** 
   - Todos os ajustes usam `sm:` prefix para manter valores desktop
   - Apenas mobile (`laymob1`, `laymob2`) foi modificado

3. **Layouts desktop inalterados:**
   - `laydesk1`, `laydesk2`, `laydesk3` permanecem exatamente como estavam

---

## Arquivos Modificados

1. `app/page.tsx` - header da seção
2. `components/sections/services-carousel.tsx` - container Embla, título cards, dots
3. `app/globals.css` - paddings de section, container e carrossel (laymob1/laymob2)
