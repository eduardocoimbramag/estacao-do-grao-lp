# 08 — Conserto do Hero no **laydesk2** (título e métricas “longe” do conteúdo central)

## 📌 Problema (como aparece)

No **laydesk2** (desktop médio, faixa `min-height: 580px` e `max-height: 899px`), o Hero fica com 3 blocos “separados”:

- **Título (H1)** fica muito próximo do topo
- **Slideshow + texto + 3 cards** ficam centralizados (e estão “perfeitos”)
- **3 métricas** ficam no final da seção, longe do conteúdo central

Objetivo: deixar **H1 e métricas mais próximos** do conteúdo central (sem mexer no conteúdo em si).

---

## ✅ Causa raiz (por que acontece)

No JSX do Hero, a hierarquia é:

1. `<h1 ... />`
2. `<div class="grid ... md:grid-cols-2" />` (slideshow + texto + cards)
3. `<div class="grid grid-cols-3 ... laydesk3-hero-metrics" />` (métricas)

No CSS do **laydesk2** (`app/globals.css`), o container interno do Hero vira um **flex column**:

- `.laydesk2-hero-section > div { display:flex; flex-direction:column; justify-content:center; height:100% }`

E o ponto crítico:

- `.laydesk2-hero-section .grid-cols-1.md\:grid-cols-2 { flex: 1 1 auto !important; }`

Isso faz o grid principal **crescer e ocupar o espaço “sobrando”** da seção (porque a seção está travada em `calc(100svh - 4rem)`).

Resultado visual:

- O H1 fica “preso” acima do grid
- O grid se mantém centralizado (por `align-items/justify-content`)
- As métricas ficam “empurradas” para o final, porque o grid expandido cria um vazio entre eles

Ou seja: **não é (só) margin** — é principalmente o `flex: 1` do grid principal dentro de um container com altura fixa.

---

## 🎯 Estratégia de correção (mínima e segura)

### Ideia central

Em **laydesk2**, mudar o grid principal de:

- `flex: 1 1 auto`  → para **não expandir**

Assim o H1 + grid principal + métricas passam a ser tratados como um **bloco único**, e o `justify-content:center` do container centraliza o conjunto, mantendo tudo “juntinho”.

---

## 🛠️ Implementação proposta (CSS) — **não aplicar ainda**

> Aplique dentro do `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)` (laydesk2), no arquivo `app/globals.css`.

### 1) Evitar expansão do grid principal (principal fix)

```css
.laydesk2-hero-section .grid-cols-1.md\:grid-cols-2 {
  flex: 0 0 auto !important; /* era 1 1 auto */
}
```

### 2) Ajuste fino: aproximar H1 do grid principal

O H1 já recebe no laydesk2:
`margin-bottom: 0.5rem !important;`

Se ainda estiver “longe”, reduzir levemente:

```css
h1.laydesk2-hero-title {
  margin-bottom: 0.25rem !important;
}
```

### 3) Ajuste fino: aproximar métricas do conteúdo

O bloco de métricas tem `mt-6 sm:mt-8 lg:mt-10` no JSX, mas no laydesk2 já existe override:

```css
.laydesk3-hero-metrics {
  margin-top: 0.75rem !important;
}
```

Se precisar aproximar mais:

```css
.laydesk3-hero-metrics {
  margin-top: 0.5rem !important;
}
```

> Observação: a classe chama `laydesk3-hero-metrics` no JSX, mas é usada como “hook” também no laydesk2. Isso é ok, mas se quisermos, dá para renomear no futuro.

---

## ✅ Critérios de aceite

- [ ] Em laydesk2, o H1 **não fica colado no topo**, e fica “próximo” ao conteúdo central
- [ ] Em laydesk2, as métricas **não ficam no rodapé da seção**; ficam próximas do grid principal
- [ ] Em 1080p (laydesk1/base), **nada muda**
- [ ] Em laydesk3 (altura baixa), **não regredir** (principalmente métrica e overflow)

---

## 🧪 Como testar (sem “DevTools-ilusão”)

No navegador (zoom 100%), verificar:

```js
window.innerWidth
window.innerHeight
```

Se `innerHeight` estiver entre **580 e 899**, você está em **laydesk2**.

Testar:

- 1366×768 (innerHeight ~599) → laydesk2
- 1600×900 (innerHeight ~813) → laydesk2
- 1920×1080 → tende a laydesk1/base

---

## 📍 Onde mexer

- CSS: `app/globals.css` dentro do bloco **laydesk2**
- JSX (não necessário para essa correção): `components/hero/Hero.tsx`

---

**Status:** 📝 Documentação criada — nenhuma mudança aplicada ainda (aguardando sua autorização).
