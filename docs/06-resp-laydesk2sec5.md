# Correção de Responsividade — Seção "FlipCard" (laydesk2)

## Objetivo

Este documento descreve as correções necessárias para otimizar a seção "FlipCard" especificamente para o layout **laydesk2** (resolução 1368×768), garantindo que o conteúdo caiba perfeitamente na altura de `1viewport - menu` sem overflow.

**Importante:** Todas as alterações devem ser aplicadas **exclusivamente** no `laydesk2`, sem modificar outros layouts (laydesk1, laydesk3, laymob1, laymob2).

**Localização das alterações:** Todas as regras CSS devem ser adicionadas apenas em `app/globals.css`, dentro do bloco `laydesk2`. Nenhuma modificação deve ser feita no componente `components/flipcard.tsx`.

---

## Problemas Identificados

1. **Overflow vertical:** O conteúdo pode ultrapassar os limites da seção
2. **Espaçamentos excessivos:** Padding e margins ocupam muito espaço vertical
3. **Tamanhos grandes demais:** Fontes, imagens e espaçamentos são grandes demais para a resolução
4. **Altura dos containers:** Containers de scroll podem não estar otimizados para a altura disponível

---

## Estrutura da Seção

A seção "FlipCard" está localizada em:
- **Arquivo:** `components/flipcard.tsx`

### Elementos que precisam de ajuste:

1. **Section container** (linha 93)
2. **Container interno** (linha 94)
3. **Container do flip** (linha 98)
4. **Card front/back** (linhas 102, 166)
5. **Títulos h2** (linhas 105, 168)
6. **Container de itens com scroll** (linhas 110, 173)
7. **Itens individuais** (linhas 120, 183)
8. **Imagens dos itens** (linha 127, 190)
9. **Textos dos itens** (linhas 138, 201)
10. **Botões de flip** (linhas 151, 214)

---

## Implementação Proposta

### Localização no CSS

Todas as regras devem ser adicionadas no bloco `laydesk2` em `app/globals.css`, dentro da media query:

```css
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  /* Regras aqui */
}
```

---

## 1. Ajustes na Section Principal

### Problema
A seção já tem `h-[calc(100vh-4rem)]` mas o padding vertical (`py-1 sm:py-4 lg:py-6`) está reduzindo o espaço útil.

### Solução
Manter altura viewport menos menu e remover padding vertical:

```css
/* app/globals.css - dentro do bloco laydesk2 */

/* Section: Manter altura viewport menos menu, remover padding vertical */
.laydesk2-flipcard-section {
  height: calc(100vh - 4rem) !important;
  min-height: calc(100vh - 4rem) !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 93
<section className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] py-1 sm:py-4 lg:py-6 bg-coffee-700 overflow-x-hidden w-full flex flex-col sm:justify-center laydesk2-flipcard-section">
```

---

## 2. Ajustes no Container Interno

### Problema
Padding horizontal (`px-4 sm:px-4 md:px-6 lg:px-8`) e falta de controle de altura.

### Solução
Reduzir padding e garantir uso completo da altura:

```css
/* Container interno: Reduzir padding e usar altura completa */
.laydesk2-flipcard-container {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  height: 100% !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 94
<div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8 h-full box-border laydesk2-flipcard-container">
```

---

## 3. Ajustes no Container do Flip

### Problema
Falta de otimização para altura reduzida.

### Solução
Garantir que o container use toda a altura disponível:

```css
/* Container do flip: Otimizar altura */
.laydesk2-flipcard-flip-container {
  height: 100% !important;
  min-height: 0 !important;
}

.laydesk2-flipcard-flip-container .flip-container {
  height: 100% !important;
}

.laydesk2-flipcard-flip-container .flip-card-inner {
  height: 100% !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 96
<div className="hidden sm:block h-full laydesk2-flipcard-flip-container">
```

---

## 4. Ajustes nos Cards (Front e Back)

### Problema
Padding (`p-1.5 sm:p-6 lg:p-7`) é grande demais.

### Solução
Reduzir padding:

```css
/* Cards front e back: Reduzir padding */
.laydesk2-flipcard-card {
  padding: 1rem !important;
  height: 100% !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 103 (front)
<div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-1.5 sm:p-6 lg:p-7 shadow-2xl h-full grid grid-rows-[auto_1fr_auto] sm:flex sm:flex-col overflow-visible sm:overflow-visible laydesk2-flipcard-card">

// components/flipcard.tsx - linha 166 (back)
<div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-1.5 sm:p-6 lg:p-7 shadow-2xl h-full grid grid-rows-[auto_1fr_auto] sm:flex sm:flex-col laydesk2-flipcard-card">
```

---

## 5. Ajustes nos Títulos h2

### Problema
Tamanho de fonte (`text-2xl sm:text-2xl lg:text-3xl`) e margin-bottom (`mb-1.5 sm:mb-4`) são grandes.

### Solução
Reduzir tamanho e margin:

```css
/* Títulos: Reduzir tamanho e margin */
.laydesk2-flipcard-title {
  font-size: 1.5rem !important; /* equivalente a text-2xl */
  line-height: 1.75rem !important;
  margin-bottom: 0.75rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 105 (front)
<h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-1.5 sm:mb-4 font-montserrat laydesk2-flipcard-title">

// components/flipcard.tsx - linha 168 (back)
<h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-1.5 sm:mb-4 font-montserrat laydesk2-flipcard-title">
```

---

## 6. Ajustes no Container de Itens com Scroll

### Problema
Espaçamento (`space-y-1 sm:space-y-2`), margin-bottom (`mb-1.5 sm:mb-3`) e max-height podem ser otimizados.

### Solução
Reduzir espaçamentos e ajustar max-height:

```css
/* Container de itens: Reduzir espaçamento e ajustar altura */
.laydesk2-flipcard-items-container {
  gap: 0.5rem !important;
  margin-bottom: 0.75rem !important;
  max-height: calc(100vh - 4rem - 180px) !important;
  padding-right: 0.25rem !important;
}

.laydesk2-flipcard-items-container > * + * {
  margin-top: 0.5rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 110 (front)
<div
  className="space-y-1 sm:space-y-2 mb-1.5 sm:mb-3 overflow-y-scroll sm:overflow-y-auto sm:flex-1 sm:max-h-[calc(100vh-4rem-200px)] lg:max-h-[calc(100vh-4rem-240px)] min-h-0 relative scroll-container-lado1 laydesk2-flipcard-items-container"
>

// components/flipcard.tsx - linha 173 (back)
<div
  className="space-y-1 sm:space-y-2 mb-1.5 sm:mb-3 overflow-y-auto sm:flex-1 sm:max-h-[calc(100vh-4rem-200px)] lg:max-h-[calc(100vh-4rem-240px)] min-h-0 relative scroll-container-lado2 laydesk2-flipcard-items-container"
>
```

---

## 7. Ajustes nos Itens Individuais

### Problema
Gap (`gap-2 sm:gap-[18px] lg:gap-[22px]`) e padding (`p-1 sm:p-0`) podem ser reduzidos.

### Solução
Reduzir gap e padding:

```css
/* Itens individuais: Reduzir gap e padding */
.laydesk2-flipcard-item {
  gap: 0.75rem !important;
  padding: 0.5rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 120 (front)
<div
  key={item.id}
  className={`flex flex-col sm:flex-row ${item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''} items-center gap-2 sm:gap-[18px] lg:gap-[22px] p-1 sm:p-0 bg-coffee-900/60 rounded-2xl transition-all duration-300 min-w-0 laydesk2-flipcard-item`}
>

// components/flipcard.tsx - linha 183 (back)
<div
  key={item.id}
  className={`flex flex-col sm:flex-row ${item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''} items-center gap-2 sm:gap-[18px] lg:gap-[22px] p-1 sm:p-0 bg-coffee-900/60 rounded-2xl transition-all duration-300 min-w-0 laydesk2-flipcard-item`}
>
```

---

## 8. Ajustes nas Imagens dos Itens

### Problema
Tamanhos (`max-w-[280px] sm:max-w-[340px] sm:h-[142px] lg:max-w-[420px] lg:h-[175px]`) são grandes.

### Solução
Reduzir tamanhos:

```css
/* Imagens dos itens: Reduzir tamanho */
.laydesk2-flipcard-item-image {
  max-width: 280px !important;
  height: 120px !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 127 (front)
<div className="relative w-full max-w-[280px] sm:max-w-[340px] sm:h-[142px] lg:max-w-[420px] lg:h-[175px] h-[80px] flex-shrink-0 rounded-xl overflow-hidden mx-auto sm:mx-0 laydesk2-flipcard-item-image">

// components/flipcard.tsx - linha 190 (back)
<div className="relative w-full max-w-[280px] sm:max-w-[340px] sm:h-[142px] lg:max-w-[420px] lg:h-[175px] h-[80px] flex-shrink-0 rounded-xl overflow-hidden mx-auto sm:mx-0 laydesk2-flipcard-item-image">
```

---

## 9. Ajustes nos Textos dos Itens

### Problema
Tamanhos de fonte (`text-sm sm:text-lg lg:text-xl` para títulos e `text-xs sm:text-sm lg:text-base` para descrições) e margins são grandes.

### Solução
Reduzir tamanhos e margins:

```css
/* Títulos dos itens: Reduzir tamanho */
.laydesk2-flipcard-item-title {
  font-size: 1rem !important; /* equivalente a text-base */
  line-height: 1.25rem !important;
  margin-bottom: 0.5rem !important;
}

/* Descrições dos itens: Reduzir tamanho */
.laydesk2-flipcard-item-description {
  font-size: 0.8125rem !important; /* entre text-xs e text-sm */
  line-height: 1.25rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 139 (front)
<h3 className="text-sm sm:text-lg lg:text-xl font-bold text-coffee-500 mb-1 sm:mb-1.5 font-montserrat laydesk2-flipcard-item-title">

// components/flipcard.tsx - linha 142 (front)
<p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-normal sm:leading-relaxed text-justify font-montserrat laydesk2-flipcard-item-description">

// Repetir para back (linhas 202, 205)
```

---

## 10. Ajustes nos Botões de Flip

### Problema
Padding (`py-2 sm:py-3`), margin-top (`mt-2 sm:mt-4`) e tamanhos de fonte (`text-sm sm:text-base lg:text-lg`) são grandes.

### Solução
Reduzir padding, margin e tamanhos:

```css
/* Botões de flip: Reduzir padding e margin */
.laydesk2-flipcard-button {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0 !important;
}

/* Texto dos botões: Reduzir tamanho */
.laydesk2-flipcard-button span {
  font-size: 0.875rem !important; /* equivalente a text-sm */
  line-height: 1.25rem !important;
}

/* Ícones dos botões: Reduzir tamanho */
.laydesk2-flipcard-button svg {
  width: 1rem !important;
  height: 1rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/flipcard.tsx - linha 151 (front)
<button
  onClick={handleFlip}
  className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 px-5 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 group mt-2 sm:mt-4 mb-0 laydesk2-flipcard-button"
>

// components/flipcard.tsx - linha 214 (back)
<button
  onClick={handleFlip}
  className="w-full flex items-center justify-center gap-2 py-2 sm:py-3 px-5 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 group mt-2 sm:mt-4 mb-0 laydesk2-flipcard-button"
>
```

---

## Resumo das Classes CSS

Todas as classes devem ser adicionadas no bloco `laydesk2` em `app/globals.css`:

```css
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  /* 1. Section */
  .laydesk2-flipcard-section { }
  
  /* 2. Container */
  .laydesk2-flipcard-container { }
  
  /* 3. Container do flip */
  .laydesk2-flipcard-flip-container { }
  .laydesk2-flipcard-flip-container .flip-container { }
  .laydesk2-flipcard-flip-container .flip-card-inner { }
  
  /* 4. Cards */
  .laydesk2-flipcard-card { }
  
  /* 5. Títulos */
  .laydesk2-flipcard-title { }
  
  /* 6. Container de itens */
  .laydesk2-flipcard-items-container { }
  
  /* 7. Itens individuais */
  .laydesk2-flipcard-item { }
  
  /* 8. Imagens */
  .laydesk2-flipcard-item-image { }
  
  /* 9. Textos */
  .laydesk2-flipcard-item-title { }
  .laydesk2-flipcard-item-description { }
  
  /* 10. Botões */
  .laydesk2-flipcard-button { }
  .laydesk2-flipcard-button span { }
  .laydesk2-flipcard-button svg { }
}
```

---

## Checklist de Implementação

Antes de implementar, verifique:

- [ ] Todas as classes CSS estão dentro do bloco `laydesk2` em `app/globals.css`
- [ ] Todas as classes foram adicionadas nos componentes correspondentes
- [ ] Nenhuma alteração foi feita em outros layouts
- [ ] Testado em resolução 1368×768
- [ ] Verificado que não há overflow vertical
- [ ] Verificado que a seção mantém altura `calc(100vh - 4rem)`
- [ ] Verificado que o conteúdo está proporcionalmente reduzido
- [ ] Testado que o flip 3D continua funcionando corretamente
- [ ] Testado que outros layouts (laydesk1, laydesk3, mobile) não foram afetados

---

## Ordem de Implementação Recomendada

1. **Primeiro:** Ajustar a section e container (itens 1-2) para garantir altura correta
2. **Segundo:** Ajustar container do flip e cards (itens 3-4) para distribuir espaço
3. **Terceiro:** Ajustar títulos e container de itens (itens 5-6) para reduzir altura
4. **Quarto:** Ajustar itens, imagens e textos (itens 7-9) para reduzir conteúdo
5. **Quinto:** Ajustar botões (item 10) para finalizar

---

## Notas Importantes

1. **Especificidade:** Use `!important` quando necessário para sobrescrever classes Tailwind
2. **Teste incremental:** Implemente e teste cada grupo de ajustes antes de continuar
3. **Valores:** Os valores sugeridos são estimativas. Ajuste conforme necessário após testes
4. **Mobile-first:** Lembre-se que o projeto é mobile-first. As classes base são para mobile, então os ajustes do laydesk2 sobrescrevem apenas nessa resolução específica
5. **Altura da seção:** A seção deve manter `calc(100vh - 4rem)` para ocupar viewport menos menu
6. **Proporcionalidade:** Todos os elementos devem ser reduzidos proporcionalmente para caber no espaço disponível
7. **Flip 3D:** As animações de flip devem continuar funcionando. Não modifique as classes `.flip-container`, `.flip-card-inner`, `.flip-card-front`, `.flip-card-back` diretamente, apenas ajuste os elementos internos
8. **Scroll:** Os containers de scroll devem ser otimizados para a altura disponível, garantindo que todo o conteúdo seja acessível

---

## Exemplo Completo: Ajuste de um Item

```css
/* app/globals.css - dentro do bloco laydesk2 */

/* Itens individuais: Reduzir gap e padding */
.laydesk2-flipcard-item {
  gap: 0.75rem !important;
  padding: 0.5rem !important;
}

/* Imagens dos itens: Reduzir tamanho */
.laydesk2-flipcard-item-image {
  max-width: 280px !important;
  height: 120px !important;
}

/* Títulos dos itens: Reduzir tamanho */
.laydesk2-flipcard-item-title {
  font-size: 1rem !important;
  line-height: 1.25rem !important;
  margin-bottom: 0.5rem !important;
}

/* Descrições dos itens: Reduzir tamanho */
.laydesk2-flipcard-item-description {
  font-size: 0.8125rem !important;
  line-height: 1.25rem !important;
}
```

```tsx
// components/flipcard.tsx
<div
  key={item.id}
  className={`flex flex-col sm:flex-row ${item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''} items-center gap-2 sm:gap-[18px] lg:gap-[22px] p-1 sm:p-0 bg-coffee-900/60 rounded-2xl transition-all duration-300 min-w-0 laydesk2-flipcard-item`}
>
  <div className="relative w-full max-w-[280px] sm:max-w-[340px] sm:h-[142px] lg:max-w-[420px] lg:h-[175px] h-[80px] flex-shrink-0 rounded-xl overflow-hidden mx-auto sm:mx-0 laydesk2-flipcard-item-image">
    {/* imagem */}
  </div>
  <div className="flex-1 flex flex-col justify-center text-center">
    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-coffee-500 mb-1 sm:mb-1.5 font-montserrat laydesk2-flipcard-item-title">
      {item.title}
    </h3>
    <p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-normal sm:leading-relaxed text-justify font-montserrat laydesk2-flipcard-item-description">
      {item.description}
    </p>
  </div>
</div>
```

---

## Referências

- **Documentação de layouts:** `docs/03-LAYOUTS.md`
- **Documentação similar:** 
  - `docs/04-resp-laydesk2sec3.md` (Seção "Nossos Serviços")
  - `docs/05-resp-laydesk2sec4.md` (Seção "Regiões Atendidas")
- **Arquivo principal de estilos:** `app/globals.css`
- **Seção "FlipCard":** `components/flipcard.tsx`

