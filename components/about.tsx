export default function About() {
  const keywords = [
    "café gourmet para eventos",
    "coffee station Recife",
    "coffee station João Pessoa",
    "barista profissional",
    "café para feiras e congressos",
  ]

  return (
    <section id="sobre" className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center mb-12">O que é a Estação do Grão</h2>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-cream-50 leading-relaxed text-pretty mb-8">
            A <strong>Estação do Grão</strong> é uma estação móvel de café gourmet que leva sabor, sofisticação e
            branding para o seu evento. Com máquinas profissionais de café espresso, bebidas exclusivas e baristas
            especializados, criamos uma experiência elegante e acolhedora — perfeita para eventos corporativos, stands,
            congressos e celebrações premium.
          </p>
        </div>

        {/* Keywords/Chips */}
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {keywords.map((keyword) => (
            <div
              key={keyword}
              className="px-4 py-2 bg-coffee-700 border border-coffee-500/30 rounded-full text-sm text-cream-50 font-sans hover:border-coffee-500/70 transition-colors"
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
