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
  const side2Items = [
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

  return (
    <section className="h-screen py-10 sm:py-12 lg:py-16 bg-coffee-700 overflow-x-hidden w-full">
      <div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 h-full box-border">
        
        {/* Container com perspectiva */}
        <div className="flip-container h-full">
          
          {/* Inner container que rotaciona */}
          <div className={`flip-card-inner h-full ${isFlipped ? 'flipped' : ''}`}>
            
            {/* LADO 1: Personalização para seu evento */}
            <div className="flip-card-front">
              <div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-2xl h-full flex flex-col">
                
                {/* Título */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-4 font-montserrat">
                  PERSONALIZAÇÃO PARA SEU EVENTO
                </h2>

                {/* Grid de Itens */}
                <div className="space-y-2 mb-3 flex-1 overflow-y-auto max-h-[calc(100vh-240px)] sm:max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-320px)]">
                  {side1Items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row ${
                        item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''
                      } items-center gap-3 sm:gap-[18px] lg:gap-[22px] p-2 sm:p-0 bg-coffee-900/60 rounded-2xl transition-all duration-300 min-w-0`}
                    >
                      {/* Imagem */}
                      <div className="relative w-full max-w-[280px] sm:max-w-[340px] sm:h-[142px] lg:max-w-[420px] lg:h-[175px] h-[125px] flex-shrink-0 rounded-xl overflow-hidden mx-auto sm:mx-0">
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
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-coffee-500 mb-1.5 font-montserrat">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed text-justify font-montserrat">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão para virar */}
                <button
                  onClick={handleFlip}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 group mt-4 mb-0"
                  aria-label="Virar para Poderes do Café"
                >
                  <span className="text-sm sm:text-base lg:text-lg font-semibold font-montserrat">
                    Poderes do Café
                  </span>
                  <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* LADO 2: Poderes do Café */}
            <div className="flip-card-back">
              <div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-2xl h-full flex flex-col">
                
                {/* Título */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-4 font-montserrat">
                  PODERES DO CAFÉ
                </h2>

                {/* Grid de Itens */}
                <div className="space-y-2 mb-3 flex-1 overflow-y-auto max-h-[calc(100vh-240px)] sm:max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-320px)]">
                  {side2Items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col sm:flex-row ${
                        item.imagePosition === 'right' ? 'sm:flex-row-reverse' : ''
                      } items-center gap-3 sm:gap-[18px] lg:gap-[22px] p-2 sm:p-0 bg-coffee-900/60 rounded-2xl transition-all duration-300 min-w-0`}
                    >
                      {/* Imagem */}
                      <div className="relative w-full max-w-[280px] sm:max-w-[340px] sm:h-[142px] lg:max-w-[420px] lg:h-[175px] h-[125px] flex-shrink-0 rounded-xl overflow-hidden mx-auto sm:mx-0">
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
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-coffee-500 mb-1.5 font-montserrat">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed text-justify font-montserrat">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Botão para virar de volta */}
                <button
                  onClick={handleFlip}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 group mt-4 mb-0"
                  aria-label="Virar para Personalização"
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-rotate-180 transition-transform duration-500" />
                  <span className="text-sm sm:text-base lg:text-lg font-semibold font-montserrat">
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

