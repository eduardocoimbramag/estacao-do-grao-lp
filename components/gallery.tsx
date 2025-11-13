"use client"

import Image from "next/image"

export default function Gallery() {
  const images = [
    {
      src: "/barista-serving-espresso-at-corporate-event.jpg",
      alt: "Barista servindo espresso em stand corporativo",
      caption: "Barista servindo espresso em stand corporativo",
    },
    {
      src: "/coffee-station-with-branded-logo-personalized.jpg",
      alt: "Estação de café personalizada com logo da marca",
      caption: "Estação personalizada com logo da marca",
    },
    {
      src: "/guests-enjoying-gourmet-coffee-at-premium-event.jpg",
      alt: "Convidados apreciando café gourmet no evento",
      caption: "Convidados apreciando café gourmet",
    },
    {
      src: "/professional-barista-making-latte-art.jpg",
      alt: "Barista profissional fazendo latte art",
      caption: "Latte art profissional",
    },
    {
      src: "/coffee-station-setup-at-wedding-reception.jpg",
      alt: "Estação de café em recepção de casamento",
      caption: "Estação em evento de casamento",
    },
    {
      src: "/espresso-machine-coffee-station-at-fair.jpg",
      alt: "Máquina de espresso em estação de evento",
      caption: "Máquina profissional em ação",
    },
  ]

  return (
    <section id="galeria" className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center mb-16">Galeria de Experiências</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden bg-coffee-700/50 border border-coffee-700 hover:border-coffee-500/50 transition-all"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-cream-50 p-6 font-sans text-sm">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
