'use client';
import { useEffect, useRef, useState } from 'react';

export default function OpenMenuIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  return (
    <section id="apresentacao" className="bg-coffee-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-[1fr_1px_1fr] items-start">
        {/* ESQUERDA — TEXTO */}
        <div>
          <h2 className="text-3xl md:text-4xl font-serif tracking-tight">
            O que é a Estação do Grão – estação de café para eventos
          </h2>

          <p className="mt-5 text-cream-50/90 leading-relaxed">
            A <strong>Estação do Grão</strong> é uma <strong>estação de café para eventos</strong> que combina
            {' '}<strong>café gourmet</strong>, <strong>baristas profissionais</strong> e <strong>personalização de marca</strong> para experiências memoráveis em
            {' '}<strong>Recife</strong> e <strong>João Pessoa</strong>. Operamos com máquinas de <strong>espresso</strong> profissionais, cardápio autoral (quentes e gelados)
            e estrutura móvel — ideal para <strong>eventos corporativos</strong>, feiras, stands, congressos e casamentos.
          </p>

          <ul className="mt-6 space-y-2">
            {[
              'Coffee station completa (espresso, cappuccino, latte, gelados)',
              'Branding com café: copos e estação personalizados',
              'Equipe de baristas profissionais e operação ágil',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="mt-2 h-2 w-2 rounded-full bg-coffee-500 flex-shrink-0" />
                <span className="text-cream-50/90">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a 
              href="#servicos" 
              className="px-5 py-3 rounded-xl border border-coffee-500 text-cream-50 hover:bg-coffee-700/30 transition-colors"
            >
              Ver serviços
            </a>
            <a 
              href="#contato" 
              className="px-5 py-3 rounded-xl bg-coffee-500 text-coffee-900 font-semibold hover:bg-coffee-700 hover:text-white transition-colors"
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
        <div className="relative">
          <div className="aspect-video overflow-hidden rounded-2xl border border-coffee-700 bg-black/40">
            {hasError ? (
              <div className="h-full w-full flex items-center justify-center bg-coffee-900/60 backdrop-blur">
                <div className="text-center px-6">
                  <div className="text-5xl mb-4">☕</div>
                  <p className="text-cream-50/70 text-sm">
                    Vídeo em breve
                  </p>
                  <p className="text-cream-50/50 text-xs mt-2">
                    Adicione estacao.mp4 em /public/videos/
                  </p>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                poster="/img/poster-estacao.webp"
                playsInline
                muted={muted}
                loop
                preload="metadata"
                autoPlay
                onError={() => setHasError(true)}
              >
                <source src="/videos/estacao.webm" type="video/webm" />
                <source src="/videos/estacao.mp4" type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>
            )}
          </div>

          {/* Controle de som */}
          {!hasError && (
            <button
              onClick={() => setMuted((m) => !m)}
              className="absolute bottom-3 left-3 rounded-full bg-black/55 backdrop-blur px-3 py-1 text-sm border border-white/20 hover:bg-black/70 transition-colors"
              aria-pressed={!muted}
              aria-label={muted ? 'Ativar som do vídeo' : 'Silenciar vídeo'}
            >
              {muted ? '🔇 Ativar som' : '🔊 Silenciar'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

