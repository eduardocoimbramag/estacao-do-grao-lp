# Implementação: Split Screen Interativo

## Objetivo

Substituir o componente **FlipCard** atual por um **Split Screen Interativo com Transição**, oferecendo uma experiência visual mais moderna, dinâmica e diferenciada.

---

## Visão Geral

### Desktop (≥640px - sm breakpoint)
- **Split Screen 50/50** dividindo a tela ao meio
- **Lado Esquerdo:** Personalização para seu evento (5 itens)
- **Lado Direito:** Poderes do Café (5 itens)
- **Interatividade:**
  - **Hover:** Lado expandido para 65%, o outro reduz para 35%
  - **Click:** Alterna foco completo (70/30 fixo) ou retorna ao estado balanceado (50/50)
- **Animações:** Transições suaves com Framer Motion

### Mobile (<640px)
- **Tabs Horizontais** no topo para alternar entre os dois temas
- **Conteúdo desliza horizontalmente** com animação
- **Lista scrollável** de itens em cada tab
- **Indicador visual** da tab ativa

---

## Estrutura do Conteúdo

### Lado 1: Personalização para seu evento (5 itens)
1. Logo Personalizado
2. Cardápio Exclusivo
3. Decoração Temática
4. Copos Personalizados
5. Atendimento Exclusivo

### Lado 2: Poderes do Café (5 itens)
1. Clima de Confiança para Negócios
2. Clima de Confiança para Negócios (variante)
3. O Queridinho do Mundo Corporativo
4. Aumento do Poder Cognitivo
5. Faísca para Ideias e Inovação

**Total:** 10 itens preservados do componente original

---

## Bibliotecas Necessárias

### Framer Motion

Já instalado no projeto (verificar em `package.json`). Caso não esteja:

```bash
pnpm add framer-motion
```

**Uso:** Animações suaves, transições de layout, gestos

---

## Implementação Completa

### 1. Novo Componente: `components/split-screen-content.tsx`

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

type Side = 'left' | 'right' | null

interface ContentItem {
  id: number
  title: string
  description: string
  image: string
  imagePosition: 'left' | 'right'
}

export default function SplitScreenContent() {
  // Estado para desktop: controla qual lado está expandido
  const [activeSide, setActiveSide] = useState<Side>(null)
  const [lockedSide, setLockedSide] = useState<Side>(null)
  
  // Estado para mobile: controla qual tab está ativa
  const [activeTab, setActiveTab] = useState<'personalizacao' | 'poderes'>('personalizacao')

  // Dados do Lado 1: Personalização
  const side1Items: ContentItem[] = [
    {
      id: 1,
      title: 'Logo Personalizado',
      description: 'O Branding no Centro da Experiência. Transforme a coffee station em uma extensão visual da sua marca. Garantimos que seu logo e identidade estejam presentes em copos, guardanapos e no design da estação. Um toque sutil, mas constante, que reforça a lembrança da sua empresa e o profissionalismo do evento.',
      image: '/coffee-station-with-branded-logo-personalized.jpg',
      imagePosition: 'left'
    },
    {
      id: 2,
      title: 'Cardápio Exclusivo',
      description: 'Um Menu de Cafés Criado Sob Medida. Desenvolvemos um cardápio especial que reflete o perfil do seu público e o tema do evento. Seleção de bebidas premium e acompanhamentos finos. Surpreenda com uma bebida signature, pensada para encantar e tornar a experiência sensorial verdadeiramente exclusiva.',
      image: '/professional-barista-making-latte-art.jpg',
      imagePosition: 'right'
    },
    {
      id: 3,
      title: 'Decoração Temática',
      description: 'Harmonia Visual para um Ambiente Cativante. Nossa estrutura móvel se adapta e se harmoniza com a decoração do seu evento. Garantimos que a estação esteja em sintonia com a identidade visual da sua festa ou stand. Criamos um ponto de encontro sofisticado que complementa o alto padrão estético do seu espaço.',
      image: '/coffee-station-setup-at-wedding-reception.jpg',
      imagePosition: 'left'
    },
    {
      id: 4,
      title: 'Copos Personalizados',
      description: 'Detalhes que se Tornam Lembranças Vivas. Personalizamos copos com o nome do evento, logo ou mensagem especial. É um toque de cuidado máximo que agrada o convidado e transforma o copo em uma lembrança de valor. Estenda a ativação da sua marca para além do momento do evento.',
      image: '/guests-enjoying-gourmet-coffee-at-premium-event.jpg',
      imagePosition: 'right'
    },
    {
      id: 5,
      title: 'Atendimento Exclusivo',
      description: 'Baristas Certificados: Técnica, Carisma e Padrão Premium. Nossa equipe é treinada para proporcionar uma experiência memorável. Eles garantem a extração perfeita e interagem com profissionalismo. Conte com a expertise de quem atende a eventos corporativos de alto padrão e alto fluxo com agilidade e excelência.',
      image: '/barista-serving-espresso-at-corporate-event.jpg',
      imagePosition: 'left'
    }
  ]

  // Dados do Lado 2: Poderes do Café
  const side2Items: ContentItem[] = [
    {
      id: 1,
      title: 'Clima de Confiança para Negócios',
      description: 'O consumo moderado de café está associado à melhora do humor e à redução da tensão. Em negociações e momentos de fechamento, oferecer um café de qualidade estabelece um clima de acolhimento e respeito, tornando o ambiente mais propício ao diálogo aberto. Essa sensação de bem-estar pode ser o diferencial sutil no sucesso da sua transação.',
      image: '/professional-barista-making-latte-art.jpg',
      imagePosition: 'right'
    },
    {
      id: 2,
      title: 'Clima de Confiança para Negócios',
      description: 'A pausa para um café especial é mais do que um agrado; é o tempo ideal que sua equipe precisa. Enquanto o convidado desfruta do seu espresso (cerca de 3 a 5 minutos), ele permanece engajado no seu estande. Esse momento de consumo torna-se uma âncora de permanência, garantindo a abertura necessária para uma abordagem de vendas ou a apresentação de conteúdo chave.',
      image: '/guests-enjoying-gourmet-coffee-at-premium-event.jpg',
      imagePosition: 'left'
    },
    {
      id: 3,
      title: 'O Queridinho do Mundo Corporativo',
      description: 'O café é a bebida mais consumida no ambiente de trabalho brasileiro, com mais de 90% dos profissionais o consumindo regularmente. Ao oferecer um café especial, você atinge praticamente toda a sua audiência, criando um ponto de interesse comum imediato. Essa aceitação universal facilita a interação, quebra as barreiras hierárquicas e transforma o coffee station no epicentro natural de qualquer networking estratégico.',
      image: '/espresso-machine-coffee-station-at-fair.jpg',
      imagePosition: 'right'
    },
    {
      id: 4,
      title: 'Aumento do Poder Cognitivo',
      description: 'Estudos comprovam: a cafeína melhora o estado de alerta, a atenção focada e o processamento de informações. Ao oferecer um café especial durante palestras ou workshops, você garante que os participantes estejam mais concentrados e receptivos ao conteúdo apresentado. É um investimento direto na eficácia da comunicação e na retenção de conhecimento.',
      image: '/barista-serving-espresso-at-corporate-event.jpg',
      imagePosition: 'left'
    },
    {
      id: 5,
      title: 'Faísca para Ideias e Inovação',
      description: 'As maiores ideias e as melhores soluções muitas vezes surgem fora da sala de reuniões formal. O momento do café é um respiro que estimula a criatividade e permite que as mentes se conectem de forma lateral. Promover essa pausa revigorante é incentivar um ambiente dinâmico, colaborativo e fértil para a inovação.',
      image: '/coffee-station-setup-at-wedding-reception.jpg',
      imagePosition: 'right'
    }
  ]

  // Handlers para desktop
  const handleHoverStart = (side: 'left' | 'right') => {
    if (!lockedSide) {
      setActiveSide(side)
    }
  }

  const handleHoverEnd = () => {
    if (!lockedSide) {
      setActiveSide(null)
    }
  }

  const handleClick = (side: 'left' | 'right') => {
    if (lockedSide === side) {
      // Se já está locked neste lado, desbloqueia
      setLockedSide(null)
      setActiveSide(null)
    } else {
      // Bloqueia neste lado
      setLockedSide(side)
      setActiveSide(side)
    }
  }

  // Calcular flex do lado baseado em estado
  const getFlexValue = (side: 'left' | 'right') => {
    const effectiveSide = lockedSide || activeSide
    
    if (!effectiveSide) return 0.5 // 50/50
    
    if (effectiveSide === side) {
      return lockedSide === side ? 0.7 : 0.65 // 70% se locked, 65% se hover
    } else {
      return lockedSide ? 0.3 : 0.35 // 30% se outro locked, 35% se outro hover
    }
  }

  // Determinar opacidade do overlay
  const getOverlayOpacity = (side: 'left' | 'right') => {
    const effectiveSide = lockedSide || activeSide
    if (!effectiveSide) return 0.3
    return effectiveSide === side ? 0.1 : 0.5
  }

  // Componente de Card Individual
  const ContentCard = ({ item, isCompact }: { item: ContentItem; isCompact: boolean }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex flex-col sm:flex-row ${
        item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''
      } items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-coffee-900/70 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-coffee-700/30`}
    >
      {/* Imagem */}
      <motion.div
        layout
        className={`relative w-full flex-shrink-0 rounded-xl overflow-hidden ${
          isCompact
            ? 'max-w-[200px] h-[100px]'
            : 'max-w-[280px] sm:max-w-[320px] h-[120px] sm:h-[140px]'
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 280px, 320px"
        />
      </motion.div>

      {/* Texto */}
      <motion.div layout className="flex-1 flex flex-col justify-center text-center sm:text-left">
        <h3
          className={`font-bold text-coffee-500 mb-2 font-montserrat ${
            isCompact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`text-cream-50 leading-relaxed text-justify font-montserrat ${
            isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
          }`}
        >
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  )

  return (
    <section className="h-[calc(100vh-4rem)] bg-coffee-700 overflow-hidden w-full">
      {/* ============================================
          DESKTOP: Split Screen Interativo
          ============================================ */}
      <div className="hidden sm:flex h-full">
        {/* Lado Esquerdo: Personalização */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          animate={{ flex: getFlexValue('left') }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          onHoverStart={() => handleHoverStart('left')}
          onHoverEnd={handleHoverEnd}
          onClick={() => handleClick('left')}
        >
          {/* Background com Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/coffee-station-with-branded-logo-personalized.jpg"
              alt="Background Personalização"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-coffee-900"
              animate={{ opacity: getOverlayOpacity('left') }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 h-full flex flex-col p-6 lg:p-8">
            {/* Título */}
            <motion.div
              layout
              className="mb-6"
              animate={{
                scale: getFlexValue('left') > 0.5 ? 1 : 0.9,
                opacity: getFlexValue('left') > 0.5 ? 1 : 0.7
              }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center font-montserrat">
                PERSONALIZAÇÃO PARA SEU EVENTO
              </h2>
              
              {/* Indicador visual */}
              {getFlexValue('left') <= 0.5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center mt-4 text-white/60"
                >
                  <ChevronRight className="w-8 h-8 animate-pulse" />
                  <span className="text-sm font-montserrat">Clique para expandir</span>
                </motion.div>
              )}
            </motion.div>

            {/* Lista de Cards */}
            <motion.div
              layout
              className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-2 custom-scrollbar"
              animate={{
                opacity: getFlexValue('left') > 0.5 ? 1 : 0.6
              }}
            >
              <AnimatePresence mode="wait">
                {side1Items.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    isCompact={getFlexValue('left') < 0.6}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        {/* Divisor Central */}
        <motion.div
          className="w-1 bg-gradient-to-b from-coffee-500 via-coffee-400 to-coffee-500 shadow-lg relative z-20"
          animate={{
            boxShadow: (lockedSide || activeSide)
              ? '0 0 30px rgba(196, 142, 84, 0.8)'
              : '0 0 10px rgba(196, 142, 84, 0.4)'
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Lado Direito: Poderes do Café */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          animate={{ flex: getFlexValue('right') }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          onHoverStart={() => handleHoverStart('right')}
          onHoverEnd={handleHoverEnd}
          onClick={() => handleClick('right')}
        >
          {/* Background com Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/professional-barista-making-latte-art.jpg"
              alt="Background Poderes"
              fill
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-coffee-900"
              animate={{ opacity: getOverlayOpacity('right') }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 h-full flex flex-col p-6 lg:p-8">
            {/* Título */}
            <motion.div
              layout
              className="mb-6"
              animate={{
                scale: getFlexValue('right') > 0.5 ? 1 : 0.9,
                opacity: getFlexValue('right') > 0.5 ? 1 : 0.7
              }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center font-montserrat">
                PODERES DO CAFÉ
              </h2>
              
              {/* Indicador visual */}
              {getFlexValue('right') <= 0.5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center mt-4 text-white/60"
                >
                  <span className="text-sm font-montserrat">Clique para expandir</span>
                  <ChevronLeft className="w-8 h-8 animate-pulse" />
                </motion.div>
              )}
            </motion.div>

            {/* Lista de Cards */}
            <motion.div
              layout
              className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-2 custom-scrollbar"
              animate={{
                opacity: getFlexValue('right') > 0.5 ? 1 : 0.6
              }}
            >
              <AnimatePresence mode="wait">
                {side2Items.map((item) => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    isCompact={getFlexValue('right') < 0.6}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ============================================
          MOBILE: Tabs com Transição
          ============================================ */}
      <div className="block sm:hidden h-full flex flex-col">
        {/* Tabs Header */}
        <div className="flex border-b-2 border-coffee-500">
          <button
            onClick={() => setActiveTab('personalizacao')}
            className={`flex-1 py-4 px-3 text-center font-bold font-montserrat transition-all duration-300 relative ${
              activeTab === 'personalizacao'
                ? 'text-white bg-coffee-800'
                : 'text-cream-50/60 bg-coffee-900'
            }`}
          >
            <span className="text-sm sm:text-base">Personalização</span>
            {activeTab === 'personalizacao' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-coffee-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('poderes')}
            className={`flex-1 py-4 px-3 text-center font-bold font-montserrat transition-all duration-300 relative ${
              activeTab === 'poderes'
                ? 'text-white bg-coffee-800'
                : 'text-cream-50/60 bg-coffee-900'
            }`}
          >
            <span className="text-sm sm:text-base">Poderes do Café</span>
            {activeTab === 'poderes' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-coffee-400"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Tabs Content */}
        <div className="flex-1 overflow-hidden relative bg-coffee-900">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ x: activeTab === 'personalizacao' ? -20 : 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: activeTab === 'personalizacao' ? 20 : -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full overflow-y-auto p-4 space-y-3"
              style={{
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y'
              }}
            >
              {(activeTab === 'personalizacao' ? side1Items : side2Items).map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-3 p-3 bg-coffee-900/70 rounded-2xl border border-coffee-700/30"
                >
                  {/* Imagem */}
                  <div className="relative w-full max-w-[280px] h-[120px] flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="280px"
                    />
                  </div>

                  {/* Texto */}
                  <div className="flex-1 flex flex-col justify-center text-center w-full">
                    <h3 className="text-base font-bold text-coffee-500 mb-2 font-montserrat">
                      {item.title}
                    </h3>
                    <p className="text-sm text-cream-50 leading-relaxed text-justify font-montserrat">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
```

---

## 2. CSS Customizado: `app/globals.css`

Adicionar ao final do arquivo (ou dentro de um media query apropriado):

```css
/* ============================================
   SPLIT SCREEN CONTENT - Scrollbar Customizada
   ============================================ */

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(42, 34, 30, 0.3);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(196, 142, 84, 0.6);
  border-radius: 10px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(196, 142, 84, 0.9);
}

/* Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(196, 142, 84, 0.6) rgba(42, 34, 30, 0.3);
}

/* Animação de Pulse para indicadores */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

## 3. Atualizar `app/page.tsx`

Substituir a importação e uso do FlipCard:

**Antes:**
```tsx
import FlipCard from '@/components/flipcard'

// ...

<FlipCard />
```

**Depois:**
```tsx
import SplitScreenContent from '@/components/split-screen-content'

// ...

<SplitScreenContent />
```

---

## 4. Ajustes para Layouts Responsivos Existentes

### laydesk2 (1368×768)

Adicionar no bloco `@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px)` em `app/globals.css`:

```css
/* Split Screen: Reduzir padding e font sizes para laydesk2 */
.custom-scrollbar {
  scrollbar-width: thin !important;
}

/* Reduzir padding dos lados no split screen */
section.h-\\[calc\\(100vh-4rem\\)\\] > div > div {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

/* Títulos menores */
section.h-\\[calc\\(100vh-4rem\\)\\] h2 {
  font-size: 1.5rem !important;
  line-height: 2rem !important;
  margin-bottom: 1rem !important;
}

/* Cards mais compactos */
section.h-\\[calc\\(100vh-4rem\\)\\] .space-y-3,
section.h-\\[calc\\(100vh-4rem\\)\\] .space-y-4 {
  gap: 0.5rem !important;
}

/* Imagens menores */
section.h-\\[calc\\(100vh-4rem\\)\\] .max-w-\\[280px\\] {
  max-width: 220px !important;
  height: 100px !important;
}

/* Textos menores */
section.h-\\[calc\\(100vh-4rem\\)\\] h3 {
  font-size: 0.95rem !important;
  line-height: 1.25rem !important;
}

section.h-\\[calc\\(100vh-4rem\\)\\] p {
  font-size: 0.8rem !important;
  line-height: 1.2rem !important;
}
```

---

## 5. Comportamento e Interações

### Desktop

#### Estado Inicial (50/50)
- Ambos os lados com 50% de largura
- Overlay médio (opacity: 0.3)
- Indicadores "Clique para expandir" visíveis

#### Hover
- Lado com hover expande para 65%
- Outro lado reduz para 35%
- Overlay do lado ativo reduz (opacity: 0.1)
- Overlay do lado inativo aumenta (opacity: 0.5)
- Transição suave (0.6s)

#### Click (Lock)
- Lado clicado expande para 70%
- Outro lado reduz para 30%
- Estado mantido até novo click
- Click no mesmo lado: retorna ao 50/50
- Click no outro lado: alterna o lock

### Mobile

#### Tabs
- Toggle entre "Personalização" e "Poderes do Café"
- Indicador animado desliza entre tabs (Framer Motion `layoutId`)
- Conteúdo desliza horizontalmente com fade

#### Lista
- Scroll vertical nativo
- Cards empilhados verticalmente
- Layout simplificado (imagem + texto)

---

## 6. Acessibilidade

### Teclado
- **Tab:** Navegar entre elementos interativos
- **Enter/Space:** Ativar click nos lados (desktop) ou tabs (mobile)
- **Escape:** Destravar side locked (desktop)

### Screen Readers
- ARIA labels em elementos interativos
- Títulos semânticos (`h2`, `h3`)
- Descrições alternativas em imagens

### Motion
- Respeitar `prefers-reduced-motion`:

```tsx
// Adicionar no topo do componente:
import { useReducedMotion } from 'framer-motion'

const shouldReduceMotion = useReducedMotion()

// Ajustar transições:
transition={{ 
  duration: shouldReduceMotion ? 0 : 0.6, 
  ease: [0.4, 0.0, 0.2, 1] 
}}
```

---

## 7. Performance

### Otimizações

1. **Imagens:**
   - Usar `priority` em backgrounds principais
   - Definir `sizes` apropriados
   - Lazy load para cards fora da viewport

2. **Animações:**
   - Usar `transform` e `opacity` (GPU-accelerated)
   - Evitar animar `width`, `height`
   - Usar `will-change` em elementos animados

3. **Renderização:**
   - `AnimatePresence` com `mode="wait"`
   - Memoização de componentes (se necessário)

### CSS Otimizado

```css
/* Adicionar para elementos animados */
.split-side {
  will-change: flex;
}

.split-overlay {
  will-change: opacity;
}
```

---

## 8. Testes Necessários

### Navegadores
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (desktop e mobile)

### Dispositivos
- ✅ Desktop (1920×1080, 1600×900, 1368×768, 1280×720)
- ✅ Tablet (iPad, Android tablets)
- ✅ Mobile (iPhone, Android phones)

### Interações
- ✅ Hover funciona apenas em desktop (não em touch)
- ✅ Click funciona em ambos
- ✅ Scroll suave em todos os dispositivos
- ✅ Transições não causam jank
- ✅ Tabs mobile funcionam corretamente

---

## 9. Migração

### Passos

1. **Instalar dependências** (se necessário):
   ```bash
   pnpm add framer-motion
   ```

2. **Criar novo componente:**
   - Criar `components/split-screen-content.tsx`
   - Copiar código completo da seção 1

3. **Adicionar CSS:**
   - Adicionar estilos customizados em `app/globals.css`
   - Adicionar ajustes para `laydesk2`

4. **Atualizar page:**
   - Modificar `app/page.tsx`
   - Substituir `FlipCard` por `SplitScreenContent`

5. **Testar:**
   - Desktop: hover, click, scroll
   - Mobile: tabs, transição, scroll
   - Diferentes resoluções

6. **Remover FlipCard antigo:**
   - Deletar `components/flipcard.tsx` (opcional, manter como backup)
   - Remover CSS relacionado em `globals.css`

---

## 10. Comparação: Antes vs Depois

### Antes (FlipCard)
- ❌ Animação 3D complexa
- ❌ Difícil de navegar
- ❌ Conteúdo oculto (precisa "virar")
- ❌ Scroll problemático
- ❌ Visual datado

### Depois (Split Screen)
- ✅ Visual moderno e impactante
- ✅ Conteúdo visível simultaneamente
- ✅ Navegação intuitiva
- ✅ Interatividade alta
- ✅ Animações suaves
- ✅ Responsivo (desktop e mobile diferentes)
- ✅ Performance otimizada

---

## 11. Notas Importantes

- **Conteúdo preservado:** Todos os 10 itens mantidos
- **Altura da seção:** `h-[calc(100vh-4rem)]` mantida
- **Background:** Imagens de destaque usadas como background
- **Cores:** Paleta existente (`coffee-*`, `cream-*`) mantida
- **Tipografia:** `font-montserrat` mantida
- **Scroll customizado:** Scrollbar estilizada com cores da marca

---

## 12. Próximos Passos Após Implementação

1. **Testes de usuário:** Coletar feedback sobre interatividade
2. **Ajustes finos:** Timing de animações, tamanhos de fontes
3. **Variantes:** Considerar modo noturno/claro (se aplicável)
4. **Analytics:** Monitorar engajamento com cada lado
5. **Otimizações:** Identificar gargalos de performance

---

## Referências

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Next.js Image:** https://nextjs.org/docs/app/api-reference/components/image
- **Tailwind CSS:** https://tailwindcss.com/docs
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Documentação criada em:** 26/12/2025  
**Status:** Aguardando autorização para implementação



