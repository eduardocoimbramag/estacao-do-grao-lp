# Documentação: Carrossel de Cards para Section "Nossos Serviços"

## Índice
1. [Contexto do Projeto e Objetivo](#1-contexto-do-projeto-e-objetivo)
2. [Comportamento de UX/UI Esperado](#2-comportamento-de-uxui-esperado)
3. [Estrutura de Dados dos Cards](#3-estrutura-de-dados-dos-cards)
4. [Implementação Técnica do Carrossel](#4-implementação-técnica-do-carrossel)
5. [Integração na Section "Nossos Serviços"](#5-integração-na-section-nossos-serviços)
6. [Estilo, Consistência e Personalização](#6-estilo-consistência-e-personalização)
7. [Boas Práticas e Erros Comuns](#7-boas-práticas-e-erros-comuns)
8. [Checklist de Implementação](#8-checklist-de-implementação)

---

## 1. Contexto do Projeto e Objetivo

### 1.1. Sobre o Projeto

Este projeto é a **landing page da Estação do Grão**, uma marca ligada a café especial, experiências gastronômicas e eventos corporativos. A landing page tem como objetivo apresentar os serviços da marca, capturar leads e converter visitantes em clientes.

### 1.2. Estrutura Macro da Landing Page

A landing page está organizada nas seguintes sections principais:

1. **Hero / Abertura**: Primeira impressão com proposta de valor principal e CTA de conversão
2. **Segunda Section**: Métricas, proposta de valor, diferenciais ou vídeo institucional
3. **Terceira Section: "Nossos Serviços"** ← **Esta é a section alvo desta documentação**
4. Demais sections: Galeria, depoimentos, contato, footer, etc.

### 1.3. Objetivo da Section "Nossos Serviços"

A terceira section da landing page tem como propósito:

- **Apresentar visualmente os principais serviços** oferecidos pela Estação do Grão
- **Permitir navegação interativa** através de um carrossel com arraste (drag)
- **Destacar cada serviço** com imagem, título, descrição e CTA específico
- **Criar engajamento** através de interação visual moderna e fluida

### 1.4. Tipos de Serviços Apresentados

Os serviços típicos que serão exibidos nesta section incluem:

- **Eventos corporativos e ativações**: Feiras, stands, conferências
- **Café para empresas**: Experiências regulares para escritórios e equipes
- **Assinaturas e planos**: Envios recorrentes de cafés especiais
- **Outros serviços futuros**: A estrutura deve permitir fácil expansão

### 1.5. Por que um Carrossel?

O carrossel foi escolhido porque:

- Permite apresentar **múltiplos serviços sem sobrecarregar** a tela
- Cria uma **experiência interativa moderna** que mantém o usuário engajado
- Funciona bem tanto em **mobile quanto desktop**
- Dá **destaque ao card central**, direcionando o foco do usuário
- É facilmente **expansível** conforme novos serviços sejam adicionados

### 1.6. Genericidade e Reutilização

Embora esta implementação seja focada na section "Nossos Serviços", o componente deve ser:

- **Genérico o suficiente** para ser reutilizado em outros contextos futuros
- **Configurável** através de props (dados, estilos, comportamento)
- **Bem documentado** para facilitar manutenção e evolução

---

## 2. Comportamento de UX/UI Esperado

### 2.1. Interação com o Carrossel

#### 2.1.1. Desktop (Mouse)
- Usuário pode **clicar e arrastar** horizontalmente para navegar entre cards
- Ao soltar o mouse, o carrossel deve **snap (encaixar)** no card mais próximo do centro
- O cursor deve mudar para indicar que o elemento é arrastável (ex.: `cursor-grab` / `cursor-grabbing`)

#### 2.1.2. Mobile (Touch)
- Usuário pode fazer **swipe horizontal** com o dedo
- Gesto de swipe deve ser **fluido e responsivo**
- Ao soltar, o carrossel faz snap no card central
- Deve respeitar o scroll vertical da página (não deve interferir)

#### 2.1.3. Navegação Adicional
O carrossel também deve suportar (implementação opcional inicial, mas arquitetura preparada):

- **Setas de navegação**: Botões "anterior" / "próximo" nas laterais ou abaixo
- **Indicadores de paginação**: Bolinhas (dots) mostrando quantos cards existem e qual está ativo
- **Navegação por teclado**: Tab para focar em botões, Enter/Space para ativar CTAs

### 2.2. Destaque Visual do Card Central

O card que estiver **centralizado no viewport** deve receber destaque visual especial:

#### Card Central (Ativo)
- **Escala**: `scale-100` (tamanho normal)
- **Opacidade**: `opacity-100` (totalmente visível)
- **Sombra**: `shadow-lg` (sombra mais pronunciada)
- **Borda**: Pode ter borda destacada (opcional, conforme design system)
- **Animação**: Transição suave ao trocar de card (`transition-all duration-300`)

#### Cards Laterais (Inativos)
- **Escala**: `scale-90` ou `scale-95` (levemente menores)
- **Opacidade**: `opacity-70` ou `opacity-75` (menos visíveis)
- **Sombra**: `shadow-md` (sombra padrão)
- **Indicação de continuidade**: Devem estar parcialmente visíveis para indicar que há mais conteúdo

### 2.3. Responsividade

#### Mobile (< 640px - Tailwind `sm`)
- Exibir **1 card por vez** centralizado
- Mostrar **pequenas "sobras" laterais** (~10-20% dos cards adjacentes) para indicar continuidade
- Espaçamento interno adequado para não encostar nas bordas da tela
- Touch swipe como principal método de navegação

#### Tablets (640px - 1024px - Tailwind `md`)
- Exibir aproximadamente **1.5 a 2 cards** visíveis
- Card central mantém destaque
- Swipe e mouse drag devem funcionar bem

#### Desktop (> 1024px - Tailwind `lg`)
- Exibir **3 cards** simultaneamente
- Card do meio totalmente centralizado e destacado
- Cards laterais visíveis e parcialmente "esmaecidos"
- Mouse drag como método principal, mas setas também disponíveis

### 2.4. Acessibilidade (A11y)

#### Requisitos Mínimos
- **Imagens**: Todas devem ter `alt` text descritivo e significativo
- **Botões de navegação**: `aria-label` claros (ex.: "Anterior", "Próximo", "Ir para slide 2")
- **Navegação por teclado**: 
  - Tab/Shift+Tab para navegar entre elementos focáveis
  - Enter/Space para ativar links e botões
  - Setas do teclado para navegar entre slides (opcional, mas recomendado)
- **Contraste**: Garantir contraste mínimo de 4.5:1 entre texto e fundo
- **ARIA roles**: 
  - `role="region"` na section com `aria-label="Carrossel de serviços"`
  - `aria-live="polite"` para anunciar mudanças de slide (opcional)
- **Foco visível**: Outline claro em elementos focados

#### Testes de Acessibilidade
- Testar com leitor de tela (NVDA, JAWS, VoiceOver)
- Testar navegação apenas com teclado
- Validar com ferramenta automatizada (Lighthouse, axe DevTools)

---

## 3. Estrutura de Dados dos Cards

### 3.1. Tipo TypeScript Genérico

Criar um tipo genérico que possa ser reutilizado para diferentes contextos de carrossel:

```typescript
/**
 * Tipo genérico para cards do carrossel
 * Pode ser usado em diferentes contexts (serviços, planos, cases, etc.)
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
```

**Local sugerido**: `lib/types/carousel.ts` ou `types/carousel.ts`

### 3.2. Dados dos Serviços da Estação do Grão

Criar uma lista específica para a section "Nossos Serviços":

```typescript
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
    imageSrc: "/images/carousel/empresas.jpg",
    imageAlt: "Barista preparando café especial em ambiente corporativo",
    title: "Café para Empresas",
    subtitle: "Experiências para times e clientes",
    description: "Levamos café especial, estrutura completa e atendimento profissional para dentro da rotina do seu escritório ou espaço corporativo.",
    ctaLabel: "Quero na minha empresa",
    ctaHref: "#contato",
  },
  {
    id: "servico-eventos",
    imageSrc: "/images/carousel/eventos.jpg",
    imageAlt: "Estação móvel de café em evento corporativo",
    title: "Eventos e Ativações",
    subtitle: "Feiras, conferências e ações externas",
    description: "Estrutura móvel completa de café especial para feiras, stands, congressos e ativações de marca. Experiência premium para seus convidados.",
    ctaLabel: "Ver opções para eventos",
    ctaHref: "#contato",
  },
  {
    id: "servico-assinaturas",
    imageSrc: "/images/carousel/assinaturas.jpg",
    imageAlt: "Embalagens de café em grãos especiais da Estação do Grão",
    title: "Assinatura de Cafés",
    subtitle: "Entregas recorrentes de cafés especiais",
    description: "Receba periodicamente cafés especiais selecionados, torrados sob demanda e prontos para o seu método de preparo favorito.",
    priceText: "A partir de R$ 89/mês",
    ctaLabel: "Ver planos de assinatura",
    ctaHref: "#planos",
  },
  {
    id: "servico-consultoria",
    imageSrc: "/images/carousel/consultoria.jpg",
    imageAlt: "Treinamento de barista em equipamento profissional",
    title: "Consultoria e Treinamentos",
    subtitle: "Capacitação e implantação de cafeteria",
    description: "Ajudamos sua empresa a montar e operar uma cafeteria interna, incluindo escolha de equipamentos, treinamento de equipe e fornecimento de insumos.",
    ctaLabel: "Saber mais",
    ctaHref: "#contato",
  },
];
```

**Local sugerido**: `lib/data/services-carousel-cards.ts` ou `data/services-carousel.ts`

### 3.3. Regras para Conteúdo dos Cards

| Campo | Regras |
|-------|--------|
| `id` | Único, kebab-case, descritivo (ex: `servico-empresas`) |
| `title` | Máximo 30-40 caracteres, objetivo e claro |
| `subtitle` | Máximo 50 caracteres, complementa o título |
| `description` | 120-180 caracteres, descreve valor/benefício principal |
| `priceText` | Opcional, apenas se relevante para o serviço |
| `ctaLabel` | Verbo de ação + contexto (ex: "Quero para minha empresa") |
| `ctaHref` | Âncora válida ou rota existente |

---

## 4. Implementação Técnica do Carrossel

### 4.1. Biblioteca Recomendada: Embla Carousel

**Por que Embla Carousel?**
- ✅ Leve e performático (~3kb gzipped)
- ✅ Suporte nativo a React com hooks
- ✅ Touch/mouse drag out-of-the-box
- ✅ Altamente customizável
- ✅ Sem dependências externas pesadas
- ✅ Boa documentação e manutenção ativa
- ✅ Suporte a SSR (Next.js App Router)

**Alternativas** (caso Embla não seja ideal):
- `swiper` (mais recursos, mas mais pesado)
- `keen-slider` (similar ao Embla)
- `react-slick` (mais antigo, mas estável)

### 4.2. Instalação

```bash
# Usando pnpm (conforme projeto atual)
pnpm add embla-carousel-react embla-carousel

# Ou npm
npm install embla-carousel-react embla-carousel

# Ou yarn
yarn add embla-carousel-react embla-carousel
```

### 4.3. Estrutura do Componente

#### 4.3.1. Localização e Nome

**Arquivo**: `components/sections/services-carousel.tsx`  
**Nome do componente**: `ServicesCarousel`

Pode ser renomeado para `CardsCarousel` caso queira maior genericidade.

#### 4.3.2. Código Base do Componente

```tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";
import type { CarouselCard } from "@/lib/types/carousel";

type ServicesCarouselProps = {
  /** Array de cards a serem exibidos */
  cards: CarouselCard[];
  /** Classe CSS adicional para o container */
  className?: string;
};

export function ServicesCarousel({ cards, className = "" }: ServicesCarouselProps) {
  // Estado para controlar qual slide está ativo/centralizado
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Hook do Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // Permite navegação infinita
    align: "center", // Alinha cards ao centro
    skipSnaps: false, // Não pula snaps intermediários
    dragFree: false, // Snap ao card mais próximo ao soltar
  });

  // Callback para atualizar o índice selecionado
  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  // Registrar listener para mudanças de slide
  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Funções de navegação
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section
      className={`relative ${className}`}
      role="region"
      aria-label="Carrossel de serviços"
    >
      {/* Container do carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {cards.map((card, index) => {
            // Verifica se este card está ativo (centralizado)
            const isActive = index === selectedIndex;

            return (
              <article
                key={card.id}
                className="
                  min-w-[85%] sm:min-w-[70%] md:min-w-[45%] lg:min-w-[33.333%]
                  px-3 sm:px-4
                "
                aria-label={`Serviço ${index + 1} de ${cards.length}: ${card.title}`}
              >
                <div
                  className={`
                    h-full rounded-2xl border bg-card
                    backdrop-blur-sm
                    shadow-md transition-all duration-300 ease-out
                    ${
                      isActive
                        ? "scale-100 opacity-100 shadow-lg border-primary/20"
                        : "scale-95 opacity-75 border-border"
                    }
                  `}
                >
                  {/* Imagem do card */}
                  <div className="relative flex items-center justify-center p-6 sm:p-8">
                    <div className="relative h-40 sm:h-48 w-full">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Conteúdo de texto */}
                  <div className="space-y-3 px-6 pb-6 text-center">
                    {/* Título */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-foreground">
                      {card.title}
                    </h3>

                    {/* Subtítulo */}
                    {card.subtitle && (
                      <p className="text-sm sm:text-base font-medium text-primary">
                        {card.subtitle}
                      </p>
                    )}

                    {/* Descrição */}
                    {card.description && (
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {card.description}
                      </p>
                    )}

                    {/* Preço (se houver) */}
                    {card.priceText && (
                      <p className="text-base sm:text-lg font-semibold text-foreground pt-2">
                        {card.priceText}
                      </p>
                    )}

                    {/* CTA Button */}
                    {card.ctaLabel && card.ctaHref && (
                      <div className="pt-4">
                        <a
                          href={card.ctaHref}
                          className="
                            inline-flex items-center justify-center
                            rounded-full px-6 py-2.5 text-sm font-medium
                            transition-all duration-200
                            bg-primary text-primary-foreground
                            hover:bg-primary/90 hover:shadow-md
                            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                          "
                        >
                          {card.ctaLabel}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Botões de navegação (Desktop) */}
      <div className="hidden lg:flex justify-center items-center gap-4 mt-8">
        <button
          onClick={scrollPrev}
          aria-label="Serviço anterior"
          className="
            p-3 rounded-full border bg-background
            hover:bg-accent hover:border-primary/20
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Indicadores de paginação (dots) */}
        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Ir para serviço ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
              className={`
                h-2 rounded-full transition-all duration-300
                ${
                  index === selectedIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }
              `}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Próximo serviço"
          className="
            p-3 rounded-full border bg-background
            hover:bg-accent hover:border-primary/20
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
          "
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Indicadores de paginação (Mobile) */}
      <div className="flex lg:hidden justify-center gap-2 mt-6">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Ir para serviço ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : "false"}
            className={`
              h-2 rounded-full transition-all duration-300
              ${
                index === selectedIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}
```

### 4.4. Explicação de Conceitos Técnicos

#### 4.4.1. Hook `useEmblaCarousel`
- Retorna uma ref para o container e a API do carrossel
- Aceita options de configuração: `loop`, `align`, `dragFree`, etc.

#### 4.4.2. Estado `selectedIndex`
- Rastreia qual slide está atualmente centralizado
- Atualizado via callback `onSelect` quando o carrossel muda

#### 4.4.3. Classes Tailwind Responsivas
- `min-w-[85%]`: Mobile mostra quase 1 card completo
- `sm:min-w-[70%]`: Tablets mostram ~1.5 cards
- `lg:min-w-[33.333%]`: Desktop mostra exatos 3 cards

#### 4.4.4. Transições e Animações
- `transition-all duration-300`: Transição suave entre estados
- `scale-95` vs `scale-100`: Destaque visual do card central
- `opacity-75` vs `opacity-100`: Reforça hierarquia visual

---

## 5. Integração na Section "Nossos Serviços"

### 5.1. Localização na Landing Page

A section "Nossos Serviços" deve ser **a terceira section** da landing page, após:

1. **Hero** (abertura com proposta de valor principal)
2. **Segunda section** (métricas, vídeo institucional, ou diferencias)

### 5.2. Código de Integração em `app/page.tsx`

```tsx
import { ServicesCarousel } from "@/components/sections/services-carousel";
import { SERVICES_CAROUSEL_CARDS } from "@/lib/data/services-carousel-cards";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1ª Section: Hero */}
      <section id="hero">
        {/* Conteúdo do Hero */}
      </section>

      {/* 2ª Section: Métricas, Vídeo ou Diferenciais */}
      <section id="segunda-secao" className="py-16 sm:py-20 lg:py-24">
        {/* Conteúdo da segunda section */}
      </section>

      {/* 3ª Section: Nossos Serviços (CARROSSEL) */}
      <section
        id="nossos-servicos"
        className="py-16 sm:py-20 lg:py-24 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          {/* Cabeçalho da Section */}
          <header className="mb-12 sm:mb-16 text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Nossos Serviços
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Da sua empresa a grandes eventos, a Estação do Grão leva
              experiências completas em café especial para qualquer ocasião.
            </p>
          </header>

          {/* Carrossel de Cards */}
          <ServicesCarousel cards={SERVICES_CAROUSEL_CARDS} />
        </div>
      </section>

      {/* Demais sections: Galeria, Depoimentos, Contato, etc. */}
    </main>
  );
}
```

### 5.3. Estrutura Visual da Section

```
┌────────────────────────────────────────────────────────┐
│                   NOSSOS SERVIÇOS                      │
│         (Título + Parágrafo Descritivo)               │
│                                                        │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐       │
│  │          │    │          │    │          │       │
│  │  Card 1  │    │  Card 2  │    │  Card 3  │       │
│  │ (faded)  │    │ (ACTIVE) │    │ (faded)  │       │
│  │          │    │          │    │          │       │
│  └──────────┘    └──────────┘    └──────────┘       │
│                                                        │
│              ◀   ● ● ● ●   ▶                         │
│           (Navegação + Indicadores)                    │
└────────────────────────────────────────────────────────┘
```

### 5.4. Identificação da Section

- **ID HTML**: `#nossos-servicos`
- **Posição**: Terceira section após Hero
- **Background**: Levemente diferente (`bg-muted/30`) para separar visualmente
- **Espaçamento**: `py-16 sm:py-20 lg:py-24` (consistente com outras sections)

### 5.5. Navegação Âncora

Links de navegação (menu, footer) devem apontar para:

```tsx
<a href="#nossos-servicos">Serviços</a>
```

---

## 6. Estilo, Consistência e Personalização

### 6.1. Tipografia

#### Hierarquia de Texto
- **Título da section** (`h2`): `text-3xl sm:text-4xl lg:text-5xl font-bold`
- **Parágrafo introdutório**: `text-base sm:text-lg text-muted-foreground`
- **Título do card** (`h3`): `text-xl sm:text-2xl font-semibold`
- **Subtítulo do card**: `text-sm sm:text-base font-medium text-primary`
- **Descrição do card**: `text-sm sm:text-base text-muted-foreground`
- **Preço**: `text-base sm:text-lg font-semibold`
- **CTA**: `text-sm font-medium`

#### Alinhamento
- Título e parágrafo da section: **Centralizado** (`text-center`)
- Conteúdo dos cards: **Centralizado** (`text-center`)

### 6.2. Cores

#### Tokens de Cor Utilizados
| Elemento | Token | Uso |
|----------|-------|-----|
| Título principal | `text-foreground` | Máximo contraste |
| Parágrafo intro | `text-muted-foreground` | Tom secundário |
| Background da section | `bg-muted/30` | Separação visual sutil |
| Card background | `bg-card` | Fundo dos cards |
| Card ativo - borda | `border-primary/20` | Destaque do card central |
| Card inativo - borda | `border-border` | Borda padrão |
| Subtítulo do card | `text-primary` | Destaque de marca |
| CTA background | `bg-primary` | Ação principal |
| CTA texto | `text-primary-foreground` | Contraste com bg |

#### Contraste de Acessibilidade
- Garantir contraste mínimo de **4.5:1** entre texto e fundo
- Testar com ferramenta de contraste (ex: WebAIM Contrast Checker)
- Especial atenção ao `text-muted-foreground` em fundos claros

### 6.3. Espaçamento e Layout

#### Padding/Margin da Section
- Vertical: `py-16 sm:py-20 lg:py-24`
- Horizontal (container): `px-4`
- Gap entre header e carrossel: `mb-12 sm:mb-16`

#### Espaçamento dos Cards
- Padding horizontal entre cards: `px-3 sm:px-4`
- Padding interno do card:
  - Imagem: `p-6 sm:p-8`
  - Conteúdo: `px-6 pb-6`
- Gap vertical no conteúdo: `space-y-3`

### 6.4. Bordas e Sombras

#### Radius
- Cards: `rounded-2xl` (consistente com outros cards do projeto)
- Botões: `rounded-full` (CTAs) ou `rounded-full` (navegação)

#### Sombras
- Card ativo: `shadow-lg`
- Card inativo: `shadow-md`
- Hover em botões: `hover:shadow-md`

### 6.5. Transições e Animações

#### Duração
- Padrão: `duration-200` (hovers rápidos)
- Cards do carrossel: `duration-300` (mais suave)

#### Propriedades Animadas
- Escala: `scale-95` ↔ `scale-100`
- Opacidade: `opacity-75` ↔ `opacity-100`
- Sombra: `shadow-md` ↔ `shadow-lg`
- Background: `bg-primary` ↔ `bg-primary/90`

#### Easing
- Padrão: `ease-out` (natural e agradável)

### 6.6. Tokens Customizáveis

Se o projeto usar CSS Variables (recomendado para temas):

```css
/* Carrossel - tokens customizáveis */
:root {
  --carousel-card-scale-inactive: 0.95;
  --carousel-card-opacity-inactive: 0.75;
  --carousel-transition-duration: 300ms;
  --carousel-card-gap: 1rem;
}
```

---

## 7. Boas Práticas e Erros Comuns

### 7.1. Boas Práticas

#### Organização de Código
- ✅ Centralizar dados dos cards em arquivo separado (`lib/data/`)
- ✅ Usar tipos TypeScript para garantir consistência
- ✅ Componente genérico que aceita props (não hardcoded)
- ✅ Separar lógica de apresentação (hooks vs JSX)

#### Conteúdo
- ✅ Manter textos objetivos e consistentes em tom de voz
- ✅ Usar verbos de ação nos CTAs ("Quero", "Solicitar", "Ver planos")
- ✅ Garantir que todos os cards tenham comprimento de texto similar
- ✅ Revisar ortografia e gramática antes de publicar

#### Performance
- ✅ Usar `next/image` para otimização automática de imagens
- ✅ Definir `sizes` adequados para responsividade
- ✅ Imagens com dimensões similares (ex: 800x600px, proporção 4:3)
- ✅ Lazy loading de imagens (comportamento padrão do Next.js)

#### Testes
- ✅ Testar em diferentes dispositivos (mobile, tablet, desktop)
- ✅ Testar com mouse e trackpad (drag)
- ✅ Testar com touch em tela sensível ao toque
- ✅ Testar navegação apenas com teclado
- ✅ Testar com leitor de tela
- ✅ Validar contraste de cores (Lighthouse, axe DevTools)

#### Manutenibilidade
- ✅ Documentar configurações customizáveis
- ✅ Usar comentários para explicar lógica complexa
- ✅ Manter consistência com design system do projeto
- ✅ Versionar mudanças em dados dos cards (git)

### 7.2. Erros Comuns a Evitar

#### Conteúdo
- ❌ Usar imagens pesadas sem otimização (>500kb)
- ❌ Colocar textos muito longos que quebram o layout
- ❌ Usar textos genéricos em `alt` de imagens ("imagem", "foto")
- ❌ Misturar cards com propósitos muito diferentes na mesma section
- ❌ CTAs sem verbo de ação ("Saiba mais" genérico)

#### Visual
- ❌ Destaque do card central muito sutil (diferença imperceptível)
- ❌ Usar cores que não estão no design system
- ❌ Quebrar padrões de radius e sombras estabelecidos
- ❌ Animações exageradas ou muito lentas (> 500ms)
- ❌ Contraste insuficiente em textos secundários

#### Técnico
- ❌ Não usar `key` única em listas (usar `index` como key)
- ❌ Hardcoded de dados dentro do componente
- ❌ Não implementar acessibilidade (aria-labels, focus)
- ❌ Esquecer de testar em mobile real (não apenas DevTools)
- ❌ Não usar TypeScript ou ignorar erros de tipo

#### UX
- ❌ Carrossel não funcionar em mobile (falta de touch support)
- ❌ Não indicar que há mais conteúdo (cards laterais escondidos)
- ❌ Carrossel muito rápido ou muito lento ao arrastar
- ❌ Não fazer snap ao soltar (fica entre dois cards)
- ❌ Interferir com scroll vertical da página

### 7.3. Checklist de Qualidade

Antes de considerar a implementação completa, verificar:

#### Funcionalidade
- [ ] Carrossel arrasta com mouse (desktop)
- [ ] Carrossel arrasta com touch (mobile)
- [ ] Snap correto ao soltar
- [ ] Card central recebe destaque visual
- [ ] Botões de navegação funcionam
- [ ] Indicadores (dots) funcionam
- [ ] Loop infinito funciona (volta ao início)

#### Visual
- [ ] Cards têm tamanho consistente
- [ ] Imagens carregam corretamente
- [ ] Tipografia segue design system
- [ ] Cores seguem design system
- [ ] Animações suaves e naturais
- [ ] Responsivo em mobile, tablet e desktop

#### Conteúdo
- [ ] Todos os textos revisados
- [ ] Imagens têm `alt` text descritivo
- [ ] CTAs levam para destinos corretos
- [ ] Tom de voz consistente

#### Acessibilidade
- [ ] Navegação por teclado funciona
- [ ] Focus visível em elementos interativos
- [ ] Contraste adequado (mínimo 4.5:1)
- [ ] ARIA labels presentes
- [ ] Testado com leitor de tela

#### Performance
- [ ] Imagens otimizadas (<200kb cada)
- [ ] Lighthouse Performance > 90
- [ ] Sem layout shift (CLS)
- [ ] Carrega rápido em 3G

---

## 8. Checklist de Implementação

### 8.1. Fase 1: Setup e Estrutura

- [ ] Instalar biblioteca `embla-carousel-react`
- [ ] Criar tipo TypeScript `CarouselCard` em `lib/types/carousel.ts`
- [ ] Criar arquivo de dados `lib/data/services-carousel-cards.ts`
- [ ] Adicionar/otimizar imagens em `public/images/carousel/`

### 8.2. Fase 2: Componente Base

- [ ] Criar componente `ServicesCarousel` em `components/sections/services-carousel.tsx`
- [ ] Implementar hook `useEmblaCarousel` com configurações básicas
- [ ] Implementar lógica de `selectedIndex` (card ativo)
- [ ] Criar estrutura JSX dos cards
- [ ] Aplicar estilos Tailwind base

### 8.3. Fase 3: Interatividade

- [ ] Implementar destaque visual do card central
- [ ] Adicionar botões de navegação (prev/next)
- [ ] Adicionar indicadores de paginação (dots)
- [ ] Conectar callbacks de navegação ao Embla API
- [ ] Testar drag/swipe em diferentes dispositivos

### 8.4. Fase 4: Integração na Landing

- [ ] Importar `ServicesCarousel` em `app/page.tsx`
- [ ] Importar `SERVICES_CAROUSEL_CARDS`
- [ ] Criar section "Nossos Serviços" como terceira section
- [ ] Adicionar título e parágrafo introdutório
- [ ] Renderizar componente `<ServicesCarousel />`
- [ ] Adicionar ID `#nossos-servicos` para navegação âncora

### 8.5. Fase 5: Estilo e Refinamento

- [ ] Ajustar responsividade (mobile, tablet, desktop)
- [ ] Alinhar tipografia com design system
- [ ] Alinhar cores com design system
- [ ] Ajustar espaçamentos e paddings
- [ ] Implementar animações e transições
- [ ] Verificar consistência visual com outras sections

### 8.6. Fase 6: Acessibilidade

- [ ] Adicionar `role="region"` e `aria-label` na section
- [ ] Adicionar `aria-label` em botões de navegação
- [ ] Adicionar `aria-current` em indicadores
- [ ] Garantir focus visível (outline)
- [ ] Adicionar texto alternativo em imagens
- [ ] Testar navegação por teclado
- [ ] Testar com leitor de tela

### 8.7. Fase 7: Testes e Validação

- [ ] Testar em Chrome, Firefox, Safari, Edge
- [ ] Testar em iOS (Safari mobile)
- [ ] Testar em Android (Chrome mobile)
- [ ] Testar com mouse e trackpad
- [ ] Testar com touch em dispositivo real
- [ ] Validar contraste com ferramenta
- [ ] Rodar Lighthouse (Performance, Acessibilidade)
- [ ] Validar HTML (W3C Validator)

### 8.8. Fase 8: Documentação e Handoff

- [ ] Atualizar documentação com ajustes finais
- [ ] Documentar como adicionar/editar cards
- [ ] Criar guia de manutenção para não-devs
- [ ] Adicionar comentários no código quando necessário
- [ ] Atualizar README se relevante
- [ ] Fazer commit com mensagem clara

---

## 9. Recursos e Referências

### 9.1. Bibliotecas

- [Embla Carousel](https://www.embla-carousel.com/) - Documentação oficial
- [Embla Carousel React](https://www.embla-carousel.com/get-started/react/) - Setup para React

### 9.2. Acessibilidade

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - Diretrizes de acessibilidade
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Validar contraste
- [ARIA Authoring Practices - Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) - Padrões ARIA

### 9.3. Ferramentas de Teste

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoria de performance e acessibilidade
- [axe DevTools](https://www.deque.com/axe/devtools/) - Testes automatizados de acessibilidade
- [NVDA](https://www.nvaccess.org/) - Leitor de tela para Windows
- [VoiceOver](https://www.apple.com/accessibility/voiceover/) - Leitor de tela para macOS/iOS

### 9.4. Inspirações de Design

- [Dribbble - Service Carousels](https://dribbble.com/search/service-carousel)
- [Awwwards - Carousel Designs](https://www.awwwards.com/websites/carousel/)

---

## 10. Próximos Passos

Após a implementação básica, considerar melhorias futuras:

### 10.1. Funcionalidades Avançadas

- **Autoplay**: Carrossel roda automaticamente (pausar ao hover/focus)
- **Indicadores customizados**: Miniaturas das imagens ao invés de dots
- **Animações de entrada**: Cards aparecem com fade/slide ao entrar no viewport
- **Filtros**: Permitir filtrar cards por categoria de serviço
- **Deep linking**: URL reflete qual card está ativo (#nossos-servicos/eventos)

### 10.2. Otimizações

- **Preload de imagens**: Pré-carregar imagens adjacentes
- **Lazy loading progressivo**: Carregar apenas cards visíveis inicialmente
- **Service Worker**: Cache de imagens para visitas recorrentes
- **Animações GPU**: Usar `will-change` para performance

### 10.3. Analytics

- Rastrear qual serviço recebe mais interação
- Medir taxa de clique em cada CTA
- Analisar comportamento de swipe (quantos cards usuários veem)

---

## Notas Finais

Esta documentação serve como **guia completo** para implementação do carrossel de serviços. Ela deve ser:

- **Atualizada** sempre que houver mudanças na implementação
- **Referenciada** por desenvolvedores ao manter o código
- **Compartilhada** com designers e stakeholders para alinhamento

Para dúvidas ou sugestões de melhorias nesta doc, abrir issue ou contatar o time de desenvolvimento.

---

**Versão**: 1.0  
**Data**: Novembro 2025  
**Autor**: Equipe de Desenvolvimento - Estação do Grão  
**Revisão**: Pendente

