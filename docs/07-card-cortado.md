# Correção: Card Central Cortado na Seção "Nossos Serviços" (Desktop)

## Objetivo

Corrigir o corte do card central (ativo) no carrossel da seção "Nossos Serviços" na versão desktop. O card está sendo cortado no topo e na parte inferior devido ao efeito `scale-105` aplicado no card ativo, sem que o container tenha espaço suficiente para exibir o card completo.

**Requisitos:**
- ✅ Corrigir o corte do card central
- ✅ Manter o tamanho da seção inalterado (`1viewport - menu`)
- ✅ Apenas versão desktop (mobile inalterado)

---

## Análise do Problema

### Causa Raiz

**Arquivo:** `components/sections/services-carousel.tsx`

**Linha 85:** Container do carrossel com `overflow-hidden`
```tsx
<div className="overflow-hidden cursor-grab active:cursor-grabbing py-2 sm:py-3 w-full max-w-[100vw]" ref={emblaRef}>
```

**Linhas 103-112:** Card ativo com `scale-105`
```tsx
<div className={`
  h-full rounded-2xl border bg-coffee-900/80 backdrop-blur-sm
  shadow-md transition-all duration-300 ease-out
  ${
    isActive
      ? "scale-105 opacity-100 shadow-xl border-coffee-500/40"
      : "scale-95 opacity-70 border-coffee-700"
  }
`}>
```

### Por que está cortando?

1. **Card ativo aumenta 5%:** O `scale-105` aumenta o tamanho do card em 5% (tanto largura quanto altura)
2. **Container com overflow-hidden:** O container tem `overflow-hidden`, o que corta qualquer conteúdo que ultrapasse seus limites
3. **Padding insuficiente:** O padding vertical atual (`py-2 sm:py-3` = 8px mobile, 12px desktop) não é suficiente para acomodar os 5% adicionais de altura do card quando ele escala

### Cálculo do Problema

```
Card normal: altura H
Card com scale-105: altura H * 1.05 = H + (H * 0.05)

Crescimento vertical: +2.5% no topo + 2.5% no bottom = 5% total
Se o card tem ~400px de altura: +20px (10px top + 10px bottom)

Padding atual desktop: py-3 = 12px em cada lado = 24px total
Necessário para scale-105: ~10-12px adicional em cada lado
```

---

## Solução Proposta

### Estratégia

Adicionar padding vertical adicional **apenas no desktop** no container do carrossel para acomodar o `scale-105` do card ativo, sem alterar o tamanho total da seção (pois a seção usa `justify-center` e o espaço extra será distribuído igualmente).

### Mudança Necessária

**Arquivo:** `components/sections/services-carousel.tsx`  
**Linha:** 85

#### ANTES:
```tsx
<div className="overflow-hidden cursor-grab active:cursor-grabbing py-2 sm:py-3 w-full max-w-[100vw]" ref={emblaRef}>
```

#### DEPOIS:
```tsx
<div className="overflow-hidden cursor-grab active:cursor-grabbing py-2 sm:py-6 w-full max-w-[100vw]" ref={emblaRef}>
```

**Alteração:**
- Mobile: `py-2` (mantido, 8px em cada lado)
- Desktop: `sm:py-3` → `sm:py-6` (de 12px para 24px em cada lado)

**Justificativa:**
- O padding adicional de 12px em cada lado (24px total) é suficiente para acomodar o `scale-105` (~10-12px de crescimento em cada direção)
- Como a seção usa `justify-center`, o espaço extra será distribuído proporcionalmente, mantendo o conteúdo visualmente centralizado
- O tamanho da seção (`h-[calc(100vh-4rem)]`) permanece inalterado, apenas o conteúdo interno tem mais espaço para respirar

---

## Impacto Esperado

### Desktop (≥640px)
- ✅ Card central (ativo) não será mais cortado no topo e bottom
- ✅ Efeito `scale-105` funcionando corretamente sem corte
- ✅ Cards laterais continuam funcionando normalmente
- ✅ Seção mantém altura de `1viewport - menu`
- ✅ Conteúdo continua visualmente centralizado (devido ao `justify-center` da seção pai)

### Mobile (<640px)
- ✅ Sem alterações (`py-2` mantido)
- ✅ Layout preservado

---

## Alternativas Consideradas e Rejeitadas

### ❌ Alternativa 1: Remover `overflow-hidden`
**Por que não:**
- Quebraria o carrossel horizontal (cards laterais apareceriam)
- É necessário para o funcionamento do Embla Carousel

### ❌ Alternativa 2: Usar `overflow-y-visible overflow-x-hidden`
**Por que não:**
- `overflow-x-hidden overflow-y-visible` não funciona em CSS (se um eixo é hidden, o outro também deve ser)
- Poderia causar scrollbars indesejados

### ❌ Alternativa 3: Reduzir `scale-105` para `scale-102`
**Por que não:**
- Reduziria o efeito visual desejado
- Não resolveria completamente o problema se o padding continuar insuficiente

### ❌ Alternativa 4: Aumentar padding do container principal da seção
**Por que não:**
- Alteraria a proporção geral da seção
- A solução proposta é mais localizada e específica ao problema

---

## Análise de Espaçamento

### Espaçamento Atual (Desktop)

```
Container principal (page.tsx linha 23):
- Padding vertical: sm:py-3 = 12px (top + bottom)

Header (page.tsx linha 25):
- Margin-bottom: sm:mb-6 = 24px

Carrossel container (services-carousel.tsx linha 85):
- Padding vertical: sm:py-3 = 12px (top + bottom) ← PROBLEMA

Botões navegação (services-carousel.tsx linha 183):
- Margin-top: mt-3 = 12px
```

### Espaçamento Após Correção (Desktop)

```
Container principal: sm:py-3 = 12px (inalterado)
Header: sm:mb-6 = 24px (inalterado)
Carrossel container: sm:py-6 = 24px (top + bottom) ← CORRIGIDO (+12px cada lado)
Botões navegação: mt-3 = 12px (inalterado)
```

### Impacto no Espaço Total

- **Espaço adicional necessário:** +24px total (12px top + 12px bottom)
- **Compensação:** Como a seção usa `justify-center`, o espaço extra será distribuído proporcionalmente
- **Resultado:** Conteúdo continua centralizado, mas com espaço suficiente para o card ativo escalar

---

## Testes Recomendados

### Desktop (≥640px)
- [ ] Card central (ativo) não está cortado no topo
- [ ] Card central (ativo) não está cortado no bottom
- [ ] Efeito `scale-105` visível e completo
- [ ] Cards laterais continuam funcionando normalmente
- [ ] Navegação do carrossel funciona corretamente
- [ ] Seção mantém altura de `100vh - 4rem` (sem scroll interno)
- [ ] Conteúdo visualmente centralizado na seção

### Mobile (<640px)
- [ ] Layout inalterado (comparar com versão anterior)
- [ ] Cards navegáveis normalmente
- [ ] Sem overflow ou problemas visuais

### Tablet (640px-1024px)
- [ ] Comportamento consistente com desktop
- [ ] Cards não cortados
- [ ] Navegação funcionando

---

## Observações Importantes

### Sobre o Padding Adicional

1. **Distribuição do espaço:** Como a seção pai usa `flex flex-col justify-center`, o padding adicional será distribuído automaticamente, mantendo o conteúdo centralizado visualmente.

2. **Proporção visual:** O aumento de 12px para 24px em cada lado (+12px cada) representa um aumento moderado que não compromete a estética, mas resolve o problema técnico.

3. **Seção inalterada:** O tamanho da seção (`h-[calc(100vh-4rem)]`) permanece exatamente o mesmo. Apenas o espaço interno do container do carrossel é aumentado.

### Sobre o Scale

1. **Scale-105:** O efeito de aumento de 5% é mantido, criando o destaque visual desejado no card ativo.

2. **Transição:** A transição `duration-300 ease-out` continua funcionando normalmente.

3. **Cards inativos:** Os cards inativos com `scale-95` não são afetados pela mudança.

---

## Riscos e Mitigações

### Risco 1: Conteúdo muito espaçado verticalmente
**Mitigação:** O aumento é conservador (+12px cada lado). Se necessário, pode ser ajustado para `sm:py-5` (20px) como meio termo.

### Risco 2: Seção ultrapassar viewport
**Mitigação:** Como a seção tem altura fixa `h-[calc(100vh-4rem)]` e usa `justify-center`, o conteúdo será ajustado proporcionalmente sem ultrapassar os limites.

### Risco 3: Regressão no mobile
**Mitigação:** A mudança usa `sm:py-6`, então mobile (classe base `py-2`) permanece inalterado.

### Risco 4: Cards laterais também precisarem de mais espaço
**Mitigação:** Cards laterais usam `scale-95` (menores), então não precisam do espaço extra. Apenas o card ativo (`scale-105`) precisa.

---

## Resumo da Mudança

| Item | Valor |
|------|-------|
| **Arquivo modificado** | `components/sections/services-carousel.tsx` |
| **Linha modificada** | 85 |
| **Classe alterada** | `py-2 sm:py-3` → `py-2 sm:py-6` |
| **Impacto mobile** | Nenhum (`py-2` mantido) |
| **Impacto desktop** | Padding vertical aumentado de 12px para 24px em cada lado |
| **Tamanho da seção** | Inalterado (`h-[calc(100vh-4rem)]`) |
| **Espaço adicional** | +24px total (12px top + 12px bottom) |

---

## Conclusão

Esta correção resolve o problema do card cortado adicionando padding vertical suficiente para acomodar o efeito `scale-105` do card ativo, mantendo:
- ✅ Tamanho da seção inalterado
- ✅ Mobile completamente inalterado
- ✅ Efeito visual do card ativo preservado
- ✅ Funcionalidade do carrossel preservada
- ✅ Conteúdo visualmente balanceado

**Total de arquivos modificados:** 1  
**Total de linhas modificadas:** 1  
**Risco de regressão:** Baixo (mudança localizada e conservadora)

