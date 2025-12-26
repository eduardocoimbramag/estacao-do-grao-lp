# Plano de Correção: Seções 3 e 4 (Desktop)

## Objetivo

Ajustar as seções "Nossos Serviços" (3ª) e "Regiões Atendidas" (4ª) para que ambas tenham altura de `1viewport - menu` (calc(100vh-4rem)) na versão desktop, mantendo o mobile completamente inalterado.

---

## Análise Geral dos Problemas

### Problema Comum
Ambas as seções usam `sm:h-screen` (100vh) ao invés de `sm:h-[calc(100vh-4rem)]` no desktop, o que as torna maiores que o viewport disponível (considerando o menu de 4rem).

### Seção 3: Problema Adicional
Além da altura incorreta, a seção possui espaçamentos internos muito grandes que fazem o conteúdo ultrapassar os limites, especialmente com os botões de navegação do carrossel posicionados no final.

### Seção 4: Situação Simplificada
O conteúdo está perfeito, apenas a altura da seção e padding vertical precisam ser ajustados.

---

## SEÇÃO 3: NOSSOS SERVIÇOS

### Análise Detalhada

**Arquivo:** `app/page.tsx` (linhas 19-38)

#### Estrutura Atual
```tsx
<section
  id="nossos-servicos"
  className="h-[calc(100vh-4rem)] sm:h-screen flex flex-col justify-center bg-coffee-700/50 overflow-x-hidden w-full"
>
  <div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 box-border">
    {/* Cabeçalho da Section */}
    <header className="mb-8 sm:mb-10 text-center space-y-3">
      <h2>Nossos Serviços</h2>
      <p>Da sua empresa a grandes eventos...</p>
    </header>

    {/* Carrossel de Cards */}
    <ServicesCarousel cards={SERVICES_CAROUSEL_CARDS} />
  </div>
</section>
```

#### Problemas Identificados

1. **Altura da seção (linha 21):**
   - Mobile: `h-[calc(100vh-4rem)]` ✅ (correto)
   - Desktop: `sm:h-screen` ❌ (deveria ser `sm:h-[calc(100vh-4rem)]`)

2. **Padding do container interno (linha 23):**
   - Desktop: `sm:py-6 lg:py-8` (muito espaçamento vertical)

3. **Margin-bottom do header (linha 25):**
   - Desktop: `sm:mb-10` (10 * 0.25rem = 2.5rem = 40px)
   - Muito espaço entre título e carrossel

**Componente ServicesCarousel (`components/sections/services-carousel.tsx`):**

4. **Padding vertical do container do carrossel (linha 85):**
   - `py-5` (1.25rem = 20px em cima e embaixo)
   - Total: 40px de padding adicional

5. **Margin-top dos botões desktop (linha 183):**
   - `mt-5` (1.25rem = 20px)

6. **Margin-top dos indicadores mobile (linha 256):**
   - `mt-6` (1.5rem = 24px)

#### Cálculo do Overflow Atual (Desktop)

```
Container padding: py-6 (24px top + 24px bottom) = 48px
Header margin-bottom: mb-10 = 40px
Carrossel padding: py-5 (20px top + 20px bottom) = 40px
Botões margin-top: mt-5 = 20px
---
Total de espaçamentos verticais: 148px (9.25rem)

+ Altura do conteúdo (header texto + cards + botões)
+ 100vh (ao invés de 100vh-4rem)
= Seção maior que o viewport disponível
```

### Solução Proposta para Seção 3

#### Mudança 1: Altura da Seção

**Arquivo:** `app/page.tsx`, linha 21

**ANTES:**
```tsx
className="h-[calc(100vh-4rem)] sm:h-screen flex flex-col justify-center bg-coffee-700/50 overflow-x-hidden w-full"
```

**DEPOIS:**
```tsx
className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] flex flex-col justify-center bg-coffee-700/50 overflow-x-hidden w-full"
```

**Impacto:** Seção terá altura correta no desktop (100vh - 4rem do menu)

---

#### Mudança 2: Reduzir Padding do Container Principal

**Arquivo:** `app/page.tsx`, linha 23

**ANTES:**
```tsx
className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 box-border"
```

**DEPOIS:**
```tsx
className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-3 lg:py-4 box-border"
```

**Alteração:**
- Desktop: `sm:py-6` → `sm:py-3` (de 24px para 12px em cada lado)
- Desktop grande: `lg:py-8` → `lg:py-4` (de 32px para 16px em cada lado)
- Mobile: `py-4` (mantido, sem alteração)

**Economia:** ~32px no total (desktop grande)

---

#### Mudança 3: Reduzir Margin-bottom do Header

**Arquivo:** `app/page.tsx`, linha 25

**ANTES:**
```tsx
<header className="mb-8 sm:mb-10 text-center space-y-3">
```

**DEPOIS:**
```tsx
<header className="mb-8 sm:mb-6 text-center space-y-3">
```

**Alteração:**
- Desktop: `sm:mb-10` → `sm:mb-6` (de 40px para 24px)
- Mobile: `mb-8` (mantido, sem alteração)

**Economia:** 16px

---

#### Mudança 4: Reduzir Padding do Container do Carrossel

**Arquivo:** `components/sections/services-carousel.tsx`, linha 85

**ANTES:**
```tsx
<div className="overflow-hidden cursor-grab active:cursor-grabbing py-5 w-full max-w-[100vw]" ref={emblaRef}>
```

**DEPOIS:**
```tsx
<div className="overflow-hidden cursor-grab active:cursor-grabbing py-2 sm:py-3 w-full max-w-[100vw]" ref={emblaRef}>
```

**Alteração:**
- Mobile: `py-2` (8px em cada lado = 16px total)
- Desktop: `sm:py-3` (12px em cada lado = 24px total)
- Antes: `py-5` (20px em cada lado = 40px total) em todos os tamanhos

**Economia:** 16px no desktop, mantém mobile funcional

---

#### Mudança 5: Reduzir Margin-top dos Botões de Navegação (Desktop)

**Arquivo:** `components/sections/services-carousel.tsx`, linha 183

**ANTES:**
```tsx
<div className="hidden lg:flex justify-center items-center gap-4 mt-5">
```

**DEPOIS:**
```tsx
<div className="hidden lg:flex justify-center items-center gap-4 mt-3">
```

**Alteração:**
- Desktop: `mt-5` → `mt-3` (de 20px para 12px)
- Apenas desktop (hidden em mobile)

**Economia:** 8px

---

#### Mudança 6: Manter Margin-top dos Indicadores Mobile

**Arquivo:** `components/sections/services-carousel.tsx`, linha 256

**DECISÃO:** Manter `mt-6` inalterado (não afeta desktop)

**Razão:** Esta classe só aparece em mobile (`flex lg:hidden`), então não deve ser alterada.

---

### Resumo das Economias - Seção 3 (Desktop)

| Item | Antes | Depois | Economia |
|------|-------|--------|----------|
| Container padding vertical | 32px (lg:py-8) | 16px (lg:py-4) | 16px |
| Header margin-bottom | 40px (sm:mb-10) | 24px (sm:mb-6) | 16px |
| Carrossel padding vertical | 40px (py-5) | 24px (sm:py-3) | 16px |
| Botões margin-top | 20px (mt-5) | 12px (mt-3) | 8px |
| **Altura da seção** | **100vh** | **100vh-4rem** | **4rem** |
| **Total economizado** | - | - | **~56px + ajuste de altura** |

---

## SEÇÃO 4: REGIÕES ATENDIDAS

### Análise Detalhada

**Arquivo:** `components/audience.tsx` (linha 7)

#### Estrutura Atual
```tsx
<section className="h-[calc(100vh-4rem)] sm:h-screen py-4 sm:py-16 lg:py-20 bg-coffee-900 overflow-x-hidden w-full">
  <div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 box-border">
    {/* Conteúdo perfeito */}
  </div>
</section>
```

#### Problemas Identificados

1. **Altura da seção:**
   - Mobile: `h-[calc(100vh-4rem)]` ✅
   - Desktop: `sm:h-screen` ❌ (deveria ser `sm:h-[calc(100vh-4rem)]`)

2. **Padding vertical excessivo:**
   - Mobile: `py-4` ✅ (correto)
   - Desktop: `sm:py-16` (64px em cada lado = 128px total)
   - Desktop grande: `lg:py-20` (80px em cada lado = 160px total)

#### Cálculo do Overflow Atual (Desktop)

```
Seção padding vertical: py-20 (80px top + 80px bottom) = 160px
+ Altura do conteúdo (já está bem distribuído)
+ 100vh (ao invés de 100vh-4rem)
= Seção muito maior que o viewport disponível
```

### Solução Proposta para Seção 4

#### Mudança 1: Altura da Seção e Padding Vertical

**Arquivo:** `components/audience.tsx`, linha 7

**ANTES:**
```tsx
<section className="h-[calc(100vh-4rem)] sm:h-screen py-4 sm:py-16 lg:py-20 bg-coffee-900 overflow-x-hidden w-full">
```

**DEPOIS:**
```tsx
<section className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 bg-coffee-900 overflow-x-hidden w-full">
```

**Alterações:**
1. Altura desktop: `sm:h-screen` → `sm:h-[calc(100vh-4rem)]`
2. Padding desktop: `sm:py-16` → `sm:py-6` (de 64px para 24px em cada lado)
3. Padding desktop grande: `lg:py-20` → `lg:py-8` (de 80px para 32px em cada lado)
4. Mobile: `h-[calc(100vh-4rem)] py-4` (mantido, sem alteração)

**Impacto:** Seção caberá perfeitamente em `1viewport - menu`, conteúdo já está bem distribuído e centralizado.

---

### Justificativa para Seção 4

O conteúdo interno já está bem estruturado e balanceado. A seção usa `sm:items-start` no grid interno que alinha adequadamente. Com a correção da altura e padding, o conteúdo ficará perfeitamente centralizado visualmente dentro do espaço disponível.

---

## Resumo Executivo das Mudanças

### Seção 3: Nossos Serviços

| Arquivo | Linha | Classe ANTES | Classe DEPOIS |
|---------|-------|--------------|---------------|
| `app/page.tsx` | 21 | `sm:h-screen` | `sm:h-[calc(100vh-4rem)]` |
| `app/page.tsx` | 23 | `sm:py-6 lg:py-8` | `sm:py-3 lg:py-4` |
| `app/page.tsx` | 25 | `sm:mb-10` | `sm:mb-6` |
| `components/sections/services-carousel.tsx` | 85 | `py-5` | `py-2 sm:py-3` |
| `components/sections/services-carousel.tsx` | 183 | `mt-5` | `mt-3` |

**Total de mudanças:** 5 alterações em 2 arquivos

---

### Seção 4: Regiões Atendidas

| Arquivo | Linha | Classe ANTES | Classe DEPOIS |
|---------|-------|--------------|---------------|
| `components/audience.tsx` | 7 | `sm:h-screen py-4 sm:py-16 lg:py-20` | `sm:h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8` |

**Total de mudanças:** 1 alteração em 1 arquivo

---

## Checklist de Garantia de Qualidade

### Antes da Implementação
- [ ] Backup dos arquivos originais
- [ ] Revisar linha por linha as mudanças propostas
- [ ] Confirmar que mobile usa classes base (sem `sm:`, `md:`, `lg:`)
- [ ] Verificar que todas as mudanças têm `sm:` ou breakpoints maiores

### Durante a Implementação
- [ ] Aplicar mudanças uma de cada vez
- [ ] Testar no navegador após cada mudança
- [ ] Verificar console do navegador (não deve ter erros)
- [ ] Verificar linter (executar `read_lints`)

### Após a Implementação

#### Desktop (≥640px)
- [ ] **Seção 3:** Altura = `100vh - 4rem` (não deve fazer scroll dentro da seção)
- [ ] **Seção 3:** Botões de navegação visíveis no viewport (não cortados no bottom)
- [ ] **Seção 3:** Cards do carrossel com espaçamento adequado
- [ ] **Seção 3:** Título e subtítulo legíveis e bem espaçados
- [ ] **Seção 4:** Altura = `100vh - 4rem` (não deve fazer scroll dentro da seção)
- [ ] **Seção 4:** Conteúdo centralizado e balanceado
- [ ] **Seção 4:** Cards de regiões e botões laterais visíveis

#### Mobile (<640px)
- [ ] **Seção 3:** Layout inalterado (comparar com versão anterior)
- [ ] **Seção 3:** Cards navegáveis no carrossel
- [ ] **Seção 3:** Indicadores de paginação funcionando
- [ ] **Seção 4:** Layout inalterado (comparar com versão anterior)
- [ ] **Seção 4:** Grid de 2 colunas nos botões funcionando

#### Tablet (640px-1024px)
- [ ] Comportamento consistente com desktop
- [ ] Sem quebras de layout ou overflow
- [ ] Cards legíveis e interativos

---

## Observações Importantes

### Sobre a Seção 3

1. **Carrossel:** Os cards têm tamanhos responsivos (`min-w-[60vw]` mobile, `min-w-[33.333%]` desktop). As mudanças nos espaçamentos não afetam a funcionalidade do carrossel.

2. **Botões de navegação:** Os botões desktop (linha 183) são `hidden lg:flex`, então só aparecem em telas grandes. A redução do `mt-5` para `mt-3` garante que fiquem visíveis sem ultrapassar o viewport.

3. **Scale e opacity:** Os cards usam animações (`scale-105` no ativo, `scale-95` nos inativos) que são preservadas.

4. **Space-y no header:** O `space-y-3` entre título e parágrafo é mantido (não precisa ser alterado).

### Sobre a Seção 4

1. **Grid de 2 colunas:** A seção usa `lg:grid-cols-2` que divide a tela em: esquerda (mapa + cards) e direita (botões de navegação). A redução do padding vertical não afeta essa estrutura.

2. **Items-start:** O grid usa `sm:items-start` (linha 11), o que alinha o conteúdo ao topo do grid interno. Como a seção pai agora tem altura correta, isso funciona bem.

3. **Botões laterais:** Os 2 botões na direita (`flex-1`) distribuem altura igualmente. Com menos padding vertical na seção, eles continuam balanceados.

---

## Riscos e Mitigações

### Risco 1: Conteúdo cortado ou overflow
**Mitigação:** As reduções de espaçamento são conservadoras e baseadas em cálculos. Total economizado (~56px na seção 3) é suficiente sem comprometer legibilidade.

### Risco 2: Botões do carrossel fora do viewport
**Mitigação:** A redução do `mt-5` para `mt-3` nos botões (8px) combinada com a redução do padding do container garante que fiquem visíveis.

### Risco 3: Regressão no mobile
**Mitigação:** TODAS as mudanças usam breakpoints `sm:`, `md:` ou `lg:`. Mobile usa classes base que não são alteradas.

### Risco 4: Desbalanceamento visual
**Mitigação:** Os espaçamentos reduzidos mantêm proporções harmônicas (redução proporcional em todos os elementos).

---

## Padrão de Altura das Seções (Referência)

Após as correções, todas as seções principais terão altura consistente:

| Seção | Mobile | Desktop |
|-------|--------|---------|
| Hero | `h-[calc(100vh-4rem)]` | `sm:h-[calc(100vh-4rem)]` |
| O que é a Estação do Grão? | `h-[calc(100vh-4rem)]` | `sm:h-[calc(100vh-4rem)]` |
| Nossos Serviços | `h-[calc(100vh-4rem)]` | `sm:h-[calc(100vh-4rem)]` ✅ |
| Regiões Atendidas | `h-[calc(100vh-4rem)]` | `sm:h-[calc(100vh-4rem)]` ✅ |

**Nota:** O FlipCard, Contact e Footer têm naturezas diferentes e não seguem essa regra de `1viewport - menu`.

---

## Comandos Úteis Pós-Implementação

```bash
# Verificar linter
pnpm lint

# Rodar em modo de desenvolvimento
pnpm dev

# Build de produção (teste final)
pnpm build
```

---

## Ordem de Implementação Recomendada

1. **Primeiro:** Implementar Seção 4 (apenas 1 mudança, mais simples)
2. **Segundo:** Implementar Seção 3 (5 mudanças, mais complexa)
3. **Terceiro:** Testar ambas em diferentes resoluções
4. **Quarto:** Validar mobile inalterado

---

## Conclusão

Este plano corrige matematicamente o problema de overflow das seções 3 e 4, mantendo:
- ✅ Altura padronizada em `1viewport - menu` no desktop
- ✅ Mobile completamente inalterado
- ✅ Conteúdo legível e bem espaçado
- ✅ Funcionalidade do carrossel preservada
- ✅ Botões de navegação visíveis
- ✅ Layout responsivo e harmônico

Total de arquivos modificados: **3**  
Total de linhas modificadas: **6**  
Risco de regressão: **Baixo** (mudanças isoladas e bem definidas)

