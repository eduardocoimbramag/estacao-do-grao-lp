# Modificações: Seção de Formulário (laydesk3)

## Objetivo

Ajustar a seção de formulário de contato para o layout **laydesk3** (1280×720), garantindo que:
- O **tamanho da section permaneça inalterado** (já está perfeito)
- Apenas o **CSS do conteúdo seja modificado** para evitar que o conteúdo fique cortado
- Redução de espaçamentos e font sizes para otimizar o espaço disponível
- **Não modificar** nenhum dos demais layouts (laydesk1, laydesk2, mobile)

---

## Problema Identificado

### Estado Atual
- Conteúdo da seção está sendo cortado na resolução 1280×720
- Título h2 está quebrando linha na palavra "Evento"
- Espaçamentos entre elementos muito grandes para a altura disponível
- Padding dos cards da coluna esquerda muito grande
- Labels dos checkboxes "Pessoal" e "Empresarial" com tamanho diferente dos outros labels

### Solução Proposta
- **Manter o tamanho da section inalterado** (altura fixa já está correta)
- Reduzir font-size do título h2 para evitar quebra de linha
- Reduzir espaçamento entre título e subtítulo
- Reduzir espaçamento entre os cards da coluna esquerda
- Reduzir padding dos cards da coluna esquerda
- Igualar tamanho da fonte dos labels "Pessoal" e "Empresarial" aos outros labels (text-xs = 0.75rem)

---

## Estrutura do Componente

### Arquivo: `components/contact.tsx`

A seção contém:
1. **Section principal** (`<section id="contato">`)
2. **Container interno** (`<div>` com max-width)
3. **Título h2** ("Leve a Estação do Grão para seu Evento") - **está quebrando na palavra "Evento"**
4. **Parágrafo descritivo** (subtítulo)
5. **Grid 2 colunas** (lg:grid-cols-2):
   - **Coluna 1 (esquerda):** Métodos de contato (WhatsApp, E-mail, Redes sociais) - **cards com espaçamento e padding grandes**
   - **Coluna 2 (direita):** Formulário de contato com RadioGroup "Pessoal"/"Empresarial"

### Elementos que serão ajustados:

#### Coluna Esquerda:
- Card WhatsApp
- Card E-mail  
- Card Atendimento/Redes Sociais

#### Coluna Direita:
- RadioGroup com labels "Pessoal" e "Empresarial" (linhas 327 e 333 de contact.tsx)
- Labels dos campos do formulário (usam `text-xs` = 0.75rem)

---

## Modificações no CSS

### Arquivo: `app/globals.css`

Adicionar no bloco `@media (min-width: 1024px) and (max-height: 767px)`:

```css
/* ============================================
   SEÇÃO "FORMULÁRIO DE CONTATO" - Correções laydesk3
   ============================================ */

/* 1. Título h2: Reduzir tamanho da fonte para evitar quebra na palavra "Evento" */
section#contato h2 {
  font-size: 1.75rem !important; /* Redução para evitar quebra na palavra "Evento" (em laydesk2 é 2.25rem) */
  line-height: 1.25rem !important;
  margin-bottom: 0.5rem !important; /* Reduzir também o margin-bottom para diminuir espaço com o subtítulo */
}

/* 2. Parágrafo descritivo (subtítulo): Reduzir margin-bottom para diminuir espaçamento após o título */
section#contato > div > p {
  margin-bottom: 0.5rem !important; /* Reduzir espaçamento entre título e subtítulo (de mb-4 = 1rem para 0.5rem) */
}

/* 3. Coluna esquerda - Espaçamento entre cards: Reduzir gap do container space-y-3/space-y-4 */
section#contato .space-y-3 > * + *,
section#contato .space-y-4 > * + * {
  margin-top: 0.625rem !important; /* Redução do espaçamento entre os cards (de lg:space-y-4 = 1rem para 0.625rem) */
}

/* 4. Coluna esquerda - Cards (WhatsApp/E-mail): Reduzir padding */
section#contato a[href*="wa.me"],
section#contato button[type="button"] {
  padding: 0.625rem !important; /* Redução do padding interno dos cards (de lg:p-4 = 1rem para 0.625rem) */
}

/* 5. Coluna esquerda - Card Atendimento/Redes: Reduzir padding */
section#contato .p-2,
section#contato .p-4 {
  padding: 0.625rem !important; /* Redução do padding interno do card (de lg:p-4 = 1rem para 0.625rem) */
}

/* 6. Formulário - Labels dos RadioGroup "Pessoal" e "Empresarial": Igualar ao tamanho dos outros labels (text-xs = 0.75rem) */
section#contato label[for="eventType-pessoal"],
section#contato label[for="eventType-empresarial"] {
  font-size: 0.75rem !important; /* text-xs = 0.75rem - igual aos outros labels */
  line-height: 1rem !important;
}
```

---

## Detalhamento das Modificações

### 1. Redução do Título h2
- **Problema:** Título quebrando linha na palavra "Evento"
- **Solução:** Reduzir `font-size` para `1.75rem` (aproximadamente 20-25% menor que o tamanho atual)
- **Resultado:** Título ficará em uma linha, ocupando menos espaço vertical

### 2. Redução do Espaçamento entre Título e Subtítulo
- **Problema:** Espaçamento muito grande entre h2 e parágrafo descritivo
- **Solução:** Adicionar `margin-top: 0.5rem` no parágrafo para reduzir o espaço
- **Resultado:** Elementos mais próximos, economizando espaço vertical

### 3. Redução do Espaçamento entre Cards da Coluna Esquerda
- **Problema:** Espaçamento muito grande entre os cards (WhatsApp, E-mail, Atendimento/Redes)
- **Solução:** Reduzir `margin-top` dos elementos filhos de `.space-y-3` e `.space-y-4` para `0.75rem`
- **Resultado:** Cards mais próximos, ocupando menos espaço vertical

### 4. Redução do Padding dos Cards da Coluna Esquerda
- **Problema:** Padding interno dos cards muito grande
- **Solução:** Reduzir `padding` dos cards WhatsApp/E-mail e do card Atendimento/Redes para `0.625rem`
- **Resultado:** Cards mais compactos, conteúdo ocupa menos espaço

### 5. Igualar Tamanho da Fonte dos Labels "Pessoal" e "Empresarial"
- **Problema:** Labels dos radio buttons com tamanho diferente dos outros labels do formulário
- **Solução:** Aplicar `font-size: 0.75rem` (equivalente a `text-xs`) nos labels `for="eventType-pessoal"` e `for="eventType-empresarial"`
- **Resultado:** Consistência visual com os outros labels do formulário

---

## Estrutura do Media Query

O código deve ser inserido dentro do bloco existente:

```css
@media (min-width: 1024px) and (max-height: 767px) {
  /* ... código existente do laydesk3 ... */
  
  /* ============================================
     SEÇÃO "FORMULÁRIO DE CONTATO" - Correções laydesk3
     ============================================ */
  
  /* ... código das modificações acima ... */
}
```

---

## Notas Importantes

- **Apenas laydesk3:** Todas as regras dentro do media query específico `@media (min-width: 1024px) and (max-height: 767px)`
- **Tamanho da section preservado:** A altura da section (`calc(100vh - 4rem)`) **NÃO deve ser alterada**
- **Apenas CSS do conteúdo:** Modificações apenas em espaçamentos, padding e font sizes dos elementos internos
- **Conteúdo preservado:** Nenhum campo removido ou modificado estruturalmente
- **Funcionalidade intacta:** Formulário continua funcionando normalmente
- **Acessibilidade:** Labels e inputs mantêm relação semântica

---

## Testes Necessários

### Desktop (laydesk3 - 1280×720)
- ✅ Título h2 não quebra mais na palavra "Evento"
- ✅ Espaçamento entre título e subtítulo reduzido
- ✅ Espaçamento entre cards da coluna esquerda reduzido
- ✅ Padding dos cards da coluna esquerda reduzido
- ✅ Labels "Pessoal" e "Empresarial" com mesmo tamanho dos outros labels (text-xs)
- ✅ Conteúdo não está mais cortado
- ✅ Todos os campos do formulário visíveis
- ✅ Botões e inputs clicáveis
- ✅ Textos legíveis
- ✅ Layout não quebra

### Outros Layouts (Verificação de não-regressão)
- ✅ Desktop 1920×1080 (laydesk1): Sem mudanças
- ✅ Desktop 1368×768 (laydesk2): Sem mudanças
- ✅ Desktop 1600×900 (laydesk1): Sem mudanças
- ✅ Mobile: Sem mudanças

---

## Checklist de Implementação

Antes de implementar, verificar:
- [ ] Entender que o tamanho da section **NÃO deve ser alterado**
- [ ] Confirmar que as modificações são apenas no CSS do conteúdo interno
- [ ] Verificar que o media query correto é `@media (min-width: 1024px) and (max-height: 767px)`
- [ ] Garantir que nenhuma alteração será feita em outros layouts

Após implementar, verificar:
- [ ] Título h2 não quebra mais na palavra "Evento"
- [ ] Espaçamento entre título e subtítulo reduzido
- [ ] Espaçamento entre cards da coluna esquerda reduzido
- [ ] Padding dos cards da coluna esquerda reduzido
- [ ] Labels "Pessoal" e "Empresarial" com tamanho igual aos outros labels (0.75rem)
- [ ] Conteúdo não está mais cortado na resolução 1280×720
- [ ] Nenhuma alteração foi feita em outros layouts (laydesk1, laydesk2, mobile)
- [ ] Funcionalidade do formulário continua intacta
- [ ] Testes visuais realizados em 1280×720

---

## Referências

- Documentação similar: `docs/10-modificacoes-formulario.md` (laydesk2)
- Componente: `components/contact.tsx`
- CSS: `app/globals.css` (media query laydesk3 - linha ~873)
- Definição de layouts: `docs/03-LAYOUTS.md`

