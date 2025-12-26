# Centralização da Seção "O que é a Estação do Grão?" (Desktop)

## Objetivo

Centralizar verticalmente o conteúdo da segunda seção "O que é a Estação do Grão?" na versão desktop, mantendo o layout mobile inalterado. A seção deve permanecer com altura de `1viewport - menu` (4rem) e os espaçamentos internos devem ser preservados.

---

## Análise da Situação Atual

### Arquivo afetado
- `components/OpenMenuIntro.tsx`

### Estrutura atual

A seção está definida na **linha 59** com as seguintes classes:

```tsx
<section 
  id="apresentacao" 
  className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] py-2 sm:py-4 lg:py-6 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-center sm:justify-start"
>
```

**Problema identificado:**
- Mobile: usa `justify-center` (conteúdo centralizado) ✅
- Desktop: usa `sm:justify-start` (conteúdo no topo) ❌

O container interno (linha 60) também contribui para o alinhamento no topo no desktop:
```tsx
<div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-center py-4 sm:py-0 sm:items-start box-border">
```

**Comportamento atual:**
- Desktop (`sm:` e acima): conteúdo alinhado ao topo devido a `sm:justify-start` e `sm:items-start`
- Mobile: conteúdo centralizado devido a `justify-center` e `items-center`

---

## Solução Proposta

### Mudança necessária

**Arquivo:** `components/OpenMenuIntro.tsx`  
**Linha:** 59

**Alteração:**
- Trocar `sm:justify-start` por `sm:justify-center` na seção principal

### Detalhes técnicos

1. **Altura da seção:** Permanece `h-[calc(100vh-4rem)]` (1 viewport menos 4rem do menu)
2. **Padding vertical:** Mantém `py-2 sm:py-4 lg:py-6` (sem alteração)
3. **Espaçamentos internos:** Todos os gaps, margins e paddings internos permanecem inalterados
4. **Versão mobile:** Permanece completamente inalterada (usa `justify-center` que já está correto)

### Implementação

**Linha 59 - ANTES:**
```tsx
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] py-2 sm:py-4 lg:py-6 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-center sm:justify-start">
```

**Linha 59 - DEPOIS:**
```tsx
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] py-2 sm:py-4 lg:py-6 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-center sm:justify-center">
```

**Observação sobre o container interno:**

O container interno na linha 60 usa `sm:items-start`, mas isso não precisa ser alterado porque:
- `items-start` no grid/flex interno alinha os itens filhos ao início do container (horizontalmente)
- A centralização vertical já é controlada pelo `justify-center` da seção pai
- Alterar isso poderia afetar o layout do grid de duas colunas (texto à esquerda, vídeo à direita)

---

## Impacto Esperado

### Desktop (`sm:` breakpoint e acima)
- ✅ Conteúdo centralizado verticalmente na seção
- ✅ Altura mantida: `1viewport - 4rem`
- ✅ Espaçamentos preservados
- ✅ Layout de duas colunas (texto + vídeo) preservado

### Mobile
- ✅ Sem alterações (já estava centralizado)

---

## Testes Recomendados

Após a implementação, verificar:

1. **Desktop:**
   - [ ] Conteúdo visualmente centralizado verticalmente na seção
   - [ ] Não há espaços excessivos no topo ou bottom
   - [ ] Grid de duas colunas (texto à esquerda, vídeo à direita) funcionando corretamente
   - [ ] Altura da seção continua sendo `100vh - 4rem`

2. **Mobile:**
   - [ ] Layout permanece igual ao anterior (sem regressões)
   - [ ] Conteúdo continua centralizado

3. **Tablet (breakpoint intermediário):**
   - [ ] Comportamento consistente entre desktop e mobile

---

## Breakpoints do Projeto

Baseado no padrão Tailwind e código existente:
- **Mobile:** `< 640px` (base, sem prefixo)
- **Desktop:** `≥ 640px` (prefixo `sm:`)
- **Tablet/Desktop médio:** `≥ 768px` (prefixo `md:`)
- **Desktop grande:** `≥ 1024px` (prefixo `lg:`)

A mudança proposta afeta apenas `sm:` e breakpoints superiores (desktop).

---

## Resumo da Mudança

| Item | Status |
|------|--------|
| Arquivo modificado | `components/OpenMenuIntro.tsx` |
| Linha modificada | 59 |
| Classe alterada | `sm:justify-start` → `sm:justify-center` |
| Impacto no mobile | Nenhum (inalterado) |
| Impacto no desktop | Conteúdo centralizado verticalmente |
| Altura da seção | Mantida (`h-[calc(100vh-4rem)]`) |
| Espaçamentos | Preservados |

