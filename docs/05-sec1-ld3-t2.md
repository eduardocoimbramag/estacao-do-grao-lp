# Documentação: Ajustes finos do Hero (SEÇÃO 1) — Laydesk3 (1280×720) — Rodada 2

## Objetivo
No **`laydesk3`** (1280×720 alvo real; `@media (min-width: 1024px) and (max-height: 579px)`), fazer **3 ajustes finos** no Hero mantendo as regras do projeto:
- **1 tela − menu** (`calc(100vh - 4rem)`)
- **Sem overflow**

### Ajustes pedidos
1) **Aproximar** o slideshow (esquerda) do bloco da direita (texto + 3 cards)  
2) **Aumentar sutilmente** o slideshow no canto superior (ficar mais “simétrico”)  
3) Reduzir o **padding horizontal** dos 3 cards inferiores (métricas)

> Importante: o pedido menciona “exclusivamente no laydesk2”, mas estes ajustes são para **laydesk3**. Este doc considera **apenas laydesk3**.

---

## Contexto (onde ajustar)

### CSS atual (laydesk3)
Arquivo: `app/globals.css`  
Bloco: `@media (min-width: 1024px) and (max-height: 579px)`  
Seção: `/* SEÇÃO 1 (Hero): Ajustes laydesk3 */`

Principais “controles” atuais:
- **Gap entre colunas** (slideshow ↔ direita):
  - `.laydesk3-hero-section .grid-cols-1.md\:grid-cols-2 { gap: 1rem; }`
- **Tamanho do slideshow**:
  - `.laydesk3-hero-section [aria-roledescription="carousel"] > div { max-width: 560px; }`
  - e a proporção de colunas:
    - `grid-template-columns: 1.15fr 0.85fr`
- **Métricas**:
  - `.laydesk3-hero-metrics > div { padding: 0.2rem; }`

---

## Plano de implementação (sem aplicar ainda)

### 1) Aproximar slideshow e coluna direita (AJUSTE AQUI)
**Problema:** a distância entre as colunas está grande.  
**Causa:** `gap` do grid do Hero.

**Mudança sugerida:** reduzir `gap` de `1rem` → `0.75rem` (ou `0.5rem` se quiser mais agressivo).

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC1][LAYDESK3] Gap entre slideshow (esq.) e conteúdo (dir.) — AJUSTE AQUI */
  .laydesk3-hero-section .grid-cols-1.md\:grid-cols-2 {
    gap: 0.75rem !important; /* AJUSTE AQUI (ex.: 1rem → 0.75rem → 0.5rem) */
  }
}
```

**Observação:** isso não altera espaçamento interno do texto/cards, só aproxima os blocos.

---

### 2) Aumentar sutilmente o slideshow (mais “simétrico”) (AJUSTE AQUI)
Há **2 knobs** seguros para aumentar o slideshow sem quebrar o layout:

#### Opção A (recomendada): aumentar o `max-width` do wrapper do carousel
```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC1][LAYDESK3] Tamanho do slideshow — AJUSTE AQUI */
  .laydesk3-hero-section [aria-roledescription="carousel"] > div {
    max-width: 590px !important; /* AJUSTE AQUI (ex.: 560px → 580px/590px/600px) */
  }
}
```

#### Opção B (se quiser mais impacto): dar mais “fração” de largura para a coluna esquerda
```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC1][LAYDESK3] Proporção das colunas — AJUSTE AQUI */
  .laydesk3-hero-section .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: 1.2fr 0.8fr !important; /* AJUSTE AQUI (antes: 1.15fr 0.85fr) */
  }
}
```

**Recomendação prática:** começar com **Opção A** (mais previsível). Se ainda quiser maior, aplicar a Opção B junto.

---

### 3) Reduzir padding horizontal dos cards de métricas (AJUSTE AQUI)
**Problema:** cards inferiores (métricas) ainda parecem com padding horizontal grande.  
**Causa:** o JSX usa `p-2 sm:p-3 md:p-4`, e no laydesk3 já existe override.  
**Estratégia:** explicitar `padding-inline` (horizontal) separado do vertical para facilitar ajuste fino.

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC1][LAYDESK3] Métricas: padding horizontal — AJUSTE AQUI */
  .laydesk3-hero-metrics > div {
    padding-block: 0.2rem !important;  /* AJUSTE AQUI (vertical) */
    padding-inline: 0.35rem !important; /* AJUSTE AQUI (horizontal) */
  }
}
```

**Valores de referência:**
- Mais compacto: `padding-inline: 0.25rem`
- Mais confortável: `padding-inline: 0.5rem`

---

## Checklist de validação (quando aplicar)
- [ ] Validar em **laydesk3** (altura `innerHeight` <= 579) com zoom 100%
- [ ] Confirmar que Hero continua **1 tela − menu** e **sem overflow**
- [ ] Ajustar `gap` do grid até “encaixar” (0.75rem costuma ser o sweet spot)
- [ ] Ajustar `max-width` do slideshow até ficar simétrico (580–600px)
- [ ] Ajustar `padding-inline` das métricas até reduzir o “respiro” lateral sem esmagar texto

---

## Observação importante (para evitar confusão)
Existe referência a `.laydesk3-hero-metrics` também em outro layout (laydesk2). **Não editar fora do bloco laydesk3** — todas as alterações devem estar **somente** no `@media (min-width: 1024px) and (max-height: 579px)`.


