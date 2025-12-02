# 23 — Alinhamento de Ícones e Justificação de Texto nos Cards de Regiões

## 📋 Objetivo

Ajustar os cards de regiões atendidas para:
1. **Texto justificado sem hífen** — os parágrafos dos cards devem estar justificados (`text-justify`) mas sem hífens automáticos (`hyphens-none`)
2. **Ícones centralizados verticalmente** — os ícones (TreePalm, Shell, Flag) devem estar centralizados verticalmente entre o início do texto e a borda superior da div do card

---

## 🎨 Especificações de Design

### Estado Atual

**Estrutura atual dos cards:**

```tsx
<div className="px-6 py-2 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors w-full max-w-md">
  <div className="flex items-center gap-2">
    <TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0" />
    <div>
      <p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed font-montserrat">
        {/* conteúdo do texto */}
      </p>
    </div>
  </div>
</div>
```

**Problemas identificados:**
- O texto não está justificado
- O texto pode ter hífens automáticos (comportamento padrão do navegador)
- O ícone está alinhado ao topo do texto, não centralizado entre o topo da div e o início do texto

### Estado Desejado

**Visual esperado:**

```
┌─────────────────────────────────────────┐
│  [🌴]  Recife e Região Metropolitana    │
│       a partir de 100 doses.            │
│       (texto justificado, sem hífen)    │
└─────────────────────────────────────────┘
     ↑
  Ícone centralizado verticalmente
  entre o topo da div e o início do texto
```

**Requisitos:**
- Texto justificado (`text-justify`)
- Sem hífens automáticos (`hyphens-none`)
- Ícone centralizado verticalmente em relação à altura total do card (não apenas alinhado ao topo do texto)

---

## 🔧 Estratégia de Implementação

### 1. Justificação de Texto sem Hífen

Para justificar o texto sem hífens:
- Adicionar `text-justify` ao parágrafo
- Adicionar `hyphens-none` para desabilitar hífens automáticos

### 2. Centralização Vertical do Ícone

O ícone precisa estar centralizado entre:
- **Topo da div** (borda superior com `py-2`)
- **Início do texto** (primeira linha do parágrafo)

**Soluções possíveis:**

**Opção A — Usar `items-start` no flex e ajustar o ícone com `self-center`:**
- Manter o container flex com `items-start`
- Aplicar `self-center` no ícone para centralizá-lo verticalmente em relação ao container pai

**Opção B — Usar `items-center` e ajustar o padding do texto:**
- Mudar `items-center` para `items-start` no flex container
- Adicionar padding-top no container do texto para compensar
- Centralizar o ícone com `self-center` ou `mt-auto mb-auto`

**Opção C — Usar `align-self` no ícone:**
- Manter o flex container como está
- Aplicar `self-center` no ícone para centralizá-lo verticalmente

**Recomendação:** Usar **Opção C** (mais simples e limpa):
- Manter `flex items-center` no container
- Adicionar `self-center` no ícone para centralizá-lo verticalmente

---

## 🔧 Implementação Técnica (Planejada)

> **Importante:** este arquivo é apenas documentação.  
> Nada disso foi aplicado ainda — só será implementado quando você autorizar.

### Passo 1 — Adicionar Justificação e Remover Hífens

**Arquivo**: `components/audience.tsx`

**Estado atual do parágrafo:**

```tsx
<p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed font-montserrat">
  {/* conteúdo */}
</p>
```

**Ação planejada:**
1. Adicionar `text-justify` para justificar o texto
2. Adicionar `hyphens-none` para desabilitar hífens automáticos

**Código proposto:**

```tsx
<p className="text-xs sm:text-sm lg:text-base text-cream-50 leading-relaxed text-justify hyphens-none font-montserrat">
  {/* conteúdo */}
</p>
```

### Passo 2 — Centralizar Verticalmente o Ícone

**Arquivo**: `components/audience.tsx`

**Estado atual do container flex:**

```tsx
<div className="flex items-center gap-2">
  <TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0" />
  <div>
    {/* texto */}
  </div>
</div>
```

**Ação planejada:**
1. Manter `flex items-center` no container (já está correto)
2. Adicionar `self-center` no ícone para centralizá-lo verticalmente

**Código proposto:**

```tsx
<div className="flex items-center gap-2">
  <TreePalm className="w-6 h-6 text-coffee-500 flex-shrink-0 self-center" />
  <div>
    {/* texto */}
  </div>
</div>
```

**Explicação:**
- `items-center` no flex container centraliza os itens filhos horizontalmente (no eixo cross)
- `self-center` no ícone sobrescreve o alinhamento padrão e centraliza o ícone verticalmente em relação ao container flex
- Isso garante que o ícone fique centralizado entre o topo da div (`py-2`) e o início do texto

### Passo 3 — Aplicar em Todos os Três Cards

As mesmas alterações devem ser aplicadas nos três cards:
1. **Card 1** — TreePalm (Recife e Região Metropolitana)
2. **Card 2** — Shell (Pernambuco, Paraíba e Alagoas)
3. **Card 3** — Flag (Brasil)

---

## 📝 Resumo das Alterações Planejadas

### Arquivos a Modificar

1. **`components/audience.tsx`**
   - Adicionar `text-justify hyphens-none` nos três parágrafos dos cards
   - Adicionar `self-center` nos três ícones (TreePalm, Shell, Flag)

### Mudanças Planejadas

| Item                     | Situação Atual                               | Situação Proposta                                      |
|--------------------------|----------------------------------------------|--------------------------------------------------------|
| Justificação do texto    | Não justificado                              | `text-justify`                                         |
| Hífens automáticos       | Pode ter hífens (comportamento padrão)       | `hyphens-none` (desabilitado)                         |
| Alinhamento vertical do ícone | Alinhado ao topo do texto (`items-center`) | `self-center` no ícone (centralizado verticalmente)  |

---

## ✅ Checklist de Implementação (para quando você autorizar)

- [ ] Adicionar `text-justify hyphens-none` no parágrafo do **Card 1** (Recife e Região Metropolitana)
- [ ] Adicionar `self-center` no ícone **TreePalm** do Card 1
- [ ] Adicionar `text-justify hyphens-none` no parágrafo do **Card 2** (Pernambuco, Paraíba e Alagoas)
- [ ] Adicionar `self-center` no ícone **Shell** do Card 2
- [ ] Adicionar `text-justify hyphens-none` no parágrafo do **Card 3** (Brasil)
- [ ] Adicionar `self-center` no ícone **Flag** do Card 3
- [ ] Verificar em **desktop** se:
  - [ ] Os textos estão justificados
  - [ ] Não há hífens automáticos
  - [ ] Os ícones estão centralizados verticalmente
- [ ] Verificar em **tablet** (≥ 768px)
- [ ] Verificar em **mobile** (< 768px)

---

## 🔍 Verificação Pós-Implementação

Após aplicar as mudanças:

1. **Desktop:**
   - Textos dos três cards estão justificados
   - Não há hífens automáticos nas palavras
   - Ícones estão centralizados verticalmente entre o topo da div e o início do texto

2. **Tablet (entre ~768px e 1024px):**
   - Textos continuam justificados
   - Ícones mantêm centralização vertical

3. **Mobile (< 768px):**
   - Textos justificados (pode ser menos visível em telas pequenas, mas deve estar aplicado)
   - Ícones centralizados verticalmente

---

## 💡 Notas Finais

- A justificação de texto (`text-justify`) funciona melhor em textos com múltiplas linhas. Em textos muito curtos, o efeito pode ser menos perceptível.
- O `hyphens-none` garante que o navegador não adicione hífens automáticos, mesmo que o texto seja justificado.
- O `self-center` no ícone garante que ele fique centralizado verticalmente em relação ao container flex, independentemente da altura do texto.
- Se após a implementação o alinhamento vertical não ficar como esperado, podemos ajustar usando `mt-auto mb-auto` ou ajustando o padding do container do texto.

