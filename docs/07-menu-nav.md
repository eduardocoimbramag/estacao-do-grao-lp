# Documentação: Navegação do Menu com Scroll Suave

## 📋 Visão Geral

Este documento descreve a implementação da navegação funcional do menu header com animação de deslizamento suave para as seções da landing page.

## 🎯 Objetivos

1. **Funcionalidade dos Botões do Menu**: Fazer com que os botões naveguem corretamente para as seções especificadas
2. **Animação de Scroll Suave**: Implementar animação moderna e fluida ao clicar nos botões
3. **Mapeamento Correto**: Garantir que cada botão aponte para a seção correta conforme especificado

## 📍 Mapeamento de Navegação

| Botão do Menu | Seção de Destino | ID da Seção | Status Atual |
|--------------|------------------|-------------|--------------|
| **Sobre** | "O que é a Estação do Grão?" (2ª seção) | `apresentacao` | ⚠️ Precisa ajuste (atualmente aponta para `sobre`) |
| **Serviços** | "Nossos Serviços" (3ª seção) | `nossos-servicos` | ✅ Já configurado corretamente |
| **Diferenciais** | Split Screen (5ª seção) | `diferencias` | ⚠️ Precisa adicionar ID na seção |
| **Contato** | Formulário (6ª seção) | `contato` | ✅ Já configurado corretamente |

## 🔍 Análise da Estrutura Atual

### Arquivo: `components/header.tsx`

**Função atual de scroll:**
```typescript
const scrollToSection = (id: string) => {
  setIsOpen(false)
  const element = document.getElementById(id)
  element?.scrollIntoView({ behavior: "smooth" })
}
```

**Problemas identificados:**
1. Botão "Sobre" está apontando para `id="sobre"`, mas a seção correta é `id="apresentacao"`
2. Função de scroll usa `scrollIntoView` básico - pode ser melhorada com offset para header fixo
3. Não há tratamento de erro caso a seção não exista

### Arquivo: `components/split-screen-content.tsx`

**Problema identificado:**
- A seção Split Screen não possui `id="diferencias"` no elemento `<section>`
- Precisa adicionar: `<section id="diferencias" className="...">`

### Arquivo: `app/page.tsx`

**Estrutura de seções:**
1. `Hero` - Sem ID (não precisa)
2. `OpenMenuIntro` - `id="apresentacao"` ✅
3. `ServicesCarousel` - `id="nossos-servicos"` ✅
4. `Audience` - Sem ID (não precisa de navegação)
5. `SplitScreenContent` - ⚠️ **Falta ID**
6. `Contact` - `id="contato"` ✅

## 🛠️ Implementação Proposta

### 1. Atualizar Função de Scroll no Header

**Localização:** `components/header.tsx`

**Mudanças:**

1. **Melhorar a função `scrollToSection`** para:
   - Calcular offset do header fixo (altura ~64px)
   - Adicionar delay para fechar menu mobile antes do scroll
   - Melhorar a animação com easing customizado
   - Adicionar tratamento de erro

```typescript
const scrollToSection = (id: string) => {
  // Fechar menu mobile
  setIsOpen(false)
  
  // Pequeno delay para garantir que o menu feche antes do scroll
  setTimeout(() => {
    const element = document.getElementById(id)
    
    if (element) {
      const headerOffset = 64 // Altura do header fixo
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    } else {
      console.warn(`Seção com id "${id}" não encontrada`)
    }
  }, isOpen ? 300 : 0) // Delay apenas se menu estiver aberto
}
```

### 2. Atualizar Botão "Sobre" no Header

**Mudança:** Alterar `scrollToSection("sobre")` para `scrollToSection("apresentacao")`

**Localizações:**
- Desktop navigation (linha ~42)
- Mobile navigation (linha ~90)

### 3. Adicionar ID na Seção Split Screen

**Arquivo:** `components/split-screen-content.tsx`

**Linha ~179:** Adicionar `id="diferencias"` no elemento `<section>`

```typescript
<section 
  id="diferencias"
  className="h-[calc(100vh-4rem)] bg-coffee-700 overflow-hidden w-full"
>
```

### 4. Melhorar Animação de Scroll (Opcional - Avançado)

**Alternativa mais moderna usando CSS Scroll Behavior + JavaScript:**

```typescript
const scrollToSection = (id: string) => {
  setIsOpen(false)
  
  setTimeout(() => {
    const element = document.getElementById(id)
    
    if (element) {
      const headerOffset = 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      // Usar requestAnimationFrame para animação mais suave
      const startPosition = window.pageYOffset
      const distance = offsetPosition - startPosition
      const duration = 800 // ms
      let start: number | null = null

      // Função de easing (ease-in-out-cubic)
      const easeInOutCubic = (t: number): number => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))
        
        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }, isOpen ? 300 : 0)
}
```

**Nota:** A versão simples com `scrollTo({ behavior: "smooth" })` já funciona bem na maioria dos navegadores modernos. A versão customizada oferece mais controle, mas pode ser considerada over-engineering.

## 📝 Checklist de Implementação

- [ ] **Atualizar função `scrollToSection`** em `components/header.tsx`
  - [ ] Adicionar cálculo de offset do header
  - [ ] Adicionar delay para fechar menu mobile
  - [ ] Melhorar tratamento de erros

- [ ] **Corrigir botão "Sobre"** em `components/header.tsx`
  - [ ] Desktop: Mudar de `"sobre"` para `"apresentacao"` (linha ~42)
  - [ ] Mobile: Mudar de `"sobre"` para `"apresentacao"` (linha ~90)

- [ ] **Adicionar ID na seção Split Screen** em `components/split-screen-content.tsx`
  - [ ] Adicionar `id="diferencias"` no elemento `<section>` (linha ~179)

- [ ] **Testar navegação**
  - [ ] Testar botão "Sobre" → deve ir para "O que é a Estação do Grão?"
  - [ ] Testar botão "Serviços" → deve ir para "Nossos Serviços"
  - [ ] Testar botão "Diferenciais" → deve ir para Split Screen
  - [ ] Testar botão "Contato" → deve ir para formulário
  - [ ] Testar em desktop
  - [ ] Testar em mobile
  - [ ] Verificar que scroll para corretamente considerando header fixo

## 🎨 Considerações de UX

1. **Offset do Header**: O header é fixo com ~64px de altura. O scroll deve parar ~64px antes da seção para que o título não fique oculto pelo header.

2. **Menu Mobile**: Quando o menu mobile está aberto e o usuário clica em um item, o menu deve fechar antes do scroll começar para evitar conflitos visuais.

3. **Animação Suave**: Usar `behavior: "smooth"` do CSS é suficiente e bem suportado. Animações customizadas com JavaScript podem ser adicionadas se necessário.

4. **Acessibilidade**: Manter os botões como `<button>` elementos e não `<a>` tags, já que não são links reais de navegação.

## 🔧 Detalhes Técnicos

### Estrutura de IDs das Seções

```typescript
// Ordem das seções na página:
1. Hero (sem ID - não navegável)
2. OpenMenuIntro → id="apresentacao" ✅
3. ServicesCarousel → id="nossos-servicos" ✅
4. Audience (sem ID - não navegável)
5. SplitScreenContent → id="diferencias" ⚠️ PRECISA ADICIONAR
6. Contact → id="contato" ✅
```

### Altura do Header

O header tem altura variável:
- Desktop: ~64px (`h-16`)
- Mobile: altura varia quando menu está aberto

**Recomendação:** Usar `64px` como offset fixo, que funciona bem tanto em desktop quanto mobile.

## 📚 Referências

- [MDN: scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
- [MDN: scrollTo](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo)
- [CSS Scroll Behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)

## ✅ Após Implementação

Após a implementação, verificar:

1. ✅ Todos os botões do menu funcionam corretamente
2. ✅ Scroll para corretamente considerando header fixo
3. ✅ Animação é suave e moderna
4. ✅ Menu mobile fecha antes do scroll
5. ✅ Funciona em todos os navegadores modernos (Chrome, Firefox, Safari, Edge)
6. ✅ Funciona bem em dispositivos móveis

---

**Data de criação:** 2024
**Status:** 📝 Aguardando aprovação para implementação
