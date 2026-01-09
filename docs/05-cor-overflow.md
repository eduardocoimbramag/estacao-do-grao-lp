# Correção de Overflow na Seção "Nossos Serviços" (Laydesk1)

## 📋 Problema Identificado

Na seção "Nossos Serviços" em telas de 1080p (laydesk1 - `min-width: 1600px` e `min-height: 900px`), quando o usuário passa o mouse sobre os botões de navegação do carrossel (setas esquerda/direita), ocorre um **overflow vertical** que empurra os botões para baixo e quebra o layout.

### Causa Raiz

1. **Falta de estilos específicos para laydesk1**: A seção "Nossos Serviços" possui estilos otimizados para laydesk2 e laydesk3 que garantem `overflow: hidden` e altura fixa, mas não há estilos específicos para laydesk1.

2. **Focus ring com offset**: Os botões de navegação usam `focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2`, que quando acionado (seja por hover ou focus) adiciona um offset de `0.5rem` (2 unidades Tailwind) ao redor do botão, aumentando o espaço ocupado e causando overflow.

3. **Transition-all afetando layout**: A classe `transition-all duration-200` pode estar causando mudanças inesperadas no layout durante a transição do hover.

4. **Altura da seção não garantida em laydesk1**: A seção usa `h-[calc(100vh-4rem)]` mas não tem garantias de `overflow: hidden` específicas para laydesk1, permitindo que o conteúdo ultrapasse os limites.

### Localização do Problema

- **Componente**: `components/sections/services-carousel.tsx`
  - Linhas 176-246: Botões de navegação (Desktop)
  - Classes problemáticas: `focus:ring-offset-2` nas linhas 184 e 229

- **Estilos**: `app/globals.css`
  - Linhas 224-231: Media query laydesk1 (atualmente vazia)
  - Falta implementação de estilos para laydesk1 na seção de serviços

- **Página**: `app/page.tsx`
  - Linhas 19-38: Seção "Nossos Serviços"
  - Classes aplicadas: `laydesk2-servicos-section laydesk3-servicos-section` (faltando `laydesk1-servicos-section`)

## ✅ Solução Proposta

### 1. Adicionar Estilos Específicos para Laydesk1

Criar regras CSS dentro da media query `@media (min-width: 1600px) and (min-height: 900px)` para garantir:

- Altura fixa da seção: `height: calc(100vh - 4rem)`
- Overflow oculto: `overflow: hidden`
- Container interno com flexbox otimizado
- Botões de navegação que não causem overflow no hover

### 2. Corrigir Botões de Navegação

**Opção A (Recomendada)**: Usar `outline` ao invés de `ring` com offset:
- Substituir `focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2` por `focus:outline-2 focus:outline-coffee-500 focus:outline-offset-2`
- O `outline` não afeta o layout, apenas sobrepõe o conteúdo

**Opção B**: Remover o `ring-offset` e usar apenas `ring` sem offset:
- Manter `focus:ring-2 focus:ring-coffee-500`
- Remover `focus:ring-offset-2` para evitar aumento do espaço ocupado

**Opção C**: Garantir que o ring não afete o layout usando `box-sizing` e posicionamento absoluto/relativo

### 3. Garantir que Border não Mude de Espessura

- Os botões usam `border border-coffee-700` que muda para `hover:border-coffee-500/50`
- Garantir que ambos usem a mesma espessura de borda (ex: `border-2` explícito)

### 4. Otimizar Transitions

- Trocar `transition-all` por transições específicas: `transition-colors transition-shadow`
- Evitar transicionar propriedades que afetam layout (width, height, padding, margin)

## 🔧 Implementação Detalhada

### CSS para `app/globals.css` (dentro da media query laydesk1)

```css
@media (min-width: 1600px) and (min-height: 900px) {
  /* //INICIO LAYDESK1// */
  
  /* ============================================
     SEÇÃO "NOSSOS SERVIÇOS" - Correções laydesk1
     ============================================ */
  
  /* 1. Section: Altura fixa + Anti-overflow */
  .laydesk1-servicos-section {
    height: calc(100vh - 4rem) !important;
    min-height: calc(100vh - 4rem) !important;
    max-height: calc(100vh - 4rem) !important;
    overflow: hidden !important;
    overflow-y: hidden !important;
    overflow-x: hidden !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  
  /* 2. Container interno: Flexbox otimizado */
  .laydesk1-servicos-container {
    height: 100% !important;
    min-height: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    overflow: hidden !important;
  }
  
  /* 3. Botões de navegação: Prevenir overflow no hover */
  .laydesk1-servicos-nav {
    margin-top: 0.75rem !important;
    flex-shrink: 0 !important; /* Não permite que encolha */
    position: relative !important; /* Para contexto de posicionamento */
    z-index: 1 !important;
  }
  
  /* Botões: Tamanho fixo + sem mudança de layout no hover */
  .laydesk1-servicos-nav button {
    padding: 0.75rem !important;
    border-width: 1px !important; /* Garantir espessura fixa */
    box-sizing: border-box !important;
    position: relative !important;
    /* Usar outline ao invés de ring para não afetar layout */
    outline: 2px solid transparent !important;
    outline-offset: 2px !important;
    transition: background-color 200ms ease, border-color 200ms ease, outline-color 200ms ease !important;
  }
  
  /* Hover: Apenas mudar cores, não layout */
  .laydesk1-servicos-nav button:hover {
    background-color: var(--color-coffee-800) !important;
    border-color: rgba(var(--color-coffee-500-rgb), 0.5) !important;
    /* Outline permanece transparente no hover, apenas fica visível no focus */
  }
  
  /* Focus: Outline visível mas sem afetar layout */
  .laydesk1-servicos-nav button:focus-visible {
    outline-color: var(--color-coffee-500) !important;
    outline-width: 2px !important;
    outline-offset: 2px !important;
    /* Outline não afeta o layout, apenas sobrepõe */
  }
  
  /* Garantir que o container do carrossel não ultrapasse */
  .laydesk1-servicos-carousel-container {
    flex: 1 1 auto !important;
    min-height: 0 !important;
    overflow: hidden !important;
    display: flex !important;
    align-items: center !important;
  }
  
  /* //FIM LAYDESK1// */
}
```

### Alteração no Componente `services-carousel.tsx`

**Linha 176**: Adicionar classe `laydesk1-servicos-nav`:
```tsx
<div className="hidden lg:flex justify-center items-center gap-4 mt-3 laydesk2-servicos-nav laydesk3-servicos-nav laydesk1-servicos-nav">
```

**Linhas 177-200 e 222-245**: Remover `focus:ring-offset-2` e ajustar classes dos botões:
```tsx
// ANTES:
className="
  p-3 rounded-full border border-coffee-700 bg-coffee-900/80
  hover:bg-coffee-800 hover:border-coffee-500/50
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 focus:ring-offset-coffee-900
"

// DEPOIS:
className="
  p-3 rounded-full border border-coffee-700 bg-coffee-900/80
  hover:bg-coffee-800 hover:border-coffee-500/50
  transition-colors duration-200
  focus:outline-none focus-visible:outline-2 focus-visible:outline-coffee-500 focus-visible:outline-offset-2
"
```

### Alteração na Página `app/page.tsx`

**Linha 21**: Adicionar classe `laydesk1-servicos-section`:
```tsx
className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] flex flex-col justify-center bg-coffee-700/50 overflow-x-hidden w-full laydesk1-servicos-section laydesk2-servicos-section laydesk3-servicos-section"
```

**Linha 23**: Adicionar classe `laydesk1-servicos-container`:
```tsx
className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-3 lg:py-4 box-border laydesk1-servicos-container laydesk2-servicos-container laydesk3-servicos-container"
```

**Linha 85** (no componente services-carousel.tsx): Adicionar classe `laydesk1-servicos-carousel-container`:
```tsx
className="overflow-hidden cursor-grab active:cursor-grabbing py-2 sm:py-6 w-full max-w-[100vw] laydesk1-servicos-carousel-container laydesk2-servicos-carousel-container laydesk3-servicos-carousel-container"
```

## 📝 Checklist de Validação

Após implementação, verificar:

- [ ] A seção "Nossos Serviços" tem exatamente `calc(100vh - 4rem)` de altura em laydesk1
- [ ] Não há overflow vertical ao passar o mouse sobre os botões de navegação
- [ ] Os botões mantêm o mesmo tamanho durante o hover (apenas mudam cores)
- [ ] O focus funciona corretamente com outline visível mas sem causar overflow
- [ ] O carrossel permanece funcional e visível
- [ ] O layout está consistente em diferentes estados (hover, focus, normal)
- [ ] Testado em diferentes navegadores (Chrome, Firefox, Edge)

## 🎯 Objetivos

1. **Eliminar overflow**: A seção deve caber exatamente em `calc(100vh - 4rem)` sem scroll vertical
2. **Manter usabilidade**: Os botões devem continuar funcionais e acessíveis
3. **Consistência visual**: O layout deve permanecer estável durante interações (hover, focus)
4. **Compatibilidade**: Funcionar em todos os navegadores modernos

## 📌 Notas Técnicas

- O uso de `outline` ao invés de `ring` é preferível porque outline não afeta o modelo de caixa (box model)
- `outline-offset` cria espaço ao redor do outline, mas este espaço é "externo" e não empurra outros elementos
- A propriedade `flex-shrink: 0` nos botões garante que eles não encolham para acomodar outros elementos
- O `box-sizing: border-box` garante que padding e border sejam incluídos no cálculo da largura/altura total

## 🔗 Referências

- [MDN: CSS Outline](https://developer.mozilla.org/en-US/docs/Web/CSS/outline)
- [Tailwind CSS: Ring Utilities](https://tailwindcss.com/docs/ring-width)
- [MDN: CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

