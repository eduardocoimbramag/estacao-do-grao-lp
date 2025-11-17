# 10 — Nova Seção: Regiões Atendidas (Seção 4)

## 📋 Objetivo

Reformular completamente a **Seção 4** (`components/audience.tsx`) para criar um layout dividido ao meio, com:
- **Lado esquerdo**: Imagem de mapa (800x800px)
- **Lado direito**: Informações sobre regiões de atendimento
- **Título centralizado**: "REGIÕES ATENDIDAS" em branco
- **Manter**: Cor de fundo `bg-coffee-900`

---

## 🎨 Especificações de Design

### Layout

```
┌─────────────────────────────────────────────┐
│         REGIÕES ATENDIDAS (título)          │
├──────────────────┬──────────────────────────┤
│                  │                          │
│   [IMAGEM DO     │  📍 Atendemos toda a     │
│    MAPA 800x800] │  região do Nordeste a    │
│                  │  partir de 100 doses.    │
│                  │                          │
│                  │  🌎 Atendemos todo o     │
│                  │  Brasil a partir de      │
│                  │  3.000 doses.            │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

### Cores

- **Fundo da seção**: `bg-coffee-900` (`#331b09`)
- **Título principal**: `text-white` (branco puro)
- **Texto descritivo**: `text-cream-50` (`#eff0e0`)
- **Destaque numérico**: `text-coffee-500` (`#a7834c`) — dourado

### Tipografia

- **Título "REGIÕES ATENDIDAS"**:
  - Fonte: `font-serif` (Playfair Display)
  - Tamanho: `text-3xl sm:text-4xl lg:text-5xl`
  - Peso: `font-bold`
  - Cor: `text-white`
  - Alinhamento: `text-center`
  - Espaçamento inferior: `mb-12 sm:mb-16`

- **Parágrafos de texto**:
  - Fonte: `font-sans` (Inter)
  - Tamanho: `text-base sm:text-lg lg:text-xl`
  - Cor: `text-cream-50`
  - Espaçamento de linha: `leading-relaxed`

---

## 📁 Estrutura de Arquivos

### 1. Imagem do Mapa

**Nome do arquivo**: `mapa-estacao-grao.png`

**Especificações**:
- Dimensões: **800x800 pixels**
- Formato: **PNG** (com transparência se necessário)
- Localização: `public/mapa-estacao-grao.png`

**Como adicionar**:
```bash
# Coloque a imagem na pasta public na raiz do projeto:
# 📁 ESTACAO-DO-GRAO-LADINGPAGE/
#   └─ public/
#      └─ mapa-estacao-grao.png
```

**Uso no código**:
```tsx
import Image from "next/image"

<Image
  src="/mapa-estacao-grao.png"
  alt="Mapa de regiões atendidas pela Estação do Grão"
  width={800}
  height={800}
  className="rounded-xl shadow-2xl"
/>
```

### 2. Componente

**Arquivo**: `components/audience.tsx`

Este arquivo precisa ser **completamente reformulado**.

---

## 💻 Implementação

### Estrutura HTML/JSX

```tsx
import Image from "next/image"

export default function Audience() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-coffee-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Título Principal Centralizado */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-16">
          REGIÕES ATENDIDAS
        </h2>

        {/* Grid de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Imagem do Mapa */}
          <div className="flex justify-center">
            <Image
              src="/mapa-estacao-grao.png"
              alt="Mapa de regiões atendidas pela Estação do Grão no Nordeste e Brasil"
              width={800}
              height={800}
              className="rounded-xl shadow-2xl w-full max-w-md lg:max-w-full"
              priority={false}
            />
          </div>

          {/* Coluna Direita: Texto sobre Cobertura */}
          <div className="space-y-8">
            
            {/* Nordeste - 100 doses */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed">
                📍 Atendemos toda a <strong className="text-coffee-500">região do Nordeste</strong> a partir de{" "}
                <strong className="text-coffee-500 font-bold">100 doses</strong>.
              </p>
            </div>

            {/* Brasil - 3.000 doses */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed">
                🌎 Atendemos <strong className="text-coffee-500">todo o Brasil</strong> a partir de{" "}
                <strong className="text-coffee-500 font-bold">3.000 doses</strong>.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
```

---

## 📱 Responsividade

### Mobile (< 1024px)

- Grid de **1 coluna**
- Imagem aparece **acima** do texto
- Imagem com largura máxima de `max-w-md` (448px)
- Espaçamento entre elementos: `gap-8`
- Padding: `px-4 py-16`

### Desktop (≥ 1024px)

- Grid de **2 colunas** (`lg:grid-cols-2`)
- Imagem à **esquerda**, texto à **direita**
- Imagem com largura total disponível (`max-w-full`)
- Espaçamento entre colunas: `lg:gap-12`
- Padding: `lg:px-8 lg:py-24`
- Alinhamento vertical centralizado: `items-center`

---

## 🎯 Conteúdo de Texto

### Texto 1: Nordeste

```
📍 Atendemos toda a região do Nordeste a partir de 100 doses.
```

**Formatação**:
- "região do Nordeste" → `text-coffee-500` (dourado)
- "100 doses" → `text-coffee-500 font-bold` (dourado + negrito)

### Texto 2: Brasil

```
🌎 Atendemos todo o Brasil a partir de 3.000 doses.
```

**Formatação**:
- "todo o Brasil" → `text-coffee-500` (dourado)
- "3.000 doses" → `text-coffee-500 font-bold` (dourado + negrito)

---

## 🔧 Classes Tailwind Utilizadas

### Container Principal
```tsx
className="py-16 sm:py-20 lg:py-24 bg-coffee-900"
```
- Padding vertical responsivo
- Fundo coffee-900 (marrom escuro)

### Título
```tsx
className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-16"
```
- Tamanho responsivo
- Negrito + branco + centralizado

### Grid 2 Colunas
```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
```
- 1 coluna mobile, 2 colunas desktop
- Gap responsivo
- Alinhamento vertical central

### Imagem
```tsx
className="rounded-xl shadow-2xl w-full max-w-md lg:max-w-full"
```
- Bordas arredondadas
- Sombra forte
- Largura responsiva

### Textos
```tsx
className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed"
```
- Tamanho responsivo
- Cor cream-50 (creme claro)
- Espaçamento de linha confortável

### Destaques (números e regiões)
```tsx
className="text-coffee-500 font-bold"
```
- Cor dourada (coffee-500)
- Negrito para ênfase

---

## 📐 Espaçamentos

| Elemento | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Padding vertical seção | `py-16` | `py-20` | `py-24` |
| Padding horizontal | `px-4` | `px-6` | `px-8` |
| Espaço após título | `mb-12` | `mb-12` | `mb-16` |
| Gap entre colunas | `gap-8` | `gap-8` | `gap-12` |
| Espaço entre parágrafos | `space-y-8` | `space-y-8` | `space-y-8` |

---

## ♿ Acessibilidade

### Imagem
- ✅ Atributo `alt` descritivo
- ✅ Dimensões explícitas (`width` e `height`)
- ✅ `priority={false}` (não é LCP, carrega após Hero)

### Texto
- ✅ Contraste adequado (cream-50 em coffee-900)
- ✅ Tamanhos de fonte legíveis (mín. 16px)
- ✅ Uso de `<strong>` para ênfase semântica

### Estrutura
- ✅ Hierarquia de headings (`<h2>`)
- ✅ Espaçamento adequado entre elementos
- ✅ Layout responsivo e acessível em touch

---

## 🧪 Checklist de Implementação

### Antes de começar
- [ ] Adicionar imagem `mapa-estacao-grao.png` (800x800) em `public/`
- [ ] Verificar se a imagem está otimizada (peso < 200kb idealmente)
- [ ] Fazer backup do arquivo `components/audience.tsx` atual

### Implementação
- [ ] Abrir `components/audience.tsx`
- [ ] Substituir todo o conteúdo pelo novo código
- [ ] Importar `Image` do `next/image`
- [ ] Copiar estrutura JSX proposta
- [ ] Aplicar classes Tailwind conforme especificado

### Testes
- [ ] Verificar se a imagem carrega corretamente
- [ ] Testar responsividade em mobile (< 768px)
- [ ] Testar responsividade em tablet (768px - 1024px)
- [ ] Testar responsividade em desktop (> 1024px)
- [ ] Verificar alinhamento vertical do texto
- [ ] Confirmar que números estão em dourado + negrito
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Testar navegação por teclado

### Ajustes finais
- [ ] Confirmar que o fundo é `bg-coffee-900`
- [ ] Verificar se o título está em branco puro
- [ ] Ajustar espaçamentos se necessário
- [ ] Testar em diferentes navegadores

---

## 📊 Comparação: Antes vs Depois

### ANTES (Seção Atual)

```
┌───────────────────────────────────┐
│     Para Quem Atendemos           │
│                                   │
│ [4 ícones com descrições]         │
│                                   │
│ Regiões Atendidas (h3)            │
│ [Pills: Recife, Olinda, etc]      │
│                                   │
│ [Keywords SEO]                    │
└───────────────────────────────────┘
```

### DEPOIS (Nova Proposta)

```
┌───────────────────────────────────┐
│     REGIÕES ATENDIDAS (h2)        │
├─────────────┬─────────────────────┤
│   [MAPA]    │  📍 Nordeste        │
│   800x800   │  100+ doses         │
│             │                     │
│             │  🌎 Todo Brasil     │
│             │  3.000+ doses       │
└─────────────┴─────────────────────┘
```

**Mudanças principais**:
- ❌ Remove "Para Quem Atendemos"
- ❌ Remove ícones de tipos de eventos
- ❌ Remove pills de cidades específicas
- ❌ Remove keywords SEO visíveis
- ✅ Adiciona mapa visual
- ✅ Foco em cobertura geográfica
- ✅ Informação sobre volume mínimo
- ✅ Layout mais limpo e moderno

---

## 🎨 Variações de Design (Opcionais)

### Opção 1: Com bordas decorativas

```tsx
<div className="border border-coffee-700/30 rounded-2xl p-8 lg:p-12">
  {/* Conteúdo do texto */}
</div>
```

### Opção 2: Com ícones maiores

```tsx
import { MapPin, Globe } from "lucide-react"

<div className="flex items-start gap-4">
  <MapPin className="w-8 h-8 text-coffee-500 flex-shrink-0" />
  <p className="text-cream-50">...</p>
</div>
```

### Opção 3: Com fundo gradiente no texto

```tsx
<div className="bg-gradient-to-r from-coffee-900 to-coffee-700/50 rounded-xl p-8">
  {/* Textos */}
</div>
```

---

## 📝 Notas Importantes

1. **Imagem PNG obrigatória**:
   - Nome exato: `mapa-estacao-grao.png`
   - Local exato: `public/mapa-estacao-grao.png`
   - Caminho no código: `/mapa-estacao-grao.png`

2. **Paleta de cores mantida**:
   - Todas as cores são da paleta existente
   - Sem introdução de novas cores
   - Consistência com o restante do site

3. **Fonte do título**:
   - Mesma fonte das demais seções (`font-serif`)
   - Mesmo peso (`font-bold`)
   - Mesmo padrão de responsividade

4. **SEO**:
   - `alt` descritivo na imagem
   - Heading `<h2>` para hierarquia
   - Conteúdo textual indexável

5. **Performance**:
   - `priority={false}` na imagem (não é LCP)
   - Next.js Image para otimização automática
   - Lazy loading ativado por padrão

---

## 🚀 Próximos Passos

1. **Preparar imagem**: Criar/obter `mapa-estacao-grao.png` (800x800)
2. **Adicionar no projeto**: Colocar em `public/`
3. **Implementar código**: Seguir estrutura JSX proposta
4. **Testar**: Validar responsividade e cores
5. **Ajustar**: Fazer fine-tuning de espaçamentos se necessário

---

## 🆘 Troubleshooting

### Imagem não aparece
- ✅ Verificar se o arquivo está em `public/mapa-estacao-grao.png`
- ✅ Verificar se o nome está correto (case-sensitive)
- ✅ Limpar cache do Next.js: `rm -rf .next`

### Layout quebrado em mobile
- ✅ Confirmar `grid-cols-1` para mobile
- ✅ Verificar padding/margin excessivos
- ✅ Testar em diferentes tamanhos de tela

### Cores não aparecem
- ✅ Verificar se tokens `coffee-*` estão em `globals.css`
- ✅ Confirmar que Tailwind está compilando corretamente
- ✅ Inspecionar classes no navegador

---

## 📌 Referências

- **Arquivo atual**: `components/audience.tsx`
- **Paleta de cores**: `app/globals.css` (linhas 84-100)
- **Seções similares**: `components/differentials.tsx`, `components/gallery.tsx`
- **Padrão de título**: Ver outras seções (`Hero.tsx`, `services-carousel.tsx`)

---

**Documentação criada em:** 17/11/2025  
**Seção:** 4 (Audience/Regiões Atendidas)  
**Status:** 📄 Apenas documentação (implementação pendente)

