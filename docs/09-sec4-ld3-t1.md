# Tarefa 09: Seção 4 "Regiões Atendidas" - Migração Laydesk3 (T1)

**Status**: 📋 Documentação (aguardando autorização para implementar)  
**Data**: 2025-01-05  
**Layout**: Laydesk3 (1280×720, max-height: 579px)  
**Seção**: "Regiões Atendidas" (Section 4 / Audience)

---

## 📊 Contexto

O usuário solicitou que as configurações da seção "Regiões Atendidas" do **Laydesk2** sejam migradas para o **Laydesk3** como ponto de partida, permitindo pequenos ajustes posteriores se necessário.

### Laydesk3 (1280×720)
- **Media Query**: `@media (min-width: 1024px) and (max-height: 579px)`
- **Altura disponível**: `calc(100vh - 4rem)` = ~551px - 64px = ~487px
- **Objetivo**: Todas as seções devem caber em "uma tela - menu" sem overflow
- **Header**: Fixed (4rem = 64px)

---

## 🎯 Objetivo

Copiar **TODAS** as configurações CSS da seção "Regiões Atendidas" do Laydesk2 para o Laydesk3, adaptando apenas os nomes das classes (de `laydesk2-audience-*` para `laydesk3-audience-*`), mantendo inicialmente os mesmos valores de espaçamento, tamanhos e proporções.

---

## 📍 Localização Atual

### Laydesk2 (Origem)
- **Arquivo**: `app/globals.css`
- **Linhas**: 730-908 (aproximadamente 178 linhas)
- **Media Query**: `@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px)`

### Laydesk3 (Destino)
- **Arquivo**: `app/globals.css`
- **Media Query**: `@media (min-width: 1024px) and (max-height: 579px)` (linha 1206)
- **Inserir após**: Seção 3 (Nossos Serviços) do Laydesk3 (aproximadamente linha 1647+)
- **Status atual**: Não existe nenhuma configuração CSS para esta seção no Laydesk3

---

## 🔧 Configurações a Copiar

### Estrutura Atual do Laydesk2

A seção "Regiões Atendidas" no Laydesk2 possui as seguintes configurações CSS otimizadas:

#### 1. **Section Container** (`.laydesk2-audience-section`)
- Altura: `calc(100vh - 4rem)`
- Max-height: `calc(100vh - 4rem)`
- Overflow: `hidden` (forçado)
- Padding vertical: `0`

#### 2. **Inner Container** (`.laydesk2-audience-container`)
- Padding-top/bottom: `0.5rem`
- Padding-left/right: `1rem`
- Display: `flex` com `flex-direction: column`
- Justify-content: `center`
- Overflow: `hidden`

#### 3. **Grid** (`.laydesk2-audience-grid`)
- Gap: `0.75rem`
- Height: `100%`
- Align-items: `center`
- Padding vertical: `0`

#### 4. **Left Column** (`.laydesk2-audience-left-column`)
- Gap: `0.25rem`
- Height: `100%`
- Justify-content: `center`

#### 5. **Title** (`.laydesk2-audience-title`)
- Font-size: `1.375rem`
- Line-height: `1.5rem`
- Margin-bottom: `0.125rem`
- Margin-top: `0`

#### 6. **Map Container** (`.laydesk2-audience-map-container`)
- Max-width: `45%`
- Margin-top/bottom: `0.125rem`
- Flex-shrink: `1`

#### 7. **Cards** (`.laydesk2-audience-card`)
- Padding-left/right: `0.625rem`
- Padding-top/bottom: `0.375rem`
- Margin-bottom: `0.125rem`
- Último card: `margin-bottom: 0`

#### 8. **Card Icons** (`.laydesk2-audience-card svg`)
- Width/height: `0.875rem`
- Flex-shrink: `0`

#### 9. **Card Text** (`.laydesk2-audience-card-text`)
- Font-size: `0.8125rem`
- Line-height: `1.0625rem`
- Strong elements: inherit font-size

#### 10. **Card Link** (`.laydesk2-audience-card-link`)
- Padding: `0.1875rem 0.375rem`
- Font-size: `0.75rem`

#### 11. **Right Column** (`.laydesk2-audience-right-column`)
- Gap: `0.5rem`
- Height: `100%`
- Display: `flex` com `flex-direction: column`
- Justify-content: `center`

#### 12. **Navigation Buttons** (`.laydesk2-audience-nav-button`)
- Padding-top/bottom: `2rem` (para alinhamento vertical)
- Max-height: `13rem`
- Flex: `1 1 auto`
- Overflow: `hidden`

#### 13. **Button Titles** (`.laydesk2-audience-nav-button-title`)
- Font-size: `2rem`
- Line-height: `2.5rem`
- Padding: `0 0.5rem`

#### 14. **Button Container** (`.laydesk2-audience-nav-button > div:last-child`)
- Height: `100%`
- Display: `flex`
- Align-items: `center`
- Justify-content: `center`

#### 15. **Button Images** (`.laydesk2-audience-nav-button img`)
- Object-fit: `cover`

---

## 📝 Plano de Implementação

### Passo 1: Copiar Estrutura Completa
Copiar todas as ~178 linhas de CSS do Laydesk2 (linhas 730-908) para dentro do media query do Laydesk3.

### Passo 2: Renomear Seletores
Realizar substituição global de:
- `laydesk2-audience-` → `laydesk3-audience-`

**Total de substituições**: ~25 seletores

### Passo 3: Adicionar Comentário de Seção
Adicionar header identificador:

```css
/* ============================================
   SEÇÃO "REGIÕES ATENDIDAS" - Configurações laydesk3
   (Baseado nas otimizações do laydesk2)
   ============================================ */
```

### Passo 4: Inserir no Local Correto
- **Arquivo**: `app/globals.css`
- **Dentro de**: `@media (min-width: 1024px) and (max-height: 579px)`
- **Após**: Configurações da Seção 3 (Nossos Serviços) do Laydesk3
- **Antes**: Final do media query Laydesk3

### Passo 5: Manter Comentários Originais
Preservar todos os comentários que indicam:
- Valores reduzidos/aumentados
- Impactos das modificações
- Propósitos específicos

---

## 🎨 Código a Implementar

### Estrutura Completa (Exemplo dos Primeiros Seletores)

```css
/* ============================================
   SEÇÃO "REGIÕES ATENDIDAS" - Configurações laydesk3
   (Baseado nas otimizações do laydesk2)
   ============================================ */
/* +++INICIO SECAO REGIOES ATENDIDAS+++ */

/* 1. Section: Altura viewport menos menu + Anti-overflow (LAYDESK3)
   Impacto: garante que a seção não ultrapasse os limites da tela */
.laydesk3-audience-section {
  height: calc(100vh - 4rem) !important;
  min-height: calc(100vh - 4rem) !important;
  max-height: calc(100vh - 4rem) !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: hidden !important;
  overflow-x: hidden !important;
}

/* 2. Container interno: Padding reduzido + Flex shrink habilitado (LAYDESK3)
   Impacto: economiza espaço vertical e horizontal */
.laydesk3-audience-container {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  min-height: 0 !important;
  overflow: hidden !important;
}

/* 3. Grid: Gap reduzido + Altura controlada (LAYDESK3)
   Impacto: aproxima colunas esquerda e direita, economizando espaço */
.laydesk3-audience-grid {
  gap: 0.75rem !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  height: 100% !important;
  align-items: center !important;
  min-height: 0 !important;
}

/* ... (continua com todos os ~25 seletores) */
```

---

## ✅ Resultado Esperado

Após a implementação:

1. **Cópia Fiel**: Todas as configurações do Laydesk2 estarão disponíveis no Laydesk3
2. **Seletores Únicos**: Classes `laydesk3-audience-*` independentes do Laydesk2
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
- `app/globals.css` (+178 linhas, aproximadamente)

### Componentes que Precisam de Classes
Após implementar o CSS, será necessário adicionar as classes `laydesk3-audience-*` no componente:
- `components/audience.tsx` (provável)

---

## 🎯 Próximos Passos (Após Implementação)

1. **Adicionar Classes no JSX**: Incluir classes `laydesk3-audience-*` no componente `audience.tsx`
2. **Verificar Visualmente**: Acessar http://localhost:3000 em 1280×720
3. **Identificar Necessidades**: Avaliar se algum ajuste é necessário
4. **Ajustes Finos**: Se necessário, criar nova task para ajustes específicos

---

## 🚨 Observações Importantes

1. **Classes no JSX**: Esta implementação assume que o componente "Regiões Atendidas" **precisará receber** as classes CSS mencionadas (ex: `laydesk3-audience-section`, `laydesk3-audience-container`, etc.). Após implementar o CSS, será necessário adicionar essas classes no componente.

2. **Estrutura do Layout**:
   - **Coluna Esquerda**: Título + Mapa + 3 Cards
   - **Coluna Direita**: 2 Botões grandes de navegação ("Galeria de experiências" e "Blog")

3. **Valores Específicos**: Os valores de padding dos botões (`2rem`) e font-size dos títulos (`2rem`) foram otimizados no Laydesk2 para alinhamento vertical perfeito. Esses valores serão mantidos inicialmente.

4. **Ajustes Posteriores**: Como o Laydesk3 tem **altura muito limitada** (487px disponíveis), pode ser necessário reduzir ainda mais alguns espaçamentos após a implementação inicial.

---

**Aguardando autorização para implementar! 🚀**

