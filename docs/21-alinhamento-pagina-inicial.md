# 21 — Alinhamento da Página Inicial (Hero Section)

## 📋 Objetivo

Ajustar o alinhamento de elementos na primeira seção (Hero) para criar uma hierarquia visual mais organizada e alinhada. O título permanece fora do grid, mas seu conteúdo deve se alinhar com o início do slideshow (lado esquerdo) e o final da DIV de texto (lado direito), sem ultrapassar esses limites.

**Mudanças**:
- **Alinhar título com limites do grid**: O título permanece fora do grid, mas seu conteúdo deve se alinhar com o início do slideshow (esquerda) e o final da DIV de texto (direita)
- **Alinhar slideshow ao bottom**: Fazer com que o slideshow (carrossel de imagens) fique alinhado com o final (bottom) da última DIV de serviços ("Perfeito para feiras e estandes")

---

## 🎨 Especificações de Design

### Estado Atual vs Novo Estado

#### ANTES (Estado Atual)

**Estrutura Visual**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│        CAFÉ GOURMET E BARISTAS PARA EVENTOS                 │ ← text-center (centralizado, ultrapassa limites)
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
- Título H1: Fora do grid, centralizado (`text-center`), pode ultrapassar os limites do grid
- Grid principal: `items-start` (alinhamento no topo)
- Slideshow: Alinhado ao topo da coluna esquerda
- DIV de texto: Alinhada ao topo da coluna direita

#### DEPOIS (Novo Estado)

**Estrutura Visual**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  CAFÉ GOURMET E BARISTAS PARA EVENTOS                 │ │ ← título alinhado com limites do grid
│  └──────────────────────────────────────────────────────┘ │
│  ↑ início slideshow              ↑ final DIV texto        │
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

**Características novas**:
- Título H1: Fora do grid, mas com largura e alinhamento que respeitam os limites do grid (início do slideshow até final da DIV de texto)
- Grid principal: `items-end` (alinhamento no final/bottom)
- Slideshow: Alinhado ao final da coluna esquerda (bottom)
- DIV de texto: Mantém alinhamento natural, slideshow se alinha ao final dela

---

## 📐 Layout Visual Detalhado

### Alinhamento do Título com Limites do Grid

#### ANTES

```
┌─────────────────────────────────────────────────────────────┐
│  Container (max-w-7xl mx-auto px-4)                         │
│                                                             │
│        ┌─────────────────────────────────────┐              │
│        │  CAFÉ GOURMET E BARISTAS PARA EVENTOS │              │
│        └─────────────────────────────────────┘              │
│                    ↑ text-center (ultrapassa limites)       │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────┐  │
│  │  Slideshow      │  │  Texto + Cards                │  │
│  └──────────────────┘  └──────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### DEPOIS

```
┌─────────────────────────────────────────────────────────────┐
│  Container (max-w-7xl mx-auto px-4)                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  CAFÉ GOURMET E BARISTAS PARA EVENTOS                 │  │
│  └──────────────────────────────────────────────────────┘  │
│  ↑ início slideshow              ↑ final DIV texto         │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────┐  │
│  │  Slideshow       │  │  Texto + Cards                │  │
│  └──────────────────┘  └──────────────────────────────┘  │
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

### Passo 1: Ajustar Título para Alinhar com Limites do Grid

**Arquivo**: `components/hero/Hero.tsx`

**Localização**: Linha 69

**Ação**: 
1. Manter o título fora do grid
2. Alterar `text-center` para `text-right` no H1
3. Adicionar um wrapper ou ajustar o container do título para que ele tenha a mesma largura e alinhamento do grid
4. O título deve começar no mesmo ponto que o slideshow (coluna esquerda) e terminar no mesmo ponto que a DIV de texto (coluna direita)

**Estratégia**: 
- O título está dentro de `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- O grid também está dentro do mesmo container
- Precisamos fazer o título ter a mesma largura efetiva do grid (considerando gaps)
- Usar `text-right` para alinhar à direita, mas garantir que o container do título tenha a mesma largura do grid

**Código ANTES**:

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* H1 centralizado com clamp */}
  <h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-8 md:mb-10 lg:mb-12 text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
    Café Gourmet e Baristas para Eventos
  </h1>

  {/* Grid principal com gaps progressivos */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-14 items-start">
    {/* ... */}
  </div>
</div>
```

**Código DEPOIS**:

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* H1 alinhado com limites do grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-14 mb-8 md:mb-10 lg:mb-12">
    <div className="hidden md:block"></div> {/* Coluna esquerda vazia para alinhamento */}
    <h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-right text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
      Café Gourmet e Baristas para Eventos
    </h1>
  </div>

  {/* Grid principal com gaps progressivos */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-14 items-end">
    {/* ... */}
  </div>
</div>
```

**Mudanças específicas**:
- Criar um grid auxiliar para o título com a mesma estrutura do grid principal
- Coluna esquerda vazia (visível apenas em `md:` e acima) para alinhamento
- Coluna direita contém o título com `text-right`
- Mesmos gaps e breakpoints do grid principal
- `text-center` → `text-right`
- Remover `mb-8 md:mb-10 lg:mb-12` do H1 e aplicar no grid auxiliar

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
   - **Linhas 68-71**: Substituir o H1 simples por um grid auxiliar que contém o título
   - **Linha 74**: Alterar `items-start` para `items-end` no grid principal

### Mudanças Detalhadas

#### Mudança 1: Alinhamento do Título com Limites do Grid

| Elemento | Mudança | Detalhes |
|----------|---------|----------|
| Container do título | **Estrutura** | Criar grid auxiliar com mesma estrutura do grid principal |
| Título | **Alinhamento** | `text-center` → `text-right` |
| Título | **Posicionamento** | Coluna direita do grid auxiliar |
| Grid auxiliar | **Coluna esquerda** | Vazia (apenas para alinhamento, visível em `md:` e acima) |
| Grid auxiliar | **Gaps** | Mesmos gaps do grid principal (`gap-6 md:gap-8 lg:gap-12 xl:gap-14`) |

**Efeito**: O título "Café Gourmet e Baristas para Eventos" estará alinhado à direita, começando no mesmo ponto que o slideshow (coluna esquerda) e terminando no mesmo ponto que a DIV de texto (coluna direita), sem ultrapassar esses limites.

#### Mudança 2: Alinhamento do Grid

| Elemento | Propriedade | Valor Antes | Valor Depois |
|----------|-------------|-------------|--------------|
| Grid principal | `align-items` | `items-start` | `items-end` |

**Efeito**: O slideshow (coluna esquerda) será alinhado ao final (bottom), alinhando com o final da última DIV de serviços (coluna direita).

---

## 🎯 Comportamento Responsivo

### Mobile (< 768px)

- **Título**: Ocupará toda a largura disponível (coluna única), alinhado à direita
- **Grid auxiliar**: `grid-cols-1` faz com que a coluna esquerda vazia não apareça (`hidden md:block`)
- **Grid principal**: `items-end` funcionará verticalmente, com slideshow abaixo do conteúdo

### Tablet (≥ 768px)

- **Título**: Grid de 2 colunas, título na coluna direita alinhado à direita
- **Alinhamento**: Título começa no mesmo ponto que o slideshow e termina no mesmo ponto que a DIV de texto
- **Grid principal**: `items-end` fará o slideshow se alinhar ao final da coluna direita

### Desktop (≥ 1024px)

- **Título**: Grid de 2 colunas, título na coluna direita alinhado à direita
- **Alinhamento**: Título perfeitamente alinhado com os limites do grid principal
- **Grid principal**: `items-end` garantirá que o slideshow termine na mesma altura que a última DIV de serviços

---

## ✅ Checklist de Implementação

- [ ] Criar grid auxiliar para o título com mesma estrutura do grid principal em `components/hero/Hero.tsx`
- [ ] Adicionar coluna esquerda vazia no grid auxiliar (visível apenas em `md:` e acima)
- [ ] Colocar título na coluna direita do grid auxiliar
- [ ] Alterar `text-center` para `text-right` no H1
- [ ] Aplicar `mb-8 md:mb-10 lg:mb-12` no grid auxiliar (remover do H1)
- [ ] Manter mesmos gaps no grid auxiliar: `gap-6 md:gap-8 lg:gap-12 xl:gap-14`
- [ ] Alterar `items-start` para `items-end` no grid principal em `components/hero/Hero.tsx` (linha 74)
- [ ] Testar visualmente o alinhamento do título com o início do slideshow
- [ ] Testar visualmente o alinhamento do título com o final da DIV de texto
- [ ] Testar visualmente o alinhamento do slideshow com o final da última DIV de serviços
- [ ] Verificar responsividade em mobile (< 768px)
- [ ] Verificar responsividade em tablet (≥ 768px)
- [ ] Verificar responsividade em desktop (≥ 1024px)
- [ ] Garantir que o título não ultrapassa os limites do grid

---

## 🔍 Verificação Pós-Implementação

Após implementar, verificar:

1. **Alinhamento do Título**: 
   - O título deve estar dentro de um grid auxiliar com a mesma estrutura do grid principal
   - O título deve estar alinhado à direita (`text-right`)
   - O início do título (lado esquerdo) deve alinhar com o início do slideshow
   - O final do título (lado direito) deve alinhar com o final da DIV de texto
   - O título não deve ultrapassar esses limites
   - Em mobile, o título deve ocupar toda a largura disponível

2. **Alinhamento do Slideshow**:
   - O slideshow deve estar alinhado ao final (bottom) da coluna esquerda
   - O final do slideshow deve alinhar com o final da última DIV de serviços ("Perfeito para feiras e estandes")
   - Em mobile, o slideshow deve aparecer abaixo do conteúdo, mantendo o alinhamento vertical

3. **Estrutura dos Grids**:
   - O grid auxiliar do título deve ter os mesmos gaps do grid principal
   - O grid auxiliar deve ter 2 colunas em tablet/desktop
   - A coluna esquerda do grid auxiliar deve estar vazia (apenas para alinhamento)
   - Em mobile, apenas a coluna direita deve aparecer

4. **Responsividade**:
   - Em mobile: Título ocupa toda largura, alinhado à direita, conteúdo abaixo, slideshow no final
   - Em tablet: Grid de 2 colunas, título alinhado com limites do grid, slideshow alinhado ao final
   - Em desktop: Grid de 2 colunas, título perfeitamente alinhado com limites do grid, slideshow alinhado ao final

5. **Consistência Visual**:
   - O alinhamento deve criar uma hierarquia visual clara
   - Não deve haver quebras de layout ou sobreposições indesejadas
   - O título deve criar uma conexão visual clara com o grid principal

---

## 💡 Notas Adicionais

- O uso de um grid auxiliar para o título garante que ele tenha exatamente a mesma largura e alinhamento do grid principal
- A coluna esquerda vazia no grid auxiliar serve apenas para criar o alinhamento correto, não aparece em mobile
- O uso de `items-end` no grid principal fará com que ambos os elementos (slideshow e coluna direita) se alinhem pelo final, criando uma base visual comum
- Em mobile, o título ocupará toda a largura disponível, mas ainda estará alinhado à direita
- Os gaps do grid auxiliar devem ser exatamente os mesmos do grid principal para garantir alinhamento perfeito
- Se no futuro for necessário ajustar o espaçamento, pode-se modificar o `mb-8 md:mb-10 lg:mb-12` do grid auxiliar

---

## 📚 Referências

- [Tailwind CSS Text Align](https://tailwindcss.com/docs/text-align)
- [Tailwind CSS Align Items](https://tailwindcss.com/docs/align-items)
- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS Grid Alignment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Box_Alignment_in_CSS_Grid_Layout)
