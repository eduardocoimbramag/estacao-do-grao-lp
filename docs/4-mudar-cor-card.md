# 4 — Mudar cor de fundo dos cards (rgb(51, 28, 9) / #331C09)

## Objetivo
Padronizar a **cor de fundo** de quatro blocos (um texto em caixa + três itens com ícone/título) para **rgb(51, 28, 9)** (hex **#331C09**) dentro da primeira seção (Hero), mantendo a paleta e contrastes do projeto.

## Alvo (trechos de referência)

**Card 1 — bloco de texto (atual):**
```html
<div class="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-800/20 p-5 md:p-6 lg:p-6 shadow-2xl w-full">
  <p class="text-cream-50/90 text-[clamp(0.98rem,0.35vw+0.95rem,1.125rem)] leading-relaxed text-justify indent-6 hyphens-auto md:max-w-none">
    Transforme o café do seu evento em uma experiência inesquecível! ...
  </p>
</div>
```

**Card 2 — item "Baristas Profissionais" (atual):**
```html
<div class="flex items-center gap-2.5 px-4 py-3">
  <span class="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">…</span>
  <span class="text-cream-50 font-semibold text-sm md:text-base leading-none">Baristas Profissionais</span>
</div>
```

**Card 3 — item "Personalização com sua Marca" (atual):**
```html
<div class="flex items-center gap-2.5 px-4 py-3">
  <span class="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">…</span>
  <span class="text-cream-50 font-semibold text-sm md:text-base leading-none">Personalização com sua Marca</span>
</div>
```

**Card 4 — item "Alto Fluxo de Atendimento" (atual):**
```html
<div class="flex items-center gap-2.5 px-4 py-3">
  <span class="text-coffee-500 flex-shrink-0 leading-none" aria-hidden="true">…</span>
  <span class="text-cream-50 font-semibold text-sm md:text-base leading-none">Alto Fluxo de Atendimento</span>
</div>
```

> Observação: Nos itens 2–4, esse `<div class="flex … px-4 py-3">` costuma ser o **conteúdo interno** do card. A cor de fundo deve ser aplicada no **wrapper do card** (com `rounded`, `ring`, etc.). Se esse wrapper ainda não existir, será necessário criá-lo ao aplicar (fora deste documento).

---

## Cor alvo
- **RGB:** `rgb(51, 28, 9)`
- **HEX:** `#331C09`

---

## Estratégias para aplicar a cor

### 1) (Rápida) Utilitário arbitrário do Tailwind
Sem mexer em tema, pode-se usar `bg-[rgb(51,28,9)]` ou `bg-[#331C09]` no **container** de cada card.

**Card 1 (substituição de classe):**
```diff
- <div class="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-800/20 p-5 md:p-6 lg:p-6 shadow-2xl w-full">
+ <div class="rounded-2xl ring-1 ring-cream-50/15 bg-[rgb(51,28,9)] p-5 md:p-6 lg:p-6 shadow-2xl w-full">
  ...
</div>
```

**Cards 2–4 (se houver wrapper):**
```html
<div class="w-full rounded-xl ring-1 ring-cream-200/15 bg-[rgb(51,28,9)]">
  <div class="flex items-center gap-2.5 px-4 py-3">
    <!-- ícone + título -->
  </div>
</div>
```

> Vantagem: rápido; Desvantagem: menos semântico (valor "hardcoded").  
> Obs.: Se ainda não existir wrapper com `rounded`/`ring`, será preciso criar um (fora deste documento).

### 2) (Recomendado) Token dedicado no tema (Tailwind v4 — `@theme`)
Criar um token de cor para reutilização consistente:
```css
@theme {
  --color-coffee-card: 51 28 9; /* rgb sem vírgulas — formato Tailwind v4 */
}
```

Uso:
```html
<div class="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-card p-5 md:p-6 lg:p-6 shadow-2xl w-full">…</div>

<div class="w-full rounded-xl ring-1 ring-cream-200/15 bg-coffee-card">
  <div class="flex items-center gap-2.5 px-4 py-3">…</div>
</div>
```

> Vantagens: semântico, reaproveitável, mantém a paleta coerente.

---

## Notas de contraste e consistência
- Textos `cream-*` (ex.: `text-cream-50`, `text-cream-50/90`) têm alto contraste em `#331C09`. Mantê-los.
- Anéis (`ring-cream-*`) continuam visíveis. Caso o `ring` fique sutil demais, aumentar opacidade (ex.: `ring-cream-200/20`).
- Manter `rounded-2xl` no card 1 e `rounded-xl` nos cards 2–4 garante hierarquia visual (texto > itens).

---

## Guia de aplicação (quando for aplicar)
> **Importante:** Este documento **não altera** o código agora. Ele é o guia para a futura implementação.

1. Decidir entre utilitário arbitrário `bg-[rgb(51,28,9)]` (rápido) ou token `bg-coffee-card` (recomendado).
2. **Card 1:** substituir `bg-coffee-800/20` pela classe escolhida.
3. **Cards 2–4:** aplicar a classe **no wrapper** do card (com `rounded` + `ring`). Se não houver wrapper, criar um e envolver o `<div class="flex …">`.
4. Testar em 4 larguras: 360–480, 768–900, 1024–1280, ≥1536 px. Verificar contraste, bordas e espaçamentos.
5. Alinhar os três cards com o texto acima, respeitando `w-full`, `max-w-full` e `gap` consistente.

---

## Checklist de QA
- [ ] Todos os **quatro** backgrounds estão em **#331C09** (ou token equivalente).
- [ ] Textos e ícones permanecem nítidos (contraste adequado).
- [ ] Cards 2–4 possuem wrapper com `rounded` + `ring` e não "estouram" a largura da coluna.
- [ ] Não há regressão de espaçamentos dentro do Hero (stack/coluna direita).
- [ ] Resultado idêntico em md, lg e xl (sem variação indesejada).

