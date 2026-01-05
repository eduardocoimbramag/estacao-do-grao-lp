# Tarefa 08: Seção 3 "Nossos Serviços" - Ajustes Anti-Overflow Laydesk3 (T2)

**Status**: 📋 Documentação (aguardando autorização para implementar)  
**Data**: 2025-01-05  
**Layout**: Laydesk3 (1280×720, max-height: 579px)  
**Seção**: "Nossos Serviços" (Section 3)

---

## 📊 Contexto

Após copiar as configurações do Laydesk2 para o Laydesk3, a seção "Nossos Serviços" apresenta **overflow vertical**, pois há muito conteúdo para a altura disponível.

### Análise do Problema

**Altura disponível**: `calc(100vh - 4rem)` = ~551px - 64px = **~487px**

**Estrutura atual da seção:**
1. **Header** (título + subtítulo): ~100px
2. **Carrossel** (3 cards visíveis): ~350px
   - Imagem: 7.5rem (120px) + padding
   - Título do card
   - Subtítulo do card
   - Descrição longa do card
   - Botão CTA
3. **Navegação** (botões/indicadores): ~40px

**Total estimado**: ~490px (muito próximo do limite, causando overflow)

---

## 🎯 Objetivo

Reduzir o conteúdo vertical da seção para que **tudo caiba** dentro de `calc(100vh - 4rem)` sem overflow, mantendo a funcionalidade e legibilidade.

---

## 💡 Alternativas Propostas

### **Alternativa 1: Redução Agressiva de Espaçamentos** ⭐ (Recomendada)

Reduzir drasticamente todos os paddings, margins e gaps para compactar o conteúdo.

#### Modificações:
- **Header**:
  - `padding-bottom: 0.5rem` → `0.25rem`
  - `margin-bottom: 1rem` → `0.5rem`
  - Título: `font-size: 1.875rem` → `1.5rem`
  - Descrição: `margin-top: -0.25rem` → `-0.375rem` (colar ainda mais)

- **Carrossel Container**:
  - `padding-top/bottom: 0.75rem` → `0.5rem`

- **Cards**:
  - **Imagem**: `height: 7.5rem` → `5.5rem` (120px → 88px) ⚠️ Redução de ~27%
  - **Image Container**: `padding: 0.5rem` → `0.25rem`
  - **Card Content**: `padding: 0.5rem` → `0.375rem`
  - Espaçamento entre elementos: `0.25rem` → `0.125rem`

- **Fontes dos Cards**:
  - Título: `font-size: 1rem` → `0.875rem`
  - Subtítulo: `font-size: 0.75rem` → `0.6875rem`
  - Descrição: `font-size: 0.75rem` → `0.6875rem`, `line-height: 1.125rem` → `1rem`

- **CTA Button**:
  - `padding-top: 0.25rem` → `0.125rem`
  - Botão: `padding: 0.5rem 1.25rem` → `0.375rem 1rem`

- **Navegação**:
  - `margin-top: 0.5rem` → `0.25rem`

**Ganho estimado**: ~80-100px

**Prós**: 
- ✅ Mantém toda a estrutura atual
- ✅ 3 cards visíveis
- ✅ Todo o conteúdo preservado

**Contras**: 
- ⚠️ Visual muito compacto
- ⚠️ Imagens menores
- ⚠️ Fontes menores (pode afetar legibilidade)

---

### **Alternativa 2: Mostrar Apenas 2 Cards (+ Espaçoso)**

Reduzir a largura dos cards para mostrar apenas 2 por vez, permitindo cards maiores verticalmente.

#### Modificações:
- **Cards**:
  - `min-width: 33.333%` → `50%`
  - `max-width: 33.333%` → `50%`

- **Espaçamentos** (redução moderada):
  - Header `margin-bottom: 1rem` → `0.75rem`
  - Imagem: `height: 7.5rem` → `6.5rem` (mantém razoável)
  - Fontes: redução leve (~10%)

**Ganho estimado**: Cards maiores horizontalmente, permite mais altura para conteúdo

**Prós**: 
- ✅ Visual mais espaçoso
- ✅ Imagens maiores
- ✅ Melhor legibilidade

**Contras**: 
- ❌ Apenas 2 cards visíveis (precisa navegar mais)
- ❌ Muda comportamento do carrossel

---

### **Alternativa 3: Remover Subtítulos dos Cards**

Eliminar os subtítulos (ex: "Atendimento que encanta") para ganhar espaço vertical.

#### Modificações:
- **Remover**: `.laydesk3-servicos-card-subtitle` (não aplicar regras CSS)
- **Ou**: Ocultar via CSS: `display: none !important`

**Ganho estimado**: ~25-30px por card

**Prós**: 
- ✅ Ganho significativo de espaço
- ✅ Visual mais limpo

**Contras**: 
- ❌ Perde informação do card
- ❌ Pode afetar hierarquia visual

---

### **Alternativa 4: Truncar Descrições dos Cards**

Limitar a descrição a 2-3 linhas com `line-clamp` ou reduzir drasticamente o texto.

#### Modificações:
```css
.laydesk3-servicos-card-description {
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important; /* Máximo 2 linhas */
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}
```

**Ganho estimado**: ~30-40px por card (dependendo do texto atual)

**Prós**: 
- ✅ Mantém estrutura
- ✅ Visual limpo

**Contras**: 
- ⚠️ Descrições cortadas (texto incompleto)
- ⚠️ Pode prejudicar compreensão do serviço

---

### **Alternativa 5: Remover Scale-105 do Card Ativo**

Desabilitar o efeito `scale-105` do card centralizado, permitindo reduzir o padding do carrossel.

#### Modificações:
```css
.laydesk3-servicos-carousel-container {
  padding-top: 0.25rem !important; /* REDUZIDO de 0.75rem */
  padding-bottom: 0.25rem !important; /* REDUZIDO de 0.75rem */
}

/* Desabilitar scale no card ativo (laydesk3) */
.laydesk3-servicos-section .laydesk3-servicos-carousel-container article > div {
  transform: scale(1.0) !important; /* Remove scale-105 */
}
```

**Ganho estimado**: ~30px

**Prós**: 
- ✅ Ganho de espaço vertical
- ✅ Evita cortes no topo/fundo dos cards

**Contras**: 
- ⚠️ Perde feedback visual do card ativo
- ⚠️ Menos destaque

---

### **Alternativa 6: Combinação Estratégica** ⭐⭐ (Mais Equilibrada)

Combinar múltiplas técnicas para ganho máximo com menor impacto visual:

1. **Redução moderada de espaçamentos** (não agressiva):
   - Header: `margin-bottom: 1rem` → `0.625rem`
   - Carrossel: `padding-top/bottom: 0.75rem` → `0.5rem`
   - Image container: `padding: 0.5rem` → `0.375rem`
   - Card content: espaçamento `0.25rem` → `0.1875rem`

2. **Imagens menores**:
   - `height: 7.5rem` → `6rem` (120px → 96px) - Redução de ~20%

3. **Truncar descrições** a 2 linhas (line-clamp)

4. **Remover scale-105** do card ativo

5. **Fontes sutilmente menores**:
   - Título seção: `1.875rem` → `1.625rem`
   - Descrição seção: `0.9375rem` → `0.875rem`
   - Título card: `1rem` → `0.9375rem`

**Ganho estimado**: ~100-120px

**Prós**: 
- ✅ Equilibra espaço e legibilidade
- ✅ 3 cards visíveis
- ✅ Visual ainda profissional

**Contras**: 
- ⚠️ Múltiplas mudanças (mais complexo)

---

### **Alternativa 7: Reduzir Altura das Imagens + Line-Clamp** (Simples e Eficaz)

Focar em duas mudanças principais:

1. **Imagens bem menores**:
   - `height: 7.5rem` → `5rem` (120px → 80px) - Redução de ~33%

2. **Truncar descrições** a 2 linhas

**Ganho estimado**: ~70-80px

**Prós**: 
- ✅ Poucas mudanças
- ✅ Fácil de implementar
- ✅ Ganho significativo

**Contras**: 
- ⚠️ Imagens bastante menores
- ⚠️ Descrições incompletas

---

## 📊 Comparação das Alternativas

| Alternativa | Ganho de Espaço | Complexidade | Impacto Visual | Mantém 3 Cards | Recomendação |
|-------------|-----------------|--------------|----------------|----------------|--------------|
| **1. Redução Agressiva** | ⭐⭐⭐⭐ | Média | Alto (compacto) | ✅ | ⭐⭐⭐ |
| **2. Apenas 2 Cards** | ⭐⭐⭐ | Baixa | Moderado | ❌ | ⭐⭐ |
| **3. Remover Subtítulos** | ⭐⭐ | Baixa | Baixo | ✅ | ⭐⭐⭐ |
| **4. Truncar Descrições** | ⭐⭐⭐ | Baixa | Moderado | ✅ | ⭐⭐⭐⭐ |
| **5. Remover Scale** | ⭐⭐ | Baixa | Baixo | ✅ | ⭐⭐⭐ |
| **6. Combinação** | ⭐⭐⭐⭐⭐ | Alta | Moderado | ✅ | ⭐⭐⭐⭐⭐ |
| **7. Imagens + Line-Clamp** | ⭐⭐⭐⭐ | Baixa | Moderado | ✅ | ⭐⭐⭐⭐ |

---

## 🎨 Exemplo de Código (Alternativa 6 - Combinação)

### Modificações no `app/globals.css` (dentro do media query Laydesk3)

```css
/* ============================================
   SEÇÃO "NOSSOS SERVIÇOS" - Ajustes anti-overflow laydesk3
   ============================================ */

/* 3. Header: Espaçamento reduzido */
.laydesk3-servicos-header {
  margin-bottom: 0.625rem !important; /* REDUZIDO de 1rem */
}

/* 4. Título: Tamanho reduzido */
.laydesk3-servicos-title {
  font-size: 1.625rem !important; /* REDUZIDO de 1.875rem */
  line-height: 2rem !important;
}

/* 5. Parágrafo: Fonte menor */
.laydesk3-servicos-description {
  font-size: 0.875rem !important; /* REDUZIDO de 0.9375rem */
  line-height: 1.25rem !important;
  margin-top: -0.375rem !important; /* AUMENTADO para colar mais */
}

/* 6. Container do carrossel: Padding reduzido */
.laydesk3-servicos-carousel-container {
  padding-top: 0.5rem !important; /* REDUZIDO de 0.75rem */
  padding-bottom: 0.5rem !important; /* REDUZIDO de 0.75rem */
}

/* 8. Container da imagem: Padding reduzido */
.laydesk3-servicos-image-container {
  padding: 0.375rem !important; /* REDUZIDO de 0.5rem */
}

/* Imagem: Altura reduzida */
.laydesk3-servicos-image {
  height: 6rem !important; /* REDUZIDO de 7.5rem (120px → 96px) */
}

/* 9. Container de texto: Padding reduzido */
.laydesk3-servicos-card-content {
  padding-left: 0.375rem !important; /* REDUZIDO de 0.5rem */
  padding-right: 0.375rem !important;
  padding-bottom: 0.5rem !important;
}

.laydesk3-servicos-card-content > * + * {
  margin-top: 0.1875rem !important; /* REDUZIDO de 0.25rem */
}

/* Título do card: Fonte reduzida */
.laydesk3-servicos-card-title {
  font-size: 0.9375rem !important; /* REDUZIDO de 1rem */
  line-height: 1.375rem !important;
}

/* Descrição do card: TRUNCAR com line-clamp */
.laydesk3-servicos-card-description {
  font-size: 0.6875rem !important; /* REDUZIDO de 0.75rem */
  line-height: 1rem !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important; /* Máximo 2 linhas */
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
}

/* CTA Button: Padding reduzido */
.laydesk3-servicos-card-cta {
  padding-top: 0.125rem !important; /* REDUZIDO de 0.25rem */
}

.laydesk3-servicos-card-cta a {
  padding: 0.375rem 1rem !important; /* REDUZIDO de 0.5rem 1.25rem */
  font-size: 0.75rem !important;
}

/* 10. Botões de navegação: Espaçamento reduzido */
.laydesk3-servicos-nav {
  margin-top: 0.25rem !important; /* REDUZIDO de 0.5rem */
}

/* Desabilitar scale-105 do card ativo */
.laydesk3-servicos-section .laydesk3-servicos-carousel-container article > div {
  transform: scale(1.0) !important; /* Remove scale-105 para economizar espaço */
}

/* Ajustar opacity dos cards não-ativos para compensar falta de scale */
.laydesk3-servicos-section .laydesk3-servicos-carousel-container article > div {
  opacity: 0.7 !important;
}

.laydesk3-servicos-section .laydesk3-servicos-carousel-container article:has(.scale-105) > div,
.laydesk3-servicos-section .laydesk3-servicos-carousel-container article:hover > div {
  opacity: 1 !important;
}
```

---

## ✅ Resultado Esperado

Após implementar a alternativa escolhida:

1. **Sem Overflow**: Todo o conteúdo cabe dentro de `calc(100vh - 4rem)`
2. **3 Cards Visíveis**: Mantém a experiência do carrossel (se aplicável)
3. **Legibilidade Preservada**: Texto ainda legível apesar das reduções
4. **Visual Profissional**: Layout compacto mas equilibrado

---

## 📦 Arquivos Afetados

### Modificados
- `app/globals.css` (modificações dentro do media query Laydesk3, linhas ~1497-1650)

### Não Modificados (se usar apenas CSS)
- `components/sections/services-carousel.tsx`
- `app/page.tsx`
- Todos os outros layouts

---

## 🚨 Observações Importantes

1. **Escolha do Usuário**: As alternativas têm trade-offs diferentes. O usuário deve escolher qual se adequa melhor à experiência desejada.

2. **Line-Clamp**: A propriedade `-webkit-line-clamp` funciona bem em navegadores modernos, mas pode precisar de fallback.

3. **Teste Visual**: Após implementação, testar com diferentes conteúdos/textos para garantir que não haja overflow em nenhum card.

4. **Alternativa 2 (2 cards)**: Se escolhida, pode ser necessário ajustar o JavaScript do carrossel para garantir comportamento correto.

---

## 🎯 Próximos Passos

1. **Usuário escolhe** uma das alternativas (ou combinação personalizada)
2. **Implementação** das mudanças CSS
3. **Teste** em 1280×720 para validar
4. **Ajustes finos** se necessário

---

**Aguardando escolha do usuário! 🚀**

