'use client';
import { useEffect, useRef, useState } from 'react';

export default function OpenMenuIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [volume, setVolume] = useState(0.5); // 50% padrão
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
    
    el.volume = volume;
    el.muted = muted || volume === 0;
  }, [volume, muted]);

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

          {/* Controles de volume */}
          {!hasError && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-full bg-black/55 backdrop-blur px-3 py-2 border border-white/20">
              {/* Botão Mute/Unmute */}
              <button
                onClick={() => {
                  if (muted || volume === 0) {
                    setVolume(0.5); // Ativa em 50%
                    setMuted(false);
                  } else {
                    setVolume(0); // Muta
                    setMuted(true);
                  }
                }}
                className="flex-shrink-0 text-cream-50 hover:text-white transition-colors"
                aria-pressed={muted || volume === 0}
                aria-label={muted || volume === 0 ? 'Ativar som' : 'Silenciar'}
              >
                {(muted || volume === 0) ? '🔇' : '🔊'}
              </button>

              {/* Slider de Volume */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={muted ? 0 : volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  setMuted(newVolume === 0);
                }}
                className="flex-1 h-1 bg-coffee-700 rounded-lg appearance-none cursor-pointer accent-coffee-500"
                aria-label="Controle de volume"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={muted ? 0 : volume * 100}
              />
              
              {/* Indicador de volume */}
              <span className="text-xs text-cream-50/70 flex-shrink-0 min-w-[2.5rem] text-right">
                {Math.round((muted ? 0 : volume) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

