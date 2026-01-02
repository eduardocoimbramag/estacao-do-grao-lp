# Modificações: Vídeo da Seção 2 "O que é a Estação do Grão?" (laydesk3)

## Objetivo

Ajustar o vídeo da seção 2 "O que é a Estação do Grão?" para o layout **laydesk3** (1280×720), garantindo que:
- O **tamanho da section permaneça inalterado** (já está perfeito)
- Apenas o **CSS do conteúdo seja modificado**
- Borda branca contorne perfeitamente o vídeo (já implementado na doc 16-modsec2.md)
- Vídeo aumentado em 10% mantendo aspect ratio
- **Não modificar** nenhum dos demais layouts (laydesk1, laydesk2, mobile)

---

## Problema Identificado

### Estado Atual

#### 1. Borda Branca Contornando o Vídeo
- ✅ **Já implementado:** O background marrom escuro foi removido (doc 16-modsec2.md)
- ✅ Borda branca sutil (`border: 1px solid rgba(255, 255, 255, 0.16)`) já está aplicada
- ✅ Bordas arredondadas preservadas
- O vídeo agora está com apenas o contorno branco, sem campos marrons nas laterais

#### 2. Tamanho do Vídeo
- Vídeo atual: `max-height: 62vh` e `max-width: 420px`
- Necessário aumentar em 10% mantendo aspect ratio
- Vídeo deve manter `object-contain` para preservar proporções originais

### Solução Proposta

#### 1. Confirmar Borda Branca (Já Implementado)
- Background transparente já aplicado: `background: transparent !important`
- Borda branca sutil já existe: `border: 1px solid rgba(255, 255, 255, 0.16)`
- Esta parte já foi implementada na documentação 16-modsec2.md

#### 2. Aumentar Tamanho do Vídeo em 10%
- Aumentar `max-height` de `62vh` para `68.2vh` (62 * 1.1 = 68.2)
- Aumentar `max-width` de `420px` para `462px` (420 * 1.1 = 462)
- Manter `object-contain` para preservar aspect ratio
- Manter bordas arredondadas e borda branca

---

## Estrutura do Componente

### Arquivo: `components/OpenMenuIntro.tsx`

#### Coluna Direita - Container do Vídeo (linha 223):
```tsx
<div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-black/40 w-full max-w-full laydesk2-sec2-video-container laydesk3-sec2-video-container">
  <video className="h-full w-full object-contain laydesk2-sec2-video laydesk3-sec2-video" ...>
  </video>
</div>
```
- Classes específicas: `laydesk3-sec2-video-container`, `laydesk3-sec2-video`
- Vídeo com `object-contain` (preserva aspect ratio)
- Background já removido via CSS (doc 16-modsec2.md)

---

## Modificações no CSS

### Arquivo: `app/globals.css`

Modificar no bloco `@media (min-width: 1024px) and (max-height: 767px)`:

```css
/* ============================================
   SEÇÃO 2 (apresentacao): O que é a Estação do Grão? (laydesk3)
   Ajustes do vídeo - aumentar tamanho em 10%
   ============================================ */

/* Container do vídeo: Aumentar tamanho em 10% */
.laydesk3-sec2-video-container {
  background: transparent !important; /* Já implementado - remover campos marrons escuros */
  border: 1px solid rgba(255, 255, 255, 0.16) !important; /* outline branco sutil */
  box-shadow: 0 0 0 1px rgba(239, 240, 224, 0.06) !important; /* "ring" bem sutil */
  border-radius: 1.25rem !important; /* bordas arredondadas */
  overflow: hidden !important;
  max-height: 68.2vh !important; /* Aumentar de 62vh para 68.2vh (10% de aumento) */
  width: 100% !important;
  max-width: 462px !important; /* Aumentar de 420px para 462px (10% de aumento) */
  margin: 0 auto !important;
}

/* Vídeo: Manter object-contain para preservar aspect ratio */
.laydesk3-sec2-video {
  object-fit: contain !important; /* Preservar aspect ratio original */
  width: 100% !important;
  height: 100% !important;
  display: block !important;
  background: transparent !important;
}
```

---

## Detalhamento das Modificações

### 1. Borda Branca Contornando o Vídeo (Já Implementado)

#### Status
- ✅ **Já implementado** na documentação 16-modsec2.md
- Background marrom escuro removido: `background: transparent !important`
- Borda branca sutil mantida: `border: 1px solid rgba(255, 255, 255, 0.16)`
- Bordas arredondadas preservadas: `border-radius: 1.25rem`

#### Resultado
- Borda branca contorna perfeitamente o vídeo
- Sem campos marrons escuros nas laterais
- Vídeo mantém aspect ratio original com `object-contain`

### 2. Aumento do Tamanho do Vídeo em 10%

#### Cálculos
- **Altura atual:** `62vh`
- **Altura nova:** `62vh * 1.1 = 68.2vh`
- **Largura atual:** `420px`
- **Largura nova:** `420px * 1.1 = 462px`

#### Implementação
- Modificar `max-height` de `62vh` para `68.2vh`
- Modificar `max-width` de `420px` para `462px`
- Manter `object-contain` no vídeo para preservar aspect ratio
- Manter todas as outras propriedades (borda, border-radius, etc.)

#### Resultado
- Vídeo 10% maior
- Aspect ratio preservado (sem distorção)
- Borda branca continua contornando o vídeo
- Bordas arredondadas preservadas

---

## Valores Antes e Depois

### Container do Vídeo

| Propriedade | Antes | Depois | Variação |
|-------------|-------|--------|----------|
| `max-height` | `62vh` | `68.2vh` | +10% |
| `max-width` | `420px` | `462px` | +10% |
| `background` | `transparent` | `transparent` | ✅ Mantido |
| `border` | `1px solid rgba(255, 255, 255, 0.16)` | `1px solid rgba(255, 255, 255, 0.16)` | ✅ Mantido |
| `border-radius` | `1.25rem` | `1.25rem` | ✅ Mantido |

### Vídeo

| Propriedade | Antes | Depois | Variação |
|-------------|-------|--------|----------|
| `object-fit` | `contain` | `contain` | ✅ Mantido |
| `width` | `100%` | `100%` | ✅ Mantido |
| `height` | `100%` | `100%` | ✅ Mantido |

---

## Estrutura do Media Query

O código deve ser modificado dentro do bloco existente:

```css
@media (min-width: 1024px) and (max-height: 767px) {
  /* ... código existente do laydesk3 ... */
  
  /* ============================================
     SEÇÃO 2 (apresentacao): O que é a Estação do Grão? (laydesk3)
     ============================================ */
  
  /* ... outras regras existentes ... */
  
  /* Container do vídeo no "padrão 1080p" */
  .laydesk3-sec2-video-container {
    background: transparent !important; /* Já implementado */
    border: 1px solid rgba(255, 255, 255, 0.16) !important;
    box-shadow: 0 0 0 1px rgba(239, 240, 224, 0.06) !important;
    border-radius: 1.25rem !important;
    overflow: hidden !important;
    max-height: 68.2vh !important; /* MODIFICAR: de 62vh para 68.2vh (+10%) */
    width: 100% !important;
    max-width: 462px !important; /* MODIFICAR: de 420px para 462px (+10%) */
    margin: 0 auto !important;
  }
  
  .laydesk3-sec2-video {
    object-fit: contain !important; /* Preservar aspect ratio */
    width: 100% !important;
    height: 100% !important;
    display: block !important;
    background: transparent !important;
  }
  
  /* ... resto do código ... */
}
```

---

## Notas Importantes

- **Apenas laydesk3:** Todas as regras dentro do media query específico `@media (min-width: 1024px) and (max-height: 767px)`
- **Tamanho da section preservado:** A altura da section (`calc(100vh - 4rem)`) **NÃO deve ser alterada**
- **Apenas CSS do conteúdo:** Modificações apenas em tamanhos do vídeo
- **Aspect ratio preservado:** O vídeo mantém `object-contain`, preservando o aspect ratio original (sem distorção, zoom ou esticamento)
- **Borda branca:** Já implementada na doc 16-modsec2.md, apenas confirmar que está funcionando
- **Bordas arredondadas:** Preservadas
- **Background transparente:** Já implementado, mantido

---

## Seletores CSS Utilizados

### Container do Vídeo
- **Seletor:** `.laydesk3-sec2-video-container`
- **Modificações:** 
  - `max-height: 68.2vh` (aumento de 10%)
  - `max-width: 462px` (aumento de 10%)
- **Propriedades mantidas:** 
  - `background: transparent` (já implementado)
  - `border`, `border-radius`, etc.

### Vídeo
- **Seletor:** `.laydesk3-sec2-video`
- **Propriedades:** Mantidas todas (object-contain preserva aspect ratio)

---

## Relação com Outras Documentações

### Documentação 16-modsec2.md
- **Já implementado:** Remoção do background marrom escuro
- **Já implementado:** Borda branca contornando o vídeo
- Esta documentação (17-mod-vid.md) apenas **confirma** essas mudanças e adiciona o aumento de 10%

### Diferença em Relação à Imagem de Referência
- A imagem de referência mostra o vídeo alargado/distorcido
- **NÃO devemos seguir isso:** O vídeo deve manter aspect ratio original
- Usar `object-contain` garante que o vídeo não seja distorcido
- O aumento de 10% será proporcional, mantendo o aspect ratio

---

## Testes Necessários

### Desktop (laydesk3 - 1280×720)
- ✅ Vídeo 10% maior que antes (68.2vh vs 62vh, 462px vs 420px)
- ✅ Borda branca sutil contornando perfeitamente o vídeo
- ✅ Sem campos marrons escuros nas laterais
- ✅ Bordas arredondadas do vídeo preservadas
- ✅ Vídeo mantém aspect ratio original (object-contain - sem distorção)
- ✅ Vídeo não está esticado, distorcido ou com zoom
- ✅ Layout não quebra
- ✅ Todos os elementos visíveis e funcionais
- ✅ Botão de som continua funcionando e posicionado corretamente

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
- [ ] Confirmar que a borda branca já foi implementada (doc 16-modsec2.md)
- [ ] Entender que o vídeo deve manter aspect ratio (object-contain)

Após implementar, verificar:
- [ ] Vídeo aumentado em 10% (68.2vh e 462px)
- [ ] Borda branca contornando perfeitamente o vídeo (já implementada)
- [ ] Vídeo mantém aspect ratio original (sem distorção)
- [ ] Bordas arredondadas preservadas
- [ ] Nenhuma alteração foi feita em outros layouts (laydesk1, laydesk2, mobile)
- [ ] Funcionalidade do vídeo continua intacta
- [ ] Botão de som continua funcionando
- [ ] Testes visuais realizados em 1280×720

---

## Referências

- Componente: `components/OpenMenuIntro.tsx`
- CSS: `app/globals.css` (media query laydesk3 - linha ~873)
- Definição de layouts: `docs/03-LAYOUTS.md`
- Documentação relacionada: `docs/16-modsec2.md` (remoção do background marrom e borda branca)
- Documentações similares:
  - `docs/13-modif-sec2.md` (laydesk2 - aumento de vídeo)

