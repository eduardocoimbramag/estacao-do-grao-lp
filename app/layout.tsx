import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat, Inter } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"], // Incluir Light (300) para botões
  display: "swap",
})

export const metadata: Metadata = {
  title: "Estação do Grão | Café Gourmet, Baristas e Locação de Máquinas em Recife e João Pessoa",
  description:
    "Estação do Grão oferece café gourmet, baristas e locação de máquinas de café espresso para eventos corporativos, feiras, congressos e casamentos em Recife e João Pessoa. Personalização e branding com café.",
  metadataBase: new URL("https://estacaodograo.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://estacaodograo.com.br",
    siteName: "Estação do Grão",
    title: "Estação do Grão | Café Gourmet para Eventos",
    description:
      "Café gourmet, baristas profissionais e locação de máquinas para eventos corporativos em Recife e João Pessoa",
    images: [
      {
        url: "/og/estacao-do-grao.jpg",
        width: 1200,
        height: 630,
        alt: "Estação do Grão - Coffee Station",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estação do Grão | Café Gourmet para Eventos",
    description: "Baristas profissionais e personalização com sua marca para eventos em Recife e João Pessoa",
    images: ["/og/estacao-do-grao.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#331B09",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable} scroll-smooth overflow-x-hidden`}>
      <head>
        <link rel="canonical" href="https://estacaodograo.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />

        {/* JSON-LD Structured Data - ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Estação do Grão",
              description:
                "Estação de café gourmet com baristas profissionais para eventos corporativos, casamentos e ativações de marca",
              image: "https://estacaodograo.com.br/og/estacao-do-grao.jpg",
              telephone: "+55 (81) XXXX-XXXX",
              email: "contato@estacaodograo.com.br",
              areaServed: [
                {
                  "@type": "City",
                  name: "Recife",
                },
                {
                  "@type": "City",
                  name: "João Pessoa",
                },
              ],
              serviceType: [
                "Estação de Café",
                "Barista Corporativo",
                "Barista para Casamentos",
                "Locação de Máquina de Espresso",
              ],
              sameAs: ["https://www.instagram.com/estacaodograo.eventos", "https://wa.me/55DDDNUMERO"],
            }),
          }}
        />

        {/* JSON-LD Structured Data - FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Qual é o valor da locação da estação de café?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "O valor varia conforme o tipo de evento, número de convidados e personalização desejada. Solicite seu orçamento personalizado através do WhatsApp.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Vocês fazem personalização com minha marca?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sim! Oferecemos copos personalizados, estação com identidade visual exclusiva e experiências de ativação de marca com café gourmet.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Conseguem atender eventos de grande fluxo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutamente. Com estrutura profissional e baristas experientes, atendemos eventos de qualquer porte com montagem rápida e eficiente.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Qual é a área de cobertura?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Atendemos Recife, Olinda, Jaboatão, Paulista, Aldeia e João Pessoa com estrutura completa de transporte e montagem.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans bg-coffee-900 text-white antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
