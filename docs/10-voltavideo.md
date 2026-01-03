# 10 — Volta do vídeo na Seção 2 (laydesk2) + aproximar colunas sem quebrar (DOCUMENTAÇÃO)

## Problema (o que realmente causa o “vídeo sumir”)

No laydesk2, ao tentar **aproximar as colunas** e remover a “listra” do meio, o **vídeo (coluna direita)** passou a “sumir”.

Isso acontece quando a **coluna esquerda** fica “larga demais” (ex.: `whitespace-nowrap` em título/subtítulo) e o grid **não consegue encolher** (falta `min-width: 0` nos itens) e/ou o container **corta horizontalmente** (`overflow-x: hidden` / `overflow: hidden`).

Resultado típico:
- O grid “estoura” para a direita
- A coluna do vídeo fica fora da área visível
- Como existe `overflow-x-hidden` na section e/ou `overflow: hidden` no container, o vídeo parece ter “desaparecido”

> Importante: isso pode acontecer mesmo com o `grid-template-columns` “certo”, se os itens do grid não puderem encolher.

---

## Objetivo (laydesk2 apenas)

1) **Vídeo voltar ao normal** (sem sumir).
2) **Aproximar as colunas** sem mexer no conteúdo interno (sem alterar espaçamento de itens dentro de cada coluna).
3) **Remover a listra** do meio (divisor).

---

## Estratégia correta (não quebrar o grid)

### Regra de ouro

Para aproximar colunas sem “sumir vídeo”:
- mexer somente no **gap** e na **coluna do divisor**
- garantir que os itens do grid possam **encolher**: `min-width: 0`
- usar `grid-template-columns: minmax(0, 1fr) ... minmax(0, 1fr)`
- **não** usar `overflow: hidden` horizontal no container do grid

### O que NÃO fazer (gera sumiço do vídeo)

- Colocar `overflow: hidden` no container do grid (ou manter `overflow-x: hidden`) quando a coluna esquerda tem `whitespace-nowrap`
- Forçar larguras rígidas de coluna (ex.: `grid-template-columns: 560px 0 420px`) sem validar o viewport real
- Esquecer `min-width: 0` nos itens do grid

---

## Implementação sugerida (CSS) — laydesk2 (pacote seguro)

Dentro do media query do laydesk2:

```css
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* +++INICIO SECAO APRESENTACAO / VOLTA VIDEO+++ */

  /* (A) Container do grid: NÃO cortar horizontalmente */
  .laydesk2-sec2-container {
    overflow-x: visible !important;
    overflow-y: hidden !important;
  }

  /* (B) Grid: colunas encolhíveis + divisor zerado */
  #apresentacao .laydesk2-sec2-container {
    column-gap: 1rem !important; /* AJUSTE AQUI (ex.: 0.5rem, 0.75rem, 1rem) */
    grid-template-columns: minmax(0, 1fr) 0px minmax(0, 1fr) !important;
  }

  /* (C) Itens do grid: permitir encolher (evita empurrar o vídeo pra fora) */
  .laydesk2-sec2-left {
    min-width: 0 !important;
  }

  .laydesk2-sec2-video-column {
    min-width: 0 !important;
  }

  /* (D) Remover a listra/divisor */
  .laydesk2-sec2-divider {
    display: none !important;
    width: 0 !important;
    opacity: 0 !important;
    background: transparent !important;
  }

  /* +++FIM SECAO APRESENTACAO / VOLTA VIDEO+++ */
}
```

---

## Checklist de validação (laydesk2)

Em 1366×768 @100% (innerHeight ~599):
- [ ] vídeo aparece normalmente
- [ ] colunas mais próximas (via `column-gap`)
- [ ] divisor central não aparece
- [ ] não mudou espaçamento interno dos itens da esquerda/direita
- [ ] sem overflow vertical na seção

---

## Diagnóstico rápido (10s) se “não mudou nada”

No DevTools, selecione o elemento `.laydesk2-sec2-container` e confira em **Computed**:
- `display: grid` (se não for grid, você está abaixo de `sm` e não existe “2 colunas”)
- `grid-template-columns: minmax(0, 1fr) 0px minmax(0, 1fr)`
- `column-gap` com o valor que você setou

Selecione `.laydesk2-sec2-divider` e confira:
- `display: none`

Se esses valores não aparecerem, o laydesk2 media query não está ativo **ou** você não está carregando o CSS atualizado.


