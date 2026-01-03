# Sistema de Layouts Responsivos — Nomenclatura, Padrões e Calibração (Sem “DevTools-Ilusão”)

## Objetivo

Este documento define **layouts responsivos por faixa de viewport** (largura/altura em CSS pixels) com nomenclaturas padronizadas, e principalmente estabelece o **procedimento de calibração** para evitar o erro clássico:

- Ajustar tudo no **DevTools/emulação** e/ou com **zoom do navegador ≠ 100%**, e depois descobrir que **no monitor real** (ex.: 1366×768) o layout fica completamente diferente.

**Onde ficam as media queries:** `app/globals.css` → seção "SISTEMA DE LAYOUTS RESPONSIVOS".

---

## Nomenclatura dos Layouts

## Por que “resolução do monitor” ≠ “viewport real”

No mundo real, o que ativa os layouts não é “1366×768 do monitor” em si — é o **viewport real em CSS pixels**, que depende de:

- **Zoom do navegador** (ex.: 80%, 100%, 125%)
- **Escala do Windows** (ex.: 100%, 125%, 150%)
- **Device Pixel Ratio** (DPR)
- Barras do browser/OS e tamanho da janela

### Checklist de calibração (obrigatório)

Antes de decidir breakpoints ou “refazer laydesk2/3”, faça SEMPRE:

- **Zoom do navegador:** 100% (Ctrl+0)
- **Escala do Windows (Display Scale):** idealmente 100% para calibrar
- DevTools pode estar aberto, mas não confie no modo “emular dispositivo” para decidir breakpoints.

No console do navegador, confirme os valores reais:

```js
window.innerWidth
window.innerHeight
window.devicePixelRatio
```

> **Regra de ouro:** os layouts devem ser pensados para os valores **`innerWidth/innerHeight` reais** em zoom 100%.

### Medições reais deste projeto (base para o “valor ideal”)

Com **zoom 100%** e janela maximizada, você mediu:

- **Monitor 1366×768**:
  - `innerWidth`: **1366**
  - `innerHeight`: **599**
  - `devicePixelRatio`: **1**

- **Monitor 1280×720**:
  - `innerWidth`: **1280**
  - `innerHeight`: **551**
  - `devicePixelRatio`: **1**

Ou seja: na prática, o “768” e o “720” **nunca chegam como `innerHeight`**, porque a UI do navegador/OS consome parte da altura.

---

### Layouts Desktop

| Nome | Resolução Alvo | Condições | Uso |
|------|---------------|-----------|-----|
| **laydesk1** | 1920×1080, 1600×900 | `min-width: 1600px` e `min-height: 900px` | Desktop grande (layout padrão confortável) |
| **laydesk2** | 1366×768 (alvo real) | `min-width: 1024px` e `min-height: 580px` e `max-height: 899px` | Desktop médio (viewport “real” ~599px de altura) |
| **laydesk3** | 1280×720 (alvo real) | `min-width: 1024px` e `max-height: 579px` | Desktop baixo (viewport “real” ~551px de altura) |

### Layouts Mobile

| Nome | Resolução Alvo | Condições | Uso |
|------|---------------|-----------|-----|
| **laymob1** | Mobile pequeno | `max-width: 639px` | Smartphones pequenos |
| **laymob2** | Mobile grande / Tablet pequeno | `min-width: 640px` e `max-width: 767px` | Smartphones grandes e tablets pequenos |

---

## Media Queries Predefinidas

> **📌 Importante:** As media queries abaixo já estão implementadas no arquivo `app/globals.css`. Você pode adicionar seus estilos customizados diretamente dentro de cada bloco de media query correspondente.

### Desktop Layouts

#### laydesk1 — Desktop Grande
```css
/* laydesk1: 1920×1080, 1600×900 e superiores */
@media (min-width: 1600px) and (min-height: 900px) {
  /* Estilos para desktop grande */
  .laydesk1-exemplo {
    padding: 2rem;
    font-size: 1.25rem;
  }
}
```

**Características:**
- Altura >= 900px
- Largura >= 1600px
- Layout com espaçamentos generosos
- Tipografia em tamanhos maiores

---

#### laydesk2 — Desktop Médio
```css
/* laydesk2: desktop “médio” (alvo real 1366×768 @100% → innerHeight ~599) */
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* Estilos para desktop médio */
  .laydesk2-exemplo {
    padding: 1rem;
    font-size: 1rem;
  }
}
```

**Características:**
- Altura entre 768px e 899px
- Largura >= 1024px
- Layout compacto (reduz padding/margens/gaps)
- Tipografia ajustada para caber sem scroll

---

#### laydesk3 — Desktop Baixo
```css
/* laydesk3: desktop baixo (alvo real 1280×720 @100% → innerHeight ~551) */
@media (min-width: 1024px) and (max-height: 579px) {
  /* Estilos para desktop baixo */
  .laydesk3-exemplo {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
}
```

**Características:**
- Altura <= 579px (faixa “baixo” calibrada para innerHeight real)
- Largura >= 1024px
- Layout muito compacto (reduz mais espaçamentos)
- Tipografia reduzida se necessário

---

### Mobile Layouts

#### laymob1 — Mobile Pequeno
```css
/* laymob1: max-width 639px (smartphones pequenos) */
@media (max-width: 639px) {
  /* Estilos para mobile pequeno */
  .laymob1-exemplo {
    padding: 0.5rem;
    font-size: 0.875rem;
  }
}
```

**Características:**
- Largura <= 639px
- Layout otimizado para telas pequenas
- Espaçamentos mínimos
- Tipografia compacta

---

#### laymob2 — Mobile Grande / Tablet Pequeno
```css
/* laymob2: 640px - 767px (smartphones grandes e tablets pequenos) */
@media (min-width: 640px) and (max-width: 767px) {
  /* Estilos para mobile grande */
  .laymob2-exemplo {
    padding: 0.75rem;
    font-size: 1rem;
  }
}
```

**Características:**
- Largura entre 640px e 767px
- Layout intermediário entre mobile e desktop
- Espaçamentos moderados

---

## Como Usar nos Componentes

### Exemplo 1: Aplicar estilo apenas no laydesk2

```tsx
// No componente
<div className="minha-secao laydesk2-minha-secao">
  Conteúdo
</div>
```

```css
/* No globals.css */
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  .laydesk2-minha-secao {
    padding-top: 1rem !important;
    padding-bottom: 0.5rem !important;
  }
}
```

---

### Exemplo 2: Aplicar estilo em múltiplos layouts

```css
/* Aplicar no laydesk2 E laydesk3 */
@media (min-width: 1024px) and (max-height: 899px) {
  .laydesk2-minha-secao,
  .laydesk3-minha-secao {
    padding: 0.75rem !important;
  }
}

/* Aplicar apenas no laydesk3 */
@media (min-width: 1024px) and (max-height: 579px) {
  .laydesk3-minha-secao {
    font-size: 0.9rem !important;
  }
}
```

---

### Exemplo 3: Aplicar em mobile específico

```css
/* Aplicar apenas no laymob1 */
@media (max-width: 639px) {
  .laymob1-minha-secao {
    padding: 0.5rem !important;
  }
}
```

---

## Padrão de Nomenclatura de Classes

Ao criar classes customizadas para layouts específicos, use o padrão:

```
.{layout}-{elemento}-{propriedade}
```

**Exemplos:**
- `.laydesk2-hero-padding` — padding do hero no desktop 2
- `.laydesk3-title-fontsize` — tamanho da fonte do título no desktop 3
- `.laymob1-section-gap` — gap da seção no mobile 1
- `.laydesk2-hero-container-padding` — padding do container do hero no desktop 2

---

## Resumo das Media Queries

### Desktop
```css
/* laydesk1 */
@media (min-width: 1600px) and (min-height: 900px) { }

/* laydesk2 */
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) { }

/* laydesk3 */
@media (min-width: 1024px) and (max-height: 579px) { }
```

### Mobile
```css
/* laymob1 */
@media (max-width: 639px) { }

/* laymob2 */
@media (min-width: 640px) and (max-width: 767px) { }
```

---

## Checklist para Aplicar Mudanças

Antes de criar estilos customizados, responda:

1. **Qual seção precisa de ajuste?** (Hero, Serviços, Contato, etc.)
2. **Em qual layout acontece o problema?**
   - laydesk1 (>= 1600×900)?
   - laydesk2 (>= 580px até 899px altura)?
   - laydesk3 (<= 579px altura)?
   - laymob1 (<= 639px)?
   - laymob2 (640px - 767px)?
3. **Qual é o problema?**
   - Overflow/scroll?
   - Desalinhamento?
   - Conteúdo cortado?
   - Espaçamento inadequado?

Com essas respostas, você pode criar a media query específica e aplicar a classe no componente.

---

## Notas Importantes

1. **Especificidade:** Use `!important` quando necessário para sobrescrever classes Tailwind
2. **Ordem das media queries:** Coloque as mais específicas primeiro (laydesk3 → laydesk2 → laydesk1)
3. **Teste sempre (real):** valide com **zoom 100%** e olhando `innerWidth/innerHeight`. DevTools emulação é só referência visual.
4. **Mobile-first:** o projeto usa mobile-first, então as classes base são para mobile. Use as media queries desktop para ajustes específicos.
5. **“Valor ideal” para laydesk2/3:** não é um número mágico. É o intervalo que cobre seus monitores-alvo **no viewport real**. A forma correta é:
   - medir `innerHeight` em 1366×768 e 1280×720 reais (zoom 100%)
   - ajustar os ranges para cobrir essas alturas com folga pequena (ex.: +/− 10–30px)

### Recomendação prática (com base nas suas medições)

Como você mediu **599px** (1366×768) e **551px** (1280×720), um corte seguro é:
- **laydesk3**: `max-height: 579px` (cobre 551 com folga)
- **laydesk2**: `min-height: 580px` (pega 599 com folga)

Se no seu PC esses valores variarem (por barra de favoritos, maximizado, etc), ajuste o corte mantendo um “gap” simples:
- laydesk3: até \(X\)
- laydesk2: a partir de \(X + 1\)

---

## Exemplo Completo: Ajuste do Hero

```css
/* app/globals.css */

/* laydesk2: Ajustar padding do Hero */
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  .laydesk2-hero-container {
    padding-top: 1rem !important;
    padding-bottom: 0.5rem !important;
  }
  
  .laydesk2-hero-title {
    font-size: clamp(1.75rem, 2.5vw, 2.25rem) !important;
    margin-bottom: 1rem !important;
  }
}

/* laydesk3: Ajustar ainda mais o Hero */
@media (min-width: 1024px) and (max-height: 579px) {
  .laydesk3-hero-container {
    padding-top: 0.75rem !important;
    padding-bottom: 0.25rem !important;
  }
  
  .laydesk3-hero-title {
    font-size: clamp(1.5rem, 2vw, 2rem) !important;
    margin-bottom: 0.75rem !important;
  }
}
```

```tsx
// components/hero/Hero.tsx
<section className="... laydesk2-hero-container laydesk3-hero-container">
  <h1 className="... laydesk2-hero-title laydesk3-hero-title">
    Título
  </h1>
</section>
```

---

## Localização no Código

As media queries predefinidas estão localizadas em `app/globals.css`, logo após as correções de mobile. Elas estão organizadas em seções claras:

```css
/* ============================================
   SISTEMA DE LAYOUTS RESPONSIVOS
   Documentação completa: docs/03-LAYOUTS.md
   ============================================ */

/* LAYOUTS MOBILE */
/* laymob1, laymob2 */

/* LAYOUTS DESKTOP */
/* laydesk1, laydesk2, laydesk3 */
```

Para adicionar estilos customizados, simplesmente adicione suas classes dentro do bloco de media query correspondente.

---

## Referências

- **Tailwind Breakpoints:** sm: 640px, md: 768px, lg: 1024px, xl: 1280px
- **Mobile Breakpoint do Projeto:** 768px (definido em `hooks/use-mobile.ts`)
- **Arquivo principal de estilos:** `app/globals.css`
- **Documentação completa:** Este arquivo (`docs/03-LAYOUTS.md`)

---

## Apêndice: como decidir se o seu 1366×768 “cai” em laydesk2 ou laydesk3

Mesmo em um monitor 1366×768, você pode cair em laydesk3 se:
- o zoom estiver < 100% / > 100%
- a escala do Windows não for 100%
- a janela não estiver maximizada
- o `innerHeight` real ficar <= 767

Por isso a referência correta é sempre:
- `innerHeight >= 580` → tende a laydesk2 (no seu projeto)
- `innerHeight <= 579` → tende a laydesk3 (no seu projeto)



