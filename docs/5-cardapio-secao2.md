# 5-cardapio-secao2

> Seção "cardápio aberto": **texto à esquerda** (apresentação da empresa) e **vídeo à direita**.  
> Stack: **Next.js (App Router) + TypeScript + Tailwind**.  
> Paleta: coffee-900 (`#331B09`), coffee-700 (`#573819`), coffee-500 (`#A7834C`), cream-50 (`#EFF0E0`).

---

## ✅ Implementação Concluída

### Arquivos Criados/Modificados

1. **`/components/OpenMenuIntro.tsx`** ✅
   - Componente React com texto à esquerda e vídeo à direita
   - Intersection Observer para auto play/pause (otimização de performance)
   - Controle de som com acessibilidade (aria-pressed, aria-label)
   - Responsive: stacking em mobile, grid em desktop

2. **`/app/page.tsx`** ✅
   - Importado e adicionado `<OpenMenuIntro />` após o Hero

3. **Pastas criadas**:
   - `/public/videos/` - para armazenar os vídeos
   - `/public/img/` - para armazenar o poster

---

## 📋 Próximos Passos (Assets)

### 1. Vídeo

Você precisa adicionar os arquivos de vídeo em `/public/videos/`:

- **`estacao.mp4`** (requerido) - formato H.264/AAC, compatível com todos os navegadores
- **`estacao.webm`** (opcional) - formato WebM, melhor compressão para navegadores modernos

**Especificações recomendadas:**
- Resolução: 1920x1080 (Full HD)
- Duração: 8-15 segundos
- Frame rate: 30fps
- Bitrate: 3-5 Mbps
- Áudio: opcional (componente tem controle de mute)

**Como exportar:**
```bash
# Usando ffmpeg para converter/otimizar
ffmpeg -i seu-video-original.mov -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k -movflags +faststart public/videos/estacao.mp4

# WebM (opcional, melhor compressão)
ffmpeg -i seu-video-original.mov -c:v libvpx-vp9 -crf 30 -b:v 0 public/videos/estacao.webm
```

### 2. Poster (Thumbnail do Vídeo)

Crie um poster em `/public/img/poster-estacao.webp`:

- **Nome sugerido (SEO)**: `poster-estacao-cafe-eventos-recife.webp`
- Extraia um frame do vídeo (recomendado: 4-6 segundos)
- Formato: WebP para melhor compressão
- Resolução: 1920x1080
- Qualidade: 80-85%

**Como extrair poster do vídeo:**
```bash
# Extrair frame aos 5 segundos
ffmpeg -i public/videos/estacao.mp4 -ss 00:00:05 -vframes 1 -q:v 2 public/img/poster-estacao.webp
```

---

## 🎨 Design & Funcionalidades

### Layout
- **Desktop (md+)**: Grid de 3 colunas `[1fr_1px_1fr]`
  - Coluna 1: Texto e CTAs
  - Coluna 2: Linha divisória vertical (spine visual)
  - Coluna 3: Vídeo com controles

- **Mobile**: Stack vertical (texto em cima, vídeo embaixo)

### Interatividade
- ✅ Auto play/pause baseado em visibilidade (Intersection Observer)
- ✅ Botão de mute/unmute com emojis e aria-labels
- ✅ Vídeo em loop
- ✅ Fallback para navegadores sem suporte a vídeo HTML5
- ✅ `preload="metadata"` para otimização de carregamento

### Acessibilidade
- ✅ Contraste AA (fundo coffee-900, texto branco/cream-50)
- ✅ `aria-pressed` no botão de som
- ✅ `aria-label` com descrição clara
- ✅ `aria-hidden="true"` na linha decorativa
- ✅ Texto alternativo para `<video>`

### SEO
- ✅ H2 com palavras-chave "estação de café para eventos"
- ✅ Texto com localidades (Recife, João Pessoa)
- ✅ Estrutura semântica HTML5 (`<section>`, `<h2>`, `<ul>`)
- ✅ Links internos para `#servicos` e `#contato`

---

## 🔍 SEO Avançado (Opcional)

### JSON-LD para VideoObject

Adicione no `<head>` da página (em `app/layout.tsx` ou usando `next/script`):

```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Estação de café para eventos – Estação do Grão",
  "description": "Cafeteria itinerante com baristas e personalização de marca para eventos em Recife e João Pessoa.",
  "thumbnailUrl": ["/img/poster-estacao.webp"],
  "uploadDate": "2025-01-01",
  "contentUrl": "/videos/estacao.mp4",
  "duration": "PT15S"
}
</script>
```

---

## 🧪 Checklist de Teste

- [ ] **Vídeo carrega corretamente** em Chrome, Firefox, Safari
- [ ] **Auto play funciona** (muted por padrão)
- [ ] **Botão de som funciona** (toggle mute/unmute)
- [ ] **Vídeo pausa quando fora da viewport** (economiza recursos)
- [ ] **Poster aparece enquanto vídeo carrega**
- [ ] **Responsivo**: layout stacking em mobile
- [ ] **Links funcionam**: `#servicos` e `#contato` navegam corretamente
- [ ] **Lighthouse Score**:
  - Performance: 90+
  - Accessibility: 100
  - Best Practices: 95+
  - SEO: 100

---

## 🎯 Variações Opcionais

### Variante "Sticky Text"

Para deixar o texto fixo enquanto o vídeo rola:

```tsx
<div className="md:sticky md:top-24">
  {/* conteúdo de texto */}
</div>
```

### Múltiplos Vídeos com Waypoints

Trocar o vídeo conforme o scroll usando `IntersectionObserver`:

```tsx
const videos = [
  { src: '/videos/intro.mp4', poster: '/img/poster-1.webp' },
  { src: '/videos/setup.mp4', poster: '/img/poster-2.webp' },
  { src: '/videos/service.mp4', poster: '/img/poster-3.webp' },
];
```

---

## 📊 Core Web Vitals

### LCP (Largest Contentful Paint)
- ✅ Poster em WebP otimizado
- ✅ `preload="metadata"` no vídeo
- ✅ Vídeo não bloqueia renderização inicial

### CLS (Cumulative Layout Shift)
- ✅ `aspect-video` reserva espaço para o vídeo
- ✅ Sem mudanças de layout após carregamento

### FID (First Input Delay)
- ✅ Intersection Observer não bloqueia thread principal
- ✅ Lazy loading do vídeo

---

## 🚀 Deploy

1. Adicione os assets (`estacao.mp4`, `estacao.webm`, `poster-estacao.webp`)
2. Commit e push para o repositório
3. Deploy no Vercel (detecta automaticamente Next.js)
4. Teste em produção
5. Monitore no Google Search Console e Analytics

---

## 📝 Notas Finais

- **Cores já configuradas** no `app/globals.css` (coffee-900, coffee-700, coffee-500, cream-50)
- **Fontes**: Playfair Display (serif) para títulos, Inter (sans-serif) para texto
- **ID da seção**: `id="sobre"` (conflita com componente `About` existente)
  - **Sugestão**: Renomeie um dos IDs ou mescle os componentes

### Possível Conflito de ID

O componente `OpenMenuIntro` e o componente `About` ambos usam `id="sobre"`. Você tem 3 opções:

1. **Remover o componente `About` antigo** (manter apenas `OpenMenuIntro`)
2. **Mudar o ID do `OpenMenuIntro`** para `id="apresentacao"` ou similar
3. **Mudar o ID do `About`** para `id="sobre-resumo"` ou similar

**Recomendação**: Como `OpenMenuIntro` é mais completo, considere remover o `<About />` do `page.tsx` ou usar um como seção principal e outro como complemento.

---

**Implementado por**: AI Assistant  
**Data**: 14/11/2025  
**Status**: ✅ Código pronto | ⏳ Assets pendentes

