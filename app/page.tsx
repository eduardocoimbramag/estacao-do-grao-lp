import Header from "@/components/header"
import Hero from "@/components/hero/Hero"
import OpenMenuIntro from "@/components/OpenMenuIntro"
import { ServicesCarousel } from "@/components/sections/services-carousel"
import { SERVICES_CAROUSEL_CARDS } from "@/lib/data/services-carousel-cards"
import FlipCard from "@/components/flipcard"
import Audience from "@/components/audience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-coffee-900">
      <Header />
      <Hero />
      <OpenMenuIntro />
      
      {/* 3ª Section: Nossos Serviços (CARROSSEL) */}
      <section
        id="nossos-servicos"
        className="py-[30px] bg-coffee-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho da Section */}
          <header className="mb-12 sm:mb-16 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50">
              Nossos Serviços
            </h2>
            <p className="text-base sm:text-lg text-cream-50/80 max-w-2xl mx-auto">
              Da sua empresa a grandes eventos, a Estação do Grão leva
              experiências completas em café especial para qualquer ocasião.
            </p>
          </header>

          {/* Carrossel de Cards */}
          <ServicesCarousel cards={SERVICES_CAROUSEL_CARDS} />
        </div>
      </section>

      <Audience />
      <FlipCard />
      <Contact />
      <Footer />
    </main>
  )
}
