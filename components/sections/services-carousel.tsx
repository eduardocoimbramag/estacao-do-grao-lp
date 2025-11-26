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

  // Duplicar cards para garantir loop suave (necessário para carrossel com poucos items)
  const loopedCards = [...cards, ...cards, ...cards];

  // Hook do Embla Carousel com loop infinito
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true, // Loop infinito ativado
    align: "center",
    skipSnaps: false,
    dragFree: false,
    startIndex: cards.length, // Começar no segundo set de cards
  });

  // ✅ DETECÇÃO SIMPLES E CONFIÁVEL - Usa API nativa do Embla
  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;
    
    // Pegar o índice do slide "snapped" pelo Embla
    const currentSnap = emblaApi.selectedScrollSnap();
    
    // Mapear para o card original (0-3)
    const cardIndex = currentSnap % cards.length;
    
    setSelectedIndex(cardIndex);
  }, [emblaApi, cards]);

  // ✅ REGISTRAR LISTENERS ESSENCIAIS
  useEffect(() => {
    if (!emblaApi) return;

    // Inicializar
    updateSelectedIndex();

    // Eventos essenciais (sem "scroll" para evitar race conditions)
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

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
      {/* Container do carrossel com padding vertical para evitar overflow */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing py-8" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {loopedCards.map((card, index) => {
            // Mapear de volta ao índice original para verificar se está ativo
            const originalIndex = index % cards.length;
            const isActive = originalIndex === selectedIndex;

            return (
              <article
                key={`${card.id}-${index}`}
                className="
                  min-w-[85%] sm:min-w-[70%] md:min-w-[45%] lg:min-w-[33.333%]
                  px-3 sm:px-4
                "
                aria-label={`Serviço ${originalIndex + 1} de ${cards.length}: ${card.title}`}
              >
                <div
                  className={`
                    h-full rounded-2xl border bg-coffee-900/80 backdrop-blur-sm
                    shadow-md transition-all duration-300 ease-out
                    ${
                      isActive
                        ? "scale-105 opacity-100 shadow-xl border-coffee-500/40"
                        : "scale-95 opacity-70 border-coffee-700"
                    }
                  `}
                >
                  {/* Imagem do card */}
                  <div className="relative flex items-center justify-center p-6 sm:p-8">
                    <div className="relative h-40 sm:h-48 w-full rounded-lg overflow-hidden">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Conteúdo de texto */}
                  <div className="space-y-3 px-6 pb-6 text-center">
                    {/* Título */}
                    <h3 className="text-xl sm:text-2xl font-semibold text-cream-50 font-montserrat">
                      {card.title}
                    </h3>

                    {/* Subtítulo */}
                    {card.subtitle && (
                      <p className="text-sm sm:text-base font-medium text-coffee-500 font-montserrat">
                        {card.subtitle}
                      </p>
                    )}

                    {/* Descrição */}
                    {card.description && (
                      <p className="text-sm sm:text-base text-cream-50/80 leading-relaxed font-montserrat">
                        {card.description}
                      </p>
                    )}

                    {/* Preço (se houver) */}
                    {card.priceText && (
                      <p className="text-base sm:text-lg font-semibold text-cream-50 pt-2 font-montserrat">
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
                            bg-coffee-500 text-coffee-900
                            hover:bg-accent hover:shadow-md
                            focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 focus:ring-offset-coffee-900
                            font-montserrat
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
            p-3 rounded-full border border-coffee-700 bg-coffee-900/80
            hover:bg-coffee-800 hover:border-coffee-500/50
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 focus:ring-offset-coffee-900
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
            className="text-cream-50"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Indicadores de paginação (dots) */}
        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index + cards.length)}
              aria-label={`Ir para serviço ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : "false"}
              className={`
                h-2 rounded-full transition-all duration-300
                ${
                  index === selectedIndex
                    ? "w-8 bg-coffee-500"
                    : "w-2 bg-cream-50/30 hover:bg-cream-50/50"
                }
              `}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Próximo serviço"
          className="
            p-3 rounded-full border border-coffee-700 bg-coffee-900/80
            hover:bg-coffee-800 hover:border-coffee-500/50
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:ring-offset-2 focus:ring-offset-coffee-900
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
            className="text-cream-50"
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
            onClick={() => scrollTo(index + cards.length)}
            aria-label={`Ir para serviço ${index + 1}`}
            aria-current={index === selectedIndex ? "true" : "false"}
            className={`
              h-2 rounded-full transition-all duration-300
              ${
                index === selectedIndex
                  ? "w-8 bg-coffee-500"
                  : "w-2 bg-cream-50/30"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}

