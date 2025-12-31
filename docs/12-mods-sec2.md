# Modificações Adicionais — Seção "O que é a Estação do Grão?" (laydesk2)

## Objetivo

Este documento descreve modificações adicionais necessárias na segunda seção "O que é a Estação do Grão?" especificamente para o layout **laydesk2** (resolução 1368×768), baseadas na referência visual do layout 1080p.

**Importante:** Todas as alterações devem ser aplicadas **exclusivamente** no `laydesk2`, sem modificar outros layouts (laydesk1, laydesk3, laymob1, laymob2).

---

## Localização da Seção

A seção "O que é a Estação do Grão?" está localizada em:
- **Arquivo:** `components/OpenMenuIntro.tsx`
- **ID da seção:** `#apresentacao`

---

## Modificações Solicitadas

### 1. Vídeo — Ajustes Visuais e Posicionamento do Botão

**Elemento atual:**
```tsx
<div className="hidden sm:block relative w-full min-w-0 order-3">
  <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl border border-coffee-700 bg-black/40 w-full max-w-full laydesk2-sec2-video-container">
    <video
      ref={videoRef}
      className="h-full w-full object-contain laydesk2-sec2-video"
      ...
    >
    ...
  </div>

  {/* Controle de som simples */}
  {!hasError && (
    <button
      onClick={() => setMuted(!muted)}
      className="absolute bottom-3 left-3 ... laydesk2-sec2-sound-button"
      ...
    >
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 219-273)

**Problemas identificados:**
1. O vídeo está com `object-fit: cover` (zoom), mas deveria manter `object-contain` para preservar o aspect ratio original
2. O vídeo precisa de um contorno branco sutil (como na referência 1080p)
3. O botão de som está posicionado no container externo (`order-3`), mas deveria estar dentro do container do vídeo
4. O botão precisa ser menor para caber melhor no layout laydesk2

**Solução:** 
- Reverter `object-fit` para `contain` (remover o `cover`)
- Adicionar contorno branco sutil ao container do vídeo
- Mover o botão de som para dentro do container do vídeo (usando `relative` no container e `absolute` no botão)
- Ajustar tamanho e posicionamento do botão para ficar dentro dos limites do vídeo

**Implementação:**

1. **Modificar estrutura do componente:**
```tsx
{/* DIREITA — VÍDEO (Desktop) */}
<div className="hidden sm:block relative w-full min-w-0 order-3">
  <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl border border-coffee-700 bg-black/40 w-full max-w-full laydesk2-sec2-video-container">
    <video
      ref={videoRef}
      className="h-full w-full object-contain laydesk2-sec2-video"
      ...
    >
      ...
    </video>

    {hasError && (
      <div className="h-full w-full flex items-center justify-center bg-coffee-900/60 backdrop-blur">
        ...
      </div>
    )}

    {/* Controle de som simples - MOVER PARA DENTRO DO CONTAINER */}
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
  </div>
</div>
```

**Nota:** O botão já está dentro do container do vídeo no código atual, mas precisa ter o posicionamento ajustado via CSS para garantir que fique dentro dos limites visíveis do vídeo.

2. **Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* 3. Container do vídeo - adicionar contorno branco e ajustar */
.laydesk2-sec2-video-container {
  border: 1px solid rgba(255, 255, 255, 0.15) !important; /* Contorno branco sutil */
  max-width: 100% !important; /* Remover a redução de 90% */
  margin: 0 !important; /* Remover margin auto */
  position: relative !important; /* Garantir contexto para posicionamento absoluto do botão */
}

/* Vídeo - manter aspect ratio original (sem zoom) */
.laydesk2-sec2-video {
  object-fit: contain !important; /* Reverter de cover para contain */
}

/* 4. Botão de som - ajustar para ficar dentro do vídeo e menor */
.laydesk2-sec2-sound-button {
  bottom: 0.75rem !important; /* Ajustar para ficar dentro do vídeo */
  left: 0.75rem !important; /* Ajustar para ficar dentro do vídeo */
  padding: 0.5rem 0.875rem !important; /* Reduzir ainda mais o padding */
  font-size: 0.6875rem !important; /* Reduzir para ~11px */
  gap: 0.5rem !important; /* Gap reduzido */
  z-index: 10 !important; /* Garantir que fique acima do vídeo */
}

/* Ícone do botão de som - reduzir tamanho */
.laydesk2-sec2-sound-icon {
  font-size: 0.75rem !important; /* Reduzir de 0.875rem para menor */
}

/* Texto do botão de som - reduzir tamanho */
.laydesk2-sec2-sound-text {
  font-size: 0.6875rem !important; /* Reduzir para ~11px */
}
```

---

### 2. Barra Divisória — Reduzir Largura para 1/3

**Elemento atual:**
```tsx
<div 
  aria-hidden="true" 
  className="hidden md:block h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full order-2 laydesk2-sec2-divider" 
/>
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 213-216)

**Problema:** A barra está com `width: 0.5px` (após modificação anterior), mas o usuário quer que seja 1/3 do tamanho atual. Como o tamanho original era `w-px` (1px), 1/3 seria aproximadamente `0.33px`.

**Solução:** Reduzir a largura para aproximadamente 1/3 de 1px (0.33px).

**Implementação:**

**Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* 1. Barra divisória - reduzir para 1/3 da largura original (1px) */
.laydesk2-sec2-divider {
  width: 0.33px !important; /* 1/3 de 1px (w-px original) */
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.03)) !important;
  opacity: 0.5 !important;
}
```

**Nota:** Valores menores que 1px podem não ser visíveis em alguns monitores. Se necessário, podemos usar `0.5px` como mínimo ou ajustar a opacidade.

---

## Resumo das Classes CSS

Todas as classes devem ser atualizadas no bloco `laydesk2` em `app/globals.css`:

```css
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  
  /* 1. Barra divisória - reduzir para 1/3 da largura original */
  .laydesk2-sec2-divider {
    width: 0.33px !important; /* 1/3 de 1px */
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.03)) !important;
    opacity: 0.5 !important;
  }
  
  /* 2. Título H2 - centralizado (já implementado) */
  .laydesk2-sec2-title {
    text-align: center !important;
  }
  
  /* 3. Container do vídeo - adicionar contorno branco e ajustar */
  .laydesk2-sec2-video-container {
    border: 1px solid rgba(255, 255, 255, 0.15) !important; /* Contorno branco sutil */
    max-width: 100% !important; /* Remover redução de 90% */
    margin: 0 !important; /* Remover margin auto */
    position: relative !important; /* Contexto para botão absoluto */
  }
  
  /* Vídeo - manter aspect ratio original (sem zoom) */
  .laydesk2-sec2-video {
    object-fit: contain !important; /* Reverter de cover para contain */
  }
  
  /* 4. Botão de som - ajustar para ficar dentro do vídeo e menor */
  .laydesk2-sec2-sound-button {
    bottom: 0.75rem !important;
    left: 0.75rem !important;
    padding: 0.5rem 0.875rem !important;
    font-size: 0.6875rem !important; /* ~11px */
    gap: 0.5rem !important;
    z-index: 10 !important;
  }
  
  /* Ícone do botão de som */
  .laydesk2-sec2-sound-icon {
    font-size: 0.75rem !important;
  }
  
  /* Texto do botão de som */
  .laydesk2-sec2-sound-text {
    font-size: 0.6875rem !important; /* ~11px */
  }
}
```

---

## Resumo das Modificações no Componente

**Arquivo:** `components/OpenMenuIntro.tsx`

### 1. Barra Divisória (linha ~213-216)
**Sem alterações necessárias** - A classe `laydesk2-sec2-divider` já está aplicada.

### 2. Container do Vídeo (linha ~220)
**Sem alterações estruturais necessárias** - O botão já está dentro do container. Apenas ajustes via CSS.

### 3. Botão de Som (linha ~262-273)
**Sem alterações estruturais necessárias** - O botão já está no local correto. Apenas ajustes via CSS.

---

## Checklist de Implementação

Antes de implementar, verifique:

- [ ] Todas as classes CSS estão dentro do bloco `laydesk2` em `app/globals.css`
- [ ] A barra divisória está com largura de 0.33px (1/3 de 1px)
- [ ] O container do vídeo tem contorno branco sutil (`rgba(255, 255, 255, 0.15)`)
- [ ] O vídeo está com `object-fit: contain` (sem zoom)
- [ ] O botão de som está posicionado dentro dos limites do vídeo
- [ ] O botão de som está menor e proporcional ao layout laydesk2
- [ ] Nenhuma alteração foi feita em outros layouts (laydesk1, laydesk3, mobile)
- [ ] Testado em resolução 1368×768 (laydesk2)
- [ ] Verificado que o aspect ratio do vídeo foi preservado
- [ ] Verificado que o botão não ultrapassa os limites do vídeo
- [ ] Testado que outros layouts não foram afetados

---

## Ordem de Implementação Recomendada

1. **Primeiro:** Atualizar as regras CSS em `app/globals.css` dentro do bloco `laydesk2`
2. **Segundo:** Verificar se o botão está dentro do container do vídeo (já está)
3. **Terceiro:** Testar em resolução 1368×768
4. **Quarto:** Ajustar valores se necessário (especialmente para o botão de som e largura da barra)

---

## Observações Importantes

1. **Barra divisória (0.33px):** Valores menores que 1px podem não ser visíveis em monitores de baixa resolução. Se necessário, podemos usar `0.5px` como mínimo ou aumentar a opacidade.

2. **Contorno branco do vídeo:** O valor `rgba(255, 255, 255, 0.15)` pode ser ajustado se necessário. Valores menores (ex: `0.1`) tornam o contorno mais sutil, valores maiores (ex: `0.2`) mais visível.

3. **Botão de som:** Se após a redução o botão ainda estiver muito grande ou mal posicionado, os valores podem ser ajustados incrementalmente. O `z-index: 10` garante que o botão fique acima do vídeo.

4. **Object-fit contain vs cover:** Com `contain`, o vídeo mantém o aspect ratio original mas pode ter barras pretas nas laterais. Com `cover`, o vídeo preenche todo o espaço mas pode cortar partes. O usuário especificou que quer manter o aspect ratio original (sem zoom), então usamos `contain`.

5. **Cantos arredondados:** O vídeo já tem `rounded-2xl` aplicado, que mantém os cantos arredondados. O contorno branco seguirá o formato arredondado.

---

## Notas Finais

- Todas as modificações são específicas para `laydesk2` e não afetarão outros layouts
- Use `!important` nas regras CSS para garantir que sobrescrevam os estilos padrão do Tailwind
- Teste sempre em diferentes navegadores para garantir compatibilidade
- O contorno branco e os cantos arredondados já estão presentes no código base, apenas precisam ser ajustados via CSS para laydesk2

