# Tarefa 07: Seção 3 "Nossos Serviços" - Adaptação Laydesk3 (T1)

**Status**: 📋 Documentação (aguardando autorização para implementar)  
**Data**: 2025-01-05  
**Layout**: Laydesk3 (1280×720, max-height: 579px)  
**Seção**: "Nossos Serviços" (Section 3)

---

## 📊 Contexto

O usuário solicitou que as configurações da seção "Nossos Serviços" do **Laydesk2** sejam copiadas para o **Laydesk3** como ponto de partida, permitindo pequenos ajustes posteriores se necessário.

### Laydesk3 (1280×720)
- **Media Query**: `@media (min-width: 1024px) and (max-height: 579px)`
- **Altura disponível**: `calc(100vh - 4rem)` = ~551px - 64px = ~487px
- **Objetivo**: Todas as seções devem caber em "uma tela - menu" sem overflow
- **Header**: Fixed (4rem = 64px)

---

## 🎯 Objetivo

Copiar **TODAS** as configurações CSS da seção "Nossos Serviços" do Laydesk2 para o Laydesk3, adaptando apenas os nomes das classes (de `laydesk2-servicos-*` para `laydesk3-servicos-*`), mantendo inicialmente os mesmos valores de espaçamento, tamanhos e proporções.

---

## 📍 Localização Atual

### Laydesk2 (Origem)
- **Arquivo**: `app/globals.css`
- **Linhas**: 403-552 (aproximadamente 150 linhas)
- **Media Query**: `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)`

### Laydesk3 (Destino)
- **Arquivo**: `app/globals.css`
- **Media Query**: `@media (min-width: 1024px) and (max-height: 579px)` (linha 1206)
- **Inserir após**: Seção 2 (OpenMenuIntro) do Laydesk3 (aproximadamente linha 1500+)
- **Status atual**: Não existe nenhuma configuração CSS para esta seção no Laydesk3

---

## 🔧 Configurações a Copiar

### Estrutura Atual do Laydesk2

A seção "Nossos Serviços" no Laydesk2 possui as seguintes configurações CSS otimizadas:

#### 1. **Section Container** (`.laydesk2-servicos-section`)
- Altura: `calc(100vh - 4rem)`
- Overflow: `hidden` (forçado)
- Padding vertical: `0`

#### 2. **Inner Container** (`.laydesk2-servicos-container`)
- Padding-top: `0.75rem` (reduzido de 1.5rem)
- Padding-bottom: `0.5rem` (reduzido de 0.75rem)
- Padding-left/right: `1.5rem`
- Display: `flex` com `flex-direction: column`
- Justify-content: `center`

#### 3. **Header** (`.laydesk2-servicos-header`)
- Margin-bottom: `1rem` (reduzido de 1.75rem)
- Espaçamento entre elementos: `0` (colados)

#### 4. **Title** (`.laydesk2-servicos-title`)
- Font-size: `1.875rem` (text-3xl)
- Line-height: `2.25rem`

#### 5. **Description** (`.laydesk2-servicos-description`)
- Font-size: `0.9375rem`
- Line-height: `1.375rem`
- Margin-top: `-0.25rem` (reduz distância com título)

#### 6. **Carousel Container** (`.laydesk2-servicos-carousel-container`)
- Padding-top/bottom: `0.75rem` (para acomodar scale-105)
- Flex: `1`
- Overflow: `hidden`
- Display: `flex` com `align-items: center`

#### 7. **Cards** (`.laydesk2-servicos-card`)
- Padding-left/right: `0.75rem`
- Min-width: `33.333%` (3 cards visíveis)
- Max-width: `33.333%`

#### 8. **Image Container** (`.laydesk2-servicos-image-container`)
- Padding: `0.5rem`

#### 9. **Image** (`.laydesk2-servicos-image`)
- Height: `7.5rem` (120px reduzido para 90px)

#### 10. **Card Content** (`.laydesk2-servicos-card-content`)
- Padding-left/right: `0.5rem`
- Padding-bottom: `0.625rem`
- Espaçamento entre elementos: `0.25rem`

#### 11. **Card Title** (`.laydesk2-servicos-card-title`)
- Font-size: `1rem` (reduzido de 1.125rem)
- Line-height: `1.5rem`

#### 12. **Card Subtitle** (`.laydesk2-servicos-card-subtitle`)
- Font-size: `0.75rem` (reduzido de 0.8125rem)
- Line-height: `1rem`

#### 13. **Card Description** (`.laydesk2-servicos-card-description`)
- Font-size: `0.75rem`
- Line-height: `1.125rem`

#### 14. **CTA Button** (`.laydesk2-servicos-card-cta`)
- Padding-top: `0.25rem`
- Button padding: `0.5rem 1.25rem`
- Button font-size: `0.8125rem`

#### 15. **Navigation Buttons** (`.laydesk2-servicos-nav`)
- Margin-top: `0.5rem`
- Button padding: `0.5rem`
- SVG size: `16px`

#### 16. **Mobile Indicators** (`.laydesk2-servicos-indicators`)
- Margin-top: `1.25rem`

---

## 📝 Plano de Implementação

### Passo 1: Copiar Estrutura Completa
Copiar todas as 150 linhas de CSS do Laydesk2 (linhas 403-552) para dentro do media query do Laydesk3.

### Passo 2: Renomear Seletores
Realizar substituição global de:
- `laydesk2-servicos-` → `laydesk3-servicos-`

**Total de substituições**: ~35 seletores

### Passo 3: Adicionar Comentário de Seção
Adicionar header identificador:

```css
/* ============================================
   SEÇÃO "NOSSOS SERVIÇOS" - Configurações laydesk3
   (Baseado nas otimizações do laydesk2)
   ============================================ */
```

### Passo 4: Inserir no Local Correto
- **Arquivo**: `app/globals.css`
- **Dentro de**: `@media (min-width: 1024px) and (max-height: 579px)`
- **Após**: Configurações da Seção 2 (OpenMenuIntro) do Laydesk3
- **Antes**: Final do media query Laydesk3

### Passo 5: Adicionar Comentários de Ajuste
Para facilitar ajustes futuros, manter os comentários originais que indicam:
- Valores reduzidos (ex: "REDUZIDO de X")
- Valores aumentados (ex: "AUMENTADO de X")
- Propósitos específicos (ex: "para acomodar scale-105")

---

## 🎨 Código a Implementar

### Estrutura Completa (Exemplo dos Primeiros Seletores)

```css
/* ============================================
   SEÇÃO "NOSSOS SERVIÇOS" - Configurações laydesk3
   (Baseado nas otimizações do laydesk2)
   ============================================ */
/* +++INICIO SECAO SERVICOS+++ */

/* 1. Section: Altura viewport menos menu (h-16 = 4rem) + Anti-overflow */
.laydesk3-servicos-section {
  height: calc(100vh - 4rem) !important;
  min-height: calc(100vh - 4rem) !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: hidden !important;
  overflow-x: hidden !important;
}

/* 2. Container interno: Padding otimizado + Flex shrink habilitado */
.laydesk3-servicos-container {
  padding-top: 0.75rem !important;
  padding-bottom: 0.5rem !important;
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  min-height: 0 !important;
  overflow: hidden !important;
}

/* 3. Header: Espaçamento otimizado (reduzido) */
.laydesk3-servicos-header {
  margin-bottom: 1rem !important;
}

/* ... (continua com todos os 35 seletores) */
```

---

## ✅ Resultado Esperado

Após a implementação:

1. **Cópia Fiel**: Todas as configurações do Laydesk2 estarão disponíveis no Laydesk3
2. **Seletores Únicos**: Classes `laydesk3-servicos-*` independentes do Laydesk2
3. **Mesmos Valores**: Inicialmente, todos os espaçamentos, tamanhos e proporções serão idênticos
4. **Pronto para Ajustes**: Se necessário, o usuário poderá solicitar ajustes específicos posteriormente

### O que NÃO será modificado
- ❌ Nenhum outro layout (Laydesk1, Laydesk2, Tablet, Mobile)
- ❌ Nenhum arquivo JSX/TSX (apenas CSS)
- ❌ Nenhuma estrutura HTML ou classes no componente

### O que será modificado
- ✅ Apenas `app/globals.css`
- ✅ Apenas dentro do media query Laydesk3
- ✅ Apenas criação de novos seletores (não modifica existentes)

---

## 📦 Arquivos Afetados

### Modificados
- `app/globals.css` (+150 linhas, aproximadamente)

### Não Modificados
- `components/Services.tsx` (ou equivalente)
- Todos os outros layouts

---

## 🎯 Próximos Passos (Após Implementação)

1. **Verificar Visualmente**: Acessar http://localhost:3000 em 1280×720
2. **Identificar Necessidades**: Avaliar se algum ajuste é necessário
3. **Ajustes Finos**: Se necessário, criar nova task para ajustes específicos

---

## 🚨 Observações Importantes

1. **Classes no JSX**: Esta implementação assume que o componente "Nossos Serviços" **JÁ POSSUI** as classes CSS mencionadas (ex: `laydesk3-servicos-section`, `laydesk3-servicos-container`, etc.). Se o componente ainda não tiver essas classes, será necessário adicioná-las.

2. **Verificação de Classes**: Antes de implementar, é recomendável verificar se o componente já está preparado com as classes do Laydesk3, ou se ainda usa apenas as classes genéricas/Laydesk2.

3. **Ajustes Posteriores**: Como o Laydesk3 tem **altura muito limitada** (487px disponíveis), pode ser necessário reduzir ainda mais alguns espaçamentos após a implementação inicial.

---

**Aguardando autorização para implementar! 🚀**

