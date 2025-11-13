import Header from "@/components/header"
import Hero from "@/components/hero/Hero"
import About from "@/components/about"
import Services from "@/components/services"
import Audience from "@/components/audience"
import Differentials from "@/components/differentials"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-coffee-900">
      <Header />
      <Hero />
      <About />
      <Services />
      <Audience />
      <Differentials />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
