import Link from "next/link"
import { Coffee, Wrench, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Em Construção | Estação do Grão",
  description: "Esta página está sendo elaborada. Em breve teremos novidades!",
  robots: "noindex, nofollow",
}

export default function EmConstrucaoPage() {
  return (
    <div className="min-h-screen bg-coffee-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Ícones */}
        <div className="flex justify-center items-center gap-6">
          <Wrench className="w-16 h-16 sm:w-20 sm:h-20 text-coffee-500" />
          <Coffee className="w-16 h-16 sm:w-20 sm:h-20 text-coffee-500" />
        </div>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 font-montserrat">
          Em Construção
        </h1>

        {/* Mensagem */}
        <p className="text-lg sm:text-xl text-cream-50/80 font-montserrat">
          Esta página está sendo elaborada. Em breve teremos novidades!
        </p>

        {/* Botão Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-coffee-500 text-coffee-900 font-semibold rounded-xl hover:bg-coffee-700 hover:text-white transition-colors font-montserrat"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
      </div>
    </div>
  )
}

