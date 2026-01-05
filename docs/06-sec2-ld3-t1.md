# Documentação: Ajustes finos da Seção 2 (O que é a Estação do Grão?) — Laydesk3 (1280×720) — Rodada 1

## Objetivo
No **`laydesk3`** (1280×720 alvo real; `@media (min-width: 1024px) and (max-height: 579px)`), fazer **5 ajustes finos** na seção "O que é a Estação do Grão?" mantendo as regras do projeto:
- **1 tela − menu** (`calc(100vh - 4rem)`)
- **Sem overflow**

### Ajustes pedidos
1) **Reduzir drasticamente** a distância entre o **título** e o **subtítulo** (deixar muito próximos)
2) **Reduzir espaçamento** entre o **texto** (parágrafo) e o **UL** (lista)
3) **Reduzir espaçamento** entre o **UL** (lista) e os **2 botões** inferiores
4) **Título colado no topo**: dar um respiro (descer um pouco)
5) **Vídeo da direita** está pequeno: aumentar ~20%

> Importante: o pedido menciona "exclusivamente no laydesk2", mas estes ajustes são para **laydesk3**. Este doc considera **apenas laydesk3**.

---

## Contexto (onde ajustar)

### Componente JSX
**Arquivo:** `components/OpenMenuIntro.tsx`  
**Seção:** `<section id="apresentacao">` com classe `laydesk3-sec2-section`

**Estrutura (desktop):**
```
<div class="...laydesk3-sec2-container">
  <div> <!-- Coluna esquerda -->
    <h2 class="laydesk3-sec2-title">O que é a Estação do Grão?</h2>
    
    <div class="...space-y-9 md:space-y-12 laydesk2-sec2-textstack"> <!-- PROBLEMA 1 -->
      <p class="laydesk3-sec2-subtitle">O café do seu evento...</p>
      <p class="laydesk3-sec2-paragraph">A Estação do Grão é...</p>
    </div>
    
    <ul class="...mt-9 md:mt-12 laydesk2-sec2-bullets"> <!-- PROBLEMA 2 -->
      <li>Coffee station completa...</li>
      ...
    </ul>
    
    <div class="...mt-9 md:mt-12 laydesk2-sec2-cta"> <!-- PROBLEMA 3 -->
      <a>Ver serviços</a>
      <a>Solicitar orçamento</a>
    </div>
  </div>
  
  <div class="laydesk3-sec2-video-column"> <!-- PROBLEMA 5 -->
    <div class="laydesk3-sec2-video-container">
      <video>...</video>
    </div>
  </div>
</div>
```

### CSS atual (laydesk3)
**Arquivo:** `app/globals.css`  
**Bloco:** `@media (min-width: 1024px) and (max-height: 579px)`  
**Seção:** `/* SEÇÃO 2 (apresentacao): O que é a Estação do Grão? */`

Principais "controles" atuais:
- **Título**: `.laydesk3-sec2-title { margin-bottom: 0.5rem; }`
- **Subtítulo**: `.laydesk3-sec2-subtitle { margin-top: 0; }`
- **Container**: `.laydesk3-sec2-container { padding-top: 0; }` (PROBLEMA 4)
- **Vídeo**: `.laydesk3-sec2-video-container { max-width: 462px; }` (PROBLEMA 5)

---

## Plano de implementação (sem aplicar ainda)

### 1) Reduzir DRASTICAMENTE distância título ↔ subtítulo (AJUSTE AQUI)

**Problema:** o div que contém subtítulo + parágrafo usa `space-y-9 md:space-y-12` (Tailwind), criando gap gigante entre título e subtítulo.

**Causa:** classe inline no JSX (`.laydesk2-sec2-textstack`).

**Estratégia:** no laydesk3, forçar o **primeiro filho** (subtítulo) a ter `margin-top` bem menor.

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC2][LAYDESK3] Aproximar título e subtítulo — AJUSTE AQUI */
  .laydesk3-sec2-textstack > p:first-child {
    margin-top: 0.25rem !important; /* AJUSTE AQUI (ex.: 0.25rem → 0.5rem → 0.75rem) */
  }
  
  /* [SEC2][LAYDESK3] Espaço entre subtítulo e parágrafo */
  .laydesk3-sec2-textstack {
    gap: 1.5rem !important; /* AJUSTE AQUI (para controlar o "space-y") */
  }
}
```

**Observação:** se ainda quiser **mais próximo**, use `margin-top: 0.1rem` ou `0rem`.

---

### 2) Reduzir espaçamento entre parágrafo e UL (AJUSTE AQUI)

**Problema:** a lista (UL) usa `mt-9 md:mt-12` (Tailwind), criando espaço gigante após o parágrafo.

**Causa:** classe inline no JSX (`.laydesk2-sec2-bullets`).

**Estratégia:** no laydesk3, forçar `margin-top` menor.

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC2][LAYDESK3] Espaçamento entre parágrafo e lista — AJUSTE AQUI */
  ul.laydesk2-sec2-bullets {
    margin-top: 1.5rem !important; /* AJUSTE AQUI (ex.: mt-9/12 → 1.5rem → 1rem → 0.75rem) */
  }
}
```

**Valores de referência:**
- Mais compacto: `1rem`
- Mais confortável: `2rem`

---

### 3) Reduzir espaçamento entre UL e botões (AJUSTE AQUI)

**Problema:** os botões usam `mt-9 md:mt-12` (Tailwind), criando espaço gigante após o UL.

**Causa:** classe inline no JSX (`.laydesk2-sec2-cta`).

**Estratégia:** no laydesk3, forçar `margin-top` menor.

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC2][LAYDESK3] Espaçamento entre lista e botões — AJUSTE AQUI */
  .laydesk2-sec2-cta {
    margin-top: 1.5rem !important; /* AJUSTE AQUI (ex.: mt-9/12 → 1.5rem → 1rem → 0.75rem) */
  }
}
```

**Valores de referência:**
- Mais compacto: `1rem`
- Mais confortável: `2rem`

---

### 4) Descer o título (dar respiro no topo) (AJUSTE AQUI)

**Problema:** o container da seção tem `padding-top: 0`, deixando o título colado no limite superior.

**Estratégia:** no laydesk3, adicionar `padding-top` pequeno ao container.

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC2][LAYDESK3] Respiro no topo (descer o título) — AJUSTE AQUI */
  .laydesk3-sec2-container {
    padding-top: 1rem !important; /* AJUSTE AQUI (ex.: 0.5rem → 1rem → 1.5rem) */
    padding-bottom: 1rem !important; /* AJUSTE AQUI (para balancear) */
  }
}
```

**Observação:** se aumentar muito, pode causar overflow vertical — validar após aplicar.

---

### 5) Aumentar o vídeo ~20% (AJUSTE AQUI)

**Problema:** o vídeo da direita tem `max-width: 462px`, ficando pequeno para a tela.

**Estratégia:** aumentar `max-width` e `width` (no calc) para ~554px (462 × 1.2 ≈ 554).

```css
@media (min-width: 1024px) and (max-height: 579px) {
  /* [SEC2][LAYDESK3] Aumentar tamanho do vídeo — AJUSTE AQUI */
  .laydesk3-sec2-video-container {
    /* Aumentar largura base de 462px → 554px (~20%) */
    width: min(554px, calc(68.2vh * 9 / 16)) !important; /* AJUSTE AQUI (ex.: 462 → 520 → 554 → 600) */
    max-width: 554px !important; /* AJUSTE AQUI (manter igual ao valor acima) */
  }
}
```

**Valores de referência:**
- +10%: `508px` (462 × 1.1)
- +15%: `531px` (462 × 1.15)
- +20%: `554px` (462 × 1.2)
- +25%: `578px` (462 × 1.25)

**Observação:** se aumentar muito, pode quebrar o grid ou causar overflow horizontal — validar após aplicar.

---

## Checklist de validação (quando aplicar)

- [ ] Validar em **laydesk3** (altura `innerHeight` <= 579) com zoom 100%
- [ ] Confirmar que seção continua **1 tela − menu** e **sem overflow**
- [ ] **Problema 1**: título e subtítulo ficaram próximos? Ajustar `margin-top` do subtítulo
- [ ] **Problema 2**: espaçamento entre parágrafo e lista ficou adequado? Ajustar `margin-top` do UL
- [ ] **Problema 3**: espaçamento entre lista e botões ficou adequado? Ajustar `margin-top` dos botões
- [ ] **Problema 4**: título desceu do topo? Ajustar `padding-top` do container
- [ ] **Problema 5**: vídeo aumentou ~20%? Ajustar `max-width` do video-container
- [ ] Validar que o vídeo **não extrapolou** a largura disponível (sem overflow horizontal)
- [ ] Validar que o conteúdo da esquerda **não cortou** (sem overflow vertical)

---

## Resumo dos seletores a criar/modificar no laydesk3

```css
@media (min-width: 1024px) and (max-height: 579px) {
  
  /* 1) Aproximar título e subtítulo */
  .laydesk3-sec2-textstack > p:first-child {
    margin-top: 0.25rem !important; /* AJUSTE AQUI */
  }
  
  .laydesk3-sec2-textstack {
    gap: 1.5rem !important; /* AJUSTE AQUI */
  }
  
  /* 2) Reduzir espaço parágrafo → UL */
  ul.laydesk2-sec2-bullets {
    margin-top: 1.5rem !important; /* AJUSTE AQUI */
  }
  
  /* 3) Reduzir espaço UL → botões */
  .laydesk2-sec2-cta {
    margin-top: 1.5rem !important; /* AJUSTE AQUI */
  }
  
  /* 4) Descer o título (respiro no topo) */
  .laydesk3-sec2-container {
    padding-top: 1rem !important; /* AJUSTE AQUI */
    padding-bottom: 1rem !important; /* AJUSTE AQUI */
  }
  
  /* 5) Aumentar vídeo ~20% */
  .laydesk3-sec2-video-container {
    width: min(554px, calc(68.2vh * 9 / 16)) !important; /* AJUSTE AQUI */
    max-width: 554px !important; /* AJUSTE AQUI */
  }
}
```

---

## Observação importante (para evitar confusão)

Algumas classes mencionam `laydesk2` (ex.: `.laydesk2-sec2-textstack`, `.laydesk2-sec2-bullets`) porque são usadas em **múltiplos layouts**. **Não editar fora do bloco laydesk3** — todas as alterações devem estar **somente** no `@media (min-width: 1024px) and (max-height: 579px)`.

