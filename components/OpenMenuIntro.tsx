'use client';
import { useEffect, useRef, useState } from 'react';

export default function OpenMenuIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoRefMobile = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasErrorMobile, setHasErrorMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Auto play/pause conforme visibilidade (performance) - Desktop
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

  // Auto play/pause conforme visibilidade (performance) - Mobile
  useEffect(() => {
    const el = videoRefMobile.current;
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

  // Sincronizar volume com elemento de vídeo - Desktop
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    
    el.volume = 0.65; // 65% fixo
    el.muted = muted;
  }, [muted]);

  // Sincronizar volume com elemento de vídeo - Mobile
  useEffect(() => {
    const el = videoRefMobile.current;
    if (!el) return;
    
    el.volume = 0.65; // 65% fixo
    el.muted = muted;
  }, [muted]);

  return (
    <section
      id="apresentacao"
      className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] py-2 sm:py-4 lg:py-6 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-center sm:justify-center laydesk3-sec2-section"
    >
      <div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-center py-4 sm:py-0 sm:items-start box-border laydesk3-sec2-container">
        {/* CONTEÚDO - Estrutura diferente para mobile e desktop */}
        <div className="order-1 sm:order-1 space-y-2 w-full flex flex-col h-full">
          
          {/* ========== MOBILE: Título e Subtítulo - Topo ========== */}
          <div className="pt-4 sm:hidden">
            <h2 className="!text-[clamp(1.375rem,7vw,1.75rem)] font-montserrat font-bold tracking-tight text-center whitespace-nowrap px-2">
              O que é a Estação do Grão?
            </h2>
            <p className="text-sm text-coffee-500 font-semibold leading-relaxed text-center whitespace-nowrap break-words font-montserrat -mt-1">
              O café do seu evento precisa ser inesquecível.
            </p>
          </div>
          
          {/* ========== DESKTOP: Título ========== */}
          <h2 className="hidden sm:block text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-left whitespace-nowrap m-0 laydesk2-sec2-title laydesk3-sec2-title">
            O que é a Estação do Grão?
          </h2>
          
          {/* ========== DESKTOP: Subtítulo e Parágrafo ========== */}
          <div className="hidden sm:block mt-1 space-y-9 md:space-y-12">
            <p className="text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-center whitespace-nowrap break-words font-montserrat laydesk2-sec2-subtitle laydesk3-sec2-subtitle">
              O café do seu evento precisa ser inesquecível.
            </p>
            <p className="text-base text-cream-50/90 leading-relaxed text-justify hyphens-auto break-words font-montserrat indent-5 laydesk2-sec2-paragraph laydesk3-sec2-paragraph">
              A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
            </p>
          </div>
          
          {/* ========== MOBILE: Restante do Conteúdo - Centralizado ========== */}
          <div className="flex-1 flex flex-col justify-center space-y-2 mt-4 sm:hidden">
            <p className="text-xs text-cream-50/90 leading-relaxed text-justify indent-5 hyphens-none break-words font-montserrat">
              A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
            </p>

            {/* Layout híbrido: Vídeo + Lista lado a lado em mobile */}
            <div className="grid grid-cols-[1.4fr_1fr] gap-2.5 items-center mt-3">
              {/* Vídeo pequeno - apenas em mobile */}
              <div className="relative w-full">
                <div className="aspect-[9/16] max-h-[360px] overflow-hidden rounded-xl border border-coffee-700 bg-black/40 w-full">
                  <video
                    ref={videoRefMobile}
                    className="h-full w-full object-cover"
                    poster="/img/poster-estacao.webp"
                    playsInline
                    muted={muted}
                    loop
                    preload="auto"
                    autoPlay
                    onLoadedData={() => {
                      setVideoLoaded(true);
                      setHasErrorMobile(false);
                    }}
                    onError={(e) => {
                      console.error('Erro ao carregar vídeo:', e);
                      setHasErrorMobile(true);
                    }}
                    style={{ display: hasErrorMobile ? 'none' : 'block' }}
                  >
                    <source src="/videos/estacao.mp4" type="video/mp4" />
                    <source src="/videos/estacao.webm" type="video/webm" />
                    Seu navegador não suporta vídeo HTML5.
                  </video>

                  {hasErrorMobile && (
                    <div className="h-full w-full flex items-center justify-center bg-coffee-900/60 backdrop-blur">
                      <div className="text-center px-4">
                        <div className="text-3xl mb-2">☕</div>
                        <p className="text-cream-50/70 text-xs">
                          Erro ao carregar vídeo
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Controle de som simples - mobile */}
                  {!hasErrorMobile && (
                    <button
                      onClick={() => setMuted(!muted)}
                      className="absolute bottom-2 left-2 rounded-full bg-black/55 backdrop-blur px-2 py-1 text-xs border border-white/20 hover:bg-black/70 transition-colors flex items-center gap-1"
                      aria-pressed={!muted}
                      aria-label={muted ? 'Ativar som' : 'Desativar som'}
                    >
                      <span className="text-sm">{muted ? '🔇' : '🔊'}</span>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Lista mobile */}
              <ul className="space-y-5">
                {[
                  'Coffee station completa (espresso, cappuccino, latte, gelados)',
                  'Branding com café: copos e estação personalizados',
                  'Equipe de baristas profissionais e operação ágil',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-1.5">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-coffee-500 flex-shrink-0" />
                    <span className="text-[0.8125rem] text-cream-50/90 font-montserrat leading-tight">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botões mobile */}
            <div className="flex justify-between items-center gap-2 mt-4 w-full max-w-full">
              <a 
                href="#servicos" 
                className="flex-1 px-4 py-2.5 rounded-xl border border-coffee-500 text-cream-50 hover:bg-coffee-700/30 transition-colors font-montserrat text-center text-sm"
              >
                Ver serviços
              </a>
              <a 
                href="#contato" 
                className="flex-1 px-4 py-2.5 rounded-xl bg-coffee-500 text-coffee-900 font-semibold hover:bg-coffee-700 hover:text-white transition-colors font-montserrat text-center text-sm"
              >
                Solicitar orçamento
              </a>
            </div>
          </div>
          
          {/* ========== DESKTOP: Lista ========== */}
          <ul className="hidden sm:block space-y-1.5 mt-9 md:mt-12">
            {[
              'Coffee station completa (espresso, cappuccino, latte, gelados)',
              'Branding com café: copos e estação personalizados',
              'Equipe de baristas profissionais e operação ágil',
            ].map((t) => (
              <li key={t} className="flex items-start gap-1.5">
                <span className="mt-2 h-2 w-2 rounded-full bg-coffee-500 flex-shrink-0" />
                <span className="text-base text-cream-50/90 font-montserrat leading-tight">{t}</span>
              </li>
            ))}
          </ul>
          
          {/* ========== DESKTOP: Botões ========== */}
          <div className="hidden sm:flex justify-center items-center gap-2.5 mt-9 md:mt-12 w-full max-w-full">
            <a 
              href="#servicos" 
              className="flex-none px-4 py-2.5 rounded-xl border border-coffee-500 text-cream-50 hover:bg-coffee-700/30 transition-colors font-montserrat text-center text-base"
            >
              Ver serviços
            </a>
            <a 
              href="#contato" 
              className="flex-none px-4 py-2.5 rounded-xl bg-coffee-500 text-coffee-900 font-semibold hover:bg-coffee-700 hover:text-white transition-colors font-montserrat text-center text-base"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>

        {/* "DOBRA" — SPINE VISUAL */}
        <div 
          aria-hidden="true" 
          className="hidden md:block h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full order-2 laydesk2-sec2-divider laydesk3-sec2-divider" 
        />

        {/* DIREITA — VÍDEO (Desktop) */}
        <div className="hidden sm:block relative w-full min-w-0 order-3 laydesk2-sec2-video-column laydesk3-sec2-video-column">
          <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-black/40 w-full max-w-full laydesk2-sec2-video-container laydesk3-sec2-video-container">
            <video
              ref={videoRef}
              className="h-full w-full object-contain laydesk2-sec2-video laydesk3-sec2-video"
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

            {/* Controle de som simples - dentro do container do vídeo */}
            {!hasError && (
              <button
                onClick={() => setMuted(!muted)}
                className="absolute bottom-3 left-3 rounded-full bg-black/55 backdrop-blur px-4 py-2 text-sm border border-white/20 hover:bg-black/70 transition-colors flex items-center gap-2 laydesk2-sec2-sound-button laydesk3-sec2-sound-button"
                aria-pressed={!muted}
                aria-label={muted ? 'Ativar som' : 'Desativar som'}
              >
                <span className="text-base laydesk2-sec2-sound-icon laydesk3-sec2-sound-icon">{muted ? '🔇' : '🔊'}</span>
                <span className="text-cream-50 font-medium font-montserrat laydesk2-sec2-sound-text laydesk3-sec2-sound-text">
                  {muted ? 'Som desativado' : 'Som ativado'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

