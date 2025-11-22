# 17 — Nova Seção: Flipcard com Benefícios do Café

## 📋 Objetivo

Criar uma nova seção entre "Nossos Serviços" e "Regiões Atendidas" contendo um flipcard interativo com animação fluída. A seção deve apresentar dois lados:

- **Lado 1**: "Personalização para seu evento" - 5 opções de personalização com imagens alternadas
- **Lado 2**: "Poderes do Café" - 5 benefícios do café com imagens alternadas

**Características principais**:
- Background: `#a7834c` (coffee-500 / dourado)
- Flipcard grande ocupando quase toda a seção
- Margem considerável seguindo padrão do projeto
- Animação 3D fluída ao virar o card
- Alternância de posição das imagens (esquerda/direita)
- UI/UX moderna e simétrica
- Ícones de navegação para virar o card

---

## 🎨 Especificações de Design

### Posicionamento da Seção

A nova seção deve ser inserida entre:
- **Antes**: Seção "Nossos Serviços" (`<Services />`)
- **Depois**: Seção "Regiões Atendidas" (`<Audience />`)

No arquivo `app/page.tsx`, a ordem deve ser:
1. Hero
2. About
3. Differentials
4. Services (Nossos Serviços)
5. **→ FlipCard (NOVA SEÇÃO)** ← 
6. Audience (Regiões Atendidas)
7. Gallery
8. Testimonials
9. Contact

---

## 📐 Layout Visual

### Estrutura da Seção

```
┌───────────────────────────────────────────────────────────┐
│                                                           │
│  [MARGEM SUPERIOR - py-20]                                │
│                                                           │
│    ┌────────────────────────────────────────────┐        │
│    │                                            │        │
│    │         [FLIPCARD CONTAINER]               │        │
│    │                                            │        │
│    │   ╔═══════════════════════════════════╗   │        │
│    │   ║                                   ║   │        │
│    │   ║  [LADO 1 ou LADO 2 VISÍVEL]       ║   │        │
│    │   ║                                   ║   │        │
│    │   ║  (rotaciona em Y ao clicar)       ║   │        │
│    │   ║                                   ║   │        │
│    │   ╚═══════════════════════════════════╝   │        │
│    │                                            │        │
│    └────────────────────────────────────────────┘        │
│                                                           │
│  [MARGEM INFERIOR - py-20]                                │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Lado 1: "Personalização para seu evento"

```
╔═══════════════════════════════════════════════════╗
║                                                   ║
║        PERSONALIZAÇÃO PARA SEU EVENTO             ║
║                  (Título H2)                      ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ [IMG] │ Opção 1: Logo personalizado    │     ║
║  │  📷   │ Descrição...                    │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ Opção 2: Cardápio exclusivo   │ [IMG]  │     ║
║  │ Descrição...                   │  📷   │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ [IMG] │ Opção 3: Decoração temática    │     ║
║  │  📷   │ Descrição...                    │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ Opção 4: Copos personalizados │ [IMG]  │     ║
║  │ Descrição...                   │  📷   │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ [IMG] │ Opção 5: Atendimento exclusivo │     ║
║  │  📷   │ Descrição...                    │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║              Poderes do Café →                    ║
║                  [🔄 ÍCONE]                      ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
```

### Lado 2: "Poderes do Café"

```
╔═══════════════════════════════════════════════════╗
║                                                   ║
║              PODERES DO CAFÉ                      ║
║              (Título H2)                          ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ Benefício 1: Aumenta o foco   │ [IMG]  │     ║
║  │ Descrição...                   │  📷   │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ [IMG] │ Benefício 2: Melhora humor     │     ║
║  │  📷   │ Descrição...                    │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ Benefício 3: Energia natural  │ [IMG]  │     ║
║  │ Descrição...                   │  📷   │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ [IMG] │ Benefício 4: Antioxidantes     │     ║
║  │  📷   │ Descrição...                    │     ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║  ┌─────────────────────────────────────────┐     ║
║  │ Benefício 5: Experiência social │ [IMG] │    ║
║  │ Descrição...                     │  📷  │    ║
║  └─────────────────────────────────────────┘     ║
║                                                   ║
║         ← Personalização para seu evento          ║
║                  [🔄 ÍCONE]                      ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
```

---

## 🏗️ Estrutura de Componentes

### Arquivo a ser criado

**Novo arquivo**: `components/flipcard.tsx`

### Hierarquia de Componentes

```
<section> (seção principal)
└── <div> (container max-w-7xl)
    └── <div> (flipcard perspective container)
        └── <div> (flipcard inner - rotaciona)
            ├── <div> (flipcard front - Lado 1)
            │   ├── <h2> (título)
            │   ├── <div> (grid de itens)
            │   │   ├── <div> (item 1 - img esquerda)
            │   │   ├── <div> (item 2 - img direita)
            │   │   ├── <div> (item 3 - img esquerda)
            │   │   ├── <div> (item 4 - img direita)
            │   │   └── <div> (item 5 - img esquerda)
            │   └── <button> (botão virar → Lado 2)
            │       ├── <span> (texto "Poderes do Café")
            │       └── <RotateCw /> (ícone)
            │
            └── <div> (flipcard back - Lado 2)
                ├── <h2> (título)
                ├── <div> (grid de itens)
                │   ├── <div> (item 1 - img direita)
                │   ├── <div> (item 2 - img esquerda)
                │   ├── <div> (item 3 - img direita)
                │   ├── <div> (item 4 - img esquerda)
                │   └── <div> (item 5 - img direita)
                └── <button> (botão virar → Lado 1)
                    ├── <span> (texto "Personalização...")
                    └── <RotateCcw /> (ícone)
```

---

## 🎨 Paleta de Cores

### Cores Específicas da Seção

```css
/* Background da seção */
background: #a7834c (coffee-500)

/* Flipcard */
background: #331b09 (coffee-900)
border: #573819 (coffee-700)

/* Texto */
títulos: #ffffff (white)
descrições: #eff0e0 (cream-50)
destaques: #a7834c (coffee-500)

/* Itens */
background: #331c09 ou rgba(51, 28, 9, 0.6)
border: #573819 (coffee-700)
hover-border: rgba(167, 131, 76, 0.5) (coffee-500/50)

/* Botão de virar */
background: transparent
border: #ffffff (white) ou #a7834c (coffee-500)
text: #ffffff (white)
hover: bg-coffee-500/10
```

### Classes Tailwind Correspondentes

```javascript
// Seção
className="bg-[#a7834c]" // ou bg-coffee-500

// Flipcard
className="bg-coffee-900 border-2 border-coffee-700"

// Texto
className="text-white" // títulos
className="text-cream-50" // descrições
className="text-coffee-500" // destaques

// Itens
className="bg-coffee-900/60 border border-coffee-700 hover:border-coffee-500/50"

// Botão virar
className="border-2 border-white text-white hover:bg-white/10"
```

---

## 📱 Responsividade

### Breakpoints

```javascript
// Mobile (< 640px)
- Flipcard: padding reduzido (p-6)
- Itens: empilhados verticalmente
- Imagens: largura 80px
- Título: text-2xl
- Texto: text-sm

// Tablet (640px - 1024px)
- Flipcard: padding médio (p-8)
- Itens: flex horizontal
- Imagens: largura 100px
- Título: text-3xl
- Texto: text-base

// Desktop (≥ 1024px)
- Flipcard: padding completo (p-12)
- Itens: flex horizontal
- Imagens: largura 120px
- Título: text-4xl
- Texto: text-lg
```

### Classes Responsivas

```javascript
// Container principal
className="py-12 sm:py-16 lg:py-20"

// Flipcard
className="p-6 sm:p-8 lg:p-12"

// Título
className="text-2xl sm:text-3xl lg:text-4xl"

// Itens
className="flex-col sm:flex-row" // mobile empilhado, desktop horizontal

// Imagens
className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28"

// Texto
className="text-sm sm:text-base lg:text-lg"

// Gap entre itens
className="gap-4 sm:gap-6 lg:gap-8"
```

---

## ⚡ Animação do Flip

### CSS Customizado

Adicionar ao arquivo `app/globals.css` ou criar em `components/flipcard.tsx` com tags `<style jsx>`:

```css
/* Container com perspectiva */
.flip-container {
  perspective: 1000px;
}

/* Inner container que rotaciona */
.flip-card-inner {
  position: relative;
  width: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
  transform-style: preserve-3d;
}

/* Estado flipped */
.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

/* Lados do card */
.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Lado frontal */
.flip-card-front {
  transform: rotateY(0deg);
}

/* Lado traseiro (começa rotacionado 180°) */
.flip-card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
}
```

### Função de Toggle (useState)

```javascript
'use client'

import { useState } from 'react'

export default function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    // ... JSX com onClick={handleFlip}
  )
}
```

---

## 📝 Conteúdo Sugerido

### Lado 1: Personalização para seu evento

**Título**: "PERSONALIZAÇÃO PARA SEU EVENTO"

**Itens**:

1. **Logo Personalizado** (imagem esquerda)
   - Texto: "Adicione a identidade da sua empresa ou evento em copos, guardanapos e estações de café."
   - Imagem: `coffee-station-with-branded-logo-personalized.jpg`

2. **Cardápio Exclusivo** (imagem direita)
   - Texto: "Crie um menu de cafés especiais sob medida para o perfil e preferências dos seus convidados."
   - Imagem: `professional-barista-making-latte-art.jpg`

3. **Decoração Temática** (imagem esquerda)
   - Texto: "Estação de café decorada e harmonizada com a identidade visual do seu evento."
   - Imagem: `coffee-station-setup-at-wedding-reception.jpg`

4. **Copos Personalizados** (imagem direita)
   - Texto: "Copos exclusivos com nome do evento, logo ou mensagem especial para cada convidado."
   - Imagem: `guests-enjoying-gourmet-coffee-at-premium-event.jpg`

5. **Atendimento Exclusivo** (imagem esquerda)
   - Texto: "Baristas profissionais treinados para proporcionar uma experiência premium e memorável."
   - Imagem: `barista-serving-espresso-at-corporate-event.jpg`

**Botão**: "Poderes do Café" + ícone `RotateCw`

### Lado 2: Poderes do Café

**Título**: "PODERES DO CAFÉ"

**Itens**:

1. **Aumenta o Foco** (imagem direita)
   - Texto: "A cafeína estimula o sistema nervoso central, melhorando a concentração e produtividade durante seu evento."
   - Imagem: `professional-barista-making-latte-art.jpg`

2. **Melhora o Humor** (imagem esquerda)
   - Texto: "O aroma e sabor do café liberam dopamina, criando momentos de prazer e bem-estar para seus convidados."
   - Imagem: `guests-enjoying-gourmet-coffee-at-premium-event.jpg`

3. **Energia Natural** (imagem direita)
   - Texto: "Fonte natural de energia que mantém todos alertas e engajados durante todo o evento."
   - Imagem: `espresso-machine-coffee-station-at-fair.jpg`

4. **Rico em Antioxidantes** (imagem esquerda)
   - Texto: "O café é uma das maiores fontes de antioxidantes, promovendo saúde e vitalidade."
   - Imagem: `barista-serving-espresso-at-corporate-event.jpg`

5. **Experiência Social** (imagem direita)
   - Texto: "O café cria momentos de conexão, conversas significativas e networking entre os participantes."
   - Imagem: `coffee-station-setup-at-wedding-reception.jpg`

**Botão**: "Personalização para seu evento" + ícone `RotateCcw`

---

## 💻 Implementação Detalhada

### 1. Criar o arquivo `components/flipcard.tsx`

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RotateCw, RotateCcw } from 'lucide-react'

export default function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Dados do Lado 1
  const side1Items = [
    {
      id: 1,
      title: 'Logo Personalizado',
      description: 'Adicione a identidade da sua empresa ou evento em copos, guardanapos e estações de café.',
      image: '/coffee-station-with-branded-logo-personalized.jpg',
      imagePosition: 'left'
    },
    {
      id: 2,
      title: 'Cardápio Exclusivo',
      description: 'Crie um menu de cafés especiais sob medida para o perfil e preferências dos seus convidados.',
      image: '/professional-barista-making-latte-art.jpg',
      imagePosition: 'right'
    },
    {
      id: 3,
      title: 'Decoração Temática',
      description: 'Estação de café decorada e harmonizada com a identidade visual do seu evento.',
      image: '/coffee-station-setup-at-wedding-reception.jpg',
      imagePosition: 'left'
    },
    {
      id: 4,
      title: 'Copos Personalizados',
      description: 'Copos exclusivos com nome do evento, logo ou mensagem especial para cada convidado.',
      image: '/guests-enjoying-gourmet-coffee-at-premium-event.jpg',
      imagePosition: 'right'
    },
    {
      id: 5,
      title: 'Atendimento Exclusivo',
      description: 'Baristas profissionais treinados para proporcionar uma experiência premium e memorável.',
      image: '/barista-serving-espresso-at-corporate-event.jpg',
      imagePosition: 'left'
    }
  ]

  // Dados do Lado 2
  const side2Items = [
    {
      id: 1,
      title: 'Aumenta o Foco',
      description: 'A cafeína estimula o sistema nervoso central, melhorando a concentração e produtividade durante seu evento.',
      image: '/professional-barista-making-latte-art.jpg',
      imagePosition: 'right'
    },
    {
      id: 2,
      title: 'Melhora o Humor',
      description: 'O aroma e sabor do café liberam dopamina, criando momentos de prazer e bem-estar para seus convidados.',
      image: '/guests-enjoying-gourmet-coffee-at-premium-event.jpg',
      imagePosition: 'left'
    },
    {
      id: 3,
      title: 'Energia Natural',
      description: 'Fonte natural de energia que mantém todos alertas e engajados durante todo o evento.',
      image: '/espresso-machine-coffee-station-at-fair.jpg',
      imagePosition: 'right'
    },
    {
      id: 4,
      title: 'Rico em Antioxidantes',
      description: 'O café é uma das maiores fontes de antioxidantes, promovendo saúde e vitalidade.',
      image: '/barista-serving-espresso-at-corporate-event.jpg',
      imagePosition: 'left'
    },
    {
      id: 5,
      title: 'Experiência Social',
      description: 'O café cria momentos de conexão, conversas significativas e networking entre os participantes.',
      image: '/coffee-station-setup-at-wedding-reception.jpg',
      imagePosition: 'right'
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-coffee-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Container com perspectiva */}
        <div className="flip-container min-h-[600px] lg:min-h-[800px]">
          
          {/* Inner container que rotaciona */}
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            
            {/* LADO 1: Personalização para seu evento */}
            <div className="flip-card-front">
              <div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
                
                {/* Título */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12">
                  PERSONALIZAÇÃO PARA SEU EVENTO
                </h2>

                {/* Grid de Itens */}
                <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-12">
                  {side1Items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row ${
                        item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''
                      } items-center gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-all duration-300`}
                    >
                      {/* Imagem */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                        />
                      </div>

                      {/* Texto */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-coffee-500 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-cream-50 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão para virar */}
                <button
                  onClick={handleFlip}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  aria-label="Virar para Poderes do Café"
                >
                  <span className="text-base sm:text-lg lg:text-xl font-semibold">
                    Poderes do Café
                  </span>
                  <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* LADO 2: Poderes do Café */}
            <div className="flip-card-back">
              <div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
                
                {/* Título */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12">
                  PODERES DO CAFÉ
                </h2>

                {/* Grid de Itens */}
                <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-12">
                  {side2Items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row ${
                        item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''
                      } items-center gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-all duration-300`}
                    >
                      {/* Imagem */}
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                        />
                      </div>

                      {/* Texto */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-coffee-500 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-cream-50 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão para virar de volta */}
                <button
                  onClick={handleFlip}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  aria-label="Virar para Personalização"
                >
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-rotate-180 transition-transform duration-500" />
                  <span className="text-base sm:text-lg lg:text-xl font-semibold">
                    Personalização para seu evento
                  </span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* CSS para animação do flip */}
      <style jsx>{`
        .flip-container {
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .flip-card-front {
          transform: rotateY(0deg);
        }

        .flip-card-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  )
}
```

### 2. Adicionar o componente em `app/page.tsx`

```tsx
import Hero from "@/components/hero/Hero"
import About from "@/components/about"
import Differentials from "@/components/differentials"
import Services from "@/components/services"
import FlipCard from "@/components/flipcard" // ← NOVO IMPORT
import Audience from "@/components/audience"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Differentials />
      <Services />
      <FlipCard /> {/* ← NOVA SEÇÃO */}
      <Audience />
      <Gallery />
      <Testimonials />
      <Contact />
    </main>
  )
}
```

---

## ✅ Checklist de Implementação

### Estrutura

- [ ] Criar arquivo `components/flipcard.tsx`
- [ ] Adicionar diretiva `'use client'` no topo do arquivo
- [ ] Importar dependências: `useState`, `Image`, `RotateCw`, `RotateCcw`
- [ ] Adicionar componente em `app/page.tsx` entre `<Services />` e `<Audience />`

### Conteúdo

- [ ] Configurar arrays `side1Items` (5 itens - Personalização)
- [ ] Configurar arrays `side2Items` (5 itens - Poderes do Café)
- [ ] Verificar que as imagens existem na pasta `/public`
- [ ] Adicionar títulos: "PERSONALIZAÇÃO PARA SEU EVENTO" e "PODERES DO CAFÉ"
- [ ] Adicionar textos de botões com ícones

### Estilo

- [ ] Background da seção: `bg-coffee-500` (`#a7834c`)
- [ ] Flipcard: `bg-coffee-900` + `border-coffee-700`
- [ ] Itens: `bg-coffee-900/60` + `border-coffee-700` + hover
- [ ] Botão virar: `border-white` + hover effect
- [ ] Textos: títulos `text-white`, descrições `text-cream-50`, destaques `text-coffee-500`
- [ ] Border radius: `rounded-3xl` (card), `rounded-2xl` (itens), `rounded-xl` (botão/imagens)

### Animação

- [ ] CSS customizado com `<style jsx>` adicionado
- [ ] Container com `perspective: 1000px`
- [ ] Inner com `transform-style: preserve-3d`
- [ ] Transição suave: `0.8s cubic-bezier`
- [ ] `backface-visibility: hidden` nos lados
- [ ] Estado `isFlipped` controlando rotação

### Responsividade

- [ ] Mobile: itens empilhados (`flex-col`)
- [ ] Desktop: itens horizontais (`sm:flex-row`)
- [ ] Imagens responsivas: `w-20 sm:w-24 lg:w-28`
- [ ] Padding adaptativo: `p-6 sm:p-8 lg:p-12`
- [ ] Texto responsivo: `text-sm sm:text-base lg:text-lg`
- [ ] Gap responsivo: `gap-4 sm:gap-6 lg:gap-8`

### Interatividade

- [ ] `useState` para controlar `isFlipped`
- [ ] Função `handleFlip` para toggle
- [ ] Botão frontal vira para o lado 2
- [ ] Botão traseiro vira de volta para o lado 1
- [ ] Ícone `RotateCw` com rotação no hover
- [ ] Ícone `RotateCcw` com rotação reversa no hover

### Acessibilidade

- [ ] `aria-label` nos botões de flip
- [ ] `alt` text descritivo nas imagens
- [ ] Contraste adequado (texto branco/cream em fundo escuro)
- [ ] Estados de hover visíveis
- [ ] Transições suaves (não abruptas)

### Testes Visuais

- [ ] Verificar alinhamento das imagens (esquerda/direita alternando)
- [ ] Testar flip animation (suave e sem glitches)
- [ ] Conferir que o lado 2 aparece corretamente ao virar
- [ ] Verificar responsividade em mobile, tablet e desktop
- [ ] Testar hover effects nos itens e botão
- [ ] Conferir que imagens carregam corretamente
- [ ] Validar que a seção está entre Services e Audience

---

## 🎯 Resultado Esperado

### Comportamento

1. **Carregamento inicial**: Seção com background dourado (`#a7834c`) exibe o Lado 1 ("Personalização para seu evento")
2. **Visualização**: 5 itens com imagens alternando entre esquerda e direita, cada um com título e descrição
3. **Interação**: Ao clicar no botão "Poderes do Café →", o card gira em 3D (eixo Y) por 0.8s
4. **Lado 2**: Após girar, exibe "Poderes do Café" com 5 novos itens (padrão invertido de imagens)
5. **Retorno**: Ao clicar "← Personalização para seu evento", o card gira de volta ao Lado 1

### Visual

- Card grande centralizado com margem generosa
- Animação 3D fluída e suave
- Imagens quadradas pequenas, nítidas e bem posicionadas
- Texto legível com boa hierarquia visual
- Hover effects sutis nos itens
- Botão de flip destacado e convidativo
- Responsivo e adaptado a todos os tamanhos de tela

### UX

- Transição suave sem jumps ou glitches
- Interação clara e intuitiva
- Feedback visual no hover
- Ícones animados que indicam a ação
- Layout simétrico e balanceado
- Conteúdo relevante e persuasivo

---

## 📚 Referências Técnicas

### Lucide Icons usados

- `RotateCw`: Ícone "rotate clockwise" (sentido horário) para ir do Lado 1 (Personalização) → Lado 2 (Poderes do Café)
- `RotateCcw`: Ícone "rotate counter-clockwise" (anti-horário) para voltar do Lado 2 (Poderes do Café) → Lado 1 (Personalização)

### Next.js Image

- `fill`: Preenche o container pai (requer `position: relative` no pai)
- `object-cover`: Mantém proporção e cobre toda a área
- `sizes`: Otimiza carregamento responsivo

### Tailwind CSS

- `perspective-*`: Não disponível nativamente, usar CSS customizado
- `transform-style-3d`: Não disponível nativamente, usar CSS customizado
- `backface-visibility`: Não disponível nativamente, usar CSS customizado
- `rotate-y-*`: Não disponível nativamente, usar CSS customizado com `transform: rotateY()`

### CSS Transform 3D

```css
/* Necessário para flip 3D funcionar */
perspective: 1000px; /* profundidade da perspectiva */
transform-style: preserve-3d; /* mantém transformações 3D dos filhos */
backface-visibility: hidden; /* esconde o lado de trás */
transform: rotateY(180deg); /* rotaciona no eixo Y */
```

---

## 🐛 Possíveis Problemas e Soluções

### Problema 1: Flip não funciona ou tem glitches

**Causa**: CSS 3D não aplicado corretamente

**Solução**:
- Verificar que o CSS customizado está dentro de `<style jsx>`
- Confirmar que `transform-style: preserve-3d` está no container que rotaciona
- Adicionar `-webkit-backface-visibility: hidden` para Safari

### Problema 2: Ambos os lados visíveis ao mesmo tempo

**Causa**: `backface-visibility` não funcionando

**Solução**:
```css
.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari */
}
```

### Problema 3: Imagens não carregam

**Causa**: Arquivos não existem ou caminho incorreto

**Solução**:
- Verificar que as imagens estão em `/public`
- Conferir que os nomes estão corretos (case-sensitive)
- Usar imagens placeholder se necessário: `/placeholder.jpg`

### Problema 4: Componente não aparece

**Causa**: Não adicionado em `app/page.tsx` ou erro de importação

**Solução**:
- Confirmar import: `import FlipCard from "@/components/flipcard"`
- Verificar que está entre `<Services />` e `<Audience />`
- Checar console do navegador para erros

### Problema 5: Layout quebra em mobile

**Causa**: Classes responsivas não aplicadas

**Solução**:
- Usar `flex-col sm:flex-row` para empilhar em mobile
- Reduzir tamanhos: `text-sm sm:text-base lg:text-lg`
- Diminuir padding: `p-6 sm:p-8 lg:p-12`

### Problema 6: Animação muito rápida/lenta

**Causa**: Duração da transição inadequada

**Solução**:
- Ajustar `transition: transform 0.8s` (aumentar ou diminuir o tempo)
- Testar diferentes valores: `0.6s`, `0.8s`, `1s`
- Usar `cubic-bezier(0.4, 0.0, 0.2, 1)` para suavidade

---

## 📝 Notas Adicionais

### Extensibilidade

Este componente pode ser facilmente estendido para:
- Adicionar mais itens (além de 5)
- Criar um flipcard com 3+ lados (usando `rotateY(120deg)`, etc)
- Adicionar animações de entrada (fade-in, slide-up)
- Implementar auto-flip após X segundos
- Adicionar indicadores de lado (dots ou números)

### Performance

- As imagens são otimizadas automaticamente pelo Next.js `Image`
- Use `priority={false}` para lazy loading
- Considere adicionar `placeholder="blur"` para transições suaves
- CSS transforms são acelerados por GPU (performance ótima)

### Acessibilidade

- Adicione `role="region"` e `aria-label` na seção
- Use `aria-live="polite"` para anunciar mudanças de lado
- Garanta que o botão seja acessível via teclado (Tab + Enter)
- Considere adicionar `prefers-reduced-motion` para usuários sensíveis a animações

### SEO

- Use tags semânticas (`<section>`, `<h2>`, `<h3>`)
- Adicione `alt` text descritivo nas imagens
- Considere adicionar schema.org markup se relevante
- Texto é indexável (não está em imagens)

---

## 🎉 Conclusão

Esta documentação fornece todos os detalhes necessários para implementar uma seção de flipcard interativa e visualmente atraente. O componente:

✅ Segue a paleta de cores do projeto
✅ Usa animações CSS 3D fluídas
✅ É totalmente responsivo
✅ Tem conteúdo persuasivo e relevante
✅ Oferece excelente UX com feedback visual
✅ É acessível e performático
✅ Integra-se perfeitamente com o design existente

**Próximos passos**:
1. Criar o arquivo `components/flipcard.tsx` com o código fornecido
2. Adicionar o componente em `app/page.tsx`
3. Testar a animação e responsividade
4. Ajustar conteúdo e imagens conforme necessário
5. Verificar acessibilidade e performance

**Resultado esperado**: Uma seção impactante que destaca os benefícios do café e as opções de personalização de forma interativa e memorável! ☕✨

