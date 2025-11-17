import Image from "next/image"
import { MapPin, Globe } from "lucide-react"

export default function Audience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Título Principal Centralizado */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-16">
          REGIÕES ATENDIDAS
        </h2>

        {/* Grid de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Imagem do Mapa */}
          <div className="flex justify-center">
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
          </div>

          {/* Coluna Direita: Texto sobre Cobertura */}
          <div className="space-y-8">
            
            {/* Nordeste - 100 doses */}
            <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors">
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

            {/* Brasil - 3.000 doses */}
            <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors">
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
        </div>
      </div>
    </section>
  )
}
