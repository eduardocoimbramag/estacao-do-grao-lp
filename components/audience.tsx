import Image from "next/image"
import Link from "next/link"
import { TreePalm, Shell, Flag } from "lucide-react"

export default function Audience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Coluna Esquerda: Título + Mapa + Cards */}
          <div className="flex flex-col justify-center items-center gap-2 lg:gap-3">
            {/* Título */}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center font-montserrat">
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

            {/* Card 1: Recife e Região Metropolitana - 100 doses */}
            <div className="pl-4 pr-6 py-2 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
              <div className="flex items-center gap-2">
                <TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0 self-center" />
                <div className="pl-2">
                  <p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed text-justify hyphens-none font-montserrat">
                    <strong className="text-coffee-500 font-montserrat">Recife</strong> e <strong className="text-coffee-500 font-montserrat">Região Metropolitana</strong> a partir de{" "}
                    <strong className="text-coffee-500 font-bold text-base sm:text-lg font-montserrat">100 doses</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Estados Específicos - 600 doses */}
            <div className="pl-4 pr-6 py-2 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
              <div className="flex items-center gap-2">
                <Shell className="w-6 h-6 text-coffee-500 flex-shrink-0 self-center" />
                <div className="pl-2">
                  <p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed text-justify hyphens-none font-montserrat">
                    <strong className="text-coffee-500 font-montserrat">Pernambuco, Paraíba</strong> e <strong className="text-coffee-500 font-montserrat">Alagoas</strong> a partir de{" "}
                    <strong className="text-coffee-500 font-bold text-base sm:text-lg font-montserrat">600 doses</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Brasil - Conforme demanda */}
            <div className="pl-4 pr-6 py-2 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
              <div className="flex items-center gap-2">
                <Flag className="w-6 h-6 text-coffee-500 flex-shrink-0 self-center" />
                <div className="pl-2">
                  <p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed text-justify hyphens-none font-montserrat">
                    Atendemos <strong className="text-coffee-500 font-montserrat">todo o Brasil</strong> conforme demanda, favor{" "}
                    <Link href="#contato" className="inline-block px-1.5 py-0.5 rounded-md bg-coffee-500/20 hover:bg-coffee-500/30 transition-colors">
                      <strong className="text-coffee-500 font-montserrat">solicitar orçamento.</strong>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
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
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-4 font-montserrat">
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
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center px-4 font-montserrat">
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
