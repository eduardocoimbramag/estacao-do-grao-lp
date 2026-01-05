# 11 — Conserto da Seção 2: Vídeo Sumiu (laydesk2)

## Problema atual

Na Seção 2 ("O que é a Estação do Grão?") do **laydesk2** (1366×768 @ 100% zoom):
- O vídeo da coluna direita **desapareceu**
- A coluna esquerda (texto) está ocupando muito espaço
- As duas colunas não estão próximas

---

## Objetivo

1. **Fazer o vídeo reaparecer** na coluna direita
2. **Aproximar as duas colunas** (esquerda + direita) sem alterar o conteúdo interno de cada uma
3. **Centralizar horizontalmente** o conjunto das duas colunas na tela

---

## Diagnóstico: Por que o vídeo sumiu?

### Possíveis causas (em ordem de probabilidade)

#### 1. Conflito entre Tailwind `hidden sm:block` e CSS customizado
- No JSX, a coluna do vídeo tem: `className="hidden sm:block ..."`
- Mas no CSS laydesk2, forçamos: `.laydesk2-sec2-video-column { display: flex !important; }`
- **Problema**: Se o breakpoint `sm:` do Tailwind não ativar em laydesk2, o `hidden` ganha e esconde tudo

#### 2. Grid está "empurrando" a coluna do vídeo para fora da área visível
- Se a coluna esquerda for muito larga (ex.: `whitespace-nowrap` nos textos) e não tiver `min-width: 0`, ela "estoura"
- Com `overflow-x: hidden` na section, a coluna direita fica cortada (invisível)

#### 3. Largura/altura do vídeo ou container zeradas
- Se `max-width: 0`, `width: 0`, `display: none`, `visibility: hidden`, ou `opacity: 0` forem aplicados por engano

#### 4. Media query não está ativa
- Se a resolução não cair no range do laydesk2: `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)`

---

## Checklist de diagnóstico rápido (10s no DevTools)

Abra o DevTools em 1366×768 @ 100% e inspecione `.laydesk2-sec2-video-column`:

### 1. Computed → `display`
- **Esperado**: `flex` ou `grid` (visível)
- **Se estiver `none`**: O Tailwind `hidden` está ganhando. Solução → forçar `display: flex !important;` no CSS laydesk2

### 2. Computed → `grid-template-columns` (no `.laydesk2-sec2-container`)
- **Esperado**: `minmax(0, 1fr) 0px minmax(0, 1fr)` (3 colunas: esquerda, divisor zerado, direita)
- **Se estiver diferente**: O media query não está ativo ou o CSS não carregou

### 3. Computed → `overflow-x` (no `.laydesk2-sec2-container`)
- **Esperado**: `visible` (não corta horizontalmente)
- **Se estiver `hidden`**: O vídeo pode estar sendo cortado. Solução → forçar `overflow-x: visible !important;`

### 4. Computed → `min-width` (na `.laydesk2-sec2-left` e `.laydesk2-sec2-video-column`)
- **Esperado**: `0` (permite encolher)
- **Se estiver `auto`**: Grid não consegue encolher e pode empurrar o vídeo pra fora

### 5. Visual: O elemento `.laydesk2-sec2-video-column` aparece na árvore do DevTools?
- **Se sim, mas não aparece na tela**: Está sendo cortado (`overflow`) ou tem `opacity: 0` / `visibility: hidden`
- **Se não aparece na árvore**: O `hidden` do Tailwind está removendo do layout

---

## Solução proposta (laydesk2 apenas)

### Estratégia

1. **Garantir visibilidade**: Forçar `display: flex !important;` na coluna do vídeo para sobrescrever `hidden`
2. **Garantir grid funcional**: Forçar `display: grid !important;` no container com `minmax(0, 1fr)`
3. **Evitar corte horizontal**: `overflow-x: visible !important;` no container
4. **Permitir encolhimento**: `min-width: 0 !important;` em ambas as colunas
5. **Remover divisor**: `display: none !important;` no `.laydesk2-sec2-divider`
6. **Aproximar colunas**: Reduzir `column-gap` (ex.: de `1rem` para `0.75rem` ou `0.5rem`)

---

## Implementação CSS (laydesk2)

Dentro do media query `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)`:

```css
/* +++INICIO SECAO APRESENTACAO / CONSERTO VIDEO+++ */

/* (A) Container do grid: forçar grid + não cortar horizontalmente */
#apresentacao .laydesk2-sec2-container {
  display: grid !important; /* garante que seja grid mesmo se Tailwind tentar flex */
  overflow-x: visible !important; /* não cortar horizontalmente */
  overflow-y: hidden !important; /* cortar verticalmente se necessário */
  align-items: center !important; /* centralizar verticalmente */
  justify-content: center !important; /* centralizar horizontalmente */
  justify-items: center !important; /* centralizar itens horizontalmente */
  
  /* Colunas encolhíveis + divisor zerado */
  grid-template-columns: minmax(0, 1fr) 0px minmax(0, 1fr) !important;
  
  /* AJUSTAR AQUI: Aproximar colunas (0.5rem = mais próximo; 1rem = mais distante) */
  column-gap: 0.75rem !important;
}

/* (B) Coluna esquerda: permitir encolher + centralizar conteúdo */
.laydesk2-sec2-left {
  min-width: 0 !important; /* crucial para não estourar grid */
  max-width: 100% !important; /* não ultrapassar a coluna */
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important; /* centralizar verticalmente */
  overflow: hidden !important; /* cortar se necessário */
}

/* (C) Divisor: remover completamente */
.laydesk2-sec2-divider {
  display: none !important;
  width: 0 !important;
  opacity: 0 !important;
  background: transparent !important;
}

/* (D) Coluna direita (vídeo): forçar visibilidade + permitir encolher */
.laydesk2-sec2-video-column {
  display: flex !important; /* FORÇA visibilidade (sobrescreve Tailwind "hidden") */
  visibility: visible !important; /* garantia extra */
  opacity: 1 !important; /* garantia extra */
  min-width: 0 !important; /* permite encolher sem empurrar pra fora */
  max-width: 100% !important; /* não ultrapassar a coluna */
  align-items: center !important; /* centralizar verticalmente */
  justify-content: center !important; /* centralizar horizontalmente */
}

/* (E) Container do vídeo: manter proporção 9:16 e visível */
.laydesk2-sec2-video-container {
  display: flex !important; /* força visibilidade */
  visibility: visible !important;
  opacity: 1 !important;
  aspect-ratio: 9 / 16 !important; /* proporção vertical */
  max-height: 77vh !important; /* limitar altura (AJUSTE AQUI se necessário) */
  width: auto !important; /* largura calculada automaticamente */
  max-width: 100% !important; /* não ultrapassar a coluna */
  margin: 0 auto !important; /* centralizar */
  overflow: hidden !important; /* manter bordas arredondadas */
  border-radius: 1rem !important; /* bordas arredondadas */
  border: 1px solid rgba(255, 255, 255, 0.15) !important; /* contorno branco */
  background: transparent !important; /* sem fundo marrom */
}

/* (F) Vídeo: garantir visibilidade e proporção */
.laydesk2-sec2-video {
  display: block !important; /* força visibilidade */
  visibility: visible !important;
  opacity: 1 !important;
  width: 100% !important; /* ocupar todo o container */
  height: 100% !important; /* ocupar todo o container */
  object-fit: cover !important; /* preencher sem distorcer */
}

/* +++FIM SECAO APRESENTACAO / CONSERTO VIDEO+++ */
```

---

## Ajustes finos (opcionais)

### 1. Reduzir largura da coluna esquerda (aproximar mais)
Se quiser que a coluna esquerda seja **mais estreita** (dando mais espaço pro vídeo):

```css
.laydesk2-sec2-left {
  max-width: 45% !important; /* limita a 45% da largura disponível */
}
```

### 2. Aumentar largura da coluna direita (vídeo maior)
Se quiser que o vídeo seja **mais largo**:

```css
.laydesk2-sec2-video-column {
  max-width: 55% !important; /* limita a 55% da largura disponível */
}
```

### 3. Reduzir altura máxima do vídeo (evitar overflow)
Se o vídeo ainda estiver causando overflow vertical:

```css
.laydesk2-sec2-video-container {
  max-height: 70vh !important; /* reduzir de 77vh para 70vh */
}
```

---

## Validação (checklist)

Em 1366×768 @ 100% zoom (innerHeight ~599):

- [ ] Vídeo aparece na coluna direita
- [ ] Coluna esquerda (texto) está à esquerda
- [ ] Divisor do meio não aparece
- [ ] As duas colunas estão próximas (via `column-gap`)
- [ ] As duas colunas estão centralizadas horizontalmente na tela
- [ ] Não há overflow vertical (nada cortado em cima ou embaixo)
- [ ] Não há overflow horizontal (sem scroll horizontal)

---

## Diagnóstico se ainda não funcionar

### Se o vídeo ainda não aparecer:

1. **Confira no DevTools** → Elements → procure por `laydesk2-sec2-video-column`
   - Se **não aparecer na árvore**: O elemento está com `display: none` do Tailwind. Solução → forçar `display: flex !important;`
   - Se **aparecer, mas tiver `width: 0` ou `height: 0`**: O grid não está funcionando. Solução → confira `grid-template-columns`

2. **Confira no DevTools** → Computed → `.laydesk2-sec2-video-column`
   - `display` deve ser `flex` (não `none`)
   - `visibility` deve ser `visible` (não `hidden`)
   - `opacity` deve ser `1` (não `0`)
   - `width` deve ser > `0px`
   - `height` deve ser > `0px`

3. **Confira no DevTools** → Computed → `.laydesk2-sec2-container`
   - `display` deve ser `grid` (não `flex`)
   - `grid-template-columns` deve ser `minmax(0, 1fr) 0px minmax(0, 1fr)`
   - `overflow-x` deve ser `visible` (não `hidden`)

4. **Confira no DevTools** → Console → rode:
```javascript
window.innerHeight
```
   - Se for **< 580**: O media query do laydesk2 não está ativo (está caindo no laydesk3 ou outro)
   - Se for **entre 580 e 899**: O media query está ativo ✓

---

## Notas importantes

1. **Não mexer nos outros layouts**: Todas as mudanças devem estar **dentro** do media query do laydesk2
2. **Não alterar o tamanho da seção**: A section deve continuar com `height: calc(100vh - 4rem)`
3. **Não alterar o conteúdo interno**: Espaçamentos e tamanhos de textos/botões dentro de cada coluna permanecem inalterados
4. **Apenas aproximar as colunas**: Usar `column-gap` para controlar a distância entre esquerda ↔ direita

---

## Referências

- Problema original: vídeo sumiu após tentativas de aproximar colunas
- Causa mais provável: conflito entre `hidden sm:block` do Tailwind e `display: flex !important;` do CSS customizado
- Solução: forçar visibilidade explícita no CSS laydesk2 com `!important`




