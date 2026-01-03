# 12 — Conserto Definitivo do Vídeo: Container Colapsado (laydesk2)

## Problema identificado

O container do vídeo está aparecendo como uma **linha extremamente fina** (quase invisível), mesmo que o elemento HTML exista e esteja sendo renderizado.

**HTML renderizado:**
```html
<div class="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-black/40 w-full max-w-full laydesk2-sec2-video-container laydesk3-sec2-video-container">
  <video class="h-full w-full object-contain laydesk2-sec2-video laydesk3-sec2-video" ...>
  ...
  </video>
</div>
```

**Classes Tailwind aplicadas:**
- `aspect-[9/16]` → `aspect-ratio: 9 / 16`
- `max-h-[70vh]` → `max-height: 70vh`
- `w-full` → `width: 100%`
- `max-w-full` → `max-width: 100%`

---

## Diagnóstico: Por que o container colapsou?

### Causa raiz: Conflito entre `width: auto` e `aspect-ratio`

No CSS customizado atual (laydesk2), temos:

```css
.laydesk2-sec2-video-container {
  width: auto !important;        /* ← PROBLEMA PRINCIPAL */
  aspect-ratio: 9 / 16 !important;
  max-height: 77vh !important;
  min-height: 300px !important;
}
```

**O que está acontecendo:**
1. O Tailwind aplica `w-full` (width: 100%) no HTML
2. O CSS customizado força `width: auto !important;` (sobrescreve o Tailwind)
3. Com `width: auto` e `aspect-ratio: 9/16`, o navegador precisa calcular a largura baseada na **altura**
4. Mas a altura está sendo limitada por `max-h-[70vh]` (Tailwind) E `max-height: 77vh` (CSS customizado)
5. Se a altura não estiver sendo definida corretamente (apenas `max-height`, não `height`), o `aspect-ratio` não consegue calcular a largura
6. Resultado: o elemento colapsa para uma largura mínima (linha fina)

---

## Solução: Seguir o padrão do laydesk3

Analisando o CSS do `laydesk3-sec2-video-container` (que funciona corretamente):

```css
.laydesk3-sec2-video-container {
  aspect-ratio: 9 / 16 !important;
  width: min(462px, calc(68.2vh * 9 / 16)) !important;  /* ← LARGURA ESPECÍFICA */
  max-width: 462px !important;
  max-height: 68.2vh !important;
  height: auto !important;
}
```

**Diferença crucial:**
- Laydesk3 usa `width: min(462px, calc(68.2vh * 9 / 16))` → **largura explícita baseada na altura máxima**
- Laydesk2 usa `width: auto` → **largura implícita que colapsa**

---

## Estratégia de correção (laydesk2)

### Opção 1: Usar `width: 100%` (respeitar Tailwind) [RECOMENDADO]

Permitir que o Tailwind `w-full` funcione e ajustar apenas a altura:

```css
.laydesk2-sec2-video-container {
  /* REMOVER width: auto */
  width: 100% !important;  /* Respeitar w-full do Tailwind */
  aspect-ratio: 9 / 16 !important;
  max-height: 77vh !important;
  height: auto !important; /* Altura calculada pelo aspect-ratio */
  /* ... resto do CSS ... */
}
```

**Vantagens:**
- Simples e direto
- Respeita o grid (coluna do grid controla a largura)
- O `aspect-ratio` calcula a altura automaticamente baseada na largura

**Como funciona:**
1. Grid define largura da coluna (ex.: 50% da tela)
2. Container recebe `width: 100%` (ocupa 100% da coluna)
3. `aspect-ratio: 9/16` calcula altura automaticamente: `altura = largura * 16/9`
4. `max-height: 77vh` limita se necessário

---

### Opção 2: Calcular largura baseada na altura máxima (igual laydesk3)

Definir largura explícita calculada:

```css
.laydesk2-sec2-video-container {
  aspect-ratio: 9 / 16 !important;
  /* Calcular largura: se max-height = 77vh, então max-width = 77vh * 9/16 = 43.3vh */
  width: min(43.3vh, 100%) !important;
  max-width: 100% !important; /* Não ultrapassar a coluna */
  max-height: 77vh !important;
  height: auto !important;
  /* ... resto do CSS ... */
}
```

**Vantagens:**
- Controle mais preciso do tamanho
- Garante que o vídeo não fique maior que o esperado

**Desvantagens:**
- Mais complexo
- Precisa recalcular se mudar `max-height`

---

## Implementação recomendada (Opção 1)

Dentro do media query `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)`:

```css
/* +++INICIO SECAO APRESENTACAO / CONSERTO VIDEO DEFINITIVO+++ */

/* Container do vídeo - CORRIGIR COLAPSO (LAYDESK2) */
.laydesk2-sec2-video-container {
  /* VISIBILIDADE */
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  
  /* DIMENSÕES - CORREÇÃO PRINCIPAL */
  width: 100% !important; /* ← MUDAR DE "auto" PARA "100%" (respeitar w-full do Tailwind) */
  max-width: 100% !important; /* não ultrapassar a coluna */
  aspect-ratio: 9 / 16 !important; /* proporção vertical */
  max-height: 77vh !important; /* limite de altura */
  height: auto !important; /* altura calculada automaticamente pelo aspect-ratio */
  
  /* ESTILO */
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
  
  /* POSICIONAMENTO */
  margin: 0 auto !important; /* centralizar */
  position: relative !important; /* contexto para botão absoluto */
  padding: 0 !important;
}

/* Vídeo - garantir preenchimento correto (LAYDESK2) */
.laydesk2-sec2-video {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important; /* ou contain, dependendo do resultado desejado */
  margin: 0 !important;
  padding: 0 !important;
}

/* +++FIM SECAO APRESENTACAO / CONSERTO VIDEO DEFINITIVO+++ */
```

---

## Por que isso funciona?

### Antes (quebrado):
```
Tailwind: w-full → width: 100%
CSS: width: auto !important → width: auto
aspect-ratio: 9/16
max-height: 77vh (sem height definido)
Resultado: Navegador não sabe calcular largura → colapsa
```

### Depois (funcionando):
```
Tailwind: w-full → width: 100%
CSS: width: 100% !important → width: 100% (mantém)
aspect-ratio: 9/16
max-height: 77vh
height: auto
Resultado: Largura = 100% da coluna → aspect-ratio calcula altura = largura * 16/9 → funciona!
```

---

## Checklist de validação

Em 1366×768 @ 100% zoom (innerHeight ~599):

- [ ] Container do vídeo aparece com largura visível (não mais linha fina)
- [ ] Vídeo está renderizado dentro do container
- [ ] Proporção 9:16 está sendo respeitada
- [ ] Altura máxima não excede `77vh`
- [ ] Container não ultrapassa a coluna do grid
- [ ] Vídeo está centralizado na coluna direita
- [ ] Coluna esquerda e direita estão próximas (`column-gap: 0.75rem`)

---

## Ajustes finos (se necessário)

### Se o vídeo ficar muito alto (causar overflow):

```css
.laydesk2-sec2-video-container {
  max-height: 70vh !important; /* reduzir de 77vh para 70vh */
}
```

### Se quiser usar `object-fit: contain` (mostrar vídeo inteiro, pode ter bordas):

```css
.laydesk2-sec2-video {
  object-fit: contain !important; /* em vez de cover */
}
```

### Se quiser limitar largura máxima (vídeo não fica gigante em telas muito largas):

```css
.laydesk2-sec2-video-container {
  max-width: 400px !important; /* ou outro valor em px */
}
```

---

## Notas importantes

1. **Não mexer nos outros layouts**: Todas as mudanças devem estar **dentro** do media query do laydesk2
2. **A mudança principal**: `width: auto` → `width: 100%` (respeitar o Tailwind `w-full`)
3. **O aspect-ratio funciona melhor** quando a largura está definida, não quando está em `auto`
4. **A altura será calculada automaticamente** pelo `aspect-ratio` baseada na largura disponível

---

## Referências

- Problema: container do vídeo colapsou para linha fina
- Causa: `width: auto` com `aspect-ratio` não funciona quando não há altura definida
- Solução: usar `width: 100%` para respeitar o grid e deixar o `aspect-ratio` calcular a altura
- Padrão de referência: `laydesk3-sec2-video-container` (funciona corretamente)

