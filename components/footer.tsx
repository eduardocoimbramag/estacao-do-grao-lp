import Link from "next/link"
import { Coffee, Instagram, MessageCircle, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-coffee-900 border-t border-coffee-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Coffee className="w-8 h-8 text-coffee-500" />
              <span className="font-serif text-xl font-semibold text-cream-50">Estação do Grão</span>
            </div>
            <p className="text-cream-50 font-sans text-sm">
              Café gourmet, baristas profissionais e personalização para sua marca.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-cream-50">Contato</h4>
            <a
              href="mailto:contato@estacaodograo.com.br"
              className="text-coffee-500 hover:text-accent transition-colors font-sans text-sm"
            >
              contato@estacaodograo.com.br
            </a>
            <p className="text-cream-50 font-sans text-sm">Recife, Olinda, Jaboatão, Paulista, Aldeia e João Pessoa</p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-cream-50">Redes Sociais</h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/estacaodograo.eventos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram - Estação do Grão"
                className="text-coffee-500 hover:text-accent transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/55DDDNUMERO"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp - Estação do Grão"
                className="text-coffee-500 hover:text-accent transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/estacao-do-grao"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn - Estação do Grão"
                className="text-coffee-500 hover:text-accent transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-coffee-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Local SEO Keywords */}
          <p className="text-xs text-coffee-700 font-sans text-center">
            Coffee station Recife • Estação de café João Pessoa • Barista para eventos corporativos • Café gourmet para
            feiras
          </p>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-cream-50 hover:text-coffee-500 transition-colors">
              Política de Privacidade
            </Link>
            <Link href="#" className="text-cream-50 hover:text-coffee-500 transition-colors">
              Termos de Serviço
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-cream-50/60 font-sans text-xs">© 2025 Estação do Grão. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
