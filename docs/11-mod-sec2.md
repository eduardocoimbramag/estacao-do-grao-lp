# Modificações — Seção "O que é a Estação do Grão?" (laydesk2)

## Objetivo

Este documento descreve as modificações necessárias na segunda seção "O que é a Estação do Grão?" especificamente para o layout **laydesk2** (resolução 1368×768).

**Importante:** Todas as alterações devem ser aplicadas **exclusivamente** no `laydesk2`, sem modificar outros layouts (laydesk1, laydesk3, laymob1, laymob2).

---

## Localização da Seção

A seção "O que é a Estação do Grão?" está localizada em:
- **Arquivo:** `components/OpenMenuIntro.tsx`
- **ID da seção:** `#apresentacao`

---

## Modificações Solicitadas

### 1. Barra Divisória — Tornar Mais Fina e Discreta

**Elemento atual:**
```tsx
<div 
  aria-hidden="true" 
  className="hidden md:block h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full order-2" 
/>
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 213-216)

**Problema:** A barra está muito visível e chamando atenção.

**Solução:** Reduzir a opacidade e tornar a barra mais fina usando CSS específico para laydesk2.

**Implementação:**

1. **Adicionar classe no componente:**
```tsx
<div 
  aria-hidden="true" 
  className="hidden md:block h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full order-2 laydesk2-sec2-divider" 
/>
```

2. **Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* Barra divisória - mais fina e discreta */
.laydesk2-sec2-divider {
  width: 0.5px !important; /* Mais fina que w-px (1px) */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.03)) !important;
  opacity: 0.5 !important;
}
```

---

### 2. H2 — Centralizar na DIV

**Elemento atual:**
```tsx
<h2 className="hidden sm:block text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-left whitespace-nowrap m-0">
  O que é a Estação do Grão?
</h2>
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 75-77)

**Problema:** O H2 está alinhado à esquerda (`text-left`) e não está centralizado na DIV.

**Solução:** Adicionar classe específica para laydesk2 que centralize o texto.

**Implementação:**

1. **Adicionar classe no componente:**
```tsx
<h2 className="hidden sm:block text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-left whitespace-nowrap m-0 laydesk2-sec2-title">
  O que é a Estação do Grão?
</h2>
```

2. **Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* Título H2 - centralizado */
.laydesk2-sec2-title {
  text-align: center !important;
}
```

---

### 3. Vídeo — Remover Bordas Marrons

**Elemento atual:**
```tsx
<div className="hidden sm:block relative w-full min-w-0 order-3">
  <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl border border-coffee-700 bg-black/40 w-full max-w-full">
    <video
      ref={videoRef}
      className="h-full w-full object-contain"
      ...
    >
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 219-243)

**Problema:** O vídeo está com bordas marrons (`border border-coffee-700`) em ambos os lados. O usuário quer que as bordas desapareçam sem alterar o aspect ratio do vídeo, apenas reduzindo o tamanho até que as bordas sumam.

**Solução:** 
- Remover a borda (`border border-coffee-700`)
- Ajustar o tamanho do container do vídeo para que o vídeo preencha melhor o espaço, eliminando as bordas laterais
- Manter o `aspect-[9/16]` e `object-contain` para preservar o aspect ratio

**Implementação:**

1. **Adicionar classe no container do vídeo:**
```tsx
<div className="hidden sm:block relative w-full min-w-0 order-3">
  <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl border border-coffee-700 bg-black/40 w-full max-w-full laydesk2-sec2-video-container">
    <video
      ref={videoRef}
      className="h-full w-full object-contain laydesk2-sec2-video"
      ...
    >
```

2. **Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* Container do vídeo - remover bordas e ajustar tamanho */
.laydesk2-sec2-video-container {
  border: none !important;
  max-width: 90% !important; /* Reduzir largura para eliminar bordas laterais */
  margin: 0 auto !important; /* Centralizar */
}

/* Vídeo - ajustar para preencher melhor */
.laydesk2-sec2-video {
  object-fit: cover !important; /* Mudar de contain para cover para preencher melhor */
  /* OU manter contain mas ajustar o container */
}
```

**Nota:** Se `object-fit: cover` cortar partes importantes do vídeo, podemos manter `object-contain` e ajustar apenas o tamanho do container. A escolha dependerá do resultado visual desejado.

---

### 4. Botão de Som — Enquadrar no Canto Inferior Esquerdo e Reduzir Tamanho

**Elemento atual:**
```tsx
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
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 261-273)

**Problema:** O botão está posicionado com `bottom-3 left-3`, mas está saindo para fora do vídeo. O usuário quer que ele fique enquadrado no canto inferior esquerdo do vídeo e com tamanho reduzido.

**Solução:** 
- Ajustar o posicionamento para garantir que fique dentro dos limites do vídeo
- Reduzir padding, tamanho da fonte e gap entre elementos
- Possivelmente reduzir o tamanho do ícone

**Implementação:**

1. **Adicionar classe no botão:**
```tsx
{!hasError && (
  <button
    onClick={() => setMuted(!muted)}
    className="absolute bottom-3 left-3 rounded-full bg-black/55 backdrop-blur px-4 py-2 text-sm border border-white/20 hover:bg-black/70 transition-colors flex items-center gap-2 laydesk2-sec2-sound-button"
    aria-pressed={!muted}
    aria-label={muted ? 'Ativar som' : 'Desativar som'}
  >
    <span className="text-base laydesk2-sec2-sound-icon">{muted ? '🔇' : '🔊'}</span>
    <span className="text-cream-50 font-medium font-montserrat laydesk2-sec2-sound-text">
      {muted ? 'Som desativado' : 'Som ativado'}
    </span>
  </button>
)}
```

2. **Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* Botão de som - enquadrar e reduzir tamanho */
.laydesk2-sec2-sound-button {
  bottom: 0.5rem !important; /* Reduzir de bottom-3 (0.75rem) para 0.5rem */
  left: 0.5rem !important; /* Reduzir de left-3 (0.75rem) para 0.5rem */
  padding: 0.375rem 0.75rem !important; /* Reduzir de px-4 py-2 para menor */
  font-size: 0.75rem !important; /* Reduzir de text-sm para text-xs */
  gap: 0.375rem !important; /* Reduzir gap entre ícone e texto */
}

/* Ícone do botão de som - reduzir tamanho */
.laydesk2-sec2-sound-icon {
  font-size: 0.875rem !important; /* Reduzir de text-base para menor */
}

/* Texto do botão de som - reduzir tamanho */
.laydesk2-sec2-sound-text {
  font-size: 0.75rem !important; /* Reduzir tamanho da fonte */
}
```

---

## Resumo das Classes CSS

Todas as classes devem ser adicionadas no bloco `laydesk2` em `app/globals.css`:

```css
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  
  /* 1. Barra divisória - mais fina e discreta */
  .laydesk2-sec2-divider {
    width: 0.5px !important;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.03)) !important;
    opacity: 0.5 !important;
  }
  
  /* 2. Título H2 - centralizado */
  .laydesk2-sec2-title {
    text-align: center !important;
  }
  
  /* 3. Container do vídeo - remover bordas e ajustar tamanho */
  .laydesk2-sec2-video-container {
    border: none !important;
    max-width: 90% !important;
    margin: 0 auto !important;
  }
  
  /* Vídeo - ajustar para preencher melhor */
  .laydesk2-sec2-video {
    object-fit: cover !important; /* OU manter contain conforme necessário */
  }
  
  /* 4. Botão de som - enquadrar e reduzir tamanho */
  .laydesk2-sec2-sound-button {
    bottom: 0.5rem !important;
    left: 0.5rem !important;
    padding: 0.375rem 0.75rem !important;
    font-size: 0.75rem !important;
    gap: 0.375rem !important;
  }
  
  /* Ícone do botão de som */
  .laydesk2-sec2-sound-icon {
    font-size: 0.875rem !important;
  }
  
  /* Texto do botão de som */
  .laydesk2-sec2-sound-text {
    font-size: 0.75rem !important;
  }
}
```

---

## Resumo das Modificações no Componente

**Arquivo:** `components/OpenMenuIntro.tsx`

### 1. Barra Divisória (linha ~213-216)
```tsx
<div 
  aria-hidden="true" 
  className="hidden md:block h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full order-2 laydesk2-sec2-divider" 
/>
```

### 2. Título H2 (linha ~75-77)
```tsx
<h2 className="hidden sm:block text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-left whitespace-nowrap m-0 laydesk2-sec2-title">
  O que é a Estação do Grão?
</h2>
```

### 3. Container do Vídeo (linha ~220)
```tsx
<div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl border border-coffee-700 bg-black/40 w-full max-w-full laydesk2-sec2-video-container">
  <video
    ref={videoRef}
    className="h-full w-full object-contain laydesk2-sec2-video"
    ...
  >
```

### 4. Botão de Som (linha ~262-273)
```tsx
<button
  onClick={() => setMuted(!muted)}
  className="absolute bottom-3 left-3 rounded-full bg-black/55 backdrop-blur px-4 py-2 text-sm border border-white/20 hover:bg-black/70 transition-colors flex items-center gap-2 laydesk2-sec2-sound-button"
  ...
>
  <span className="text-base laydesk2-sec2-sound-icon">{muted ? '🔇' : '🔊'}</span>
  <span className="text-cream-50 font-medium font-montserrat laydesk2-sec2-sound-text">
    {muted ? 'Som desativado' : 'Som ativado'}
  </span>
</button>
```

---

## Checklist de Implementação

Antes de implementar, verifique:

- [ ] Todas as classes CSS estão dentro do bloco `laydesk2` em `app/globals.css`
- [ ] Todas as classes foram adicionadas nos elementos correspondentes em `components/OpenMenuIntro.tsx`
- [ ] Nenhuma alteração foi feita em outros layouts (laydesk1, laydesk3, mobile)
- [ ] Testado em resolução 1368×768 (laydesk2)
- [ ] Verificado que a barra divisória está mais fina e discreta
- [ ] Verificado que o H2 está centralizado
- [ ] Verificado que as bordas do vídeo foram removidas
- [ ] Verificado que o botão de som está enquadrado no canto inferior esquerdo do vídeo
- [ ] Verificado que o aspect ratio do vídeo foi preservado
- [ ] Testado que outros layouts não foram afetados

---

## Ordem de Implementação Recomendada

1. **Primeiro:** Adicionar as classes CSS no componente (`OpenMenuIntro.tsx`)
2. **Segundo:** Adicionar as regras CSS em `app/globals.css` dentro do bloco `laydesk2`
3. **Terceiro:** Testar em resolução 1368×768
4. **Quarto:** Ajustar valores se necessário (especialmente para o vídeo e botão de som)

---

## Observações Importantes

1. **Vídeo - object-fit:** A escolha entre `object-contain` e `object-cover` dependerá do resultado visual. Se `cover` cortar partes importantes do vídeo, manter `contain` e ajustar apenas o tamanho do container.

2. **Botão de som:** Se após a redução o botão ainda estiver muito grande ou mal posicionado, os valores podem ser ajustados incrementalmente.

3. **Barra divisória:** Se ainda estiver muito visível, a opacidade pode ser reduzida ainda mais (ex: `opacity: 0.3`).

4. **H2 centralizado:** Se o alinhamento central não ficar visualmente agradável devido ao conteúdo ao lado, pode ser necessário ajustar também o container pai.

---

## Notas Finais

- Todas as modificações são específicas para `laydesk2` e não afetarão outros layouts
- Use `!important` nas regras CSS para garantir que sobrescrevam os estilos padrão do Tailwind
- Teste sempre em diferentes navegadores para garantir compatibilidade

