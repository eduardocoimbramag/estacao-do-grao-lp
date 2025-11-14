# 🎬 Setup da Seção de Vídeo - OpenMenuIntro

## ✅ O que já está implementado

- ✅ Componente `OpenMenuIntro.tsx` criado
- ✅ Integrado no `app/page.tsx` (aparece após o Hero)
- ✅ Pastas criadas: `/public/videos/` e `/public/img/`
- ✅ Cores da marca já configuradas no Tailwind
- ✅ Responsive design (mobile + desktop)
- ✅ Auto play/pause com Intersection Observer
- ✅ Controles de áudio acessíveis

## 📦 Assets Necessários

### 1. Vídeo (OBRIGATÓRIO)

Adicione pelo menos um dos formatos em `/public/videos/`:

**Formato MP4** (requerido para compatibilidade):
- Nome: `estacao.mp4`
- Especificações:
  - Resolução: 1920x1080 ou 1280x720
  - Duração: 8-15 segundos (máx 30s)
  - Codec: H.264
  - Bitrate: 3-5 Mbps
  - FPS: 30

**Formato WebM** (opcional, melhor compressão):
- Nome: `estacao.webm`
- Codec: VP9 ou VP8

### 2. Poster/Thumbnail (RECOMENDADO)

Adicione em `/public/img/`:
- Nome: `poster-estacao.webp` (ou `poster-estacao-cafe-eventos-recife.webp` para SEO)
- Resolução: mesma do vídeo (1920x1080)
- Formato: WebP (melhor compressão que JPG/PNG)

---

## 🛠️ Como Preparar os Assets

### Opção 1: Usando ffmpeg (Recomendado)

#### Converter/Otimizar Vídeo para MP4:
```bash
ffmpeg -i seu-video-original.mov \
  -c:v libx264 \
  -preset slow \
  -crf 22 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  public/videos/estacao.mp4
```

#### Criar Versão WebM (Opcional):
```bash
ffmpeg -i public/videos/estacao.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  public/videos/estacao.webm
```

#### Extrair Poster do Vídeo:
```bash
ffmpeg -i public/videos/estacao.mp4 \
  -ss 00:00:05 \
  -vframes 1 \
  -q:v 2 \
  public/img/poster-estacao.webp
```

### Opção 2: Usando Software de Edição

- **Adobe Premiere Pro / DaVinci Resolve**: Exporte como H.264, 1080p, 30fps
- **HandBrake**: Preset "Web > Gmail Large 3 Minutes 720p30"
- **CloudConvert**: Converta online (cloudconvert.com)

### Opção 3: Vídeo de Placeholder (Para Testar)

Se você ainda não tem o vídeo final, pode usar um placeholder:

```bash
# Gerar vídeo de teste (5s, cor sólida)
ffmpeg -f lavfi -i color=c=0x331B09:s=1920x1080:d=5 \
  -f lavfi -i sine=frequency=1000:duration=5 \
  public/videos/estacao.mp4
```

Ou baixe um vídeo de stock gratuito:
- [Pexels Videos](https://www.pexels.com/search/videos/coffee/)
- [Pixabay Videos](https://pixabay.com/videos/search/coffee/)

---

## 🚀 Como Testar

### 1. Instalar Dependências (se necessário)
```bash
pnpm install
```

### 2. Executar em Desenvolvimento
```bash
pnpm dev
```

### 3. Acessar no Navegador
```
http://localhost:3000
```

### 4. Navegar até a Seção
- Role a página para baixo após o Hero
- Você verá a seção "O que é a Estação do Grão – estação de café para eventos"
- Se os assets não foram adicionados ainda, você verá:
  - Poster placeholder (se configurado)
  - Ou tela preta (esperando o vídeo)

---

## 🔍 Troubleshooting

### Problema: Vídeo não aparece

**Causa 1**: Assets não foram adicionados
- ✅ Verifique se `public/videos/estacao.mp4` existe
- ✅ Verifique se `public/img/poster-estacao.webp` existe

**Causa 2**: Caminho incorreto
- O componente busca `/videos/estacao.mp4` (relativo a `/public`)
- Certifique-se de que os arquivos estão em `public/videos/` e não em outra pasta

**Causa 3**: Formato não suportado
- Use MP4 com codec H.264 para máxima compatibilidade
- Evite codecs raros (HEVC, AV1 podem não funcionar em todos os navegadores)

### Problema: Vídeo não dá auto play

**Causa**: Política de autoplay dos navegadores
- ✅ Vídeo deve começar **muted** (já configurado no componente)
- ✅ Use `playsInline` em mobile (já configurado)
- ✅ Interaja com a página antes (alguns browsers bloqueiam autoplay total)

### Problema: Vídeo está muito grande (página lenta)

**Solução**: Otimize o vídeo
- Reduza duração para 8-15s
- Use bitrate de 3-5 Mbps (não mais)
- Considere resolução 720p ao invés de 1080p
- Use formato WebM para melhor compressão

---

## 📐 Especificações Técnicas da Seção

### Layout Desktop (≥768px)
```
┌─────────────────────────────────────────┐
│  [Texto & CTAs]  │  [Vídeo & Controles] │
│  ・H2 Título     │  ・Video Player      │
│  ・Parágrafo     │  ・Botão Mute        │
│  ・Lista (3x)    │                      │
│  ・2 Botões CTA  │                      │
└─────────────────────────────────────────┘
```

### Layout Mobile (<768px)
```
┌─────────────┐
│   Texto     │
│   & CTAs    │
├─────────────┤
│   Vídeo     │
│  & Controle │
└─────────────┘
```

### Cores Utilizadas
- Fundo: `coffee-900` (#331B09)
- Texto: branco e `cream-50` (#EFF0E0)
- Borda: `coffee-700` (#573819)
- CTA: `coffee-500` (#A7834C)

### IDs e Âncoras
- Seção: `id="apresentacao"`
- Links internos: `#servicos`, `#contato`

---

## 📊 Performance & SEO

### Otimizações Implementadas
- ✅ Intersection Observer (auto pause fora da viewport)
- ✅ `preload="metadata"` (carrega só metadados inicialmente)
- ✅ Poster para LCP (Largest Contentful Paint)
- ✅ Aspect ratio fixo (evita CLS - Cumulative Layout Shift)
- ✅ Lazy loading implícito

### SEO
- ✅ H2 com palavra-chave: "estação de café para eventos"
- ✅ Localidades mencionadas: Recife, João Pessoa
- ✅ Links internos para outras seções
- ✅ Texto semântico e estruturado

### Acessibilidade
- ✅ Contraste AA (WCAG 2.1)
- ✅ `aria-pressed` no botão de som
- ✅ `aria-label` descritivo
- ✅ `aria-hidden` em elementos decorativos
- ✅ Texto alternativo no `<video>`

---

## 🎯 Próximos Passos

1. **Adicione os assets** (vídeo + poster)
2. **Teste localmente** (`pnpm dev`)
3. **Revise o texto** (ajuste conforme tom da marca)
4. **Teste em múltiplos dispositivos** (mobile, tablet, desktop)
5. **Teste em múltiplos navegadores** (Chrome, Firefox, Safari)
6. **Execute Lighthouse** no Chrome DevTools
7. **Deploy** para produção (Vercel)

---

## 📝 Checklist Pré-Deploy

- [ ] Vídeo `estacao.mp4` adicionado em `/public/videos/`
- [ ] Poster `poster-estacao.webp` adicionado em `/public/img/`
- [ ] Vídeo otimizado (< 5MB, 8-15s)
- [ ] Poster otimizado (< 500KB)
- [ ] Testado em Chrome, Firefox e Safari
- [ ] Testado em mobile (responsivo)
- [ ] Botão de som funciona corretamente
- [ ] Auto play/pause funciona
- [ ] Links `#servicos` e `#contato` funcionam
- [ ] Lighthouse Score > 90 em todas as categorias
- [ ] Texto revisado e aprovado
- [ ] Deploy realizado e testado em produção

---

## 🆘 Suporte

Se encontrar problemas:

1. **Verifique o console do navegador** (F12 > Console)
2. **Verifique a aba Network** (F12 > Network) para ver se os assets carregam
3. **Valide os paths**: `/videos/estacao.mp4` deve resolver para `public/videos/estacao.mp4`
4. **Teste com vídeo de placeholder** primeiro

---

**Última Atualização**: 14/11/2025  
**Versão**: 1.0  
**Status**: ✅ Código implementado | ⏳ Assets pendentes

