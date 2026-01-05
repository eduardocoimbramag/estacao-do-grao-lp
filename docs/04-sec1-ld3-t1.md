# Documentação: Ajustes do Hero (SEÇÃO 1) — Laydesk3 (1280×720) — Rodada 1

## Objetivo
No layout **`laydesk3`** (alvo real **1280×720**, `@media (min-width: 1024px) and (max-height: 579px)`), corrigir o **slideshow** do Hero que está:
- **Invadindo / sobrepondo** o conteúdo (principalmente a coluna da direita)
- **Não se enquadrando** bem no espaço (sensação de corte/enquadramento “errado”)

**Regras fixas do projeto:**
- Cada seção deve ter **(1 tela − menu)**: `calc(100vh - 4rem)`
- **Sem overflow** (nada de scroll/corte inesperado)

> Nota: seu texto menciona “exclusivamente no laydesk2”, mas este ajuste é do **laydesk3**. Este documento considera **apenas laydesk3**.

---

## Contexto do código (estado atual)

### JSX do Hero (`components/hero/Hero.tsx`)
- A `<section>` do Hero possui **duas classes ao mesmo tempo**:
  - `laydesk3-hero-section`
  - `laydesk2-hero-section`
- O slideshow usa Embla dentro de um container:
  - `role="region"` + `aria-roledescription="carousel"`
  - viewport: `div.overflow-hidden ...` (ref do embla)
  - cada slide contém um bloco com classes de aspect ratio:
    - `aspect-[3/2.5]` (base)
    - `sm:aspect-[4/3.5]`
    - `lg:aspect-[16/11]` (ativa em >=1024px, portanto ativa no laydesk3)

### CSS laydesk3 já existente (`app/globals.css`)
Dentro do bloco `@media (min-width: 1024px) and (max-height: 579px)` há ajustes do Hero, incluindo:
- `.laydesk3-hero-section` travada em `calc(100svh - 4rem)` e `overflow: hidden`
- Grid do Hero com `grid-template-columns: 1.15fr 0.85fr`
- Limite de largura do wrapper do carousel:
  - `.laydesk3-hero-section [aria-roledescription="carousel"] > div { max-width: 560px; width: 100%; }`

---

## Hipóteses (por que o slideshow “invade” o conteúdo)

### Hipótese A — Altura do slideshow grande demais para o laydesk3
No laydesk3, a altura útil é pequena (~551px medidos). Com `lg:aspect-[16/11]`, o slideshow fica relativamente “alto” para a largura disponível. Isso pode:
- empurrar o layout e “apertar” a coluna direita
- causar sensação de sobreposição/corte quando combinado com `overflow: hidden` no Hero

### Hipótese B — O limite do carousel está no elemento “errado”
Hoje o CSS limita o **1º `div` dentro do carousel**, mas o “bloco visual” que define o tamanho do slide é o **container do aspect ratio** dentro de cada slide. Se esse container continuar grande, o efeito pode persistir.

### Hipótese C — Conflito/ambiguidade de classes (laydesk2 + laydesk3 no mesmo elemento)
Mesmo com media queries diferentes, essa duplicidade:
- dificulta depuração (no DevTools é fácil seguir a classe errada)
- aumenta chance de “tuning” no lugar errado (e a mudança parecer “não pegar”)

---

## Alternativas de correção (escolha uma)

### Alternativa 1 (CSS-only, recomendada): reduzir altura mudando o aspect ratio do slideshow no laydesk3
Objetivo: deixar o slideshow **mais “wide” e menos alto** no laydesk3, sem mexer no resto do layout.

Opção 1A — forçar aspect ratio mais baixo (ex.: 16/9) **apenas no laydesk3**:

```css
/* laydesk3: tornar o slideshow mais “wide” para caber na altura */
@media (min-width: 1024px) and (max-height: 579px) {
  /* alvo: o container que hoje tem `lg:aspect-[16/11]` */
  .laydesk3-hero-section [aria-roledescription="carousel"] .aspect-\[16\/11\] {
    aspect-ratio: 16 / 9 !important;
  }
}
```

Opção 1B — mais agressivo (21/9) se ainda estiver alto:

```css
@media (min-width: 1024px) and (max-height: 579px) {
  .laydesk3-hero-section [aria-roledescription="carousel"] .aspect-\[16\/11\] {
    aspect-ratio: 21 / 9 !important;
  }
}
```

**Prós**
- Não altera JSX
- Tende a resolver “altura demais” rapidamente

**Contras**
- Pode aumentar crop vertical (object-cover), exigindo ajuste de `object-position`

---

### Alternativa 2 (CSS-only): limitar o slideshow por altura máxima (sem depender de aspect)
Objetivo: garantir que o slideshow **nunca passe** de uma altura segura dentro do Hero.

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* “viewport” do embla */
  .laydesk3-hero-section [aria-roledescription="carousel"] > div {
    max-height: 300px !important; /* AJUSTE AQUI (ex.: 280–340) */
  }

  /* forçar os filhos a respeitarem a altura */
  .laydesk3-hero-section [aria-roledescription="carousel"] > div * {
    max-height: 100% !important;
  }
}
```

**Prós**
- Resolve “explosão” de altura mesmo que o aspect ratio varie

**Contras**
- Pode distorcer a intenção do `aspect-ratio` e precisa validação cuidadosa (especialmente setas e recorte)

---

### Alternativa 3 (CSS-only): reduzir a largura do slideshow + rebalancear colunas do grid
Objetivo: diminuir a “pressão” do slideshow e dar mais espaço para o conteúdo da direita.

```css
@media (min-width: 1024px) and (max-height: 579px) {
  .laydesk3-hero-section .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: 1fr 1fr !important; /* ou 0.95fr 1.05fr */
    gap: 0.75rem !important;
  }

  .laydesk3-hero-section [aria-roledescription="carousel"] > div {
    max-width: 480px !important; /* AJUSTE AQUI (ex.: 460–520) */
  }
}
```

**Prós**
- “Para de brigar” com a coluna direita

**Contras**
- Pode deixar o slideshow pequeno demais (depende do seu gosto visual)

---

## Recomendações de depuração (pra confirmar a causa antes de mexer muito)
No DevTools (com viewport dentro do laydesk3):
1. Inspecionar o wrapper: `.laydesk3-hero-section [aria-roledescription="carousel"] > div`
2. Inspecionar o container do aspect ratio (div que tem `aspect-[...]`)
3. Ver qual deles está “vazando” / ficando maior do que deveria

---

## Checklist de implementação (quando você autorizar)
- [ ] Confirmar que estamos ajustando **laydesk3** (1280×720) e não laydesk2
- [ ] Escolher **uma alternativa** (1 / 2 / 3)
- [ ] Aplicar CSS dentro do bloco `@media (min-width: 1024px) and (max-height: 579px)`
- [ ] Validar no navegador em 1280×720 @100% (sem overflow e sem sobreposição)
- [ ] Ajustar `object-position` (se necessário) para enquadramento perfeito





