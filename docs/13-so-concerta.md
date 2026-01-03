# 13 — Conserto DEFINITIVO do Vídeo: Recriar do Zero (laydesk2)

## Análise profunda do problema

### Comparação: Laydesk3 (FUNCIONA) vs Laydesk2 (NÃO FUNCIONA)

#### **LAYDESK3 (FUNCIONA):**

**Grid Container:**
```css
.laydesk3-sec2-container {
  height: 100% !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  display: grid !important;
  align-items: center !important;
  /* NÃO define grid-template-columns - usa o padrão do HTML (md:grid-cols-[1fr_1px_1fr]) */
}
```

**Coluna do Vídeo:**
```css
.laydesk3-sec2-video-column {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  /* SIMPLES - sem width/height forçados */
}
```

**Container do Vídeo:**
```css
.laydesk3-sec2-video-container {
  aspect-ratio: 9 / 16 !important;
  width: min(462px, calc(68.2vh * 9 / 16)) !important;  /* ← LARGURA FIXA CALCULADA */
  max-width: 462px !important;
  max-height: 68.2vh !important;
  height: auto !important;
  /* ... estilo ... */
}
```

#### **LAYDESK2 (NÃO FUNCIONA - ATUAL):**

**Grid Container:**
```css
#apresentacao .laydesk2-sec2-container {
  display: grid !important;
  justify-content: center !important;
  justify-items: stretch !important;  /* ← PROBLEMA: stretch pode causar conflitos */
  grid-template-columns: minmax(0, 1fr) 0px minmax(0, 1fr) !important;  /* ← FORÇA grid */
  column-gap: 0.75rem !important;
}
```

**Coluna do Vídeo:**
```css
.laydesk2-sec2-video-column {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;  /* ← FORÇA width 100% */
  height: 100% !important;  /* ← FORÇA height 100% */
  /* ... */
}
```

**Container do Vídeo:**
```css
.laydesk2-sec2-video-container {
  width: min(100%, calc(77vh * 9 / 16)) !important;  /* ← PROBLEMA: 100% colapsa */
  max-width: 100% !important;
  aspect-ratio: 9 / 16 !important;
  max-height: 77vh !important;
  height: auto !important;
  /* ... */
}
```

---

## Problema identificado: Por que laydesk2 colapsa?

### Causa raiz #1: `width: min(100%, calc(77vh * 9 / 16))`

Quando a coluna do grid tem `width: 100%` forçado, e o container tem `width: min(100%, ...)`, pode acontecer:
- O grid ainda está calculando a largura da coluna
- O container tenta ocupar 100% de uma coluna que ainda não tem largura definida
- Resultado: colapso para largura mínima

### Causa raiz #2: Grid-template-columns forçado

No laydesk3, o grid usa o padrão do HTML (`md:grid-cols-[1fr_1px_1fr]`). No laydesk2, estamos forçando `grid-template-columns: minmax(0, 1fr) 0px minmax(0, 1fr)`, o que pode estar causando conflitos com o Tailwind.

### Causa raiz #3: Largura não é fixa como no laydesk3

Laydesk3 usa `width: min(462px, calc(68.2vh * 9 / 16))` → **largura fixa calculada** (não depende do grid).
Laydesk2 usa `width: min(100%, calc(77vh * 9 / 16))` → **largura relativa ao grid** (depende do grid estar pronto).

---

## Solução: RECRIAR DO ZERO baseado no laydesk3

### Estratégia: Copiar a abordagem do laydesk3 e adaptar

1. **Simplificar o grid** (não forçar grid-template-columns, deixar Tailwind fazer o trabalho)
2. **Simplificar a coluna** (remover width/height forçados)
3. **Largura fixa calculada** no container (como laydesk3, mas com valores do laydesk2)

---

## Implementação: CSS para laydesk2 (RECRIAR DO ZERO)

### Passo 1: Grid Container (SIMPLIFICAR)

**REMOVER tudo que está conflitando e deixar o mínimo necessário:**

```css
/* [SEC2] Container do grid - SIMPLIFICAR (LAYDESK2) */
#apresentacao .laydesk2-sec2-container {
  /* NÃO forçar grid-template-columns - deixar Tailwind (md:grid-cols-[1fr_1px_1fr]) */
  display: grid !important;
  align-items: center !important; /* centralizar verticalmente */
  /* REMOVER: justify-content, justify-items, grid-template-columns forçados */
}

/* OU, se precisar zerar o divisor, fazer de forma mais suave: */
#apresentacao .laydesk2-sec2-container {
  display: grid !important;
  align-items: center !important;
  /* Se o HTML já tem md:grid-cols-[1fr_1px_1fr], podemos sobrescrever apenas a coluna do meio */
  grid-template-columns: 1fr 0px 1fr !important; /* simples, sem minmax */
  column-gap: 0.75rem !important; /* aproximar colunas */
}
```

### Passo 2: Coluna do Vídeo (SIMPLIFICAR - igual laydesk3)

**REMOVER width/height forçados e deixar simples:**

```css
/* [SEC2] Coluna do vídeo - SIMPLIFICAR (LAYDESK2) - IGUAL LAYDESK3 */
.laydesk2-sec2-video-column {
  display: flex !important; /* FORÇA visibilidade (sobrescreve Tailwind "hidden sm:block") */
  align-items: center !important;
  justify-content: center !important;
  /* REMOVER: width, height, min-width, max-width forçados */
  /* Deixar o flex fazer o trabalho */
}
```

### Passo 3: Container do Vídeo (LARGURA FIXA CALCULADA - igual laydesk3)

**CALCULAR largura fixa baseada na altura máxima, como laydesk3:**

Para laydesk2, `max-height: 77vh`:
- Largura máxima = `77vh * 9/16 = 43.3vh`
- Mas queremos um valor em pixels também (como laydesk3 tem 462px)
- Em 1366×768 (viewport ~1366×599), `43.3vh ≈ 260px`

**OPÇÃO 1: Largura fixa em pixels (RECOMENDADO - mais estável)**
```css
.laydesk2-sec2-video-container {
  /* VISIBILIDADE */
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  
  /* DIMENSÕES - LARGURA FIXA CALCULADA (igual laydesk3) */
  aspect-ratio: 9 / 16 !important;
  width: min(400px, calc(77vh * 9 / 16)) !important; /* largura máxima 400px ou baseada na altura */
  max-width: 400px !important; /* não ultrapassar */
  max-height: 77vh !important;
  height: auto !important; /* altura calculada pelo aspect-ratio */
  
  /* ESTILO */
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
  
  /* POSICIONAMENTO */
  margin: 0 auto !important; /* centralizar */
  position: relative !important;
  padding: 0 !important;
}
```

**OPÇÃO 2: Largura baseada apenas em vh (como laydesk3, mas ajustado)**
```css
.laydesk2-sec2-video-container {
  aspect-ratio: 9 / 16 !important;
  width: calc(77vh * 9 / 16) !important; /* largura baseada na altura máxima */
  max-width: 100% !important; /* não ultrapassar a coluna (mas isso pode colapsar) */
  max-height: 77vh !important;
  height: auto !important;
  /* ... resto ... */
}
```

**RECOMENDAÇÃO: OPÇÃO 1** (largura fixa em pixels) é mais estável e não depende do grid estar pronto.

### Passo 4: Vídeo (manter como está)

```css
.laydesk2-sec2-video {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  margin: 0 !important;
  padding: 0 !important;
}
```

### Passo 5: Botão de Som (manter como está)

```css
.laydesk2-sec2-sound-button {
  bottom: 0.5rem !important;
  left: 0.5rem !important;
  padding: 0.375rem 0.75rem !important;
  font-size: 0.6875rem !important;
  gap: 0.375rem !important;
  z-index: 10 !important;
}
```

---

## Implementação COMPLETA (copiar e colar)

Dentro do media query `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)`:

```css
/* +++INICIO SECAO APRESENTACAO / CONSERTO DEFINITIVO VIDEO+++ */

/* [SEC2] Container do grid - SIMPLIFICAR (LAYDESK2) */
#apresentacao .laydesk2-sec2-container {
  display: grid !important;
  align-items: center !important;
  grid-template-columns: 1fr 0px 1fr !important; /* simples, divisor zerado */
  column-gap: 0.75rem !important; /* aproximar colunas */
}

/* [SEC2] Coluna do vídeo - SIMPLIFICAR (LAYDESK2) - IGUAL LAYDESK3 */
.laydesk2-sec2-video-column {
  display: flex !important; /* FORÇA visibilidade (sobrescreve Tailwind "hidden sm:block") */
  align-items: center !important;
  justify-content: center !important;
}

/* [SEC2] Container do vídeo - LARGURA FIXA CALCULADA (LAYDESK2) - IGUAL LAYDESK3 */
.laydesk2-sec2-video-container {
  /* VISIBILIDADE */
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  
  /* DIMENSÕES - LARGURA FIXA CALCULADA */
  aspect-ratio: 9 / 16 !important;
  width: min(400px, calc(77vh * 9 / 16)) !important; /* largura máxima 400px ou baseada na altura */
  max-width: 400px !important;
  max-height: 77vh !important;
  height: auto !important; /* altura calculada pelo aspect-ratio */
  
  /* ESTILO */
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 1rem !important;
  overflow: hidden !important;
  
  /* POSICIONAMENTO */
  margin: 0 auto !important; /* centralizar */
  position: relative !important;
  padding: 0 !important;
}

/* [SEC2] Vídeo - preenchimento correto (LAYDESK2) */
.laydesk2-sec2-video {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  margin: 0 !important;
  padding: 0 !important;
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

/* +++FIM SECAO APRESENTACAO / CONSERTO DEFINITIVO VIDEO+++ */
```

---

## Diferenças-chave entre esta solução e tentativas anteriores

### ❌ Tentativas anteriores (não funcionaram):
1. `width: auto` → colapsa
2. `width: 100%` → depende do grid estar pronto, pode colapsar
3. `width: min(100%, calc(...))` → ainda depende do grid
4. Grid com `minmax(0, 1fr)` → pode causar conflitos
5. Coluna com `width: 100%` e `height: 100%` forçados → conflitos

### ✅ Esta solução (vai funcionar):
1. **Largura fixa calculada** (`width: min(400px, calc(77vh * 9 / 16))`) → **não depende do grid**
2. **Grid simplificado** (`grid-template-columns: 1fr 0px 1fr`) → sem `minmax` complexo
3. **Coluna simplificada** → apenas `display: flex`, `align-items`, `justify-content` → sem width/height forçados
4. **Abordagem idêntica ao laydesk3** (que funciona) → apenas valores diferentes

---

## Por que esta solução VAI FUNCIONAR

1. **Largura fixa calculada** = o container não precisa esperar o grid calcular a largura da coluna
2. **Grid simplificado** = menos conflitos com Tailwind
3. **Coluna simplificada** = o flex centraliza o container sem forçar dimensões
4. **Mesmo padrão do laydesk3** = se funciona lá, vai funcionar aqui

---

## Validação (checklist)

Em 1366×768 @ 100% zoom (innerHeight ~599):

- [ ] Vídeo aparece com largura visível (não mais linha fina)
- [ ] Vídeo tem proporção 9:16 correta
- [ ] Altura máxima não excede `77vh`
- [ ] Largura máxima não excede `400px` (ou `calc(77vh * 9 / 16)`, o que for menor)
- [ ] Vídeo está centralizado na coluna direita
- [ ] Botão de som aparece no canto inferior esquerdo
- [ ] Colunas estão próximas (`column-gap: 0.75rem`)
- [ ] Sem overflow vertical
- [ ] Sem overflow horizontal

---

## Ajustes finos (se necessário após aplicar)

### Se o vídeo ficar muito pequeno:
```css
.laydesk2-sec2-video-container {
  width: min(450px, calc(77vh * 9 / 16)) !important; /* aumentar de 400px para 450px */
  max-width: 450px !important;
}
```

### Se o vídeo ficar muito grande (causar overflow):
```css
.laydesk2-sec2-video-container {
  width: min(350px, calc(70vh * 9 / 16)) !important; /* reduzir para 350px e 70vh */
  max-width: 350px !important;
  max-height: 70vh !important;
}
```

### Se quiser usar `object-fit: contain` (mostrar vídeo inteiro):
```css
.laydesk2-sec2-video {
  object-fit: contain !important; /* em vez de cover */
}
```

---

## Notas importantes

1. **Esta é uma RECRIAÇÃO COMPLETA** do CSS do vídeo no laydesk2
2. **Baseada 100% no laydesk3** (que funciona)
3. **A única diferença** são os valores (400px vs 462px, 77vh vs 68.2vh)
4. **A abordagem é idêntica**: largura fixa calculada, grid simplificado, coluna simplificada
5. **Não mexer nos outros layouts**: tudo dentro do media query do laydesk2

---

## Referências

- **Padrão de sucesso**: `laydesk3-sec2-video-container` (linha 1379-1398 do globals.css)
- **Problema**: laydesk2 tentou usar `width: auto` ou `width: 100%`, que colapsam
- **Solução**: usar largura fixa calculada (`width: min(400px, calc(77vh * 9 / 16))`)
- **Estratégia**: simplificar grid e coluna, igual laydesk3

