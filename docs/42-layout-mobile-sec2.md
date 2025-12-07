# Documentação: 3 Propostas de Layout Mobile - Seção 2 (OpenMenuIntro)

## 📋 Visão Geral

Este documento apresenta **3 propostas diferentes de layout** para a segunda seção do site (OpenMenuIntro - "O que é a Estação do Grão?") na versão mobile. Cada proposta reorganiza o conteúdo de forma diferente para otimizar o uso do viewport e melhorar a experiência do usuário.

**Importante**: Todas as alterações são aplicadas **APENAS para a versão mobile** (breakpoint < 640px), preservando o comportamento desktop.

---

## 🎯 Objetivo

Criar um layout mobile otimizado que:
- ✅ Caiba confortavelmente no viewport
- ✅ Seja visualmente apresentável
- ✅ Mantenha toda a informação importante
- ✅ Tenha boa hierarquia visual
- ✅ Seja fácil de navegar

---

## 📐 Análise do Conteúdo Atual

### Elementos da Seção

1. **Título H2**: "O que é a Estação do Grão?"
2. **Subtítulo**: "O café do seu evento precisa ser inesquecível."
3. **Parágrafo descritivo**: Texto longo sobre a empresa
4. **Lista de 3 itens**: 
   - Coffee station completa
   - Branding com café
   - Equipe de baristas profissionais
5. **2 Botões**: "Ver serviços" e "Solicitar orçamento"
6. **Vídeo vertical**: Aspect ratio 9/16 (portrait)

### Problemas Atuais em Mobile

- Conteúdo muito extenso verticalmente
- Vídeo ocupa muito espaço
- Texto pode ficar difícil de ler
- Botões podem ficar espremidos
- Não otimizado para viewport mobile

---

## 🎨 PROPOSTA 1: Layout Compacto Vertical (Vídeo no Topo)

### Conceito
Vídeo em destaque no topo, seguido de todo o conteúdo textual empilhado verticalmente de forma compacta.

### Estrutura Visual

```
┌─────────────────────────────┐
│                             │
│      VÍDEO (Compacto)       │
│    (aspect 16/9 ou 4/3)     │
│                             │
├─────────────────────────────┤
│  Título H2                  │
│  Subtítulo                  │
│  Parágrafo (texto menor)    │
│  • Item 1                   │
│  • Item 2                   │
│  • Item 3                   │
│  [Botão 1] [Botão 2]        │
└─────────────────────────────┘
```

### Características

- **Vídeo no topo**: Primeira coisa que o usuário vê
- **Aspect ratio alterado**: De 9/16 (portrait) para 16/9 ou 4/3 (landscape) em mobile
- **Conteúdo compacto**: Texto reduzido, espaçamentos menores
- **Botões empilhados**: Um embaixo do outro para melhor usabilidade
- **Altura total**: Aproximadamente 1 viewport (100vh)

### Mudanças Propostas

#### Container Principal
```tsx
// Mobile: Stack vertical simples
<section className="min-h-screen sm:h-screen py-6 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full">
  <div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 box-border">
```

#### Vídeo (Topo)
```tsx
{/* VÍDEO - Topo em mobile */}
<div className="relative w-full order-1 sm:order-2">
  <div className="aspect-[16/9] sm:aspect-[9/16] md:max-h-[80vh] overflow-hidden rounded-xl border border-coffee-700 bg-black/40 w-full max-w-full">
    {/* Vídeo */}
  </div>
</div>
```

#### Conteúdo Textual (Abaixo do vídeo)
```tsx
{/* CONTEÚDO - Abaixo do vídeo em mobile */}
<div className="order-2 sm:order-1 space-y-3">
  <h2 className="text-lg sm:text-2xl md:text-3xl font-montserrat font-bold tracking-tight">
    O que é a Estação do Grão?
  </h2>
  
  <p className="text-sm sm:text-lg md:text-xl text-coffee-500 font-semibold text-center sm:text-left">
    O café do seu evento precisa ser inesquecível.
  </p>
  
  <p className="text-xs sm:text-base text-cream-50/90 leading-relaxed text-justify hyphens-none">
    {/* Texto descritivo */}
  </p>
  
  <ul className="space-y-1.5">
    {/* Lista compacta */}
  </ul>
  
  <div className="flex flex-col gap-2 sm:flex-row sm:gap-2.5">
    {/* Botões empilhados em mobile */}
  </div>
</div>
```

### Vantagens
- ✅ Vídeo em destaque imediato
- ✅ Layout simples e direto
- ✅ Fácil de implementar
- ✅ Boa hierarquia visual

### Desvantagens
- ⚠️ Vídeo pode ocupar muito espaço vertical
- ⚠️ Conteúdo textual pode ficar muito comprimido

---

## 🎨 PROPOSTA 2: Layout Dividido Horizontal (Vídeo e Texto Lado a Lado)

### Conceito
Vídeo e conteúdo textual divididos horizontalmente, cada um ocupando aproximadamente metade da altura do viewport.

### Estrutura Visual

```
┌─────────────────────────────┐
│  Título H2                  │
│  Subtítulo                   │
│  Parágrafo (texto menor)     │
│  • Item 1                    │
│  • Item 2                    │
│  • Item 3                    │
│  [Botão 1] [Botão 2]         │
├─────────────────────────────┤
│                             │
│      VÍDEO (Compacto)       │
│    (aspect 16/9 ou 4/3)     │
│                             │
└─────────────────────────────┘
```

### Características

- **Texto primeiro**: Informação antes do vídeo
- **Vídeo compacto**: Aspect ratio alterado para landscape
- **Divisão clara**: Texto na metade superior, vídeo na inferior
- **Altura otimizada**: Cada seção ~50vh
- **Botões inline**: Lado a lado se couber, senão empilhados

### Mudanças Propostas

#### Container Principal
```tsx
<section className="min-h-screen sm:h-screen py-6 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full">
  <div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 box-border">
```

#### Conteúdo Textual (Topo)
```tsx
{/* CONTEÚDO - Topo em mobile */}
<div className="order-1 sm:order-1 space-y-2.5 min-h-[50vh] flex flex-col justify-center">
  <h2 className="text-lg sm:text-2xl md:text-3xl font-montserrat font-bold tracking-tight">
    O que é a Estação do Grão?
  </h2>
  
  <p className="text-sm sm:text-lg md:text-xl text-coffee-500 font-semibold text-center sm:text-left">
    O café do seu evento precisa ser inesquecível.
  </p>
  
  <p className="text-xs sm:text-base text-cream-50/90 leading-relaxed text-justify hyphens-none line-clamp-4">
    {/* Texto descritivo truncado */}
  </p>
  
  <ul className="space-y-1 text-xs">
    {/* Lista muito compacta */}
  </ul>
  
  <div className="flex flex-wrap gap-2">
    {/* Botões */}
  </div>
</div>
```

#### Vídeo (Base)
```tsx
{/* VÍDEO - Base em mobile */}
<div className="relative w-full order-2 sm:order-2 min-h-[40vh]">
  <div className="aspect-[16/9] sm:aspect-[9/16] overflow-hidden rounded-xl border border-coffee-700 bg-black/40 w-full max-w-full">
    {/* Vídeo */}
  </div>
</div>
```

### Vantagens
- ✅ Informação textual primeiro (melhor para SEO e leitura)
- ✅ Vídeo como complemento visual
- ✅ Divisão clara de conteúdo
- ✅ Otimizado para viewport

### Desvantagens
- ⚠️ Texto pode precisar ser truncado
- ⚠️ Vídeo pode ficar muito pequeno
- ⚠️ Pode precisar de scroll leve

---

## 🎨 PROPOSTA 3: Layout Focado em Conteúdo (Texto Expandido, Vídeo Pequeno)

### Conceito
Prioriza o conteúdo textual com mais espaço, vídeo menor e posicionado estrategicamente.

### Estrutura Visual

```
┌─────────────────────────────┐
│  Título H2                  │
│  Subtítulo                   │
│  Parágrafo (texto completo)  │
│                             │
│  ┌──────────┐               │
│  │  VÍDEO   │  • Item 1     │
│  │ (Pequeno)│  • Item 2     │
│  └──────────┘  • Item 3     │
│                             │
│  [Botão 1] [Botão 2]        │
└─────────────────────────────┘
```

### Características

- **Texto completo**: Parágrafo não truncado
- **Vídeo pequeno**: Aspect ratio compacto, posicionado ao lado da lista
- **Layout híbrido**: Vídeo e lista lado a lado
- **Foco em informação**: Conteúdo textual em destaque
- **Altura flexível**: Pode ultrapassar 100vh se necessário

### Mudanças Propostas

#### Container Principal
```tsx
<section className="min-h-screen sm:h-screen py-6 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full">
  <div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 box-border">
```

#### Conteúdo Textual (Expandido)
```tsx
{/* CONTEÚDO - Expandido em mobile */}
<div className="order-1 sm:order-1 space-y-3">
  <h2 className="text-lg sm:text-2xl md:text-3xl font-montserrat font-bold tracking-tight">
    O que é a Estação do Grão?
  </h2>
  
  <p className="text-sm sm:text-lg md:text-xl text-coffee-500 font-semibold text-center sm:text-left">
    O café do seu evento precisa ser inesquecível.
  </p>
  
  <p className="text-xs sm:text-base text-cream-50/90 leading-relaxed text-justify hyphens-none">
    {/* Texto descritivo completo */}
  </p>
  
  {/* Layout híbrido: Vídeo + Lista lado a lado */}
  <div className="grid grid-cols-[1fr_1.5fr] gap-3 items-start">
    {/* Vídeo pequeno */}
    <div className="relative w-full">
      <div className="aspect-[9/16] overflow-hidden rounded-xl border border-coffee-700 bg-black/40">
        {/* Vídeo */}
      </div>
    </div>
    
    {/* Lista */}
    <ul className="space-y-1.5">
      {/* Lista de itens */}
    </ul>
  </div>
  
  <div className="flex flex-wrap gap-2">
    {/* Botões */}
  </div>
</div>
```

#### Vídeo (Pequeno, ao lado da lista)
```tsx
{/* VÍDEO - Pequeno, dentro do grid */}
<div className="relative w-full">
  <div className="aspect-[9/16] max-h-[200px] overflow-hidden rounded-xl border border-coffee-700 bg-black/40">
    {/* Vídeo */}
  </div>
</div>
```

### Vantagens
- ✅ Texto completo e legível
- ✅ Vídeo não domina o layout
- ✅ Layout criativo e diferenciado
- ✅ Boa hierarquia de informação

### Desvantagens
- ⚠️ Vídeo pode ficar muito pequeno
- ⚠️ Layout mais complexo de implementar
- ⚠️ Pode precisar de mais espaço vertical

---

## 📊 Comparação das 3 Propostas

| Característica | Proposta 1 | Proposta 2 | Proposta 3 |
|----------------|------------|------------|------------|
| **Ordem do conteúdo** | Vídeo → Texto | Texto → Vídeo | Texto → Vídeo+Lista |
| **Tamanho do vídeo** | Médio (16/9) | Médio (16/9) | Pequeno (9/16) |
| **Espaço para texto** | Médio | Médio | Grande |
| **Altura total** | ~100vh | ~100vh | ~120vh |
| **Complexidade** | Baixa | Média | Alta |
| **Foco principal** | Vídeo | Texto | Texto |
| **Scroll necessário** | Mínimo | Mínimo | Leve |

---

## 🎯 Recomendações por Objetivo

### Se o objetivo é **impacto visual imediato**
→ **Proposta 1** (Vídeo no topo)

### Se o objetivo é **informação primeiro**
→ **Proposta 2** (Texto primeiro, vídeo depois)

### Se o objetivo é **conteúdo completo e legível**
→ **Proposta 3** (Texto expandido, vídeo pequeno)

---

## 📝 Detalhamento Técnico por Proposta

### PROPOSTA 1: Layout Compacto Vertical

#### Classes Tailwind Principais

```tsx
// Container
className="flex flex-col gap-4"

// Vídeo
className="aspect-[16/9] sm:aspect-[9/16] order-1 sm:order-2"

// Conteúdo
className="order-2 sm:order-1 space-y-3"

// Título
className="text-lg sm:text-2xl font-bold"

// Texto
className="text-xs sm:text-base"

// Botões
className="flex flex-col gap-2 sm:flex-row"
```

#### Espaçamentos Mobile

- Gap entre seções: `gap-4` (16px)
- Espaçamento interno texto: `space-y-3` (12px)
- Padding container: `px-3` (12px)
- Padding vertical seção: `py-6` (24px)

---

### PROPOSTA 2: Layout Dividido Horizontal

#### Classes Tailwind Principais

```tsx
// Container
className="flex flex-col gap-4"

// Conteúdo (topo)
className="min-h-[50vh] flex flex-col justify-center space-y-2.5"

// Texto truncado
className="line-clamp-4"

// Vídeo (base)
className="min-h-[40vh] aspect-[16/9]"

// Botões
className="flex flex-wrap gap-2"
```

#### Espaçamentos Mobile

- Altura conteúdo: `min-h-[50vh]` (50% viewport)
- Altura vídeo: `min-h-[40vh]` (40% viewport)
- Gap entre seções: `gap-4` (16px)
- Espaçamento interno: `space-y-2.5` (10px)

---

### PROPOSTA 3: Layout Focado em Conteúdo

#### Classes Tailwind Principais

```tsx
// Container
className="flex flex-col gap-4"

// Grid híbrido
className="grid grid-cols-[1fr_1.5fr] gap-3"

// Vídeo pequeno
className="aspect-[9/16] max-h-[200px]"

// Lista
className="space-y-1.5"

// Botões
className="flex flex-wrap gap-2"
```

#### Espaçamentos Mobile

- Grid: `grid-cols-[1fr_1.5fr]` (vídeo 40%, lista 60%)
- Gap grid: `gap-3` (12px)
- Altura máxima vídeo: `max-h-[200px]`
- Espaçamento interno: `space-y-3` (12px)

---

## 🔧 Implementação Técnica

### Estrutura Base (Todas as Propostas)

```tsx
<section 
  id="apresentacao" 
  className="min-h-screen sm:h-screen py-6 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full"
>
  <div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 box-border">
    {/* Conteúdo específico de cada proposta */}
  </div>
</section>
```

### Elementos Comuns (Todas as Propostas)

#### Título H2
```tsx
<h2 className="text-lg sm:text-2xl md:text-3xl font-montserrat font-bold tracking-tight">
  O que é a Estação do Grão?
</h2>
```

#### Subtítulo
```tsx
<p className="text-sm sm:text-lg md:text-xl text-coffee-500 font-semibold text-center sm:text-left">
  O café do seu evento precisa ser inesquecível.
</p>
```

#### Parágrafo Descritivo
```tsx
<p className="text-xs sm:text-base text-cream-50/90 leading-relaxed text-justify hyphens-none">
  A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma {/* ... */}
</p>
```

#### Lista de Itens
```tsx
<ul className="space-y-1.5">
  {[
    'Coffee station completa (espresso, cappuccino, latte, gelados)',
    'Branding com café: copos e estação personalizados',
    'Equipe de baristas profissionais e operação ágil',
  ].map((t) => (
    <li key={t} className="flex items-start gap-2">
      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-coffee-500 flex-shrink-0" />
      <span className="text-xs sm:text-base text-cream-50/90 font-montserrat">{t}</span>
    </li>
  ))}
</ul>
```

#### Botões
```tsx
<div className="flex flex-col gap-2 sm:flex-row sm:gap-2.5">
  <a 
    href="#servicos" 
    className="px-4 py-2.5 rounded-xl border border-coffee-500 text-cream-50 hover:bg-coffee-700/30 transition-colors font-montserrat text-center text-sm"
  >
    Ver serviços
  </a>
  <a 
    href="#contato" 
    className="px-4 py-2.5 rounded-xl bg-coffee-500 text-coffee-900 font-semibold hover:bg-coffee-700 hover:text-white transition-colors font-montserrat text-center text-sm"
  >
    Solicitar orçamento
  </a>
</div>
```

---

## 📱 Considerações Mobile

### Viewport Típico
- Altura: ~667px (iPhone SE) a ~932px (iPhone 14 Pro Max)
- Largura: 360px a 430px
- Safe area: Considerar notches e barras de navegação

### Otimizações Necessárias

1. **Vídeo**:
   - Lazy loading
   - Poster image otimizado
   - Controle de som acessível
   - Auto-play apenas se necessário

2. **Texto**:
   - Tamanho mínimo legível (12px)
   - Line-height adequado (1.5-1.6)
   - Contraste suficiente (WCAG AA)

3. **Botões**:
   - Tamanho mínimo de toque (44x44px)
   - Espaçamento adequado entre botões
   - Feedback visual claro

4. **Performance**:
   - Imagens otimizadas
   - Vídeo comprimido
   - CSS otimizado

---

## ✅ Checklist de Implementação (Após Escolha)

### Fase 1: Preparação
- [ ] Escolher proposta (1, 2 ou 3)
- [ ] Revisar estrutura HTML atual
- [ ] Identificar elementos a modificar

### Fase 2: Implementação Base
- [ ] Ajustar container principal
- [ ] Reorganizar ordem dos elementos
- [ ] Aplicar classes responsivas mobile

### Fase 3: Vídeo
- [ ] Ajustar aspect ratio mobile
- [ ] Posicionar vídeo conforme proposta
- [ ] Testar controles e acessibilidade

### Fase 4: Conteúdo Textual
- [ ] Ajustar tamanhos de fonte
- [ ] Aplicar espaçamentos
- [ ] Otimizar lista de itens

### Fase 5: Botões
- [ ] Posicionar conforme proposta
- [ ] Ajustar tamanhos e espaçamentos
- [ ] Testar usabilidade

### Fase 6: Validação
- [ ] Testar em diferentes dispositivos (360px, 375px, 414px)
- [ ] Verificar altura do viewport
- [ ] Validar legibilidade
- [ ] Testar interações
- [ ] Verificar desktop não afetado

---

## 🎨 Mockups Visuais (Descrição)

### Proposta 1: Compacto Vertical
```
┌─────────────────────────┐
│                         │
│    [VÍDEO 16:9]         │
│    (Altura: ~200px)     │
│                         │
├─────────────────────────┤
│ O que é a Estação...    │
│                         │
│ O café do seu evento... │
│                         │
│ A Estação do Grão é...  │
│                         │
│ • Coffee station...      │
│ • Branding com café...   │
│ • Equipe de baristas...  │
│                         │
│ [Ver serviços]          │
│ [Solicitar orçamento]   │
└─────────────────────────┘
```

### Proposta 2: Dividido Horizontal
```
┌─────────────────────────┐
│ O que é a Estação...    │
│                         │
│ O café do seu evento... │
│                         │
│ A Estação do Grão é...  │
│ (texto truncado)        │
│                         │
│ • Coffee station...      │
│ • Branding...            │
│ • Equipe...              │
│                         │
│ [Ver] [Solicitar]       │
├─────────────────────────┤
│                         │
│    [VÍDEO 16:9]         │
│    (Altura: ~250px)     │
│                         │
└─────────────────────────┘
```

### Proposta 3: Focado em Conteúdo
```
┌─────────────────────────┐
│ O que é a Estação...    │
│                         │
│ O café do seu evento... │
│                         │
│ A Estação do Grão é uma │
│ estação de café gourmet │
│ pensada para eventos... │
│ (texto completo)        │
│                         │
│ ┌────┐ • Coffee station │
│ │VÍD │ • Branding...    │
│ │EO  │ • Equipe...      │
│ └────┘                  │
│                         │
│ [Ver] [Solicitar]       │
└─────────────────────────┘
```

---

## 🔍 Arquivos Afetados

```
components/
└── OpenMenuIntro.tsx      → Estrutura completa do layout
```

---

## 📊 Métricas de Sucesso

### Proposta 1
- ✅ Altura total: ≤ 100vh
- ✅ Vídeo visível sem scroll
- ✅ Texto legível
- ✅ Botões acessíveis

### Proposta 2
- ✅ Altura total: ≤ 100vh
- ✅ Texto visível sem scroll
- ✅ Vídeo visível com scroll mínimo
- ✅ Informação completa

### Proposta 3
- ✅ Texto completo legível
- ✅ Vídeo acessível
- ✅ Layout criativo
- ✅ Altura: ≤ 120vh (aceitável)

---

## 🚀 Próximos Passos

Após escolha da proposta:

1. **Implementar estrutura base**
2. **Ajustar vídeo conforme proposta**
3. **Otimizar conteúdo textual**
4. **Posicionar botões**
5. **Testar em dispositivos reais**
6. **Ajustes finos conforme feedback**

---

## 💡 Sugestões Adicionais

### Para todas as propostas:

1. **Adicionar animação suave** no scroll
2. **Lazy load do vídeo** para performance
3. **Otimizar imagens** do poster
4. **Considerar dark mode** (se aplicável)
5. **Adicionar indicador de scroll** (se necessário)

---

**Data de Criação**: 2025-01-13  
**Versão**: 1.0  
**Status**: Aguardando escolha da proposta e autorização para implementação

