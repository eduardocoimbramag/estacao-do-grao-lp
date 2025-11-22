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
