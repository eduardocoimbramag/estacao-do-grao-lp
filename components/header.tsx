"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    // Fechar menu mobile
    setIsOpen(false)
    
    // Pequeno delay para garantir que o menu feche antes do scroll
    setTimeout(() => {
      const element = document.getElementById(id)
      
      if (element) {
        const headerOffset = 64 // Altura do header fixo
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      } else {
        console.warn(`Seção com id "${id}" não encontrada`)
      }
    }, isOpen ? 300 : 0) // Delay apenas se menu estiver aberto
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-coffee-900/95 backdrop-blur-md border-b border-coffee-700 overflow-visible w-full laymob1-header laymob2-header">
      <div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2.5 sm:px-4 md:px-6 lg:px-8 box-border laymob1-header-container laymob2-header-container">
        <div className="flex items-center justify-between h-16 relative min-w-0">
          {/* Logo */}
          <Link 
            href="/" 
            className="inline-flex items-center relative z-10"
            aria-label="Ir para a página inicial"
          >
            <span className="relative block h-[60px] w-[150px] sm:h-[70px] sm:w-[170px] md:h-[76px] md:w-[190px] lg:h-[82px] lg:w-[210px] xl:w-[230px] shrink-0">
              <Image
                src="/logo.png"
                alt="Estação do Grão"
                fill
                className="object-contain object-left"
                priority
                sizes="(max-width: 640px) 240px, (max-width: 768px) 264px, 288px"
              />
            </span>
          </Link>

          {/* Desktop Navigation - Centralizado absolutamente */}
          <nav className="hidden md:flex absolute left-[52.25%] top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-9 lg:gap-8">
            <button
              onClick={() => scrollToSection("apresentacao")}
              className="text-cream-50 hover:text-coffee-500 transition-colors font-inter font-normal uppercase tracking-[0.08em] text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:rounded-md"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("nossos-servicos")}
              className="text-cream-50 hover:text-coffee-500 transition-colors font-inter font-normal uppercase tracking-[0.08em] text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:rounded-md"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("diferencias")}
              className="text-cream-50 hover:text-coffee-500 transition-colors font-inter font-normal uppercase tracking-[0.08em] text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:rounded-md"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-cream-50 hover:text-coffee-500 transition-colors font-inter font-normal uppercase tracking-[0.08em] text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:rounded-md"
            >
              Contato
            </button>
          </nav>

          {/* CTA + Mobile Button */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-10 shrink-0">
            <button
              onClick={() => scrollToSection("contato")}
              className="hidden md:inline-flex items-center px-6 py-2.5 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-inter font-light uppercase tracking-[0.16em] text-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2"
            >
              Orçamento
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-cream-50 hover:text-coffee-500 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2 border-t border-coffee-700 pt-4">
            <button
              onClick={() => scrollToSection("apresentacao")}
              className="block w-full text-left px-4 py-2 text-cream-50 hover:text-coffee-500 hover:bg-coffee-700 rounded transition-colors font-inter font-normal text-base"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("nossos-servicos")}
              className="block w-full text-left px-4 py-2 text-cream-50 hover:text-coffee-500 hover:bg-coffee-700 rounded transition-colors font-inter font-normal text-base"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("diferencias")}
              className="block w-full text-left px-4 py-2 text-cream-50 hover:text-coffee-500 hover:bg-coffee-700 rounded transition-colors font-inter font-normal text-base"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="block w-full text-left px-4 py-2 text-cream-50 hover:text-coffee-500 hover:bg-coffee-700 rounded transition-colors font-inter font-normal text-base"
            >
              Contato
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="block w-full px-4 py-2 mt-4 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-inter font-light uppercase tracking-[0.16em] text-sm rounded-lg transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
            >
              Orçamento
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
