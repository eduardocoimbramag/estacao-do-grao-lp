# 13 — Mudança de Estrutura: Seção 4 (Regiões Atendidas)

## 📋 Objetivo

Realizar duas mudanças principais na Seção 4 (`components/audience.tsx`):

1. **Reposicionar os cards**: Mover os 3 cards informativos para a **coluna esquerda**, centralizados verticalmente com o título e o mapa
2. **Substituir cards por botões**: Na **coluna direita**, substituir os cards por 2 botões grandes com imagens de fundo que levam para outras páginas

**Mudanças**:
- **Mover**: 3 cards da coluna direita para a coluna esquerda
- **Adicionar**: 2 botões grandes na coluna direita
- **Manter**: Título e mapa na coluna esquerda
- **Novos botões**: "Galeria de experiências" e "Blog"

---

## 🎨 Especificações de Design

### Layout Atual vs Novo

#### ANTES (Estrutura atual)
```
┌─────────────────────────────────────────────┐
├──────────────────┬──────────────────────────┤
│                  │                          │
│  REGIÕES         │  📍 [Card 1]             │
│  ATENDIDAS       │  Nordeste - 100 doses    │
│  (título)        │                          │
│                  │  🧭 [Card 2]             │
│   [IMAGEM DO     │  PE/PB/AL - 50 doses     │
│    MAPA]         │                          │
│                  │  🌎 [Card 3]            │
│                  │  Brasil - 3.000 doses   │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

#### DEPOIS (Nova estrutura)
```
┌─────────────────────────────────────────────┐
├──────────────────┬──────────────────────────┤
│                  │                          │
│  REGIÕES         │  [Botão 1]               │
│  ATENDIDAS       │  Galeria de experiências │
│  (título)        │  (com imagem)            │
│                  │                          │
│   [IMAGEM DO     │  [Botão 2]               │
│    MAPA]         │  Blog                    │
│                  │  (com imagem)            │
│                  │                          │
│  📍 [Card 1]     │                          │
│  Nordeste        │                          │
│                  │                          │
│  🧭 [Card 2]     │                          │
│  PE/PB/AL        │                          │
│                  │                          │
│  🌎 [Card 3]     │                          │
│  Brasil          │                          │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

### Estrutura da Coluna Esquerda

A coluna esquerda deve conter (de cima para baixo):
1. **Título**: "REGIÕES ATENDIDAS"
2. **Imagem do Mapa**: Mantém o mesmo tamanho e estilo
3. **Card 1**: Nordeste - 100 doses
4. **Card 2**: Pernambuco, Paraíba e Alagoas - 50 doses
5. **Card 3**: Brasil - 3.000 doses

**Layout interno**:
- Container flex vertical (`flex flex-col`)
- Alinhamento centralizado verticalmente (`justify-center`)
- Alinhamento horizontal centralizado (`items-center`)
- Espaçamento entre elementos (`gap-6 lg:gap-8`)

### Estrutura da Coluna Direita

A coluna direita deve conter (de cima para baixo):
1. **Botão 1**: "Galeria de experiências" (link para `/galeria` ou `#galeria`)
2. **Botão 2**: "Blog" (link para `/blog` ou URL externa)

**Layout interno**:
- Container flex vertical (`flex flex-col`)
- Espaçamento entre botões (`space-y-8`)
- Alinhamento centralizado verticalmente (`justify-center`)

### Especificações dos Botões

#### Estrutura Visual

Cada botão deve ter:
- **Imagem de fundo**: Usando `Image` do Next.js com `fill` e `object-cover`
- **Overlay escuro**: Para melhor legibilidade do texto (`bg-coffee-900/60` ou similar)
- **Borda branca**: `border-2 border-white`
- **Cantos arredondados**: `rounded-2xl` (seguindo padrão do projeto)
- **Texto branco**: `text-white`
- **Drop shadow no texto**: `text-shadow` ou `drop-shadow` para melhor legibilidade
- **Altura**: Mínimo de `h-48` (192px) ou `h-56` (224px)
- **Hover effect**: Escala ou mudança de opacidade

#### Texto dos Botões

**Botão 1 - Galeria de experiências**:
- Texto: "Galeria de experiências"
- Link: `#galeria` ou `/galeria`
- Imagem: Sugestão: `/professional-barista-making-latte-art.jpg` ou outra imagem da galeria

**Botão 2 - Blog**:
- Texto: "Blog"
- Link: `/blog` ou URL externa (definir)
- Imagem: Sugestão: `/coffee-station-setup-at-wedding-reception.jpg` ou outra imagem relacionada

### Cores e Estilos dos Botões

- **Background overlay**: `bg-coffee-900/60` ou `bg-black/40` (semi-transparente)
- **Borda**: `border-2 border-white`
- **Texto**: `text-white`
- **Tamanho do texto**: `text-2xl sm:text-3xl lg:text-4xl font-bold`
- **Drop shadow no texto**: `drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]` ou similar
- **Hover**: `hover:scale-105` ou `hover:opacity-90`
- **Transição**: `transition-all duration-300`

---

## 📁 Estrutura de Arquivos

### Arquivo a Modificar

**Arquivo**: `components/audience.tsx`

**Mudanças necessárias**:
1. Reestruturar coluna esquerda para incluir título + mapa + 3 cards
2. Substituir coluna direita por 2 botões com imagens
3. Adicionar import do `Link` do Next.js (se necessário)
4. Selecionar imagens apropriadas para os botões

### Imagens para os Botões

**Sugestões de imagens** (já disponíveis em `public/`):
- **Galeria**: `/professional-barista-making-latte-art.jpg` ou `/guests-enjoying-gourmet-coffee-at-premium-event.jpg`
- **Blog**: `/coffee-station-setup-at-wedding-reception.jpg` ou `/barista-serving-espresso-at-corporate-event.jpg`

---

## 💻 Implementação

### Passo 1: Reestruturar Coluna Esquerda

**Estrutura atual** (coluna esquerda):
```tsx
{/* Coluna Esquerda: Título + Imagem do Mapa */}
<div className="flex flex-col justify-center items-center gap-6 lg:gap-8">
  {/* Título */}
  <h2>REGIÕES ATENDIDAS</h2>
  {/* Imagem do Mapa */}
  <div>...</div>
</div>
```

**Nova estrutura** (coluna esquerda com cards):
```tsx
{/* Coluna Esquerda: Título + Mapa + Cards */}
<div className="flex flex-col justify-center items-center gap-6 lg:gap-8">
  {/* Título */}
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center">
    REGIÕES ATENDIDAS
  </h2>
  
  {/* Imagem do Mapa */}
  <div className="relative w-[70%] max-w-md lg:max-w-[70%] aspect-square">
    <Image ... />
  </div>

  {/* Card 1: Nordeste */}
  <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
    ...
  </div>

  {/* Card 2: Estados Específicos */}
  <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
    ...
  </div>

  {/* Card 3: Brasil */}
  <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
    ...
  </div>
</div>
```

### Passo 2: Criar Botões na Coluna Direita

**Nova estrutura** (coluna direita com botões):
```tsx
{/* Coluna Direita: Botões de Navegação */}
<div className="flex flex-col justify-center items-stretch gap-8">
  {/* Botão 1: Galeria */}
  <Link
    href="#galeria"
    className="group relative h-56 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105"
  >
    <Image
      src="/professional-barista-making-latte-art.jpg"
      alt="Galeria de experiências"
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
    <div className="absolute inset-0 bg-coffee-900/60 group-hover:bg-coffee-900/50 transition-colors" />
    <div className="absolute inset-0 flex items-center justify-center">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        Galeria de experiências
      </h3>
    </div>
  </Link>

  {/* Botão 2: Blog */}
  <Link
    href="/blog"
    className="group relative h-56 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105"
  >
    <Image
      src="/coffee-station-setup-at-wedding-reception.jpg"
      alt="Blog"
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
    <div className="absolute inset-0 bg-coffee-900/60 group-hover:bg-coffee-900/50 transition-colors" />
    <div className="absolute inset-0 flex items-center justify-center">
      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        Blog
      </h3>
    </div>
  </Link>
</div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Título + Mapa + Cards */}
          <div className="flex flex-col justify-center items-center gap-6 lg:gap-8">
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
            <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
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
            <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
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
            <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
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
            
            {/* Botão 1: Galeria de experiências */}
            <Link
              href="#galeria"
              className="group relative h-56 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
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
              className="group relative h-56 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-coffee-900"
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
- **Ordem dos elementos**:
  1. Título "REGIÕES ATENDIDAS" (centralizado)
  2. Imagem do mapa (abaixo do título)
  3. Card 1: Nordeste
  4. Card 2: Estados Específicos
  5. Card 3: Brasil
  6. Botão 1: Galeria de experiências
  7. Botão 2: Blog
- Espaçamento entre elementos: `gap-6` (24px)
- Cards com largura total (`w-full`) e máximo (`max-w-md`)

### Desktop (≥ 1024px)

- Grid de **2 colunas** (`lg:grid-cols-2`)
- **Coluna esquerda**:
  - Título no topo
  - Mapa abaixo do título
  - 3 cards empilhados abaixo do mapa
  - Centralizado verticalmente com a coluna direita (`items-center` no grid)
  - Espaçamento: `gap-6 lg:gap-8` (24px mobile, 32px desktop)
- **Coluna direita**:
  - 2 botões empilhados verticalmente
  - Espaçamento: `gap-8` (32px)
  - Altura dos botões: `h-56` (224px)
- Alinhamento vertical: `items-center` no grid garante que ambas as colunas fiquem centralizadas verticalmente

---

## 🔧 Classes Tailwind Utilizadas

### Container da Coluna Esquerda
```tsx
className="flex flex-col justify-center items-center gap-6 lg:gap-8"
```
- **Layout**: `flex flex-col` (flex vertical)
- **Alinhamento vertical**: `justify-center` (centraliza conteúdo verticalmente)
- **Alinhamento horizontal**: `items-center` (centraliza horizontalmente)
- **Espaçamento**: `gap-6 lg:gap-8` (24px mobile, 32px desktop)

### Cards na Coluna Esquerda
```tsx
className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md"
```
- **Mantém**: Todas as classes existentes
- **Adiciona**: `w-full max-w-md` (largura total com máximo de 448px)

### Container da Coluna Direita
```tsx
className="flex flex-col justify-center items-stretch gap-8"
```
- **Layout**: `flex flex-col` (flex vertical)
- **Alinhamento vertical**: `justify-center` (centraliza conteúdo)
- **Alinhamento horizontal**: `items-stretch` (botões ocupam largura total)
- **Espaçamento**: `gap-8` (32px entre botões)

### Botões
```tsx
className="group relative h-56 overflow-hidden rounded-2xl border-2 border-white transition-all duration-300 hover:scale-105"
```
- **Altura**: `h-56` (224px)
- **Overflow**: `overflow-hidden` (esconde partes da imagem)
- **Bordas**: `rounded-2xl` (cantos arredondados)
- **Borda**: `border-2 border-white` (borda branca de 2px)
- **Hover**: `hover:scale-105` (aumenta 5% no hover)
- **Transição**: `transition-all duration-300` (transição suave)

### Imagem dentro do Botão
```tsx
className="object-cover transition-transform duration-300 group-hover:scale-110"
```
- **Objeto**: `object-cover` (cobre todo o espaço)
- **Hover**: `group-hover:scale-110` (zoom na imagem ao hover)

### Overlay do Botão
```tsx
className="absolute inset-0 bg-coffee-900/60 group-hover:bg-coffee-900/50 transition-colors"
```
- **Posição**: `absolute inset-0` (cobre todo o botão)
- **Background**: `bg-coffee-900/60` (overlay escuro 60% opacidade)
- **Hover**: `group-hover:bg-coffee-900/50` (overlay mais claro no hover)

### Texto do Botão
```tsx
className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-4"
```
- **Tamanho**: `text-2xl sm:text-3xl lg:text-4xl` (responsivo)
- **Peso**: `font-bold`
- **Cor**: `text-white`
- **Drop shadow**: `drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]` (sombra no texto)
- **Alinhamento**: `text-center`
- **Padding horizontal**: `px-4` (evita texto colado nas bordas)

---

## 📐 Espaçamentos

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Gap entre elementos (coluna esquerda) | `gap-6` (24px) | `lg:gap-8` (32px) |
| Gap entre botões (coluna direita) | `gap-8` (32px) | `gap-8` (32px) |
| Gap entre colunas | `gap-8` (32px) | `lg:gap-12` (48px) |
| Altura dos botões | `h-56` (224px) | `h-56` (224px) |
| Padding vertical seção | `py-20` (80px) | `py-20` (80px) |
| Padding horizontal | `px-4` (16px) | `lg:px-8` (32px) |

---

## ♿ Acessibilidade

### Estrutura Semântica
- ✅ Mantém hierarquia de heading (`<h2>` para título, `<h3>` para botões)
- ✅ Links semânticos usando `<Link>` do Next.js
- ✅ Atributos `alt` descritivos nas imagens
- ✅ Foco visível nos botões (`focus:ring-2`)

### Navegação
- ✅ Links navegáveis por teclado
- ✅ Indicadores de foco visíveis
- ✅ Texto alternativo nas imagens
- ✅ Estrutura clara e organizada

### Contraste e Legibilidade
- ✅ Texto branco com drop shadow para melhor legibilidade
- ✅ Overlay escuro sobre imagens para contraste
- ✅ Tamanhos de fonte legíveis
- ✅ Espaçamento adequado entre elementos

---

## 🧪 Checklist de Implementação

### Antes de começar
- [ ] Fazer backup do arquivo `components/audience.tsx` atual
- [ ] Verificar se as imagens sugeridas existem em `public/`
- [ ] Decidir URLs finais para os botões (`#galeria`, `/blog`, etc.)
- [ ] Revisar o código atual para entender a estrutura

### Implementação
- [ ] Abrir `components/audience.tsx`
- [ ] Adicionar import do `Link` do Next.js
- [ ] Reestruturar coluna esquerda:
  - [ ] Manter título e mapa
  - [ ] Mover os 3 cards para dentro da coluna esquerda
  - [ ] Adicionar `w-full max-w-md` nos cards
- [ ] Substituir coluna direita:
  - [ ] Remover os 3 cards
  - [ ] Criar container flex vertical para botões
  - [ ] Adicionar botão "Galeria de experiências"
  - [ ] Adicionar botão "Blog"
- [ ] Configurar imagens dos botões
- [ ] Aplicar classes de estilo nos botões
- [ ] Adicionar drop shadow no texto
- [ ] Configurar links corretos

### Testes
- [ ] Verificar se os cards aparecem na coluna esquerda
- [ ] Confirmar que os botões aparecem na coluna direita
- [ ] Testar responsividade em mobile (< 768px)
  - [ ] Ordem correta dos elementos
  - [ ] Espaçamento adequado
  - [ ] Botões com altura adequada
- [ ] Testar responsividade em tablet (768px - 1024px)
- [ ] Testar responsividade em desktop (> 1024px)
  - [ ] Colunas lado a lado
  - [ ] Alinhamento vertical centralizado
  - [ ] Cards na coluna esquerda
  - [ ] Botões na coluna direita
- [ ] Testar hover effects nos botões
- [ ] Verificar drop shadow no texto
- [ ] Testar navegação por teclado
- [ ] Verificar links funcionam corretamente
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Testar em diferentes navegadores

### Ajustes finais
- [ ] Ajustar altura dos botões se necessário (`h-56` vs `h-48`)
- [ ] Ajustar opacidade do overlay se necessário
- [ ] Verificar se as imagens estão adequadas
- [ ] Confirmar URLs dos links
- [ ] Verificar que não há erros de linting
- [ ] Confirmar que o layout está visualmente equilibrado

---

## 📊 Comparação: Antes vs Depois

### ANTES
```
┌───────────────────────────────────┐
├─────────────┬─────────────────────┤
│ REGIÕES     │  📍 Card 1          │
│ ATENDIDAS   │  🧭 Card 2          │
│ [MAPA]      │  🌎 Card 3          │
└─────────────┴─────────────────────┘
```

### DEPOIS
```
┌───────────────────────────────────┐
├─────────────┬─────────────────────┤
│ REGIÕES     │  [Botão Galeria]    │
│ ATENDIDAS   │  [Botão Blog]       │
│ [MAPA]      │                      │
│ 📍 Card 1   │                      │
│ 🧭 Card 2   │                      │
│ 🌎 Card 3   │                      │
└─────────────┴─────────────────────┘
```

**Mudanças principais**:
- ✅ Cards movidos para coluna esquerda
- ✅ Botões grandes adicionados na coluna direita
- ✅ Imagens de fundo nos botões
- ✅ Drop shadow no texto para legibilidade
- ✅ Links funcionais para outras páginas
- ✅ Layout mais dinâmico e interativo

---

## 🎨 Variações de Design (Opcionais)

### Opção 1: Altura diferente dos botões

Se quiser botões mais altos:

```tsx
className="group relative h-64 overflow-hidden ..."
```

### Opção 2: Overlay mais escuro

Se quiser melhor contraste:

```tsx
className="absolute inset-0 bg-coffee-900/70 group-hover:bg-coffee-900/60"
```

### Opção 3: Efeito de zoom diferente

Se quiser zoom mais sutil:

```tsx
className="... hover:scale-[1.02]"
```

### Opção 4: Botões com gradiente no overlay

Se quiser overlay com gradiente:

```tsx
className="absolute inset-0 bg-gradient-to-t from-coffee-900/80 via-coffee-900/50 to-transparent"
```

---

## 📝 Notas Importantes

1. **Imagens dos botões**:
   - As imagens sugeridas são exemplos
   - Pode escolher outras imagens disponíveis em `public/`
   - Certifique-se de que as imagens existem antes de implementar

2. **URLs dos links**:
   - "Galeria de experiências" pode usar `#galeria` (seção na mesma página) ou `/galeria` (página separada)
   - "Blog" pode usar `/blog` (página interna) ou URL externa
   - Ajustar conforme a estrutura do projeto

3. **Centralização vertical**:
   - O `items-center` no grid principal garante alinhamento vertical
   - O `justify-center` nas colunas centraliza o conteúdo dentro de cada coluna
   - Isso cria um layout equilibrado mesmo com alturas diferentes

4. **Responsividade**:
   - Em mobile, todos os elementos aparecem em ordem vertical
   - Em desktop, as colunas ficam lado a lado
   - Os cards têm largura máxima (`max-w-md`) para não ficarem muito largos

5. **Acessibilidade**:
   - Links têm estados de foco visíveis
   - Texto com drop shadow para melhor legibilidade
   - Overlay escuro garante contraste adequado
   - Atributos `alt` descritivos nas imagens

---

## 🚀 Próximos Passos

1. **Revisar documentação**: Confirmar que todas as especificações estão corretas
2. **Verificar imagens**: Confirmar que as imagens sugeridas existem ou escolher outras
3. **Definir URLs**: Decidir URLs finais para os botões
4. **Autorizar implementação**: Aguardar aprovação para implementar
5. **Implementar código**: Seguir estrutura JSX proposta
6. **Testar**: Validar responsividade, links e visual
7. **Ajustar**: Fazer fine-tuning se necessário

---

## 🆘 Troubleshooting

### Cards não aparecem na coluna esquerda
- ✅ Verificar se os cards foram movidos para dentro do container da coluna esquerda
- ✅ Confirmar que não há erros de sintaxe JSX
- ✅ Verificar se o container tem `flex flex-col`

### Botões não aparecem
- ✅ Verificar se os botões foram criados na coluna direita
- ✅ Confirmar que o import do `Link` está correto
- ✅ Verificar se as imagens existem nos caminhos especificados

### Imagens não aparecem nos botões
- ✅ Verificar se os caminhos das imagens estão corretos
- ✅ Confirmar que as imagens existem em `public/`
- ✅ Verificar se o `fill` e `object-cover` estão aplicados

### Drop shadow não aparece
- ✅ Verificar se a classe `drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]` está aplicada
- ✅ Tentar usar `text-shadow` se `drop-shadow` não funcionar
- ✅ Verificar se o Tailwind está compilando corretamente

### Links não funcionam
- ✅ Verificar se o `href` está correto
- ✅ Confirmar que as rotas existem (se for rota interna)
- ✅ Testar com `#galeria` primeiro (seção na mesma página)

### Layout quebrado em mobile
- ✅ Confirmar que o grid tem `grid-cols-1` para mobile
- ✅ Verificar se os cards têm `w-full max-w-md`
- ✅ Testar em diferentes dispositivos

### Botões muito altos ou baixos
- ✅ Ajustar altura: `h-48` (192px), `h-56` (224px), `h-64` (256px)
- ✅ Testar em diferentes resoluções
- ✅ Verificar se o conteúdo fica visível

---

## 📌 Referências

- **Arquivo atual**: `components/audience.tsx`
- **Documentação anterior**: `docs/12-reposicionamento-de-titulo.md`
- **Componente de galeria**: `components/gallery.tsx` (para referência de imagens)
- **Paleta de cores**: `app/globals.css` (linhas 84-100)
- **Next.js Link**: [Documentação oficial](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)

---

**Documentação criada em:** 2025-01-27  
**Seção:** 4 (Audience/Regiões Atendidas)  
**Status:** 📝 Documentação pronta - Aguardando autorização para implementação

---

## 📋 Resumo Executivo

### O que será feito:
- ✅ Mover 3 cards para a coluna esquerda (junto com título e mapa)
- ✅ Substituir cards na coluna direita por 2 botões grandes
- ✅ Botões com imagens de fundo, borda branca e texto com drop shadow
- ✅ Links funcionais: "Galeria de experiências" e "Blog"
- ✅ Manter padrão visual do projeto

### Arquivos a modificar:
- `components/audience.tsx` (reestruturação completa)

### Impacto:
- ✅ Mudança significativa de layout
- ✅ Nova funcionalidade de navegação
- ✅ Melhor aproveitamento do espaço
- ✅ Layout mais dinâmico e interativo
- ✅ Sem breaking changes funcionais (apenas visual)

### Mudanças técnicas:
- **Adicionar**: Import do `Link` do Next.js
- **Mover**: 3 cards para coluna esquerda
- **Criar**: 2 botões com imagens na coluna direita
- **Manter**: Título e mapa na coluna esquerda
- **Aplicar**: Estilos de botões (borda branca, drop shadow, hover effects)

