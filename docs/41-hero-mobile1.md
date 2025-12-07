# Documentação: Ajustes Finais Mobile - Seção Hero

## 📋 Visão Geral

Este documento detalha as modificações necessárias para otimizar a seção Hero na versão mobile, focando em:
- H1 sem quebra de linha (mantendo tamanho limite)
- Redução do slideshow
- Ajuste do texto descritivo (tamanho e justificação sem hífen)
- Prevenção de quebra de linha nos cards compactos (especialmente o terceiro)

**Importante**: Todas as alterações são aplicadas **APENAS para a versão mobile** (breakpoint < 640px), preservando o comportamento desktop.

---

## 🎯 Objetivos

1. **H1**: Manter em linha única em mobile, ajustando tamanho para caber
2. **Slideshow**: Reduzir proporcionalmente o tamanho em mobile
3. **Texto descritivo**: Reduzir tamanho e aplicar justificação sem hífen em mobile
4. **Cards compactos**: Evitar quebra de linha, especialmente no terceiro card, reduzindo ícone, fonte e padding se necessário

---

## 📐 Análise do Estado Atual

### H1 (Título Principal)
- **Atual**: `break-words` permite quebra, `sm:whitespace-nowrap` apenas em desktop
- **Problema**: Em mobile, o texto quebra em múltiplas linhas
- **Solução**: Adicionar `whitespace-nowrap` também em mobile, ajustar clamp para garantir que caiba

### Slideshow
- **Atual**: `aspect-[4/3]` em mobile
- **Problema**: Pode estar muito grande para mobile
- **Solução**: Reduzir aspect ratio ou adicionar max-width em mobile

### Texto Descritivo
- **Atual**: `text-left` em mobile, `text-justify` apenas em desktop, `hyphens-auto`
- **Problema**: Não está justificado em mobile e tem hífen
- **Solução**: Aplicar `text-justify` e `hyphens-none` em mobile, reduzir tamanho da fonte

### FeatureItemCompact (Cards)
- **Atual**: Ícone `w-5 h-5`, texto `text-xs`, padding `px-3.5 py-2.5`, `break-words`
- **Problema**: Terceiro card quebra linha devido ao texto longo
- **Solução**: Reduzir ícone, fonte e padding em mobile, usar `whitespace-nowrap` ou reduzir ainda mais o tamanho

---

## 🔧 Mudanças Propostas

### 1. H1 - Sem Quebra de Linha em Mobile

**Arquivo**: `components/hero/Hero.tsx`

**Linha**: ~67-78

**Mudança**:
```tsx
// ANTES:
<h1
  className="
    font-montserrat text-cream-50 font-bold
    tracking-tight text-center
    mb-3 sm:mb-4 md:mb-5 lg:mb-6
    uppercase sm:whitespace-nowrap
    !text-[clamp(1.25rem,3.5vw,2rem)] sm:!text-[clamp(1.75rem,2.8vw,2.5rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)]
    break-words px-1 sm:px-0
  "
>

// DEPOIS:
<h1
  className="
    font-montserrat text-cream-50 font-bold
    tracking-tight text-center
    mb-3 sm:mb-4 md:mb-5 lg:mb-6
    uppercase whitespace-nowrap
    !text-[clamp(1rem,2.5vw,1.5rem)] sm:!text-[clamp(1.75rem,2.8vw,2.5rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)]
    px-1 sm:px-0
  "
>
```

**Detalhes**:
- Remover `break-words` (permite quebra)
- Adicionar `whitespace-nowrap` também em mobile (remover `sm:`)
- Ajustar clamp mobile: `clamp(1rem,2.5vw,1.5rem)` (reduzido de `1.25rem` para `1rem` mínimo e de `2rem` para `1.5rem` máximo)
- Manter `px-1` em mobile para padding lateral mínimo

---

### 2. Slideshow - Redução de Tamanho em Mobile

**Arquivo**: `components/hero/Hero.tsx`

**Linha**: ~97

**Mudança**:
```tsx
// ANTES:
<div className="relative aspect-[4/3] sm:aspect-[4/3.5] lg:aspect-[16/11] w-full overflow-hidden">

// DEPOIS:
<div className="relative aspect-[3/2.5] sm:aspect-[4/3.5] lg:aspect-[16/11] w-full overflow-hidden max-w-[95%] sm:max-w-none mx-auto sm:mx-0">
```

**Detalhes**:
- Alterar aspect ratio mobile: `aspect-[3/2.5]` (mais compacto que `4/3`)
- Adicionar `max-w-[95%]` em mobile para reduzir largura
- Centralizar em mobile: `mx-auto sm:mx-0`

---

### 3. Texto Descritivo - Justificado sem Hífen e Reduzido

**Arquivo**: `components/hero/Hero.tsx`

**Linha**: ~149

**Mudança**:
```tsx
// ANTES:
<p className="text-cream-50 text-[clamp(0.8125rem,0.25vw+0.8rem,0.9375rem)] sm:text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-left sm:text-justify indent-0 sm:indent-2 md:indent-3 lg:indent-6 hyphens-auto break-words">

// DEPOIS:
<p className="text-cream-50 text-[clamp(0.75rem,0.2vw+0.75rem,0.875rem)] sm:text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-0 sm:indent-2 md:indent-3 lg:indent-6 hyphens-none break-words">
```

**Detalhes**:
- Reduzir tamanho mobile: `clamp(0.75rem,0.2vw+0.75rem,0.875rem)` (de `0.8125rem` para `0.75rem` mínimo, de `0.9375rem` para `0.875rem` máximo)
- Aplicar `text-justify` também em mobile (remover `text-left` e `sm:`)
- Alterar `hyphens-auto` para `hyphens-none` (remover hífens)
- Manter `break-words` para quebra de palavras longas se necessário

---

### 4. FeatureItemCompact - Prevenir Quebra de Linha

**Arquivo**: `components/hero/FeatureItemCompact.tsx`

**Mudança Completa**:
```tsx
// ANTES:
export default function FeatureItemCompact({ icon, title }: FeatureItemCompactProps) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-card hover:bg-coffee-700/40 transition-colors">
      <div className="flex items-center gap-2.5 sm:gap-2 px-3.5 sm:px-3 py-2.5 sm:py-2 min-w-0">
        <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
          {icon}
        </span>
        <span className="text-cream-50 font-semibold text-xs sm:text-xs md:text-sm leading-tight sm:leading-none break-words min-w-0 flex-1">
          {title}
        </span>
      </div>
    </div>
  );
}

// DEPOIS:
export default function FeatureItemCompact({ icon, title }: FeatureItemCompactProps) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-xl ring-1 ring-cream-50/15 bg-coffee-card hover:bg-coffee-700/40 transition-colors">
      <div className="flex items-center gap-2 sm:gap-2 px-2.5 sm:px-3 py-2 sm:py-2 min-w-0">
        <span className="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">
          {icon}
        </span>
        <span className="text-cream-50 font-semibold text-[0.65rem] sm:text-xs md:text-sm leading-tight sm:leading-none whitespace-nowrap min-w-0 flex-1 overflow-hidden text-ellipsis">
          {title}
        </span>
      </div>
    </div>
  );
}
```

**Detalhes**:
- **Gap reduzido**: `gap-2` em mobile (de `gap-2.5`)
- **Padding reduzido**: `px-2.5 py-2` em mobile (de `px-3.5 py-2.5`)
- **Ícone**: Manter `w-5 h-5` (já pequeno, mas pode ser reduzido se necessário)
- **Fonte reduzida**: `text-[0.65rem]` em mobile (de `text-xs` que é `0.75rem`)
- **Quebra de linha**: `whitespace-nowrap` em mobile para evitar quebra
- **Overflow**: `overflow-hidden text-ellipsis` para truncar texto muito longo
- **Desktop**: Manter comportamento atual com `sm:text-xs`

**Alternativa para ícone menor** (se necessário):
```tsx
// No Hero.tsx, onde os ícones são passados:
<FeatureItemCompact icon={<Coffee className="w-4 h-4 sm:w-5 sm:h-5" />} title="..." />
<FeatureItemCompact icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />} title="..." />
<FeatureItemCompact icon={<Store className="w-4 h-4 sm:w-5 sm:h-5" />} title="..." />
```

---

## 📝 Checklist de Implementação

### Fase 1: H1
- [ ] Remover `break-words` do H1
- [ ] Adicionar `whitespace-nowrap` (remover `sm:`)
- [ ] Ajustar clamp mobile: `clamp(1rem,2.5vw,1.5rem)`
- [ ] Testar em diferentes larguras mobile (360px, 375px, 414px)

### Fase 2: Slideshow
- [ ] Alterar aspect ratio mobile: `aspect-[3/2.5]`
- [ ] Adicionar `max-w-[95%]` em mobile
- [ ] Adicionar `mx-auto sm:mx-0` para centralizar
- [ ] Testar visualização do slideshow

### Fase 3: Texto Descritivo
- [ ] Reduzir clamp mobile: `clamp(0.75rem,0.2vw+0.75rem,0.875rem)`
- [ ] Aplicar `text-justify` também em mobile
- [ ] Alterar `hyphens-auto` para `hyphens-none`
- [ ] Testar justificação e ausência de hífens

### Fase 4: FeatureItemCompact
- [ ] Reduzir gap: `gap-2` em mobile
- [ ] Reduzir padding: `px-2.5 py-2` em mobile
- [ ] Reduzir fonte: `text-[0.65rem]` em mobile
- [ ] Adicionar `whitespace-nowrap` em mobile
- [ ] Adicionar `overflow-hidden text-ellipsis`
- [ ] (Opcional) Reduzir ícones para `w-4 h-4` em mobile
- [ ] Testar especialmente o terceiro card

### Fase 5: Validação
- [ ] Testar em 360px, 375px, 414px
- [ ] Verificar que H1 não quebra linha
- [ ] Verificar que slideshow está menor
- [ ] Verificar que texto está justificado sem hífen
- [ ] Verificar que cards não quebram linha
- [ ] Verificar que desktop não foi afetado

---

## 🎨 Classes Tailwind Utilizadas

### H1
```tsx
whitespace-nowrap                    // Sem quebra em todas as telas
!text-[clamp(1rem,2.5vw,1.5rem)]     // Tamanho reduzido mobile
```

### Slideshow
```tsx
aspect-[3/2.5]                       // Aspect ratio mais compacto mobile
max-w-[95%]                           // Largura máxima reduzida mobile
mx-auto                               // Centralização mobile
```

### Texto
```tsx
text-[clamp(0.75rem,0.2vw+0.75rem,0.875rem)]  // Fonte reduzida mobile
text-justify                          // Justificação também em mobile
hyphens-none                          // Sem hífens
```

### FeatureItemCompact
```tsx
gap-2                                 // Gap reduzido mobile
px-2.5 py-2                           // Padding reduzido mobile
text-[0.65rem]                        // Fonte muito pequena mobile
whitespace-nowrap                     // Sem quebra de linha
overflow-hidden text-ellipsis         // Truncar texto longo
```

---

## ⚠️ Considerações Especiais

### H1
- O `whitespace-nowrap` pode fazer o texto ficar muito pequeno em telas muito estreitas (360px)
- O clamp garante tamanho mínimo legível (1rem = 16px)
- Se necessário, pode-se usar `text-[clamp(0.875rem,2vw,1.25rem)]` como alternativa mais conservadora

### Slideshow
- A redução para `max-w-[95%]` pode ser ajustada para `max-w-[90%]` se ainda estiver muito grande
- O aspect ratio `3/2.5` pode ser ajustado conforme necessidade visual

### Texto Descritivo
- A justificação pode criar espaços grandes entre palavras em mobile
- Se o espaçamento ficar muito grande, considerar manter `text-left` em mobile
- O tamanho `0.75rem` (12px) é o mínimo recomendado para legibilidade

### FeatureItemCompact
- O `whitespace-nowrap` com `text-ellipsis` pode cortar parte do texto em telas muito estreitas
- Se o texto for cortado demais, considerar reduzir ainda mais a fonte ou usar `text-[0.6rem]`
- Alternativamente, pode-se usar `text-xs` com `whitespace-nowrap` e aceitar que o texto fique menor mas completo

---

## 📊 Comparação: Antes vs Depois

### H1
| Propriedade | Antes (Mobile) | Depois (Mobile) |
|-------------|----------------|-----------------|
| Quebra de linha | `break-words` (permite) | `whitespace-nowrap` (não permite) |
| Tamanho mínimo | `1.25rem` (20px) | `1rem` (16px) |
| Tamanho máximo | `2rem` (32px) | `1.5rem` (24px) |

### Slideshow
| Propriedade | Antes (Mobile) | Depois (Mobile) |
|-------------|----------------|-----------------|
| Aspect ratio | `4/3` (1.33) | `3/2.5` (1.2) |
| Largura máxima | `100%` | `95%` |
| Centralização | Não | Sim (`mx-auto`) |

### Texto Descritivo
| Propriedade | Antes (Mobile) | Depois (Mobile) |
|-------------|----------------|-----------------|
| Tamanho mínimo | `0.8125rem` (13px) | `0.75rem` (12px) |
| Tamanho máximo | `0.9375rem` (15px) | `0.875rem` (14px) |
| Alinhamento | `text-left` | `text-justify` |
| Hífens | `hyphens-auto` | `hyphens-none` |

### FeatureItemCompact
| Propriedade | Antes (Mobile) | Depois (Mobile) |
|-------------|----------------|-----------------|
| Gap | `gap-2.5` (10px) | `gap-2` (8px) |
| Padding X | `px-3.5` (14px) | `px-2.5` (10px) |
| Padding Y | `py-2.5` (10px) | `py-2` (8px) |
| Fonte | `text-xs` (0.75rem/12px) | `text-[0.65rem]` (10.4px) |
| Quebra | `break-words` (permite) | `whitespace-nowrap` (não permite) |
| Overflow | Não | `overflow-hidden text-ellipsis` |

---

## 🔍 Arquivos Afetados

```
components/
├── hero/
│   ├── Hero.tsx                    → H1, Slideshow, Texto descritivo
│   └── FeatureItemCompact.tsx      → Cards compactos
```

---

## ✅ Critérios de Sucesso

1. ✅ H1 não quebra linha em mobile (360px - 414px)
2. ✅ H1 mantém tamanho legível (mínimo 16px)
3. ✅ Slideshow está visualmente menor em mobile
4. ✅ Texto descritivo está justificado sem hífens em mobile
5. ✅ Texto descritivo mantém legibilidade (mínimo 12px)
6. ✅ Cards compactos não quebram linha em mobile
7. ✅ Terceiro card especialmente não quebra linha
8. ✅ Desktop não foi afetado (comportamento mantido)
9. ✅ Não há overflow horizontal
10. ✅ Layout permanece visualmente agradável

---

## 📱 Testes Recomendados

### Dispositivos Mobile
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- iPhone 14 Pro Max (430px)
- Samsung Galaxy S21 (360px)
- Pixel 5 (393px)

### Verificações
1. H1 cabe em uma linha em todas as larguras testadas
2. Slideshow não ocupa mais de 95% da largura
3. Texto descritivo está justificado e sem hífens
4. Todos os 3 cards ficam em uma linha
5. Terceiro card não quebra mesmo com texto longo
6. Desktop mantém layout original

---

## 🚀 Próximos Passos

Após autorização:
1. Implementar mudanças no H1
2. Implementar mudanças no Slideshow
3. Implementar mudanças no Texto descritivo
4. Implementar mudanças no FeatureItemCompact
5. Testar em diferentes dispositivos mobile
6. Validar que desktop não foi afetado
7. Ajustes finos se necessário

---

**Data de Criação**: 2025-01-13  
**Versão**: 1.0  
**Status**: Aguardando autorização para implementação

