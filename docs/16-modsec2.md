# Modificações: Seção 2 "O que é a Estação do Grão?" (laydesk3)

## Objetivo

Ajustar a seção 2 "O que é a Estação do Grão?" para o layout **laydesk3** (1280×720), garantindo que:
- O **tamanho da section permaneça inalterado** (já está perfeito)
- Apenas o **CSS do conteúdo seja modificado**
- **Não modificar** nenhum dos demais layouts (laydesk1, laydesk2, mobile)

---

## Problema Identificado

### Estado Atual

#### 1. Coluna Esquerda (Conteúdo)
- Conteúdo da coluna esquerda não está centralizado verticalmente
- O início do conteúdo não tem a mesma distância do topo que o final tem do bottom

#### 2. Coluna Direita (Vídeo)
- Vídeo possui campos marrons escuros nas laterais (background `bg-black/40` / `rgba(0, 0, 0, 0.35)`)
- Borda branca sutil existe, mas está "afundada" devido ao background marrom
- Necessário fazer a borda branca contornar perfeitamente o vídeo, sem os campos marrons

### Solução Proposta

#### 1. Coluna Esquerda
- Centralizar verticalmente o conteúdo da coluna esquerda
- **Não alterar** espaçamentos ou tamanhos entre os itens internos
- Apenas ajustar o posicionamento vertical do container como um todo

#### 2. Coluna Direita (Vídeo)
- Remover o background marrom escuro (`background: rgba(0, 0, 0, 0.35)`)
- Manter a borda branca sutil (`border: 1px solid rgba(255, 255, 255, 0.16)`)
- Manter bordas arredondadas (`border-radius: 1.25rem`)
- Fazer com que a borda contorne perfeitamente o vídeo (sem campos marrons nas laterais)

---

## Estrutura do Componente

### Arquivo: `components/OpenMenuIntro.tsx`

A seção contém:
1. **Section principal** (`<section id="apresentacao">`) - linha 59
2. **Container interno** (`<div>` com classes `laydesk3-sec2-container`) - linha 63
3. **Grid 2 colunas** (md:grid-cols-[1fr_1px_1fr]):
   - **Coluna 1 (esquerda):** Conteúdo (título, subtítulo, parágrafo, lista, botões) - linha 65
   - **Coluna 2 (meio):** Divisor/spine visual - linha 216
   - **Coluna 3 (direita):** Vídeo de apresentação - linha 222

### Elementos que serão ajustados:

#### Coluna Esquerda (linha 65):
```tsx
<div className="order-1 sm:order-1 space-y-2 w-full flex flex-col h-full">
  {/* Título, subtítulo, parágrafo, lista, botões */}
</div>
```
- Classe atual: `flex flex-col h-full`
- **Não possui classe específica** `laydesk3-sec2-left-column` no HTML (existe apenas no CSS)
- Espaçamentos internos: `space-y-2`, `space-y-9 md:space-y-12`, etc.

#### Coluna Direita - Container do Vídeo (linha 223):
```tsx
<div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-black/40 w-full max-w-full laydesk2-sec2-video-container laydesk3-sec2-video-container">
  <video className="h-full w-full object-contain laydesk2-sec2-video laydesk3-sec2-video" ...>
  </video>
</div>
```
- Classe Tailwind: `bg-black/40` (background marrom escuro - precisa ser removido via CSS)
- Classes específicas: `laydesk3-sec2-video-container`, `laydesk3-sec2-video`
- Vídeo com `object-contain` (preserva aspect ratio, criando campos laterais quando necessário)

---

## Modificações no CSS

### Arquivo: `app/globals.css`

Adicionar/modificar no bloco `@media (min-width: 1024px) and (max-height: 767px)`:

```css
/* ============================================
   SEÇÃO 2 (apresentacao): O que é a Estação do Grão? (laydesk3)
   Modificações adicionais
   ============================================ */

/* 1. Coluna esquerda: Centralizar verticalmente o conteúdo */
.laydesk3-sec2-container > div:first-child {
  justify-content: center !important;
}

/* Nota: A div da coluna esquerda já possui `flex flex-col h-full` no HTML.
   Ao adicionar `justify-content: center`, o conteúdo será centralizado verticalmente
   sem alterar os espaçamentos internos (space-y-2, space-y-9, etc.) */

/* 2. Container do vídeo: Remover background marrom escuro */
.laydesk3-sec2-video-container {
  background: transparent !important; /* Remover rgba(0, 0, 0, 0.35) */
}

/* A borda branca já existe e continuará funcionando:
   border: 1px solid rgba(255, 255, 255, 0.16) !important;
   border-radius: 1.25rem !important;
   
   Com background transparente, a borda branca contornará perfeitamente o vídeo,
   sem os campos marrons escuros nas laterais. */
```

---

## Detalhamento das Modificações

### 1. Centralização Vertical da Coluna Esquerda

#### Problema
- O conteúdo da coluna esquerda começa no topo, não está centralizado verticalmente
- O espaçamento do topo é diferente do espaçamento do bottom

#### Solução
- Adicionar `justify-content: center` na div da coluna esquerda (`.laydesk3-sec2-container > div:first-child`)
- A div já possui `flex flex-col h-full`, então apenas precisamos ajustar o `justify-content`
- **Importante:** Os espaçamentos internos (`space-y-2`, `space-y-9`, etc.) **NÃO serão alterados**
- O `justify-content: center` apenas centraliza o conteúdo como um bloco, mantendo os espaçamentos relativos entre os elementos

#### Resultado
- Conteúdo centralizado verticalmente
- Espaçamentos internos preservados
- Distância do topo igual à distância do bottom

### 2. Remoção dos Campos Marrons e Ajuste da Borda do Vídeo

#### Problema
- O container do vídeo possui `background: rgba(0, 0, 0, 0.35)` (campos marrons escuros nas laterais)
- Quando o vídeo usa `object-contain`, ele preserva o aspect ratio, criando espaços vazios nas laterais
- Esses espaços vazios ficam com o background marrom escuro
- A borda branca existe, mas está "escondida" pelo background

#### Solução
- Remover o background marrom: `background: transparent !important`
- Manter a borda branca sutil: `border: 1px solid rgba(255, 255, 255, 0.16)` (já existe)
- Manter bordas arredondadas: `border-radius: 1.25rem` (já existe)
- O vídeo continuará com `object-contain`, mas agora a borda branca contornará perfeitamente o vídeo, sem os campos marrons

#### Resultado
- Borda branca sutil contornando perfeitamente o vídeo
- Sem campos marrons escuros nas laterais
- Bordas arredondadas preservadas
- Vídeo mantém aspect ratio original (`object-contain`)

---

## Estrutura do Media Query

O código deve ser inserido/modificado dentro do bloco existente:

```css
@media (min-width: 1024px) and (max-height: 767px) {
  /* ... código existente do laydesk3 ... */
  
  /* ============================================
     SEÇÃO 2 (apresentacao): O que é a Estação do Grão? (laydesk3)
     ============================================ */
  
  .laydesk3-sec2-section {
    /* ... regras existentes ... */
  }
  
  .laydesk3-sec2-container {
    /* ... regras existentes ... */
  }
  
  /* NOVA REGRA: Centralizar coluna esquerda */
  .laydesk3-sec2-container > div:first-child {
    justify-content: center !important;
  }
  
  /* ... outras regras existentes ... */
  
  .laydesk3-sec2-video-container {
    background: transparent !important; /* MODIFICAR: remover rgba(0, 0, 0, 0.35) */
    /* border, border-radius, etc. já existem e permanecem */
  }
  
  /* ... resto do código ... */
}
```

---

## Notas Importantes

- **Apenas laydesk3:** Todas as regras dentro do media query específico `@media (min-width: 1024px) and (max-height: 767px)`
- **Tamanho da section preservado:** A altura da section (`calc(100vh - 4rem)`) **NÃO deve ser alterada**
- **Apenas CSS do conteúdo:** Modificações apenas em posicionamento e estilos visuais dos elementos internos
- **Espaçamentos preservados:** Os espaçamentos internos da coluna esquerda (`space-y-2`, `space-y-9`, etc.) **NÃO serão alterados**
- **Conteúdo preservado:** Nenhum elemento removido ou modificado estruturalmente
- **Funcionalidade intacta:** Vídeo e demais elementos continuam funcionando normalmente
- **Aspect ratio preservado:** O vídeo mantém `object-contain`, preservando o aspect ratio original

---

## Seletores CSS Utilizados

### Coluna Esquerda
- **Seletor:** `.laydesk3-sec2-container > div:first-child`
- **Justificativa:** 
  - `.laydesk3-sec2-container` identifica o container da seção
  - `> div:first-child` seleciona a primeira div filha direta (coluna esquerda, `order-1`)
  - Este seletor é mais específico e não requer modificação no HTML

### Container do Vídeo
- **Seletor:** `.laydesk3-sec2-video-container`
- **Justificativa:** 
  - Classe específica já existe no HTML (linha 223)
  - Apenas precisa modificar a propriedade `background`

---

## Testes Necessários

### Desktop (laydesk3 - 1280×720)
- ✅ Coluna esquerda centralizada verticalmente
- ✅ Espaçamentos internos da coluna esquerda preservados (space-y-2, space-y-9, etc.)
- ✅ Distância do topo igual à distância do bottom na coluna esquerda
- ✅ Vídeo sem campos marrons escuros nas laterais
- ✅ Borda branca sutil contornando perfeitamente o vídeo
- ✅ Bordas arredondadas do vídeo preservadas
- ✅ Vídeo mantém aspect ratio (object-contain)
- ✅ Layout não quebra
- ✅ Todos os elementos visíveis e funcionais

### Outros Layouts (Verificação de não-regressão)
- ✅ Desktop 1920×1080 (laydesk1): Sem mudanças
- ✅ Desktop 1368×768 (laydesk2): Sem mudanças
- ✅ Desktop 1600×900 (laydesk1): Sem mudanças
- ✅ Mobile: Sem mudanças

---

## Checklist de Implementação

Antes de implementar, verificar:
- [ ] Entender que o tamanho da section **NÃO deve ser alterado**
- [ ] Confirmar que as modificações são apenas no CSS do conteúdo interno
- [ ] Verificar que o media query correto é `@media (min-width: 1024px) and (max-height: 767px)`
- [ ] Garantir que nenhuma alteração será feita em outros layouts
- [ ] Entender que os espaçamentos internos da coluna esquerda **NÃO serão alterados**

Após implementar, verificar:
- [ ] Coluna esquerda centralizada verticalmente
- [ ] Espaçamentos internos da coluna esquerda preservados
- [ ] Vídeo sem campos marrons escuros
- [ ] Borda branca contornando perfeitamente o vídeo
- [ ] Bordas arredondadas do vídeo preservadas
- [ ] Nenhuma alteração foi feita em outros layouts (laydesk1, laydesk2, mobile)
- [ ] Funcionalidade do vídeo continua intacta
- [ ] Testes visuais realizados em 1280×720

---

## Referências

- Componente: `components/OpenMenuIntro.tsx`
- CSS: `app/globals.css` (media query laydesk3 - linha ~873)
- Definição de layouts: `docs/03-LAYOUTS.md`
- Documentações similares:
  - `docs/11-mod-sec2.md` (laydesk2)
  - `docs/12-mods-sec2.md` (laydesk2)
  - `docs/13-modif-sec2.md` (laydesk2)


