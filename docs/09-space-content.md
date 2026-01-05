# 09 — Aproximar e centralizar colunas da Seção 2 (laydesk2) + ocultar “listra” do meio (DOCUMENTAÇÃO)

## Objetivo

No **laydesk2 apenas**, na Seção 2 (`#apresentacao`):
1) **Aproximar** a coluna esquerda (texto/lista/botões) da coluna direita (vídeo), **sem alterar** espaçamentos internos de cada coluna (sem mexer em `space-y`, margens internas, paddings internos, etc.).
2) **Centralizar** o conjunto (duas colunas) na página.
3) **Remover/ocultar** a “listra”/barra vertical do meio (spine/divisor) que está aparecendo.

> **Importante:** este documento **não implementa nada**. Só orienta a implementação quando você autorizar.

---

## O que é “esse bloco que divide as colunas”?

Sim — ele é este elemento (spine/divisor) no meio do grid:

```html
<div aria-hidden="true"
  class="hidden md:block h-full w-px ... order-2 laydesk2-sec2-divider laydesk3-sec2-divider">
</div>
```

Ele ocupa a “coluna do meio” do grid `md:grid-cols-[1fr_1px_1fr]`.

---

## Estratégia (sem mexer no conteúdo interno)

Para aproximar as colunas **sem mexer em nada dentro da esquerda/direita**, a alteração deve acontecer somente no **container do grid**:

Container (já existe no HTML):

```html
<div class="... md:grid-cols-[1fr_1px_1fr] ... laydesk2-sec2-container">
```

### O que vamos controlar no laydesk2

- **Gap entre colunas** (apenas distância entre esquerda ↔ direita)
- **Largura da coluna do divisor** (reduzir para 0)
- **Visibilidade do divisor** (ocultar)
- **Centralização do grid** (centrar o conjunto no espaço disponível)

---

## Implementação proposta (CSS) — somente laydesk2

Colar dentro do media query do laydesk2:

```css
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* +++INICIO SECAO APRESENTACAO / ESPACAMENTO COLUNAS+++ */

  /* (1) Centralizar o conjunto das 2 colunas dentro do container
     Impacto: move o “bloco” (esquerda+direita) para o centro, sem mexer nos itens internos. */
  #apresentacao .laydesk2-sec2-container {
    justify-content: center !important;
    justify-items: center !important;
  }

  /* (2) Aproximar as colunas (reduzir distância entre esquerda ↔ direita)
     Impacto: apenas diminui o espaço “entre colunas”, não mexe no conteúdo interno. */
  #apresentacao .laydesk2-sec2-container {
    column-gap: 1rem !important; /* AJUSTE AQUI (ex.: 0.75rem, 1rem, 1.25rem) */
  }

  /* (3) Zerar a coluna do divisor (em vez de 1px, vira 0)
     Impacto: remove o “espaço reservado” do meio sem alterar as colunas internas. */
  #apresentacao .laydesk2-sec2-container {
    grid-template-columns: 1fr 0px 1fr !important; /* AJUSTE AQUI */
  }

  /* (4) Ocultar completamente a listra/divisor
     Impacto: não aparece visualmente (nem ocupa largura). */
  #apresentacao .laydesk2-sec2-divider {
    display: none !important;
    width: 0 !important;
    opacity: 0 !important;
    background: transparent !important;
  }

  /* +++FIM SECAO APRESENTACAO / ESPACAMENTO COLUNAS+++ */
}
```

### Por que isso não mexe no conteúdo?

Porque estamos alterando **apenas**:
- a “malha” do grid (colunas + gap)
- a existência visual do divisor

Os itens dentro de `.laydesk2-sec2-left` e `.laydesk2-sec2-video-column` continuam com seus paddings, `space-y`, tamanhos e alinhamentos originais.

---

## Checklist de validação (laydesk2)

Em 1366×768 @100% (innerHeight ~599):
- [ ] esquerda e direita ficam mais próximas
- [ ] conjunto das duas colunas fica centralizado na página
- [ ] divisor central (“listra”) não aparece
- [ ] não alterou espaçamento interno da coluna esquerda (texto/lista/botões)
- [ ] não alterou o vídeo (tamanho/enquadramento)
- [ ] sem overflow na seção





