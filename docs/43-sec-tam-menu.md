# Documentação: Ajuste de Altura da Seção Considerando Menu Fixo

## 📋 Visão Geral

Este documento detalha as modificações necessárias para ajustar a altura da seção "O que é a Estação do Grão?" (OpenMenuIntro) na versão mobile, garantindo que ela ocupe exatamente **1 viewport incluindo o menu fixo** no topo.

**Problema Atual**: A seção usa `h-screen` (100vh), mas o menu fixo está sobrepondo o conteúdo, fazendo com que o conteúdo visível seja menor que 100vh.

**Solução**: Ajustar a altura da seção para `calc(100vh - altura_do_menu)` ou usar padding-top equivalente à altura do menu.

**Importante**: Todas as alterações são aplicadas **APENAS para a versão mobile** (breakpoint < 640px), preservando o comportamento desktop.

---

## 🎯 Objetivo

Garantir que a seção "O que é a Estação do Grão?" ocupe exatamente **1 viewport completo** (100vh) **incluindo o espaço do menu fixo**, de forma que:
- ✅ O conteúdo visível seja exatamente 100vh
- ✅ O menu não sobreponha o conteúdo
- ✅ Não haja espaço extra abaixo do conteúdo
- ✅ A experiência seja otimizada para mobile

---

## 📐 Análise do Problema

### Estado Atual

#### Header (Menu Fixo)
- **Altura do container**: `h-16` (64px = 4rem)
- **Posição**: `fixed top-0`
- **Z-index**: `z-50`
- **Logo em mobile**: `h-[60px]` (mas container é 64px)

#### Seção OpenMenuIntro
- **Altura atual**: `h-screen` (100vh)
- **Padding vertical**: `py-3` (12px)
- **Justify**: `justify-start` (conteúdo no topo)
- **Problema**: Menu fixo sobrepõe ~64px do conteúdo

### Cálculo Necessário

```
Altura visível desejada = 100vh
Altura do menu fixo = 64px (h-16)
Altura da seção = 100vh (mantém)
Padding-top necessário = 64px (altura do menu)
Altura do conteúdo = 100vh - 64px (padding-top)
```

---

## 🔧 Mudanças Propostas

### Opção 1: Usar calc() na altura (Recomendada)

**Arquivo**: `components/OpenMenuIntro.tsx`

**Linha**: ~59

**Mudança**:
```tsx
// ANTES:
<section id="apresentacao" className="h-screen sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-start sm:justify-center">

// DEPOIS:
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-start sm:justify-center">
```

**Detalhes**:
- Mobile: `h-[calc(100vh-4rem)]` (100vh - 64px do menu)
- Desktop: Mantém `sm:h-screen` (comportamento original)
- `4rem` = 64px = altura do menu (`h-16`)

---

### Opção 2: Usar padding-top equivalente

**Arquivo**: `components/OpenMenuIntro.tsx`

**Linha**: ~59

**Mudança**:
```tsx
// ANTES:
<section id="apresentacao" className="h-screen sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-start sm:justify-center">

// DEPOIS:
<section id="apresentacao" className="h-screen sm:h-screen pt-16 pb-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-start sm:justify-center">
```

**Detalhes**:
- Mobile: `pt-16` (64px = altura do menu) + `pb-3` (12px)
- Desktop: Mantém `sm:py-16` (comportamento original)
- Altura total: 100vh (mantém `h-screen`)

---

## 📊 Comparação das Opções

| Característica | Opção 1 (calc) | Opção 2 (padding-top) |
|----------------|----------------|----------------------|
| **Altura da seção** | `calc(100vh-4rem)` | `100vh` |
| **Padding-top** | `py-3` (mantém) | `pt-16` (64px) |
| **Conteúdo visível** | 100vh - 64px | 100vh - 64px |
| **Complexidade** | Baixa | Baixa |
| **Recomendação** | ✅ Sim | ⚠️ Alternativa |

---

## ✅ Recomendação: Opção 1 (calc)

A **Opção 1** é recomendada porque:
- ✅ Mais semântica (altura explícita)
- ✅ Não altera o padding existente
- ✅ Mais fácil de entender e manter
- ✅ Funciona bem com `justify-start`

---

## 📝 Detalhamento Técnico

### Opção 1: Usar calc()

#### Classes Tailwind

```tsx
// Mobile
h-[calc(100vh-4rem)]    // Altura = 100vh - 64px (altura do menu)

// Desktop
sm:h-screen              // Altura = 100vh (comportamento original)
```

#### Cálculo

```
100vh = altura total do viewport
4rem = 64px = altura do menu (h-16)
calc(100vh - 4rem) = altura disponível para conteúdo
```

#### Exemplo em diferentes viewports

| Viewport | 100vh | Menu (64px) | Altura seção |
|----------|-------|-------------|--------------|
| iPhone SE (667px) | 667px | 64px | 603px |
| iPhone 12 (844px) | 844px | 64px | 780px |
| iPhone 14 Pro Max (932px) | 932px | 64px | 868px |

---

### Opção 2: Usar padding-top

#### Classes Tailwind

```tsx
// Mobile
pt-16                   // Padding-top = 64px (altura do menu)
pb-3                    // Padding-bottom = 12px

// Desktop
sm:py-16                // Padding vertical = 64px (comportamento original)
```

#### Cálculo

```
h-screen = 100vh (altura total)
pt-16 = 64px (espaço para o menu)
Conteúdo visível = 100vh - 64px
```

---

## 🔍 Verificação da Altura do Menu

### Header Atual

```tsx
<header className="fixed top-0 left-0 right-0 z-50 ...">
  <div className="...">
    <div className="flex items-center justify-between h-16 ...">
      {/* Conteúdo */}
    </div>
  </div>
</header>
```

- **Container interno**: `h-16` = 64px = 4rem
- **Altura total do menu**: 64px (considerando apenas o container principal)
- **Border**: `border-b` (1px, não afeta altura significativa)

### Considerações

- O logo tem `h-[60px]` mas está dentro de um container `h-16` (64px)
- O border-bottom adiciona 1px, mas é mínimo
- A altura efetiva do menu é **64px (4rem)**

---

## 📝 Checklist de Implementação

### Fase 1: Escolher Opção
- [ ] Decidir entre Opção 1 (calc) ou Opção 2 (padding-top)
- [ ] Revisar altura do menu (confirmar 64px)

### Fase 2: Implementação
- [ ] Aplicar mudança na seção OpenMenuIntro
- [ ] Testar em diferentes dispositivos mobile
- [ ] Verificar que conteúdo não é cortado
- [ ] Verificar que não há espaço extra abaixo

### Fase 3: Validação
- [ ] Testar em 360px, 375px, 414px
- [ ] Verificar que seção ocupa exatamente 100vh incluindo menu
- [ ] Verificar que conteúdo está visível
- [ ] Verificar que desktop não foi afetado
- [ ] Verificar scroll (não deve haver scroll desnecessário)

---

## 🎨 Classes Tailwind Utilizadas

### Opção 1 (Recomendada)

```tsx
// Seção
h-[calc(100vh-4rem)]    // Altura = viewport - menu
sm:h-screen              // Desktop: altura completa
```

### Opção 2 (Alternativa)

```tsx
// Seção
h-screen                 // Altura = viewport completo
pt-16                    // Padding-top = altura do menu
pb-3                     // Padding-bottom
sm:py-16                 // Desktop: padding vertical
```

---

## ⚠️ Considerações Especiais

### Altura do Menu

- **Atual**: `h-16` (64px)
- **Se mudar no futuro**: Ajustar o valor em `calc(100vh-4rem)` ou `pt-16`
- **Verificação**: Sempre confirmar altura do menu antes de implementar

### Conteúdo Dinâmico

- Se o conteúdo for maior que o espaço disponível, pode precisar de scroll
- Considerar usar `min-h-[calc(100vh-4rem)]` se o conteúdo for variável
- Atualmente o conteúdo parece caber em 1 viewport

### Safe Area (Notches)

- Em dispositivos com notch, pode ser necessário considerar `safe-area-inset-top`
- Por enquanto, usar altura fixa do menu (64px) é suficiente
- Se necessário no futuro, usar `env(safe-area-inset-top)`

---

## 📊 Comparação: Antes vs Depois

### Antes

| Propriedade | Valor |
|-------------|-------|
| Altura seção | `100vh` |
| Menu sobrepõe | ~64px |
| Conteúdo visível | ~936px (em 1000px viewport) |
| Espaço abaixo | Pode ter espaço extra |

### Depois (Opção 1)

| Propriedade | Valor |
|-------------|-------|
| Altura seção | `calc(100vh - 64px)` |
| Menu não sobrepõe | 0px |
| Conteúdo visível | `calc(100vh - 64px)` |
| Espaço abaixo | Sem espaço extra |

### Depois (Opção 2)

| Propriedade | Valor |
|-------------|-------|
| Altura seção | `100vh` |
| Padding-top | `64px` |
| Conteúdo visível | `calc(100vh - 64px)` |
| Espaço abaixo | Sem espaço extra |

---

## 🔍 Arquivos Afetados

```
components/
└── OpenMenuIntro.tsx      → Ajustar altura da seção
```

---

## ✅ Critérios de Sucesso

1. ✅ Seção ocupa exatamente 100vh incluindo menu
2. ✅ Conteúdo não é cortado pelo menu
3. ✅ Não há espaço extra abaixo do conteúdo
4. ✅ Conteúdo está totalmente visível
5. ✅ Desktop não foi afetado (comportamento mantido)
6. ✅ Não há scroll desnecessário
7. ✅ Layout permanece visualmente agradável

---

## 📱 Testes Recomendados

### Dispositivos Mobile
- iPhone SE (375px x 667px)
- iPhone 12/13/14 (390px x 844px)
- iPhone 14 Pro Max (430px x 932px)
- Samsung Galaxy S21 (360px x 800px)
- Pixel 5 (393px x 851px)

### Verificações
1. Seção ocupa exatamente 100vh incluindo menu
2. Conteúdo não é cortado
3. Não há espaço extra abaixo
4. Menu não sobrepõe conteúdo
5. Desktop mantém layout original

---

## 🚀 Próximos Passos

Após autorização:
1. Escolher opção (1 ou 2)
2. Implementar mudança na seção
3. Testar em diferentes dispositivos
4. Validar que desktop não foi afetado
5. Ajustes finos se necessário

---

## 💡 Notas Adicionais

### Por que calc() é melhor?

- **Semântica clara**: A altura é explicitamente calculada
- **Manutenibilidade**: Se o menu mudar de altura, é fácil ajustar
- **Performance**: CSS calc() é otimizado pelo navegador
- **Compatibilidade**: Suportado em todos os navegadores modernos

### Alternativa com min-height

Se o conteúdo for maior que o espaço disponível:

```tsx
min-h-[calc(100vh-4rem)]  // Permite crescimento se necessário
```

Mas como o conteúdo atual parece caber em 1 viewport, `h-[calc(100vh-4rem)]` é suficiente.

---

**Data de Criação**: 2025-01-13  
**Versão**: 1.0  
**Status**: Aguardando escolha da opção e autorização para implementação

