import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      text: "O café da Estação do Grão foi o ponto alto do nosso evento corporativo!",
      author: "Agência de Marketing Recife",
    },
    {
      text: "Além de delicioso, trouxe elegância e uma conexão com nossa marca.",
      author: "Cliente João Pessoa",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-700/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center mb-16">Depoimentos de Clientes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-coffee-900/80 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-coffee-500 text-coffee-500" />
                ))}
              </div>
              <p className="text-cream-50 leading-relaxed mb-6 italic font-sans">"{testimonial.text}"</p>
              <p className="text-coffee-500 font-semibold font-sans">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
