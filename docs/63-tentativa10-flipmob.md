# Documentação: Tentativa 10 – Fallback sem 3D no Mobile para Resolver o Scroll do Lado 1

## 📋 Visão Geral

Depois de **várias tentativas** atuando apenas em CSS (overflow, grid, height, pointer-events, contexto 3D parcial etc.), o scroll do **Lado 1 (Personalização para seu evento)** continua apresentando bug no **mobile** – e, na última etapa, deixou de funcionar em qualquer área.

Enquanto isso:

- ✅ O **Lado 2 (Poderes do Café)** continua com scroll normal.
- ✅ O **visual** atual do Lado 1 e Lado 2 está muito bom no mobile (estrutura em 3 linhas e cards compactos).

**Conclusão desta tentativa**: o problema não é mais de layout básico (grid/altura), mas sim da **combinação de 3D + transform + backface + contexto de empilhamento**, que alguns navegadores mobile (especialmente Safari iOS / Chrome Android) tratam de forma imprevisível para scroll/touch.

👉 Esta Tentativa 10 propõe um **fallback específico para mobile**, simples e robusto:

- **Desligar o efeito 3D no mobile** (sem `rotateY`, sem `preserve-3d`, sem `backface-visibility` atrapalhando).
- Manter o **efeito 3D exatamente como está no desktop** (nenhuma mudança acima de `sm:`).
- Trocar o flip 3D, **apenas no mobile**, por um **switch/tab entre Lado 1 e Lado 2** usando renderização condicional – garantindo scroll 100% confiável.

---

## 1. Diagnóstico Profundo – Por que o Scroll do Lado 1 Insiste em Quebrar

### 1.1. Estrutura Atual (resumo)

Trecho simplificado de `components/flipcard.tsx`:

```tsx
<section className="h-[calc(100vh-4rem)] ...">
  <div className="flip-container h-full">
    <div className={`flip-card-inner h-full ${isFlipped ? 'flipped' : ''}`}>

      {/* LADO 1 */}
      <div className="flip-card-front h-full relative">
        <div className="... h-full grid grid-rows-[auto_1fr_auto] ...">
          <h2>...</h2>
          <div className="... overflow-y-scroll ... scroll-container-lado1">...</div>
          <button>...</button>
        </div>
      </div>

      {/* LADO 2 */}
      <div className="flip-card-back">
        <div className="... h-full grid grid-rows-[auto_1fr_auto] ...">
          <h2>...</h2>
          <div className="... overflow-y-auto ... scroll-container-lado2">...</div>
          <button>...</button>
        </div>
      </div>

    </div>
  </div>
</section>
```

E o CSS 3D:

```css
.flip-container {
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  transition: transform 0.8s ...;
  transform-style: preserve-3d;
}

.flip-card-inner.flipped {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.flip-card-front {
  transform: rotateY(0deg);
}

.flip-card-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
}
```

### 1.2. Sintomas e Pistas

1. **Scroll do Lado 2 sempre funcionou bem**, mesmo antes das últimas mudanças – isso indica que:
   - A altura `h-[calc(100vh-4rem)]` está correta.
   - O problema é **específico** do lado que está na frente (front) dentro do contexto 3D.

2. No Lado 1:
   - Em tentativas anteriores, o scroll funcionava **só perto do botão**.
   - Após unificarmos mais o layout, passou a **não funcionar em nenhum ponto**.

3. Fatores críticos combinados:
   - `transform-style: preserve-3d` no wrapper.
   - `rotateY(180deg)` + `backface-visibility` nos lados.
   - `position: absolute` no back, `relative` no front.
   - Vários containers aninhados com `overflow`, `grid`, `flex`, etc.

Isso casa com **bugs conhecidos** em navegadores mobile: 
scroll/touch dentro de um lado de um card 3D muitas vezes **não é confiável**.

---

## 2. Estratégia da Tentativa 10 – Fallback Sem 3D no Mobile

### 2.1. Ideia Central

Em vez de continuar lutando com o CSS 3D no mobile, vamos adotar um plano mais simples e previsível:

- **Desktop (≥ `sm:`)**: mantém exatamente o flip 3D atual (nenhuma mudança).
- **Mobile (`< sm`)**:
  - **Não usar mais 3D** (`rotateY`, `preserve-3d`, `backface-visibility`) para o conteúdo.
  - Exibir **apenas um lado por vez**, baseado em `isFlipped`, usando renderização condicional simples.
  - Usar scroll vertical normal (`overflow-y-auto`) sem transformações 3D.

Visualmente, no mobile, o usuário continua vendo:

- Um card cheio de conteúdo (Lado 1 ou Lado 2).
- Um botão na parte de baixo que alterna entre Lado 1 ↔ Lado 2.

> A única diferença: no mobile, essa troca será um **fade/switch** simples, não um flip 3D.

### 2.2. Benefícios

- Elimina completamente o contexto 3D no mobile (causa raiz provável do bug).
- Usa scroll nativo padrão (que já se comporta bem no Lado 2).
- Garante total controle sobre a altura/overflow com Tailwind (`h-[calc(100vh-4rem)]` + `grid`/`flex` simples).
- Mantém a experiência do desktop intacta, com o flip 3D atual.

---

## 3. Plano Técnico – Como Implementar o Fallback no Mobile

### 3.1. Passo 1 – Criar Wrapper Condicional por Breakpoint

**Arquivo:** `components/flipcard.tsx`

Adicionar uma detecção de mobile simples via Tailwind, sem lógica de JS de breakpoint:


