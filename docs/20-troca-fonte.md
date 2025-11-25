# 20 — Implementação da Fonte Montserrat no Título Principal

## 📋 Objetivo

Aplicar a fonte **Montserrat** como fonte padrão no título principal da primeira seção (Hero), substituindo a fonte atual (Playfair Display). A Montserrat será configurada com diferentes pesos e estilos da família tipográfica para garantir uma hierarquia visual adequada e uma experiência de leitura otimizada.

**Mudanças**:
- **Importar Montserrat**: Adicionar a fonte Montserrat do Google Fonts via `next/font/google`
- **Configurar múltiplos pesos**: Configurar pesos 300, 400, 500, 600, 700, 800, 900 e estilos normal/italic
- **Aplicar no título principal**: Substituir `font-serif` por `font-montserrat` no H1 "Café Gourmet e Baristas para Eventos"
- **Definir peso apropriado**: Usar Montserrat Bold (700) ou ExtraBold (800) para o título principal
- **Atualizar variáveis CSS**: Adicionar variável CSS `--font-montserrat` no tema

---

## 🎨 Especificações de Design

### Estado Atual vs Novo Estado

#### ANTES (Estado Atual)

**Arquivo**: `components/hero/Hero.tsx` (linha 69-71)

```tsx
<h1 className="font-serif text-cream-50 font-bold tracking-tight text-center mb-8 md:mb-10 lg:mb-12 text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Características atuais**:
- Fonte: `font-serif` (Playfair Display)
- Peso: `font-bold` (700)
- Tracking: `tracking-tight`
- Transformação: `uppercase`

**Arquivo**: `app/layout.tsx` (linhas 3-10)

```tsx
import { Playfair_Display, Inter } from "next/font/google"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})
```

#### DEPOIS (Novo Estado)

**Arquivo**: `app/layout.tsx`

```tsx
import { Montserrat, Inter } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})
```

**Arquivo**: `components/hero/Hero.tsx`

```tsx
<h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-8 md:mb-10 lg:mb-12 text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Características novas**:
- Fonte: `font-montserrat` (Montserrat)
- Peso: `font-bold` (700) ou `font-extrabold` (800) - a definir conforme preferência visual
- Tracking: `tracking-tight` (mantido)
- Transformação: `uppercase` (mantido)

---

## 🔧 Implementação Técnica

### Passo 1: Importar e Configurar Montserrat no Layout

**Arquivo**: `app/layout.tsx`

**Localização**: Linhas 3-10

**Ação**: 
1. Substituir `Playfair_Display` por `Montserrat` no import
2. Renomear a constante de `playfairDisplay` para `montserrat`
3. Atualizar a variável CSS para `--font-montserrat`
4. Adicionar todos os pesos disponíveis: `["300", "400", "500", "600", "700", "800", "900"]`
5. Adicionar estilos: `style: ["normal", "italic"]`

**Código completo**:

```tsx
import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat, Inter } from "next/font/google"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
```

### Passo 2: Adicionar Variável Montserrat no HTML

**Arquivo**: `app/layout.tsx`

**Localização**: Linha 67 (tag `<html>`)

**Ação**: 
1. Substituir `${playfairDisplay.variable}` por `${montserrat.variable}` na className do elemento `<html>`

**Código**:

```tsx
<html lang="pt-BR" className={`${montserrat.variable} ${inter.variable} scroll-smooth`}>
```

### Passo 3: Atualizar Variável CSS no Tema

**Arquivo**: `app/globals.css`

**Localização**: Linha 80 (dentro de `@theme inline`)

**Ação**: 
1. Adicionar ou atualizar a variável `--font-montserrat` no tema
2. Opcionalmente, manter `--font-serif` se ainda for usada em outros lugares

**Código**:

```css
@theme inline {
  --font-sans: "Inter", system-ui, sans-serif;
  --font-serif: "Playfair Display", Georgia, serif;
  --font-montserrat: var(--font-montserrat), system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;
  /* ... resto do código ... */
}
```

### Passo 4: Aplicar Montserrat no Título Principal

**Arquivo**: `components/hero/Hero.tsx`

**Localização**: Linha 69

**Ação**: 
1. Substituir `font-serif` por `font-montserrat` na className do H1
2. Opcionalmente, ajustar o peso para `font-extrabold` (800) se desejar mais destaque

**Código**:

```tsx
<h1 className="font-montserrat text-cream-50 font-bold tracking-tight text-center mb-8 md:mb-10 lg:mb-12 text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
  Café Gourmet e Baristas para Eventos
</h1>
```

**Alternativa com peso mais forte**:

```tsx
<h1 className="font-montserrat text-cream-50 font-extrabold tracking-tight text-center mb-8 md:mb-10 lg:mb-12 text-2xl md:text-3xl lg:text-4xl uppercase whitespace-nowrap">
  Café Gourmet e Baristas para Eventos
</h1>
```

---

## 📝 Resumo das Alterações

### Arquivos a Modificar

1. **`app/layout.tsx`**
   - Linha 3: Alterar import de `Playfair_Display` para `Montserrat`
   - Linhas 6-10: Renomear constante e atualizar configuração
   - Linha 67: Atualizar className do `<html>` para usar `${montserrat.variable}`

2. **`app/globals.css`**
   - Linha 80: Adicionar `--font-montserrat` nas variáveis do tema

3. **`components/hero/Hero.tsx`**
   - Linha 69: Substituir `font-serif` por `font-montserrat` no H1

### Pesos da Fonte Montserrat Disponíveis

Após a implementação, os seguintes pesos estarão disponíveis via classes Tailwind:

- `font-light` (300) - Light
- `font-normal` (400) - Regular
- `font-medium` (500) - Medium
- `font-semibold` (600) - SemiBold
- `font-bold` (700) - Bold ⭐ **Recomendado para título principal**
- `font-extrabold` (800) - ExtraBold ⭐ **Alternativa mais forte**
- `font-black` (900) - Black

### Estilos Disponíveis

- Normal (padrão)
- `italic` - Para texto em itálico quando necessário

---

## 🎯 Recomendações de Uso

### Para o Título Principal (H1)

**Recomendação**: `font-bold` (700) ou `font-extrabold` (800)

- **font-bold (700)**: Mais equilibrado, mantém legibilidade excelente
- **font-extrabold (800)**: Mais impactante, ideal se quiser mais destaque visual

### Para Outros Elementos (Futuro)

- **Subtítulos (H2, H3)**: `font-semibold` (600) ou `font-bold` (700)
- **Texto de destaque**: `font-medium` (500) ou `font-semibold` (600)
- **Texto normal**: `font-normal` (400)
- **Texto secundário**: `font-light` (300) ou `font-normal` (400)

---

## ✅ Checklist de Implementação

- [ ] Importar `Montserrat` do `next/font/google` em `app/layout.tsx`
- [ ] Configurar `montserrat` com todos os pesos (300-900) e estilos (normal, italic)
- [ ] Adicionar `${montserrat.variable}` na className do `<html>` em `app/layout.tsx`
- [ ] Adicionar `--font-montserrat` nas variáveis CSS em `app/globals.css`
- [ ] Substituir `font-serif` por `font-montserrat` no H1 em `components/hero/Hero.tsx`
- [ ] Testar visualmente e decidir entre `font-bold` (700) ou `font-extrabold` (800)
- [ ] Verificar responsividade em diferentes tamanhos de tela
- [ ] Verificar se a fonte carrega corretamente (sem FOUT - Flash of Unstyled Text)

---

## 🔍 Verificação Pós-Implementação

Após implementar, verificar:

1. **Carregamento da Fonte**: A fonte Montserrat deve carregar sem "flash" de fonte não estilizada
2. **Aparência Visual**: O título deve aparecer com Montserrat, mantendo o estilo uppercase e tracking-tight
3. **Responsividade**: Testar em mobile, tablet e desktop
4. **Performance**: Verificar que a fonte não impacta negativamente o tempo de carregamento

---

## 📚 Referências

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Google Fonts - Montserrat](https://fonts.google.com/specimen/Montserrat)
- [Tailwind CSS Font Weight](https://tailwindcss.com/docs/font-weight)

---

## 💡 Notas Adicionais

- A fonte Montserrat é uma fonte sans-serif moderna e versátil, ideal para títulos e textos de interface
- A configuração inclui todos os pesos para máxima flexibilidade futura
- Se no futuro desejar aplicar Montserrat em outros elementos, basta usar a classe `font-montserrat` com o peso desejado
- A Playfair Display pode ser mantida no projeto se ainda for usada em outros componentes (como nos cards de métricas que usam `font-serif`)

