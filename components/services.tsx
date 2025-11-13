import { Coffee, Users, Zap, Palette } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: Coffee,
      title: "Estação de Café Gourmet",
      description:
        "Monte uma coffee station completa com cafés especiais, bebidas geladas e acompanhamentos finos. Ideal para eventos corporativos, casamentos e ativações de marca.",
      keywords: ["café gourmet", "coffee station", "bebidas premium"],
    },
    {
      icon: Users,
      title: "Baristas Profissionais",
      description:
        "Baristas certificados que encantam com técnica, carisma e atendimento impecável — o café vira ponto de encontro.",
      keywords: ["barista corporativo", "atendimento profissional", "experiência personalizada"],
    },
    {
      icon: Zap,
      title: "Locação de Máquinas de Espresso",
      description:
        "Locação de máquinas profissionais e sistemas de cápsulas premium, com operação completa para feiras e eventos de grande fluxo.",
      keywords: ["máquina de espresso", "locação de café", "operação completa"],
    },
    {
      icon: Palette,
      title: "Personalização e Branding",
      description:
        "Copos personalizados, estação com identidade visual exclusiva e experiências de ativação de marca com café.",
      keywords: ["branding corporativo", "ativação de marca", "café personalizado"],
    },
  ]

  return (
    <section id="servicos" className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-700/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-16">Nossos Serviços</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="p-8 bg-coffee-900/80 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 hover:bg-coffee-900 transition-all group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <Icon className="w-10 h-10 text-coffee-500 flex-shrink-0 group-hover:text-accent transition-colors" />
                  <h3 className="text-xl font-semibold text-cream-50">{service.title}</h3>
                </div>
                <p className="text-cream-50 leading-relaxed mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-xs px-3 py-1 bg-coffee-700/50 text-coffee-500 rounded-full font-sans"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
