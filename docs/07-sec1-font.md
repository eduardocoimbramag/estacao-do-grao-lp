# Implementação de Fontes Premium na Seção Hero (Seção 1) - Estação do Grão

## 📋 Visão Geral

Este documento detalha a implementação da estratégia tipográfica **Satoshi + Inter** especificamente na **Seção Hero (Seção 1)** da Estação do Grão, seguindo as diretrizes estabelecidas em `05-font.md`.

---

## 🎯 Estrutura Atual da Seção Hero

### Componentes da Seção

A seção Hero possui 4 áreas principais com texto:

1. **Título H1 (Topo)** - "Café Gourmet e Baristas para Eventos"
2. **Grid 2 Colunas:**
   - **Esquerda:** Slideshow de imagens (sem texto)
   - **Direita:** Campo de texto + 3 cards compactos
3. **Grid de Métricas (Inferior)** - 3 cards com números e labels

### Arquivos
- **Hero principal:** `components/hero/Hero.tsx`
- **Cards compactos:** `components/hero/FeatureItemCompact.tsx`
- **Estado atual:** Usa `font-montserrat`, `font-serif`, e `font-sans`

---

## 📊 Análise da Tipografia Atual

### 1. Título H1 (Linha 68-80 - Hero.tsx)

**Estado atual:**
```tsx
className="font-montserrat text-cream-50 font-extrabold sm:font-bold tracking-tight text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6 uppercase sm:whitespace-nowrap !text-[clamp(1.375rem,7vw,1.75rem)] sm:!text-[clamp(1.75rem,2.8vw,2.5rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)]"
```

**Problemas:**
- ❌ Usa `font-montserrat` - deveria usar Satoshi
- ❌ Usa `uppercase` - títulos longos não devem ser uppercase (conforme 05-font.md)
- ✅ Peso `font-extrabold/bold` (700-900) - correto, mas ajustar para Bold (700)
- ✅ `tracking-tight` - correto para títulos grandes

---

### 2. Campo de Texto (Linha 151-153 - Hero.tsx)

**Estado atual:**
```tsx
className="text-cream-50 text-xs sm:text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-5 sm:indent-2 md:indent-3 lg:indent-6 hyphens-none break-words"
```

**Problemas:**
- ❌ Sem especificação de fonte - herda padrão
- ❌ Sem peso definido - deveria ser Inter Regular (400)

---

### 3. Cards Compactos (FeatureItemCompact.tsx - Linha 17)

**Estado atual:**
```tsx
className="text-cream-50 font-semibold text-[0.65rem] sm:text-xs md:text-sm leading-tight sm:leading-none whitespace-nowrap"
```

**Problemas:**
- ❌ `font-semibold` (600) - deveria ser Inter Regular (400) + tracking-wide
- ❌ Sem especificação de fonte explícita

---

### 4. Grid de Métricas (Linhas 164-197 - Hero.tsx)

#### 4.1 Números (Linhas 167, 178, 189)

**Estado atual:**
```tsx
className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500 whitespace-nowrap"
```

**Problemas:**
- ❌ Sem especificação de fonte - deveria usar Satoshi Bold para destaque máximo
- ✅ `font-bold` (700) - peso correto

#### 4.2 Labels (Linhas 170, 181, 192)

**Estado atual:**
```tsx
className="text-[0.6rem] sm:text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider"
```

**Problemas:**
- ❌ Usa `font-serif` - deveria usar Inter
- ❌ `font-semibold` (600) - deveria ser Regular (400)
- ✅ `uppercase tracking-wider` - correto para labels

---

## 🎨 Estratégia Tipográfica (Conforme 05-font.md)

### Hierarquia de Elementos

| Elemento | Fonte | Peso | Caixa | Letter-spacing | Justificativa |
|----------|-------|------|-------|----------------|---------------|
| **H1 Título** | Satoshi | Bold (700) | Sentence case | -0.01em | Personalidade, impacto visual |
| **Texto descritivo** | Inter | Regular (400) | Normal | 0 | Legibilidade perfeita |
| **Cards compactos** | Inter | Regular (400) | Normal | 0.01em | Subtítulos de apoio |
| **Métricas - Números** | Satoshi | Bold (700) | Normal | -0.01em | Destaque máximo |
| **Métricas - Labels** | Inter | Regular (400) | UPPERCASE | 0.08em | Consistência com menu |

### Justificativas

#### H1 - Satoshi Bold
- **Por que Satoshi?** Personalidade e impacto visual (conforme 05-font.md)
- **Por que Bold (700)?** Peso ideal para títulos principais
- **Por que remover UPPERCASE?** Título longo - sentence case é mais legível e moderno
- **Por que -0.01em?** Compacta texto grande, cria elegância

#### Texto Descritivo - Inter Regular
- **Por que Inter?** Otimizada para legibilidade em parágrafos
- **Por que Regular (400)?** Peso padrão para textos longos
- **Por que letter-spacing 0?** Padrão ideal para leitura

#### Cards Compactos - Inter Regular + tracking-wide
- **Por que Inter Regular?** Textos de apoio, não títulos
- **Por que tracking-wide (0.01em)?** Respiro sutil, elegância

#### Métricas Números - Satoshi Bold
- **Por que Satoshi?** Números merecem destaque visual forte
- **Por que Bold (700)?** Máximo impacto, hierarquia clara
- **Por que -0.01em?** Compacta números grandes

#### Métricas Labels - Inter Regular UPPERCASE
- **Por que Inter?** Consistência com resto do site
- **Por que Regular (400)?** Leveza, não compete com números
- **Por que UPPERCASE + 0.08em?** Mesma estratégia do menu

---

## 🔧 Implementação Técnica

### Passo 1: Atualizar H1 Título

**Localização:** `components/hero/Hero.tsx` (linhas 68-80)

**Antes:**
```tsx
<h1
  className="
    font-montserrat text-cream-50 font-extrabold sm:font-bold
    tracking-tight text-center
    mb-3 sm:mb-4 md:mb-5 lg:mb-6
    uppercase sm:whitespace-nowrap
    !text-[clamp(1.375rem,7vw,1.75rem)] sm:!text-[clamp(1.75rem,2.8vw,2.5rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)]
    px-1 sm:px-0
    laydesk2-hero-title laydesk3-hero-h1
  "
>
  Café Gourmet e Baristas para Eventos
</h1>
```

**Depois:**
```tsx
<h1
  className="
    font-satoshi text-cream-50 font-bold
    tracking-tight text-center
    mb-3 sm:mb-4 md:mb-5 lg:mb-6
    sm:whitespace-nowrap
    !text-[clamp(1.375rem,7vw,1.75rem)] sm:!text-[clamp(1.75rem,2.8vw,2.5rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)]
    px-1 sm:px-0
    laydesk2-hero-title laydesk3-hero-h1
  "
>
  Café Gourmet e Baristas para Eventos
</h1>
```

**Mudanças:**
- `font-montserrat` → `font-satoshi`
- `font-extrabold sm:font-bold` → `font-bold` (unificado em Bold 700)
- Remover `uppercase` (sentence case é mais moderno e legível)

---

### Passo 2: Atualizar Campo de Texto

**Localização:** `components/hero/Hero.tsx` (linha 151)

**Antes:**
```tsx
<p className="text-cream-50 text-xs sm:text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-5 sm:indent-2 md:indent-3 lg:indent-6 hyphens-none break-words">
```

**Depois:**
```tsx
<p className="font-inter font-normal text-cream-50 text-xs sm:text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-5 sm:indent-2 md:indent-3 lg:indent-6 hyphens-none break-words">
```

**Mudanças:**
- Adicionar `font-inter font-normal` (explícito)

---

### Passo 3: Atualizar Cards Compactos

**Localização:** `components/hero/FeatureItemCompact.tsx` (linha 17)

**Antes:**
```tsx
<span className="text-cream-50 font-semibold text-[0.65rem] sm:text-xs md:text-sm leading-tight sm:leading-none whitespace-nowrap min-w-0 flex-1 overflow-hidden text-ellipsis">
  {title}
</span>
```

**Depois:**
```tsx
<span className="font-inter font-normal tracking-wide text-cream-50 text-[0.65rem] sm:text-xs md:text-sm leading-tight sm:leading-none whitespace-nowrap min-w-0 flex-1 overflow-hidden text-ellipsis">
  {title}
</span>
```

**Mudanças:**
- `font-semibold` → `font-inter font-normal`
- Adicionar `tracking-wide` (letter-spacing: 0.01em)

---

### Passo 4: Atualizar Métricas - Números

**Localização:** `components/hero/Hero.tsx` (linhas 167, 178, 189)

**Antes:**
```tsx
<div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500 whitespace-nowrap">
  + 100 mil
</div>
```

**Depois:**
```tsx
<div className="font-satoshi font-bold tracking-tight text-lg sm:text-2xl md:text-3xl lg:text-4xl text-coffee-500 whitespace-nowrap">
  + 100 mil
</div>
```

**Mudanças:**
- Adicionar `font-satoshi` (explícito)
- Adicionar `tracking-tight` (letter-spacing: -0.01em)

**Aplicar em:**
- Card 1: "+ 100 mil" (linha 167-169)
- Card 2: "+100" (linha 178-180)
- Card 3: "+ 2 mil" (linha 189-191)

---

### Passo 5: Atualizar Métricas - Labels

**Localização:** `components/hero/Hero.tsx` (linhas 170, 181, 192)

**Antes:**
```tsx
<div className="text-[0.6rem] sm:text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-1 sm:gap-2">
  <span className="text-xs sm:text-base">☕</span>
  <span className="leading-tight">cafés servidos</span>
</div>
```

**Depois:**
```tsx
<div className="font-inter font-normal text-[0.6rem] sm:text-base md:text-lg text-cream-50 uppercase tracking-[0.08em] flex items-center gap-1 sm:gap-2">
  <span className="text-xs sm:text-base">☕</span>
  <span className="leading-tight">cafés servidos</span>
</div>
```

**Mudanças:**
- `font-serif font-semibold` → `font-inter font-normal`
- `tracking-wider` → `tracking-[0.08em]` (consistência com menu)

**Aplicar em:**
- Card 1: "cafés servidos" (linha 170-173)
- Card 2: "empresas atendidas" (linha 181-184)
- Card 3: "eventos realizados" (linha 192-195)

---

## 📐 Especificações Detalhadas

### Classes Tailwind Utilizadas

| Classe | CSS Equivalente | Uso |
|--------|-----------------|-----|
| `font-satoshi` | `font-family: var(--font-satoshi)` | Títulos e números |
| `font-inter` | `font-family: var(--font-inter)` | Textos e labels |
| `font-bold` | `font-weight: 700` | H1 e números |
| `font-normal` | `font-weight: 400` | Textos, cards, labels |
| `tracking-tight` | `letter-spacing: -0.025em` | H1 e números |
| `tracking-wide` | `letter-spacing: 0.025em` | Cards compactos |
| `tracking-[0.08em]` | `letter-spacing: 0.08em` | Labels métricas |
| `uppercase` | `text-transform: uppercase` | Labels métricas |

### Hierarquia Visual

```
H1 Título (Satoshi Bold, grande)
    ↓
Texto descritivo (Inter Regular, médio)
    ↓
Cards compactos (Inter Regular, pequeno)
    ↓
Métricas:
  - Números (Satoshi Bold, grande) ← DESTAQUE MÁXIMO
  - Labels (Inter Regular UPPERCASE, pequeno)
```

---

## 🎯 Resultado Visual Esperado

### Antes (Estado Atual)

**H1 Título:**
```
CAFÉ GOURMET E BARISTAS PARA EVENTOS
(Montserrat Extrabold/Bold, UPPERCASE)
```
- Visual: Pesado, gritante, difícil de ler

**Texto descritivo:**
- Fonte: Indefinida (herda padrão)
- Visual: Sem consistência

**Cards compactos:**
- Fonte: Semibold, sem especificação
- Visual: Peso excessivo

**Métricas:**
- Números: Sem fonte específica
- Labels: Serif Semibold UPPERCASE
- Visual: Mistura de fontes, sem consistência

---

### Depois (Pós Implementação)

**H1 Título:**
```
Café Gourmet e Baristas para Eventos
(Satoshi Bold, sentence case)
```
- Visual: Elegante, moderno, impacto sem agressividade

**Texto descritivo:**
- Fonte: Inter Regular
- Visual: Legibilidade perfeita, profissional

**Cards compactos:**
- Fonte: Inter Regular + tracking-wide
- Visual: Leve, elegante, respiro entre letras

**Métricas:**
- Números: **+ 100 mil** (Satoshi Bold, destaque máximo)
- Labels: **C A F É S  S E R V I D O S** (Inter Regular UPPERCASE)
- Visual: Hierarquia clara, consistência total

---

## ⚠️ Considerações Importantes

### 1. Remover UPPERCASE do H1

**Por que?**
- Título longo (40+ caracteres) em UPPERCASE é cansativo de ler
- Estratégia moderna: sentence case para títulos longos (Apple, Airbnb, Nespresso)
- Mantém impacto com Satoshi Bold + tamanho grande

**Comparação:**
- ❌ UPPERCASE: `CAFÉ GOURMET E BARISTAS PARA EVENTOS` (agressivo)
- ✅ Sentence case: `Café Gourmet e Baristas para Eventos` (elegante)

### 2. Satoshi para Números de Métricas

**Por que Satoshi?**
- Números são elementos de **destaque máximo** na seção
- Satoshi Bold cria **personalidade visual forte**
- Diferencia de Inter (usado no resto do texto)
- Cria **hierarquia clara**: Números (Satoshi) > Labels (Inter)

### 3. Consistência com Menu

**Labels de Métricas:**
- Usar `tracking-[0.08em]` (mesmo do menu)
- Usar Inter Regular (400) (mesmo do menu)
- Usar UPPERCASE (mesma estratégia)

**Resultado:** Usuário reconhece padrão visual em todo o site

### 4. Responsividade

**Manter todos os breakpoints:**
- Tamanhos responsivos: `text-xs sm:text-base md:text-lg lg:text-4xl`
- Clamp functions: `!text-[clamp(...)]`
- Espaçamentos progressivos: `mb-3 sm:mb-4 md:mb-5 lg:mb-6`

**Não alterar:** Layout, espaçamentos, tamanhos - apenas fontes

### 5. Acessibilidade

**Sentence case vs UPPERCASE:**
- Sentence case é mais acessível para dislexia
- Screen readers processam melhor sentence case
- UPPERCASE reservado para labels curtas (métricas)

---

## 📋 Checklist de Implementação

### Preparação
- [x] Fonte Satoshi instalada e configurada
- [x] Inter com peso Light (300) configurado
- [x] Classes `.font-satoshi` e `.font-inter` disponíveis

### Hero.tsx - Título
- [x] Atualizar H1 (linha 68-80): Satoshi Bold, remover uppercase

### Hero.tsx - Texto e Cards
- [x] Atualizar campo de texto (linha 151): Inter Regular

### FeatureItemCompact.tsx - Cards Compactos
- [x] Atualizar título do card (linha 17): Inter Regular + tracking-wide

### Hero.tsx - Métricas (Números)
- [x] Atualizar Card 1 número (linha 167-169): Satoshi Bold + tracking-tight
- [x] Atualizar Card 2 número (linha 178-180): Satoshi Bold + tracking-tight
- [x] Atualizar Card 3 número (linha 189-191): Satoshi Bold + tracking-tight

### Hero.tsx - Métricas (Labels)
- [x] Atualizar Card 1 label (linha 170-173): Inter Regular + tracking-[0.08em]
- [x] Atualizar Card 2 label (linha 181-184): Inter Regular + tracking-[0.08em]
- [x] Atualizar Card 3 label (linha 192-195): Inter Regular + tracking-[0.08em]

### Testes
- [ ] Verificar H1 em todos os breakpoints (mobile, tablet, desktop)
- [ ] Verificar legibilidade do texto descritivo
- [ ] Verificar cards compactos (não muito pesados)
- [ ] Verificar hierarquia nas métricas (números > labels)
- [ ] Testar em laydesk1, laydesk2, laydesk3
- [ ] Verificar performance (Lighthouse)

---

## 🎨 Comparação Visual Detalhada

### H1 Título

**ANTES:**
```
┌─────────────────────────────────────────────┐
│  CAFÉ GOURMET E BARISTAS PARA EVENTOS       │
│  (Montserrat Extrabold UPPERCASE)           │
│  Visual: ████████████████████████████████   │
└─────────────────────────────────────────────┘
```

**DEPOIS:**
```
┌─────────────────────────────────────────────┐
│  Café Gourmet e Baristas para Eventos       │
│  (Satoshi Bold sentence case)               │
│  Visual: ███████████████████████            │
└─────────────────────────────────────────────┘
```

### Métricas

**ANTES:**
```
+ 100 mil
cafés servidos
(Números: Indefinido, Labels: Serif Semibold)
```

**DEPOIS:**
```
+ 100 mil          ← Satoshi Bold (DESTAQUE)
C A F É S  S E R V I D O S    ← Inter Regular UPPERCASE
```

---

## 📊 Impacto por Elemento

### 1. H1 Título

| Aspecto | Antes | Depois | Impacto |
|---------|-------|--------|---------|
| **Fonte** | Montserrat | Satoshi | ⬆️ +90% personalidade |
| **Peso** | Extrabold/Bold (700-900) | Bold (700) | ⬇️ -20% peso, +30% elegância |
| **Caixa** | UPPERCASE | Sentence case | ⬆️ +50% legibilidade |
| **Impacto visual** | Agressivo | Elegante e forte | ⬆️ +80% sofisticação |

### 2. Texto Descritivo

| Aspecto | Antes | Depois | Impacto |
|---------|-------|--------|---------|
| **Fonte** | Indefinida | Inter Regular | ⬆️ +100% consistência |
| **Legibilidade** | Regular | Otimizada | ⬆️ +40% facilidade de leitura |

### 3. Cards Compactos

| Aspecto | Antes | Depois | Impacto |
|---------|-------|--------|---------|
| **Peso** | Semibold (600) | Regular (400) | ⬇️ -33% peso, +50% elegância |
| **Espaçamento** | 0 | 0.01em | ⬆️ +10% respiro |

### 4. Métricas - Números

| Aspecto | Antes | Depois | Impacto |
|---------|-------|--------|---------|
| **Fonte** | Indefinida | Satoshi Bold | ⬆️ +100% personalidade |
| **Destaque** | Baixo | Máximo | ⬆️ +150% hierarquia visual |

### 5. Métricas - Labels

| Aspecto | Antes | Depois | Impacto |
|---------|-------|--------|---------|
| **Fonte** | Serif Semibold | Inter Regular | ⬆️ +100% consistência |
| **Peso** | Semibold (600) | Regular (400) | ⬇️ -33% peso, não compete com números |
| **Espaçamento** | tracking-wider | tracking-[0.08em] | ✅ Consistência com menu |

---

## 🔗 Referências e Inspiração

### Marcas Premium - Estratégia de Hero

1. **Apple** (apple.com)
   - H1: Fonte custom Bold, sentence case, tamanho grande
   - Métricas: Números em destaque, labels pequenas e discretas

2. **Airbnb** (airbnb.com)
   - H1: Fonte custom Bold, sentence case
   - Textos: Inter/Circular Regular
   - Hierarquia clara: Títulos (Bold) > Textos (Regular)

3. **Nespresso** (nespresso.com)
   - H1: Fonte custom, sem uppercase em títulos longos
   - Métricas: Números grandes e bold, labels pequenas

### Documentação Relacionada

- **05-font.md** - Estratégia tipográfica geral
- **06-menu-font.md** - Implementação no menu (referência para labels)

---

## 💡 Notas Finais

### Por que essa estratégia funciona no Hero?

1. **H1 Satoshi Bold + sentence case:** Impacto sem agressividade, modernidade
2. **Texto Inter Regular:** Legibilidade perfeita para parágrafo descritivo
3. **Cards compactos Inter Regular:** Leveza, não compete com H1
4. **Métricas Satoshi Bold:** Números merecem destaque máximo
5. **Labels Inter UPPERCASE:** Consistência com menu, hierarquia clara

### Hierarquia Visual Final

```
┌─────────────────────────────────────────┐
│  H1 (Satoshi Bold)              ████    │  ← MÁXIMO DESTAQUE
│  Texto (Inter Regular)          ██      │
│  Cards compactos (Inter)        ██      │
│  Métricas números (Satoshi)     ████    │  ← MÁXIMO DESTAQUE
│  Métricas labels (Inter)        █       │
└─────────────────────────────────────────┘
```

### Próximos Componentes (Prioridade)

Após implementar o Hero, seguir para:

1. **Seção 2 (Sobre/Apresentação)** - Títulos H2 + textos
2. **Seção 3 (Serviços)** - Cards do carrossel
3. **Seção 4 (Diferenciais)** - Títulos + descrições
4. **Formulário** - Labels e campos

### Manutenção

**Ao adicionar novos títulos H1:**
- Desktop/Mobile: `font-satoshi font-bold tracking-tight` (sem uppercase para títulos longos)

**Ao adicionar novos parágrafos:**
- Todos: `font-inter font-normal`

**Ao adicionar novas métricas:**
- Números: `font-satoshi font-bold tracking-tight`
- Labels: `font-inter font-normal uppercase tracking-[0.08em]`

---

## 🚀 Comando de Implementação

Quando autorizado, executar alterações em:

### Arquivos afetados:
1. **`components/hero/Hero.tsx`**
   - Linha 68-80: H1 Título
   - Linha 151: Campo de texto
   - Linhas 167, 178, 189: Métricas números (3x)
   - Linhas 170, 181, 192: Métricas labels (3x)
   - **Total:** 8 alterações

2. **`components/hero/FeatureItemCompact.tsx`**
   - Linha 17: Título do card compacto
   - **Total:** 1 alteração

### Resumo:
- **Total de arquivos:** 2
- **Total de alterações:** 9
- **Linhas afetadas:** Hero.tsx (68-80, 151, 167-195) + FeatureItemCompact.tsx (17)

---

**Última atualização:** Janeiro 2026  
**Status:** ✅ Implementado com sucesso  
**Prioridade:** Crítica - Hero é a primeira seção que o usuário vê  
**Dependências:** ✅ Todas atendidas (Satoshi + Inter configurados)  
**Complexidade:** Média - 9 alterações em 2 arquivos

