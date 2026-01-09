# Estratégia Tipográfica Premium - Estação do Grão

## 📋 Visão Geral

Este documento detalha a estratégia de implementação de fontes **Satoshi** e **Inter** para substituir **Montserrat**, elevando a identidade visual da Estação do Grão a um nível premium, alinhado com marcas como Nespresso, Apple e Airbnb.

---

## 🎯 Análise das Sugestões Recebidas

### ✅ Pontos Fortes da Proposta

1. **Hierarquia clara**: Satoshi para títulos (personalidade) + Inter para textos (legibilidade)
2. **Contraste tipográfico**: Cria diferenciação visual elegante
3. **Sistema de pesos bem definido**: Evita sobrecarga visual
4. **Letter-spacing estratégico**: Adiciona sofisticação aos botões e menus

### 🔄 Adaptações Necessárias para o Projeto

1. **Satoshi não está no Google Fonts**: Precisa ser adicionada via fonte local ou CDN
2. **Compatibilidade com sistema de layouts**: Manter responsividade em laydesk1, laydesk2, laydesk3
3. **Migração gradual**: Substituir `.font-montserrat` sem quebrar o layout
4. **Performance**: Garantir carregamento otimizado das fontes

---

## 🎨 Estratégia Tipográfica Final

### Hierarquia de Uso

| Elemento | Fonte | Peso | Caixa | Letter-spacing | Uso |
|----------|-------|------|-------|----------------|-----|
| **H1 (Hero)** | Satoshi | Bold (700) | Normal | -0.01em | Título principal |
| **H2 (Seções)** | Satoshi | Medium (500) ou Bold (700) | Normal | -0.01em | Títulos de seção |
| **H3 (Subseções)** | Satoshi | Medium (500) | Normal | 0 | Subtítulos |
| **Subtítulos** | Inter | Regular (400) | Normal | 0.01em | Texto de apoio |
| **Parágrafos** | Inter | Regular (400) | Normal | 0 | Conteúdo principal |
| **Botões CTA** | Inter | Light (300) | UPPERCASE | 0.16em | Ações principais |
| **Menus/Navegação** | Inter | Regular (400) | UPPERCASE | 0.08em | Links de navegação |
| **Labels/Formulários** | Inter | Regular (400) | Normal | 0 | Campos de formulário |

---

## 🔧 Implementação Técnica

### Passo 1: Adicionar Satoshi ao Projeto

**Opção A: Via CDN (Mais Rápido)**
```tsx
// app/layout.tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous">
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap" rel="stylesheet">
</head>
```

**Opção B: Via Fonte Local (Melhor Performance)**
1. Baixar Satoshi de [Fontshare](https://www.fontshare.com/fonts/satoshi) ou [CDN Fonts](https://www.cdnfonts.com/satoshi.font)
2. Adicionar arquivos `.woff2` em `public/fonts/satoshi/`
3. Usar `@font-face` no CSS

**Recomendação:** Opção A para início (rápido), migrar para Opção B depois (performance).

---

### Passo 2: Atualizar `app/layout.tsx`

```tsx
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Inter já está configurado, apenas garantir todos os pesos necessários
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"], // Adicionar Light (300)
  display: "swap",
})

// Satoshi será carregada via CDN ou @font-face
// Variável CSS será definida no globals.css

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth overflow-x-hidden`}>
      <head>
        {/* Satoshi via Fontshare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com">
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap" rel="stylesheet" />
        
        {/* ... resto do head ... */}
      </head>
      <body className="font-sans bg-coffee-900 text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
```

---

### Passo 3: Atualizar `app/globals.css`

```css
/* Coffee Theme - Premium Dark Aesthetic */
@theme inline {
  /* Fontes */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-serif: "Playfair Display", Georgia, serif;
  --font-mono: "Fira Code", monospace;
  
  /* NOVO: Satoshi para títulos */
  --font-satoshi: "Satoshi", system-ui, sans-serif;
  
  /* Variáveis para Next.js font optimization */
  --font-inter: var(--font-inter);
  --font-satoshi: var(--font-satoshi);
  
  /* ... resto dos tokens ... */
}

/* NOVO: Classe utilitária para Satoshi */
.font-satoshi {
  font-family: var(--font-satoshi), system-ui, sans-serif;
}

/* DEPRECATED: Manter temporariamente para migração gradual */
.font-montserrat {
  font-family: var(--font-satoshi), system-ui, sans-serif; /* Migrar para Satoshi */
}
```

---

### Passo 4: Criar Sistema de Classes Utilitárias

**Arquivo:** `app/globals.css` (adicionar após as definições de tema)

```css
/* ============================================
   SISTEMA TIPOGRÁFICO PREMIUM
   Satoshi + Inter
   ============================================ */

/* Títulos - Satoshi */
h1, .font-heading {
  font-family: var(--font-satoshi), system-ui, sans-serif;
  font-weight: 700;
  letter-spacing: -0.01em;
}

h2 {
  font-family: var(--font-satoshi), system-ui, sans-serif;
  font-weight: 500; /* Medium - pode usar 700 para mais impacto */
  letter-spacing: -0.01em;
}

h3 {
  font-family: var(--font-satoshi), system-ui, sans-serif;
  font-weight: 500; /* Medium */
  letter-spacing: 0;
}

/* Subtítulos - Inter */
.subtitle,
.text-subtitle {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-weight: 400;
  letter-spacing: 0.01em;
}

/* Textos - Inter */
body, p, .text-body {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
}

/* Botões CTA - Inter Light Uppercase */
.button-cta,
.btn-primary {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-weight: 300; /* Light */
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.85rem;
}

/* Menus/Navegação - Inter Regular Uppercase */
.menu-item,
.nav-link {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.9rem;
}

/* Labels/Formulários - Inter Regular */
label,
.input-label {
  font-family: var(--font-inter), system-ui, sans-serif;
  font-weight: 400;
  letter-spacing: 0;
}
```

---

## 📝 Migração de Componentes

### Mapeamento de Substituições

| Componente | Uso Atual | Nova Fonte | Ação |
|------------|-----------|------------|------|
| **Hero H1** | `font-montserrat font-extrabold uppercase` | Satoshi Bold | Substituir classe |
| **Títulos de Seção (H2)** | `font-montserrat font-bold` | Satoshi Medium/Bold | Substituir classe |
| **Subtítulos de Cards** | `font-montserrat font-medium` | Inter Regular | Substituir classe |
| **Parágrafos** | `font-montserrat` | Inter Regular | Substituir classe |
| **Botões CTA** | `font-montserrat font-semibold` | Inter Light Uppercase | Substituir + adicionar letter-spacing |
| **Menu Header** | `font-montserrat` | Inter Regular Uppercase | Substituir + adicionar letter-spacing |
| **Labels Formulário** | `font-montserrat` | Inter Regular | Substituir classe |

---

## 🎯 Implementação por Componente

### 1. Hero (`components/hero/Hero.tsx`)

**Antes:**
```tsx
<h1 className="font-montserrat text-cream-50 font-extrabold sm:font-bold tracking-tight uppercase">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Depois:**
```tsx
<h1 className="font-satoshi text-cream-50 font-bold tracking-tight">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Mudanças:**
- `font-montserrat` → `font-satoshi`
- `font-extrabold` → `font-bold` (Satoshi Bold = 700)
- Remover `uppercase` (usar sentence case conforme estratégia)

---

### 2. Títulos de Seção (`app/page.tsx`)

**Antes:**
```tsx
<h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cream-50 font-montserrat">
  Nossos Serviços
</h2>
```

**Depois:**
```tsx
<h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-cream-50 font-satoshi">
  Nossos Serviços
</h2>
```

**Mudanças:**
- `font-montserrat` → `font-satoshi`
- `font-bold` → `font-medium` (Satoshi Medium = 500)

---

### 3. Cards de Serviços (`components/sections/services-carousel.tsx`)

**Antes:**
```tsx
<h3 className="text-lg sm:text-xl font-semibold text-cream-50 font-montserrat">
  {card.title}
</h3>
<p className="text-xs sm:text-sm font-medium text-coffee-500 font-montserrat">
  {card.subtitle}
</p>
<p className="text-xs sm:text-sm text-cream-50/80 leading-relaxed font-montserrat">
  {card.description}
</p>
```

**Depois:**
```tsx
<h3 className="text-lg sm:text-xl font-medium text-cream-50 font-satoshi">
  {card.title}
</h3>
<p className="text-xs sm:text-sm font-normal text-coffee-500 font-inter tracking-wide">
  {card.subtitle}
</p>
<p className="text-xs sm:text-sm text-cream-50/80 leading-relaxed font-inter">
  {card.description}
</p>
```

**Mudanças:**
- Título: `font-montserrat font-semibold` → `font-satoshi font-medium`
- Subtítulo: `font-montserrat font-medium` → `font-inter font-normal` + `tracking-wide` (0.01em)
- Descrição: `font-montserrat` → `font-inter`

---

### 4. Botões CTA

**Antes:**
```tsx
<a className="inline-flex items-center justify-center px-5 py-2.5 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-semibold rounded-lg transition-colors font-montserrat">
  Solicitar orçamento
</a>
```

**Depois:**
```tsx
<a className="inline-flex items-center justify-center px-5 py-2.5 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-light uppercase tracking-[0.16em] rounded-lg transition-colors font-inter text-sm">
  Solicitar orçamento
</a>
```

**Mudanças:**
- `font-montserrat font-semibold` → `font-inter font-light`
- Adicionar `uppercase`
- Adicionar `tracking-[0.16em]` (letter-spacing: 0.16em)
- Adicionar `text-sm` (0.85rem ≈ 14px)

---

### 5. Menu de Navegação (`components/header.tsx`)

**Antes:**
```tsx
<a className="font-montserrat text-cream-50 hover:text-coffee-500">
  Serviços
</a>
```

**Depois:**
```tsx
<a className="font-inter text-cream-50 hover:text-coffee-500 uppercase tracking-[0.08em] text-sm">
  Serviços
</a>
```

**Mudanças:**
- `font-montserrat` → `font-inter`
- Adicionar `uppercase`
- Adicionar `tracking-[0.08em]`
- Adicionar `text-sm` (0.9rem ≈ 14px)

---

## ⚠️ Considerações Importantes

### 1. Satoshi - Fonte Local vs CDN

**CDN (Fontshare):**
- ✅ Rápido de implementar
- ✅ Sem necessidade de arquivos locais
- ❌ Dependência externa
- ❌ Pode ter latência

**Fonte Local:**
- ✅ Melhor performance
- ✅ Controle total
- ✅ Sem dependências externas
- ❌ Requer download e configuração

**Recomendação:** Começar com CDN, migrar para local depois.

---

### 2. Compatibilidade com Layouts Responsivos

**Importante:** Manter todas as classes responsivas existentes:
- `text-[clamp(...)]` para tamanhos fluidos
- `sm:`, `md:`, `lg:` para breakpoints
- Classes específicas de layout (laydesk1, laydesk2, laydesk3)

**Exemplo:**
```tsx
// Manter responsividade
<h1 className="font-satoshi font-bold !text-[clamp(1.375rem,7vw,1.75rem)] sm:!text-[clamp(1.75rem,2.8vw,2.5rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)]">
```

---

### 3. Performance e Carregamento

**Estratégia de Carregamento:**

1. **Preload Satoshi:**
```html
<link rel="preload" href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,600,700&display=swap" as="style" />
```

2. **Font-display: swap** (já incluído no CDN)

3. **Subset otimizado:** Usar apenas pesos necessários (300, 400, 500, 700)

---

### 4. Fallbacks

**Sistema de Fallback:**
```css
font-family: "Satoshi", "Inter", system-ui, sans-serif;
```

Se Satoshi não carregar, usa Inter. Se Inter não carregar, usa system-ui.

---

## 📊 Checklist de Implementação

### Fase 1: Setup Inicial
- [ ] Adicionar Satoshi via CDN ou fonte local
- [ ] Atualizar `app/layout.tsx` com link para Satoshi
- [ ] Adicionar variável CSS `--font-satoshi` em `globals.css`
- [ ] Criar classe utilitária `.font-satoshi`
- [ ] Adicionar peso Light (300) ao Inter

### Fase 2: Migração de Componentes
- [ ] Hero H1: Substituir Montserrat por Satoshi
- [ ] Títulos de seção (H2): Substituir Montserrat por Satoshi
- [ ] Títulos de cards (H3): Substituir Montserrat por Satoshi
- [ ] Subtítulos: Substituir Montserrat por Inter
- [ ] Parágrafos: Substituir Montserrat por Inter
- [ ] Botões CTA: Substituir Montserrat por Inter Light + uppercase + letter-spacing
- [ ] Menu/Navegação: Substituir Montserrat por Inter + uppercase + letter-spacing
- [ ] Labels/Formulários: Substituir Montserrat por Inter

### Fase 3: Ajustes Finais
- [ ] Remover `uppercase` de títulos longos (usar sentence case)
- [ ] Ajustar letter-spacing conforme necessário
- [ ] Testar em todos os layouts (laydesk1, laydesk2, laydesk3, mobile)
- [ ] Verificar legibilidade em diferentes tamanhos
- [ ] Validar performance (Lighthouse)

### Fase 4: Otimização (Opcional)
- [ ] Migrar Satoshi de CDN para fonte local
- [ ] Implementar subsetting de caracteres
- [ ] Adicionar preload para fontes críticas

---

## 🎨 Regras de Ouro (Brand Guidelines)

### ✅ DO (Fazer)

1. **Títulos sempre em Satoshi** - Cria identidade visual forte
2. **Textos sempre em Inter** - Garante legibilidade
3. **Botões em UPPERCASE** - Dá presença e sofisticação
4. **Letter-spacing generoso em botões** - 0.16em para CTA, 0.08em para menus
5. **Sentence case em textos longos** - Nunca caps lock em parágrafos
6. **Consistência absoluta** - Mesma fonte para mesmo tipo de elemento

### ❌ DON'T (Não Fazer)

1. **Nunca usar Bold em menus ou botões** - Usar Light (300) ou Regular (400)
2. **Nunca misturar Satoshi e Inter no mesmo elemento** - Escolher uma
3. **Nunca usar caps lock em textos longos** - Apenas em botões e menus curtos
4. **Nunca usar Montserrat depois da migração** - Manter apenas durante transição
5. **Nunca usar letter-spacing negativo em textos** - Apenas em títulos grandes

---

## 🔍 Análise de Impacto

### Componentes Afetados

**Total de ocorrências de `font-montserrat`:** ~93 (conforme grep)

**Componentes principais:**
1. `components/hero/Hero.tsx` - 1 ocorrência (H1)
2. `components/header.tsx` - 2 ocorrências (menu)
3. `components/sections/services-carousel.tsx` - 5 ocorrências (títulos, subtítulos, descrições)
4. `components/OpenMenuIntro.tsx` - 13 ocorrências
5. `components/audience.tsx` - 12 ocorrências
6. `components/split-screen-content.tsx` - 10 ocorrências
7. `components/footer.tsx` - 10 ocorrências
8. `components/contact.tsx` - 27 ocorrências (formulário)
9. `components/flipcard.tsx` - 13 ocorrências

---

## 📐 Especificações Técnicas Detalhadas

### Satoshi - Pesos e Uso

| Peso | Valor | Uso |
|------|-------|-----|
| Light | 300 | Não recomendado (Inter Light é melhor) |
| Regular | 400 | Não recomendado (usar Inter) |
| Medium | 500 | **H2, H3** (títulos de seção) |
| Semibold | 600 | Opcional para H2 com mais impacto |
| Bold | 700 | **H1** (título principal) |

### Inter - Pesos e Uso

| Peso | Valor | Uso |
|------|-------|-----|
| Light | 300 | **Botões CTA** (uppercase) |
| Regular | 400 | **Parágrafos, subtítulos, menus, labels** |
| Medium | 500 | Opcional para destaque em textos |
| Semibold | 600 | Não recomendado (muito pesado) |
| Bold | 700 | Não recomendado (usar Satoshi) |

---

## 🎯 Exemplos Práticos

### Hero Title
```tsx
// Antes
<h1 className="font-montserrat font-extrabold uppercase">
  Café Gourmet e Baristas para Eventos
</h1>

// Depois
<h1 className="font-satoshi font-bold">
  Café Gourmet e Baristas para Eventos
</h1>
```

### Card Title + Subtitle
```tsx
// Antes
<h3 className="font-montserrat font-semibold">Café para Empresas</h3>
<p className="font-montserrat font-medium">Experiências para times</p>

// Depois
<h3 className="font-satoshi font-medium">Café para Empresas</h3>
<p className="font-inter font-normal tracking-wide">Experiências para times</p>
```

### Button CTA
```tsx
// Antes
<button className="font-montserrat font-semibold">
  Solicitar orçamento
</button>

// Depois
<button className="font-inter font-light uppercase tracking-[0.16em] text-sm">
  Solicitar orçamento
</button>
```

### Navigation Menu
```tsx
// Antes
<a className="font-montserrat">Serviços</a>

// Depois
<a className="font-inter uppercase tracking-[0.08em] text-sm">Serviços</a>
```

---

## 🚀 Estratégia de Rollout

### Opção 1: Migração Completa (Recomendada)
- Implementar tudo de uma vez
- Testar em staging
- Deploy em produção
- **Vantagem:** Consistência imediata
- **Desvantagem:** Mudança visual grande de uma vez

### Opção 2: Migração Gradual
- Fase 1: Hero e títulos principais
- Fase 2: Cards e seções
- Fase 3: Menus e botões
- Fase 4: Formulários e rodapé
- **Vantagem:** Mudanças incrementais
- **Desvantagem:** Inconsistência temporária

**Recomendação:** Opção 1 (Migração Completa) para manter identidade visual consistente.

---

## 📱 Responsividade e Layouts

### Manter Compatibilidade

Todas as classes responsivas devem ser mantidas:

```tsx
// Exemplo: Hero mantém responsividade
<h1 className="
  font-satoshi font-bold
  !text-[clamp(1.375rem,7vw,1.75rem)] 
  sm:!text-[clamp(1.75rem,2.8vw,2.5rem)] 
  lg:!text-[clamp(2.5rem,2.5vw,3rem)]
">
```

### Ajustes por Layout

**Laydesk1, Laydesk2, Laydesk3:**
- Manter todos os ajustes de tamanho existentes
- Apenas trocar `font-montserrat` por `font-satoshi` ou `font-inter`
- Não alterar `font-size` ou `line-height` (já otimizados)

---

## 🎨 Resultado Visual Esperado

### Antes (Montserrat)
- Visual genérico, comum em muitos sites
- Sem diferenciação tipográfica
- Identidade visual menos marcante

### Depois (Satoshi + Inter)
- **Visual premium e moderno**
- **Hierarquia clara** entre títulos e textos
- **Identidade sólida** alinhada com marcas premium
- **Legibilidade otimizada** em todos os tamanhos
- **Consistência** em todo o material (site, eventos, copos, cardápios)

---

## 🔗 Referências e Recursos

### Fontes
- **Satoshi:** [Fontshare](https://www.fontshare.com/fonts/satoshi) | [CDN Fonts](https://www.cdnfonts.com/satoshi.font)
- **Inter:** [Google Fonts](https://fonts.google.com/specimen/Inter) | Já configurado no projeto

### Documentação
- **Next.js Font Optimization:** [Documentação](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- **Tailwind Typography:** [Documentação](https://tailwindcss.com/docs/font-family)

### Inspiração
- **Nespresso:** Usa tipografia premium com hierarquia clara
- **Apple:** Inter como fonte principal, elegante e legível
- **Airbnb:** Combinação de fontes com personalidade e legibilidade

---

## 📋 Checklist Final de Validação

Após implementação, verificar:

- [ ] Satoshi carregando corretamente (DevTools → Network)
- [ ] Inter carregando corretamente (já configurado)
- [ ] Títulos usando Satoshi (inspecionar elementos)
- [ ] Textos usando Inter (inspecionar elementos)
- [ ] Botões em uppercase com letter-spacing correto
- [ ] Menus em uppercase com letter-spacing correto
- [ ] Sem quebras de layout em nenhum breakpoint
- [ ] Performance mantida (Lighthouse score)
- [ ] Legibilidade preservada em todos os tamanhos
- [ ] Consistência visual em todo o site
- [ ] Testado em laydesk1, laydesk2, laydesk3 e mobile

---

## 💡 Notas Finais

### Por que essa estratégia funciona?

1. **Satoshi para títulos:** Cria personalidade e impacto visual imediato
2. **Inter para textos:** Garante legibilidade perfeita em qualquer contexto
3. **Hierarquia clara:** Usuário entende imediatamente o que é importante
4. **Consistência:** Mesma linguagem visual em todo o material da marca

### Próximos Passos (Após Implementação)

1. **Criar Brand Guide PDF** com especificações tipográficas
2. **Aplicar em materiais offline** (cardápios, copos, eventos)
3. **Documentar para equipe** de design e desenvolvimento
4. **Criar tokens de design** para uso em outras plataformas

---

**Última atualização:** Data da criação deste documento  
**Status:** Aguardando aprovação para implementação  
**Prioridade:** Alta - Impacto significativo na identidade visual

