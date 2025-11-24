'use client'

import { useState } from 'react'
import Image from 'next/image'
import { RotateCw, RotateCcw } from 'lucide-react'

export default function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  // Dados do Lado 1: Personalização
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

  // Dados do Lado 2: Poderes do Café
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
    <section className="py-[18px] sm:py-6 lg:py-[30px] px-4 sm:px-6 lg:px-8 bg-coffee-700">
      <div className="max-w-7xl mx-auto">
        
        {/* Container com perspectiva */}
        <div className="flip-container min-h-[600px] lg:min-h-[800px]">
          
          {/* Inner container que rotaciona */}
          <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
            
            {/* LADO 1: Personalização para seu evento */}
            <div className="flip-card-front">
              <div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-[30px] shadow-2xl">
                
                {/* Título */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-[30px]">
                  PERSONALIZAÇÃO PARA SEU EVENTO
                </h2>

                {/* Grid de Itens */}
                <div className="space-y-2 mb-2">
                  {side1Items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row ${
                        item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''
                      } items-center gap-[30px] p-0 bg-coffee-900/60 rounded-2xl transition-all duration-300`}
                    >
                      {/* Imagem */}
                      <div className="relative w-[388px] h-[162px] sm:w-[443px] sm:h-[184px] lg:w-[554px] lg:h-[230px] flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 388px, (max-width: 1024px) 443px, 554px"
                        />
                      </div>

                      {/* Texto */}
                      <div className="flex-1 flex flex-col justify-center text-center">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-coffee-500 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-cream-50 leading-relaxed text-justify">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão para virar */}
                <button
                  onClick={handleFlip}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 group mt-[30px] mb-0"
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
              <div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-[30px] shadow-2xl">
                
                {/* Título */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-[30px]">
                  PODERES DO CAFÉ
                </h2>

                {/* Grid de Itens */}
                <div className="space-y-2 mb-2">
                  {side2Items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row ${
                        item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''
                      } items-center gap-[30px] p-0 bg-coffee-900/60 rounded-2xl transition-all duration-300`}
                    >
                      {/* Imagem */}
                      <div className="relative w-[388px] h-[162px] sm:w-[443px] sm:h-[184px] lg:w-[554px] lg:h-[230px] flex-shrink-0 rounded-xl overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 388px, (max-width: 1024px) 443px, 554px"
                        />
                      </div>

                      {/* Texto */}
                      <div className="flex-1 flex flex-col justify-center text-center">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-coffee-500 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-cream-50 leading-relaxed text-justify">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão para virar de volta */}
                <button
                  onClick={handleFlip}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 group mt-[30px] mb-0"
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

