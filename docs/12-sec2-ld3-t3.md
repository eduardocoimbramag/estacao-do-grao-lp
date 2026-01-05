# Seção 2 - O que é a Estação do Grão?: Ajustes de Espaçamento e Centralização Laydesk3 (Rodada 3)

**Tarefa:** Diminuir espaçamento entre colunas, centralizar título/subtítulo e centralizar conteúdo geral  
**Layout:** Laydesk3 (1280x720)  
**Data:** 05/01/2025  
**Status:** 📋 Documentação (aguardando autorização para implementar)

---

## 📋 Índice
1. [Análise da Situação Atual](#análise-da-situação-atual)
2. [Problemas Identificados](#problemas-identificados)
3. [Soluções Propostas](#soluções-propostas)
4. [Implementação CSS](#implementação-css)
5. [Checklist de Implementação](#checklist-de-implementação)

---

## 1. Análise da Situação Atual

### 🎯 Objetivo
Realizar 3 ajustes na seção "O que é a Estação do Grão?" exclusivamente para o **Laydesk3** (1280x720):
1. **Diminuir** o espaçamento entre a coluna esquerda (textos) e a coluna direita (vídeo)
2. Centralizar o título e o subtítulo dentro da coluna esquerda
3. Centralizar todo o conteúdo na página, considerando que a coluna de texto é proporcionalmente maior que o vídeo

### 📊 Contexto
- **Componente:** `components/OpenMenuIntro.tsx`
- **Seção ID:** `#apresentacao`
- **Classes principais:** `laydesk3-sec2-*`
- **Media query:** `@media (min-width: 1024px) and (max-height: 579px)`
- **Grid structure:** `md:grid-cols-[1fr_1px_1fr]` (esquerda, divisor, direita)
- **Referência:** Layout 1080p (original, sem CSS customizado) - baseado no print enviado

### 🔍 Estrutura Atual (Desktop)

#### **JSX (OpenMenuIntro.tsx - Linha 63)**
```jsx
<div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 
                flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 
                md:grid-cols-[1fr_1px_1fr] gap-3 items-center py-4 sm:py-0 
                sm:items-start box-border laydesk3-sec2-container laydesk2-sec2-container">
```

**Gaps padrão (Tailwind):**
- `sm:gap-5` = 1.25rem (20px) em telas pequenas
- `md:gap-6` = 1.5rem (24px) em telas médias
- `lg:gap-8` = 2rem (32px) em telas grandes

**Observação:** No Laydesk3, o gap atual não está sendo sobrescrito, então usa os valores padrão do Tailwind (24px ou 32px dependendo do breakpoint).

#### **Título e Subtítulo (Linhas 78-85)**
```jsx
{/* Título */}
<h2 className="hidden sm:block text-2xl md:text-3xl font-montserrat 
                font-bold tracking-tight text-left whitespace-nowrap m-0 
                laydesk2-sec2-title laydesk3-sec2-title">
  O que é a Estação do Grão?
</h2>

{/* Subtítulo */}
<p className="text-lg md:text-xl text-coffee-500 font-semibold 
              leading-relaxed text-center whitespace-nowrap break-words 
              font-montserrat laydesk2-sec2-subtitle laydesk3-sec2-subtitle">
  O café do seu evento precisa ser inesquecível.
</p>
```

**Observações:**
- Título: `text-left` (alinhado à esquerda)
- Subtítulo: `text-center` (já centralizado)

### 📐 Valores Atuais (Laydesk3)

#### **CSS (globals.css)**
```css
.laydesk3-sec2-container {
  height: 100% !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  display: grid !important;
  align-items: center !important;
  /* ⚠️ PROBLEMA 1: gap não está sendo sobrescrito, usa valores padrão do Tailwind (24px ou 32px) */
}

h2.laydesk3-sec2-title {
  font-size: 2.25rem !important;
  margin-bottom: 0.125rem !important;
  /* ⚠️ PROBLEMA 2: não tem text-align definido, usa text-left do JSX */
}

p.laydesk3-sec2-subtitle {
  margin-top: 0 !important;
  font-size: 1rem !important;
  line-height: 1.25rem !important;
  margin-bottom: 0.5rem !important;
  /* ✅ Já tem text-center no JSX, mas vamos garantir no CSS */
}
```

**Observação sobre o layout 1080p:**
- O layout 1080p é o **original**, sem CSS customizado
- Baseado no print enviado, o espaçamento entre colunas é menor e o conteúdo está mais centralizado
- A coluna de texto é proporcionalmente maior que o vídeo, então a centralização precisa considerar essa proporção

---

## 2. Problemas Identificados

### 🔴 Problema 1: Espaçamento Excessivo entre Colunas

**Localização:**
- **JSX:** Linha 63 de `OpenMenuIntro.tsx`
- **CSS:** `.laydesk3-sec2-container` não sobrescreve o gap

**Problema:**
O espaçamento entre a coluna esquerda (textos) e a coluna direita (vídeo) está **muito grande** no Laydesk3. Baseado no print do layout 1080p (original), o espaçamento deve ser reduzido para aproximar as colunas.

**Causa:**
- O CSS do Laydesk3 não está sobrescrevendo o `gap` do grid
- O Tailwind usa `md:gap-6` (24px) ou `lg:gap-8` (32px), que é maior que o desejado
- No layout 1080p original, o espaçamento é menor, criando um layout mais compacto

**Estrutura do Grid:**
```
[Coluna Esquerda] [Divisor 1px] [Coluna Direita]
     (textos)         (spine)        (vídeo)
```

**Impacto Visual:**
```
Atual (Laydesk3):
[Texto]    |    [Vídeo]  ← Muito espaçado

Desejado (1080p original):
[Texto] | [Vídeo]  ← Mais próximo, conteúdo centralizado
```

**Solução:**
Diminuir o `gap` do grid container no Laydesk3 para um valor menor (ex: `0.75rem` ou `1rem`), similar ao que aparece no layout 1080p original.

---

### 🔴 Problema 2: Título e Subtítulo Não Centralizados

**Localização:**
- **Título:** Linha 78 de `OpenMenuIntro.tsx` com classe `text-left`
- **Subtítulo:** Linha 84 com classe `text-center` (já centralizado no JSX)

**Problema:**
O título está alinhado à esquerda (`text-left`), enquanto o subtítulo já está centralizado. O usuário quer que **ambos** fiquem centralizados dentro da coluna esquerda.

**Causa:**
- O título usa `text-left` no JSX
- O CSS do Laydesk3 não está sobrescrevendo o `text-align`

**Impacto Visual:**
```
Atual:
O que é a Estação do Grão?  ← Alinhado à esquerda
    O café do seu evento precisa ser inesquecível.  ← Centralizado

Desejado:
    O que é a Estação do Grão?  ← Centralizado
    O café do seu evento precisa ser inesquecível.  ← Centralizado
```

**Solução:**
Adicionar `text-align: center !important` no CSS para o título no Laydesk3. O subtítulo já está correto, mas vamos garantir no CSS também.

---

### 🔴 Problema 3: Conteúdo Não Centralizado na Página

**Localização:**
- **Container:** `.laydesk3-sec2-container` (grid container)
- **Proporção:** Coluna de texto é maior que a coluna de vídeo

**Problema:**
O conteúdo geral não está centralizado na página. Como a coluna de texto é proporcionalmente maior que o vídeo, o grid com `1fr 1px 1fr` (colunas iguais) não cria uma centralização visual adequada.

**Causa:**
- O grid usa `md:grid-cols-[1fr_1px_1fr]`, dando espaço igual para ambas as colunas
- A coluna de texto ocupa mais espaço visual que o vídeo
- Não há ajuste de proporção ou centralização considerando essa diferença

**Impacto Visual:**
```
Atual:
[Texto Grande] | [Vídeo Pequeno]  ← Não parece centralizado

Desejado:
    [Texto Grande] | [Vídeo Pequeno]  ← Centralizado visualmente na página
```

**Solução:**
Ajustar o container para centralizar o conteúdo considerando a proporção. Opções:
1. Ajustar `justify-content` do grid para centralizar
2. Ajustar `max-width` do container para limitar a largura total
3. Ajustar proporções do grid (se necessário)

---

## 3. Soluções Propostas

### ✅ Solução 1: Diminuir Gap do Grid Container

**Arquivo:** `app/globals.css`  
**Seletor:** `.laydesk3-sec2-container`

**Mudança:**
```css
/* ANTES */
.laydesk3-sec2-container {
  height: 100% !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  display: grid !important;
  align-items: center !important;
  /* gap não está sendo sobrescrito, usa Tailwind: 24px ou 32px */
}

/* DEPOIS */
.laydesk3-sec2-container {
  height: 100% !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  display: grid !important;
  align-items: center !important;
  gap: 0.75rem !important; /* ✅ Reduzido para 12px (similar ao layout 1080p original) */
}
```

**Valores sugeridos:**
- **Opção 1 (Recomendada):** `gap: 0.75rem !important;` (12px) - baseado no layout 1080p
- **Opção 2:** `gap: 1rem !important;` (16px) - intermediário
- **Opção 3:** `gap: 0.5rem !important;` (8px) - mais compacto

**Impacto:**
- Diminui o espaço entre a coluna esquerda e direita
- Aproxima o conteúdo, deixando o layout mais compacto
- Similar ao espaçamento do layout 1080p original

**⚠️ Observação:**
O gap afeta o espaço entre **todas as colunas** do grid, incluindo o divisor (`1px`). Como o divisor é muito fino, o gap principal será entre a coluna esquerda e direita.

---

### ✅ Solução 2: Centralizar Título e Subtítulo

**Arquivo:** `app/globals.css`  
**Seletores:** `h2.laydesk3-sec2-title` e `p.laydesk3-sec2-subtitle`

**Mudança:**
```css
/* ANTES */
h2.laydesk3-sec2-title {
  font-size: 2.25rem !important;
  margin-bottom: 0.125rem !important;
  /* text-align não está definido, usa text-left do JSX */
}

p.laydesk3-sec2-subtitle {
  margin-top: 0 !important;
  font-size: 1rem !important;
  line-height: 1.25rem !important;
  margin-bottom: 0.5rem !important;
  /* Já tem text-center no JSX, mas vamos garantir */
}

/* DEPOIS */
h2.laydesk3-sec2-title {
  font-size: 2.25rem !important;
  margin-bottom: 0.125rem !important;
  text-align: center !important; /* ✅ Centralizar título */
}

p.laydesk3-sec2-subtitle {
  margin-top: 0 !important;
  font-size: 1rem !important;
  line-height: 1.25rem !important;
  margin-bottom: 0.5rem !important;
  text-align: center !important; /* ✅ Garantir centralização do subtítulo */
}
```

**Impacto:**
- Título fica centralizado na coluna esquerda
- Subtítulo permanece centralizado (garantido no CSS)
- Layout mais simétrico e equilibrado
- Consistência visual com o restante do conteúdo

---

### ✅ Solução 3: Centralizar Conteúdo Geral na Página

**Arquivo:** `app/globals.css`  
**Seletor:** `.laydesk3-sec2-container`

**Estratégia:**
Como a coluna de texto é proporcionalmente maior que o vídeo, precisamos centralizar o conteúdo considerando essa proporção. A melhor abordagem é ajustar o `justify-content` do grid e possivelmente limitar o `max-width` do container.

**Mudança:**
```css
/* ANTES */
.laydesk3-sec2-container {
  height: 100% !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  display: grid !important;
  align-items: center !important;
  /* Não tem justify-content definido */
}

/* DEPOIS */
.laydesk3-sec2-container {
  height: 100% !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  display: grid !important;
  align-items: center !important;
  justify-content: center !important; /* ✅ Centralizar grid na página */
  gap: 0.75rem !important; /* Reduzido para 12px */
  max-width: 90% !important; /* ✅ Limitar largura total para melhor centralização */
  margin-left: auto !important; /* ✅ Centralizar horizontalmente */
  margin-right: auto !important; /* ✅ Centralizar horizontalmente */
}
```

**Impacto:**
- Grid centralizado na página
- Largura total limitada para melhor visualização
- Conteúdo parece mais equilibrado, mesmo com colunas de tamanhos diferentes
- Similar ao layout 1080p original

**⚠️ Observação:**
O `max-width: 90%` pode ser ajustado conforme necessário (ex: `85%`, `95%`). O objetivo é limitar a largura total para que o conteúdo não fique muito espalhado.

---

## 4. Implementação CSS

### 📝 Código Completo a Adicionar/Modificar no `globals.css`

**Localização:** Dentro do media query do Laydesk3  
**Posição:** Modificar `.laydesk3-sec2-container` e adicionar `text-align` nos títulos

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* ... regras existentes ... */
  
  /* ============================================
     SEÇÃO 2: Ajustes de espaçamento e centralização
     Rodada 3 - Laydesk3
     ============================================ */
  
  /* 1. Container: Diminuir gap e centralizar conteúdo geral */
  .laydesk3-sec2-container {
    height: 100% !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    display: grid !important;
    align-items: center !important;
    justify-content: center !important; /* Centralizar grid na página */
    gap: 0.75rem !important; /* Reduzido de padrão Tailwind (24px/32px) para 12px */
    max-width: 90% !important; /* Limitar largura total para melhor centralização */
    margin-left: auto !important; /* Centralizar horizontalmente */
    margin-right: auto !important; /* Centralizar horizontalmente */
  }
  
  /* 2. Título: Centralizar na coluna esquerda */
  h2.laydesk3-sec2-title {
    font-size: 2.25rem !important;
    margin-bottom: 0.125rem !important;
    text-align: center !important; /* Centralizar título */
  }
  
  /* 3. Subtítulo: Garantir centralização na coluna esquerda */
  p.laydesk3-sec2-subtitle {
    margin-top: 0 !important;
    font-size: 1rem !important;
    line-height: 1.25rem !important;
    margin-bottom: 0.5rem !important;
    text-align: center !important; /* Garantir centralização do subtítulo */
  }
}
```

### 📊 Resumo das Mudanças CSS

| Seletor | Propriedade | Antes | Depois | Impacto |
|---------|-------------|-------|--------|---------|
| `.laydesk3-sec2-container` | `gap` | Não sobrescrito (usa Tailwind: `md:gap-6` = 24px ou `lg:gap-8` = 32px) | `0.75rem` (12px) | Diminui espaçamento entre colunas |
| `.laydesk3-sec2-container` | `justify-content` | Não definido | `center` | Centraliza grid na página |
| `.laydesk3-sec2-container` | `max-width` | Não definido | `90%` | Limita largura total |
| `.laydesk3-sec2-container` | `margin-left` | Não definido | `auto` | Centraliza horizontalmente |
| `.laydesk3-sec2-container` | `margin-right` | Não definido | `auto` | Centraliza horizontalmente |
| `h2.laydesk3-sec2-title` | `text-align` | `left` (do JSX) | `center` | Centraliza título |
| `p.laydesk3-sec2-subtitle` | `text-align` | `center` (do JSX) | `center` (garantido) | Garante centralização do subtítulo |

---

## 5. Checklist de Implementação

### 📋 Passo a Passo

#### **Fase 1: CSS (globals.css)**
- [ ] 1. Abrir `app/globals.css`
- [ ] 2. Localizar o media query do Laydesk3 (linha ~1206)
- [ ] 3. Encontrar `.laydesk3-sec2-container` (linha ~1395)
- [ ] 4. **Adicionar** `gap: 0.75rem !important;` na regra `.laydesk3-sec2-container`
- [ ] 5. **Adicionar** `justify-content: center !important;` na regra `.laydesk3-sec2-container`
- [ ] 6. **Adicionar** `max-width: 90% !important;` na regra `.laydesk3-sec2-container`
- [ ] 7. **Adicionar** `margin-left: auto !important;` na regra `.laydesk3-sec2-container`
- [ ] 8. **Adicionar** `margin-right: auto !important;` na regra `.laydesk3-sec2-container`
- [ ] 9. Encontrar `h2.laydesk3-sec2-title` (linha ~1409)
- [ ] 10. **Adicionar** `text-align: center !important;` na regra `h2.laydesk3-sec2-title`
- [ ] 11. Encontrar `p.laydesk3-sec2-subtitle` (linha ~1414)
- [ ] 12. **Adicionar** `text-align: center !important;` na regra `p.laydesk3-sec2-subtitle`
- [ ] 13. Salvar o arquivo

#### **Fase 2: Verificação**
- [ ] 14. Limpar cache do Next.js (remover pasta `.next`)
- [ ] 15. Reiniciar servidor de desenvolvimento (`npm run dev`)
- [ ] 16. Fazer hard refresh no navegador (Ctrl+Shift+R)
- [ ] 17. Testar em 1280x720 (Laydesk3)
- [ ] 18. Verificar espaçamento entre colunas (deve estar menor)
- [ ] 19. Verificar centralização do título (deve estar centralizado)
- [ ] 20. Verificar centralização do subtítulo (deve estar centralizado)
- [ ] 21. Verificar centralização geral do conteúdo na página
- [ ] 22. Comparar visualmente com o print do layout 1080p original

#### **Fase 3: Ajustes Finos (Opcional)**
- [ ] 23. Se o gap `0.75rem` ainda for muito grande, testar `0.5rem` (mais compacto)
- [ ] 24. Se o gap `0.75rem` for muito pequeno, testar `1rem` (intermediário)
- [ ] 25. Se o `max-width: 90%` não estiver ideal, testar `85%` ou `95%`
- [ ] 26. Verificar se não há overflow ou quebras de layout
- [ ] 27. Ajustar conforme feedback visual

#### **Fase 4: Documentação**
- [ ] 28. Atualizar este documento com status "✅ Implementado"
- [ ] 29. Registrar qualquer ajuste adicional necessário

---

## 📊 Resumo das Mudanças

| Item | Arquivo | Linha/Seletor | Mudança | Impacto |
|------|---------|---------------|---------|---------|
| **1. Espaçamento** | `globals.css` | `.laydesk3-sec2-container` | Adicionar `gap: 0.75rem !important;` | Diminui espaço entre colunas |
| **2. Centralização Geral** | `globals.css` | `.laydesk3-sec2-container` | Adicionar `justify-content: center`, `max-width: 90%`, `margin-left/right: auto` | Centraliza conteúdo na página |
| **3.1. Título** | `globals.css` | `h2.laydesk3-sec2-title` | Adicionar `text-align: center !important;` | Centraliza título |
| **3.2. Subtítulo** | `globals.css` | `p.laydesk3-sec2-subtitle` | Adicionar `text-align: center !important;` | Garante centralização |

**Total de arquivos modificados:** 1 (`globals.css`)  
**Total de mudanças:** 7 (7 adições de propriedades CSS)  
**Complexidade:** ⭐⭐ Média (CSS com múltiplas propriedades)  
**Tempo estimado:** ~10 minutos  
**Risco:** Baixo (não altera outros layouts)

---

## 🎯 Resultado Esperado

### Antes:
```
[Texto]    |    [Vídeo]  ← Muito espaçado, não centralizado

O que é a Estação do Grão?  ← Alinhado à esquerda
    O café do seu evento precisa ser inesquecível.  ← Centralizado
```

### Depois:
```
    [Texto] | [Vídeo]  ← Mais próximo, conteúdo centralizado na página

    O que é a Estação do Grão?  ← Centralizado
    O café do seu evento precisa ser inesquecível.  ← Centralizado
```

**Melhorias:**
- ✅ Espaçamento reduzido entre colunas (de 24px/32px para 12px)
- ✅ Título centralizado na coluna esquerda
- ✅ Subtítulo centralizado (garantido)
- ✅ Conteúdo geral centralizado na página
- ✅ Layout mais compacto e equilibrado
- ✅ Similar ao layout 1080p original (baseado no print)

---

## ⚠️ Observações Importantes

1. **Exclusivo Laydesk3:** Todas as mudanças são dentro do media query `@media (min-width: 1024px) and (max-height: 579px)`
2. **Não afeta outros layouts:** Laydesk2, mobile e desktop padrão permanecem inalterados
3. **Gap do grid:** O `gap` afeta o espaço entre todas as colunas, incluindo o divisor de 1px
4. **Valor do gap:** Começar com `0.75rem` (12px). Se necessário, ajustar para `0.5rem` (mais compacto) ou `1rem` (intermediário)
5. **Max-width:** Começar com `90%`. Se necessário, ajustar para `85%` (mais compacto) ou `95%` (mais largo)
6. **Centralização:** O `text-align: center` centraliza o texto dentro da coluna esquerda, não na página toda
7. **Proporção:** A centralização geral considera que a coluna de texto é maior que o vídeo
8. **Hard refresh:** Fundamental após as mudanças para limpar cache do navegador

---

## 🔧 Ajustes Finos (Opcional)

Se após a implementação o resultado ainda não estiver ideal, você pode ajustar manualmente:

### **Diminuir mais o gap:**
```css
.laydesk3-sec2-container {
  gap: 0.5rem !important; /* 8px - mais compacto */
}
```

### **Aumentar um pouco o gap:**
```css
.laydesk3-sec2-container {
  gap: 1rem !important; /* 16px - intermediário */
}
```

### **Ajustar largura máxima:**
```css
.laydesk3-sec2-container {
  max-width: 85% !important; /* Mais compacto */
  /* ou */
  max-width: 95% !important; /* Mais largo */
}
```

**Recomendação:** Começar com `gap: 0.75rem` e `max-width: 90%`, e ajustar conforme necessário.

---

## 📝 Conclusão

As 3 modificações propostas são **simples e diretas**:
1. **CSS:** Diminuir `gap` do container do grid para `0.75rem` (12px)
2. **CSS:** Adicionar `text-align: center` no título e subtítulo
3. **CSS:** Centralizar conteúdo geral com `justify-content: center`, `max-width: 90%` e `margin: auto`

**Resultado:** Layout mais compacto, título e subtítulo centralizados, conteúdo geral centralizado na página, similar ao layout 1080p original.

**Aguardando autorização do usuário para implementar.**

---

**Documento criado em:** 05/01/2025  
**Última atualização:** 05/01/2025  
**Status:** 📋 Aguardando autorização
