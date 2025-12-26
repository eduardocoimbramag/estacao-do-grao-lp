# Correção de Responsividade — Seção "Regiões Atendidas" (laydesk2)

## Objetivo

Este documento descreve as correções necessárias para resolver problemas de **overflow vertical** e **conteúdo sobrepondo** na seção "Regiões Atendidas" especificamente para o layout **laydesk2** (resolução 1368×768).

**Importante:** Todas as alterações devem ser aplicadas **exclusivamente** no `laydesk2`, sem modificar outros layouts (laydesk1, laydesk3, laymob1, laymob2).

---

## Problemas Identificados

1. **Overflow vertical:** O conteúdo está ultrapassando os limites da seção
2. **Conteúdo sobrepondo:** Elementos estão se sobrepondo uns aos outros
3. **Espaçamentos excessivos:** Padding e margins ocupam muito espaço vertical
4. **Tamanhos grandes demais:** Fontes, imagens e cards são grandes demais para a resolução
5. **Grid desproporcional:** O grid de 2 colunas não está otimizado para a altura disponível

---

## Estrutura da Seção

A seção "Regiões Atendidas" está localizada em:
- **Arquivo:** `components/audience.tsx`

### Elementos que precisam de ajuste:

1. **Section container** (linha 7)
2. **Container interno** (linha 8)
3. **Grid de 2 colunas** (linha 11)
4. **Coluna esquerda** (linha 14)
5. **Título h2** (linha 16)
6. **Container do mapa** (linha 21)
7. **Cards informativos** (linhas 33, 46, 59)
8. **Coluna direita** (linha 75)
9. **Botões de navegação** (linhas 78, 99)

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
A seção já tem `h-[calc(100vh-4rem)]` mas o padding vertical (`py-4 sm:py-6 lg:py-8`) está reduzindo o espaço útil.

### Solução
Manter altura viewport menos menu e remover padding vertical:

```css
/* app/globals.css - dentro do bloco laydesk2 */

/* Section: Manter altura viewport menos menu, remover padding vertical */
.laydesk2-audience-section {
  height: calc(100vh - 4rem) !important;
  min-height: calc(100vh - 4rem) !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 7
<section className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] py-4 sm:py-6 lg:py-8 bg-coffee-900 overflow-x-hidden w-full flex flex-col sm:justify-center laydesk2-audience-section">
```

---

## 2. Ajustes no Container Interno

### Problema
Padding horizontal (`px-2.5 sm:px-4 md:px-6 lg:px-8`) e falta de controle de altura.

### Solução
Reduzir padding e garantir uso completo da altura:

```css
/* Container interno: Reduzir padding e usar altura completa */
.laydesk2-audience-container {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 8
<div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 box-border laydesk2-audience-container">
```

---

## 3. Ajustes no Grid de 2 Colunas

### Problema
Gap (`gap-6 lg:gap-8`) e padding vertical (`py-4 sm:py-0`) são grandes demais.

### Solução
Reduzir gap e padding:

```css
/* Grid: Reduzir gap e padding */
.laydesk2-audience-grid {
  gap: 1rem !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  height: 100% !important;
  align-items: center !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 11
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center py-4 sm:py-0 sm:items-start laydesk2-audience-grid">
```

---

## 4. Ajustes na Coluna Esquerda

### Problema
Gap (`gap-1.5 sm:gap-1.5 lg:gap-2`) e falta de controle de altura.

### Solução
Reduzir gap e otimizar layout:

```css
/* Coluna esquerda: Reduzir gap e otimizar */
.laydesk2-audience-left-column {
  gap: 0.75rem !important;
  height: 100% !important;
  justify-content: center !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 14
<div className="flex flex-col justify-center items-center gap-1.5 sm:gap-1.5 lg:gap-2 laydesk2-audience-left-column">
```

---

## 5. Ajustes no Título (h2)

### Problema
Tamanho de fonte (`text-2xl sm:text-lg lg:text-xl`) pode ser reduzido.

### Solução
Reduzir tamanho da fonte:

```css
/* Título: Reduzir tamanho da fonte */
.laydesk2-audience-title {
  font-size: 1.125rem !important; /* equivalente a text-lg */
  line-height: 1.5rem !important;
  margin-bottom: 0.5rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 16
<h2 className="text-2xl sm:text-lg lg:text-xl font-bold text-white text-center font-montserrat laydesk2-audience-title">
```

---

## 6. Ajustes no Container do Mapa

### Problema
Tamanho máximo (`max-w-[120px] sm:max-w-sm lg:max-w-[65%]`) e margin (`my-3 sm:my-0`) podem ser otimizados.

### Solução
Reduzir tamanho máximo e margin:

```css
/* Container do mapa: Reduzir tamanho e margin */
.laydesk2-audience-map-container {
  max-width: 50% !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 21
<div className="relative w-full max-w-[120px] sm:max-w-sm lg:max-w-[65%] aspect-square mx-auto sm:mx-0 my-3 sm:my-0 laydesk2-audience-map-container">
```

---

## 7. Ajustes nos Cards Informativos

### Problema
Padding (`pl-2 pr-3 py-0.5 sm:pl-3 sm:pr-4 sm:py-1.5` e variações) e tamanhos de fonte são grandes.

### Solução
Reduzir padding e tamanhos:

```css
/* Cards: Reduzir padding e espaçamento */
.laydesk2-audience-card {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

/* Ícones dos cards: Reduzir tamanho */
.laydesk2-audience-card svg {
  width: 1rem !important;
  height: 1rem !important;
}

/* Texto dos cards: Reduzir tamanho */
.laydesk2-audience-card-text {
  font-size: 0.75rem !important; /* equivalente a text-xs */
  line-height: 1.125rem !important;
}

/* Texto em negrito dentro dos cards: Reduzir */
.laydesk2-audience-card-text strong {
  font-size: 0.75rem !important;
}

/* Link dentro do card: Reduzir padding */
.laydesk2-audience-card-link {
  padding: 0.25rem 0.5rem !important;
  font-size: 0.75rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 33
<div className="pl-2 pr-3 py-0.5 sm:pl-3 sm:pr-4 sm:py-1.5 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md laydesk2-audience-card">
  <div className="flex items-center gap-2">
    <TreePalm className="w-5 h-5 text-coffee-500 flex-shrink-0 self-center" />
    <div className="pl-2">
      <p className="text-xs sm:text-xs lg:text-sm text-cream-50 leading-relaxed text-justify hyphens-none font-montserrat laydesk2-audience-card-text">
        {/* conteúdo */}
      </p>
    </div>
  </div>
</div>

// Repetir para os outros 2 cards (linhas 46 e 59)
// E adicionar laydesk2-audience-card-link no Link (linha 65)
```

---

## 8. Ajustes na Coluna Direita

### Problema
Gap (`gap-2 sm:gap-6`) e falta de controle de altura.

### Solução
Reduzir gap e otimizar:

```css
/* Coluna direita: Reduzir gap */
.laydesk2-audience-right-column {
  gap: 0.75rem !important;
  height: 100% !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 75
<div className="grid grid-cols-2 sm:flex sm:flex-col justify-start items-stretch gap-2 sm:gap-6 h-full laydesk2-audience-right-column">
```

---

## 9. Ajustes nos Botões de Navegação (Galeria e Blog)

### Problema
Padding vertical (`py-12 sm:py-8 lg:py-10`) e tamanhos de fonte (`text-xl sm:text-2xl lg:text-3xl`) são grandes.

### Solução
Reduzir padding e tamanhos:

```css
/* Botões de navegação: Reduzir padding vertical */
.laydesk2-audience-nav-button {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
  min-height: 0 !important;
  flex: 1 !important;
}

/* Título dos botões: Reduzir tamanho */
.laydesk2-audience-nav-button h3 {
  font-size: 1rem !important; /* equivalente a text-base */
  line-height: 1.5rem !important;
  padding: 0 0.75rem !important;
}
```

**Aplicar no componente:**
```tsx
// components/audience.tsx - linha 78
<Link
  href="/em-construcao"
  className="group relative py-12 sm:flex-1 sm:py-8 lg:py-10 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900 laydesk2-audience-nav-button"
>
  {/* ... */}
  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-4 font-montserrat laydesk2-audience-nav-button-title">
    Galeria de experiências
  </h3>
  {/* ... */}
</Link>

// Repetir para o botão "Blog" (linha 99)
```

---

## Resumo das Classes CSS

Todas as classes devem ser adicionadas no bloco `laydesk2` em `app/globals.css`:

```css
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  /* 1. Section */
  .laydesk2-audience-section { }
  
  /* 2. Container */
  .laydesk2-audience-container { }
  
  /* 3. Grid */
  .laydesk2-audience-grid { }
  
  /* 4. Coluna esquerda */
  .laydesk2-audience-left-column { }
  
  /* 5. Título */
  .laydesk2-audience-title { }
  
  /* 6. Container do mapa */
  .laydesk2-audience-map-container { }
  
  /* 7. Cards */
  .laydesk2-audience-card { }
  .laydesk2-audience-card svg { }
  .laydesk2-audience-card-text { }
  .laydesk2-audience-card-text strong { }
  .laydesk2-audience-card-link { }
  
  /* 8. Coluna direita */
  .laydesk2-audience-right-column { }
  
  /* 9. Botões de navegação */
  .laydesk2-audience-nav-button { }
  .laydesk2-audience-nav-button h3 { }
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
- [ ] Verificado que o conteúdo não está sobrepondo
- [ ] Verificado que a seção mantém altura `calc(100vh - 4rem)`
- [ ] Verificado que o conteúdo está proporcionalmente reduzido
- [ ] Testado que outros layouts (laydesk1, laydesk3, mobile) não foram afetados

---

## Ordem de Implementação Recomendada

1. **Primeiro:** Ajustar a section e container (itens 1-2) para garantir altura correta
2. **Segundo:** Ajustar grid e colunas (itens 3-4) para distribuir espaço
3. **Terceiro:** Ajustar título e mapa (itens 5-6) para reduzir altura
4. **Quarto:** Ajustar cards (item 7) para reduzir conteúdo
5. **Quinto:** Ajustar botões de navegação (itens 8-9) para finalizar

---

## Notas Importantes

1. **Especificidade:** Use `!important` quando necessário para sobrescrever classes Tailwind
2. **Teste incremental:** Implemente e teste cada grupo de ajustes antes de continuar
3. **Valores:** Os valores sugeridos são estimativas. Ajuste conforme necessário após testes
4. **Mobile-first:** Lembre-se que o projeto é mobile-first. As classes base são para mobile, então os ajustes do laydesk2 sobrescrevem apenas nessa resolução específica
5. **Altura da seção:** A seção deve manter `calc(100vh - 4rem)` para ocupar viewport menos menu
6. **Proporcionalidade:** Todos os elementos devem ser reduzidos proporcionalmente para caber no espaço disponível

---

## Exemplo Completo: Ajuste de um Card

```css
/* app/globals.css - dentro do bloco laydesk2 */

/* Card: Reduzir padding e espaçamento */
.laydesk2-audience-card {
  padding-left: 0.75rem !important;
  padding-right: 0.75rem !important;
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.laydesk2-audience-card svg {
  width: 1rem !important;
  height: 1rem !important;
}

.laydesk2-audience-card-text {
  font-size: 0.75rem !important;
  line-height: 1.125rem !important;
}
```

```tsx
// components/audience.tsx
<div className="pl-2 pr-3 py-0.5 sm:pl-3 sm:pr-4 sm:py-1.5 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md laydesk2-audience-card">
  <div className="flex items-center gap-2">
    <TreePalm className="w-5 h-5 text-coffee-500 flex-shrink-0 self-center" />
    <div className="pl-2">
      <p className="text-xs sm:text-xs lg:text-sm text-cream-50 leading-relaxed text-justify hyphens-none font-montserrat laydesk2-audience-card-text">
        {/* conteúdo */}
      </p>
    </div>
  </div>
</div>
```

---

## Referências

- **Documentação de layouts:** `docs/03-LAYOUTS.md`
- **Documentação similar:** `docs/04-resp-laydesk2sec3.md` (Seção "Nossos Serviços")
- **Arquivo principal de estilos:** `app/globals.css`
- **Seção "Regiões Atendidas":** `components/audience.tsx`

