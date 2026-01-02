# Modificações: Seção "Regiões Atendidas" (laydesk3)

## Objetivo

Ajustar a seção "Regiões Atendidas" para o layout **laydesk3** (1280×720), garantindo que:
- O **tamanho da section permaneça inalterado** (já está perfeito)
- Apenas o **CSS do conteúdo seja modificado**
- **Não modificar** nenhum dos demais layouts (laydesk1, laydesk2, mobile)

---

## Problema Identificado

### Estado Atual

#### 1. Coluna Direita (Botões)
- Botões "Galeria de experiências" e "Blog" não estão centralizados verticalmente
- O início do conteúdo não tem a mesma distância do topo que o final tem do bottom

#### 2. Coluna Esquerda - Espaçamento entre Cards
- Os 3 cards têm espaçamento muito grande entre eles
- Necessário reduzir o gap/espaçamento pela metade

#### 3. Cards - Tamanho da Fonte dos Números
- "100 doses" e "600 doses" estão com fonte maior (`text-base sm:text-lg`)
- Devem ficar no mesmo padrão de tamanho do restante do texto
- Usar o mesmo tamanho das palavras "Recife" e "Região Metropolitana" (que são `<strong>` normais)

#### 4. Coluna Esquerda - Tamanho da Imagem
- Imagem do mapa está com `max-width: 55%`
- Necessário reduzir em 10% (de 55% para 49.5%)

#### 5. Centralização Vertical da Seção
- Todo o conteúdo precisa ser centralizado verticalmente
- Manter espaçamentos e formato atual
- Apenas ajustar posicionamento vertical

### Solução Proposta

#### 1. Coluna Direita - Centralização Vertical
- Adicionar `justify-content: center` na coluna direita
- Garantir que os botões fiquem centralizados verticalmente

#### 2. Coluna Esquerda - Reduzir Espaçamento entre Cards
- Reduzir `margin-bottom` dos cards pela metade (de `0.5rem` para `0.25rem`)

#### 3. Cards - Igualar Tamanho da Fonte
- Remover `text-base sm:text-lg` dos elementos "100 doses" e "600 doses"
- Usar o mesmo tamanho do texto normal do card (herdar do `.laydesk2-audience-card-text`)

#### 4. Coluna Esquerda - Reduzir Tamanho da Imagem
- Reduzir `max-width` de `55%` para `49.5%` (10% de redução)

#### 5. Centralização Vertical da Seção
- Verificar se o container já está centralizado (provavelmente já está com `justify-content: center`)
- Garantir centralização vertical mantendo espaçamentos internos

---

## Estrutura do Componente

### Arquivo: `components/audience.tsx`

A seção contém:
1. **Section principal** (`<section id="...">`) - linha 7
2. **Container interno** (`<div>` com classe `laydesk2-audience-container`) - linha 8
3. **Grid 2 colunas** (lg:grid-cols-2):
   - **Coluna 1 (esquerda):** Título, imagem do mapa, 3 cards - linha 14
   - **Coluna 2 (direita):** 2 botões de navegação - linha 75

### Elementos que serão ajustados:

#### Coluna Esquerda (linha 14):
```tsx
<div className="flex flex-col justify-center items-center gap-1.5 sm:gap-1.5 lg:gap-2 laydesk2-audience-left-column">
  {/* Título, imagem, 3 cards */}
</div>
```

#### Imagem do Mapa (linha 21):
```tsx
<div className="relative w-full max-w-[120px] sm:max-w-sm lg:max-w-[65%] aspect-square mx-auto sm:mx-0 my-3 sm:my-0 laydesk2-audience-map-container">
```
- Classe específica: `laydesk2-audience-map-container`
- CSS atual: `max-width: 55%` (no laydesk3)

#### Cards (linhas 33, 46, 59):
```tsx
<div className="... laydesk2-audience-card">
  <p className="... laydesk2-audience-card-text">
    <strong className="text-coffee-500 font-montserrat">Recife</strong> ...
    <strong className="text-coffee-500 font-bold text-base sm:text-lg font-montserrat">100 doses</strong>
  </p>
</div>
```
- Classe específica: `laydesk2-audience-card`, `laydesk2-audience-card-text`
- "100 doses" e "600 doses" têm `text-base sm:text-lg` que precisa ser removido

#### Coluna Direita (linha 75):
```tsx
<div className="grid grid-cols-2 sm:flex sm:flex-col justify-start items-stretch gap-2 sm:gap-6 h-full laydesk2-audience-right-column">
  {/* 2 botões */}
</div>
```
- Classe específica: `laydesk2-audience-right-column`
- CSS atual: `gap: 0.75rem`, `height: 100%`

---

## Modificações no CSS

### Arquivo: `app/globals.css`

Adicionar/modificar no bloco `@media (min-width: 1024px) and (max-height: 767px)`:

```css
/* ============================================
   SEÇÃO 4 (Regiões Atendidas): Ajustes laydesk3
   ============================================ */

/* 1. Coluna direita: Centralizar verticalmente os botões */
.laydesk2-audience-right-column {
  justify-content: center !important;
  gap: 0.75rem !important; /* Mantido */
  height: 100% !important; /* Mantido */
}

/* 2. Coluna esquerda - Cards: Reduzir espaçamento entre cards pela metade */
.laydesk2-audience-card {
  margin-bottom: 0.25rem !important; /* Reduzir de 0.5rem para 0.25rem (metade) */
  /* padding-top e padding-bottom mantidos */
}

/* 3. Cards - Texto "100 doses" e "600 doses": Igualar tamanho da fonte */
.laydesk2-audience-card-text strong[class*="font-bold"] {
  font-size: inherit !important; /* Herdar tamanho do texto do card */
  font-weight: bold !important; /* Manter negrito */
}

/* Ou, mais específico para os elementos com text-base/text-lg: */
.laydesk2-audience-card-text strong.text-base,
.laydesk2-audience-card-text strong.sm\:text-lg {
  font-size: inherit !important; /* Herdar tamanho do .laydesk2-audience-card-text */
  font-weight: bold !important; /* Manter negrito */
}

/* 4. Coluna esquerda - Imagem: Reduzir tamanho em 10% */
.laydesk2-audience-map-container {
  max-width: 49.5% !important; /* Reduzir de 55% para 49.5% (10% de redução) */
  /* margin-top e margin-bottom mantidos */
}

/* 5. Container: Garantir centralização vertical (já existe, apenas confirmar) */
.laydesk2-audience-container {
  justify-content: center !important; /* Já existe, mantido */
  /* outras propriedades mantidas */
}
```

---

## Detalhamento das Modificações

### 1. Centralização Vertical da Coluna Direita

#### Problema
- Botões "Galeria de experiências" e "Blog" não estão centralizados verticalmente
- O início não tem a mesma distância do topo que o final tem do bottom

#### Solução
- Adicionar `justify-content: center !important` na `.laydesk2-audience-right-column`
- A coluna já tem `height: 100%` e `display: flex` (via `sm:flex` no HTML)

#### Resultado
- Botões centralizados verticalmente
- Distância do topo igual à distância do bottom

### 2. Redução do Espaçamento entre Cards

#### Problema
- Espaçamento muito grande entre os 3 cards
- `margin-bottom: 0.5rem` atual é muito grande

#### Solução
- Reduzir `margin-bottom` de `0.5rem` para `0.25rem` (metade)

#### Resultado
- Cards mais próximos
- Espaçamento reduzido pela metade

### 3. Igualar Tamanho da Fonte dos Números

#### Problema
- "100 doses" e "600 doses" têm `text-base sm:text-lg` (fonte maior)
- Devem ficar no mesmo tamanho do restante do texto
- "Recife" e "Região Metropolitana" são `<strong>` normais e têm o tamanho correto

#### Solução
- Remover o tamanho de fonte maior usando `font-size: inherit !important`
- O texto herdará o tamanho de `.laydesk2-audience-card-text` (0.875rem no laydesk3)
- Manter `font-weight: bold` para manter o destaque visual

#### Resultado
- "100 doses" e "600 doses" com o mesmo tamanho do restante do texto
- Mantém a cor diferenciada e o negrito para destaque
- Consistência visual com "Recife" e "Região Metropolitana"

### 4. Redução do Tamanho da Imagem

#### Problema
- Imagem do mapa está com `max-width: 55%`
- Necessário reduzir em 10%

#### Solução
- Calcular: 55% * 0.9 = 49.5%
- Reduzir `max-width` de `55%` para `49.5%`

#### Resultado
- Imagem 10% menor
- Mais espaço para os cards abaixo

### 5. Centralização Vertical da Seção

#### Problema
- Todo o conteúdo precisa ser centralizado verticalmente
- Manter espaçamentos e formato atual

#### Solução
- Verificar se `.laydesk2-audience-container` já tem `justify-content: center`
- Se já existe, apenas confirmar
- Se não existe, adicionar

#### Resultado
- Conteúdo centralizado verticalmente
- Espaçamentos internos preservados
- Formato mantido

---

## Valores Antes e Depois

### Coluna Direita

| Propriedade | Antes | Depois | Variação |
|-------------|-------|--------|----------|
| `justify-content` | `justify-start` (padrão) | `center` | ✅ Adicionado |

### Cards

| Propriedade | Antes | Depois | Variação |
|-------------|-------|--------|----------|
| `margin-bottom` | `0.5rem` | `0.25rem` | -50% |

### Texto "100 doses" / "600 doses"

| Propriedade | Antes | Depois | Variação |
|-------------|-------|--------|----------|
| `font-size` | `text-base sm:text-lg` (1rem/1.125rem) | `inherit` (0.875rem) | ✅ Igual ao texto normal |

### Imagem do Mapa

| Propriedade | Antes | Depois | Variação |
|-------------|-------|--------|----------|
| `max-width` | `55%` | `49.5%` | -10% |

---

## Estrutura do Media Query

O código deve ser inserido/modificado dentro do bloco existente:

```css
@media (min-width: 1024px) and (max-height: 767px) {
  /* ... código existente do laydesk3 ... */
  
  /* ============================================
     SEÇÃO 4 (Regiões Atendidas): Ajustes anti-overflow (laydesk3)
     ============================================ */
  
  .laydesk2-audience-section {
    /* ... regras existentes ... */
  }
  
  .laydesk2-audience-container {
    /* ... regras existentes ... */
    justify-content: center !important; /* Confirmar/garantir */
  }
  
  /* ... outras regras existentes ... */
  
  /* NOVAS/MODIFICADAS: */
  
  /* 1. Coluna direita: Centralizar verticalmente */
  .laydesk2-audience-right-column {
    justify-content: center !important;
    gap: 0.75rem !important; /* Mantido */
    height: 100% !important; /* Mantido */
  }
  
  /* 2. Cards: Reduzir espaçamento pela metade */
  .laydesk2-audience-card {
    margin-bottom: 0.25rem !important; /* MODIFICAR: de 0.5rem para 0.25rem */
    /* padding mantido */
  }
  
  /* 3. Texto "100 doses" / "600 doses": Igualar tamanho */
  .laydesk2-audience-card-text strong.text-base,
  .laydesk2-audience-card-text strong.sm\:text-lg {
    font-size: inherit !important; /* NOVO: herdar tamanho */
  }
  
  /* 4. Imagem: Reduzir 10% */
  .laydesk2-audience-map-container {
    max-width: 49.5% !important; /* MODIFICAR: de 55% para 49.5% */
    /* margins mantidos */
  }
  
  /* ... resto do código ... */
}
```

---

## Notas Importantes

- **Apenas laydesk3:** Todas as regras dentro do media query específico `@media (min-width: 1024px) and (max-height: 767px)`
- **Tamanho da section preservado:** A altura da section (`calc(100vh - 4rem)`) **NÃO deve ser alterada**
- **Apenas CSS do conteúdo:** Modificações apenas em posicionamento, espaçamentos e tamanhos dos elementos internos
- **Espaçamentos preservados:** Os espaçamentos internos são mantidos, apenas ajustados conforme solicitado
- **Conteúdo preservado:** Nenhum elemento removido ou modificado estruturalmente
- **Funcionalidade intacta:** Botões e links continuam funcionando normalmente

---

## Seletores CSS Utilizados

### Coluna Direita
- **Seletor:** `.laydesk2-audience-right-column`
- **Modificação:** Adicionar `justify-content: center !important`

### Cards
- **Seletor:** `.laydesk2-audience-card`
- **Modificação:** `margin-bottom: 0.25rem !important` (reduzir de 0.5rem)

### Texto "100 doses" / "600 doses"
- **Seletor:** `.laydesk2-audience-card-text strong.text-base, .laydesk2-audience-card-text strong.sm\:text-lg`
- **Modificação:** `font-size: inherit !important` (herdar do texto do card)

### Imagem do Mapa
- **Seletor:** `.laydesk2-audience-map-container`
- **Modificação:** `max-width: 49.5% !important` (reduzir de 55%)

### Container
- **Seletor:** `.laydesk2-audience-container`
- **Modificação:** Confirmar `justify-content: center !important` (já deve existir)

---

## Testes Necessários

### Desktop (laydesk3 - 1280×720)
- ✅ Botões da coluna direita centralizados verticalmente
- ✅ Distância do topo igual à distância do bottom na coluna direita
- ✅ Espaçamento entre cards reduzido pela metade
- ✅ "100 doses" e "600 doses" com mesmo tamanho do restante do texto
- ✅ Imagem do mapa 10% menor (49.5% vs 55%)
- ✅ Todo o conteúdo centralizado verticalmente na seção
- ✅ Espaçamentos internos preservados (apenas ajustados conforme solicitado)
- ✅ Layout não quebra
- ✅ Todos os elementos visíveis e funcionais
- ✅ Botões clicáveis e funcionando

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
- [ ] Entender que os espaçamentos são mantidos, apenas ajustados conforme solicitado

Após implementar, verificar:
- [ ] Coluna direita centralizada verticalmente
- [ ] Espaçamento entre cards reduzido pela metade (0.25rem)
- [ ] "100 doses" e "600 doses" com mesmo tamanho do restante do texto
- [ ] Imagem do mapa 10% menor (49.5%)
- [ ] Conteúdo centralizado verticalmente na seção
- [ ] Nenhuma alteração foi feita em outros layouts (laydesk1, laydesk2, mobile)
- [ ] Funcionalidade dos botões continua intacta
- [ ] Testes visuais realizados em 1280×720

---

## Referências

- Componente: `components/audience.tsx`
- CSS: `app/globals.css` (media query laydesk3 - linha ~873)
- Definição de layouts: `docs/03-LAYOUTS.md`
- Documentações similares:
  - `docs/05-resp-laydesk2sec4.md` (laydesk2 - Regiões Atendidas)
  - `docs/14-overflow-cor.md` (laydesk3 - overflow geral)

