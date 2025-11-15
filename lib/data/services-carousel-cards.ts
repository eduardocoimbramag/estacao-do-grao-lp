import type { CarouselCard } from "@/lib/types/carousel";

/**
 * Cards de serviços para o carrossel da section "Nossos Serviços"
 * 
 * IMPORTANTE: Manter imagens otimizadas e com dimensões similares
 * Recomendação: 800x600px ou proporção 4:3
 */
export const SERVICES_CAROUSEL_CARDS: CarouselCard[] = [
  {
    id: "servico-empresas",
    imageSrc: "/coffee-station-with-branded-logo-personalized.jpg",
    imageAlt: "Estação de café personalizada com logo da marca em ambiente corporativo",
    title: "Café para Empresas",
    subtitle: "Experiências para times e clientes",
    description: "Levamos café especial, estrutura completa e atendimento profissional para dentro da rotina do seu escritório ou espaço corporativo.",
    ctaLabel: "Quero na minha empresa",
    ctaHref: "#contato",
  },
  {
    id: "servico-eventos",
    imageSrc: "/espresso-machine-coffee-station-at-fair.jpg",
    imageAlt: "Estação móvel de café com máquina de espresso em evento corporativo",
    title: "Eventos e Ativações",
    subtitle: "Feiras, conferências e ações externas",
    description: "Estrutura móvel completa de café especial para feiras, stands, congressos e ativações de marca. Experiência premium para seus convidados.",
    ctaLabel: "Ver opções para eventos",
    ctaHref: "#contato",
  },
  {
    id: "servico-casamentos",
    imageSrc: "/coffee-station-setup-at-wedding-reception.jpg",
    imageAlt: "Estação de café elegante montada em recepção de casamento",
    title: "Casamentos e Celebrações",
    subtitle: "Torne seu evento ainda mais especial",
    description: "Coffee station completa para casamentos, bodas e celebrações especiais. Um toque sofisticado que seus convidados vão adorar.",
    ctaLabel: "Saber mais",
    ctaHref: "#contato",
  },
  {
    id: "servico-atendimento",
    imageSrc: "/professional-barista-making-latte-art.jpg",
    imageAlt: "Barista profissional preparando latte art em evento premium",
    title: "Baristas Profissionais",
    subtitle: "Atendimento que encanta",
    description: "Baristas certificados que combinam técnica, carisma e atendimento impecável. O café vira ponto de encontro e experiência memorável.",
    ctaLabel: "Conhecer o time",
    ctaHref: "#contato",
  },
];

