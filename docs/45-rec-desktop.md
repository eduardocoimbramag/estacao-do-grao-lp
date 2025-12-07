# Documentação: Recuperação da Estrutura Desktop - Seção "O que é a Estação do Grão?"

## 📋 Visão Geral

Este documento detalha as modificações necessárias para **recuperar a estrutura original do desktop** da seção "O que é a Estação do Grão?" (OpenMenuIntro), que foi alterada durante as implementações mobile.

**Problema**: Durante as modificações para mobile, a estrutura do desktop foi alterada acidentalmente, causando mudanças no layout e comportamento.

**Solução**: Restaurar a estrutura original do desktop usando classes condicionais do Tailwind (`sm:`, `md:`, `lg:`) para manter o desktop intacto enquanto preserva as modificações mobile.

**Importante**: 
- ✅ **Desktop**: Restaurar estrutura original
- ✅ **Mobile**: Manter como está atualmente (não alterar)

---

## 🎯 Objetivo

Restaurar a estrutura original do desktop para que:
- ✅ Layout grid funcione corretamente (texto à esquerda, vídeo à direita)
- ✅ Conteúdo seja centralizado verticalmente
- ✅ Título, subtítulo e parágrafo estejam no mesmo container
- ✅ Espaçamentos e hierarquia visual sejam restaurados
- ✅ Comportamento original seja mantido

---

## 📐 Análise do Problema Atual

### Estado Atual (Desktop Afetado)

#### Estrutura Atual - Desktop
```tsx
<section className="... justify-start sm:justify-center">
  <div className="... flex flex-col h-full">
    <div className="... flex flex-col h-full">
      {/* Título e Subtítulo - Separados */}
      <div className="pt-4 sm:pt-0">
        <h2>...</h2>
        <p>...</p>
      </div>
      
      {/* Restante - Separado */}
      <div className="flex-1 flex flex-col justify-center ...">
        <p>Parágrafo</p>
        {/* Vídeo + Lista */}
        {/* Botões */}
      </div>
    </div>
  </div>
</section>
```

### Problemas Identificados no Desktop

1. **Container com `flex flex-col h-full`**: Força layout vertical mesmo em desktop
2. **Título e subtítulo separados**: Quebra a estrutura original
3. **Restante do conteúdo separado**: Não está no mesmo container que título/subtítulo
4. **`justify-start` aplicado**: Afeta o alinhamento vertical em desktop
5. **Estrutura não corresponde ao grid**: Desktop usa grid, mas estrutura interna é flex-col

---

## 🔧 Estrutura Original do Desktop

### Como Deveria Ser (Desktop)

```tsx
<section className="... justify-center">
  <div className="... sm:grid ...">
    {/* CONTEÚDO - Texto à esquerda */}
    <div className="... space-y-2">
      <h2>Título</h2>
      <div className="... space-y-1.5">
        <p>Subtítulo</p>
        <p>Parágrafo descritivo</p>
      </div>
      {/* Lista */}
      {/* Botões */}
    </div>
    
    {/* SPINE VISUAL */}
    <div>...</div>
    
    {/* VÍDEO - Direita */}
    <div>...</div>
  </div>
</section>
```

### Características Originais

- **Seção**: `justify-center` (centralizado verticalmente)
- **Container principal**: `sm:grid` com `md:grid-cols-[1fr_1px_1fr]`
- **Container do conteúdo**: `space-y-2` (espaçamento vertical simples)
- **Título e subtítulo**: No mesmo container, sem separação
- **Parágrafo**: Dentro de `div` com `space-y-1.5`
- **Lista e botões**: No mesmo container do conteúdo

---

## 📝 Mudanças Detalhadas

### 1. Seção Principal - Restaurar justify-center

**Arquivo**: `components/OpenMenuIntro.tsx`

**Linha**: ~59

**Mudança**:
```tsx
// ATUAL (ERRADO):
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-start sm:justify-center">

// CORRETO (RESTAURAR):
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-center sm:justify-center">
```

**Detalhes**:
- Mobile: Mantém `justify-start` (comportamento atual mobile)
- Desktop: Restaura `justify-center` (comportamento original)
- **Solução**: Usar `justify-center` para ambos, mas mobile terá estrutura diferente que força topo

---

### 2. Container Principal - Remover h-full e flex-col em desktop

**Arquivo**: `components/OpenMenuIntro.tsx`

**Linha**: ~60

**Mudança**:
```tsx
// ATUAL (ERRADO):
<div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-start box-border h-full">

// CORRETO (RESTAURAR):
<div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-start box-border">
```

**Detalhes**:
- Remover `h-full` (não necessário em desktop)
- Mobile: Mantém `flex flex-col`
- Desktop: Mantém `sm:grid` (comportamento original)

---

### 3. Container do Conteúdo - Restaurar estrutura original em desktop

**Arquivo**: `components/OpenMenuIntro.tsx`

**Linha**: ~62-164

**Mudança**:
```tsx
// ATUAL (ERRADO):
<div className="order-1 sm:order-1 w-full flex flex-col h-full">
  {/* Título e Subtítulo - Separados */}
  <div className="pt-4 sm:pt-0">
    <h2>...</h2>
    <p>...</p>
  </div>
  
  {/* Restante - Separado */}
  <div className="flex-1 flex flex-col justify-center ...">
    <p>Parágrafo</p>
    {/* Vídeo + Lista */}
    {/* Botões */}
  </div>
</div>

// CORRETO (RESTAURAR):
<div className="order-1 sm:order-1 space-y-2 w-full">
  {/* MOBILE: Título e Subtítulo - Separados no topo */}
  <div className="pt-4 sm:hidden">
    <h2 className="...">...</h2>
    <p className="... -mt-1 ...">...</p>
  </div>
  
  {/* DESKTOP: Título - Estrutura original */}
  <h2 className="hidden sm:block text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-left whitespace-nowrap">
    O que é a Estação do Grão?
  </h2>
  
  {/* DESKTOP: Subtítulo e Parágrafo - Estrutura original */}
  <div className="hidden sm:block mt-1.5 space-y-1.5">
    <p className="text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-left whitespace-nowrap break-words font-montserrat">
      O café do seu evento precisa ser inesquecível.
    </p>
    <p className="text-base text-cream-50/90 leading-relaxed text-justify hyphens-auto break-words font-montserrat">
      A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
    </p>
  </div>
  
  {/* MOBILE: Restante do Conteúdo - Centralizado */}
  <div className="flex-1 flex flex-col justify-center space-y-2 mt-4 sm:hidden">
    <p className="text-xs text-cream-50/90 leading-relaxed text-justify indent-5 hyphens-none break-words font-montserrat">
      A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
    </p>
    {/* Vídeo + Lista mobile */}
    {/* Botões mobile */}
  </div>
  
  {/* DESKTOP: Lista - Estrutura original */}
  <ul className="hidden sm:block space-y-1.5">
    {[
      'Coffee station completa (espresso, cappuccino, latte, gelados)',
      'Branding com café: copos e estação personalizados',
      'Equipe de baristas profissionais e operação ágil',
    ].map((t) => (
      <li key={t} className="flex items-start gap-1.5">
        <span className="mt-2 h-2 w-2 rounded-full bg-coffee-500 flex-shrink-0" />
        <span className="text-base text-cream-50/90 font-montserrat leading-tight">{t}</span>
      </li>
    ))}
  </ul>
  
  {/* DESKTOP: Botões - Estrutura original */}
  <div className="hidden sm:flex justify-between items-center gap-2.5 mt-5 w-full max-w-full">
    <a 
      href="#servicos" 
      className="flex-none px-4 py-2.5 rounded-xl border border-coffee-500 text-cream-50 hover:bg-coffee-700/30 transition-colors font-montserrat text-center text-base"
    >
      Ver serviços
    </a>
    <a 
      href="#contato" 
      className="flex-none px-4 py-2.5 rounded-xl bg-coffee-500 text-coffee-900 font-semibold hover:bg-coffee-700 hover:text-white transition-colors font-montserrat text-center text-base"
    >
      Solicitar orçamento
    </a>
  </div>
</div>
```

**Detalhes**:
- **Mobile**: Mantém estrutura atual (título/subtítulo separados no topo, restante centralizado)
- **Desktop**: Restaura estrutura original (tudo no mesmo container com `space-y-2`)
- Usar `sm:hidden` e `hidden sm:block` para separar mobile e desktop

---

## 🎨 Estrutura Completa Restaurada

### Estrutura Final Proposta

```tsx
<section id="apresentacao" className="h-[calc(100vh-4rem)] sm:h-screen py-3 sm:py-16 lg:py-20 bg-coffee-900 text-white overflow-x-hidden w-full flex flex-col justify-center">
  <div className="mx-auto w-full max-w-[100vw] sm:max-w-6xl px-3 sm:px-4 md:px-6 flex flex-col sm:grid sm:gap-5 md:gap-6 lg:gap-8 md:grid-cols-[1fr_1px_1fr] gap-3 items-start box-border">
    
    {/* CONTEÚDO - Estrutura diferente para mobile e desktop */}
    <div className="order-1 sm:order-1 space-y-2 w-full">
      
      {/* ========== MOBILE: Título e Subtítulo - Topo ========== */}
      <div className="pt-4 sm:hidden">
        <h2 className="!text-[clamp(1.375rem,7vw,1.75rem)] font-montserrat font-bold tracking-tight text-center whitespace-nowrap px-2">
          O que é a Estação do Grão?
        </h2>
        <p className="text-sm text-coffee-500 font-semibold leading-relaxed text-center whitespace-nowrap break-words font-montserrat -mt-1">
          O café do seu evento precisa ser inesquecível.
        </p>
      </div>
      
      {/* ========== DESKTOP: Título ========== */}
      <h2 className="hidden sm:block text-2xl md:text-3xl font-montserrat font-bold tracking-tight text-left whitespace-nowrap">
        O que é a Estação do Grão?
      </h2>
      
      {/* ========== DESKTOP: Subtítulo e Parágrafo ========== */}
      <div className="hidden sm:block mt-1.5 space-y-1.5">
        <p className="text-lg md:text-xl text-coffee-500 font-semibold leading-relaxed text-left whitespace-nowrap break-words font-montserrat">
          O café do seu evento precisa ser inesquecível.
        </p>
        <p className="text-base text-cream-50/90 leading-relaxed text-justify hyphens-auto break-words font-montserrat">
          A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
        </p>
      </div>
      
      {/* ========== MOBILE: Restante do Conteúdo - Centralizado ========== */}
      <div className="flex-1 flex flex-col justify-center space-y-2 mt-4 sm:hidden">
        <p className="text-xs text-cream-50/90 leading-relaxed text-justify indent-5 hyphens-none break-words font-montserrat">
          A <strong className="text-coffee-500 font-bold">Estação do Grão</strong> é uma <strong className="text-coffee-500 font-bold">estação de café gourmet</strong> pensada para eventos que exigem excelência. <strong className="text-coffee-500 font-bold">Espresso premium</strong>, bebidas especiais, baristas e personalização completa para feiras, congressos, marcas e casamentos em <strong className="text-coffee-500 font-bold">Recife</strong> e <strong className="text-coffee-500 font-bold">João Pessoa</strong>. Café que se vê. Se sente. Se lembra.
        </p>
        
        {/* Layout híbrido: Vídeo + Lista lado a lado em mobile */}
        <div className="grid grid-cols-[1.4fr_1fr] gap-2.5 items-center mt-3">
          {/* Vídeo mobile */}
          {/* Lista mobile */}
        </div>
        
        {/* Botões mobile */}
        <div className="flex justify-between items-center gap-2 mt-4 w-full max-w-full">
          {/* Botões */}
        </div>
      </div>
      
      {/* ========== DESKTOP: Lista ========== */}
      <ul className="hidden sm:block space-y-1.5">
        {[
          'Coffee station completa (espresso, cappuccino, latte, gelados)',
          'Branding com café: copos e estação personalizados',
          'Equipe de baristas profissionais e operação ágil',
        ].map((t) => (
          <li key={t} className="flex items-start gap-1.5">
            <span className="mt-2 h-2 w-2 rounded-full bg-coffee-500 flex-shrink-0" />
            <span className="text-base text-cream-50/90 font-montserrat leading-tight">{t}</span>
          </li>
        ))}
      </ul>
      
      {/* ========== DESKTOP: Botões ========== */}
      <div className="hidden sm:flex justify-between items-center gap-2.5 mt-5 w-full max-w-full">
        <a 
          href="#servicos" 
          className="flex-none px-4 py-2.5 rounded-xl border border-coffee-500 text-cream-50 hover:bg-coffee-700/30 transition-colors font-montserrat text-center text-base"
        >
          Ver serviços
        </a>
        <a 
          href="#contato" 
          className="flex-none px-4 py-2.5 rounded-xl bg-coffee-500 text-coffee-900 font-semibold hover:bg-coffee-700 hover:text-white transition-colors font-montserrat text-center text-base"
        >
          Solicitar orçamento
        </a>
      </div>
    </div>

    {/* "DOBRA" — SPINE VISUAL (Desktop) */}
    <div 
      aria-hidden="true" 
      className="hidden md:block h-full w-px bg-gradient-to-b from-white/10 via-white/5 to-white/10 rounded-full" 
    />

    {/* DIREITA — VÍDEO (Desktop) */}
    <div className="hidden sm:block relative w-full min-w-0">
      {/* Vídeo desktop - mantém como está */}
    </div>
  </div>
</section>
```

---

## 📊 Comparação: Atual vs Restaurado

### Seção Principal

| Propriedade | Atual (Errado) | Restaurado (Correto) |
|-------------|----------------|----------------------|
| `justify-start` | ✅ Mobile | ❌ Remover (usar `justify-center`) |
| `justify-center` | ✅ Desktop | ✅ Desktop |
| `h-full` no container | ❌ Presente | ✅ Remover |

### Container do Conteúdo

| Propriedade | Atual (Errado) | Restaurado (Correto) |
|-------------|----------------|----------------------|
| Estrutura mobile | ✅ `flex flex-col h-full` | ✅ Manter (mobile) |
| Estrutura desktop | ❌ `flex flex-col h-full` | ✅ `space-y-2` (original) |
| Título/subtítulo | ❌ Separados | ✅ Desktop: Juntos |
| Parágrafo | ❌ Separado | ✅ Desktop: Juntos |

---

## ⚠️ Considerações Importantes

### Duplicação de Conteúdo

Para restaurar o desktop sem afetar o mobile, será necessário:
- **Duplicar** alguns elementos (título, subtítulo, parágrafo, lista, botões)
- Usar `sm:hidden` para versão mobile
- Usar `hidden sm:block` para versão desktop
- **Vantagem**: Estruturas completamente independentes
- **Desvantagem**: Código duplicado (mas necessário para não quebrar mobile)

### Alternativa (Não Recomendada)

Tentar usar uma única estrutura com classes condicionais complexas:
- ❌ Mais propenso a erros
- ❌ Difícil de manter
- ❌ Pode quebrar mobile novamente

---

## 📝 Checklist de Implementação

### Fase 1: Preparação
- [ ] Revisar estrutura atual mobile (não alterar)
- [ ] Identificar elementos que precisam ser duplicados
- [ ] Preparar estrutura desktop original

### Fase 2: Seção Principal
- [ ] Alterar `justify-start` para `justify-center` (ou manter condicional)
- [ ] Remover `h-full` do container principal

### Fase 3: Container do Conteúdo
- [ ] Manter estrutura mobile atual (com `sm:hidden`)
- [ ] Adicionar estrutura desktop original (com `hidden sm:block`)
- [ ] Garantir que mobile não seja afetado

### Fase 4: Elementos Desktop
- [ ] Título desktop (estrutura original)
- [ ] Subtítulo e parágrafo desktop (juntos)
- [ ] Lista desktop (estrutura original)
- [ ] Botões desktop (estrutura original)

### Fase 5: Validação
- [ ] Testar desktop em 1024px, 1280px, 1920px
- [ ] Verificar que layout grid funciona
- [ ] Verificar que conteúdo está centralizado
- [ ] Verificar que mobile não foi afetado
- [ ] Verificar espaçamentos e hierarquia visual

---

## ✅ Critérios de Sucesso

1. ✅ Desktop: Layout grid funciona (texto à esquerda, vídeo à direita)
2. ✅ Desktop: Conteúdo centralizado verticalmente
3. ✅ Desktop: Título, subtítulo e parágrafo no mesmo container
4. ✅ Desktop: Espaçamentos e hierarquia visual restaurados
5. ✅ Desktop: Comportamento original mantido
6. ✅ Mobile: Nenhuma alteração (mantém estrutura atual)
7. ✅ Código: Estruturas mobile e desktop independentes

---

## 📱 Testes Recomendados

### Desktop
- 1024px x 768px (iPad landscape)
- 1280px x 720px (HD)
- 1920px x 1080px (Full HD)
- 2560px x 1440px (2K)

### Verificações Desktop
1. Layout grid funciona corretamente
2. Texto à esquerda, vídeo à direita
3. Conteúdo centralizado verticalmente
4. Título, subtítulo e parágrafo juntos
5. Lista e botões no mesmo container
6. Espaçamentos corretos

### Verificações Mobile
1. Estrutura mobile mantida (não alterada)
2. Título e subtítulo no topo
3. Restante do conteúdo centralizado
4. Layout híbrido (vídeo + lista) funciona

---

## 🚀 Próximos Passos

Após autorização:
1. Restaurar `justify-center` na seção
2. Remover `h-full` do container principal
3. Duplicar elementos para desktop (com `hidden sm:block`)
4. Manter elementos mobile (com `sm:hidden`)
5. Testar em diferentes resoluções desktop
6. Validar que mobile não foi afetado
7. Ajustes finos se necessário

---

**Data de Criação**: 2025-01-13  
**Versão**: 1.0  
**Status**: Aguardando autorização para implementação

