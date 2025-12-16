# Overview do Projeto — Estação do Grão Landing Page

## Visão geral

Este repositório contém a landing page da **Estação do Grão**, construída em **Next.js (App Router)** com foco em:

- SEO (metadata + JSON-LD)
- UI premium (tema “coffee”)
- Layout responsivo (mobile-first)
- Formulário de orçamento integrado a **Google Apps Script + Google Sheets**
- Proteções anti-spam (rate-limit 24h + IP)

---

## Stack e principais bibliotecas

### Framework / Runtime
- **Next.js**: 16.0.0 (App Router)
- **React**: 19.2.0
- **TypeScript**: habilitado
- **Package manager**: `pnpm`

### UI / Estilo
- **Tailwind CSS v4** via `@import "tailwindcss";` em `app/globals.css`
- **Radix UI** + componentes (estilo shadcn) em `components/ui/*`
- **lucide-react** (ícones)
- **next-themes** (ThemeProvider)

---

## Como rodar o projeto

### Desenvolvimento

```bash
pnpm dev
```

Acesse: `http://localhost:3000`

### Build / Produção

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

---

## Estrutura de pastas (alto nível)

```
app/
  layout.tsx        # metadata, JSON-LD, fonts, <html>/<body>
  page.tsx          # composição da landing (ordem das seções)
  globals.css       # Tailwind v4 + tokens do tema + correções mobile

components/
  hero/Hero.tsx
  OpenMenuIntro.tsx
  sections/services-carousel.tsx
  audience.tsx
  flipcard.tsx
  contact.tsx
  footer.tsx
  ui/*              # componentes base (radix/shadcn)

hooks/
  useIPDetection.ts # detecta IP via ipify

utils/
  formRateLimit.ts  # rate-limit local 24h via localStorage

docs/
  scriptdogoogle.md # Google Apps Script (backend do formulário)

public/
  videos/estacao.mp4 (opcional)
  img/poster-estacao.webp (opcional)
  og/estacao-do-grao.jpg
```

---

## Composição da Home (one-page)

Arquivo: `app/page.tsx`

Ordem (topo → rodapé):
- `Header`
- `Hero`
- `OpenMenuIntro` (seção de apresentação com vídeo)
- Section `#nossos-servicos` (carrossel)
- `Audience`
- `FlipCard`
- `Contact` (formulário)
- `Footer`

---

## SEO e metadata

Arquivo: `app/layout.tsx`

Inclui:
- `metadata` (title/description/openGraph/twitter/icons)
- `metadataBase` em `https://estacaodograo.com.br`
- JSON-LD:
  - `ProfessionalService`
  - `FAQPage`

---

## Tema “coffee” e tokens

Arquivo: `app/globals.css`

O projeto define cores/variáveis com `@theme inline`, por exemplo:
- `--color-coffee-900`, `--color-coffee-700`, `--color-coffee-500`
- `--color-cream-50`

Também existe uma correção “agressiva” para mobile contra overflow horizontal (max-width 100vw).

---

## Atenções / “gotchas” importantes

### 1) Build não bloqueia TypeScript

Em `next.config.mjs` existe:
- `typescript.ignoreBuildErrors: true`

Isso significa que o build pode passar mesmo com erro de TS (útil em prototipação, perigoso em produção).  
Recomendação: manter o `pnpm lint` e, idealmente, remover esse ignore em uma fase de hardening.

### 2) Imagens sem otimização do Next

Em `next.config.mjs` existe:
- `images.unoptimized: true`

Isso evita otimização do Next Image (útil em alguns deploys estáticos), mas pode impactar performance.

---

## Onde editar (atalhos)

- **Ordem/adição de seções**: `app/page.tsx`
- **SEO/metadata/JSON-LD**: `app/layout.tsx`
- **Tema e cores**: `app/globals.css`
- **Hero**: `components/hero/Hero.tsx`
- **Seção vídeo**: `components/OpenMenuIntro.tsx`
- **Formulário + anti-spam UX**: `components/contact.tsx` + `utils/formRateLimit.ts` + `hooks/useIPDetection.ts`


