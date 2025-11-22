# 14 — Modificação de Cards: Redução de Altura e Espaçamento (Seção 4)

## 📋 Objetivo

Reduzir a altura dos cards informativos na Seção 4 (`components/audience.tsx`) e diminuir o espaçamento entre eles, mantendo a largura inalterada.

**Mudanças**:
- **Reduzir padding vertical**: Diminuir o padding top e bottom dos cards proporcionalmente
- **Manter padding horizontal**: Preservar o padding esquerdo e direito
- **Reduzir gap**: Diminuir o espaçamento entre os cards no container

---

## 🎨 Especificações de Design

### Mudanças nos Cards

#### ANTES (Padding atual)
```
┌─────────────────────────────────┐
│                                 │ ← p-8 (32px todos os lados)
│  📍 [Card]                      │
│  Conteúdo do card               │
│                                 │
└─────────────────────────────────┘
```

#### DEPOIS (Padding reduzido verticalmente)
```
┌─────────────────────────────────┐
│                                 │ ← py-4 ou py-5 (reduzido)
│  📍 [Card]                      │
│  Conteúdo do card               │
│                                 │
└─────────────────────────────────┘
     ↑
  px-8 (mantido)
```

### Mudanças no Espaçamento

#### ANTES (Gap atual)
```
[Card 1]
    ↓ gap-6 lg:gap-8 (24px/32px)
[Card 2]
    ↓ gap-6 lg:gap-8 (24px/32px)
[Card 3]
```

#### DEPOIS (Gap reduzido)
```
[Card 1]
    ↓ gap-4 lg:gap-6 (16px/24px) ou menor
[Card 2]
    ↓ gap-4 lg:gap-6 (16px/24px) ou menor
[Card 3]
```

### Valores Propostos

#### Padding dos Cards

**Opção 1 - Redução moderada** (Recomendada):
- **Atual**: `p-8` (32px todos os lados)
- **Novo**: `px-8 py-5` (32px horizontal, 20px vertical)
- **Redução**: ~37% no padding vertical

**Opção 2 - Redução média**:
- **Atual**: `p-8` (32px todos os lados)
- **Novo**: `px-8 py-4` (32px horizontal, 16px vertical)
- **Redução**: ~50% no padding vertical

**Opção 3 - Redução maior**:
- **Atual**: `p-8` (32px todos os lados)
- **Novo**: `px-8 py-3` (32px horizontal, 12px vertical)
- **Redução**: ~62% no padding vertical

#### Gap entre Cards

**Opção 1 - Redução moderada** (Recomendada):
- **Atual**: `gap-6 lg:gap-8` (24px mobile, 32px desktop)
- **Novo**: `gap-4 lg:gap-6` (16px mobile, 24px desktop)
- **Redução**: ~33% no espaçamento

**Opção 2 - Redução média**:
- **Atual**: `gap-6 lg:gap-8` (24px mobile, 32px desktop)
- **Novo**: `gap-3 lg:gap-5` (12px mobile, 20px desktop)
- **Redução**: ~50% no espaçamento

**Opção 3 - Redução maior**:
- **Atual**: `gap-6 lg:gap-8` (24px mobile, 32px desktop)
- **Novo**: `gap-2 lg:gap-4` (8px mobile, 16px desktop)
- **Redução**: ~67% no espaçamento

**Recomendação**: Começar com **Opção 1** (redução moderada) e ajustar se necessário.

---

## 📁 Estrutura de Arquivos

### Arquivo a Modificar

**Arquivo**: `components/audience.tsx`

**Mudanças necessárias**:
1. Alterar padding dos 3 cards de `p-8` para `px-8 py-5` (ou outro valor escolhido)
2. Alterar gap do container de `gap-6 lg:gap-8` para `gap-4 lg:gap-6` (ou outro valor escolhido)

---

## 💻 Implementação

### Passo 1: Modificar Padding dos Cards

**Estrutura atual** (todos os 3 cards):
```tsx
<div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
```

**Nova estrutura** (Opção 1 - Recomendada):
```tsx
<div className="px-8 py-5 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
```

**Alternativas**:
- Opção 2: `px-8 py-4`
- Opção 3: `px-8 py-3`

### Passo 2: Modificar Gap do Container

**Estrutura atual** (container da coluna esquerda):
```tsx
<div className="flex flex-col justify-center items-center gap-6 lg:gap-8">
```

**Nova estrutura** (Opção 1 - Recomendada):
```tsx
<div className="flex flex-col justify-center items-center gap-4 lg:gap-6">
```

**Alternativas**:
- Opção 2: `gap-3 lg:gap-5`
- Opção 3: `gap-2 lg:gap-4`

### Código Completo da Seção (Referência - Opção 1)

```tsx
import Image from "next/image"
import Link from "next/link"
import { MapPin, Globe, Navigation } from "lucide-react"

export default function Audience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Título + Mapa + Cards */}
          <div className="flex flex-col justify-center items-center gap-4 lg:gap-6">
            {/* Título */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center">
              REGIÕES ATENDIDAS
            </h2>
            
            {/* Imagem do Mapa */}
            <div className="relative w-[70%] max-w-md lg:max-w-[70%] aspect-square">
              <Image
                src="/mapa-estacao-grao2.png"
                alt="Mapa de regiões atendidas pela Estação do Grão no Nordeste e Brasil"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 313px, 420px"
                priority={false}
              />
            </div>

            {/* Card 1: Nordeste - 100 doses */}
            <div className="px-8 py-5 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
              <div className="flex items-start gap-4">
                <MapPin className="w-10 h-10 text-coffee-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed">
                    Atendemos toda a <strong className="text-coffee-500">região do Nordeste</strong> a partir de{" "}
                    <strong className="text-coffee-500 font-bold text-xl sm:text-2xl">100 doses</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Estados Específicos - 50 doses */}
            <div className="px-8 py-5 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
              <div className="flex items-start gap-4">
                <Navigation className="w-10 h-10 text-coffee-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed">
                    Atendemos <strong className="text-coffee-500">Pernambuco, Paraíba e Alagoas</strong> a partir de{" "}
                    <strong className="text-coffee-500 font-bold text-xl sm:text-2xl">50 doses</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Brasil - 3.000 doses */}
            <div className="px-8 py-5 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
              <div className="flex items-start gap-4">
                <Globe className="w-10 h-10 text-coffee-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed">
                    Atendemos <strong className="text-coffee-500">todo o Brasil</strong> a partir de{" "}
                    <strong className="text-coffee-500 font-bold text-xl sm:text-2xl">3.000 doses</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Botões de Navegação */}
          <div className="flex flex-col justify-center items-stretch gap-8">
            {/* Botões mantêm o mesmo */}
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

- **Padding dos cards**: `px-8 py-5` (32px horizontal, 20px vertical)
- **Gap entre elementos**: `gap-4` (16px)
- Cards mantêm largura total (`w-full`) e máximo (`max-w-md`)

### Desktop (≥ 1024px)

- **Padding dos cards**: `px-8 py-5` (32px horizontal, 20px vertical)
- **Gap entre elementos**: `lg:gap-6` (24px)
- Layout mantém alinhamento vertical centralizado

**Nota**: Os valores são os mesmos em mobile e desktop para o padding dos cards. Apenas o gap muda responsivamente.

---

## 🔧 Classes Tailwind Utilizadas

### Padding dos Cards

**Antes**:
```tsx
className="p-8"
```
- Padding uniforme: 32px (2rem) em todos os lados

**Depois** (Opção 1):
```tsx
className="px-8 py-5"
```
- Padding horizontal: `px-8` (32px esquerda e direita)
- Padding vertical: `py-5` (20px topo e fundo)

**Alternativas**:
- Opção 2: `px-8 py-4` (32px horizontal, 16px vertical)
- Opção 3: `px-8 py-3` (32px horizontal, 12px vertical)

### Gap do Container

**Antes**:
```tsx
className="flex flex-col justify-center items-center gap-6 lg:gap-8"
```
- Gap mobile: `gap-6` (24px)
- Gap desktop: `lg:gap-8` (32px)

**Depois** (Opção 1):
```tsx
className="flex flex-col justify-center items-center gap-4 lg:gap-6"
```
- Gap mobile: `gap-4` (16px)
- Gap desktop: `lg:gap-6` (24px)

**Alternativas**:
- Opção 2: `gap-3 lg:gap-5` (12px mobile, 20px desktop)
- Opção 3: `gap-2 lg:gap-4` (8px mobile, 16px desktop)

---

## 📐 Espaçamentos

### Comparação: Antes vs Depois (Opção 1)

| Elemento | Antes | Depois | Mudança |
|----------|-------|--------|---------|
| Padding vertical cards | `p-8` (32px) | `py-5` (20px) | -37% |
| Padding horizontal cards | `p-8` (32px) | `px-8` (32px) | Mantido |
| Gap mobile | `gap-6` (24px) | `gap-4` (16px) | -33% |
| Gap desktop | `lg:gap-8` (32px) | `lg:gap-6` (24px) | -25% |

### Altura dos Cards

**Antes**:
- Padding top: 32px
- Conteúdo: ~60-80px (dependendo do texto)
- Padding bottom: 32px
- **Total**: ~124-144px

**Depois** (Opção 1):
- Padding top: 20px
- Conteúdo: ~60-80px (mantém o mesmo)
- Padding bottom: 20px
- **Total**: ~100-120px
- **Redução**: ~20-24px de altura por card

### Espaçamento Total

**Antes**:
- 3 cards × ~140px = ~420px
- 2 gaps × 32px = 64px
- **Total**: ~484px

**Depois** (Opção 1):
- 3 cards × ~110px = ~330px
- 2 gaps × 24px = 48px
- **Total**: ~378px
- **Redução**: ~106px (22% menos espaço vertical)

---

## ♿ Acessibilidade

### Legibilidade
- ✅ Padding reduzido mantém legibilidade do texto
- ✅ Espaçamento ainda adequado para leitura
- ✅ Contraste mantido

### Navegação
- ✅ Cards ainda clicáveis e interativos
- ✅ Hover effects mantidos
- ✅ Estrutura semântica preservada

### Responsividade
- ✅ Layout responsivo mantido
- ✅ Cards adaptáveis a diferentes tamanhos de tela
- ✅ Espaçamento proporcional

---

## 🧪 Checklist de Implementação

### Antes de começar
- [ ] Fazer backup do arquivo `components/audience.tsx` atual
- [ ] Revisar o código atual para entender a estrutura
- [ ] Decidir qual opção usar (1, 2 ou 3) para padding e gap

### Implementação
- [ ] Abrir `components/audience.tsx`
- [ ] Localizar os 3 cards na coluna esquerda
- [ ] Alterar padding de `p-8` para `px-8 py-5` (ou opção escolhida) em todos os 3 cards
- [ ] Localizar o container da coluna esquerda
- [ ] Alterar gap de `gap-6 lg:gap-8` para `gap-4 lg:gap-6` (ou opção escolhida)
- [ ] Verificar que todas as classes estão corretas

### Testes
- [ ] Verificar se os cards têm altura reduzida
- [ ] Confirmar que o padding horizontal foi mantido
- [ ] Verificar se o espaçamento entre cards foi reduzido
- [ ] Testar responsividade em mobile (< 768px)
  - [ ] Cards com altura adequada
  - [ ] Espaçamento correto entre cards
- [ ] Testar responsividade em tablet (768px - 1024px)
- [ ] Testar responsividade em desktop (> 1024px)
  - [ ] Cards com altura adequada
  - [ ] Espaçamento correto entre cards
- [ ] Verificar que o conteúdo dos cards ainda está legível
- [ ] Confirmar que os hover effects ainda funcionam
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Testar em diferentes navegadores

### Ajustes finais
- [ ] Ajustar padding se necessário (tentar `py-4` ou `py-6`)
- [ ] Ajustar gap se necessário (tentar `gap-3` ou `gap-5`)
- [ ] Verificar se o layout está visualmente equilibrado
- [ ] Confirmar que não há erros de linting

---

## 📊 Comparação: Antes vs Depois

### ANTES
```
┌─────────────────────────┐
│                         │ ← 32px padding
│  📍 Card 1              │
│                         │
└─────────────────────────┘
         ↓ 32px gap
┌─────────────────────────┐
│                         │ ← 32px padding
│  🧭 Card 2              │
│                         │
└─────────────────────────┘
         ↓ 32px gap
┌─────────────────────────┐
│                         │ ← 32px padding
│  🌎 Card 3              │
│                         │
└─────────────────────────┘
```

### DEPOIS (Opção 1)
```
┌─────────────────────────┐
│                         │ ← 20px padding
│  📍 Card 1              │
│                         │
└─────────────────────────┘
         ↓ 24px gap
┌─────────────────────────┐
│                         │ ← 20px padding
│  🧭 Card 2              │
│                         │
└─────────────────────────┘
         ↓ 24px gap
┌─────────────────────────┐
│                         │ ← 20px padding
│  🌎 Card 3              │
│                         │
└─────────────────────────┘
```

**Mudanças principais**:
- ✅ Padding vertical reduzido de 32px para 20px (-37%)
- ✅ Gap reduzido de 32px para 24px (-25%)
- ✅ Padding horizontal mantido (32px)
- ✅ Cards mais compactos verticalmente
- ✅ Melhor aproveitamento do espaço vertical

---

## 🎨 Variações de Design (Opcionais)

### Opção 1: Redução Moderada (Recomendada)
```tsx
// Padding
className="px-8 py-5"

// Gap
className="... gap-4 lg:gap-6"
```
- **Redução**: ~37% padding vertical, ~33% gap
- **Resultado**: Cards mais compactos mas ainda confortáveis

### Opção 2: Redução Média
```tsx
// Padding
className="px-8 py-4"

// Gap
className="... gap-3 lg:gap-5"
```
- **Redução**: ~50% padding vertical, ~50% gap
- **Resultado**: Cards mais compactos, layout mais denso

### Opção 3: Redução Maior
```tsx
// Padding
className="px-8 py-3"

// Gap
className="... gap-2 lg:gap-4"
```
- **Redução**: ~62% padding vertical, ~67% gap
- **Resultado**: Cards muito compactos, layout muito denso

### Opção 4: Padding Responsivo
```tsx
// Padding responsivo
className="px-8 py-4 sm:py-5 lg:py-6"
```
- **Mobile**: `py-4` (16px)
- **Tablet**: `py-5` (20px)
- **Desktop**: `py-6` (24px)

---

## 📝 Notas Importantes

1. **Proporcionalidade**:
   - O padding horizontal (`px-8`) é mantido para preservar a largura visual
   - Apenas o padding vertical (`py`) é reduzido
   - Isso mantém o aspecto visual dos cards enquanto reduz a altura

2. **Espaçamento**:
   - O gap é reduzido proporcionalmente ao padding
   - Isso mantém a harmonia visual entre os elementos
   - O espaçamento ainda é suficiente para separar os cards visualmente

3. **Legibilidade**:
   - Mesmo com padding reduzido, o texto permanece legível
   - O conteúdo interno dos cards não é afetado
   - Apenas o espaço ao redor do conteúdo é reduzido

4. **Responsividade**:
   - Os valores podem ser ajustados separadamente para mobile e desktop
   - O gap já é responsivo (`gap-4 lg:gap-6`)
   - O padding pode ser responsivo também se necessário

5. **Teste e ajuste**:
   - Começar com a Opção 1 (redução moderada)
   - Testar visualmente e ajustar se necessário
   - Pode ser necessário ajustar outros elementos se a redução for muito grande

---

## 🚀 Próximos Passos

1. **Revisar documentação**: Confirmar que todas as especificações estão corretas
2. **Decidir valores**: Escolher entre Opção 1, 2 ou 3 (ou criar valores customizados)
3. **Autorizar implementação**: Aguardar aprovação para implementar
4. **Implementar código**: Aplicar mudanças nos cards e no gap
5. **Testar**: Validar visualmente e em diferentes dispositivos
6. **Ajustar**: Fazer fine-tuning se necessário

---

## 🆘 Troubleshooting

### Cards muito apertados
- ✅ Aumentar padding vertical: tentar `py-6` em vez de `py-5`
- ✅ Aumentar gap: tentar `gap-5 lg:gap-7`
- ✅ Verificar se o conteúdo não está colado nas bordas

### Cards muito espaçados ainda
- ✅ Reduzir mais o padding: tentar `py-4` ou `py-3`
- ✅ Reduzir mais o gap: tentar `gap-3 lg:gap-5` ou `gap-2 lg:gap-4`
- ✅ Verificar se a redução foi aplicada corretamente

### Layout desequilibrado
- ✅ Verificar se todos os 3 cards têm o mesmo padding
- ✅ Confirmar que o gap está aplicado no container correto
- ✅ Testar em diferentes tamanhos de tela

### Texto cortado ou muito próximo das bordas
- ✅ Aumentar padding vertical: `py-5` ou `py-6`
- ✅ Verificar se não há conflito com outras classes
- ✅ Testar com diferentes tamanhos de fonte

### Espaçamento inconsistente
- ✅ Verificar se o gap está aplicado no container correto
- ✅ Confirmar que não há margens extras nos cards
- ✅ Testar removendo e readicionando as classes

---

## 📌 Referências

- **Arquivo atual**: `components/audience.tsx`
- **Documentação anterior**: `docs/13-mudanca-estrutura-secao-4.md`
- **Paleta de cores**: `app/globals.css` (linhas 84-100)
- **Tailwind CSS Padding**: [Documentação oficial](https://tailwindcss.com/docs/padding)
- **Tailwind CSS Gap**: [Documentação oficial](https://tailwindcss.com/docs/gap)

---

**Documentação criada em:** 2025-01-27  
**Seção:** 4 (Audience/Regiões Atendidas)  
**Status:** 📝 Documentação pronta - Aguardando autorização para implementação

---

## 📋 Resumo Executivo

### O que será feito:
- ✅ Reduzir padding vertical dos 3 cards (de `p-8` para `px-8 py-5`)
- ✅ Manter padding horizontal dos cards (`px-8`)
- ✅ Reduzir gap entre elementos (de `gap-6 lg:gap-8` para `gap-4 lg:gap-6`)
- ✅ Manter todas as outras propriedades dos cards

### Arquivos a modificar:
- `components/audience.tsx` (ajustar padding e gap)

### Impacto:
- ✅ Redução de ~22% no espaço vertical total
- ✅ Cards mais compactos e visualmente mais densos
- ✅ Melhor aproveitamento do espaço
- ✅ Nenhuma mudança funcional
- ✅ Sem breaking changes

### Mudanças técnicas:
- **Modificar**: Padding dos 3 cards de `p-8` para `px-8 py-5`
- **Modificar**: Gap do container de `gap-6 lg:gap-8` para `gap-4 lg:gap-6`
- **Manter**: Todas as outras classes e estilos

