# 🔧 Ajustes Realizados no Carrossel

**Data**: Novembro 2025  
**Status**: ✅ Concluído  
**Última atualização**: Correção de detecção do card central

---

## 🎯 Problemas Identificados e Soluções

### 1. ❌ **Problema: Ênfase no Card Errado (Corrigido em 2 iterações)**

**Descrição**: O card em destaque estava aparecendo no lado esquerdo em vez do centro visualmente.

**Causa Original**: 
- O carrossel com `loop: true` estava interferindo na detecção correta do índice
- Faltava inicialização explícita para centralizar no card do meio

**Causa Secundária (Identificada com screenshot)**:
- A lógica usava `selectedScrollSnap()` que retorna o índice do card "snapped"
- Quando 3 cards estão visíveis simultaneamente (desktop), o card "snapped" não é necessariamente o que está **visualmente no centro da viewport**
- O card da esquerda estava sendo detectado como ativo mesmo com o card do meio visualmente centralizado

**✅ Solução Final Implementada**:
```typescript
// Detecção baseada em posição geométrica/visual
const updateCenteredSlide = useCallback(() => {
  if (!emblaApi) return;

  const slides = emblaApi.slideNodes();
  const container = emblaApi.containerNode();
  const containerRect = container.getBoundingClientRect();
  const containerCenter = containerRect.left + containerRect.width / 2;

  let closestIndex = 0;
  let closestDistance = Infinity;

  slides.forEach((slide, index) => {
    const slideRect = slide.getBoundingClientRect();
    const slideCenter = slideRect.left + slideRect.width / 2;
    const distance = Math.abs(containerCenter - slideCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  setSelectedIndex(closestIndex);
}, [emblaApi]);

// Registrar no evento de scroll para atualização contínua
emblaApi.on("scroll", updateCenteredSlide);
```

**Como funciona:**
1. Calcula o **centro da viewport** (container)
2. Para cada card, calcula o **centro do card**
3. Mede a distância entre o centro do card e o centro da viewport
4. O card com **menor distância** é o que está visualmente centralizado
5. Atualiza em tempo real durante scroll, select e reInit

---

### 2. ❌ **Problema: Overflow Cortando Card em Destaque**

**Descrição**: A parte inferior do card centralizado estava sendo cortada quando em destaque.

**Causa**: 
- O container tinha `overflow-hidden` sem padding vertical
- A escala `scale-100` vs `scale-95` fazia o card ativo crescer além dos limites

**✅ Solução Implementada**:
```typescript
// Adicionado padding vertical ao container
<div className="overflow-hidden cursor-grab active:cursor-grabbing py-8">

// Aumentada a escala do card ativo para melhor destaque visual
className={`
  ${
    isActive
      ? "scale-105 opacity-100 shadow-xl border-coffee-500/40"
      : "scale-95 opacity-70 border-coffee-700"
  }
`}
```

---

## 📝 Mudanças Específicas

### Arquivo: `components/sections/services-carousel.tsx`

#### 1. **Configuração do Embla Carousel**
```diff
- loop: true,
+ loop: false,
+ containScroll: "trimSnaps",
```

#### 2. **Container do Carrossel**
```diff
- <div className="overflow-hidden cursor-grab active:cursor-grabbing">
+ <div className="overflow-hidden cursor-grab active:cursor-grabbing py-8">
```

#### 3. **Estilos do Card Ativo**
```diff
- ? "scale-100 opacity-100 shadow-lg border-coffee-500/30"
+ ? "scale-105 opacity-100 shadow-xl border-coffee-500/40"
- : "scale-95 opacity-75 border-coffee-700"
+ : "scale-95 opacity-70 border-coffee-700"
```

#### 4. **Novo Effect para Inicialização**
```typescript
// Inicializar carrossel com card do meio em destaque
useEffect(() => {
  if (!emblaApi || cards.length === 0) return;
  const middleIndex = Math.floor(cards.length / 2);
  emblaApi.scrollTo(middleIndex, true);
}, [emblaApi, cards.length]);
```

#### 5. **Gerenciamento de Estado Aprimorado**
```typescript
const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

const onInit = useCallback((api: EmblaCarouselType) => {
  setScrollSnaps(api.scrollSnapList());
}, []);
```

---

## ✨ Melhorias Visuais Adicionais

### Destaque mais Pronunciado
- **Card ativo**: 
  - Escala: `scale-105` (5% maior)
  - Opacidade: `100%`
  - Sombra: `shadow-xl` (extra grande)
  - Borda: `border-coffee-500/40` (mais visível)

- **Cards inativos**:
  - Escala: `scale-95` (5% menor)
  - Opacidade: `70%` (mais esmaecido)
  - Sombra: `shadow-md` (média)
  - Borda: `border-coffee-700` (discreta)

### Contraste Visual
A diferença entre o card ativo e inativos agora é de **10% em escala** (105% vs 95%), criando um efeito mais dramático e claro.

---

## 🎨 Comportamento Visual

### Antes 
```
[Card Esquerdo - ATIVO ❌]  [Card Centro]  [Card Direita]
     ↑ Problema
```

### Depois
```
[Card Esquerda]  [Card Centro - ATIVO ✅]  [Card Direita]
                      ↑ Card destacado visualmente
                      ↑ Sem corte na parte inferior
```

---

## 🧪 Testes Realizados

- ✅ Card do meio aparece em destaque ao carregar
- ✅ Nenhum corte/overflow na parte inferior
- ✅ Transição suave entre cards
- ✅ Navegação por setas mantém o destaque correto
- ✅ Navegação por dots mantém o destaque correto
- ✅ Arraste com mouse funciona corretamente
- ✅ Responsividade mantida em todos os breakpoints

---

## 📱 Responsividade

O comportamento foi testado e mantido em todos os tamanhos de tela:

- **Mobile (<640px)**: 1 card visível, sempre centralizado
- **Tablet (640-1024px)**: ~1.5 cards visíveis, central em destaque
- **Desktop (>1024px)**: 3 cards visíveis, central em destaque

---

## 🔄 Comportamento do Loop

**Antes**: Loop infinito habilitado  
**Depois**: Loop desabilitado com `containScroll: "trimSnaps"`

**Razão**: Melhor controle do índice selecionado e comportamento mais previsível nas extremidades. O usuário ainda pode navegar para todos os cards, mas o carrossel "para" elegantemente no início e fim.

**Alternativa futura**: Se preferir loop infinito, será necessário implementar lógica adicional de detecção do card central baseada em posição visual em vez de índice.

---

## 💡 Notas Técnicas

### containScroll: "trimSnaps"
Esta opção remove os snaps que não são totalmente alcançáveis, criando uma experiência mais natural nas extremidades do carrossel.

### scrollTo(index, true)
O segundo parâmetro `true` faz a navegação acontecer **sem animação**, ideal para a inicialização.

### py-8 no Container
O padding vertical de `2rem` (32px) é suficiente para acomodar:
- O crescimento de 5% do card ativo
- A sombra `shadow-xl`
- Espaço visual confortável

---

## 📚 Documentação Relacionada

- **Implementação original**: `docs/IMPLEMENTADO-CARROSSEL.md`
- **Documentação técnica completa**: `docs/8-adicionar-carrossel.md`

---

**Ajustes concluídos! O carrossel agora destaca corretamente o card central sem overflow.** ✅

---

## 🔍 **Diferença Técnica: Snap Index vs Visual Position**

### Abordagem Antiga (Incorreta)
```typescript
// Usava apenas o índice do snap
const onSelect = useCallback((api: EmblaCarouselType) => {
  setSelectedIndex(api.selectedScrollSnap());
}, []);
```

**Problema**: O `selectedScrollSnap()` retorna o índice do card que o carrossel "encaixou", mas quando múltiplos cards estão visíveis, esse card pode não estar visualmente no centro da tela.

### Abordagem Nova (Correta) ✅
```typescript
// Calcula qual card está geometricamente no centro
const updateCenteredSlide = useCallback(() => {
  const containerCenter = containerRect.left + containerRect.width / 2;
  
  slides.forEach((slide, index) => {
    const slideCenter = slideRect.left + slideRect.width / 2;
    const distance = Math.abs(containerCenter - slideCenter);
    // Encontra o card mais próximo do centro
  });
}, [emblaApi]);
```

**Vantagem**: Detecta o card que está **visualmente no centro da viewport**, independente de quantos cards estão sendo exibidos simultaneamente.

### Por que isso importa?

Em desktop (lg+), quando 3 cards estão visíveis:
- **Card 1**: Parcialmente visível à esquerda
- **Card 2**: Totalmente visível no centro ✅ (este deve ter zoom)
- **Card 3**: Parcialmente visível à direita

Com a abordagem antiga, o Card 1 poderia ser detectado como "ativo" mesmo estando à esquerda.
Com a nova abordagem, sempre o Card 2 (visualmente centralizado) recebe o destaque! 🎯

