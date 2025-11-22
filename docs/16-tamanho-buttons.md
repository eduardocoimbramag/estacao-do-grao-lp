# 16 — Tamanho Igual dos Botões: Coluna Direita (Seção 4)

## 📋 Objetivo

Fazer com que os dois botões na coluna direita da Seção 4 (`components/audience.tsx`) tenham **exatamente o mesmo tamanho**, mantendo o gap entre eles e preservando o alinhamento atual (topo do primeiro botão com o título, base do segundo botão com o último card).

**Mudanças**:
- **Adicionar `flex-1`**: Aplicar `flex-1` em ambos os botões para que dividam o espaço igualmente
- **Manter gap**: Preservar o `gap-8` entre os botões
- **Manter alinhamento**: Preservar o alinhamento atual (topo alinhado com título, base alinhada com último card)

---

## 🎨 Especificações de Design

### Layout Atual vs Novo

#### ANTES (Tamanhos diferentes)
```
┌─────────────────────────────────────────────┐
├──────────────────┬──────────────────────────┤
│ REGIÕES          │ [Botão Galeria]          │
│ ATENDIDAS        │ (tamanho baseado em      │
│ (título)         │  padding apenas)         │
│                  │                          │
│ [IMAGEM DO        │                          │
│  MAPA]            │                          │
│                  │                          │
│ 📍 [Card 1]       │                          │
│                  │                          │
│ 🧭 [Card 2]       │                          │
│                  │                          │
│ 🌎 [Card 3]       │ [Botão Blog]             │
│ (último card)     │ (flex-1, maior)          │
└──────────────────┴──────────────────────────┘
```

#### DEPOIS (Tamanhos iguais)
```
┌─────────────────────────────────────────────┐
├──────────────────┬──────────────────────────┤
│ REGIÕES          │ [Botão Galeria]          │
│ ATENDIDAS        │ (flex-1, mesmo tamanho)   │
│ (título)         │                          │
│                  │     gap-8                │
│ [IMAGEM DO        │                          │
│  MAPA]            │ [Botão Blog]             │
│                  │ (flex-1, mesmo tamanho)   │
│ 📍 [Card 1]       │                          │
│                  │                          │
│ 🧭 [Card 2]       │                          │
│                  │                          │
│ 🌎 [Card 3]       │                          │
│ (último card)     │                          │
└──────────────────┴──────────────────────────┘
```

### Estratégia de Implementação

#### Solução: Flex-1 em Ambos os Botões

**Como funciona**:
- `flex-1` faz com que cada botão ocupe uma fração igual do espaço disponível
- O espaço é dividido igualmente entre os dois botões
- O `gap-8` (32px) é subtraído do espaço total antes da divisão
- Ambos os botões terão exatamente o mesmo tamanho

**Fórmula**:
```
Espaço total = Altura da coluna esquerda
Espaço para botões = Espaço total - gap-8 (32px)
Tamanho de cada botão = (Espaço para botões) / 2
```

### Estrutura Atual vs Nova

**Botão "Galeria de experiências"** (atual):
```tsx
className="group relative py-12 lg:py-16 ..."
```

**Botão "Galeria de experiências"** (novo):
```tsx
className="group relative flex-1 py-12 lg:py-16 ..."
```

**Botão "Blog"** (atual):
```tsx
className="group relative flex-1 py-12 lg:py-16 ..."
```

**Botão "Blog"** (novo):
```tsx
className="group relative flex-1 py-12 lg:py-16 ..."
```
*(Já tem flex-1, apenas confirmar que está correto)*

---

## 📁 Estrutura de Arquivos

### Arquivo a Modificar

**Arquivo**: `components/audience.tsx`

**Mudanças necessárias**:
1. Adicionar `flex-1` no botão "Galeria de experiências"
2. Confirmar que o botão "Blog" já tem `flex-1`
3. Manter todas as outras classes e propriedades

---

## 💻 Implementação

### Passo 1: Adicionar Flex-1 no Botão "Galeria"

**Estrutura atual**:
```tsx
<Link
  href="#galeria"
  className="group relative py-12 lg:py-16 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
>
```

**Nova estrutura**:
```tsx
<Link
  href="#galeria"
  className="group relative flex-1 py-12 lg:py-16 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
>
```

### Passo 2: Confirmar Botão "Blog"

**Estrutura atual** (já tem flex-1):
```tsx
<Link
  href="/blog"
  className="group relative flex-1 py-12 lg:py-16 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
>
```

**Nova estrutura** (mantém o mesmo):
```tsx
<Link
  href="/blog"
  className="group relative flex-1 py-12 lg:py-16 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
>
```

### Código Completo da Seção (Referência)

```tsx
import Image from "next/image"
import Link from "next/link"
import { MapPin, Globe, Navigation } from "lucide-react"

export default function Audience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Coluna Esquerda: Título + Mapa + Cards */}
          <div className="flex flex-col justify-center items-center gap-2 lg:gap-3">
            {/* ... mantém o mesmo ... */}
          </div>

          {/* Coluna Direita: Botões de Navegação */}
          <div className="flex flex-col justify-start items-stretch gap-8 h-full">
            
            {/* Botão 1: Galeria de experiências */}
            <Link
              href="#galeria"
              className="group relative flex-1 py-12 lg:py-16 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
            >
              <Image
                src="/professional-barista-making-latte-art.jpg"
                alt="Galeria de experiências"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-coffee-900/60 group-hover:bg-coffee-900/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-4">
                  Galeria de experiências
                </h3>
              </div>
            </Link>

            {/* Botão 2: Blog */}
            <Link
              href="/blog"
              className="group relative flex-1 py-12 lg:py-16 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
            >
              <Image
                src="/coffee-station-setup-at-wedding-reception.jpg"
                alt="Blog"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-coffee-900/60 group-hover:bg-coffee-900/50 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-4">
                  Blog
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 📱 Responsividade

### Mobile (< 1024px)

- Grid de **1 coluna**
- Botões aparecem abaixo dos cards
- Ambos os botões têm `flex-1` e dividem o espaço igualmente
- Gap `gap-8` (32px) mantido entre os botões
- Padding vertical: `py-12` (48px) em ambos

### Desktop (≥ 1024px)

- Grid de **2 colunas** (`lg:grid-cols-2`)
- **Alinhamento**: `items-start` mantido
- **Ambos os botões**:
  - `flex-1` faz com que dividam o espaço igualmente
  - Padding vertical: `lg:py-16` (64px)
  - Mesmo tamanho exato
- **Gap**: `gap-8` (32px) mantido entre os botões
- **Container**: `h-full` garante que ocupe altura total da coluna esquerda

**Nota**: Com `flex-1` em ambos os botões, eles dividem o espaço vertical disponível igualmente, considerando o gap entre eles. Isso garante que ambos tenham exatamente o mesmo tamanho.

---

## 🔧 Classes Tailwind Utilizadas

### Container dos Botões
```tsx
className="flex flex-col justify-start items-stretch gap-8 h-full"
```
- **Mantém**: Todas as classes existentes
- **Gap**: `gap-8` (32px) entre os botões
- **Altura**: `h-full` (ocupa altura total)

### Botão "Galeria de experiências"
```tsx
className="group relative flex-1 py-12 lg:py-16 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
```
- **Adiciona**: `flex-1` (divide espaço igualmente)
- **Mantém**: `py-12 lg:py-16` (padding vertical)
- **Mantém**: Todas as outras classes

### Botão "Blog"
```tsx
className="group relative flex-1 py-12 lg:py-16 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
```
- **Mantém**: `flex-1` (já existente)
- **Mantém**: `py-12 lg:py-16` (padding vertical)
- **Mantém**: Todas as outras classes

### Como Funciona o Flex-1

**Com `flex-1` em ambos os botões**:
- O container flex divide o espaço vertical disponível
- Cada botão recebe `flex-grow: 1`, `flex-shrink: 1`, `flex-basis: 0`
- Isso faz com que ambos ocupem exatamente a mesma quantidade de espaço
- O `gap-8` é automaticamente subtraído do espaço total antes da divisão

**Fórmula visual**:
```
Altura total do container = H
Gap entre botões = 32px (gap-8)
Espaço disponível = H - 32px
Tamanho de cada botão = (H - 32px) / 2
```

---

## 📐 Espaçamentos

### Tamanho dos Botões

| Elemento | Antes | Depois | Mudança |
|----------|-------|--------|---------|
| Botão "Galeria" | Tamanho baseado em padding | `flex-1` (metade do espaço) | Adiciona flex-1 |
| Botão "Blog" | `flex-1` (todo espaço restante) | `flex-1` (metade do espaço) | Mantém flex-1 |
| Gap entre botões | `gap-8` (32px) | `gap-8` (32px) | Mantido |

### Padding Vertical

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Botão "Galeria" | `py-12` (48px) | `lg:py-16` (64px) |
| Botão "Blog" | `py-12` (48px) | `lg:py-16` (64px) |

**Nota**: Ambos os botões têm o mesmo padding vertical, garantindo consistência visual.

---

## ♿ Acessibilidade

### Estrutura
- ✅ Mantém hierarquia semântica (`<Link>` e `<h3>`)
- ✅ Estados de foco preservados
- ✅ Navegação por teclado mantida

### Layout
- ✅ Layout responsivo preservado
- ✅ Botões ainda clicáveis e interativos
- ✅ Hover effects mantidos
- ✅ Área clicável adequada em ambos os botões

### Contraste
- ✅ Contraste de cores mantido
- ✅ Texto com drop shadow preservado
- ✅ Overlay escuro mantido

---

## 🧪 Checklist de Implementação

### Antes de começar
- [ ] Fazer backup do arquivo `components/audience.tsx` atual
- [ ] Revisar o código atual para entender a estrutura
- [ ] Verificar que o botão "Blog" já tem `flex-1`

### Implementação
- [ ] Abrir `components/audience.tsx`
- [ ] Localizar o botão "Galeria de experiências"
- [ ] Adicionar `flex-1` na className do botão "Galeria"
- [ ] Confirmar que o botão "Blog" já tem `flex-1`
- [ ] Verificar que todas as classes estão corretas

### Testes
- [ ] Verificar se ambos os botões têm o mesmo tamanho
- [ ] Confirmar que o gap `gap-8` está mantido
- [ ] Verificar se o topo do botão "Galeria" ainda alinha com o título
- [ ] Verificar se a base do botão "Blog" ainda alinha com o último card
- [ ] Testar responsividade em mobile (< 768px)
  - [ ] Botões aparecem abaixo dos cards
  - [ ] Botões têm o mesmo tamanho
  - [ ] Gap mantido entre botões
- [ ] Testar responsividade em tablet (768px - 1024px)
- [ ] Testar responsividade em desktop (> 1024px)
  - [ ] Botões têm exatamente o mesmo tamanho
  - [ ] Gap mantido entre botões
  - [ ] Alinhamento vertical preservado
- [ ] Verificar que os hover effects ainda funcionam
- [ ] Verificar que os links funcionam corretamente
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Testar em diferentes navegadores

### Ajustes finais
- [ ] Verificar visualmente que os botões têm o mesmo tamanho
- [ ] Confirmar que o gap está adequado
- [ ] Verificar que não há erros de linting
- [ ] Confirmar que o layout está visualmente equilibrado

---

## 📊 Comparação: Antes vs Depois

### ANTES (Tamanhos diferentes)
```
┌───────────────────────────────────┐
├─────────────┬─────────────────────┤
│ REGIÕES     │  [Botão Galeria]    │
│ ATENDIDAS   │  (tamanho menor)    │
│ [MAPA]      │                     │
│ 📍 Card 1   │     gap-8           │
│ 🧭 Card 2   │  [Botão Blog]       │
│ 🌎 Card 3   │  (flex-1, maior)    │
└─────────────┴─────────────────────┘
```

### DEPOIS (Tamanhos iguais)
```
┌───────────────────────────────────┐
├─────────────┬─────────────────────┤
│ REGIÕES     │  [Botão Galeria]     │
│ ATENDIDAS   │  (flex-1, igual)     │
│ [MAPA]      │     gap-8            │
│ 📍 Card 1   │  [Botão Blog]        │
│ 🧭 Card 2   │  (flex-1, igual)     │
│ 🌎 Card 3   │                      │
└─────────────┴─────────────────────┘
```

**Mudanças principais**:
- ✅ Ambos os botões têm `flex-1`
- ✅ Botões dividem o espaço igualmente
- ✅ Mesmo tamanho exato para ambos
- ✅ Gap mantido entre botões
- ✅ Alinhamento preservado

---

## 🎨 Variações de Design (Opcionais)

### Opção 1: Altura Mínima Combinada

Se quiser garantir altura mínima mesmo com `flex-1`:

```tsx
className="group relative flex-1 min-h-[200px] py-12 lg:py-16 ..."
```

### Opção 2: Altura Máxima

Se quiser limitar altura máxima:

```tsx
className="group relative flex-1 max-h-[300px] py-12 lg:py-16 ..."
```

### Opção 3: Altura Fixa (Não Recomendado)

Se preferir altura fixa em vez de flexível:

```tsx
// Remover flex-1 e usar altura fixa
className="group relative h-64 py-12 lg:py-16 ..."
```

**Nota**: Altura fixa não é recomendada pois não se adapta ao conteúdo da coluna esquerda.

---

## 📝 Notas Importantes

1. **Flex-1 em ambos**:
   - Com `flex-1` em ambos os botões, eles dividem o espaço disponível igualmente
   - O gap é automaticamente considerado na divisão
   - Isso garante tamanhos idênticos

2. **Alinhamento preservado**:
   - O `items-start` no grid garante que o topo do botão "Galeria" alinha com o título
   - O `h-full` no container garante que ocupe a altura total
   - O `flex-1` em ambos faz com que dividam o espaço igualmente

3. **Gap mantido**:
   - O `gap-8` (32px) é mantido entre os botões
   - O gap é subtraído do espaço total antes da divisão
   - Ambos os botões recebem o mesmo espaço

4. **Responsividade**:
   - Em mobile, os botões aparecem abaixo dos cards
   - Em desktop, os botões dividem o espaço igualmente
   - O comportamento é consistente em todas as resoluções

5. **Ajuste fino**:
   - Se necessário, pode ajustar o gap (`gap-6`, `gap-8`, `gap-10`)
   - O padding vertical pode ser ajustado se necessário
   - Testar visualmente e ajustar conforme necessário

---

## 🚀 Próximos Passos

1. **Revisar documentação**: Confirmar que todas as especificações estão corretas
2. **Autorizar implementação**: Aguardar aprovação para implementar
3. **Implementar código**: Adicionar `flex-1` no botão "Galeria"
4. **Testar**: Validar que ambos os botões têm o mesmo tamanho
5. **Ajustar**: Fazer fine-tuning se necessário

---

## 🆘 Troubleshooting

### Botões não têm o mesmo tamanho
- ✅ Verificar se ambos os botões têm `flex-1`
- ✅ Confirmar que o container tem `flex flex-col`
- ✅ Verificar se não há outras classes limitando o tamanho
- ✅ Testar removendo e readicionando `flex-1`

### Gap muito grande ou pequeno
- ✅ Ajustar gap: `gap-6`, `gap-8`, `gap-10`
- ✅ Verificar se o gap está aplicado no container correto
- ✅ Testar visualmente e ajustar conforme necessário

### Layout quebrado em mobile
- ✅ Confirmar que o grid tem `grid-cols-1` para mobile
- ✅ Verificar se os botões aparecem abaixo dos cards
- ✅ Testar em diferentes dispositivos

### Botões muito pequenos ou grandes
- ✅ Ajustar padding vertical: `py-10`, `py-12`, `py-14`, `py-16`
- ✅ Verificar se o container tem `h-full`
- ✅ Testar com diferentes conteúdos na coluna esquerda

---

## 📌 Referências

- **Arquivo atual**: `components/audience.tsx`
- **Documentação anterior**: `docs/15-padding-buttons.md`
- **Paleta de cores**: `app/globals.css` (linhas 84-100)
- **Tailwind CSS Flexbox**: [Documentação oficial](https://tailwindcss.com/docs/flex)
- **CSS Flexbox**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

---

**Documentação criada em:** 2025-01-27  
**Seção:** 4 (Audience/Regiões Atendidas)  
**Status:** 📝 Documentação pronta - Aguardando autorização para implementação

---

## 📋 Resumo Executivo

### O que será feito:
- ✅ Adicionar `flex-1` no botão "Galeria de experiências"
- ✅ Confirmar que o botão "Blog" já tem `flex-1`
- ✅ Garantir que ambos os botões tenham exatamente o mesmo tamanho
- ✅ Manter gap `gap-8` entre os botões
- ✅ Preservar alinhamento atual (topo com título, base com último card)

### Arquivos a modificar:
- `components/audience.tsx` (adicionar flex-1 no botão "Galeria")

### Impacto:
- ✅ Botões com tamanhos idênticos
- ✅ Layout mais equilibrado e simétrico
- ✅ Melhor consistência visual
- ✅ Nenhuma mudança funcional
- ✅ Sem breaking changes

### Mudanças técnicas:
- **Adicionar**: `flex-1` no botão "Galeria de experiências"
- **Manter**: `flex-1` no botão "Blog" (já existe)
- **Manter**: Todas as outras classes e propriedades
- **Manter**: Gap `gap-8` entre botões

