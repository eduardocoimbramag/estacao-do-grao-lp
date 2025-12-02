# 24 — Centralização Vertical dos Ícones nos Cards de Regiões

## 📋 Objetivo

Ajustar o alinhamento vertical dos ícones (TreePalm, Shell, Flag) nos cards de regiões atendidas para que fiquem **centralizados verticalmente** no espaço entre:
- A **borda superior da div** (com `py-2`)
- O **início do texto** (primeira linha do parágrafo)

Atualmente, os ícones estão na posição horizontal correta (esquerda do texto, direita da borda), mas não estão centralizados verticalmente nesse espaçamento.

---

## 🎨 Especificações de Design

### Estado Atual

**Estrutura atual dos cards:**

```tsx
<div className="px-6 py-2 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
  <div className="flex items-center gap-2">
    <TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0 self-center" />
    <div>
      <p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed text-justify hyphens-none font-montserrat">
        {/* conteúdo do texto */}
      </p>
    </div>
  </div>
</div>
```

**Problema identificado:**
- O ícone está usando `self-center`, mas o container flex tem `items-center`, o que centraliza o ícone em relação à altura total do container flex (incluindo o texto)
- O ícone precisa estar centralizado especificamente no espaço entre o topo da div (`py-2`) e o início do texto, não em relação à altura total do conteúdo

### Estado Desejado

**Visual esperado:**

```
┌─────────────────────────────────────────┐ ← Topo da div (py-2)
│                                         │
│  [🌴]  Recife e Região Metropolitana    │ ← Ícone centralizado
│       a partir de 100 doses.          │   verticalmente neste espaço
│                                         │
└─────────────────────────────────────────┘
     ↑
  Ícone centralizado verticalmente
  entre o topo da div e o início do texto
```

**Requisitos:**
- Ícone centralizado verticalmente no espaço entre a borda superior (`py-2`) e a primeira linha do texto
- Manter a posição horizontal atual (esquerda do texto, direita da borda)

---

## 🔧 Estratégia de Implementação

### Análise do Problema

O problema atual é que:
- `items-center` no flex container centraliza todos os itens filhos verticalmente em relação à altura total do container
- Isso faz com que o ícone fique centralizado em relação à altura total do card (incluindo todo o texto)
- O que precisamos é centralizar o ícone apenas no espaço entre o topo da div e o início do texto

### Solução Proposta

**Opção A — Usar `items-start` e ajustar o ícone com padding-top:**

1. Mudar `items-center` para `items-start` no container flex
2. Adicionar `pt-1` ou `pt-0.5` no ícone para deslocá-lo verticalmente para baixo
3. Isso centraliza o ícone no espaço entre o topo e o início do texto

**Opção B — Usar `items-start` e ajustar com margin:**

1. Mudar `items-center` para `items-start` no container flex
2. Adicionar `mt-auto mb-auto` no ícone (mas isso pode não funcionar bem com `items-start`)
3. Usar uma margem superior calculada

**Opção C — Usar `items-start` e ajustar o container do texto:**

1. Mudar `items-center` para `items-start` no container flex
2. Adicionar padding-top no container do texto para criar espaço
3. O ícone ficará naturalmente centralizado nesse espaço

**Recomendação:** Usar **Opção A** (mais simples e direta):
- Mudar `items-center` para `items-start` no container flex
- Remover `self-center` do ícone (não é mais necessário)
- Adicionar `pt-1` ou `pt-0.5` no ícone para centralizá-lo verticalmente

O valor exato do padding-top pode precisar de ajuste fino visual, mas `pt-1` (0.25rem = 4px) ou `pt-0.5` (0.125rem = 2px) deve ser um bom ponto de partida.

---

## 🔧 Implementação Técnica (Planejada)

> **Importante:** este arquivo é apenas documentação.  
> Nada disso foi aplicado ainda — só será implementado quando você autorizar.

### Passo 1 — Ajustar o Container Flex

**Arquivo**: `components/audience.tsx`

**Estado atual do container flex:**

```tsx
<div className="flex items-center gap-2">
  <TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0 self-center" />
  <div>
    {/* texto */}
  </div>
</div>
```

**Ação planejada:**
1. Mudar `items-center` para `items-start` no container flex
2. Isso fará com que os itens se alinhem ao topo, permitindo um controle mais preciso do posicionamento do ícone

**Código proposto:**

```tsx
<div className="flex items-start gap-2">
  <TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0" />
  <div>
    {/* texto */}
  </div>
</div>
```

### Passo 2 — Centralizar Verticalmente o Ícone

**Arquivo**: `components/audience.tsx`

**Estado atual do ícone:**

```tsx
<TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0 self-center" />
```

**Ação planejada:**
1. Remover `self-center` (não é mais necessário com `items-start`)
2. Adicionar `pt-1` ou `pt-0.5` para deslocar o ícone verticalmente e centralizá-lo no espaço entre o topo da div e o início do texto

**Código proposto:**

```tsx
<TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0 pt-1" />
```

**Explicação:**
- Com `items-start`, o ícone fica alinhado ao topo do container flex
- O `pt-1` adiciona um pequeno padding-top que desloca o ícone para baixo
- Isso centraliza o ícone no espaço entre o topo da div (`py-2`) e o início do texto
- O valor pode ser ajustado (`pt-0.5`, `pt-1`, `pt-1.5`) conforme necessário para o alinhamento perfeito

### Passo 3 — Aplicar em Todos os Três Cards

As mesmas alterações devem ser aplicadas nos três cards:
1. **Card 1** — TreePalm (Recife e Região Metropolitana)
2. **Card 2** — Shell (Pernambuco, Paraíba e Alagoas)
3. **Card 3** — Flag (Brasil)

---

## 📝 Resumo das Alterações Planejadas

### Arquivos a Modificar

1. **`components/audience.tsx`**
   - Mudar `items-center` para `items-start` nos três containers flex dos cards
   - Remover `self-center` dos três ícones
   - Adicionar `pt-1` (ou valor ajustado) nos três ícones para centralização vertical

### Mudanças Planejadas

| Item                     | Situação Atual                               | Situação Proposta                                      |
|--------------------------|----------------------------------------------|--------------------------------------------------------|
| Alinhamento do container flex | `items-center` (centraliza em relação à altura total) | `items-start` (alinha ao topo)                         |
| Posicionamento do ícone  | `self-center` (centralizado em relação ao container) | `pt-1` (padding-top para centralizar no espaço desejado) |
| Alinhamento vertical     | Centralizado em relação à altura total do card | Centralizado entre o topo da div e o início do texto  |

---

## ✅ Checklist de Implementação (para quando você autorizar)

- [ ] Mudar `items-center` para `items-start` no container flex do **Card 1** (Recife e Região Metropolitana)
- [ ] Remover `self-center` e adicionar `pt-1` no ícone **TreePalm** do Card 1
- [ ] Mudar `items-center` para `items-start` no container flex do **Card 2** (Pernambuco, Paraíba e Alagoas)
- [ ] Remover `self-center` e adicionar `pt-1` no ícone **Shell** do Card 2
- [ ] Mudar `items-center` para `items-start` no container flex do **Card 3** (Brasil)
- [ ] Remover `self-center` e adicionar `pt-1` no ícone **Flag** do Card 3
- [ ] Verificar em **desktop** se:
  - [ ] Os ícones estão centralizados verticalmente entre o topo da div e o início do texto
  - [ ] O alinhamento visual está correto
- [ ] Verificar em **tablet** (≥ 768px)
- [ ] Verificar em **mobile** (< 768px)
- [ ] Ajustar o valor do padding-top (`pt-0.5`, `pt-1`, `pt-1.5`) se necessário para o alinhamento perfeito

---

## 🔍 Verificação Pós-Implementação

Após aplicar as mudanças:

1. **Desktop:**
   - Ícones estão centralizados verticalmente no espaço entre o topo da div (`py-2`) e o início do texto
   - Alinhamento visual está correto e harmonioso

2. **Tablet (entre ~768px e 1024px):**
   - Ícones mantêm centralização vertical
   - Alinhamento continua correto

3. **Mobile (< 768px):**
   - Ícones centralizados verticalmente
   - Alinhamento mantido em telas menores

---

## 💡 Notas Finais

- O valor do padding-top (`pt-1`) é um ponto de partida. Pode ser necessário ajustar para `pt-0.5` (menos espaço) ou `pt-1.5` (mais espaço) dependendo do resultado visual.
- Se após a implementação o alinhamento ainda não estiver perfeito, podemos experimentar valores intermediários como `pt-[3px]` ou `pt-[5px]` usando valores arbitrários do Tailwind.
- A abordagem de usar `items-start` + `pt-1` é mais simples e previsível do que tentar centralizar com `items-center` e ajustes complexos.
- O alinhamento deve ser verificado visualmente em diferentes tamanhos de tela para garantir consistência.

