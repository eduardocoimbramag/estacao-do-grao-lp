import { Coffee, ChefHat, Zap, Palette, Headphones } from "lucide-react"

export default function Differentials() {
  const differentials = [
    { icon: Coffee, text: "Café espresso especial, de aroma intenso e sabor equilibrado" },
    { icon: ChefHat, text: "Baristas profissionais e atendimento personalizado" },
    { icon: Zap, text: "Estrutura móvel e moderna, adaptável a qualquer espaço" },
    { icon: Palette, text: "Personalização com sua marca para ações e ativações" },
    { icon: Headphones, text: "Equipe treinada para atender eventos corporativos e premium" },
  ]

  return (
    <section id="diferencias" className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-700/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-16">Nossos Diferenciais</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-xl hover:border-coffee-500/50 transition-colors flex flex-col items-center text-center gap-4"
              >
                <Icon className="w-12 h-12 text-coffee-500" />
                <p className="text-cream-50 leading-relaxed">{item.text}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 p-8 bg-coffee-700/40 border border-coffee-500/20 rounded-xl text-center">
          <p className="text-lg text-cream-50 font-serif">
            Cada detalhe é pensado para valorizar sua marca e encantar seus convidados.
          </p>
        </div>
      </div>
    </section>
  )
}
