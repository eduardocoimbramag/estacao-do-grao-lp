"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { Sparkles, Coffee, Store } from "lucide-react";
import FeatureItemCompact from "@/components/hero/FeatureItemCompact";

type HeroProps = {
  images?: string[];
};

export default function Hero({ 
  images = [
    "/professional-barista-making-latte-art.jpg",
    "/coffee-station-setup-at-wedding-reception.jpg",
    "/barista-serving-espresso-at-corporate-event.jpg",
    "/guests-enjoying-gourmet-coffee-at-premium-event.jpg",
    "/espresso-machine-coffee-station-at-fair.jpg",
    "/coffee-station-with-branded-logo-personalized.jpg"
  ] 
}: HeroProps) {
  // Embla options
  const options: EmblaOptionsType = React.useMemo(() => ({
    loop: true,
    align: "center",
    dragFree: false,
  }), []);

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const autoplayRef = React.useRef<NodeJS.Timeout | null>(null);
  const hoverRef = React.useRef(false);

  // Autoplay com pausa ao focar/hover
  React.useEffect(() => {
    if (!emblaApi) return;

    const play = () => {
      stop();
      autoplayRef.current = setInterval(() => {
        if (!hoverRef.current) emblaApi.scrollNext();
      }, 4500);
    };

    const stop = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    play();

    emblaApi.on("pointerDown", stop);
    return () => stop();
  }, [emblaApi]);

  // Acessibilidade: teclado nas setas
  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) return;
    if (e.key === "ArrowRight") emblaApi.scrollNext();
    if (e.key === "ArrowLeft") emblaApi.scrollPrev();
  };

  return (
    <section className="relative pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-[#452911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* H1 centralizado com clamp */}
        <h1 className="font-serif text-cream-50 font-bold tracking-tight text-center mb-8 md:mb-10 lg:mb-12 text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
          Café Gourmet e Baristas para Eventos
        </h1>

        {/* Grid principal com gaps progressivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-14 items-start">
          {/* Slideshow com aspect ratios e sizes otimizados */}
          <div
            className="relative min-w-0"
            role="region"
            aria-roledescription="carousel"
            aria-label="Galeria de fotos Estação do Grão"
            onKeyDown={handleKey}
            tabIndex={0}
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
          >
            <div className="overflow-hidden rounded-2xl ring-1 ring-cream-50/15 shadow-2xl" ref={emblaRef}>
              <div className="flex">
                {images.map((src, idx) => (
                  <div className="relative min-w-0 flex-[0_0_100%]" key={idx}>
                    <div className="relative aspect-[4/3] lg:aspect-[16/10] w-full">
                      <Image
                        src={src}
                        alt={`Foto ${idx + 1} do serviço de café para eventos`}
                        fill
                        className="object-cover select-none"
                        sizes="(min-width:1536px) 720px, (min-width:1280px) 640px, (min-width:1024px) 560px, (min-width:768px) 50vw, 100vw"
                        priority={idx === 0}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles responsivos */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-3 pointer-events-none">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                className="inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
                aria-label="Imagem anterior"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                className="inline-flex items-center justify-center h-10 w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
                aria-label="Próxima imagem"
              >
                ›
              </button>
            </div>
          </div>

          {/* Texto + Cards compactos com gaps progressivos */}
          <div className="self-start flex flex-col max-w-full gap-4 md:gap-5 w-full">
            {/* Texto em caixa sutil com clamp */}
            <div className="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-card p-5 md:p-6 lg:p-6 shadow-2xl w-full">
              <p className="text-cream-50/90 text-[clamp(0.98rem,0.35vw+0.95rem,1.125rem)] leading-relaxed text-justify indent-6 hyphens-auto md:max-w-none">
                Transforme o café do seu evento em uma experiência inesquecível com a Estação do Grão! Oferecemos estação de café gourmet, baristas profissionais e café espresso premium para eventos corporativos, feiras de negócios, congressos, ativações de marca, lançamentos de produtos e casamentos.
              </p>
            </div>

            {/* Cards COMPACTOS empilhados */}
            <FeatureItemCompact icon={<Coffee className="w-5 h-5" />} title="Atendimento para alto fluxo de pessoas" />
            <FeatureItemCompact icon={<Sparkles className="w-5 h-5" />} title="Personalização com sua Marca" />
            <FeatureItemCompact icon={<Store className="w-5 h-5" />} title="Perfeito para feiras e estandes" />
          </div>
        </div>

        {/* Grid de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16">
          {/* Card 1 */}
          <div className="p-4 md:p-5 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-500">
              + 100 mil
            </div>
            <div className="text-lg md:text-xl font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-2">
              <span>☕</span>
              <span>cafés servidos</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 md:p-5 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-500">
              +100
            </div>
            <div className="text-lg md:text-xl font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-2">
              <span>🏢</span>
              <span>empresas atendidas</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 md:p-5 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-2">
            <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-coffee-500">
              + 2 mil
            </div>
            <div className="text-lg md:text-xl font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-2">
              <span>🤝</span>
              <span>eventos realizados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

