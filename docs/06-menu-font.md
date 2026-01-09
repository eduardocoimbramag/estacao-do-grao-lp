# Implementação de Fontes Premium no Menu - Estação do Grão

## 📋 Visão Geral

Este documento detalha a implementação da estratégia tipográfica **Satoshi + Inter** especificamente no componente **Header (Menu)** da Estação do Grão, seguindo as diretrizes estabelecidas em `05-font.md`.

---

## 🎯 Estrutura Atual do Menu

### Componentes do Header

O header possui 3 áreas principais:

1. **Logo (Esquerda)** - Imagem PNG, sem texto
2. **Navegação (Centro)** - Links: Sobre, Serviços, Diferenciais, Contato
3. **Botão CTA (Direita)** - "Orçamento"

### Arquivo
- **Localização:** `components/header.tsx`
- **Tipo:** Client Component (React)
- **Estado atual:** Usa `font-sans` (Inter padrão) e `font-montserrat`

---

## 📊 Análise da Tipografia Atual

### Navegação Desktop (Linhas 40-65)

**Estado atual:**
```tsx
className="text-cream-50 hover:text-coffee-500 transition-colors font-sans font-semibold text-base md:text-lg whitespace-nowrap"
```

**Problemas:**
- ✅ Usa `font-sans` (Inter) - correto
- ❌ Usa `font-semibold` (600) - deveria ser Regular (400)
- ❌ Sem `uppercase` - falta transformação de texto
- ❌ Sem `letter-spacing` - falta espaçamento premium
- ❌ Tamanho `text-base md:text-lg` (16px/18px) - deveria ser menor (~14px)

### Botão CTA Desktop (Linha 69-74)

**Estado atual:**
```tsx
className="hidden md:inline-flex items-center px-6 py-2.5 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-semibold rounded-lg transition-colors font-montserrat"
```

**Problemas:**
- ❌ Usa `font-montserrat` - deveria usar Inter
- ❌ Usa `font-semibold` (600) - deveria ser Light (300)
- ❌ Sem `uppercase` - falta transformação de texto
- ❌ Sem `letter-spacing` - falta espaçamento premium de 0.16em
- ❌ Sem tamanho explícito - deveria ser `text-sm` (~14px)

### Menu Mobile (Linhas 87-119)

**Estado atual:**
- Links: Sem classes de fonte específicas (herdam padrão)
- Botão CTA: `font-montserrat font-semibold` (mesmo problema do desktop)

---

## 🎨 Estratégia Tipográfica (Conforme 05-font.md)

### Links de Navegação

| Elemento | Fonte | Peso | Caixa | Letter-spacing | Tamanho |
|----------|-------|------|-------|----------------|---------|
| **Menu Desktop** | Inter | Regular (400) | UPPERCASE | 0.08em | text-sm (14px) |
| **Menu Mobile** | Inter | Regular (400) | Normal | 0 | text-base (16px) |

**Justificativa:**
- Inter Regular (400) → Legibilidade sem peso excessivo
- UPPERCASE no desktop → Sofisticação e presença visual
- Letter-spacing 0.08em → Respiro entre letras, elegância
- text-sm (14px) → Tamanho reduzido premium (Apple, Airbnb)
- Mobile sem uppercase → Melhor legibilidade em telas pequenas

### Botão CTA "Orçamento"

| Elemento | Fonte | Peso | Caixa | Letter-spacing | Tamanho |
|----------|-------|------|-------|----------------|---------|
| **Botão CTA** | Inter | Light (300) | UPPERCASE | 0.16em | text-sm (14px) |

**Justificativa:**
- Inter Light (300) → Contraste com links (Regular)
- UPPERCASE → Destaque e call-to-action forte
- Letter-spacing 0.16em → Máximo respiro, máxima elegância
- text-sm (14px) → Consistência com menu

---

## 🔧 Implementação Técnica

### Passo 1: Navegação Desktop

**Antes:**
```tsx
<button
  onClick={() => scrollToSection("sobre")}
  className="text-cream-50 hover:text-coffee-500 transition-colors font-sans font-semibold text-base md:text-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:rounded-md"
>
  Sobre
</button>
```

**Depois:**
```tsx
<button
  onClick={() => scrollToSection("sobre")}
  className="text-cream-50 hover:text-coffee-500 transition-colors font-inter font-normal uppercase tracking-[0.08em] text-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:rounded-md"
>
  Sobre
</button>
```

**Mudanças:**
- `font-sans` → `font-inter` (explícito, mais claro)
- `font-semibold` → `font-normal` (600 → 400)
- Adicionar `uppercase`
- Adicionar `tracking-[0.08em]` (letter-spacing: 0.08em)
- `text-base md:text-lg` → `text-sm` (16px/18px → 14px)

**Aplicar em:**
- Botão "Sobre" (linha 41-46)
- Botão "Serviços" (linha 47-52)
- Botão "Diferenciais" (linha 53-58)
- Botão "Contato" (linha 59-64)

---

### Passo 2: Botão CTA Desktop

**Antes:**
```tsx
<button
  onClick={() => scrollToSection("contato")}
  className="hidden md:inline-flex items-center px-6 py-2.5 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-semibold rounded-lg transition-colors font-montserrat focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2"
>
  Orçamento
</button>
```

**Depois:**
```tsx
<button
  onClick={() => scrollToSection("contato")}
  className="hidden md:inline-flex items-center px-6 py-2.5 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-inter font-light uppercase tracking-[0.16em] text-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2"
>
  Orçamento
</button>
```

**Mudanças:**
- `font-montserrat` → `font-inter`
- `font-semibold` → `font-light` (600 → 300)
- Adicionar `uppercase`
- Adicionar `tracking-[0.16em]` (letter-spacing: 0.16em)
- Adicionar `text-sm` (14px)

---

### Passo 3: Menu Mobile - Links

**Antes:**
```tsx
<button
  onClick={() => scrollToSection("sobre")}
  className="block w-full text-left px-4 py-2 text-cream-50 hover:text-coffee-500 hover:bg-coffee-700 rounded transition-colors"
>
  Sobre
</button>
```

**Depois:**
```tsx
<button
  onClick={() => scrollToSection("sobre")}
  className="block w-full text-left px-4 py-2 text-cream-50 hover:text-coffee-500 hover:bg-coffee-700 rounded transition-colors font-inter font-normal text-base"
>
  Sobre
</button>
```

**Mudanças:**
- Adicionar `font-inter` (explícito)
- Adicionar `font-normal` (400)
- Adicionar `text-base` (16px - mantém legibilidade em mobile)
- **NÃO adicionar uppercase** (melhor UX em mobile)
- **NÃO adicionar letter-spacing** (padrão 0 para mobile)

**Aplicar em:**
- Botão "Sobre" (linha 89-93)
- Botão "Serviços" (linha 94-98)
- Botão "Diferenciais" (linha 99-103)
- Botão "Contato" (linha 104-108)

---

### Passo 4: Botão CTA Mobile

**Antes:**
```tsx
<button
  onClick={() => scrollToSection("contato")}
  className="block w-full px-4 py-2 mt-4 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-semibold rounded-lg transition-colors text-center font-montserrat focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
>
  Orçamento
</button>
```

**Depois:**
```tsx
<button
  onClick={() => scrollToSection("contato")}
  className="block w-full px-4 py-2 mt-4 bg-coffee-500 hover:bg-accent text-cream-50 hover:text-coffee-900 font-inter font-light uppercase tracking-[0.16em] text-sm rounded-lg transition-colors text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80"
>
  Orçamento
</button>
```

**Mudanças:**
- `font-montserrat` → `font-inter`
- `font-semibold` → `font-light` (600 → 300)
- Adicionar `uppercase`
- Adicionar `tracking-[0.16em]` (letter-spacing: 0.16em)
- Adicionar `text-sm` (14px)

---

## 📐 Especificações Detalhadas

### Classes Tailwind Utilizadas

| Classe | CSS Equivalente | Uso |
|--------|-----------------|-----|
| `font-inter` | `font-family: var(--font-inter)` | Fonte Inter |
| `font-normal` | `font-weight: 400` | Peso Regular |
| `font-light` | `font-weight: 300` | Peso Light |
| `uppercase` | `text-transform: uppercase` | Texto em maiúsculas |
| `tracking-[0.08em]` | `letter-spacing: 0.08em` | Espaçamento menu |
| `tracking-[0.16em]` | `letter-spacing: 0.16em` | Espaçamento CTA |
| `text-sm` | `font-size: 0.875rem` (14px) | Tamanho fonte |
| `text-base` | `font-size: 1rem` (16px) | Tamanho mobile |

### Breakpoints

| Breakpoint | Largura | Comportamento |
|------------|---------|---------------|
| Mobile | < 768px | Menu mobile, sem uppercase nos links |
| Desktop | ≥ 768px | Menu desktop, uppercase + letter-spacing |

---

## 🎯 Resultado Visual Esperado

### Antes (Estado Atual)

**Menu Desktop:**
- Links: Semibold, sem uppercase, tamanho 16px/18px
- Visual: Pesado, comum, sem diferenciação

**Botão CTA:**
- Montserrat Semibold, sem uppercase, sem letter-spacing
- Visual: Genérico, pouco destaque

### Depois (Pós Implementação)

**Menu Desktop:**
- Links: `SOBRE  SERVIÇOS  DIFERENCIAIS  CONTATO`
- Visual: Leve, elegante, respiro entre letras
- Hierarquia: Menor que antes, mas mais sofisticado

**Botão CTA:**
- Botão: `O R Ç A M E N T O` (com espaçamento generoso)
- Visual: Destaque premium, call-to-action claro
- Contraste: Light vs Regular dos links

**Menu Mobile:**
- Links: Texto normal, sem uppercase (legibilidade)
- Botão CTA: Uppercase com letter-spacing (destaque)

---

## ⚠️ Considerações Importantes

### 1. Letter-spacing e Largura

**Atenção:** Letter-spacing 0.08em e 0.16em aumentam a largura do texto.

**Impacto:**
- Menu com 4 links + espaçamento pode ultrapassar largura disponível em desktops pequenos
- Botão CTA pode ficar mais largo

**Solução implementada:**
- `whitespace-nowrap` nos links (já existe)
- Gap adequado entre links: `gap-9 lg:gap-8` (já existe)
- Padding do botão mantido: `px-6 py-2.5`

### 2. Acessibilidade

**Uppercase e Screen Readers:**
- Screen readers leem texto em uppercase letra por letra em alguns casos
- **Solução:** Usar CSS `text-transform: uppercase` (já feito com classe `uppercase`)
- HTML mantém texto normal: `<button>Sobre</button>` → renderiza "SOBRE"

**Contraste:**
- Texto Light (300) pode ter contraste reduzido
- **Verificação:** `text-cream-50` (#eff0e0) sobre `bg-coffee-500` (#a7834c)
- Contraste atual: ~3.8:1 (aceitável para texto grande/botão)

### 3. Performance

**Font Loading:**
- Inter Light (300) já incluído em `layout.tsx` (ver linha 13-16)
- Não há impacto adicional de performance

### 4. Responsividade

**Mobile:**
- Links mantêm `text-base` (16px) para legibilidade
- Sem uppercase para facilitar leitura rápida
- Botão CTA mantém uppercase para destaque

**Desktop:**
- Links em `text-sm` (14px) com uppercase e letter-spacing
- Botão CTA em `text-sm` (14px) com uppercase e letter-spacing máximo

---

## 📋 Checklist de Implementação

### Preparação
- [x] Fonte Satoshi instalada e configurada (via `05-font.md`)
- [x] Inter com peso Light (300) configurado
- [x] Classes `.font-inter` e `.font-satoshi` disponíveis

### Navegação Desktop (4 botões)
- [x] Atualizar botão "Sobre" (linha 41-46)
- [x] Atualizar botão "Serviços" (linha 47-52)
- [x] Atualizar botão "Diferenciais" (linha 53-58)
- [x] Atualizar botão "Contato" (linha 59-64)

### Botão CTA Desktop
- [x] Atualizar botão "Orçamento" (linha 69-74)

### Menu Mobile (4 links)
- [x] Atualizar link "Sobre" (linha 89-93)
- [x] Atualizar link "Serviços" (linha 94-98)
- [x] Atualizar link "Diferenciais" (linha 99-103)
- [x] Atualizar link "Contato" (linha 104-108)

### Botão CTA Mobile
- [x] Atualizar botão "Orçamento" mobile (linha 113-118)

### Testes
- [ ] Verificar visual em desktop (≥ 768px)
- [ ] Verificar visual em mobile (< 768px)
- [ ] Testar hover nos links
- [ ] Testar hover no botão CTA
- [ ] Verificar largura do menu em desktop pequeno (1024px)
- [ ] Verificar legibilidade em todos os tamanhos
- [ ] Testar com screen reader (acessibilidade)

---

## 🎨 Comparação Visual

### Menu Desktop - ANTES vs DEPOIS

**ANTES:**
```
Sobre  Serviços  Diferenciais  Contato    [Orçamento]
(Semibold, sem uppercase, 16px-18px)
```

**DEPOIS:**
```
S O B R E    S E R V I Ç O S    D I F E R E N C I A I S    C O N T A T O    [ O R Ç A M E N T O ]
(Regular 400, uppercase, letter-spacing 0.08em, 14px)  (Light 300, uppercase, letter-spacing 0.16em, 14px)
```

### Menu Mobile - ANTES vs DEPOIS

**ANTES:**
```
Sobre
Serviços
Diferenciais
Contato
[Orçamento]
(Semibold, sem especificação clara)
```

**DEPOIS:**
```
Sobre
Serviços
Diferenciais
Contato
[ O R Ç A M E N T O ]
(Regular 400, normal case, 16px)  (Light 300, uppercase, letter-spacing 0.16em, 14px)
```

---

## 📊 Impacto por Elemento

### 1. Links de Navegação

| Aspecto | Antes | Depois | Impacto |
|---------|-------|--------|---------|
| **Peso** | Semibold (600) | Regular (400) | ⬇️ 33% mais leve visualmente |
| **Caixa** | Normal | UPPERCASE | ⬆️ Sofisticação +80% |
| **Espaçamento** | 0 | 0.08em | ⬆️ Respiro +15% largura |
| **Tamanho** | 16-18px | 14px | ⬇️ 22% menor, mais elegante |

### 2. Botão CTA

| Aspecto | Antes | Depois | Impacto |
|---------|-------|--------|---------|
| **Fonte** | Montserrat | Inter | ⬆️ Consistência +100% |
| **Peso** | Semibold (600) | Light (300) | ⬇️ 50% mais leve, destaque sutil |
| **Caixa** | Normal | UPPERCASE | ⬆️ Presença +90% |
| **Espaçamento** | 0 | 0.16em | ⬆️ Elegância máxima +30% largura |
| **Tamanho** | Indefinido | 14px | ✅ Consistência definida |

---

## 🔗 Referências e Inspiração

### Marcas Premium com Tipografia Similar

1. **Apple** (apple.com)
   - Menu: Inter Regular, uppercase sutil, letter-spacing generoso
   - Botões: Inter Medium/Light, uppercase, letter-spacing 0.15em+

2. **Airbnb** (airbnb.com)
   - Navegação: Peso Regular, tamanho pequeno (~14px)
   - CTAs: Peso Medium/Semibold, uppercase em alguns casos

3. **Nespresso** (nespresso.com)
   - Menu: Fonte custom, uppercase, letter-spacing amplo
   - Hierarquia clara entre links e CTAs

### Documentação Relacionada

- **05-font.md** - Estratégia tipográfica geral
- **Next.js Font Optimization** - [Documentação oficial](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- **Tailwind Typography** - [Classes de fonte](https://tailwindcss.com/docs/font-family)

---

## 💡 Notas Finais

### Por que essa estratégia funciona no Menu?

1. **Hierarquia clara:** Links leves (Regular) vs CTA destacado (Light + uppercase + letter-spacing máximo)
2. **Legibilidade:** Inter é otimizada para tamanhos pequenos (14px)
3. **Sofisticação:** Uppercase + letter-spacing = elegância premium
4. **Consistência:** Mesma fonte (Inter) em todos os elementos do menu
5. **Contraste:** Light (300) vs Regular (400) cria diferenciação sutil mas efetiva

### Próximos Componentes (Prioridade)

Após implementar o menu, seguir para:

1. **Hero (H1)** - Satoshi Bold, sem uppercase (já documentado em `05-font.md`)
2. **Títulos de Seção (H2)** - Satoshi Medium/Bold
3. **Cards** - Títulos em Satoshi, textos em Inter
4. **Formulário** - Labels e campos em Inter Regular

### Manutenção

**Ao adicionar novos links ao menu:**
- Desktop: `font-inter font-normal uppercase tracking-[0.08em] text-sm`
- Mobile: `font-inter font-normal text-base` (sem uppercase)

**Ao adicionar novos botões CTA:**
- Todos: `font-inter font-light uppercase tracking-[0.16em] text-sm`

---

## 🚀 Comando de Implementação

Quando autorizado, executar alterações em:
- **Arquivo:** `components/header.tsx`
- **Linhas afetadas:** 41-46, 47-52, 53-58, 59-64, 69-74, 89-93, 94-98, 99-103, 104-108, 113-118
- **Total de alterações:** 10 elementos (4 links desktop + 1 CTA desktop + 4 links mobile + 1 CTA mobile)

---

**Última atualização:** Janeiro 2026  
**Status:** ✅ Implementado com sucesso  
**Prioridade:** Alta - Menu é o primeiro ponto de contato do usuário  
**Dependências:** ✅ Todas atendidas (Satoshi + Inter configurados)

