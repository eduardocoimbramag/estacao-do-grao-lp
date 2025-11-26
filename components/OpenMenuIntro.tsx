'use client';
import { useEffect, useRef, useState } from 'react';

export default function OpenMenuIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Auto play/pause conforme visibilidade (performance)
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()));
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sincronizar volume com elemento de vídeo
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    
    el.volume = 0.65; // 65% fixo
    el.muted = muted;
  }, [muted]);

  return (
    <section id="apresentacao" className="bg-coffee-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-[1fr_1px_1fr] items-start">
        {/* ESQUERDA — TEXTO */}
        <div>
          <h2 className="text-3xl md:text-4xl font-montserrat tracking-tight whitespace-nowrap">
            O que é a Estação do Grão?
          </h2>

          <div className="mt-5 space-y-4">
            <p className="text-center text-xl md:text-2xl text-coffee-500 font-semibold leading-relaxed whitespace-nowrap font-montserrat">
              O café do seu evento precisa ser inesquecível.
            </p>
            <p className="text-cream-50/90 leading-relaxed text-justify hyphens-none font-montserrat">
              A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
            </p>
          </div>

          <ul className="mt-6 space-y-2">
            {[
              'Coffee station completa (espresso, cappuccino, latte, gelados)',
              'Branding com café: copos e estação personalizados',
              'Equipe de baristas profissionais e operação ágil',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-coffee-500 flex-shrink-0" />
                <span className="text-cream-50/90 font-montserrat">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a 
              href="#servicos" 
              className="px-5 py-3 rounded-xl border border-coffee-500 text-cream-50 hover:bg-coffee-700/30 transition-colors font-montserrat"
            >
              Ver serviços
            </a>
            <a 
              href="#contato" 
              className="px-5 py-3 rounded-xl bg-coffee-500 text-coffee-900 font-semibold hover:bg-coffee-700 hover:text-white transition-colors font-montserrat"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>

        {/* "DOBRA" — SPINE VISUAL */}
        <div 
          aria-hidden="true" 
          className="hidden md:block h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full" 
        />

        {/* DIREITA — VÍDEO */}
        <div className="relative w-full">
          <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl border border-coffee-700 bg-black/40">
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              poster="/img/poster-estacao.webp"
              playsInline
              muted={muted}
              loop
              preload="auto"
              autoPlay
              onLoadedData={() => {
                setVideoLoaded(true);
                setHasError(false);
              }}
              onError={(e) => {
                console.error('Erro ao carregar vídeo:', e);
                setHasError(true);
              }}
              style={{ display: hasError ? 'none' : 'block' }}
            >
              <source src="/videos/estacao.mp4" type="video/mp4" />
              <source src="/videos/estacao.webm" type="video/webm" />
              Seu navegador não suporta vídeo HTML5.
            </video>

            {hasError && (
              <div className="h-full w-full flex items-center justify-center bg-coffee-900/60 backdrop-blur">
                <div className="text-center px-6">
                  <div className="text-5xl mb-4">☕</div>
                  <p className="text-cream-50/70 text-sm">
                    Erro ao carregar vídeo
                  </p>
                  <p className="text-cream-50/50 text-xs mt-2">
                    Verifique se estacao.mp4 está em /public/videos/
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Controle de som simples */}
          {!hasError && (
            <button
              onClick={() => setMuted(!muted)}
              className="absolute bottom-3 left-3 rounded-full bg-black/55 backdrop-blur px-4 py-2 text-sm border border-white/20 hover:bg-black/70 transition-colors flex items-center gap-2"
              aria-pressed={!muted}
              aria-label={muted ? 'Ativar som' : 'Desativar som'}
            >
              <span className="text-base">{muted ? '🔇' : '🔊'}</span>
              <span className="text-cream-50 font-medium font-montserrat">
                {muted ? 'Som desativado' : 'Som ativado'}
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

