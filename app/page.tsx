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
    <main className="min-h-screen bg-coffee-900 overflow-x-hidden w-full max-w-[100vw]">
      <Header />
      <Hero />
      <OpenMenuIntro />
      
      {/* 3ª Section: Nossos Serviços (CARROSSEL) */}
      <section
        id="nossos-servicos"
        className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] flex flex-col justify-center bg-coffee-700/50 overflow-x-hidden w-full laydesk2-servicos-section"
      >
        <div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-3 lg:py-4 box-border laydesk2-servicos-container">
          {/* Cabeçalho da Section */}
          <header className="mb-8 sm:mb-6 text-center space-y-3 laydesk2-servicos-header">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-cream-50 font-montserrat laydesk2-servicos-title">
              Nossos Serviços
            </h2>
            <p className="text-sm sm:text-base text-cream-50/80 max-w-2xl mx-auto font-montserrat laydesk2-servicos-description">
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
