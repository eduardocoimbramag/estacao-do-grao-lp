# Frontend (UI/UX) — guia rápido e mapa dos componentes

## Visão geral do frontend

O frontend é uma **one-page landing** (App Router) com seções independentes em `components/` e composição em `app/page.tsx`.

Padrões fortes do projeto:
- **Mobile-first** (classes base = mobile; `sm:`/`lg:` ajustam desktop)
- UI premium com **paleta coffee** e tipografia com **Montserrat** (classe `.font-montserrat`)
- Componentes base em `components/ui/*` (Radix/shadcn)

---

## Onde as coisas vivem

### Páginas e layout
- `app/layout.tsx`
  - metadata + JSON-LD
  - fonts via `next/font/google` (Montserrat e Inter)
- `app/page.tsx`
  - ordem das seções (Hero → Apresentação → Serviços → … → Contato)
- `app/globals.css`
  - Tailwind v4, tokens do tema, correções de overflow no mobile

---

## Seções principais (componentes)

### 1) Hero
Arquivo: `components/hero/Hero.tsx`

O que faz:
- H1 com clamp responsivo (mobile quebra linha; desktop tende a ficar em uma linha)
- Slideshow (Embla Carousel) com autoplay, pausa ao interagir e controles
- Cards compactos (`FeatureItemCompact`)
- Métricas abaixo do hero

Pontos comuns de ajuste:
- texto do H1
- imagens do slideshow (array default)
- copy do parágrafo principal

### 2) Apresentação (seção do vídeo)
Arquivo: `components/OpenMenuIntro.tsx`

O que faz:
- seção “O que é a Estação do Grão?”
- vídeo desktop e vídeo mobile separados (`videoRef` e `videoRefMobile`)
- autoplay/pause via `IntersectionObserver` (performance)
- controle de som (mute/unmute)
- fallback visual se vídeo falhar

Assets esperados:
- `public/videos/estacao.mp4` (principal)
- `public/videos/estacao.webm` (opcional)
- `public/img/poster-estacao.webp` (poster)

### 3) Serviços (carrossel)
Arquivos:
- `components/sections/services-carousel.tsx`
- `lib/data/services-carousel-cards.ts`

O que faz:
- exibe cards em carrossel na seção `#nossos-servicos`

### 4) Audience
Arquivo: `components/audience.tsx`

O que faz:
- seção de regiões atendidas e cards informativos

### 5) FlipCard
Arquivo: `components/flipcard.tsx`

O que faz:
- desktop/tablet: flip 3D com dois lados
- mobile: fallback “sem 3D” com switch simples entre listas

### 6) Contato (formulário)
Arquivo: `components/contact.tsx`

O que faz:
- blocos “Entre em Contato” + formulário
- validação de campos obrigatórios
- envio para Google Apps Script
- anti-spam/UX (detalhes no `docs/02-FORM-ANTISPAM.md`)

---

## Componentes UI (base)

Pasta: `components/ui/*`

São componentes “building blocks” usados pelas seções:
- `button`, `input`, `textarea`, `checkbox`, `radio-group`, `toast`, etc.

Configuração shadcn:
- `components.json` aponta o CSS em `app/globals.css`
- aliases (`@/components`, `@/hooks`, `@/lib`, etc.)

---

## Responsividade e boas práticas já aplicadas

- Evita overflow horizontal com regras em `app/globals.css`
- Uso de `max-w-[100vw]` e `overflow-x-hidden` em várias seções
- Preferência por `clamp()` para tipografia responsiva

---

## Checklist rápido para mexer em UI sem quebrar desktop

- Sempre que mudar layout/spacing no mobile, use:
  - base (mobile) + `lg:*` para preservar desktop
- Para inverter ordem só no mobile, usar `order-*` com `lg:order-*`
- Ao mexer em tipografia, prefira:
  - `text-xs sm:text-*` ou `!text-[clamp(...)]` com variação por breakpoint


