# Documentação: Reorganização do Título e Subtítulo - Seção "O que é a Estação do Grão?"

## 📋 Visão Geral

Este documento detalha as modificações necessárias para reorganizar o título e subtítulo da seção "O que é a Estação do Grão?" (OpenMenuIntro) na versão mobile, posicionando-os no topo da página para preencher o espaço vazio, sem sobrepor o conteúdo abaixo.

**Problema Atual**: O título está sobrepondo o conteúdo abaixo devido ao uso de margem negativa excessiva (`-mt-24`), causando sobreposição indesejada.

**Solução**: Reorganizar a estrutura para que título e subtítulo fiquem no topo da seção, seguidos pelo restante do conteúdo, sem sobreposição.

**Importante**: Todas as alterações são aplicadas **APENAS para a versão mobile** (breakpoint < 640px), preservando o comportamento desktop.

---

## 🎯 Objetivo

Reorganizar o layout mobile da seção para que:
- ✅ Título e subtítulo fiquem no topo da página
- ✅ Preencham o espaço vazio superior
- ✅ Não sobreponham o conteúdo abaixo
- ✅ Título primeiro, subtítulo logo abaixo
- ✅ Restante do conteúdo mantenha posição centralizada

---

## 📐 Análise do Problema Atual

### Estado Atual

#### Estrutura Atual
```tsx
<section className="h-[calc(100vh-4rem)] ... justify-center ...">
  <div className="...">
    <div className="...">
      <h2 className="... -mt-24 ...">  {/* Título com margem negativa excessiva */}
        O que é a Estação do Grão?
      </h2>
      <div className="...">
        <p className="... -mt-12 ...">  {/* Subtítulo com margem negativa */}
          O café do seu evento precisa ser inesquecível.
        </p>
        <p>  {/* Parágrafo descritivo */}
          ...
        </p>
        {/* Vídeo + Lista */}
        {/* Botões */}
      </div>
    </div>
  </div>
</section>
```

### Problemas Identificados

1. **Sobreposição**: Margem negativa excessiva (`-mt-24`) faz o título sobrepor o conteúdo
2. **Estrutura confusa**: Título e subtítulo estão dentro do mesmo container que o restante
3. **Espaço vazio**: Não está sendo preenchido adequadamente
4. **Layout não otimizado**: Título e subtítulo deveriam estar no topo, não no meio

---

## 🔧 Mudanças Propostas

### Estratégia: Separar Título/Subtítulo do Restante

A solução é separar o título e subtítulo em um container próprio no topo, e manter o restante do conteúdo centralizado abaixo.

### Estrutura Proposta

```tsx
<section className="h-[calc(100vh-4rem)] ... justify-start ...">
  <div className="...">
    {/* Container do Título e Subtítulo - Topo */}
    <div className="... pt-4 ...">
      <h2>O que é a Estação do Grão?</h2>
      <p>O café do seu evento precisa ser inesquecível.</p>
    </div>
    
    {/* Container do Restante - Centralizado */}
    <div className="... flex-1 flex flex-col justify-center ...">
      <p>Parágrafo descritivo</p>
      {/* Vídeo + Lista */}
      {/* Botões */}
    </div>
  </div>
</section>
```

---

## 📝 Mudanças Detalhadas

### 1. Seção Principal - Mudar justify

**Arquivo**: `components/OpenMenuIntro.tsx`

**Linha**: ~59

**Mudança**:
```tsx
// ANTES:
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-center sm:justify-center">

// DEPOIS:
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-start sm:justify-center">
```

**Detalhes**:
- Mobile: `justify-start` (conteúdo começa no topo)
- Desktop: Mantém `sm:justify-center` (comportamento original)

---

### 2. Container Principal - Flex column com espaço

**Arquivo**: `components/OpenMenuIntro.tsx`

**Linha**: ~60

**Mudança**:
```tsx
// ANTES:
<div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-start box-border">

// DEPOIS:
<div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-start box-border h-full">
```

**Detalhes**:
- Adicionar `h-full` para ocupar altura total
- Mobile: Mantém `flex flex-col`
- Desktop: Mantém `sm:grid` (comportamento original)

---

### 3. Separar Título e Subtítulo - Novo Container no Topo

**Arquivo**: `components/OpenMenuIntro.tsx`

**Linha**: ~61-74

**Mudança**:
```tsx
// ANTES:
<div className="order-1 sm:order-1 space-y-2 w-full">
  <h2 className="... -mt-24 sm:mt-0">
    O que é a Estação do Grão?
  </h2>
  <div className="mt-1.5 space-y-1.5 sm:mt-1.5">
    <p className="... -mt-12 sm:mt-0">
      O café do seu evento precisa ser inesquecível.
    </p>
    <p>Parágrafo descritivo</p>
    ...
  </div>
</div>

// DEPOIS:
{/* Container Título e Subtítulo - Topo em mobile */}
<div className="order-1 sm:order-1 w-full pt-4 sm:pt-0">
  <h2 className="!text-[clamp(1.375rem,7vw,1.75rem)] sm:text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-center sm:text-left whitespace-nowrap px-2 sm:px-0">
    O que é a Estação do Grão?
  </h2>
  <p className="text-sm sm:text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-center sm:text-left sm:whitespace-nowrap break-words font-montserrat mt-2 sm:mt-1.5">
    O café do seu evento precisa ser inesquecível.
  </p>
</div>

{/* Container Restante do Conteúdo - Centralizado em mobile */}
<div className="order-2 sm:order-1 flex-1 flex flex-col justify-center space-y-2 w-full">
  <p className="text-xs sm:text-base text-cream-50/90 leading-relaxed text-justify indent-5 sm:indent-0 hyphens-none break-words font-montserrat">
    Parágrafo descritivo
  </p>
  {/* Vídeo + Lista */}
  {/* Botões */}
</div>
```

**Detalhes**:
- **Novo container 1**: Título e subtítulo no topo
  - `pt-4` em mobile (padding-top para espaçamento do menu)
  - Sem margem negativa
  - Título primeiro, subtítulo logo abaixo (`mt-2`)
- **Novo container 2**: Restante do conteúdo
  - `flex-1` para ocupar espaço restante
  - `justify-center` para centralizar verticalmente
  - Mantém estrutura original do conteúdo

---

### 4. Reorganizar Estrutura Completa

**Arquivo**: `components/OpenMenuIntro.tsx`

**Estrutura Completa Proposta**:
```tsx
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-start sm:justify-center">
  <div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-start box-border h-full">
    
    {/* MOBILE: Container Título e Subtítulo - Topo */}
    <div className="order-1 sm:order-1 w-full pt-4 sm:pt-0 sm:hidden">
      <h2 className="!text-[clamp(1.375rem,7vw,1.75rem)] sm:text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-center sm:text-left whitespace-nowrap px-2 sm:px-0">
        O que é a Estação do Grão?
      </h2>
      <p className="text-sm sm:text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-center sm:text-left sm:whitespace-nowrap break-words font-montserrat mt-2 sm:mt-1.5">
        O café do seu evento precisa ser inesquecível.
      </p>
    </div>

    {/* DESKTOP: Container Conteúdo Completo (mantém estrutura original) */}
    <div className="order-1 sm:order-1 space-y-2 w-full hidden sm:block">
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-left whitespace-nowrap">
        O que é a Estação do Grão?
      </h2>
      <div className="mt-3 space-y-3">
        <p className="text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-left whitespace-nowrap break-words font-montserrat">
          O café do seu evento precisa ser inesquecível.
        </p>
        <p className="text-base text-cream-50/90 leading-relaxed text-justify hyphens-auto break-words font-montserrat">
          Parágrafo descritivo
        </p>
      </div>
      {/* Lista */}
      {/* Botões */}
    </div>

    {/* MOBILE: Container Restante - Centralizado */}
    <div className="order-2 sm:order-1 flex-1 flex flex-col justify-center space-y-2 w-full sm:hidden">
      <p className="text-xs text-cream-50/90 leading-relaxed text-justify indent-5 hyphens-none break-words font-montserrat">
        A Estação do Grão é uma estação de café gourmet pensada para eventos que exigem excelência. Espresso premium, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em Recife e João Pessoa. Café que se vê. Se sente. Se lembra.
      </p>
      
      {/* Layout híbrido: Vídeo + Lista lado a lado */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-2.5 items-center mt-3">
        {/* Vídeo */}
        {/* Lista */}
      </div>
      
      {/* Botões */}
    </div>

    {/* "DOBRA" — SPINE VISUAL (Desktop) */}
    <div className="hidden md:block ...">
      {/* Spine */}
    </div>

    {/* DIREITA — VÍDEO (Desktop) */}
    <div className="hidden sm:block ...">
      {/* Vídeo desktop */}
    </div>
  </div>
</section>
```

---

## 🎨 Classes Tailwind Utilizadas

### Container Título/Subtítulo (Mobile)

```tsx
// Container
className="order-1 sm:order-1 w-full pt-4 sm:pt-0 sm:hidden"

// Título
className="!text-[clamp(1.375rem,7vw,1.75rem)] ... text-center ... whitespace-nowrap px-2"

// Subtítulo
className="text-sm ... text-center ... mt-2"
```

### Container Restante (Mobile)

```tsx
// Container
className="order-2 sm:order-1 flex-1 flex flex-col justify-center space-y-2 w-full sm:hidden"
```

### Seção Principal

```tsx
// Seção
className="... justify-start sm:justify-center"

// Container interno
className="... h-full"
```

---

## 📊 Comparação: Antes vs Depois

### Antes

| Propriedade | Valor |
|-------------|-------|
| Estrutura | Título e conteúdo no mesmo container |
| Título | Margem negativa `-mt-24` (sobrepõe) |
| Subtítulo | Margem negativa `-mt-12` |
| Justify | `justify-center` (tudo centralizado) |
| Problema | Título sobrepõe conteúdo |

### Depois

| Propriedade | Valor |
|-------------|-------|
| Estrutura | Título/subtítulo separados do restante |
| Título | No topo, `pt-4` (sem margem negativa) |
| Subtítulo | Logo abaixo do título, `mt-2` |
| Justify | `justify-start` (título no topo) |
| Restante | `justify-center` (centralizado) |
| Resultado | Sem sobreposição, layout organizado |

---

## 🔍 Estrutura Visual Proposta

### Mobile

```
┌─────────────────────────────┐
│ [MENU FIXO - 64px]          │
├─────────────────────────────┤
│                             │
│  Título (topo)              │
│  Subtítulo (logo abaixo)    │
│                             │
│  ┌─────────────────────┐    │
│  │                     │    │
│  │  Parágrafo          │    │
│  │  Vídeo + Lista      │    │
│  │  Botões             │    │
│  │  (centralizado)     │    │
│  │                     │    │
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

### Desktop (Mantém Original)

```
┌─────────────────────────────────────┐
│  Título | Subtítulo | Parágrafo    │
│  Lista  | Botões    | [VÍDEO]      │
└─────────────────────────────────────┘
```

---

## ⚠️ Considerações Especiais

### Duplicação de Conteúdo

- **Mobile**: Título/subtítulo em container separado
- **Desktop**: Mantém estrutura original (usando `sm:hidden` e `hidden sm:block`)
- **Alternativa**: Usar apenas uma estrutura com classes condicionais (mais simples)

### Alternativa Simples (Recomendada)

Em vez de duplicar, reorganizar a estrutura existente:

```tsx
<div className="order-1 sm:order-1 w-full">
  {/* Título e Subtítulo - Topo em mobile */}
  <div className="pt-4 sm:pt-0">
    <h2>...</h2>
    <p className="mt-2">Subtítulo</p>
  </div>
  
  {/* Restante - Centralizado em mobile */}
  <div className="flex-1 flex flex-col justify-center space-y-2 mt-4 sm:mt-3">
    <p>Parágrafo</p>
    {/* Vídeo + Lista */}
    {/* Botões */}
  </div>
</div>
```

---

## 📝 Checklist de Implementação

### Fase 1: Preparação
- [ ] Revisar estrutura atual
- [ ] Identificar elementos a reorganizar
- [ ] Decidir entre duplicação ou reorganização

### Fase 2: Seção Principal
- [ ] Alterar `justify-center` para `justify-start` em mobile
- [ ] Adicionar `h-full` no container interno

### Fase 3: Título e Subtítulo
- [ ] Remover margens negativas
- [ ] Criar container separado no topo
- [ ] Adicionar `pt-4` para espaçamento do menu
- [ ] Posicionar subtítulo logo abaixo do título (`mt-2`)

### Fase 4: Restante do Conteúdo
- [ ] Criar container separado para restante
- [ ] Adicionar `flex-1` para ocupar espaço
- [ ] Adicionar `justify-center` para centralizar
- [ ] Manter estrutura original (parágrafo, vídeo, lista, botões)

### Fase 5: Validação
- [ ] Testar em 360px, 375px, 414px
- [ ] Verificar que título e subtítulo estão no topo
- [ ] Verificar que não há sobreposição
- [ ] Verificar que restante está centralizado
- [ ] Verificar que desktop não foi afetado

---

## 🎯 Estrutura Final Proposta (Simplificada)

### Opção Recomendada: Reorganização Simples

```tsx
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-start sm:justify-center">
  <div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-start box-border h-full">
    
    {/* CONTEÚDO - Reorganizado para mobile */}
    <div className="order-1 sm:order-1 w-full flex flex-col h-full">
      
      {/* Título e Subtítulo - Topo em mobile */}
      <div className="pt-4 sm:pt-0">
        <h2 className="!text-[clamp(1.375rem,7vw,1.75rem)] sm:text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-center sm:text-left whitespace-nowrap px-2 sm:px-0">
          O que é a Estação do Grão?
        </h2>
        <p className="text-sm sm:text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-center sm:text-left sm:whitespace-nowrap break-words font-montserrat mt-2 sm:mt-1.5">
          O café do seu evento precisa ser inesquecível.
        </p>
      </div>
      
      {/* Restante do Conteúdo - Centralizado em mobile */}
      <div className="flex-1 flex flex-col justify-center space-y-2 mt-4 sm:mt-3">
        <p className="text-xs sm:text-base text-cream-50/90 leading-relaxed text-justify indent-5 sm:indent-0 hyphens-none break-words font-montserrat">
          A Estação do Grão é uma estação de café gourmet pensada para eventos que exigem excelência. Espresso premium, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em Recife e João Pessoa. Café que se vê. Se sente. Se lembra.
        </p>
        
        {/* Layout híbrido: Vídeo + Lista lado a lado em mobile */}
        <div className="grid grid-cols-[1.4fr_1fr] sm:grid-cols-1 gap-2.5 items-center mt-3 sm:mt-4">
          {/* Vídeo */}
          {/* Lista */}
        </div>
        
        {/* Botões */}
        <div className="flex justify-between items-center gap-2 sm:flex-wrap sm:gap-2.5 mt-4 sm:mt-5 w-full max-w-full">
          {/* Botões */}
        </div>
      </div>
    </div>

    {/* "DOBRA" — SPINE VISUAL */}
    <div className="hidden md:block ...">
      {/* Spine */}
    </div>

    {/* DIREITA — VÍDEO (Desktop) */}
    <div className="hidden sm:block ...">
      {/* Vídeo desktop */}
    </div>
  </div>
</section>
```

---

## ✅ Critérios de Sucesso

1. ✅ Título e subtítulo estão no topo da página
2. ✅ Preenchem o espaço vazio superior
3. ✅ Título primeiro, subtítulo logo abaixo
4. ✅ Não há sobreposição de conteúdo
5. ✅ Restante do conteúdo está centralizado
6. ✅ Layout visualmente agradável
7. ✅ Desktop não foi afetado (comportamento mantido)

---

## 📱 Testes Recomendados

### Dispositivos Mobile
- iPhone SE (375px x 667px)
- iPhone 12/13/14 (390px x 844px)
- iPhone 14 Pro Max (430px x 932px)
- Samsung Galaxy S21 (360px x 800px)

### Verificações
1. Título e subtítulo estão no topo
2. Não há sobreposição
3. Restante do conteúdo está centralizado
4. Espaço vazio superior está preenchido
5. Desktop mantém layout original

---

## 🚀 Próximos Passos

Após autorização:
1. Reorganizar estrutura do conteúdo
2. Separar título/subtítulo do restante
3. Aplicar classes para posicionamento
4. Testar em diferentes dispositivos
5. Validar que desktop não foi afetado
6. Ajustes finos se necessário

---

**Data de Criação**: 2025-01-13  
**Versão**: 1.0  
**Status**: Aguardando autorização para implementação

