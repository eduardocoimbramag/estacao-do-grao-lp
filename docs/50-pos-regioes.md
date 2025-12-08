# Documentação: Posicionamento e Espaçamento - Seção "Regiões Atendidas" (Mobile)

## 📋 Visão Geral

Este documento detalha o projeto de melhorias de posicionamento e espaçamento para a seção "Regiões Atendidas" na versão mobile, focando em melhor encaixe visual e centralização do conteúdo.

**Objetivo**: 
- ✅ Adicionar espaçamento top-bottom na imagem do mapa
- ✅ Adicionar espaçamento leve entre os cards
- ✅ Aumentar padding top-bottom dos botões
- ✅ Centralizar conteúdo verticalmente (H1 e botões com mesma distância das bordas)
- ✅ Manter seção em exatamente 1 viewport (com menu)
- ✅ Desktop permanece intacto (nenhuma alteração)

---

## 🎯 Mudanças Solicitadas

### 1. Espaçamento na Imagem do Mapa (Top-Bottom)

**Situação Atual**:
- Imagem muito próxima do H1 e dos cards
- Margin atual: `my-1` (4px) - muito pequeno

**Mudança Necessária**:
- Aumentar margin top-bottom da imagem
- Sugestão: `my-3` ou `my-4` (12px ou 16px)

---

### 2. Espaçamento Entre os Cards

**Situação Atual**:
- Gap do container: `gap-0.5` (2px) - praticamente zero
- Cards muito próximos uns dos outros

**Mudança Necessária**:
- Aumentar gap entre os cards
- Sugestão: `gap-1.5` ou `gap-2` (6px ou 8px)

---

### 3. Padding Top-Bottom dos Botões

**Situação Atual**:
- Padding atual: `py-10` (40px)
- Pode ser aumentado levemente

**Mudança Necessária**:
- Aumentar padding vertical dos botões
- Sugestão: `py-12` ou `py-14` (48px ou 56px)

---

### 4. Centralização Vertical do Conteúdo

**Situação Atual**:
- Conteúdo não está centralizado verticalmente
- H1 pode estar muito próximo do topo
- Botões podem estar muito próximos do bottom

**Mudança Necessária**:
- Usar flexbox com `justify-between` ou `space-between`
- Garantir que H1 tenha mesma distância do topo que botões têm do bottom
- Ou usar `justify-center` com padding igual no topo e bottom

---

## 📐 Análise do Estado Atual

### Estrutura Atual - Mobile

```tsx
<section className="h-[calc(100vh-4rem)] sm:h-screen py-4 sm:py-16 lg:py-20 ...">
  <div className="...">
    <div className="grid grid-cols-1 lg:grid-cols-2 ...">
      
      {/* Coluna Esquerda */}
      <div className="flex flex-col justify-center items-center gap-0.5 sm:gap-1.5 lg:gap-2">
        {/* Título - text-2xl */}
        <h2>REGIÕES ATENDIDAS</h2>
        
        {/* Imagem - max-w-[120px], my-1 */}
        <div className="... my-1 sm:my-0">
          <Image ... />
        </div>
        
        {/* Card 1 - py-0.5 */}
        <div className="... py-0.5 sm:py-1.5">
          ...
        </div>
        
        {/* Card 2 - py-0.5 */}
        <div className="... py-0.5 sm:py-2">
          ...
        </div>
        
        {/* Card 3 - py-0.5 */}
        <div className="... py-0.5 sm:py-2">
          ...
        </div>
      </div>
      
      {/* Coluna Direita - Botões */}
      <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 sm:gap-6">
        {/* Botão 1 - py-10 */}
        <Link className="py-10 sm:py-8 ...">
          Galeria de experiências
        </Link>
        
        {/* Botão 2 - py-10 */}
        <Link className="py-10 sm:py-8 ...">
          Blog
        </Link>
      </div>
    </div>
  </div>
</section>
```

### Problemas Identificados

1. **Imagem sem espaçamento adequado**: `my-1` (4px) é muito pequeno
2. **Cards muito próximos**: `gap-0.5` (2px) é praticamente zero
3. **Botões podem ter mais padding**: `py-10` pode ser aumentado
4. **Conteúdo não centralizado**: Não há distribuição uniforme do espaço

---

## 🎨 Estrutura Visual Proposta

### Mobile (Antes)
```
┌─────────────────────────────┐
│  REGIÕES ATENDIDAS          │
│  (muito próximo do topo)    │
│                             │
│  [MAPA] (muito próximo)     │
│                             │
│  [Card 1] (colado)          │
│  [Card 2] (colado)          │
│  [Card 3] (colado)          │
│                             │
│  [Botão 1] [Botão 2]        │
│  (muito próximo do bottom)  │
└─────────────────────────────┘
```

### Mobile (Depois)
```
┌─────────────────────────────┐
│                             │
│  REGIÕES ATENDIDAS          │
│  (espaçamento igual)        │
│                             │
│  [MAPA]                     │
│  (espaçamento top-bottom)   │
│                             │
│  [Card 1]                   │
│  (espaçamento leve)         │
│  [Card 2]                   │
│  (espaçamento leve)         │
│  [Card 3]                   │
│                             │
│  [Botão 1] [Botão 2]        │
│  (mais padding, espaçamento)│
│                             │
└─────────────────────────────┘
(Conteúdo centralizado verticalmente)
```

---

## 🔧 Mudanças Técnicas Detalhadas

### 1. Espaçamento na Imagem do Mapa

**Arquivo**: `components/audience.tsx`

**Linha**: ~21

**Mudança**:
```tsx
// ANTES:
<div className="relative w-full max-w-[120px] sm:max-w-sm lg:max-w-[65%] aspect-square mx-auto sm:mx-0 my-1 sm:my-0">

// DEPOIS:
<div className="relative w-full max-w-[120px] sm:max-w-sm lg:max-w-[65%] aspect-square mx-auto sm:mx-0 my-3 sm:my-0">
```

**Detalhes**:
- Mobile: `my-1` → `my-3` (de 4px para 12px)
- Desktop: Manter `sm:my-0` (sem alterações)

---

### 2. Espaçamento Entre os Cards

**Arquivo**: `components/audience.tsx`

**Linha**: ~14

**Mudança**:
```tsx
// ANTES:
<div className="flex flex-col justify-center items-center gap-0.5 sm:gap-1.5 lg:gap-2">

// DEPOIS:
<div className="flex flex-col justify-center items-center gap-1.5 sm:gap-1.5 lg:gap-2">
```

**Detalhes**:
- Mobile: `gap-0.5` → `gap-1.5` (de 2px para 6px)
- Desktop: Manter `sm:gap-1.5 lg:gap-2` (sem alterações)

---

### 3. Padding Top-Bottom dos Botões

**Arquivo**: `components/audience.tsx`

**Linhas**: ~78, ~99

**Mudança**:
```tsx
// ANTES:
<Link className="group relative py-10 sm:flex-1 sm:py-8 lg:py-10 ...">

// DEPOIS:
<Link className="group relative py-12 sm:flex-1 sm:py-8 lg:py-10 ...">
```

**Detalhes**:
- Mobile: `py-10` → `py-12` (de 40px para 48px)
- Desktop: Manter `sm:py-8 lg:py-10` (sem alterações)

---

### 4. Centralização Vertical do Conteúdo

**Arquivo**: `components/audience.tsx`

**Linha**: ~7

**Estratégia 1: Usar padding igual no topo e bottom**

**Mudança**:
```tsx
// ANTES:
<section className="h-[calc(100vh-4rem)] sm:h-screen py-4 sm:py-16 lg:py-20 ...">

// DEPOIS:
<section className="h-[calc(100vh-4rem)] sm:h-screen py-6 sm:py-16 lg:py-20 ...">
```

**Estratégia 2: Usar flexbox com justify-center e padding interno**

**Mudança no container interno**:
```tsx
// ANTES:
<div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 box-border">

// DEPOIS:
<div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 box-border flex flex-col justify-center h-full">
```

**Estratégia 3: Usar padding igual no container do grid**

**Mudança**:
```tsx
// ANTES:
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

// DEPOIS:
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center py-4 sm:py-0 sm:items-start">
```

**Recomendação**: Usar **Estratégia 3** (padding no grid container) para melhor controle.

**Detalhes**:
- Mobile: Adicionar `py-4` no container do grid
- Mobile: Mudar `items-start` para `items-center`
- Desktop: Manter `sm:py-0 sm:items-start` (sem alterações)

---

## 📊 Resumo das Mudanças

### Mudanças Propostas

| Elemento | Propriedade | Antes (Mobile) | Depois (Mobile) | Desktop |
|----------|-------------|----------------|-----------------|---------|
| **Imagem** | Margin | `my-1` (4px) | `my-3` (12px) | Mantido |
| **Container Cards** | Gap | `gap-0.5` (2px) | `gap-1.5` (6px) | Mantido |
| **Botões** | Padding | `py-10` (40px) | `py-12` (48px) | Mantido |
| **Grid Container** | Padding | Nenhum | `py-4` (16px) | Mantido |
| **Grid Container** | Align | `items-start` | `items-center` | Mantido |

---

## 🎨 Estrutura Visual Detalhada

### Mobile - Layout Proposto

```
┌─────────────────────────────┐
│  (padding igual - py-4)     │
│                             │
│  REGIÕES ATENDIDAS          │
│                             │
│  (espaçamento - my-3)       │
│  ┌─────────────┐           │
│  │             │           │
│  │   [MAPA]    │           │
│  │             │           │
│  └─────────────┘           │
│  (espaçamento - my-3)       │
│                             │
│  [Card 1]                   │
│  (gap-1.5)                  │
│  [Card 2]                   │
│  (gap-1.5)                  │
│  [Card 3]                   │
│                             │
│  [Botão 1] [Botão 2]        │
│  (py-12)                    │
│                             │
│  (padding igual - py-4)     │
└─────────────────────────────┘
(Altura: calc(100vh - 4rem))
(Conteúdo centralizado)
```

---

## ⚠️ Considerações Importantes

### O que NÃO será alterado

- ✅ **Desktop**: Completamente intacto
- ✅ **Estrutura dos cards**: Mantida (apenas espaçamentos)
- ✅ **Conteúdo**: Mantido
- ✅ **Funcionalidade**: Mantida
- ✅ **Altura da seção**: Mantida em `h-[calc(100vh-4rem)]`

### O que será alterado

- ✅ **Imagem mobile**: Margin top-bottom aumentada
- ✅ **Cards mobile**: Gap entre cards aumentado
- ✅ **Botões mobile**: Padding vertical aumentado
- ✅ **Container mobile**: Padding e alinhamento para centralização

### Limitações

- ⚠️ Seção deve permanecer em exatamente 1 viewport
- ⚠️ Se após mudanças houver overflow, ajustar proporcionalmente
- ⚠️ Manter responsividade em diferentes tamanhos de tela

---

## 📝 Checklist de Implementação

### Fase 1: Espaçamento da Imagem
- [ ] Alterar `my-1` para `my-3` na imagem do mapa (mobile)
- [ ] Verificar que desktop não foi afetado
- [ ] Testar visualmente o espaçamento

### Fase 2: Espaçamento Entre Cards
- [ ] Alterar `gap-0.5` para `gap-1.5` no container dos cards (mobile)
- [ ] Verificar que desktop não foi afetado
- [ ] Testar visualmente o espaçamento

### Fase 3: Padding dos Botões
- [ ] Alterar `py-10` para `py-12` nos dois botões (mobile)
- [ ] Verificar que desktop não foi afetado
- [ ] Testar visualmente o padding

### Fase 4: Centralização Vertical
- [ ] Adicionar `py-4` no container do grid (mobile)
- [ ] Alterar `items-start` para `items-center` (mobile)
- [ ] Adicionar `sm:py-0 sm:items-start` para desktop
- [ ] Verificar que desktop não foi afetado

### Fase 5: Validação e Ajustes
- [ ] Verificar se seção ainda cabe em 1 viewport
- [ ] Se houver overflow, ajustar proporcionalmente
- [ ] Testar em diferentes dispositivos mobile (360px, 375px, 414px)
- [ ] Verificar que conteúdo está centralizado
- [ ] Verificar que desktop não foi afetado
- [ ] Ajustes finos se necessário

---

## ✅ Critérios de Sucesso

1. ✅ Imagem do mapa tem espaçamento adequado top-bottom (`my-3`)
2. ✅ Cards têm espaçamento leve entre eles (`gap-1.5`)
3. ✅ Botões têm padding aumentado (`py-12`)
4. ✅ Conteúdo está centralizado verticalmente
5. ✅ Seção ocupa exatamente 1 viewport (sem overflow)
6. ✅ Desktop completamente intacto (nenhuma alteração)
7. ✅ Layout visualmente agradável e equilibrado

---

## 📱 Testes Recomendados

### Dispositivos Mobile
- iPhone SE (375px x 667px)
- iPhone 12/13/14 (390px x 844px)
- iPhone 14 Pro Max (430px x 932px)
- Samsung Galaxy S21 (360px x 800px)

### Verificações Mobile
1. Imagem tem espaçamento adequado do H1 e dos cards
2. Cards têm espaçamento visível entre eles
3. Botões têm padding aumentado e estão mais altos
4. Conteúdo está centralizado verticalmente
5. Seção ocupa exatamente 1 viewport (sem scroll interno)
6. Layout está equilibrado e visualmente agradável
7. Não há overflow ou elementos cortados

### Verificações Desktop
1. Desktop mantém comportamento original
2. Nenhuma alteração visual
3. Layout grid funciona corretamente
4. Espaçamentos mantidos como antes

---

## 🚀 Próximos Passos

Após autorização:
1. Aumentar margin da imagem (`my-1` → `my-3`)
2. Aumentar gap entre cards (`gap-0.5` → `gap-1.5`)
3. Aumentar padding dos botões (`py-10` → `py-12`)
4. Adicionar padding e centralização no container do grid
5. Testar em diferentes dispositivos
6. Verificar que seção ainda cabe em 1 viewport
7. Validar que desktop não foi afetado
8. Ajustes finos se necessário

---

## 📊 Comparação: Antes vs Depois

### Imagem do Mapa
| Propriedade | Antes | Depois |
|-------------|-------|--------|
| Mobile | `my-1` (4px) | `my-3` (12px) |
| Desktop | `sm:my-0` | `sm:my-0` (mantido) |

### Container dos Cards
| Propriedade | Antes | Depois |
|-------------|-------|--------|
| Mobile | `gap-0.5` (2px) | `gap-1.5` (6px) |
| Desktop | `sm:gap-1.5 lg:gap-2` | `sm:gap-1.5 lg:gap-2` (mantido) |

### Botões
| Propriedade | Antes | Depois |
|-------------|-------|--------|
| Mobile | `py-10` (40px) | `py-12` (48px) |
| Desktop | `sm:py-8 lg:py-10` | `sm:py-8 lg:py-10` (mantido) |

### Grid Container
| Propriedade | Antes | Depois |
|-------------|-------|--------|
| Mobile | Sem padding, `items-start` | `py-4`, `items-center` |
| Desktop | `items-start` | `sm:py-0 sm:items-start` (mantido) |

---

## 🔄 Ajustes Proporcionais (Se Necessário)

Caso após as mudanças a seção ultrapasse 1 viewport, os seguintes ajustes podem ser feitos proporcionalmente:

1. **Reduzir padding do grid container**: `py-4` → `py-3` ou `py-2`
2. **Reduzir margin da imagem**: `my-3` → `my-2`
3. **Reduzir gap dos cards**: `gap-1.5` → `gap-1`
4. **Reduzir padding dos botões**: `py-12` → `py-10` ou `py-11`

**Prioridade de ajuste** (se necessário):
1. Padding do grid container (menos impacto visual)
2. Gap dos cards (impacto moderado)
3. Margin da imagem (impacto moderado)
4. Padding dos botões (último recurso)

---

**Data de Criação**: 2025-01-13  
**Versão**: 1.0  
**Status**: Aguardando autorização para implementação

