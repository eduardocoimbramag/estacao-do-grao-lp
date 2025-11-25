# 22 — Alinhamento do Título da Página Inicial (Hero) sem Quebra de Linha

## 📋 Objetivo

Garantir que o título **“CAFÉ GOURMET E BARISTAS PARA EVENTOS”** fique **visualmente como uma única linha**, centralizado, **sem quebrar em duas linhas** e **sem ultrapassar os limites laterais** definidos pelo início do slideshow (esquerda) e pelo final da caixa de texto (direita).

Ou seja:
- Manter o título grande e em destaque
- Impedir que as letras finais de **“EVENTOS”** “saiam” para fora da área de conteúdo
- Evitar a quebra em duas linhas (como está agora)

---

## 🎨 Especificações de Design

### Estado Atual (Depois da Correção com Quebra)

Visual aproximado do que você tem hoje (com quebra em duas linhas):

```
┌─────────────────────────────────────────────────────────────┐
│         CAFÉ GOURMET E BARISTAS PARA                        │
│                        EVENTOS                              │
│                                                             │
│  ┌──────────────┐  ┌──────────────────────────────┐        │
│  │  Slideshow   │  │  Caixa de texto + cards      │        │
│  └──────────────┘  └──────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

**Características atuais**:
- Título H1:
  - Está centralizado (`text-center`)
  - Está com `break-words`, permitindo quebra em duas linhas
  - Não ultrapassa o limite lateral, mas **perde a sensação de “uma linha única”**
- Globalmente, o `h1` recebe tamanho grande de fonte via `app/globals.css`:

```css
h1 {
  @apply text-4xl md:text-5xl lg:text-6xl leading-tight;
}
```

Isso significa que, mesmo sem classes `text-...` no componente, o título continua muito grande.

### Estado Desejado (Título em “Linha Única” sem Ultrapassar)

Objetivo visual:

```
┌─────────────────────────────────────────────────────────────┐
│   CAFÉ GOURMET E BARISTAS PARA EVENTOS                      │
│   ↑ início slideshow              ↑ final caixa de texto    │
│                                                             │
│  ┌──────────────┐  ┌──────────────────────────────┐        │
│  │  Slideshow   │  │  Caixa de texto + cards      │        │
│  └──────────────┘  └──────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

**Requisitos visuais**:
- Título deve:
  - **Caber inteiro** dentro da largura útil (entre as “linhas amarelas” que você marcou)
  - **Não quebrar em duas linhas**
  - **Não ser cortado** (sem overflow para fora da área marrom)
- A solução deve ser **responsiva**, ajustando o tamanho da fonte conforme a largura da tela.

---

## 🔧 Estratégia de Implementação

Para conseguir um título que:
- Fique **sempre em uma linha**, e
- **Nunca passe** da largura disponível,

vamos combinar três coisas:

1. **Forçar linha única** com `whitespace-nowrap`
2. **Sobrescrever o tamanho do `h1` global** usando uma classe `text-[clamp(...)]` no próprio componente `Hero`
3. **Remover `break-words`** (que hoje está permitindo a quebra em duas linhas)

### Por que usar `clamp()`?

O `clamp()` permite definir um tamanho de fonte responsivo com:

```css
font-size: clamp(valor_mínimo, valor_fluid, valor_máximo);
```

Exemplo em Tailwind (`text-[clamp(2.2rem,3vw,3.1rem)]`):
- `2.2rem` → tamanho mínimo (telas pequenas)
- `3vw` → tamanho fluido baseado na largura da viewport
- `3.1rem` → limite máximo (telas grandes), garantindo que o texto **não passe** dos limites.

---

## 🔧 Implementação Técnica (Planejada)

> **Importante:** este arquivo é apenas documentação.  
> Nada disso foi aplicado ainda — só será implementado quando você autorizar.

### Passo 1 — Sobrescrever o tamanho do `h1` no `Hero`

**Arquivo**: `components/hero/Hero.tsx`

**Estado atual do título** (após as últimas mudanças):

```tsx
<h1 className="font-montserrat text-cream-50 font-bold tracking-normal text-center mb-8 md:mb-10 lg:mb-12 uppercase break-words">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Ação planejada**:
1. Remover `break-words`
2. Adicionar `whitespace-nowrap` para manter tudo em **uma linha**
3. Adicionar uma classe de fonte responsiva com `clamp` para controlar o tamanho máximo

**Código proposto**:

```tsx
<h1
  className="
    font-montserrat text-cream-50 font-bold
    tracking-tight text-center
    mb-8 md:mb-10 lg:mb-12
    uppercase whitespace-nowrap
    text-[clamp(1.9rem,3vw,3rem)]
  "
>
  Café Gourmet e Baristas para Eventos
</h1>
```

**Explicação dos valores sugeridos**:
- `1.9rem` → garante legibilidade em telas menores, sem ficar minúsculo
- `3vw` → escala suavemente com a largura da tela
- `3rem` → **limite máximo** de tamanho para evitar que o título extrapole a largura útil

> **Obs.:** esses valores podem precisar de um pequeno ajuste fino depois que forem aplicados, olhando na tela real. A ideia é começar próximo do ideal e ajustar `3rem` (máximo) para mais ou para menos até o encaixe ficar perfeito.

### Passo 2 — Confirmar a interação com o estilo global de `h1`

**Arquivo**: `app/globals.css`

Trecho relevante:

```css
h1 {
  @apply text-4xl md:text-5xl lg:text-6xl leading-tight;
}
```

Quando usamos `text-[clamp(...)]` diretamente no componente:
- O Tailwind gera uma **regra mais específica** para aquele elemento
- Essa regra local **sobrescreve** o `text-4xl/md:text-5xl/lg:text-6xl` global

Ou seja:
- Não é necessário remover ou mudar o `h1` global
- Basta garantir que o `Hero` use `text-[clamp(...)]` no seu `<h1>`

### Passo 3 — Ajuste Fino Visual (Após Implementação)

Depois de aplicar o código proposto, será necessário:

1. Abrir o site em **desktop** (largura máxima que você considera importante)
2. Verificar se o título:
   - Cabe inteiro **entre o início do slideshow e o final da DIV de texto**
   - Não quebra linha
   - Não “encosta demais” nas bordas
3. Se ainda estiver muito próximo da borda direita:
   - Reduzir levemente o valor máximo do `clamp`, por exemplo:

   ```tsx
   text-[clamp(1.9rem,3vw,2.8rem)]
   ```

4. Se sobrar muito espaço (título parecer pequeno demais):
   - Aumentar levemente o valor máximo:

   ```tsx
   text-[clamp(1.9rem,3vw,3.2rem)]
   ```

---

## 📝 Resumo das Alterações Planejadas

### Arquivos a Modificar

1. **`components/hero/Hero.tsx`**
   - Linha do `<h1>`:
     - Remover `break-words`
     - Adicionar `whitespace-nowrap`
     - Adicionar `text-[clamp(…)]` para controlar o tamanho máximo da fonte

### Mudanças Planejadas no `<h1>`

| Item                     | Situação Atual                               | Situação Proposta                                      |
|--------------------------|----------------------------------------------|--------------------------------------------------------|
| Quebra de linha         | `break-words` (quebra em duas linhas)        | Removido                                              |
| Forçar linha única      | Não                                          | `whitespace-nowrap`                                   |
| Tamanho da fonte        | Herdado de `h1` global (`text-4xl..6xl`)     | `text-[clamp(1.9rem,3vw,3rem)]` (sobrescreve global)  |
| Alinhamento             | `text-center`                                | Mantido                                               |

---

## ✅ Checklist de Implementação (para quando você autorizar)

- [ ] Atualizar o `<h1>` em `components/hero/Hero.tsx` com a classe `text-[clamp(...)]`
- [ ] Remover `break-words` do `<h1>`
- [ ] Adicionar `whitespace-nowrap` ao `<h1>`
- [ ] Verificar em **desktop** se o título:
  - [ ] Cabe inteiro entre as “linhas amarelas”
  - [ ] Não quebra linha
  - [ ] Não é cortado à direita
- [ ] Verificar em **tablet** (≥ 768px)
- [ ] Verificar em **mobile** (< 768px)
- [ ] Ajustar o valor máximo do `clamp` se necessário

---

## 🔍 Verificação Pós-Implementação

Após aplicar as mudanças:

1. **Desktop (largura máxima que você usa para o layout)**:
   - Título ocupa uma única linha
   - Não ultrapassa o slideshow (esquerda) nem a caixa de texto (direita)
   - Não quebra e não corta

2. **Tablet (entre ~768px e 1024px)**:
   - Título continua em uma linha
   - Se começar a ficar muito apertado, o `clamp` reduz automaticamente o tamanho

3. **Mobile (< 768px)**:
   - Se ainda assim ficar muito grande, o `clamp` limita o tamanho para manter a legibilidade
   - Em casos extremos, se precisar, podemos permitir quebra apenas em mobile (com `sm:whitespace-normal`), mas isso seria uma decisão posterior.

---

## 💡 Notas Finais

- O ajuste fino para “encaixar perfeito” é sempre visual — por isso o uso de `clamp` com um limite máximo ajustável.
- A vantagem dessa abordagem é que você mantém o título **forte, grande e em destaque**, mas **sem nunca estourar a largura da área de conteúdo**.
- Assim que você autorizar, posso aplicar essas mudanças no código do `Hero` e ir ajustando o valor de `clamp` junto com você, olhando o resultado na tela.


