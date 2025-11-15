/**
 * Tipo genérico para cards do carrossel
 * Pode ser usado em diferentes contextos (serviços, planos, cases, etc.)
 */
export type CarouselCard = {
  /** ID único do card (usado como key no React) */
  id: string;
  
  /** Caminho da imagem (público ou URL externa) */
  imageSrc: string;
  
  /** Texto alternativo da imagem (acessibilidade) */
  imageAlt: string;
  
  /** Título principal do card */
  title: string;
  
  /** Subtítulo ou tag opcional */
  subtitle?: string;
  
  /** Descrição do serviço/produto */
  description?: string;
  
  /** Texto de preço ou destaque opcional (ex: "A partir de R$ 2.500") */
  priceText?: string;
  
  /** Label do botão CTA */
  ctaLabel?: string;
  
  /** Link do CTA (pode ser âncora #contato ou rota /servico) */
  ctaHref?: string;
  
  /** Lista de benefícios/features (opcional para versões mais completas) */
  features?: string[];
};

