# Documentação: Projeto Mobile - Seção "Regiões Atendidas"

## 📋 Visão Geral

Este documento detalha o projeto de melhorias para a seção "Regiões Atendidas" na versão mobile, incluindo ajustes de tamanhos, layout e estrutura para garantir que a seção ocupe exatamente 1 viewport.

**Objetivo**: 
- ✅ Ajustar tamanho do título para corresponder à seção anterior
- ✅ Reorganizar botões em grid de 2 colunas (mesmo tamanho)
- ✅ Garantir que seção ocupe exatamente 1 viewport (com menu)
- ✅ Reduzir tamanho da imagem e dos 3 cards
- ✅ Desktop permanece intacto (nenhuma alteração)

---

## 🎯 Mudanças Solicitadas

### 1. Título - Mesmo Tamanho da Seção Anterior

**Seção Anterior ("Nossos Serviços")**:
```tsx
<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cream-50 font-montserrat">
  Nossos Serviços
</h2>
```

**Atual ("Regiões Atendidas")**:
```tsx
<h2 className="text-base sm:text-lg lg:text-xl font-bold text-white text-center font-montserrat">
  REGIÕES ATENDIDAS
</h2>
```

**Mudança Necessária**:
- Mobile: `text-base` → `text-2xl`
- Desktop: Manter `sm:text-lg lg:text-xl` (ou ajustar para `sm:text-3xl lg:text-4xl` se necessário)

---

### 2. Botões - Grid de 2 Colunas (Mesmo Tamanho)

**Atual**:
- Botões em coluna vertical (`flex-col`)
- Cada botão com `flex-1` (altura flexível)
- Botões empilhados verticalmente

**Mudança Necessária**:
- Mobile: Grid de 2 colunas (`grid grid-cols-2`)
- Botões com mesma altura e largura
- Reduzir altura dos botões para economizar espaço

---

### 3. Seção - 1 Viewport (com Menu)

**Atual**:
```tsx
<section className="min-h-[calc(100vh-4rem)] sm:h-screen ...">
```

**Mudança Necessária**:
- Mobile: `min-h-[calc(100vh-4rem)]` → `h-[calc(100vh-4rem)]`
- Desktop: Manter `sm:h-screen` (sem alterações)

---

### 4. Reduzir Tamanho da Imagem e Cards

**Atual**:
- Imagem: `max-w-[280px]` no mobile
- Cards: Padding e tamanhos que ocupam muito espaço

**Mudança Necessária**:
- Reduzir `max-w` da imagem no mobile
- Reduzir padding e espaçamentos dos cards
- Reduzir tamanho de fonte dos cards (se necessário)

---

## 📐 Análise do Estado Atual

### Estrutura Atual - Mobile

```tsx
<section className="min-h-[calc(100vh-4rem)] sm:h-screen py-12 sm:py-16 lg:py-20 ...">
  <div className="...">
    <div className="grid grid-cols-1 lg:grid-cols-2 ...">
      
      {/* Coluna Esquerda */}
      <div className="flex flex-col ... gap-1.5 lg:gap-2">
        {/* Título - text-base */}
        <h2>REGIÕES ATENDIDAS</h2>
        
        {/* Imagem - max-w-[280px] */}
        <div className="relative w-full max-w-[280px] ...">
          <Image ... />
        </div>
        
        {/* Card 1 */}
        <div className="pl-3 pr-4 py-1.5 ...">
          ...
        </div>
        
        {/* Card 2 */}
        <div className="pl-4 pr-6 py-2 ...">
          ...
        </div>
        
        {/* Card 3 */}
        <div className="pl-4 pr-6 py-2 ...">
          ...
        </div>
      </div>
      
      {/* Coluna Direita - Botões */}
      <div className="flex flex-col ... gap-6">
        {/* Botão 1 - flex-1 py-8 lg:py-10 */}
        <Link className="flex-1 py-8 lg:py-10 ...">
          Galeria de experiências
        </Link>
        
        {/* Botão 2 - flex-1 py-8 lg:py-10 */}
        <Link className="flex-1 py-8 lg:py-10 ...">
          Blog
        </Link>
      </div>
    </div>
  </div>
</section>
```

### Problemas Identificados

1. **Título muito pequeno**: `text-base` vs `text-2xl` da seção anterior
2. **Botões empilhados**: Ocupam muito espaço vertical
3. **Seção com `min-h`**: Permite crescimento além do viewport
4. **Imagem grande**: `max-w-[280px]` pode ser reduzido
5. **Cards com muito padding**: `py-1.5`, `py-2`, `pl-4`, `pr-6`
6. **Gaps grandes**: `gap-1.5`, `gap-6` podem ser reduzidos

---

## 🎨 Estrutura Visual Proposta

### Mobile (Antes)
```
┌─────────────────────────────┐
│  REGIÕES ATENDIDAS (pequeno) │
│                              │
│  [IMAGEM GRANDE]             │
│                              │
│  [Card 1 - grande]           │
│  [Card 2 - grande]           │
│  [Card 3 - grande]           │
│                              │
│  [Botão 1 - altura flex]     │
│                              │
│  [Botão 2 - altura flex]     │
│                              │
│  (ultrapassa viewport)       │
└─────────────────────────────┘
```

### Mobile (Depois)
```
┌─────────────────────────────┐
│  REGIÕES ATENDIDAS (text-2xl)│
│                              │
│  [IMAGEM REDUZIDA]           │
│                              │
│  [Card 1 - compacto]         │
│  [Card 2 - compacto]         │
│  [Card 3 - compacto]         │
│                              │
│  [Botão 1] [Botão 2]         │
│  (grid 2 colunas)           │
│                              │
│  (exatamente 1 viewport)    │
└─────────────────────────────┘
```

### Desktop (Mantém Original)
```
┌──────────────────┬───────────┐
│  REGIÕES ATENDIDAS│           │
│                  │           │
│  [IMAGEM]        │ [Botão 1] │
│                  │           │
│  [Card 1]        │ [Botão 2] │
│  [Card 2]        │           │
│  [Card 3]        │           │
└──────────────────┴───────────┘
```

---

## 🔧 Mudanças Técnicas Detalhadas

### 1. Título - Ajustar Tamanho da Fonte

**Arquivo**: `components/audience.tsx`

**Linha**: ~16

**Mudança**:
```tsx
// ANTES:
<h2 className="text-base sm:text-lg lg:text-xl font-bold text-white text-center font-montserrat">
  REGIÕES ATENDIDAS
</h2>

// DEPOIS:
<h2 className="text-2xl sm:text-lg lg:text-xl font-bold text-white text-center font-montserrat">
  REGIÕES ATENDIDAS
</h2>
```

**Detalhes**:
- Mobile: `text-base` → `text-2xl` (mesmo da seção anterior)
- Desktop: Manter `sm:text-lg lg:text-xl` (sem alterações)

---

### 2. Seção - Altura Fixa (1 Viewport)

**Arquivo**: `components/audience.tsx`

**Linha**: ~7

**Mudança**:
```tsx
// ANTES:
<section className="min-h-[calc(100vh-4rem)] sm:h-screen py-12 sm:py-16 lg:py-20 ...">

// DEPOIS:
<section className="h-[calc(100vh-4rem)] sm:h-screen py-12 sm:py-16 lg:py-20 ...">
```

**Detalhes**:
- Mobile: `min-h-[calc(100vh-4rem)]` → `h-[calc(100vh-4rem)]` (altura fixa)
- Desktop: Manter `sm:h-screen` (sem alterações)
- Padding: Manter `py-12 sm:py-16 lg:py-20` (pode precisar ajustar depois)

---

### 3. Imagem - Reduzir Tamanho

**Arquivo**: `components/audience.tsx`

**Linha**: ~21

**Mudança**:
```tsx
// ANTES:
<div className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-[65%] aspect-square mx-auto sm:mx-0">

// DEPOIS:
<div className="relative w-full max-w-[200px] sm:max-w-sm lg:max-w-[65%] aspect-square mx-auto sm:mx-0">
```

**Detalhes**:
- Mobile: `max-w-[280px]` → `max-w-[200px]` (redução de ~28%)
- Desktop: Manter `sm:max-w-sm lg:max-w-[65%]` (sem alterações)

---

### 4. Cards - Reduzir Padding e Espaçamentos

**Arquivo**: `components/audience.tsx`

**Card 1 (Linha ~33)**:
```tsx
// ANTES:
<div className="pl-3 pr-4 py-1.5 bg-coffee-900/60 ...">

// DEPOIS:
<div className="pl-2 pr-3 py-1 bg-coffee-900/60 ...">
```

**Card 2 (Linha ~46)**:
```tsx
// ANTES:
<div className="pl-4 pr-6 py-2 bg-coffee-900/60 ...">

// DEPOIS:
<div className="pl-2 pr-3 py-1 bg-coffee-900/60 ...">
```

**Card 3 (Linha ~59)**:
```tsx
// ANTES:
<div className="pl-4 pr-6 py-2 bg-coffee-900/60 ...">

// DEPOIS:
<div className="pl-2 pr-3 py-1 bg-coffee-900/60 ...">
```

**Detalhes**:
- Padding horizontal: Reduzir de `pl-3/4 pr-4/6` para `pl-2 pr-3`
- Padding vertical: Reduzir de `py-1.5/2` para `py-1`
- Desktop: Manter padding original (usar `sm:pl-4 sm:pr-6 sm:py-2`)

---

### 5. Container dos Cards - Reduzir Gap

**Arquivo**: `components/audience.tsx`

**Linha**: ~14

**Mudança**:
```tsx
// ANTES:
<div className="flex flex-col justify-center items-center gap-1.5 lg:gap-2">

// DEPOIS:
<div className="flex flex-col justify-center items-center gap-1 sm:gap-1.5 lg:gap-2">
```

**Detalhes**:
- Mobile: `gap-1.5` → `gap-1` (redução de espaçamento)
- Desktop: Manter `sm:gap-1.5 lg:gap-2` (sem alterações)

---

### 6. Botões - Grid de 2 Colunas (Mobile)

**Arquivo**: `components/audience.tsx`

**Linha**: ~75

**Mudança**:
```tsx
// ANTES:
<div className="flex flex-col justify-start items-stretch gap-6 h-full">
  <Link className="flex-1 py-8 lg:py-10 ...">
    Galeria de experiências
  </Link>
  <Link className="flex-1 py-8 lg:py-10 ...">
    Blog
  </Link>
</div>

// DEPOIS:
<div className="grid grid-cols-1 sm:flex sm:flex-col justify-start items-stretch gap-3 sm:gap-6 h-full">
  <Link className="py-4 sm:flex-1 sm:py-8 lg:py-10 ...">
    Galeria de experiências
  </Link>
  <Link className="py-4 sm:flex-1 sm:py-8 lg:py-10 ...">
    Blog
  </Link>
</div>
```

**Detalhes**:
- Mobile: `flex-col` → `grid grid-cols-2` (2 colunas)
- Mobile: `flex-1` → Remover (altura fixa)
- Mobile: `py-8` → `py-4` (reduzir altura)
- Mobile: `gap-6` → `gap-3` (reduzir gap)
- Desktop: Manter `sm:flex sm:flex-col sm:flex-1 sm:py-8 sm:gap-6` (sem alterações)

---

### 7. Tamanho de Fonte dos Cards - Reduzir (Opcional)

**Arquivo**: `components/audience.tsx`

**Card 1 (Linha ~37)**:
```tsx
// ANTES:
<p className="text-xs sm:text-xs lg:text-sm ...">

// DEPOIS (se necessário):
<p className="text-[0.6875rem] sm:text-xs lg:text-sm ...">
```

**Card 2 e 3 (Linhas ~50, ~63)**:
```tsx
// ANTES:
<p className="text-xs sm:text-sm lg:text-base ...">

// DEPOIS (se necessário):
<p className="text-xs sm:text-sm lg:text-base ...">
```

**Detalhes**:
- Aplicar apenas se ainda houver espaço insuficiente após outras reduções
- Desktop: Manter tamanhos originais

---

## 📊 Resumo das Mudanças

### Mudanças Propostas

| Elemento | Propriedade | Antes (Mobile) | Depois (Mobile) | Desktop |
|----------|-------------|----------------|-----------------|---------|
| **Título** | Tamanho | `text-base` | `text-2xl` | Mantido |
| **Seção** | Altura | `min-h-[calc(...)]` | `h-[calc(...)]` | Mantido |
| **Imagem** | Max-width | `max-w-[280px]` | `max-w-[200px]` | Mantido |
| **Card 1** | Padding | `pl-3 pr-4 py-1.5` | `pl-2 pr-3 py-1` | Mantido |
| **Card 2** | Padding | `pl-4 pr-6 py-2` | `pl-2 pr-3 py-1` | Mantido |
| **Card 3** | Padding | `pl-4 pr-6 py-2` | `pl-2 pr-3 py-1` | Mantido |
| **Container** | Gap | `gap-1.5` | `gap-1` | Mantido |
| **Botões** | Layout | `flex-col` | `grid grid-cols-2` | Mantido |
| **Botões** | Padding | `py-8` | `py-4` | Mantido |
| **Botões** | Gap | `gap-6` | `gap-3` | Mantido |

---

## 🎨 Estrutura Visual Detalhada

### Mobile - Layout Proposto

```
┌─────────────────────────────┐
│  REGIÕES ATENDIDAS          │
│  (text-2xl, centralizado)   │
│                             │
│  ┌─────────────┐           │
│  │             │           │
│  │   [MAPA]    │           │
│  │  (200px)    │           │
│  │             │           │
│  └─────────────┘           │
│                             │
│  ┌─────────────────────┐   │
│  │ 🌴 Card 1 (compacto) │   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🐚 Card 2 (compacto)│   │
│  └─────────────────────┘   │
│  ┌─────────────────────┐   │
│  │ 🏳️ Card 3 (compacto)│   │
│  └─────────────────────┘   │
│                             │
│  ┌──────────┬──────────┐   │
│  │ Galeria  │   Blog   │   │
│  │ (50%)    │  (50%)   │   │
│  └──────────┴──────────┘   │
│                             │
└─────────────────────────────┘
(Altura: calc(100vh - 4rem))
```

---

## ⚠️ Considerações Importantes

### O que NÃO será alterado

- ✅ **Desktop**: Completamente intacto
- ✅ **Estrutura dos cards**: Mantida (apenas tamanhos)
- ✅ **Conteúdo**: Mantido
- ✅ **Funcionalidade**: Mantida

### O que será alterado

- ✅ **Título mobile**: Tamanho da fonte
- ✅ **Seção mobile**: Altura fixa (1 viewport)
- ✅ **Imagem mobile**: Tamanho reduzido
- ✅ **Cards mobile**: Padding reduzido
- ✅ **Botões mobile**: Grid de 2 colunas, altura reduzida

---

## 📝 Checklist de Implementação

### Fase 1: Título e Seção
- [ ] Alterar título de `text-base` para `text-2xl` no mobile
- [ ] Alterar seção de `min-h-[calc(...)]` para `h-[calc(...)]` no mobile
- [ ] Verificar que desktop não foi afetado

### Fase 2: Imagem e Cards
- [ ] Reduzir `max-w-[280px]` para `max-w-[200px]` no mobile
- [ ] Reduzir padding dos 3 cards no mobile
- [ ] Reduzir gap do container no mobile
- [ ] Verificar que desktop não foi afetado

### Fase 3: Botões
- [ ] Alterar layout de `flex-col` para `grid grid-cols-2` no mobile
- [ ] Reduzir padding vertical de `py-8` para `py-4` no mobile
- [ ] Reduzir gap de `gap-6` para `gap-3` no mobile
- [ ] Remover `flex-1` no mobile (altura fixa)
- [ ] Verificar que desktop não foi afetado

### Fase 4: Ajustes Finais (Se Necessário)
- [ ] Verificar se seção cabe em 1 viewport
- [ ] Ajustar tamanhos de fonte dos cards se necessário
- [ ] Ajustar padding da seção se necessário
- [ ] Testar em diferentes dispositivos

### Fase 5: Validação
- [ ] Testar em diferentes dispositivos mobile (360px, 375px, 414px)
- [ ] Verificar que título tem mesmo tamanho da seção anterior
- [ ] Verificar que botões estão em grid de 2 colunas
- [ ] Verificar que seção ocupa exatamente 1 viewport
- [ ] Verificar que desktop não foi afetado
- [ ] Verificar que layout está visualmente agradável

---

## ✅ Critérios de Sucesso

1. ✅ Título tem mesmo tamanho da seção "Nossos Serviços" (`text-2xl`)
2. ✅ Botões estão em grid de 2 colunas com mesmo tamanho (mobile)
3. ✅ Seção ocupa exatamente 1 viewport (`h-[calc(100vh-4rem)]`)
4. ✅ Imagem e cards foram reduzidos proporcionalmente
5. ✅ Desktop completamente intacto (nenhuma alteração)
6. ✅ Layout visualmente agradável e funcional

---

## 📱 Testes Recomendados

### Dispositivos Mobile
- iPhone SE (375px x 667px)
- iPhone 12/13/14 (390px x 844px)
- iPhone 14 Pro Max (430px x 932px)
- Samsung Galaxy S21 (360px x 800px)

### Verificações Mobile
1. Título tem tamanho `text-2xl` (igual à seção anterior)
2. Botões estão lado a lado em grid de 2 colunas
3. Botões têm mesma altura e largura
4. Seção ocupa exatamente 1 viewport (sem scroll interno)
5. Imagem está proporcionalmente menor
6. Cards estão mais compactos
7. Layout não quebra em telas pequenas

### Verificações Desktop
1. Desktop mantém comportamento original
2. Nenhuma alteração visual
3. Layout grid funciona corretamente
4. Botões mantêm layout vertical

---

## 🚀 Próximos Passos

Após autorização:
1. Ajustar tamanho do título (mobile)
2. Alterar altura da seção para fixa (mobile)
3. Reduzir tamanho da imagem (mobile)
4. Reduzir padding dos cards (mobile)
5. Reorganizar botões em grid de 2 colunas (mobile)
6. Testar em diferentes dispositivos
7. Validar que desktop não foi afetado
8. Ajustes finos se necessário

---

## 📊 Comparação: Antes vs Depois

### Título
| Propriedade | Antes | Depois |
|-------------|-------|--------|
| Mobile | `text-base` (16px) | `text-2xl` (24px) |
| Desktop | `sm:text-lg lg:text-xl` | `sm:text-lg lg:text-xl` (mantido) |

### Seção
| Propriedade | Antes | Depois |
|-------------|-------|--------|
| Mobile | `min-h-[calc(100vh-4rem)]` | `h-[calc(100vh-4rem)]` |
| Desktop | `sm:h-screen` | `sm:h-screen` (mantido) |

### Imagem
| Propriedade | Antes | Depois |
|-------------|-------|--------|
| Mobile | `max-w-[280px]` | `max-w-[200px]` |
| Desktop | `sm:max-w-sm lg:max-w-[65%]` | `sm:max-w-sm lg:max-w-[65%]` (mantido) |

### Botões
| Propriedade | Antes | Depois |
|-------------|-------|--------|
| Layout Mobile | `flex-col` (vertical) | `grid grid-cols-2` (horizontal) |
| Padding Mobile | `py-8` | `py-4` |
| Gap Mobile | `gap-6` | `gap-3` |
| Desktop | `sm:flex sm:flex-col` | `sm:flex sm:flex-col` (mantido) |

---

**Data de Criação**: 2025-01-13  
**Versão**: 1.0  
**Status**: Aguardando autorização para implementação

