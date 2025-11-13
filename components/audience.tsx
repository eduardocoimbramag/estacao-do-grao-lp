import { MapPin, Building2, Heart, Briefcase } from "lucide-react"

export default function Audience() {
  const audiences = [
    { icon: Building2, text: "Feiras de negócios e exposições" },
    { icon: Briefcase, text: "Congressos e convenções" },
    { icon: MapPin, text: "Lançamentos de produtos e stands" },
    { icon: Heart, text: "Casamentos, formaturas e eventos premium" },
  ]

  const regions = ["Recife", "Olinda", "Jaboatão", "Paulista", "Aldeia", "João Pessoa"]
  const localKeywords = [
    "barista Recife",
    "barista João Pessoa",
    "estação de café Recife",
    "coffee station João Pessoa",
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center mb-12">Para Quem Atendemos</h2>

        <p className="text-center text-lg text-cream-50 mb-12">
          Atuamos em eventos de todos os portes, com estrutura completa e montagem rápida:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {audiences.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex gap-4 items-start">
                <Icon className="w-6 h-6 text-coffee-500 flex-shrink-0 mt-1" />
                <span className="text-cream-50 font-sans">{item.text}</span>
              </div>
            )
          })}
        </div>

        {/* Regions */}
        <div className="mb-12">
          <h3 className="text-center text-xl font-semibold text-cream-50 mb-6">Regiões Atendidas</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {regions.map((region) => (
              <div
                key={region}
                className="px-4 py-2 bg-coffee-700 border border-coffee-500/30 rounded-full text-cream-50 font-sans"
              >
                {region}
              </div>
            ))}
          </div>
        </div>

        {/* Local SEO Keywords */}
        <div className="pt-8 border-t border-coffee-700">
          <div className="flex flex-wrap gap-2 justify-center">
            {localKeywords.map((keyword) => (
              <span key={keyword} className="text-xs px-2 py-1 bg-coffee-700/50 text-coffee-500 rounded font-sans">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
