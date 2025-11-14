# 6 — Configuração do player de vídeo (vertical + controle de volume)

## Objetivo
Modificar o player de vídeo da segunda seção (`OpenMenuIntro`) para:
1. **Alterar orientação**: de horizontal (16:9) para **vertical (9:16)**
2. **Adicionar controle de volume**: implementar slider ou botões de volume além do botão mute/unmute atual
3. Manter funcionalidades existentes: auto play/pause, loop, acessibilidade, responsividade

---

## Alvo (trechos de referência)

**Container do vídeo (atual — horizontal):**
```tsx
<div className="relative">
  <div className="aspect-video overflow-hidden rounded-2xl border border-coffee-700 bg-black/40">
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
```

**Estado atual (linhas 5-7):**
```tsx
const videoRef = useRef<HTMLVideoElement>(null);
const [muted, setMuted] = useState(true);
const [hasError, setHasError] = useState(false);
```

---

## Mudanças necessárias

### 1) Orientação do vídeo (horizontal → vertical)

**Alteração na classe `aspect-video`:**

**Antes:**
```tsx
<div className="aspect-video overflow-hidden ...">
```
- `aspect-video` = `aspect-ratio: 16 / 9` (horizontal)

**Depois:**
```tsx
<div className="aspect-[9/16] overflow-hidden ...">
```
- `aspect-[9/16]` = proporção vertical (ex.: 1080x1920)

**Alternativa (se preferir usar token Tailwind):**
Adicionar no `@theme`:
```css
@theme {
  --aspect-vertical: 9 / 16;
}
```
Uso: `aspect-vertical` (requer criação do token)

> Recomendação: usar `aspect-[9/16]` diretamente (mais simples e sem necessidade de token).

---

### 2) Controle de volume (adicionar)

**Opção A: Slider de volume (recomendado)**

Adicionar estado para volume:
```tsx
const [volume, setVolume] = useState(0.5); // 0.0 a 1.0 (50% padrão)
```

Atualizar efeito para sincronizar volume:
```tsx
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.volume = volume;
    // Se volume > 0, desmutar; se volume = 0, mutar
    videoRef.current.muted = volume === 0;
    setMuted(volume === 0);
  }
}, [volume]);
```

Componente de controle (slider):
```tsx
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
      className="flex-shrink-0"
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
    
    {/* Indicador de volume (opcional) */}
    <span className="text-xs text-cream-50/70 flex-shrink-0 min-w-[2.5rem] text-right">
      {Math.round((muted ? 0 : volume) * 100)}%
    </span>
  </div>
)}
```

**Opção B: Botões incrementais (alternativa)**

Componente com botões +/-:
```tsx
{!hasError && (
  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/55 backdrop-blur px-3 py-2 border border-white/20">
    <button
      onClick={() => {
        const newVolume = Math.max(0, volume - 0.1);
        setVolume(newVolume);
        setMuted(newVolume === 0);
      }}
      className="text-cream-50 hover:text-white"
      aria-label="Diminuir volume"
    >
      ➖
    </button>
    
    <button
      onClick={() => {
        if (muted || volume === 0) {
          setVolume(0.5);
          setMuted(false);
        } else {
          setVolume(0);
          setMuted(true);
        }
      }}
      className="text-cream-50 hover:text-white"
      aria-label={muted || volume === 0 ? 'Ativar som' : 'Silenciar'}
    >
      {(muted || volume === 0) ? '🔇' : '🔊'}
    </button>
    
    <button
      onClick={() => {
        const newVolume = Math.min(1, volume + 0.1);
        setVolume(newVolume);
        setMuted(false);
      }}
      className="text-cream-50 hover:text-white"
      aria-label="Aumentar volume"
    >
      ➕
    </button>
    
    <span className="text-xs text-cream-50/70 min-w-[2.5rem] text-right">
      {Math.round((muted ? 0 : volume) * 100)}%
    </span>
  </div>
)}
```

> Recomendação: **Opção A (slider)** oferece controle mais preciso e UX moderna.

---

### 3) Ajustes de layout (vertical)

**Container responsivo:**

**Desktop (mantém grid lado a lado):**
```tsx
<div className="mx-auto max-w-6xl px-6 py-16 grid gap-10 md:grid-cols-[1fr_1px_1fr] items-start">
```

**Mobile (stack mantido):**
O componente já faz stacking em mobile, mas garantir que o vídeo vertical não ocupe altura excessiva:
```tsx
<div className="relative w-full max-h-[60vh] md:max-h-none">
  <div className="aspect-[9/16] overflow-hidden rounded-2xl border border-coffee-700 bg-black/40">
    ...
  </div>
</div>
```

> Nota: `max-h-[60vh]` em mobile evita que vídeo vertical ocupe toda a tela.

---

## Estratégias para implementação

### 1) (Recomendado) Implementação completa com slider

**Passos:**
1. Adicionar estado `volume` (0.0 a 1.0)
2. Trocar `aspect-video` por `aspect-[9/16]`
3. Adicionar `useEffect` para sincronizar `volume` com elemento `<video>`
4. Substituir botão mute simples por controle completo (botão mute + slider)
5. Ajustar posicionamento dos controles (considerar vídeo vertical)
6. Adicionar `max-h-[60vh]` no mobile

**Vantagens:**
- Controle preciso de volume
- UX moderna (slider)
- Mantém acessibilidade
- Responsivo

**Desvantagens:**
- Mais código (ainda assim simples)

---

### 2) (Alternativa) Botões incrementais

**Passos:**
1. Adicionar estado `volume` (0.0 a 1.0)
2. Trocar `aspect-video` por `aspect-[9/16]`
3. Adicionar `useEffect` para sincronizar `volume`
4. Substituir botão mute por grupo de botões (mute, -, +)
5. Ajustar posicionamento

**Vantagens:**
- Interface mais compacta
- Menos elementos visuais

**Desvantagens:**
- Controle menos preciso
- Requer múltiplos cliques para ajustar volume

---

## Código completo sugerido (estrutura)

**Estados adicionais:**
```tsx
const [volume, setVolume] = useState(0.5); // 50% padrão
const [muted, setMuted] = useState(true); // Mantém estado atual
const [hasError, setHasError] = useState(false); // Mantém estado atual
```

**Efeito para sincronizar volume:**
```tsx
useEffect(() => {
  const el = videoRef.current;
  if (!el) return;
  
  el.volume = volume;
  el.muted = muted || volume === 0;
}, [volume, muted]);
```

**Container do vídeo (vertical):**
```tsx
<div className="relative w-full max-h-[60vh] md:max-h-none">
  <div className="aspect-[9/16] overflow-hidden rounded-2xl border border-coffee-700 bg-black/40">
    {/* vídeo */}
  </div>
  
  {/* Controles de volume (slider) */}
  {!hasError && (
    <div className="absolute bottom-3 left-3 right-3 ...">
      {/* botão mute + slider */}
    </div>
  )}
</div>
```

---

## Notas de responsividade e acessibilidade

### Responsividade
- **Mobile (< 768px)**: Vídeo vertical pode ocupar muita altura → usar `max-h-[60vh]` para limitar
- **Desktop (≥ 768px)**: Grid lado a lado mantido; vídeo vertical fica proporcional ao texto
- **Tablet (768-1024px)**: Testar se altura do vídeo não quebra layout

### Acessibilidade
- **ARIA labels**: Manter em todos os botões e inputs
- **ARIA values**: No slider, usar `aria-valuenow={volume * 100}` (0-100)
- **Keyboard navigation**: Garantir que slider seja navegável via teclado
- **Contraste**: Slider com `accent-coffee-500` garante contraste adequado
- **Screen readers**: Texto "X%" visível ajuda leitores de tela

### Performance
- Sincronização de volume: `useEffect` só executa quando `volume` ou `muted` mudam
- Não afeta auto play/pause (Intersection Observer mantido)
- Slider não bloqueia thread principal (input nativo do navegador)

---

## Guia de aplicação (quando for aplicar)

> **Importante:** Este documento **não aplica** mudanças. É apenas o guia para implementação futura.

### Passo a passo

1. **Adicionar estado de volume:**
   - Na linha ~7, adicionar: `const [volume, setVolume] = useState(0.5);`

2. **Adicionar efeito de sincronização:**
   - Após o `useEffect` do Intersection Observer, adicionar novo `useEffect` para volume

3. **Alterar aspect ratio:**
   - Linha ~76: trocar `aspect-video` por `aspect-[9/16]`

4. **Ajustar container (mobile):**
   - Linha ~75: adicionar `max-h-[60vh] md:max-h-none` no container

5. **Substituir controles:**
   - Linhas ~108-118: substituir botão mute simples por componente completo (botão + slider)

6. **Testar em múltiplos dispositivos:**
   - Mobile (360px, 375px, 414px)
   - Tablet (768px, 1024px)
   - Desktop (1280px, 1920px)

7. **Validar acessibilidade:**
   - Navegação por teclado
   - Screen reader (NVDA/JAWS/VoiceOver)
   - Contraste de cores

8. **Testar funcionalidades:**
   - Auto play/pause (Intersection Observer)
   - Controle de volume (slider)
   - Mute/unmute
   - Loop
   - Fallback (sem vídeo)

---

## Referência rápida

### Aspect Ratios (Tailwind)
- `aspect-video` = `16 / 9` (horizontal)
- `aspect-[9/16]` = `9 / 16` (vertical) ← **usar este**
- `aspect-square` = `1 / 1` (quadrado)

### Volume (HTML5 Video)
- `video.volume` = `0.0` a `1.0` (0% a 100%)
- `video.muted` = `boolean` (true/false)
- Quando `volume = 0`, considerar `muted = true` para consistência

### Classes Tailwind para slider
- `appearance-none` = remove estilo padrão do navegador
- `accent-coffee-500` = cor do slider (thumb e track ativo)
- `cursor-pointer` = cursor de mão

---

## Checklist de QA

### Funcionalidade
- [ ] Vídeo exibido em formato **vertical (9:16)**
- [ ] Controle de volume (slider ou botões) **funciona corretamente**
- [ ] Botão mute/unmute **funciona** e sincroniza com volume
- [ ] Volume persiste ao mudar de `muted` para `unmuted`
- [ ] Auto play/pause (Intersection Observer) **mantido e funcionando**
- [ ] Loop **funciona** corretamente
- [ ] Fallback (sem vídeo) **funciona** e exibe mensagem

### Layout
- [ ] Vídeo vertical **não quebra layout** em mobile
- [ ] Altura máxima em mobile (`max-h-[60vh]`) **aplicada**
- [ ] Grid lado a lado **mantido** em desktop
- [ ] Controles **visíveis e acessíveis** (não cortados)
- [ ] Espaçamento adequado entre controles e bordas do vídeo

### Responsividade
- [ ] Mobile (360-480px): vídeo não ocupa tela toda, controles visíveis
- [ ] Tablet (768-1024px): layout lado a lado funciona, vídeo proporcional
- [ ] Desktop (≥1280px): grid funciona, vídeo e texto bem balanceados

### Acessibilidade
- [ ] Slider **navegável por teclado** (← → ou Tab + arrow keys)
- [ ] ARIA labels **presentes** em todos os controles
- [ ] ARIA values **corretos** no slider (0-100)
- [ ] Contraste de cores **adequado** (WCAG AA)
- [ ] Screen reader **anuncia** volume corretamente

### Performance
- [ ] Sincronização de volume **não causa re-renders** excessivos
- [ ] Auto play/pause **não afetado** pelas mudanças
- [ ] Sem vazamento de memória (cleanup adequado)

### Navegadores
- [ ] Chrome/Edge: slider e volume funcionam
- [ ] Firefox: slider e volume funcionam
- [ ] Safari: slider e volume funcionam (incluindo iOS)
- [ ] Mobile Safari: controles touch funcionam

---

## Exemplo visual (layout vertical)

### Antes (horizontal)
```
┌──────────────────────┐
│                      │
│      VÍDEO           │
│    (16:9)            │
│                      │
└──────────────────────┘
```

### Depois (vertical)
```
┌──────────┐
│          │
│          │
│  VÍDEO   │
│  (9:16)  │
│          │
│          │
│          │
└──────────┘
[🔊 ━━━━━━ 50%]
```

---

**Última atualização:** 14/11/2025  
**Status:** 📝 Documentação criada — Aguardando implementação

