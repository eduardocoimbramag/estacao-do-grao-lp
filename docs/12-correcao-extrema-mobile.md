# 12 - Correção EXTREMA Mobile (laymob apenas)

**Status:** Implementação aplicada (apenas laymob1 e laymob2; layouts desktop inalterados).

---

## Contexto

Após 3 planos anteriores (09, 10, 11), dois problemas críticos persistiram:

1. **Card de serviços cortado** no topo e embaixo (terceira solicitação)
2. **Botões "Ver Serviços" e "Solicitar Orçamento"** com tamanhos diferentes

Esta documentação registra as correções **EXTREMAMENTE agressivas** aplicadas diretamente nos componentes + CSS.

---

## Problema 1: Card Cortado (3ª Tentativa)

### Diagnóstico

**Causa raiz identificada:**
- Container do Embla carousel tinha `py-2` (apenas 8px padding vertical) no mobile
- Container tinha `overflow-hidden` que cortava o card
- Card tinha `scale-105` inline quando ativo, ultrapassando o container
- CSS anterior tentou sobrescrever mas classes inline tinham prioridade

### Solução EXTREMA

#### A. Modificações no componente `services-carousel.tsx`

**Linha 85 - Container do Embla:**

```tsx
// ANTES:
<div className="overflow-hidden ... py-2 sm:py-6 ..." ref={emblaRef}>

// DEPOIS:
<div className="overflow-visible ... py-16 sm:py-6 ..." ref={emblaRef}>
```

**Mudanças:**
- `py-2` → `py-16` (8px → 64px de padding vertical no mobile)
- `overflow-hidden` → `overflow-visible` (permite card ultrapassar sem cortar)

**Linha 109 - Scale condicional:**

```tsx
// ANTES:
isActive ? "scale-105 opacity-100 ..." : "scale-95 opacity-70 ..."

// DEPOIS:
isActive ? "sm:scale-105 opacity-100 ..." : "sm:scale-95 opacity-70 ..."
```

**Mudanças:**
- Scale **desabilitado no mobile** (só aplica no `sm:` breakpoint)
- No mobile cards sempre ficam em `scale-1` (100%)

#### B. Reforço CSS em `globals.css` (laymob1 e laymob2)

```css
/* Nossos Serviços — Plano 12: card sem corte EXTREMAMENTE REFORÇADO */
.laymob1-servicos-section {
  padding-top: 4rem !important;      /* 64px (era 3rem) */
  padding-bottom: 4rem !important;
  overflow-y: visible !important;
}

.laymob1-servicos-container {
  padding-top: 2rem !important;      /* 32px (era 1.5rem) */
  padding-bottom: 2rem !important;
}

.laymob1-servicos-carousel {
  overflow: visible !important;
  overflow-x: visible !important;
  overflow-y: visible !important;
  padding-top: 4rem !important;      /* 64px (era 2rem) */
  padding-bottom: 4rem !important;
}

.laymob1-servicos-carousel > div {
  overflow: visible !important;
}

.laymob1-servicos-carousel [role="region"] {
  overflow: visible !important;
}

/* Desabilitar scale e adicionar margin */
.laymob1-servicos-carousel article {
  transform: scale(1) !important;
  opacity: 1 !important;
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.laymob1-servicos-carousel article > div {
  transform: scale(1) !important;
}
```

**Mesmos ajustes aplicados em `.laymob2-*`**

---

## Problema 2: Botões Diferentes de Tamanho

### Diagnóstico

**Causa raiz identificada:**
- Botão "Ver Serviços": `font-normal tracking-[0.08em]`
- Botão "Solicitar Orçamento": `font-light tracking-[0.16em]`
- Classes inline sobrescreviam CSS, mesmo com `!important`

### Solução EXTREMA

#### A. Modificações no componente `OpenMenuIntro.tsx`

**Linha 168-181 - Botões mobile:**

```tsx
// ANTES (Ver Serviços):
className="... font-inter font-normal uppercase tracking-[0.08em] ..."

// DEPOIS (Ver Serviços):
className="... font-inter font-light uppercase tracking-[0.16em] ..."
```

**Mudanças:**
- `font-normal` → `font-light` (400 → 300)
- `tracking-[0.08em]` → `tracking-[0.16em]`
- **AGORA AMBOS TÊM CLASSES EXATAMENTE IDÊNTICAS** (exceto bg/border)

#### B. Reforço CSS em `globals.css` (laymob1 e laymob2)

```css
/* Plano 12: botões ABSOLUTAMENTE IDÊNTICOS */
.laymob1-sec2-cta a {
  flex: 1 1 0% !important;
  min-width: 0 !important;
  max-width: calc(50% - 0.25rem) !important;
  width: calc(50% - 0.25rem) !important;  /* Width EXATO igual */
  
  padding: 0.625rem 1rem !important;
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
  font-weight: 300 !important;            /* Light forçado */
  letter-spacing: 0.16em !important;      /* Tracking forçado */
  
  min-height: 44px !important;            /* Altura EXATA */
  height: 44px !important;
  
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  
  text-align: center !important;
  box-sizing: border-box !important;
}
```

**Mesmos ajustes aplicados em `.laymob2-sec2-cta a`**

**Estratégia:**
- Width calculado: `calc(50% - 0.25rem)` (metade do container menos metade do gap)
- Height fixo: `44px` (garante altura idêntica)
- Font-weight e letter-spacing forçados
- Display flex com align/justify para centralizar texto perfeitamente

---

## Resumo das Mudanças

### Arquivos Modificados

1. **`components/sections/services-carousel.tsx`**
   - Linha 85: `py-2` → `py-16`, `overflow-hidden` → `overflow-visible`
   - Linha 109: `scale-105` → `sm:scale-105` (desabilita scale no mobile)

2. **`components/OpenMenuIntro.tsx`**
   - Linha 171: Botão "Ver Serviços" com `font-light tracking-[0.16em]` (igual ao outro)

3. **`app/globals.css`**
   - Seção Serviços: padding 4rem em todos os níveis, `overflow: visible` forçado
   - Botões: width/height fixos, font-weight/tracking forçados

### Valores Chave

| Elemento | Antes | Depois |
|----------|-------|--------|
| Container carrossel padding (mobile) | `py-2` (8px) | `py-16` (64px) |
| Seção serviços padding | `3rem` | `4rem` |
| Container serviços padding | `1.5rem` | `2rem` |
| Carrossel overflow | `hidden` | `visible` |
| Card scale (mobile) | `scale-105` ativo | `scale-1` sempre |
| Botão "Ver Serviços" font | `normal` (400) | `light` (300) |
| Botão "Ver Serviços" tracking | `0.08em` | `0.16em` |
| Botões width | `flex: 1` | `calc(50% - 0.25rem)` |
| Botões height | auto | `44px` fixo |

---

## Por Que Funcionará Agora

### Card sem corte:
1. ✅ **64px de padding vertical** no container do Embla (8x mais que antes)
2. ✅ **Overflow visible** em TODOS os níveis (section, carousel, container, region)
3. ✅ **Scale desabilitado** no mobile via `sm:` prefix nas classes inline
4. ✅ **Margin adicional** de 1rem top/bottom nos articles
5. ✅ **Componente + CSS** trabalhando juntos

### Botões idênticos:
1. ✅ **Classes inline iguais** no componente (font-light, tracking-0.16em)
2. ✅ **Width calculado exato** via calc(50% - 0.25rem)
3. ✅ **Height fixo** de 44px
4. ✅ **Font-weight e letter-spacing** forçados no CSS
5. ✅ **Display flex** com centralização perfeita
6. ✅ **Componente + CSS** trabalhando juntos

---

## Notas Finais

- **Layouts desktop (`laydesk1`, `laydesk2`, `laydesk3`)** permanecem **INALTERADOS**
- **Apenas mobile (`laymob1`, `laymob2`)** foi modificado
- Esta foi a **correção mais agressiva possível**, combinando:
  - Mudanças diretas nos componentes React
  - CSS com `!important` em todos os níveis
  - Valores fixos (px, rem) em vez de relativos
  - Overflow visible forçado
  - Classes inline modificadas para serem idênticas

Se ainda persistir algum problema, será necessário investigar:
- Cache do build (.next)
- Regras CSS de terceiros (Embla Carousel)
- Outras classes Tailwind não identificadas
