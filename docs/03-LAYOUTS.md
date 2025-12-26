# Sistema de Layouts Responsivos — Nomenclatura e Padrões

## Objetivo

Este documento define os **padrões predefinidos de layouts** para diferentes resoluções de tela, com nomenclaturas padronizadas que facilitam a aplicação de estilos específicos para cada dispositivo.

**Problema resolvido:** Monitores antigos (1368×768 e 1280×720) apresentavam problemas de responsividade, enquanto resoluções maiores (1920×1080 e 1600×900) funcionavam perfeitamente.

**Localização das Media Queries:** As media queries predefinidas estão organizadas no arquivo `app/globals.css`, na seção "SISTEMA DE LAYOUTS RESPONSIVOS". Elas estão prontas para uso e você pode adicionar seus estilos customizados dentro de cada bloco.

---

## Nomenclatura dos Layouts

### Layouts Desktop

| Nome | Resolução Alvo | Condições | Uso |
|------|---------------|-----------|-----|
| **laydesk1** | 1920×1080, 1600×900 | `min-width: 1600px` e `min-height: 900px` | Desktop grande (layout padrão confortável) |
| **laydesk2** | 1368×768 | `min-width: 1024px` e `min-height: 768px` e `max-height: 899px` | Desktop médio (altura reduzida) |
| **laydesk3** | 1280×720 | `min-width: 1024px` e `max-height: 720px` | Desktop baixo (altura muito reduzida) |

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
/* laydesk2: 1368×768 (altura entre 768px e 899px) */
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
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
/* laydesk3: 1280×720 (altura <= 720px) */
@media (min-width: 1024px) and (max-height: 720px) {
  /* Estilos para desktop baixo */
  .laydesk3-exemplo {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
}
```

**Características:**
- Altura <= 720px
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
@media (min-width: 1024px) and (max-height: 720px) {
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
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) { }

/* laydesk3 */
@media (min-width: 1024px) and (max-height: 720px) { }
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
   - laydesk2 (1024×768 até 899px altura)?
   - laydesk3 (<= 720px altura)?
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
3. **Teste sempre:** Teste em todas as resoluções alvo antes de considerar completo
4. **Mobile-first:** O projeto usa mobile-first, então as classes base são para mobile. Use as media queries desktop para ajustes específicos

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
@media (min-width: 1024px) and (max-height: 720px) {
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


