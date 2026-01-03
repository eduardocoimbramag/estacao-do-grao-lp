# 15 — Pensando FORA DA CAIXA: Testar abordagem RADICALMENTE diferente

## Análise final: Por que NADA funcionou?

Tentamos:
1. ✅ Largura fixa calculada (`width: min(400px, calc(...))`)
2. ✅ CSS idêntico ao laydesk3
3. ✅ Grid com largura mínima (`minmax(350px, 1fr)`)
4. ✅ Remover seletores duplicados
5. ✅ Simplificar coluna/vídeo

**Nada funcionou.** O vídeo continua colapsado.

---

## Descoberta crítica: O HTML tem `hidden sm:block`

**HTML (linha 222):**
```html
<div className="hidden sm:block ... laydesk2-sec2-video-column">
```

O Tailwind aplica:
- `hidden` → `display: none` (padrão)
- `sm:block` → `display: block` (em 640px+)

**Laydesk2 é `min-width: 1024px`**, então deveria estar aplicando `sm:block` e o vídeo deveria aparecer.

**MAS** estamos forçando `display: flex !important` no CSS, que deveria sobrescrever.

---

## Problema REAL: `overflow: hidden` na section

**CSS laydesk2 (linha 549-553):**
```css
#apresentacao.laydesk2-sec2-section {
  height: calc(100vh - 4rem) !important;
  max-height: calc(100vh - 4rem) !important;
  overflow: hidden !important; /* ← ISSO PODE ESTAR CORTANDO O VÍDEO! */
}
```

Se o vídeo estiver sendo cortado por `overflow: hidden`, ele pode estar "fora da tela" mesmo que exista!

---

## Solução RADICAL: Testar com CSS mínimo + debug visual

### Abordagem: Remover TODAS as regras complexas e testar com CSS mínimo

Se o vídeo não aparece mesmo com todas as tentativas, vamos testar com CSS **MÍNIMO** e ver se aparece:

```css
/* TESTE 1: CSS MÍNIMO - só o essencial */
.laydesk2-sec2-video-column {
  display: flex !important;
  background: red !important; /* DEBUG: ver se a coluna existe */
  min-width: 400px !important;
  width: 400px !important;
}

.laydesk2-sec2-video-container {
  background: blue !important; /* DEBUG: ver se o container existe */
  width: 400px !important;
  height: 600px !important;
  min-width: 400px !important;
  min-height: 400px !important;
}

.laydesk2-sec2-video {
  width: 100% !important;
  height: 100% !important;
  background: green !important; /* DEBUG: ver se o vídeo existe */
}
```

Se isso não funcionar, o problema NÃO é no CSS do vídeo, é em outro lugar.

---

## Outra possibilidade: A section está cortando

Se a section tem `overflow: hidden` e o vídeo está sendo cortado, talvez precisemos garantir que o container do grid não seja cortado:

```css
#apresentacao.laydesk2-sec2-section {
  overflow: visible !important; /* TESTE: remover hidden */
}
```

Mas isso pode quebrar o layout...

---

## Solução DEFINITIVA: Copiar EXATAMENTE o laydesk3 (incluindo valores)

Olhando o laydesk3 que funciona:
- Container: não define `grid-template-columns` (deixa Tailwind)
- Coluna: apenas `display: flex`, `align-items`, `justify-content`
- Container vídeo: `width: min(462px, calc(68.2vh * 9 / 16))`

**Vamos copiar EXATAMENTE, mas adaptar apenas os valores:**

```css
/* Container do grid - DEIXAR TAILWIND CONTROLAR (igual laydesk3) */
.laydesk2-sec2-container {
  height: 100% !important;
  display: grid !important;
  align-items: center !important;
  /* NÃO definir grid-template-columns - deixar Tailwind md:grid-cols-[1fr_1px_1fr] */
  /* NÃO definir column-gap - deixar Tailwind */
  overflow-x: visible !important;
  overflow-y: hidden !important;
}

/* Coluna do vídeo - EXATAMENTE igual laydesk3 */
.laydesk2-sec2-video-column {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* Container do vídeo - EXATAMENTE igual laydesk3 (valores ajustados) */
.laydesk2-sec2-video-container {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
  
  aspect-ratio: 9 / 16 !important;
  width: min(400px, calc(77vh * 9 / 16)) !important;
  max-width: 400px !important;
  max-height: 77vh !important;
  height: auto !important;
  
  margin: 0 auto !important;
  position: relative !important;
}

/* Vídeo - EXATAMENTE igual laydesk3 */
.laydesk2-sec2-video {
  object-fit: cover !important;
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  background: transparent !important;
}
```

**DIFERENÇA**: Não definir `grid-template-columns` no CSS, deixar o Tailwind fazer!

Mas espera... isso vai usar `1fr 1px 1fr` do Tailwind, não `1fr 0px 1fr`. Precisamos zerar o divisor de outra forma.

---

## Solução FINAL: Deixar Tailwind + zerar divisor separadamente

```css
/* Container do grid - DEIXAR TAILWIND (igual laydesk3) */
.laydesk2-sec2-container {
  height: 100% !important;
  display: grid !important;
  align-items: center !important;
  /* NÃO tocar em grid-template-columns - Tailwind aplica md:grid-cols-[1fr_1px_1fr] */
  gap: 0.75rem !important; /* aproximar colunas */
  overflow-x: visible !important;
  overflow-y: hidden !important;
}

/* Divisor - zerar largura (mas a coluna do grid ainda existe) */
.laydesk2-sec2-divider {
  width: 0 !important;
  display: none !important;
}

/* Coluna do vídeo - EXATAMENTE igual laydesk3 */
.laydesk2-sec2-video-column {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* Container do vídeo - EXATAMENTE igual laydesk3 */
.laydesk2-sec2-video-container {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
  
  aspect-ratio: 9 / 16 !important;
  width: min(400px, calc(77vh * 9 / 16)) !important;
  max-width: 400px !important;
  max-height: 77vh !important;
  height: auto !important;
  
  margin: 0 auto !important;
  position: relative !important;
}

/* Vídeo - EXATAMENTE igual laydesk3 */
.laydesk2-sec2-video {
  object-fit: cover !important;
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  background: transparent !important;
}
```

---

## Implementação COMPLETA (deixar Tailwind controlar grid)

Dentro do media query `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)`:

```css
/* +++INICIO SECAO APRESENTACAO / VIDEO LAYDESK2 (DEIXAR TAILWIND)+++ */

/* [SEC2] Container do grid (LAYDESK2) - DEIXAR TAILWIND CONTROLAR (igual laydesk3) */
.laydesk2-sec2-container {
  height: 100% !important;
  display: grid !important;
  align-items: center !important;
  /* NÃO definir grid-template-columns - deixar Tailwind md:grid-cols-[1fr_1px_1fr] */
  gap: 0.75rem !important; /* aproximar colunas (substitui gap do Tailwind) */
  overflow-x: visible !important;
  overflow-y: hidden !important;
}

/* [SEC2] Divisor - zerar (mas coluna do grid ainda existe) */
.laydesk2-sec2-divider {
  width: 0 !important;
  display: none !important;
  opacity: 0 !important;
  background: transparent !important;
}

/* [SEC2] Coluna do vídeo (LAYDESK2) - EXATAMENTE igual laydesk3 */
.laydesk2-sec2-video-column {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* [SEC2] Container do vídeo (LAYDESK2) - EXATAMENTE igual laydesk3 (valores ajustados) */
.laydesk2-sec2-video-container {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
  
  aspect-ratio: 9 / 16 !important;
  width: min(400px, calc(77vh * 9 / 16)) !important;
  max-width: 400px !important;
  max-height: 77vh !important;
  height: auto !important;
  
  margin: 0 auto !important;
  position: relative !important;
}

/* [SEC2] Vídeo (LAYDESK2) - EXATAMENTE igual laydesk3 */
.laydesk2-sec2-video {
  object-fit: cover !important;
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  background: transparent !important;
}

/* [SEC2] Botão de som (LAYDESK2) */
.laydesk2-sec2-sound-button {
  bottom: 0.5rem !important;
  left: 0.5rem !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 0.6875rem !important;
  gap: 0.375rem !important;
  z-index: 10 !important;
}

.laydesk2-sec2-sound-icon {
  font-size: 0.75rem !important;
}

.laydesk2-sec2-sound-text {
  font-size: 0.6875rem !important;
}

/* +++FIM SECAO APRESENTACAO / VIDEO LAYDESK2+++ */
```

---

## Por que esta solução DEVE funcionar:

1. **Deixa Tailwind controlar o grid** = mesmo comportamento do laydesk3
2. **Não força grid-template-columns** = evita conflitos
3. **CSS do vídeo idêntico ao laydesk3** = mesma lógica que funciona
4. **Única diferença**: valores ajustados (400px vs 462px, 77vh vs 68.2vh)

---

## Validação (checklist)

Em 1366×768 @ 100% zoom (innerHeight ~599):

- [ ] Vídeo aparece com largura visível
- [ ] Vídeo tem proporção 9:16 correta
- [ ] Colunas estão próximas (gap: 0.75rem)
- [ ] Divisor não aparece (display: none)
- [ ] Sem overflow vertical
- [ ] Sem overflow horizontal

---

## Notas importantes

1. **Mudança principal**: REMOVER `grid-template-columns` do CSS, deixar Tailwind (`md:grid-cols-[1fr_1px_1fr]`)
2. **Igual ao laydesk3**: estrutura idêntica, apenas valores diferentes
3. **Não mexer nos outros layouts**: tudo dentro do media query do laydesk2
