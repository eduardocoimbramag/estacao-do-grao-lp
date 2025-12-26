# Modificação: Split Screen com Conteúdo Oculto

## Objetivo

Modificar o **Split Screen Interativo** para que o conteúdo fique **oculto por padrão**, sendo revelado apenas ao clicar no botão "Clique para expandir". Remover a funcionalidade de hover e manter apenas a interação por click.

---

## Mudanças Solicitadas

### Estado Atual (a ser modificado)
- ✅ Split Screen 50/50
- ✅ Hover expande para 65/35
- ✅ Click expande para 70/30
- ✅ Conteúdo sempre visível (com opacidade reduzida)
- ✅ Indicador "Clique para expandir" visível

### Novo Comportamento (desejado)

#### Estado Inicial (50/50)
- Ambos os lados com **50% de largura**
- **Conteúdo completamente oculto** (não visível)
- Mostrar apenas:
  - **Título** (ex: "PERSONALIZAÇÃO PARA SEU EVENTO")
  - **Botão "Clique para expandir"** centralizado

#### Interação (Click apenas)
- **Remover hover** (não deve expandir ao passar o mouse)
- **Click no botão ou no lado:**
  - Lado clicado expande para **70%**
  - Conteúdo do lado clicado é **revelado com transição suave**
  - Outro lado reduz para **30%**
  - Outro lado mantém/volta para estado oculto (apenas título + botão)

#### Transições
- **Expansão/contração:** Suave e fluida
- **Revelação do conteúdo:** Animação sofisticada (fade + slide)
- **Ocultação do conteúdo:** Fade out suave

---

## Modificações no Código

### 1. Atualizar `components/split-screen-content.tsx`

#### Mudanças principais:

1. **Remover estado `activeSide`** (usado para hover)
2. **Manter apenas `lockedSide`** (usado para click)
3. **Remover handlers de hover** (`onHoverStart`, `onHoverEnd`)
4. **Modificar lógica de `getFlexValue`:**
   - Sem `lockedSide`: 50/50
   - Com `lockedSide`: 70/30
5. **Adicionar controle de visibilidade do conteúdo:**
   - Conteúdo visível apenas quando lado está expandido (70%)
   - Animações de entrada/saída sofisticadas
6. **Modificar indicadores:**
   - Sempre visível quando lado não está expandido
   - Oculto quando lado está expandido

#### Código modificado:

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
  // Estado apenas para click/lock (removido activeSide)
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

  // Handler para click (removido hover handlers)
  const handleClick = (side: 'left' | 'right') => {
    if (lockedSide === side) {
      // Se já está locked neste lado, desbloqueia (volta ao 50/50)
      setLockedSide(null)
    } else {
      // Bloqueia neste lado (expande para 70/30)
      setLockedSide(side)
    }
  }

  // Calcular flex do lado baseado apenas em lockedSide
  const getFlexValue = (side: 'left' | 'right') => {
    if (!lockedSide) return 0.5 // 50/50 quando nenhum está expandido
    
    return lockedSide === side ? 0.7 : 0.3 // 70/30 quando expandido
  }

  // Determinar se conteúdo deve estar visível
  const isContentVisible = (side: 'left' | 'right') => {
    return lockedSide === side
  }

  // Determinar opacidade do overlay
  const getOverlayOpacity = (side: 'left' | 'right') => {
    if (!lockedSide) return 0.4 // Overlay mais escuro quando nenhum está expandido
    return lockedSide === side ? 0.1 : 0.6 // Mais claro quando expandido, mais escuro quando contraído
  }

  // Componente de Card Individual
  const ContentCard = ({ item }: { item: ContentItem }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-coffee-900/70 rounded-2xl backdrop-blur-sm border border-coffee-700/30"
    >
      {/* Imagem */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`relative w-full flex-shrink-0 rounded-xl overflow-hidden ${
          item.imagePosition === 'right' ? 'sm:order-2' : 'sm:order-1'
        } max-w-[280px] sm:max-w-[320px] h-[120px] sm:h-[140px]`}
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
      <motion.div
        initial={{ opacity: 0, x: item.imagePosition === 'right' ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`flex-1 flex flex-col justify-center text-center sm:text-left ${
          item.imagePosition === 'right' ? 'sm:order-1' : 'sm:order-2'
        }`}
      >
        <h3 className="text-lg sm:text-xl font-bold text-coffee-500 mb-2 font-montserrat">
          {item.title}
        </h3>
        <p className="text-sm sm:text-base text-cream-50 leading-relaxed text-justify font-montserrat">
          {item.description}
        </p>
      </motion.div>
    </motion.div>
  )

  return (
    <section className="h-[calc(100vh-4rem)] bg-coffee-700 overflow-hidden w-full">
      {/* ============================================
          DESKTOP: Split Screen com Conteúdo Oculto
          ============================================ */}
      <div className="hidden sm:flex h-full">
        {/* Lado Esquerdo: Personalização */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          animate={{ flex: getFlexValue('left') }}
          transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
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
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 h-full flex flex-col p-6 lg:p-8">
            {/* Título - Sempre visível */}
            <motion.div
              className="mb-6"
              animate={{
                scale: isContentVisible('left') ? 1 : 1,
                opacity: 1
              }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center font-montserrat">
                PERSONALIZAÇÃO PARA SEU EVENTO
              </h2>
            </motion.div>

            {/* Indicador - Visível apenas quando conteúdo está oculto */}
            <AnimatePresence>
              {!isContentVisible('left') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-coffee-500/20 border-2 border-coffee-400 rounded-2xl backdrop-blur-sm hover:bg-coffee-500/30 transition-all duration-300"
                  >
                    <ChevronRight className="w-8 h-8 text-coffee-400 animate-pulse" />
                    <span className="text-lg font-semibold text-white font-montserrat">
                      Clique para expandir
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lista de Cards - Visível apenas quando expandido */}
            <AnimatePresence>
              {isContentVisible('left') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                  className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-2 custom-scrollbar"
                >
                  {side1Items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      <ContentCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Divisor Central */}
        <motion.div
          className="w-1 bg-gradient-to-b from-coffee-500 via-coffee-400 to-coffee-500 shadow-lg relative z-20"
          animate={{
            boxShadow: lockedSide
              ? '0 0 30px rgba(196, 142, 84, 0.8)'
              : '0 0 10px rgba(196, 142, 84, 0.4)'
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Lado Direito: Poderes do Café */}
        <motion.div
          className="relative overflow-hidden cursor-pointer"
          animate={{ flex: getFlexValue('right') }}
          transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
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
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Conteúdo */}
          <div className="relative z-10 h-full flex flex-col p-6 lg:p-8">
            {/* Título - Sempre visível */}
            <motion.div
              className="mb-6"
              animate={{
                scale: isContentVisible('right') ? 1 : 1,
                opacity: 1
              }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white text-center font-montserrat">
                PODERES DO CAFÉ
              </h2>
            </motion.div>

            {/* Indicador - Visível apenas quando conteúdo está oculto */}
            <AnimatePresence>
              {!isContentVisible('right') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 px-8 py-4 bg-coffee-500/20 border-2 border-coffee-400 rounded-2xl backdrop-blur-sm hover:bg-coffee-500/30 transition-all duration-300"
                  >
                    <span className="text-lg font-semibold text-white font-montserrat">
                      Clique para expandir
                    </span>
                    <ChevronLeft className="w-8 h-8 text-coffee-400 animate-pulse" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lista de Cards - Visível apenas quando expandido */}
            <AnimatePresence>
              {isContentVisible('right') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                  className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-2 custom-scrollbar"
                >
                  {side2Items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        ease: [0.4, 0.0, 0.2, 1]
                      }}
                    >
                      <ContentCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ============================================
          MOBILE: Tabs com Transição (sem mudanças)
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

## 2. Resumo das Mudanças no Código

### Estados Removidos:
- ❌ `activeSide` (usado para controlar hover)

### Estados Mantidos:
- ✅ `lockedSide` (usado para controlar click/expansão)
- ✅ `activeTab` (para mobile)

### Handlers Removidos:
- ❌ `handleHoverStart()`
- ❌ `handleHoverEnd()`
- ❌ `onHoverStart` prop
- ❌ `onHoverEnd` prop

### Handlers Mantidos:
- ✅ `handleClick()` (modificado)

### Novas Funções:
- ✅ `isContentVisible(side)` — Retorna `true` se conteúdo deve estar visível
- ✅ `getFlexValue()` — Modificado para não considerar `activeSide`
- ✅ `getOverlayOpacity()` — Modificado para overlay mais escuro quando oculto

### Componentes Modificados:

1. **Indicador "Clique para expandir":**
   - Agora é um botão estilizado (não apenas texto + ícone)
   - Centralizado verticalmente
   - Com efeitos hover (`whileHover`, `whileTap`)
   - Visível apenas quando `!isContentVisible(side)`

2. **Lista de Cards:**
   - Envolvida em `<AnimatePresence>`
   - Renderizada apenas quando `isContentVisible(side)`
   - Animação de entrada: fade + height auto
   - Animação de saída: fade + height 0
   - Cards aparecem com stagger (delay escalonado)

3. **ContentCard:**
   - Animações de entrada mais sofisticadas
   - Fade + slide up
   - Imagem com scale + fade
   - Texto com fade + slide horizontal

---

## 3. Animações Implementadas

### Expansão/Contração do Lado
```tsx
animate={{ flex: getFlexValue('left') }}
transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
```
- **Duração:** 0.7s (mais lenta, mais suave)
- **Easing:** Cubic bezier customizado

### Overlay (Background Escurecido)
```tsx
animate={{ opacity: getOverlayOpacity('left') }}
transition={{ duration: 0.5 }}
```
- **Duração:** 0.5s
- **Opacidade:** 0.4 (oculto) → 0.1 (expandido)

### Revelação do Conteúdo
```tsx
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: 'auto' }}
exit={{ opacity: 0, height: 0 }}
transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
```
- **Duração:** 0.6s
- **Efeitos:** Fade + Height expansion

### Cards Individuais (Stagger)
```tsx
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ 
  duration: 0.5, 
  delay: index * 0.1,
  ease: [0.4, 0.0, 0.2, 1]
}}
```
- **Duração:** 0.5s por card
- **Delay:** 0.1s entre cada card (stagger effect)
- **Efeito:** Fade + Slide up

### Indicador "Clique para expandir"
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
transition={{ duration: 0.4 }}
```
- **Duração:** 0.4s
- **Efeito:** Fade + Slide vertical

### Botão Hover Effects
```tsx
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```
- **Scale up:** 5% ao hover
- **Scale down:** 5% ao click

---

## 4. Comportamento Detalhado

### Estado Inicial (50/50)
1. Ambos os lados com 50% de largura
2. Overlay escuro (opacity: 0.4)
3. Título visível
4. Botão "Clique para expandir" centralizado
5. Conteúdo completamente oculto (não renderizado)

### Click no Lado Esquerdo
1. **Lado esquerdo:**
   - Expande para 70% (transição 0.7s)
   - Overlay clareia (opacity: 0.1)
   - Indicador desaparece (fade out 0.4s)
   - Conteúdo aparece (fade + height expansion 0.6s)
   - Cards aparecem com stagger (0.1s entre cada)

2. **Lado direito:**
   - Reduz para 30% (transição 0.7s)
   - Overlay escurece (opacity: 0.6)
   - Indicador permanece/aparece
   - Conteúdo permanece/volta a estar oculto

### Click no Lado Direito (quando esquerdo está expandido)
1. **Lado direito:**
   - Expande de 30% para 70%
   - Conteúdo aparece com animações

2. **Lado esquerdo:**
   - Reduz de 70% para 30%
   - Conteúdo desaparece (fade out)
   - Indicador reaparece

### Click no Mesmo Lado (já expandido)
1. Volta ao estado 50/50
2. Conteúdo desaparece com animação
3. Indicador reaparece
4. Overlay volta à opacidade média (0.4)

---

## 5. Não Modificado (Mobile)

A versão mobile permanece inalterada:
- Tabs funcionam normalmente
- Conteúdo sempre visível ao alternar tabs
- Sem modificações necessárias

---

## 6. CSS (Sem Mudanças)

O CSS existente em `app/globals.css` permanece o mesmo:
- `.custom-scrollbar` já implementado
- Ajustes para `laydesk2` já implementados
- Nenhuma modificação CSS necessária

---

## 7. Vantagens da Nova Abordagem

### UX Melhorada
- ✅ **Foco claro:** Usuário sabe o que fazer (botão visível)
- ✅ **Menos distrações:** Conteúdo oculto até ser solicitado
- ✅ **Comparação direta:** Pode abrir um lado de cada vez
- ✅ **Controle total:** Sem expansões automáticas (hover)

### Visual
- ✅ **Mais limpo:** Estado inicial minimalista
- ✅ **Transições sofisticadas:** Múltiplas animações coordenadas
- ✅ **Revelação dramática:** Efeito "wow" ao expandir
- ✅ **Profissional:** Animações suaves e polidas

### Performance
- ✅ **Menos renderizações:** Conteúdo não renderizado quando oculto
- ✅ **Hover removido:** Menos recalculos de layout
- ✅ **AnimatePresence:** Gerenciamento eficiente de mount/unmount

---

## 8. Comparação: Antes vs Depois

| Aspecto | Versão Anterior | Nova Versão |
|---------|----------------|-------------|
| Estado inicial | Conteúdo visível (opaco) | Conteúdo oculto |
| Hover | Expande para 65/35 | ❌ Removido |
| Click | Expande para 70/30 | ✅ Mantido |
| Indicador | Sempre visível | Visível apenas quando oculto |
| Conteúdo | Sempre renderizado | Renderizado apenas quando visível |
| Transições | Simples (flex) | Sofisticadas (fade + height + stagger) |
| Overlay | Opacity variável | Opacity com contraste maior |

---

## 9. Testes Necessários

### Desktop
- ✅ Click expande lado corretamente (70/30)
- ✅ Conteúdo aparece com transição suave
- ✅ Indicador desaparece quando expandido
- ✅ Indicador reaparece quando contraído
- ✅ Click no mesmo lado retorna ao 50/50
- ✅ Alternar entre lados funciona corretamente
- ✅ Stagger effect nos cards visível
- ✅ Sem hover (verificar que não expande ao passar mouse)

### Mobile
- ✅ Tabs funcionam normalmente (sem mudanças)
- ✅ Conteúdo visível ao alternar tabs

### Performance
- ✅ Animações suaves (60fps)
- ✅ Sem jank ao expandir/contrair
- ✅ Scroll suave quando expandido

---

## 10. Implementação

### Arquivo a modificar:
- `components/split-screen-content.tsx`

### Passos:
1. Substituir todo o conteúdo do arquivo pelo código fornecido
2. Salvar e testar
3. Nenhuma modificação em `app/page.tsx` ou `app/globals.css` necessária

---

## 11. Notas Importantes

- **Conteúdo preservado:** Todos os 10 itens mantidos
- **Mobile intacto:** Nenhuma mudança na versão mobile
- **CSS intacto:** Scrollbar e ajustes laydesk2 mantidos
- **Bibliotecas:** Mesmas dependências (framer-motion)
- **Altura da seção:** `h-[calc(100vh-4rem)]` mantida
- **Acessibilidade:** Mantida (títulos, alt texts)

---

**Documentação criada em:** 26/12/2025  
**Status:** Aguardando autorização para implementação

