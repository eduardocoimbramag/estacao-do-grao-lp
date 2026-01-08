import type { CarouselCard } from "@/lib/types/carousel";

/**
 * Cards de serviços para o carrossel da section "Nossos Serviços"
 * 
 * IMPORTANTE: Manter imagens otimizadas e com dimensões similares
 * Especificações por layout (desktop):
 * - Laydesk1: 1000×480px (aspect ratio ~2.08:1)
 * - Laydesk2/3: 1112×360px (aspect ratio ~3.09:1)
 * Ver documentação: docs/06-rescarrossel.md
 */
export const SERVICES_CAROUSEL_CARDS: CarouselCard[] = [
  {
    id: "servico-empresas",
    imageSrc: "/cafe-para-empresas-carrossel.jpg",
    imageAlt: "Estação de café personalizada com logo da marca em ambiente corporativo",
    title: "Café para Empresas",
    subtitle: "Experiências para times e clientes",
    description: "Oferecemos coffee break premium para empresas. Levando sabor para suas reuniões, treinamentos, convenções, lançamentos, workshops e eventos corporativos. Sendo um ponto de conexão e networking para as pessoas presentes.",
    ctaLabel: "Solicitar orçamento",
    ctaHref: "#contato",
  },
  {
    id: "servico-eventos",
    imageSrc: "/eventos-e-ativacoes-carrossel.jpg",
    imageAlt: "Estação móvel de café com máquina de espresso em evento corporativo",
    title: "Eventos e Ativações",
    subtitle: "Feiras, stands e ações externas",
    description: "Nossa estação móvel de café espresso é projetada para atender grandes fluxos de pessoas com qualidade, agilidade e alto padrão estético personalizado, tornando-se um ponto de atração e fortalecimento de branding.",
    ctaLabel: "Solicitar orçamento",
    ctaHref: "#contato",
  },
  {
    id: "servico-casamentos",
    imageSrc: "/casamento-e-celebracoes-carrossel.jpg",
    imageAlt: "Estação de café elegante montada em recepção de casamento",
    title: "Casamentos e Celebrações",
    subtitle: "Porque o seu grande dia pede sensibilidade e uma experiência que será lembrada para sempre.",
    description: "Alguns momentos não se repetem e merecem ser vividos com elegância e perfeição em cada detalhe. A Estação do Grão cria uma experiência de café para casamentos e celebrações.",
    ctaLabel: "Solicitar orçamento",
    ctaHref: "#contato",
  },
  {
    id: "servico-atendimento",
    imageSrc: "/baristas-profissionais-carrossel.jpg",
    imageAlt: "Barista profissional preparando latte art em evento premium",
    title: "Baristas Profissionais",
    subtitle: "Atendimento que encanta",
    description: "Contar com baristas profissionais em seu evento faz toda a diferença na experiência do público. Nosso time é formado por especialistas certificados em café especial, extração de espresso, vaporização de leite e atendimento de alto padrão.",
    ctaLabel: "Solicitar orçamento",
    ctaHref: "#contato",
  },
];

