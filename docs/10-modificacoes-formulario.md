# Modificações: Seção de Formulário (laydesk2)

## Objetivo

Ajustar a seção de formulário de contato para o layout **laydesk2** (1368×768), garantindo que:
- A seção tenha altura de **1viewport - menu** (`calc(100vh - 4rem)`)
- O conteúdo seja **reduzido proporcionalmente** para caber na altura disponível
- **Não modificar** nenhum dos demais layouts (desktop ou mobile)

---

## Problema Identificado

### Estado Atual
- Seção com `min-h-[calc(100vh-4rem)]` (altura mínima, não fixa)
- Conteúdo maior que a altura disponível no laydesk2
- Overflow vertical
- Padding e espaçamentos muito grandes para a resolução
- Font sizes não otimizados

### Solução Proposta
- Altura fixa: `h-[calc(100vh-4rem)]`
- Redução proporcional de:
  - Padding e margins
  - Gaps entre elementos
  - Font sizes
  - Altura de inputs e textarea
  - Espaçamento do formulário

---

## Estrutura do Componente

### Arquivo: `components/contact.tsx`

A seção contém:
1. **Section principal** (`<section id="contato">`)
2. **Container interno** (`<div>` com max-width)
3. **Título h2** ("Leve a Estação do Grão para seu Evento")
4. **Parágrafo descritivo**
5. **Grid 2 colunas** (lg:grid-cols-2):
   - **Coluna 1:** Métodos de contato (WhatsApp, E-mail, Redes sociais)
   - **Coluna 2:** Formulário de contato

### Elementos do Formulário:
- Input: Nome
- RadioGroup: Tipo de Evento (Pessoal/Empresarial)
- Input: Tipo de Evento (condicional)
- Input: Telefone
- Input: E-mail
- Textarea: Descrição do Evento
- Checkbox: Privacidade
- Mensagens de status (success, error, rate_limit, validation_error)
- Button: Enviar Mensagem

---

## Modificações no CSS

### Arquivo: `app/globals.css`

Adicionar no bloco `@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px)`:

```css
/* ============================================
   SEÇÃO "FORMULÁRIO DE CONTATO" - Correções laydesk2
   ============================================ */

/* 1. Section: Altura fixa viewport menos menu */
section#contato {
  height: calc(100vh - 4rem) !important;
  min-height: calc(100vh - 4rem) !important;
  max-height: calc(100vh - 4rem) !important;
  padding-top: 0.75rem !important;
  padding-bottom: 0.75rem !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}

/* 2. Container interno: Reduzir padding */
section#contato > div {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
}

/* 3. Título h2: Reduzir tamanho e margin */
section#contato h2 {
  font-size: 1.25rem !important;
  line-height: 1.5rem !important;
  margin-bottom: 0.5rem !important;
}

/* 4. Parágrafo descritivo: Reduzir tamanho e margin */
section#contato > div > p {
  font-size: 0.75rem !important;
  line-height: 1.125rem !important;
  margin-bottom: 0.75rem !important;
}

/* 5. Grid: Reduzir gap */
section#contato .grid {
  gap: 0.75rem !important;
}

/* 6. Coluna de Métodos de Contato: Reduzir espaçamento */
section#contato .space-y-3,
section#contato .space-y-4 {
  gap: 0.5rem !important;
}

section#contato .space-y-3 > * + *,
section#contato .space-y-4 > * + * {
  margin-top: 0.5rem !important;
}

/* 7. Título "Entre em Contato": Reduzir tamanho */
section#contato h3 {
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
  margin-bottom: 0.5rem !important;
}

/* 8. Cards de Contato (WhatsApp/E-mail): Reduzir padding */
section#contato a[href*="wa.me"],
section#contato button[type="button"] {
  padding: 0.5rem !important;
}

section#contato a[href*="wa.me"] svg,
section#contato button[type="button"] svg {
  width: 0.875rem !important;
  height: 0.875rem !important;
}

section#contato a[href*="wa.me"] p,
section#contato button[type="button"] p {
  font-size: 0.625rem !important;
  line-height: 0.875rem !important;
}

/* 9. Container de Atendimento/Redes: Reduzir padding */
section#contato .p-2,
section#contato .p-4 {
  padding: 0.5rem !important;
}

section#contato .p-2 > *,
section#contato .p-4 > * {
  gap: 0.375rem !important;
}

/* 10. Textos de Atendimento: Reduzir tamanho */
section#contato .p-2 p,
section#contato .p-4 p {
  font-size: 0.625rem !important;
  line-height: 0.875rem !important;
  margin-bottom: 0.25rem !important;
}

/* 11. Redes Sociais: Reduzir padding e tamanho de ícones */
section#contato a[href*="instagram"],
section#contato a[href*="facebook"],
section#contato a[href*="youtube"] {
  padding: 0.5rem !important;
}

section#contato a[href*="instagram"] svg,
section#contato a[href*="facebook"] svg,
section#contato a[href*="youtube"] svg {
  width: 0.875rem !important;
  height: 0.875rem !important;
}

/* 12. Formulário: Reduzir espaçamento entre campos */
section#contato form {
  gap: 0.5rem !important;
}

section#contato form > * + * {
  margin-top: 0.5rem !important;
}

/* 13. Labels: Reduzir tamanho e margin */
section#contato label {
  font-size: 0.625rem !important;
  line-height: 0.875rem !important;
  margin-bottom: 0.25rem !important;
}

/* 14. Inputs: Reduzir altura e padding */
section#contato input[type="text"],
section#contato input[type="tel"],
section#contato input[type="email"] {
  height: 1.75rem !important;
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
  padding-left: 0.5rem !important;
  padding-right: 0.5rem !important;
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}

/* 15. Textarea: Reduzir altura mínima e padding */
section#contato textarea {
  min-height: 3rem !important;
  padding: 0.375rem 0.5rem !important;
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}

/* 16. RadioGroup: Reduzir gap e tamanho */
section#contato .flex.gap-6 {
  gap: 1rem !important;
}

section#contato .flex.gap-2 {
  gap: 0.375rem !important;
}

section#contato input[type="radio"] {
  width: 0.875rem !important;
  height: 0.875rem !important;
}

section#contato label[for*="eventType"] {
  font-size: 0.625rem !important;
  line-height: 0.875rem !important;
}

/* 17. Checkbox: Reduzir tamanho */
section#contato input[type="checkbox"] {
  width: 0.875rem !important;
  height: 0.875rem !important;
  margin-top: 0.125rem !important;
}

section#contato label[for="privacy"] {
  font-size: 0.625rem !important;
  line-height: 0.875rem !important;
}

/* 18. Mensagens de Status: Reduzir padding e font size */
section#contato .p-4 {
  padding: 0.5rem !important;
  font-size: 0.625rem !important;
  line-height: 0.875rem !important;
}

section#contato .p-4 p {
  font-size: 0.625rem !important;
  line-height: 0.875rem !important;
  margin-bottom: 0.25rem !important;
}

section#contato .p-4 ul {
  margin-top: 0.25rem !important;
  padding-left: 1rem !important;
}

section#contato .p-4 li {
  font-size: 0.625rem !important;
  line-height: 0.875rem !important;
  margin-bottom: 0.125rem !important;
}

/* 19. Button: Reduzir padding e font size */
section#contato button[type="submit"] {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
  font-size: 0.75rem !important;
  line-height: 1rem !important;
}

/* 20. Scrollbar customizada (se necessário) */
section#contato::-webkit-scrollbar {
  width: 6px;
}

section#contato::-webkit-scrollbar-track {
  background: rgba(42, 34, 30, 0.3);
  border-radius: 10px;
}

section#contato::-webkit-scrollbar-thumb {
  background: rgba(196, 142, 84, 0.6);
  border-radius: 10px;
}

section#contato {
  scrollbar-width: thin;
  scrollbar-color: rgba(196, 142, 84, 0.6) rgba(42, 34, 30, 0.3);
}
```

---

## Resumo das Reduções

### Altura e Padding
| Elemento | Antes | Depois (laydesk2) |
|----------|-------|-------------------|
| Section | `min-h-[calc(100vh-4rem)]` | `h-[calc(100vh-4rem)]` (fixo) |
| Section padding | `py-8 sm:py-4 lg:py-6` | `py-0.75rem` |
| Container padding | `py-4 sm:py-0 lg:py-0` | `py-0.5rem` |

### Tipografia
| Elemento | Antes | Depois (laydesk2) |
|----------|-------|-------------------|
| h2 | `text-center mb-4 sm:mb-3` | `1.25rem / 1.5rem, mb-0.5rem` |
| Parágrafo | `text-xs sm:text-base mb-10 sm:mb-4` | `0.75rem / 1.125rem, mb-0.75rem` |
| h3 | `text-lg lg:text-xl` | `0.875rem / 1.25rem` |
| Labels | `text-xs` | `0.625rem / 0.875rem` |
| Inputs | `h-8` | `h-1.75rem` (0.75rem font) |
| Textarea | `min-h-20` | `min-h-3rem` (0.75rem font) |
| Button | `py-2.5` | `py-0.5rem` (0.75rem font) |

### Espaçamentos
| Elemento | Antes | Depois (laydesk2) |
|----------|-------|-------------------|
| Grid gap | `gap-8 sm:gap-4` | `gap-0.75rem` |
| Form space-y | `space-y-2` | `gap-0.5rem` |
| Cards padding | `p-2.5 lg:p-4` | `p-0.5rem` |
| Ícones | `w-4 h-4 lg:w-5 lg:h-5` | `w-0.875rem h-0.875rem` |

---

## Aplicação das Classes

### Opção 1: Apenas CSS (Recomendado)

**Não é necessário modificar o componente `contact.tsx`**. As regras CSS usarão seletores específicos que funcionam com a estrutura atual.

### Opção 2: Adicionar Classes (Alternativa)

Se os seletores CSS não funcionarem perfeitamente, pode-se adicionar classes específicas no componente:

```tsx
<section 
  id="contato" 
  className="min-h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] flex flex-col justify-center bg-coffee-900 py-8 sm:py-4 lg:py-6 overflow-hidden w-full laydesk2-contact-section"
>
  <div className="w-full max-w-[100vw] sm:max-w-4xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-0 lg:py-0 box-border laydesk2-contact-container">
    {/* ... resto do conteúdo ... */}
  </div>
</section>
```

E então usar classes no CSS:
```css
.laydesk2-contact-section {
  /* regras aqui */
}

.laydesk2-contact-container {
  /* regras aqui */
}
```

**Recomendação:** Tentar primeiro apenas com CSS (Opção 1). Se necessário, adicionar classes (Opção 2).

---

## Comportamento Esperado

### Antes (Problema)
- Seção com altura mínima (pode crescer)
- Conteúdo maior que a viewport
- Overflow vertical
- Elementos muito espaçados
- Font sizes grandes

### Depois (laydesk2)
- Seção com altura fixa `calc(100vh - 4rem)`
- Conteúdo reduzido proporcionalmente
- Scroll suave se necessário
- Elementos compactos mas legíveis
- Font sizes otimizados
- Tudo cabe na altura disponível

---

## Testes Necessários

### Desktop (laydesk2 - 1368×768)
- ✅ Seção tem altura exata de `calc(100vh - 4rem)`
- ✅ Conteúdo cabe na altura disponível
- ✅ Scroll funciona se necessário
- ✅ Todos os campos do formulário visíveis
- ✅ Botões e inputs clicáveis
- ✅ Textos legíveis
- ✅ Layout não quebra

### Outros Layouts
- ✅ Desktop 1920×1080: Sem mudanças
- ✅ Desktop 1600×900: Sem mudanças
- ✅ Desktop 1280×720: Sem mudanças
- ✅ Mobile: Sem mudanças

---

## Notas Importantes

- **Apenas laydesk2:** Todas as regras dentro do media query específico
- **Conteúdo preservado:** Nenhum campo removido
- **Funcionalidade intacta:** Formulário continua funcionando normalmente
- **Acessibilidade:** Labels e inputs mantêm relação semântica
- **Scroll:** Se necessário, scrollbar customizada estilizada

---

## Implementação

### Passos:

1. **Abrir `app/globals.css`**
2. **Localizar o bloco `@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px)`**
3. **Adicionar todas as regras CSS fornecidas acima**
4. **Salvar e testar**

### Verificação:

Após implementar, verificar:
- Seção tem altura correta
- Conteúdo cabe na viewport
- Elementos não estão sobrepostos
- Formulário funciona normalmente
- Outros layouts não foram afetados

---

## Comparação Visual

### Antes (Problema)
```
┌─────────────────────────────────┐
│  Título                         │
│  Descrição                      │
│                                 │
│  [Contato]  [Formulário]       │
│                                 │
│  [Redes]    [Campos...]        │
│                                 │
│  [Mais conteúdo...]             │ ← Overflow!
│                                 │
└─────────────────────────────────┘
```

### Depois (laydesk2)
```
┌─────────────────────────────────┐
│  Título (menor)                │
│  Descrição (menor)              │
│  [Contato]  [Formulário]       │
│  (compacto)  (compacto)        │
│  [Redes]    [Campos...]        │
│  (compacto)  (compacto)        │
│  [Button]                      │
│  ───────────────────────────── │ ← Tudo cabe!
└─────────────────────────────────┘
```

---

**Documentação criada em:** 26/12/2025  
**Status:** Aguardando autorização para implementação

