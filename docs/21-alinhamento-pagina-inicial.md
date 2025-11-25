# 21 — Alinhamento da Página Inicial (Hero Section)

## 📋 Objetivo

Ajustar o alinhamento de elementos na primeira seção (Hero) para criar uma hierarquia visual mais organizada e alinhada. As mudanças incluem alinhar o título principal com a borda direita da DIV de texto e alinhar o slideshow com o final da última DIV de serviços.

**Mudanças**:
- **Alinhar título à direita**: Alterar o título "Café Gourmet e Baristas para Eventos" de centralizado para alinhado à direita, alinhando com a borda direita da DIV que contém o texto descritivo
- **Alinhar slideshow ao bottom**: Fazer com que o slideshow (carrossel de imagens) fique alinhado com o final (bottom) da última DIV de serviços ("Perfeito para feiras e estandes")

---

## 🎨 Especificações de Design

### Estado Atual vs Novo Estado

#### ANTES (Estado Atual)

**Estrutura Visual**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│        CAFÉ GOURMET E BARISTAS PARA EVENTOS                 │ ← text-center (centralizado)
│                    (título)                                 │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────┐  │
│  │                  │  │  ┌──────────────────────────┐ │  │
│  │                  │  │  │ Transforme o café do seu  │ │  │
│  │   Slideshow     │  │  │ evento em uma experiência│ │  │
│  │   (Carrossel)   │  │  │ inesquecível...           │ │  │
│  │                  │  │  └──────────────────────────┘ │  │
│  │                  │  │                                │  │
│  │                  │  │  [Card 1]                     │  │
│  │                  │  │  [Card 2]                     │  │
│  │                  │  │  [Card 3]                    │  │
│  │                  │  │  "Perfeito para feiras..."   │  │
│  └──────────────────┘  └──────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Características atuais**:
- Título H1: `text-center` (centralizado horizontalmente)
- Grid principal: `items-start` (alinhamento no topo)
- Slideshow: Alinhado ao topo da coluna esquerda
- DIV de texto: Alinhada ao topo da coluna direita

#### DEPOIS (Novo Estado)

**Estrutura Visual**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                    CAFÉ GOURMET E BARISTAS  │ ← text-right (alinhado à direita)
│                                    PARA EVENTOS             │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────┐     │
│  │                  │  │  ┌──────────────────────────┐ │     │
│  │                  │  │  │ Transforme o café do seu  │ │     │
│  │                  │  │  │ evento em uma experiência│ │     │
│  │   Slideshow     │  │  │ inesquecível...           │ │     │
│  │   (Carrossel)   │  │  └──────────────────────────┘ │     │
│  │                  │  │                                │     │
│  │                  │  │  [Card 1]                     │     │
│  │                  │  │  [Card 2]                     │     │
│  │                  │  │  [Card 3]                    │     │
│  │                  │  │  "Perfeito para feiras..."   │     │
│  └──────────────────┘  └──────────────────────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Características novas**:
- Título H1: `text-right` (alinhado à direita, alinhando com a borda direita da DIV de texto)
- Grid principal: `items-end` (alinhamento no final/bottom)
- Slideshow: Alinhado ao final da coluna esquerda (bottom)
- DIV de texto: Mantém alinhamento natural, slideshow se alinha ao final dela

---

## 📐 Layout Visual Detalhado

### Alinhamento do Título

#### ANTES

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│        ┌─────────────────────────────────────┐              │
│        │  CAFÉ GOURMET E BARISTAS PARA EVENTOS │              │
│        └─────────────────────────────────────┘              │
│                    ↑ text-center                            │
│                                                             │
│  ┌──────────────┐  ┌──────────────────────────────┐      │
│  │              │  │  ┌──────────────────────────┐ │      │
│  │              │  │  │ Texto descritivo...       │ │      │
│  │  Slideshow   │  │  └──────────────────────────┘ │      │
│  │              │  │                                │      │
│  └──────────────┘  └──────────────────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### DEPOIS

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                    ┌─────────────────────┐  │
│                                    │ CAFÉ GOURMET E      │  │
│                                    │ BARISTAS PARA EVENTOS│  │
│                                    └─────────────────────┘  │
│                                    ↑ text-right             │
│                                                             │
│  ┌──────────────┐  ┌──────────────────────────────┐         │
│  │              │  │  ┌──────────────────────────┐ │         │
│  │              │  │  │ Texto descritivo...       │ │         │
│  │  Slideshow   │  │  └──────────────────────────┘ │         │
│  │              │  │                                │         │
│  └──────────────┘  └──────────────────────────────┘         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Alinhamento do Slideshow

#### ANTES

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐  ┌──────────────────────────────┐      │
│  │              │  │  ┌──────────────────────────┐ │      │
│  │              │  │  │ Texto descritivo...       │ │      │
│  │  Slideshow   │  │  └──────────────────────────┘ │      │
│  │  (topo)      │  │                                │      │
│  │              │  │  [Card 1]                     │      │
│  │              │  │  [Card 2]                     │      │
│  │              │  │  [Card 3]                    │      │
│  │              │  │  "Perfeito para feiras..."   │      │
│  └──────────────┘  └──────────────────────────────┘      │
│       ↑ items-start (alinhado ao topo)                     │
└─────────────────────────────────────────────────────────────┘
```

#### DEPOIS

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────┐  ┌──────────────────────────────┐      │
│  │              │  │  ┌──────────────────────────┐ │      │
│  │              │  │  │ Texto descritivo...       │ │      │
│  │              │  │  └──────────────────────────┘ │      │
│  │              │  │                                │      │
│  │              │  │  [Card 1]                     │      │
│  │              │  │  [Card 2]                     │      │
│  │  Slideshow   │  │  [Card 3]                    │      │
│  │  (bottom)    │  │  "Perfeito para feiras..."   │      │
│  └──────────────┘  └──────────────────────────────┘      │
│       ↑ items-end (alinhado ao final)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Implementação Técnica

### Passo 1: Alterar Alinhamento do Título

**Arquivo**: `components/hero/Hero.tsx`

**Localização**: Linha 69

**Ação**: 
1. Substituir `text-center` por `text-right` na className do H1
2. Manter todas as outras classes (`font-montserrat`, `text-cream-50`, `font-bold`, etc.)

**Código ANTES**:

```tsx
<h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-8 md:mb-10 lg:mb-12 text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Código DEPOIS**:

```tsx
<h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-right mb-8 md:mb-10 lg:mb-12 text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Mudança específica**:
- `text-center` → `text-right`

### Passo 2: Alterar Alinhamento do Grid Principal

**Arquivo**: `components/hero/Hero.tsx`

**Localização**: Linha 74

**Ação**: 
1. Substituir `items-start` por `items-end` na className do grid principal
2. Manter todas as outras classes do grid (`grid`, `grid-cols-1`, `md:grid-cols-2`, `gap-6`, etc.)

**Código ANTES**:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-14 items-start">
```

**Código DEPOIS**:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-14 items-end">
```

**Mudança específica**:
- `items-start` → `items-end`

---

## 📝 Resumo das Alterações

### Arquivos a Modificar

1. **`components/hero/Hero.tsx`**
   - **Linha 69**: Alterar `text-center` para `text-right` no H1
   - **Linha 74**: Alterar `items-start` para `items-end` no grid principal

### Mudanças Detalhadas

#### Mudança 1: Alinhamento do Título

| Elemento | Propriedade | Valor Antes | Valor Depois |
|----------|-------------|-------------|--------------|
| H1 (título) | `text-align` | `text-center` | `text-right` |

**Efeito**: O título "Café Gourmet e Baristas para Eventos" será alinhado à direita, alinhando com a borda direita da DIV de texto descritivo.

#### Mudança 2: Alinhamento do Grid

| Elemento | Propriedade | Valor Antes | Valor Depois |
|----------|-------------|-------------|--------------|
| Grid principal | `align-items` | `items-start` | `items-end` |

**Efeito**: O slideshow (coluna esquerda) será alinhado ao final (bottom), alinhando com o final da última DIV de serviços (coluna direita).

---

## 🎯 Comportamento Responsivo

### Mobile (< 768px)

- **Título**: Continuará alinhado à direita, mas como o grid é de 1 coluna, o alinhamento será menos perceptível
- **Grid**: `items-end` ainda funcionará, mas com apenas 1 coluna, o efeito será vertical (slideshow abaixo do texto)

### Tablet (≥ 768px)

- **Título**: Alinhado à direita, alinhando com a borda direita da DIV de texto
- **Grid**: `items-end` fará o slideshow se alinhar ao final da coluna direita

### Desktop (≥ 1024px)

- **Título**: Alinhado à direita, criando uma linha visual clara com a borda direita da DIV de texto
- **Grid**: `items-end` garantirá que o slideshow termine na mesma altura que a última DIV de serviços

---

## ✅ Checklist de Implementação

- [ ] Alterar `text-center` para `text-right` no H1 em `components/hero/Hero.tsx` (linha 69)
- [ ] Alterar `items-start` para `items-end` no grid principal em `components/hero/Hero.tsx` (linha 74)
- [ ] Testar visualmente o alinhamento do título com a borda direita da DIV de texto
- [ ] Testar visualmente o alinhamento do slideshow com o final da última DIV de serviços
- [ ] Verificar responsividade em mobile (< 768px)
- [ ] Verificar responsividade em tablet (≥ 768px)
- [ ] Verificar responsividade em desktop (≥ 1024px)
- [ ] Garantir que o layout não quebra em diferentes tamanhos de tela

---

## 🔍 Verificação Pós-Implementação

Após implementar, verificar:

1. **Alinhamento do Título**: 
   - O título deve estar alinhado à direita
   - A borda direita do título deve alinhar com a borda direita da DIV de texto descritivo
   - Em mobile, o alinhamento deve permanecer consistente

2. **Alinhamento do Slideshow**:
   - O slideshow deve estar alinhado ao final (bottom) da coluna esquerda
   - O final do slideshow deve alinhar com o final da última DIV de serviços ("Perfeito para feiras e estandes")
   - Em mobile, o slideshow deve aparecer abaixo do texto, mantendo o alinhamento vertical

3. **Responsividade**:
   - Em mobile: Layout em coluna única, título alinhado à direita, slideshow abaixo do texto
   - Em tablet: Layout em 2 colunas, título alinhado à direita, slideshow alinhado ao final
   - Em desktop: Layout em 2 colunas, título alinhado à direita, slideshow alinhado ao final

4. **Consistência Visual**:
   - O alinhamento deve criar uma hierarquia visual clara
   - Não deve haver quebras de layout ou sobreposições indesejadas

---

## 💡 Notas Adicionais

- O uso de `items-end` no grid fará com que ambos os elementos (slideshow e DIV de texto) se alinhem pelo final, criando uma base visual comum
- O alinhamento à direita do título cria uma conexão visual com a coluna direita (DIV de texto)
- Em telas muito pequenas, o layout em coluna única pode fazer o alinhamento parecer menos relevante, mas ainda manterá a consistência
- Se no futuro for necessário ajustar o espaçamento entre o título e o grid, pode-se modificar o `mb-8 md:mb-10 lg:mb-12` do H1

---

## 📚 Referências

- [Tailwind CSS Text Align](https://tailwindcss.com/docs/text-align)
- [Tailwind CSS Align Items](https://tailwindcss.com/docs/align-items)
- [CSS Grid Alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout)

