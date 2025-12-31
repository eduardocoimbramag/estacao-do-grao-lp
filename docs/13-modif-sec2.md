# Modificações Adicionais — Seção "O que é a Estação do Grão?" (laydesk2)

## Objetivo

Este documento descreve modificações adicionais necessárias na segunda seção "O que é a Estação do Grão?" especificamente para o layout **laydesk2** (resolução 1368×768).

**Importante:** Todas as alterações devem ser aplicadas **exclusivamente** no `laydesk2`, sem modificar outros layouts (laydesk1, laydesk3, laymob1, laymob2).

---

## Localização da Seção

A seção "O que é a Estação do Grão?" está localizada em:
- **Arquivo:** `components/OpenMenuIntro.tsx`
- **ID da seção:** `#apresentacao`

---

## Modificações Solicitadas

### 1. Aumentar Tamanho do Vídeo em 10%

**Elemento atual:**
```tsx
<div className="hidden sm:block relative w-full min-w-0 order-3">
  <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-black/40 w-full max-w-full laydesk2-sec2-video-container">
    <video
      ref={videoRef}
      className="h-full w-full object-contain laydesk2-sec2-video"
      ...
    >
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 219-223)

**Problema:** O vídeo precisa ser aumentado em 10% no layout laydesk2.

**Solução:** Aumentar o `max-height` e `max-width` do vídeo em 10% usando CSS específico para laydesk2.

**Implementação:**

**Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* Vídeo - aumentar tamanho em 10% */
.laydesk2-sec2-video {
  max-width: 110% !important; /* Aumentar de 100% para 110% */
  max-height: 77vh !important; /* Aumentar de 70vh para 77vh (70 * 1.1 = 77) */
}

/* Container do vídeo - ajustar para acomodar o vídeo maior */
.laydesk2-sec2-video-container {
  max-height: 77vh !important; /* Aumentar de 70vh para 77vh */
}
```

**Nota:** O aumento de 10% será aplicado tanto na largura quanto na altura máxima do vídeo.

---

### 2. Centralizar Conteúdo da Coluna da Direita (Vídeo)

**Elemento atual:**
```tsx
{/* DIREITA — VÍDEO (Desktop) */}
<div className="hidden sm:block relative w-full min-w-0 order-3">
  <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-black/40 w-full max-w-full laydesk2-sec2-video-container">
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 218-220)

**Problema:** O conteúdo da coluna da direita (vídeo) não está centralizado verticalmente, enquanto a coluna da esquerda está centralizada.

**Solução:** Adicionar classes CSS para centralizar verticalmente o conteúdo da coluna da direita.

**Implementação:**

1. **Adicionar classe no container da coluna direita:**
```tsx
{/* DIREITA — VÍDEO (Desktop) */}
<div className="hidden sm:block relative w-full min-w-0 order-3 laydesk2-sec2-video-column">
  <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-black/40 w-full max-w-full laydesk2-sec2-video-container">
```

2. **Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* Coluna da direita - centralizar conteúdo verticalmente */
.laydesk2-sec2-video-column {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
```

---

### 3. Ajustar Tamanho da Fonte dos Parágrafos na Coluna da Esquerda

**Elementos atuais:**
```tsx
<p className="text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-center whitespace-nowrap break-words font-montserrat">
  O café do seu evento precisa ser inesquecível.
</p>
<p className="text-base text-cream-50/90 leading-relaxed text-justify hyphens-auto break-words font-montserrat indent-5">
  A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
</p>
```

**Localização:** `components/OpenMenuIntro.tsx` (linhas 81-86)

**Referência (tamanho desejado):**
```tsx
<span className="text-base text-cream-50/90 font-montserrat leading-tight">{t}</span>
```

**Localização da referência:** `components/OpenMenuIntro.tsx` (linha 190)

**Problema:** Os dois parágrafos têm tamanhos de fonte diferentes (`text-lg md:text-xl` e `text-base`), mas o usuário quer que ambos tenham o mesmo tamanho da lista (`text-base`).

**Solução:** Adicionar classes CSS específicas para laydesk2 que forcem ambos os parágrafos a terem `font-size` equivalente a `text-base` (1rem / 16px).

**Implementação:**

1. **Adicionar classes nos parágrafos:**
```tsx
<p className="text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-center whitespace-nowrap break-words font-montserrat laydesk2-sec2-subtitle">
  O café do seu evento precisa ser inesquecível.
</p>
<p className="text-base text-cream-50/90 leading-relaxed text-justify hyphens-auto break-words font-montserrat indent-5 laydesk2-sec2-paragraph">
  A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
</p>
```

2. **Adicionar CSS em `app/globals.css` (dentro do bloco laydesk2):**
```css
/* Subtítulo - ajustar para text-base */
.laydesk2-sec2-subtitle {
  font-size: 1rem !important; /* text-base = 1rem */
  line-height: 1.5rem !important; /* Ajustar line-height proporcionalmente */
}

/* Parágrafo - garantir text-base (já está, mas garantir) */
.laydesk2-sec2-paragraph {
  font-size: 1rem !important; /* text-base = 1rem */
  line-height: 1.5rem !important; /* Ajustar line-height proporcionalmente */
}
```

---

## Resumo das Classes CSS

Todas as classes devem ser adicionadas no bloco `laydesk2` em `app/globals.css`:

```css
@media (min-width: 1024px) and (min-height: 768px) and (max-height: 899px) {
  
  /* 1. Barra divisória - reduzir para 1/3 da largura original (já implementado) */
  .laydesk2-sec2-divider {
    width: 0.33px !important;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.03)) !important;
    opacity: 0.5 !important;
  }
  
  /* 2. Título H2 - centralizado (já implementado) */
  .laydesk2-sec2-title {
    text-align: center !important;
  }
  
  /* 3. Container do vídeo - ajustar para vídeo maior */
  .laydesk2-sec2-video-container {
    max-height: 77vh !important; /* Aumentar de 70vh para 77vh (10%) */
    /* ... outras propriedades já existentes ... */
  }
  
  /* Vídeo - aumentar tamanho em 10% */
  .laydesk2-sec2-video {
    max-width: 110% !important; /* Aumentar de 100% para 110% */
    max-height: 77vh !important; /* Aumentar de 70vh para 77vh (10%) */
    /* ... outras propriedades já existentes ... */
  }
  
  /* 4. Coluna da direita - centralizar conteúdo verticalmente */
  .laydesk2-sec2-video-column {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  /* 5. Subtítulo - ajustar para text-base */
  .laydesk2-sec2-subtitle {
    font-size: 1rem !important; /* text-base = 1rem */
    line-height: 1.5rem !important;
  }
  
  /* 6. Parágrafo - garantir text-base */
  .laydesk2-sec2-paragraph {
    font-size: 1rem !important; /* text-base = 1rem */
    line-height: 1.5rem !important;
  }
  
  /* 7. Botão de som - ajustar para ficar dentro do vídeo e menor (já implementado) */
  .laydesk2-sec2-sound-button {
    /* ... propriedades já existentes ... */
  }
  
  /* Ícone do botão de som (já implementado) */
  .laydesk2-sec2-sound-icon {
    /* ... propriedades já existentes ... */
  }
  
  /* Texto do botão de som (já implementado) */
  .laydesk2-sec2-sound-text {
    /* ... propriedades já existentes ... */
  }
}
```

---

## Resumo das Modificações no Componente

**Arquivo:** `components/OpenMenuIntro.tsx`

### 1. Coluna da Direita (linha ~218-220)
```tsx
{/* DIREITA — VÍDEO (Desktop) */}
<div className="hidden sm:block relative w-full min-w-0 order-3 laydesk2-sec2-video-column">
  <div className="aspect-[9/16] max-h-[70vh] md:max-h-[80vh] overflow-hidden rounded-2xl bg-black/40 w-full max-w-full laydesk2-sec2-video-container">
```

### 2. Subtítulo (linha ~81-83)
```tsx
<p className="text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-center whitespace-nowrap break-words font-montserrat laydesk2-sec2-subtitle">
  O café do seu evento precisa ser inesquecível.
</p>
```

### 3. Parágrafo (linha ~84-86)
```tsx
<p className="text-base text-cream-50/90 leading-relaxed text-justify hyphens-auto break-words font-montserrat indent-5 laydesk2-sec2-paragraph">
  A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
</p>
```

---

## Checklist de Implementação

Antes de implementar, verifique:

- [ ] Todas as classes CSS estão dentro do bloco `laydesk2` em `app/globals.css`
- [ ] O vídeo foi aumentado em 10% (max-width: 110%, max-height: 77vh)
- [ ] O container do vídeo foi ajustado para acomodar o vídeo maior
- [ ] A coluna da direita está centralizada verticalmente
- [ ] O subtítulo está com `font-size: 1rem` (text-base)
- [ ] O parágrafo está com `font-size: 1rem` (text-base)
- [ ] Ambos os textos têm o mesmo tamanho da lista (text-base)
- [ ] Nenhuma alteração foi feita em outros layouts (laydesk1, laydesk3, mobile)
- [ ] Testado em resolução 1368×768 (laydesk2)
- [ ] Verificado que o vídeo aumentou 10% sem quebrar o layout
- [ ] Verificado que o conteúdo da coluna direita está centralizado
- [ ] Verificado que os textos estão com o tamanho correto
- [ ] Testado que outros layouts não foram afetados

---

## Ordem de Implementação Recomendada

1. **Primeiro:** Adicionar as classes CSS no componente (`OpenMenuIntro.tsx`)
2. **Segundo:** Adicionar as regras CSS em `app/globals.css` dentro do bloco `laydesk2`
3. **Terceiro:** Testar em resolução 1368×768
4. **Quarto:** Ajustar valores se necessário (especialmente para o tamanho do vídeo)

---

## Observações Importantes

1. **Aumento do vídeo em 10%:** O aumento será aplicado tanto na largura quanto na altura. Se o vídeo ficar muito grande e causar problemas de layout, podemos ajustar o valor.

2. **Centralização da coluna direita:** A centralização vertical será feita usando flexbox. Se houver conflitos com o layout existente, podemos ajustar.

3. **Tamanho da fonte:** Ambos os parágrafos terão `font-size: 1rem` (equivalente a `text-base` do Tailwind), que é o mesmo tamanho usado na lista. O `line-height` foi ajustado proporcionalmente para manter a legibilidade.

4. **Compatibilidade:** Todas as modificações são específicas para `laydesk2` e não afetarão outros layouts.

---

## Notas Finais

- Todas as modificações são específicas para `laydesk2` e não afetarão outros layouts
- Use `!important` nas regras CSS para garantir que sobrescrevam os estilos padrão do Tailwind
- Teste sempre em diferentes navegadores para garantir compatibilidade
- O aumento de 10% no vídeo pode afetar o posicionamento do botão de som - verifique se ele ainda está dentro do vídeo após o aumento

