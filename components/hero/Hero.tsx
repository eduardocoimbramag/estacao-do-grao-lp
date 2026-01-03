"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import { Sparkles, Coffee, Store } from "lucide-react";
import FeatureItemCompact from "@/components/hero/FeatureItemCompact";

type HeroProps = {
  images?: string[];
};

export default function Hero({ 
  images = [
    "/slideshow-1.jpg",
    "/slideshow-2.jpg",
    "/slideshow-3.jpg",
    "/slideshow-4.jpg"
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
    <section className="relative min-h-screen lg:h-screen flex flex-col justify-center bg-[#452911] pt-20 sm:pt-24 lg:pt-0 pb-8 sm:pb-12 lg:pb-0 overflow-x-hidden w-full laydesk3-hero-section">
      <div className="w-full max-w-[100vw] sm:max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-3 sm:py-4 lg:py-6 box-border">
        {/* H1 centralizado, em linha única, ajustando tamanho com clamp para não ultrapassar os limites laterais */}
        <h1
          className="
            font-montserrat text-cream-50 font-extrabold sm:font-bold
            tracking-tight text-center
            mb-3 sm:mb-4 md:mb-5 lg:mb-6
            uppercase sm:whitespace-nowrap
            !text-[clamp(1.375rem,7vw,1.75rem)] sm:!text-[clamp(1.75rem,2.8vw,2.5rem)] lg:!text-[clamp(2.5rem,2.5vw,3rem)]
            px-1 sm:px-0
            laydesk2-hero-title laydesk3-hero-h1
          "
        >
          Café Gourmet e Baristas para Eventos
        </h1>

        {/* Grid principal com gaps progressivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 items-start md:items-end w-full min-w-0">
          {/* Slideshow com aspect ratios e sizes otimizados */}
          <div
            className="relative min-w-0 w-full"
            role="region"
            aria-roledescription="carousel"
            aria-label="Galeria de fotos Estação do Grão"
            onKeyDown={handleKey}
            tabIndex={0}
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
          >
            <div className="overflow-hidden rounded-2xl ring-1 ring-cream-50/15 shadow-2xl w-full min-w-0" ref={emblaRef}>
              <div className="flex min-w-0">
                {images.map((src, idx) => (
                  <div className="relative min-w-0 flex-[0_0_100%] w-full shrink-0" key={idx}>
                    <div className="relative aspect-[3/2.5] sm:aspect-[4/3.5] lg:aspect-[16/11] w-full overflow-hidden max-w-[95%] sm:max-w-none mx-auto sm:mx-0">
                      <div className={`absolute inset-0 ${idx === 2 ? 'scale-[1.0]' : ''}`}>
                        <Image
                          src={src}
                          alt={`Foto ${idx + 1} do serviço de café para eventos`}
                          fill
                          className={`object-cover select-none transition-transform ${
                            idx === 0 
                              ? 'object-[50%_70%]' 
                              : idx === 1 
                              ? 'object-[50%_55%]' 
                              : idx === 2
                              ? 'object-[50%_57.5%]'
                              : idx === 3
                              ? 'object-[50%_70%]'
                              : ''
                          }`}
                          sizes="(min-width:1536px) 720px, (min-width:1280px) 640px, (min-width:1024px) 560px, (min-width:768px) 50vw, 100vw"
                          priority={idx === 0}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controles responsivos */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-1.5 sm:px-2 md:px-3 pointer-events-none">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-xl sm:text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
                aria-label="Imagem anterior"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-full bg-coffee-700/90 hover:bg-coffee-500 text-cream-50 text-xl sm:text-2xl ring-1 ring-cream-50/20 transition-colors shadow-lg pointer-events-auto"
                aria-label="Próxima imagem"
              >
                ›
              </button>
            </div>
          </div>

          {/* Texto + Cards compactos com gaps progressivos */}
          <div className="self-start flex flex-col gap-2.5 sm:gap-3 md:gap-4 lg:gap-5 w-full min-w-0">
            {/* Texto em caixa sutil com clamp */}
            <div className="rounded-2xl ring-1 ring-cream-50/15 bg-coffee-card p-2 sm:p-3 md:p-4 lg:p-5 shadow-2xl w-full min-w-0">
              <p className="text-cream-50 text-xs sm:text-[clamp(0.875rem,0.3vw+0.85rem,1rem)] leading-relaxed text-justify indent-5 sm:indent-2 md:indent-3 lg:indent-6 hyphens-none break-words">
                Transforme o café do seu evento em uma <span className="text-coffee-500 font-bold">experiência inesquecível</span> com a <span className="text-coffee-500 font-bold">Estação do Grão</span>! Oferecemos estação de <span className="text-coffee-500 font-bold">café gourmet</span>, <span className="text-coffee-500 font-bold">baristas profissionais</span> e <span className="text-coffee-500 font-bold">café espresso premium</span> para eventos corporativos, feiras de negócios, congressos, ativações de marca, lançamentos de produtos e casamentos.
              </p>
            </div>

            {/* Cards COMPACTOS empilhados */}
            <FeatureItemCompact icon={<Coffee className="w-4 h-4 sm:w-5 sm:h-5" />} title="Atendemos alto fluxo de pessoas" />
            <FeatureItemCompact icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />} title="Personalização com sua Marca" />
            <FeatureItemCompact icon={<Store className="w-4 h-4 sm:w-5 sm:h-5" />} title="Perfeito para feiras, congressos, eventos corporativos e sociais" />
          </div>
        </div>

        {/* Grid de Métricas */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-4 lg:gap-5 mt-6 sm:mt-8 lg:mt-10 w-full min-w-0 laydesk3-hero-metrics">
          {/* Card 1 */}
          <div className="p-2 sm:p-3 md:p-4 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-1.5 sm:gap-2">
            <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500 whitespace-nowrap">
              + 100 mil
            </div>
            <div className="text-[0.6rem] sm:text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-base">☕</span>
              <span className="leading-tight">cafés servidos</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-2 sm:p-3 md:p-4 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-1.5 sm:gap-2">
            <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500 whitespace-nowrap">
              +100
            </div>
            <div className="text-[0.6rem] sm:text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-base">🏢</span>
              <span className="leading-tight">empresas atendidas</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-2 sm:p-3 md:p-4 bg-coffee-card border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-1.5 sm:gap-2">
            <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-coffee-500 whitespace-nowrap">
              + 2 mil
            </div>
            <div className="text-[0.6rem] sm:text-base md:text-lg font-semibold text-cream-50 font-serif uppercase tracking-wider flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-base">🤝</span>
              <span className="leading-tight">eventos realizados</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

