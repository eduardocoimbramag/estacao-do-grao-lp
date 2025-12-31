# Plano — Correção de Overflow no laydesk3 (Seções 3 e 4)

## Objetivo

Corrigir **overflow / corte de conteúdo** nas seções:
- **Seção 3:** “Nossos Serviços” (carrossel)
- **Seção 4:** “Regiões Atendidas”

**Regras obrigatórias:**
- **Somente laydesk3** (não impactar laydesk1, laydesk2, mobile).
- **Altura da seção inalterada:** cada seção deve ocupar exatamente **1 viewport − menu**:
  - \(H\_sec\) = `calc(100vh - 4rem)`
- Não alterar conteúdo textual (somente redimensionamento/encaixe).

---

## Definição do laydesk3 (breakpoint)

Para não conflitar com laydesk2 (que começa em `min-height: 768px`), o laydesk3 deve atuar em:

```css
@media (min-width: 1024px) and (max-height: 767px) {
  /* regras laydesk3 */
}
```

> Nota: isso garante que **721/740/767** ainda sejam laydesk3, enquanto **768+** passa a ser laydesk2.

---

## Causa raiz típica do overflow nessas seções

### Seção 3 (Nossos Serviços)
- O layout tem **header** (título + descrição) + **carrossel** + **navegação**.
- O carrossel usa padding vertical (ex.: `py-2 sm:py-6`) e cards com imagem + conteúdo.
- Se o container do carrossel não estiver com `flex: 1` e `min-height: 0`, ele pode “forçar” altura e o fim da seção é cortado.

### Seção 4 (Regiões Atendidas)
- Layout em 2 colunas (grid):
  - Coluna esquerda: título + mapa + 3 cards de texto
  - Coluna direita: 2 botões grandes com imagem (cards clicáveis)
- Somatório de padding/altura do mapa/cards/botões pode ultrapassar \(H\_sec\), causando corte.

---

## Estratégia geral (sem alterar altura)

Para ambas as seções, no laydesk3:

1) **Travar a seção em `calc(100vh - 4rem)`**
- `height`, `min-height`, `max-height` iguais.
- `overflow: hidden` (evita “vazar” conteúdo e mantém o padrão visual).

2) **Fazer o container interno ocupar 100%**
- `height: 100%`
- `display: flex` (coluna) ou `display: grid` (com `min-height: 0`)

3) **Permitir que o “conteúdo principal” encolha**
- `flex: 1` no bloco que precisa “absorver” a altura restante
- `min-height: 0` nos containers flex/grid (isso é essencial para evitar overflow silencioso)

4) **Compactar somente o necessário**
- Reduzir `margin-bottom`, `padding-top/bottom`, `gap`, `max-height` das imagens/mapa/botões.
- Manter legibilidade (evitar fontes abaixo de ~0.8rem para textos principais).

---

## Plano de implementação — Seção 3 (Nossos Serviços)

### Onde fica
- Estrutura da seção em `app/page.tsx`:
  - `section#nossos-servicos` com classe `laydesk2-servicos-section`
  - container interno `laydesk2-servicos-container`
  - header `laydesk2-servicos-header`
- Carrossel em `components/sections/services-carousel.tsx`:
  - container do carrossel: `.laydesk2-servicos-carousel-container`
  - cards: `.laydesk2-servicos-card`, `.laydesk2-servicos-image`, `.laydesk2-servicos-card-content`
  - navegação: `.laydesk2-servicos-nav`

### Ajustes (somente laydesk3)

Dentro do `@media (min-width:1024px) and (max-height:767px)`:

1) Travar a seção:
- `.laydesk2-servicos-section`:
  - `height/min-height/max-height: calc(100vh - 4rem)`
  - `overflow: hidden`

2) Container interno:
- `.laydesk2-servicos-container`:
  - `height: 100%`
  - `display: flex; flex-direction: column`
  - `min-height: 0`
  - reduzir padding vertical (ex.: `0.75rem`)

3) Header:
- `.laydesk2-servicos-header`:
  - reduzir `margin-bottom`
  - reduzir espaçamento vertical entre título/descrição
  - ajustar `font-size` e `line-height` para “encaixe”

4) Carrossel:
- `.laydesk2-servicos-carousel-container`:
  - `flex: 1`
  - `min-height: 0`
  - reduzir padding vertical (ex.: `0.25rem`)
  - `display: flex; align-items: center` (centraliza e evita empurrar para fora)

5) Cards do carrossel:
- reduzir `padding` de imagem e a altura da imagem (`.laydesk2-servicos-image`)
- reduzir `padding-bottom` do conteúdo (`.laydesk2-servicos-card-content`)

6) Navegação:
- reduzir `margin-top` e `padding` dos botões

### Critério de sucesso
- Nenhum elemento “sumindo” (cards/navegação visíveis).
- Sem barra de rolagem vertical.
- Seção ocupa exatamente `calc(100vh - 4rem)`.

---

## Plano de implementação — Seção 4 (Regiões Atendidas)

### Onde fica
- Componente: `components/audience.tsx`
- Classes existentes:
  - section: `.laydesk2-audience-section`
  - container: `.laydesk2-audience-container`
  - grid: `.laydesk2-audience-grid`
  - mapa: `.laydesk2-audience-map-container`
  - cards: `.laydesk2-audience-card`, `.laydesk2-audience-card-text`
  - coluna direita: `.laydesk2-audience-right-column`
  - botões: `.laydesk2-audience-nav-button`, título do botão: `.laydesk2-audience-nav-button-title`

### Ajustes (somente laydesk3)

Dentro do `@media (min-width:1024px) and (max-height:767px)`:

1) Travar a seção:
- `.laydesk2-audience-section`:
  - `height/min-height/max-height: calc(100vh - 4rem)`
  - `overflow: hidden`

2) Container interno:
- `.laydesk2-audience-container`:
  - `height: 100%`
  - `display: flex; flex-direction: column; justify-content: center`
  - `min-height: 0`
  - reduzir padding vertical (ex.: `0.75rem`)

3) Grid:
- `.laydesk2-audience-grid`:
  - `height: 100%`
  - reduzir `gap`
  - `align-items: center`

4) Mapa:
- `.laydesk2-audience-map-container`:
  - reduzir `max-width` (ex.: 55%)
  - reduzir margens vertical (top/bottom)

5) Cards de texto:
- `.laydesk2-audience-card`:
  - reduzir padding vertical e `margin-bottom`
- `.laydesk2-audience-card-text`:
  - reduzir levemente `font-size/line-height`
- ícones dentro dos cards:
  - reduzir `width/height`

6) Botões grandes da coluna direita:
- `.laydesk2-audience-nav-button`:
  - reduzir `padding-top/bottom`
  - definir `max-height` para caber (ex.: `16rem`)
- `.laydesk2-audience-nav-button-title`:
  - reduzir `font-size/line-height`

### Critério de sucesso
- Botões da direita visíveis por completo.
- Cards e mapa visíveis por completo.
- Sem rolagem vertical.
- Seção ocupa exatamente `calc(100vh - 4rem)`.

---

## Checklist de teste (obrigatório)

### Teste de breakpoint
- Confirmar no console:
  - `window.innerWidth >= 1024`
  - `window.innerHeight <= 767`

### Teste visual
- Viewport: **1280×720** e também **1366×740** (ainda laydesk3).
- Validar:
  - Seção 3: header + carrossel + navegação aparecem sem corte.
  - Seção 4: mapa + 3 cards + 2 botões aparecem sem corte.

### Não-regressão
- Conferir rapidamente:
  - laydesk2 (ex.: 1366×768): não mudou.
  - Desktop grande: não mudou.
  - Mobile: não mudou.

---

## Observação importante sobre o Header

Se o Header for `fixed`, ele fica fora do fluxo. Para o padrão **“1 viewport - menu”** funcionar corretamente sem “vazar” a próxima seção no rodapé, o recomendado no laydesk3 é:
- Tornar o header “no fluxo” **apenas no laydesk3** (ex.: `position: sticky` via CSS no breakpoint laydesk3).

Isso evita precisar compensar com `padding-top` no `main`, que costuma causar inconsistências entre seções.

---

## Entrega

Após autorização, implementar:
- Ajustes CSS dentro do breakpoint laydesk3
- Sem alterar conteúdo textual
- Mantendo altura fixa `calc(100vh - 4rem)`


