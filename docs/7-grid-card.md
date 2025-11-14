# 7 — Grid de 3 Cards de Métricas (Primeira Section)

## Contexto do Projeto

### Projeto: Estação do Grão
Landing page da marca **Estação do Grão** — estação de café gourmet para eventos corporativos e premium.

### Stack Técnica
- **Next.js 16** (App Router) com TypeScript
- **React 19**
- **Tailwind CSS v4** com design system inline (`@theme`)
- Componentes reutilizáveis seguindo padrão do projeto
- Paleta de cores: tons de café (coffee-900, coffee-700, coffee-500) e cream-50

### Posicionamento da Section
Esta é a **primeira section após o Hero** (ou pode ser integrada ao Hero, dependendo do design final). Seu objetivo é reforçar **confiança, autoridade e prova social** através de números concretos dos resultados da Estação do Grão.

### Importância Estratégica
- **Prova social imediata**: números grandes chamam atenção e transmitem credibilidade
- **Facilita decisão**: dados concretos ajudam o visitante a entender a escala de atuação
- **SEO e conversão**: métricas reforçam palavras-chave e argumentos de venda
- **Consistência visual**: deve seguir o mesmo padrão de tipografia, cores, espaçamentos e bordas das outras sections

---

## Objetivo da Section de Métricas (Grid de 3 Cards)

### Função Principal
Comunicar de forma **rápida, visual e impactante** os resultados tangíveis da Estação do Grão, utilizando números que demonstram experiência, alcance e confiabilidade.

### Características-chave
1. **Escaneabilidade**: visitante deve captar a informação em 2–3 segundos
2. **Hierarquia visual forte**: números em destaque, labels claras, descrições suaves
3. **Responsividade completa**: funciona perfeitamente em mobile (stack vertical) e desktop (grid horizontal)
4. **Integração com design system**: cores, tipografia e espaçamentos alinhados ao restante do site

### Quando Usar Esta Section
- Logo após o Hero, para reforçar autoridade antes do conteúdo descritivo
- Antes de seções de serviços ou diferenciais, para contextualizar com dados
- Como elemento de transição entre Hero e conteúdo explicativo

---

## Conteúdo dos Cards (Copys e Números)

### Dados dos 3 Cards

| # | Valor Principal | Label/Rótulo | Descrição (opcional) |
|---|-----------------|--------------|----------------------|
| 1 | `+5 mil` | `cafés servidos` | Em experiências únicas para pessoas e empresas. |
| 2 | `+100` | `empresas atendidas` | Times que confiam na Estação do Grão para eventos e rotina. |
| 3 | `+300` | `eventos realizados` | Presenças em feiras, encontros, ações internas e externas. |

### Estrutura de Cada Card

```
┌─────────────────────┐
│                     │
│      +5 mil         │ ← Valor (grande, bold, destaque)
│                     │
│  cafés servidos     │ ← Label (médio, semibold)
│                     │
│  Em experiências    │ ← Descrição (pequeno, suave, opcional)
│  únicas para...     │
│                     │
└─────────────────────┘
```

### Orientações de Conteúdo
- **Valores numéricos**: sempre com símbolos (`+`, `mil`, etc.) para impacto visual
- **Labels**: curtos e diretos (2-3 palavras, no máximo)
- **Descrições**: opcionais; se usadas, máximo de 8-10 palavras
- **Atualização**: manter os números em um único lugar (array de dados) para facilitar updates futuros

---

## Requisitos de UX/UI e Layout do Grid

### 4.1. Layout em Desktop

**Grid de 3 colunas:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
  {/* cards */}
</div>
```

**Características:**
- 3 cards lado a lado em telas ≥768px
- Altura consistente (cards com mesma altura, mesmo que o conteúdo varie)
- Espaçamento entre cards: `gap-6` (24px) ou `gap-8` (32px)
- Alinhamento centralizado com o container da section

**Container:**
```tsx
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* grid */}
</div>
```

### 4.2. Layout em Mobile

**Stack vertical (1 coluna):**
- Cards empilhados um abaixo do outro
- Espaçamento vertical generoso (`gap-6`)
- Largura completa do container
- Números mantêm destaque, mas com tamanho ajustado para mobile

**Breakpoint:**
- Mobile: `< 768px` → 1 coluna
- Tablet/Desktop: `≥ 768px` → 3 colunas

### 4.3. Hierarquia Visual Dentro de Cada Card

**Estrutura de tipografia:**

1. **Número (valor principal)**
   - Tamanho: `text-4xl md:text-5xl lg:text-6xl`
   - Peso: `font-bold`
   - Cor: `text-coffee-500` (dourado/acento) ou `text-cream-50` (claro)
   - Alinhamento: `text-center`

2. **Label (rótulo/descrição curta)**
   - Tamanho: `text-lg md:text-xl`
   - Peso: `font-semibold`
   - Cor: `text-cream-50`
   - Alinhamento: `text-center`

3. **Descrição (subtexto opcional)**
   - Tamanho: `text-sm md:text-base`
   - Peso: `font-normal`
   - Cor: `text-cream-50/70` ou `text-cream-50/80`
   - Alinhamento: `text-center`

**Estilo do Card:**
- Fundo: `bg-coffee-700/50` ou `bg-coffee-900/60`
- Borda: `border border-coffee-500/30`
- Arredondamento: `rounded-xl` ou `rounded-2xl`
- Padding: `p-6 md:p-8`
- Hover: `hover:border-coffee-500/60 transition-colors`
- Sombra (opcional): `shadow-lg` ou `shadow-xl`

### 4.4. Acessibilidade

**Contraste:**
- Fundo escuro (coffee-700/900) + texto claro (cream-50): contraste AA mínimo garantido
- Verificar contraste de `coffee-500` (dourado) em fundos específicos

**Tamanhos de fonte:**
- Mínimo em mobile: `text-sm` (14px) para descrições
- Números sempre grandes e legíveis: mínimo `text-4xl` (36px)

**Semântica HTML:**
```tsx
<section aria-labelledby="metrics-heading">
  <h2 id="metrics-heading" className="sr-only">Nossos Resultados em Números</h2>
  <div className="grid ...">
    {/* cards com estrutura semântica */}
  </div>
</section>
```

**Screen readers:**
- Garantir que números sejam lidos corretamente (ex.: "+5 mil" → "mais de cinco mil")
- Se houver ícones decorativos, usar `aria-hidden="true"`

---

## Orientações Técnicas para Implementação

### 5.1. Nome do Componente

Sugestão: **`MetricsSection`** ou **`StatsSection`**

```tsx
// components/MetricsSection.tsx
```

### 5.2. Interface de Tipos

```ts
type MetricCard = {
  value: string;        // Ex.: "+5 mil"
  label: string;        // Ex.: "cafés servidos"
  description?: string; // Opcional
};
```

### 5.3. Dados dos Cards (Array de Objetos)

```tsx
const METRICS: MetricCard[] = [
  { 
    value: "+5 mil", 
    label: "cafés servidos", 
    description: "Em experiências únicas para pessoas e empresas." 
  },
  { 
    value: "+100", 
    label: "empresas atendidas", 
    description: "Times que confiam na Estação do Grão para eventos e rotina." 
  },
  { 
    value: "+300", 
    label: "eventos realizados", 
    description: "Presenças em feiras, encontros, ações internas e externas." 
  },
];
```

### 5.4. Exemplo de JSX (Estrutura Completa)

```tsx
export default function MetricsSection() {
  const METRICS: MetricCard[] = [
    { 
      value: "+5 mil", 
      label: "cafés servidos", 
      description: "Em experiências únicas para pessoas e empresas." 
    },
    { 
      value: "+100", 
      label: "empresas atendidas", 
      description: "Times que confiam na Estação do Grão para eventos e rotina." 
    },
    { 
      value: "+300", 
      label: "eventos realizados", 
      description: "Presenças em feiras, encontros, ações internas e externas." 
    },
  ];

  return (
    <section 
      id="metricas" 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900"
      aria-labelledby="metrics-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Título oculto para acessibilidade */}
        <h2 id="metrics-heading" className="sr-only">
          Nossos Resultados em Números
        </h2>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {METRICS.map((metric, index) => (
            <div
              key={index}
              className="p-6 md:p-8 bg-coffee-700/50 border border-coffee-500/30 rounded-xl hover:border-coffee-500/60 transition-colors flex flex-col items-center text-center gap-3"
            >
              {/* Valor/Número */}
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-coffee-500">
                {metric.value}
              </div>

              {/* Label */}
              <div className="text-lg md:text-xl font-semibold text-cream-50">
                {metric.label}
              </div>

              {/* Descrição (opcional) */}
              {metric.description && (
                <p className="text-sm md:text-base text-cream-50/70 leading-relaxed">
                  {metric.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 5.5. Integração na Página Principal

```tsx
// app/page.tsx
import Header from "@/components/header"
import Hero from "@/components/hero/Hero"
import MetricsSection from "@/components/MetricsSection"  // ← NOVO
import Services from "@/components/services"
// ... outros imports

export default function Home() {
  return (
    <main className="min-h-screen bg-coffee-900">
      <Header />
      <Hero />
      <MetricsSection />  {/* ← ADICIONAR AQUI */}
      <Services />
      {/* ... outras sections */}
    </main>
  )
}
```

---

## Padrões de Estilo e Consistência com o Projeto

### 6.1. Tipografia

**Fontes do projeto:**
```css
--font-sans: "Inter", system-ui, sans-serif;       /* corpo de texto */
--font-serif: "Playfair Display", Georgia, serif; /* títulos */
```

**Uso nesta section:**
- Números: `font-sans` (Inter) → melhor legibilidade para números
- Labels: `font-serif` (Playfair Display) → elegância
- Descrições: `font-sans` (Inter) → leitura fluida

**Classes Tailwind:**
```tsx
// Número
className="font-sans font-bold text-5xl"

// Label
className="font-serif font-semibold text-xl"

// Descrição
className="font-sans font-normal text-sm"
```

### 6.2. Cores (Paleta do Projeto)

**Tokens disponíveis:**
```css
--color-coffee-900: #331b09;  /* fundo escuro principal */
--color-coffee-700: #573819;  /* fundo médio, bordas */
--color-coffee-500: #a7834c;  /* acento dourado (CTA, destaque) */
--color-cream-50: #eff0e0;    /* texto claro */
```

**Uso recomendado:**
- Fundo da section: `bg-coffee-900` (padrão do site)
- Fundo dos cards: `bg-coffee-700/50` (translúcido) ou `bg-coffee-900/60`
- Bordas: `border-coffee-500/30` (sutil) → `hover:border-coffee-500/60` (destaque)
- Números: `text-coffee-500` (dourado) ou `text-cream-50` (claro)
- Texto: `text-cream-50` (principal) ou `text-cream-50/70` (secundário)

**Não criar cores novas**: reutilizar os tokens existentes para manter consistência.

### 6.3. Espaçamentos (Spacing Scale)

**Padrões do projeto:**
- Padding vertical de sections: `py-20` (80px)
- Padding horizontal: `px-4 sm:px-6 lg:px-8` (responsivo)
- Gap entre cards: `gap-6` (24px) ou `gap-8` (32px)
- Padding interno de cards: `p-6 md:p-8` (24px → 32px)

**Aplicar na section:**
```tsx
<section className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <div className="grid gap-6 lg:gap-8">
      <div className="p-6 md:p-8"> {/* card */}
```

### 6.4. Radius, Bordas e Sombras

**Padrões do projeto:**
- Radius: `rounded-xl` (12px) ou `rounded-2xl` (16px)
- Bordas: `border border-{color}/{opacity}`
- Sombras: `shadow-lg` ou `shadow-xl` (opcional, usado em cards de destaque)

**Consistência visual:**
- Cards de métricas: `rounded-xl` (mesmo padrão de outros cards do site)
- Bordas com opacidade: `border-coffee-500/30` (sutil, elegante)
- Hover suave: `transition-colors` (200ms)

**Exemplo:**
```tsx
className="rounded-xl border border-coffee-500/30 hover:border-coffee-500/60 transition-colors"
```

---

## Boas Práticas, Erros Comuns e Checklist

### 7.1. Boas Práticas

**Conteúdo:**
- ✅ Manter textos enxutos (números impactam, não palavras longas)
- ✅ Atualizar números facilmente: centralizar dados em um array ou CMS
- ✅ Usar símbolos (`+`, `mil`, `%`) para reforçar grandeza

**Código:**
- ✅ Componente reutilizável: aceitar `METRICS` como prop (opcional)
- ✅ TypeScript: definir interface `MetricCard` claramente
- ✅ Acessibilidade: incluir `sr-only` heading e ARIA labels quando necessário

**Design:**
- ✅ Testar em múltiplos breakpoints: 360px, 768px, 1024px, 1440px, 1920px
- ✅ Garantir que cards tenham altura consistente (uso de `flex` + `items-center`)
- ✅ Evitar overflow de texto: testar com descrições mais longas

### 7.2. Erros Comuns a Evitar

❌ **Quebrar consistência visual**
- Não usar cores fora da paleta existente
- Não inventar novos tamanhos de fonte ou radius sem motivo

❌ **Textos muito longos**
- Descrições com +15 palavras quebram o layout mobile
- Labels com +4 palavras perdem impacto visual

❌ **Contraste inadequado**
- Não usar `coffee-500` (dourado) sobre `coffee-700` sem validar contraste
- Sempre testar com ferramentas de acessibilidade (WebAIM, Axe)

❌ **Ignorar responsividade**
- Não assumir que "funciona no desktop" = "funciona no mobile"
- Sempre testar stack vertical em telas pequenas

❌ **Hardcoding de dados**
- Não espalhar os números pelo JSX; centralizar em array
- Facilita manutenção e futuras integrações (CMS, API)

### 7.3. Checklist Rápido para Dev/Designer

**Antes de Commitar:**

- [ ] Section criada usando componentes base de layout do projeto
- [ ] Grid com 3 colunas em desktop (`md:grid-cols-3`)
- [ ] Stack de 1 coluna em mobile (comportamento padrão)
- [ ] Números, labels e descrições conferidos com valores oficiais
- [ ] Tipografia seguindo padrão: font-serif para labels, font-sans para números
- [ ] Cores exclusivamente da paleta existente (coffee-*, cream-*)
- [ ] Espaçamentos alinhados: `py-20`, `px-4/6/8`, `gap-6/8`, `p-6/8`
- [ ] Borders e radius consistentes: `rounded-xl`, `border-coffee-500/30`
- [ ] Hover states implementados: `hover:border-coffee-500/60`
- [ ] Acessibilidade validada: contraste AA, ARIA labels, semantic HTML
- [ ] Testado em breakpoints: 360px, 768px, 1024px, 1440px
- [ ] Cards com altura consistente em desktop
- [ ] Textos não causam overflow ou quebras visuais
- [ ] Componente aceita props (opcional, mas recomendado para flexibilidade)

**Antes do Deploy:**

- [ ] Lighthouse rodado: Performance 90+, Accessibility 100, SEO 100
- [ ] Teste em navegadores: Chrome, Firefox, Safari (desktop + mobile)
- [ ] Validação de cliente: números e copys aprovados
- [ ] Integração com outras sections: sem espaçamentos estranhos ou sobreposições

---

## Variações e Extensões (Futuro)

### Possíveis Evoluções

**Animações ao entrar no viewport:**
```tsx
// Usando Intersection Observer ou lib como Framer Motion
className="opacity-0 animate-fade-in-up"
```

**Ícones decorativos:**
```tsx
import { Coffee, Users, Calendar } from "lucide-react"

<div className="flex flex-col items-center gap-2">
  <Coffee className="w-12 h-12 text-coffee-500" />
  <div className="text-5xl font-bold">{metric.value}</div>
</div>
```

**Modo "contador" (números animados):**
```tsx
// Usar lib como react-countup
<CountUp end={5000} duration={2} separator="." suffix=" mil" />
```

**Integração com CMS:**
```tsx
// Buscar dados de API/CMS
const metrics = await fetchMetrics();
```

---

## Referências e Recursos

### Documentação Relacionada
- `docs/3-cor-bg.md` — Paleta de cores do projeto
- `docs/4-mudar-cor-card.md` — Padrões de cards
- `app/globals.css` — Tokens de design (linhas 77-103)

### Ferramentas Úteis
- **Contraste**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Responsividade**: Chrome DevTools (Device Toolbar)
- **Acessibilidade**: Axe DevTools, Lighthouse

### Componentes de Referência no Projeto
- `components/differentials.tsx` — Grid de 3 colunas com cards
- `components/audience.tsx` — Padrão de espaçamentos e tipografia
- `components/OpenMenuIntro.tsx` — Container `max-w-6xl` e padding

---

## Exemplo Visual (ASCII)

### Desktop (3 colunas)

```
┌────────────────────────────────────────────────────────────┐
│                      METRICS SECTION                       │
├──────────────────┬──────────────────┬──────────────────────┤
│                  │                  │                      │
│     +5 mil       │      +100        │       +300           │
│                  │                  │                      │
│ cafés servidos   │ empresas         │  eventos             │
│                  │   atendidas      │  realizados          │
│                  │                  │                      │
│ Em experiências  │ Times que        │ Presenças em         │
│ únicas para...   │ confiam...       │ feiras...            │
│                  │                  │                      │
└──────────────────┴──────────────────┴──────────────────────┘
```

### Mobile (1 coluna, stack)

```
┌──────────────────┐
│                  │
│     +5 mil       │
│                  │
│ cafés servidos   │
│                  │
│ Em experiências  │
│ únicas para...   │
│                  │
├──────────────────┤
│                  │
│      +100        │
│                  │
│ empresas         │
│   atendidas      │
│                  │
│ Times que        │
│ confiam...       │
│                  │
├──────────────────┤
│                  │
│      +300        │
│                  │
│  eventos         │
│  realizados      │
│                  │
│ Presenças em     │
│ feiras...        │
│                  │
└──────────────────┘
```

---

## Resumo Executivo

Esta documentação define a implementação de uma **section de métricas (grid de 3 cards)** para a landing page da Estação do Grão. Os objetivos principais são:

1. **Reforçar confiança** através de números concretos (+5 mil cafés, +100 empresas, +300 eventos)
2. **Manter consistência** com o design system existente (cores, tipografia, espaçamentos)
3. **Garantir acessibilidade** (contraste AA, ARIA labels, semantic HTML)
4. **Responsividade total** (3 colunas desktop, 1 coluna mobile)

A section deve ser implementada como componente React (`MetricsSection.tsx`), com dados centralizados em array de objetos, seguindo estritamente os padrões visuais já aplicados nas outras sections do projeto.

---

**Arquivo:** `docs/7-grid-card.md`  
**Criado em:** 14/11/2025  
**Versão:** 1.0  
**Status:** 📝 Documentação completa — Pronta para implementação

