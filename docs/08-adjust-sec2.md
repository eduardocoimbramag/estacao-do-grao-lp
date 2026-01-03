# 08 — Ajustes Seção 2 “O que é a Estação do Grão?” (laydesk2) — controles de CSS + anti-overflow (DOCUMENTAÇÃO)

## Objetivo

Criar “controles” no `app/globals.css` (**somente laydesk2**) para você ajustar:
1) **Subtítulo** (`p.laydesk2-sec2-subtitle`): **font-size** + **margin-bottom**  
2) **Título** (`h2.laydesk2-sec2-title`): **margin-bottom**  
3) **Lista (desktop)** (`ul.hidden sm:block ...`): **margin-top** e **margin-bottom**  
4) **Remover overflow** da seção (1 tela − menu), sem afetar outros layouts.

> **Importante:** este documento **não implementa nada**. Só orienta a implementação quando você autorizar.

---

## Contexto (onde isso está no JSX)

Arquivo: `components/OpenMenuIntro.tsx`
- Seção: `<section id="apresentacao" ... className="... laydesk3-sec2-section">`
- Título (desktop): `h2... laydesk2-sec2-title laydesk3-sec2-title`
- Subtítulo (desktop): `p... laydesk2-sec2-subtitle laydesk3-sec2-subtitle`
- Lista (desktop): `ul class="hidden sm:block space-y-1.5 mt-9 md:mt-12"`

> Nota: assim como aconteceu no Hero, existem classes com nome `laydesk3-*` usadas como “hook” mesmo em outros layouts.  
> O que define o laydesk2 é o **media query**.

---

## Onde colocar no CSS (obrigatório)

No `app/globals.css`, dentro do bloco:

```css
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* //INICIO LAYDESK2// */
  /* +++INICIO SECAO APRESENTACAO+++ */
  /* ... colocar aqui ... */
  /* +++FIM SECAO APRESENTACAO+++ */
  /* //FIM LAYDESK2// */
}
```

---

## 1) Subtítulo — fonte + margin-bottom (laydesk2)

Elemento alvo:
```html
<p class="... laydesk2-sec2-subtitle ...">O café do seu evento precisa ser inesquecível.</p>
```

### CSS proposto (somente laydesk2)

```css
/* [SEC2] Subtítulo (desktop) — AJUSTE AQUI
   Impacto: aumenta/diminui a altura ocupada pelo subtítulo. Se subir demais, pode gerar overflow. */
p.laydesk2-sec2-subtitle {
  font-size: 1.2rem !important;     /* tamanho da fonte — AJUSTE AQUI */
  line-height: 1.6rem !important;   /* altura da linha — AJUSTE AQUI */
  margin-bottom: 0.75rem !important; /* espaço abaixo do subtítulo — AJUSTE AQUI */
}
```

**Impacto direto ao alterar**
- **font-size/line-height ↑**: aumenta altura do bloco → aumenta chance de overflow.
- **margin-bottom ↑**: empurra o restante do conteúdo para baixo → aumenta chance de overflow.

---

## 2) Título — margin-bottom (laydesk2)

Elemento alvo:
```html
<h2 class="... laydesk2-sec2-title ...">O que é a Estação do Grão?</h2>
```

### CSS proposto (somente laydesk2)

```css
/* [SEC2] Título (desktop) — margin-bottom — AJUSTE AQUI
   Impacto: controla a distância do título até o bloco do subtítulo/parágrafo. */
h2.laydesk2-sec2-title {
  margin-bottom: 0.5rem !important; /* AJUSTE AQUI */
}
```

**Impacto direto ao alterar**
- **margin-bottom ↑**: mais respiro, porém consome altura → pode causar overflow.
- **margin-bottom ↓**: ganha espaço vertical (bom para anti-overflow), porém “achatando” a leitura.

---

## 3) Lista (desktop) — margin-top e margin-bottom (laydesk2)

Elemento alvo (desktop):
```html
<ul class="hidden sm:block space-y-1.5 mt-9 md:mt-12">...</ul>
```

### Melhor prática (recomendada): adicionar uma classe hook no JSX (para seletor estável)

Quando você autorizar, adicionar no JSX:
```html
<ul class="hidden sm:block ... laydesk2-sec2-bullets">...</ul>
```

CSS:
```css
/* [SEC2] Lista (bullets) — margens — AJUSTE AQUI
   Impacto: controla o espaço antes/depois da lista. */
ul.laydesk2-sec2-bullets {
  margin-top: 2rem !important;    /* AJUSTE AQUI (substitui mt-9 / md:mt-12) */
  margin-bottom: 0.75rem !important; /* AJUSTE AQUI */
}
```

### Alternativa (sem mexer no JSX): seletor por combinação de classes (mais frágil)

```css
/* [SEC2] Lista (bullets) — sem mexer no JSX (seletor frágil)
   Impacto: substitui mt-9/md:mt-12 via CSS. Pode quebrar se classes Tailwind mudarem. */
#apresentacao ul.hidden.sm\:block.space-y-1\.5 {
  margin-top: 2rem !important;     /* AJUSTE AQUI */
  margin-bottom: 0.75rem !important; /* AJUSTE AQUI */
}
```

**Impacto direto ao alterar**
- **margin-top ↑**: aumenta “vão” antes da lista → mais chance de overflow.
- **margin-top ↓**: aproxima lista do texto → reduz overflow.
- **margin-bottom**: afeta distância até os botões (se estiverem abaixo).

---

## 4) Anti-overflow (laydesk2) — plano objetivo

### Sintoma
Você reportou overflow na Seção 2. No laydesk2 isso costuma vir de:
- video muito alto (`max-height` alto)
- somas de margens verticais (título + subtítulo + lista + botões)
- `space-y-*` altos em wrappers do texto

### Controles recomendados (somente laydesk2)

```css
/* [SEC2] Segurança anti-overflow: garantir que a seção não estoure verticalmente
   Impacto: corta overflow e impede scroll dentro da seção. */
#apresentacao.laydesk3-sec2-section {
  height: calc(100vh - 4rem) !important;
  max-height: calc(100vh - 4rem) !important;
  overflow: hidden !important; /* evita overflow visual */
}

/* [SEC2] Vídeo: reduzir teto do max-height para liberar espaço ao texto (AJUSTE AQUI)
   Impacto: vídeo menor = mais espaço para coluna esquerda; reduz overflow. */
.laydesk2-sec2-video-container {
  max-height: 72vh !important; /* AJUSTE AQUI (ex.: 68vh–75vh) */
}
```

> Observação: se você aumentar muito `padding/margins` do lado esquerdo, quase sempre vai precisar reduzir `max-height` do vídeo para manter “1 tela - menu”.

### Checklist rápido (validação)

No laydesk2 (1366×768 @100% → innerHeight ~599):
- [ ] sem scroll dentro da seção
- [ ] sem conteúdo “cortado” (texto/lista/botões visíveis)
- [ ] altura final = **1 tela − menu**
- [ ] mudanças não afetam laydesk1/laydesk3/mobile


