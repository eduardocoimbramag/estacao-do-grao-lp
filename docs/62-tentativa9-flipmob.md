# Documentação: Tentativa 9 – Unificação Visual dos Lados e Novo Plano de Scroll no FlipCard Mobile

## 📋 Visão Geral

Esta documentação tem **dois objetivos principais**:

- ✅ Deixar o **Lado 2 (Poderes do Café)** visualmente **idêntico ao Lado 1 (Personalização para seu evento)** no **mobile**, mantendo exatamente os mesmos textos e imagens do Lado 2.
- ✅ Propor um **novo plano de scroll** para o Lado 1 que seja mais simples e robusto, evitando os problemas atuais em que o scroll só funciona perto do botão.

**Requisitos fixos**:

- ✅ Todas as mudanças são **apenas para mobile** (`max-width: 639px`).
- ✅ A versão **desktop não pode mudar em nada**.
- ✅ A seção inteira deve continuar com altura fixa: `h-[calc(100vh-4rem)]` (1 viewport incluindo o menu).
- ✅ Não pode haver overflow vertical visível (sem cortes em telas reais, como 360px, 375px, 390px, etc.).

---

## 1. Unificar o Visual do Lado 2 com o Lado 1 (Mobile)

### 1.1. Situação Atual no Código

Trechos simplificados de `components/flipcard.tsx`:

- **Lado 1 – Container interno (já com visual aprovado):**

```tsx
{/* LADO 1 */}
<div className="flip-card-front h-full relative">
  <div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-1.5 sm:p-6 lg:p-7 shadow-2xl h-full grid grid-rows-[auto_1fr_auto] sm:flex sm:flex-col overflow-visible sm:overflow-visible">
    <h2 className="text-2xl ...">PERSONALIZAÇÃO PARA SEU EVENTO</h2>
    <div className="... scroll-container-lado1">...</div>
    <button>...</button>
  </div>
</div>
```

- **Lado 2 – Container interno (ainda diferente no mobile):**

```tsx
{/* LADO 2 */}
<div className="flip-card-back">
  <div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-1.5 sm:p-6 lg:p-7 shadow-2xl h-full flex flex-col">
    <h2 className="text-2xl ...">PODERES DO CAFÉ</h2>
    <div className="space-y-1 ... flex-1 overflow-y-auto ...">
      {/* side2Items */}
    </div>
    <button>...</button>
  </div>
</div>
```

### 1.2. Objetivo Visual

No **mobile**, o Lado 2 deve:

- Ter **exatamente a mesma estrutura** de 3 linhas do Lado 1:
  - Linha 1: título.
  - Linha 2: lista scrollável de cards.
  - Linha 3: botão inferior.
- Usar os **mesmos paddings**, bordas, arredondamento, gaps, tipografia e proporção de imagem.
- Manter **todo o conteúdo** (textos e imagens) do Lado 2 como está.

No **desktop**, nada muda: continua com `flex flex-col` como hoje.

### 1.3. Mudanças Propostas (Apenas Lado 2 – Mobile)

#### 1.3.1. Container Interno – Aplicar Grid como no Lado 1

**Arquivo:** `components/flipcard.tsx`  
**Bloco:** container interno do Lado 2.

```tsx
// ANTES
<div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-1.5 sm:p-6 lg:p-7 shadow-2xl h-full flex flex-col">

// DEPOIS (replicando Lado 1 no mobile)
<div className="bg-coffee-900 border-2 border-coffee-700 rounded-3xl p-1.5 sm:p-6 lg:p-7 shadow-2xl h-full grid grid-rows-[auto_1fr_auto] sm:flex sm:flex-col">
```

- Mobile: usa `grid grid-rows-[auto_1fr_auto]` (igual ao Lado 1).
- Desktop: mantém `sm:flex sm:flex-col` exatamente como hoje.

#### 1.3.2. Container de Scroll do Lado 2 – Classe Dedicada

```tsx
// ANTES
<div className="space-y-1 sm:space-y-2 mb-1.5 sm:mb-3 flex-1 overflow-y-auto max-h-[calc(100vh-240px)] sm:max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-320px)] min-h-0">

// DEPOIS
<div
  className="space-y-1 sm:space-y-2 mb-1.5 sm:mb-3 overflow-y-auto sm:flex-1 sm:max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-320px)] min-h-0 relative scroll-container-lado2"
  style={{
    WebkitOverflowScrolling: 'touch',
    touchAction: 'pan-y',
    position: 'relative',
    zIndex: 1,
  }}
>
```

- Usa o mesmo padrão de scroll base do Lado 1 (WebkitOverflowScrolling, touchAction, etc.).
- A classe `scroll-container-lado2` permitirá aplicar as mesmas regras de grid / altura via CSS, se necessário.

#### 1.3.3. CSS Compartilhado para Lado 1 e Lado 2 (Mobile)

No `<style jsx>` de `flipcard.tsx`, onde hoje já existe:

```css
@media (max-width: 639px) {
  .scroll-container-lado1 {
    grid-row: 2 !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 0 !important;
    pointer-events: auto !important;
  }
}
```

**Ajustar para incluir o Lado 2 também:**  

```css
@media (max-width: 639px) {
  .scroll-container-lado1,
  .scroll-container-lado2 {
    grid-row: 2 !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 0 !important;
    pointer-events: auto !important;
  }
}
```

> **Importante:** Essa alteração é puramente visual/estrutural no mobile. O conteúdo do Lado 2 não muda, apenas a forma de organizar na tela.

---

## 2. Novo Plano de Scroll para o Lado 1 (Mobile)

Apesar das várias tentativas, o Lado 1 ainda apresenta o comportamento estranho:

- Scroll **só funciona perto do botão**.
- Em grande parte da área do card, o gesto de arrastar não dispara scroll.

### 2.1. Hipótese Principal Atualizada

Com base na análise do código atual e nos sintomas:

1. O container `scroll-container-lado1` está corretamente configurado com:
   - `overflow-y-scroll` no mobile, `overflow-y-auto` em telas maiores.
   - `WebkitOverflowScrolling: 'touch'`, `touchAction: 'pan-y'`.
   - Altura controlada via grid (linha do meio).

2. O Lado 2, com estrutura mais simples (`flex-1` + `overflow-y-auto`), **funciona perfeitamente** para scroll.

3. O fato de o scroll funcionar **apenas nas proximidades do botão** indica que:
   - A área de scroll plenamente funcional está mais próxima da borda inferior do card.
   - Pode haver sobreposição/competição de eventos entre a área principal do card e outros elementos da página (ou do contexto 3D).

### 2.2. Estratégia: Simplificar o Scroll no Mobile (Fallback Planejado)


