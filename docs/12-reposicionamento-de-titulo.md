# 12 — Reposicionamento de Título: Regiões Atendidas (Seção 4)

## 📋 Objetivo

Reposicionar o título **"REGIÕES ATENDIDAS"** da Seção 4 (`components/audience.tsx`) para ficar dentro da **coluna esquerda**, centralizado verticalmente com a imagem do mapa, em vez de estar acima de todo o grid.

**Mudanças**:
- **Remover**: Título acima do grid (posição atual)
- **Adicionar**: Título dentro da coluna esquerda, centralizado verticalmente com o mapa
- **Manter**: Toda a estrutura e estilos dos cards na coluna direita

---

## 🎨 Especificações de Design

### Layout Atual vs Novo

#### ANTES (Título acima do grid)
```
┌─────────────────────────────────────────────┐
│         REGIÕES ATENDIDAS (título)          │
│         (centralizado acima)                │
├──────────────────┬──────────────────────────┤
│                  │                          │
│   [IMAGEM DO     │  📍 [Card 1]             │
│    MAPA]         │  Nordeste - 100 doses    │
│                  │                          │
│                  │  🧭 [Card 2]             │
│                  │  PE/PB/AL - 50 doses     │
│                  │                          │
│                  │  🌎 [Card 3]            │
│                  │  Brasil - 3.000 doses   │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

#### DEPOIS (Título na coluna esquerda)
```
┌─────────────────────────────────────────────┐
├──────────────────┬──────────────────────────┤
│                  │                          │
│  REGIÕES         │  📍 [Card 1]             │
│  ATENDIDAS       │  Nordeste - 100 doses    │
│  (título)        │                          │
│                  │  🧭 [Card 2]             │
│   [IMAGEM DO     │  PE/PB/AL - 50 doses     │
│    MAPA]         │                          │
│                  │  🌎 [Card 3]            │
│                  │  Brasil - 3.000 doses   │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

### Estrutura da Coluna Esquerda

A coluna esquerda deve conter:
1. **Título**: "REGIÕES ATENDIDAS"
2. **Imagem do Mapa**: Mantém o mesmo tamanho e estilo

**Layout interno**:
- Container flex vertical (`flex flex-col`)
- Alinhamento centralizado verticalmente (`justify-center` ou `items-center`)
- Espaçamento entre título e mapa (`gap-6` ou `gap-8`)
- Título centralizado horizontalmente (`text-center`)

### Cores e Estilos do Título

**Mantém os mesmos estilos atuais**:
- **Fonte**: `font-serif` (Playfair Display)
- **Tamanho**: `text-3xl sm:text-4xl lg:text-5xl`
- **Peso**: `font-bold`
- **Cor**: `text-white`
- **Alinhamento**: `text-center` (horizontal)

**Mudanças**:
- ❌ Remove: `mb-12 sm:mb-16` (margem inferior não é mais necessária)
- ✅ Adiciona: Espaçamento inferior para separar do mapa (`mb-6` ou `mb-8`)

---

## 📁 Estrutura de Arquivos

### Arquivo a Modificar

**Arquivo**: `components/audience.tsx`

**Mudanças necessárias**:
1. Remover o título que está acima do grid
2. Mover o título para dentro da coluna esquerda
3. Ajustar o container da coluna esquerda para layout flex vertical
4. Centralizar verticalmente o conteúdo (título + mapa)
5. Ajustar espaçamentos

---

## 💻 Implementação

### Passo 1: Remover Título Acima do Grid

**Remover este bloco**:
```tsx
{/* Título Principal Centralizado */}
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-16">
  REGIÕES ATENDIDAS
</h2>
```

### Passo 2: Reestruturar Coluna Esquerda

**Estrutura atual** (coluna esquerda):
```tsx
{/* Coluna Esquerda: Imagem do Mapa */}
<div className="flex justify-center">
  <div className="relative w-[70%] max-w-md lg:max-w-[70%] aspect-square">
    <Image ... />
  </div>
</div>
```

**Nova estrutura** (coluna esquerda com título):
```tsx
{/* Coluna Esquerda: Título + Imagem do Mapa */}
<div className="flex flex-col justify-center items-center gap-6 lg:gap-8">
  {/* Título */}
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center">
    REGIÕES ATENDIDAS
  </h2>
  
  {/* Imagem do Mapa */}
  <div className="relative w-[70%] max-w-md lg:max-w-[70%] aspect-square">
    <Image
      src="/mapa-estacao-grao2.png"
      alt="Mapa de regiões atendidas pela Estação do Grão no Nordeste e Brasil"
      fill
      className="object-contain"
      sizes="(max-width: 1024px) 313px, 420px"
      priority={false}
    />
  </div>
</div>
```

### Código Completo da Seção (Referência)

```tsx
import Image from "next/image"
import { MapPin, Globe, Navigation } from "lucide-react"

export default function Audience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Título + Imagem do Mapa */}
          <div className="flex flex-col justify-center items-center gap-6 lg:gap-8">
            {/* Título */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center">
              REGIÕES ATENDIDAS
            </h2>
            
            {/* Imagem do Mapa */}
            <div className="relative w-[70%] max-w-md lg:max-w-[70%] aspect-square">
              <Image
                src="/mapa-estacao-grao2.png"
                alt="Mapa de regiões atendidas pela Estação do Grão no Nordeste e Brasil"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 313px, 420px"
                priority={false}
              />
            </div>
          </div>

          {/* Coluna Direita: Texto sobre Cobertura */}
          <div className="space-y-8">
            
            {/* Nordeste - 100 doses */}
            <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <MapPin className="w-10 h-10 text-coffee-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed">
                    Atendemos toda a <strong className="text-coffee-500">região do Nordeste</strong> a partir de{" "}
                    <strong className="text-coffee-500 font-bold text-xl sm:text-2xl">100 doses</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Estados Específicos - 50 doses */}
            <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <Navigation className="w-10 h-10 text-coffee-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed">
                    Atendemos <strong className="text-coffee-500">Pernambuco, Paraíba e Alagoas</strong> a partir de{" "}
                    <strong className="text-coffee-500 font-bold text-xl sm:text-2xl">50 doses</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Brasil - 3.000 doses */}
            <div className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors">
              <div className="flex items-start gap-4">
                <Globe className="w-10 h-10 text-coffee-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed">
                    Atendemos <strong className="text-coffee-500">todo o Brasil</strong> a partir de{" "}
                    <strong className="text-coffee-500 font-bold text-xl sm:text-2xl">3.000 doses</strong>.
                  </p>
                </div>
              </div>
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
- **Ordem dos elementos**:
  1. Título "REGIÕES ATENDIDAS" (centralizado)
  2. Imagem do mapa (abaixo do título)
  3. Cards empilhados verticalmente (abaixo da imagem)
- Espaçamento entre título e mapa: `gap-6` (24px)
- Título centralizado horizontalmente

### Desktop (≥ 1024px)

- Grid de **2 colunas** (`lg:grid-cols-2`)
- **Coluna esquerda**:
  - Título no topo
  - Mapa abaixo do título
  - Centralizado verticalmente com a coluna direita (`items-center` no grid)
  - Espaçamento entre título e mapa: `lg:gap-8` (32px)
- **Coluna direita**:
  - 3 cards empilhados verticalmente
  - Mantém `space-y-8` (32px entre cards)
- Alinhamento vertical: `items-center` no grid garante que ambas as colunas fiquem centralizadas verticalmente

**Nota**: O `items-center` no grid principal garante que a coluna esquerda (título + mapa) fique centralizada verticalmente com a coluna direita (cards).

---

## 🔧 Classes Tailwind Utilizadas

### Container da Coluna Esquerda
```tsx
className="flex flex-col justify-center items-center gap-6 lg:gap-8"
```
- **Layout**: `flex flex-col` (flex vertical)
- **Alinhamento vertical**: `justify-center` (centraliza conteúdo verticalmente)
- **Alinhamento horizontal**: `items-center` (centraliza horizontalmente)
- **Espaçamento**: `gap-6 lg:gap-8` (24px mobile, 32px desktop)

### Título
```tsx
className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center"
```
- **Tamanho responsivo**: `text-3xl sm:text-4xl lg:text-5xl`
- **Peso**: `font-bold`
- **Cor**: `text-white`
- **Alinhamento**: `text-center` (centralizado horizontalmente)
- **Removido**: `mb-12 sm:mb-16` (não é mais necessário, o gap cuida do espaçamento)

### Grid Principal
```tsx
className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
```
- **Mantém**: Todas as classes existentes
- **Importante**: `items-center` garante alinhamento vertical entre as colunas

### Imagem do Mapa
```tsx
className="relative w-[70%] max-w-md lg:max-w-[70%] aspect-square"
```
- **Mantém**: Todas as classes existentes
- **Sem mudanças**: A imagem continua com o mesmo tamanho e comportamento

---

## 📐 Espaçamentos

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Gap entre título e mapa | `gap-6` (24px) | `lg:gap-8` (32px) |
| Gap entre colunas | `gap-8` (32px) | `lg:gap-12` (48px) |
| Espaçamento entre cards | `space-y-8` (32px) | `space-y-8` (32px) |
| Padding vertical seção | `py-20` (80px) | `py-20` (80px) |
| Padding horizontal | `px-4` (16px) | `lg:px-8` (32px) |

**Nota**: O espaçamento entre título e mapa é controlado pelo `gap` do container flex, não por margens individuais.

---

## ♿ Acessibilidade

### Estrutura Semântica
- ✅ Mantém hierarquia de heading (`<h2>`)
- ✅ Título permanece como elemento semântico importante
- ✅ Ordem lógica de leitura mantida

### Layout
- ✅ Layout responsivo e acessível
- ✅ Título visível em todas as resoluções
- ✅ Contraste adequado (branco em fundo escuro)
- ✅ Tamanhos de fonte legíveis

### Navegação
- ✅ Estrutura clara e organizada
- ✅ Navegação por teclado mantida
- ✅ Screen readers podem identificar o título corretamente

---

## 🧪 Checklist de Implementação

### Antes de começar
- [ ] Fazer backup do arquivo `components/audience.tsx` atual
- [ ] Revisar o código atual para entender a estrutura
- [ ] Verificar se há outros lugares que referenciam o título acima

### Implementação
- [ ] Abrir `components/audience.tsx`
- [ ] Remover o bloco do título que está acima do grid
- [ ] Localizar a coluna esquerda (container do mapa)
- [ ] Transformar o container em flex vertical (`flex flex-col`)
- [ ] Adicionar `justify-center items-center` para centralização
- [ ] Adicionar `gap-6 lg:gap-8` para espaçamento
- [ ] Inserir o título dentro da coluna esquerda (antes do mapa)
- [ ] Remover `mb-12 sm:mb-16` do título (se ainda estiver)
- [ ] Manter `text-center` no título
- [ ] Verificar que a imagem do mapa mantém todas as classes

### Testes
- [ ] Verificar se o título aparece na coluna esquerda
- [ ] Confirmar que título e mapa estão centralizados verticalmente
- [ ] Testar responsividade em mobile (< 768px)
  - [ ] Título aparece acima do mapa
  - [ ] Espaçamento correto entre título e mapa
  - [ ] Cards aparecem abaixo da imagem
- [ ] Testar responsividade em tablet (768px - 1024px)
- [ ] Testar responsividade em desktop (> 1024px)
  - [ ] Título e mapa na coluna esquerda
  - [ ] Coluna esquerda centralizada verticalmente com coluna direita
  - [ ] Espaçamento adequado entre título e mapa
- [ ] Verificar alinhamento vertical entre colunas
- [ ] Confirmar que cards mantêm espaçamento correto
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Testar navegação por teclado

### Ajustes finais
- [ ] Ajustar espaçamentos se necessário (`gap-6` vs `gap-8`)
- [ ] Verificar se o título não fica muito próximo ou distante do mapa
- [ ] Testar em diferentes navegadores
- [ ] Verificar que não há erros de linting
- [ ] Confirmar que o layout está visualmente equilibrado

---

## 📊 Comparação: Antes vs Depois

### ANTES
```
┌───────────────────────────────────┐
│     REGIÕES ATENDIDAS             │
│     (título acima)                │
├─────────────┬─────────────────────┤
│   [MAPA]    │  📍 Card 1          │
│             │  🧭 Card 2          │
│             │  🌎 Card 3          │
└─────────────┴─────────────────────┘
```

### DEPOIS
```
┌───────────────────────────────────┐
├─────────────┬─────────────────────┤
│ REGIÕES     │  📍 Card 1          │
│ ATENDIDAS   │  🧭 Card 2          │
│ [MAPA]      │  🌎 Card 3          │
└─────────────┴─────────────────────┘
```

**Mudanças principais**:
- ✅ Título movido para dentro da coluna esquerda
- ✅ Título e mapa centralizados verticalmente
- ✅ Layout mais compacto e equilibrado
- ✅ Melhor aproveitamento do espaço vertical
- ✅ Coluna esquerda alinhada verticalmente com coluna direita

---

## 🎨 Variações de Design (Opcionais)

### Opção 1: Espaçamento maior entre título e mapa

Se quiser mais espaço entre título e mapa:

```tsx
<div className="flex flex-col justify-center items-center gap-8 lg:gap-12">
```

### Opção 2: Título com margem inferior customizada

Se preferir usar margin em vez de gap:

```tsx
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-6 lg:mb-8">
  REGIÕES ATENDIDAS
</h2>
```

### Opção 3: Alinhamento diferente do título

Se quiser título alinhado à esquerda (em vez de centralizado):

```tsx
<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-left">
  REGIÕES ATENDIDAS
</h2>
```

**Nota**: Recomenda-se manter `text-center` para melhor equilíbrio visual.

---

## 📝 Notas Importantes

1. **Centralização vertical**:
   - O `items-center` no grid principal garante que ambas as colunas fiquem centralizadas verticalmente
   - O `justify-center` no container da coluna esquerda centraliza o conteúdo dentro da coluna
   - Isso cria um alinhamento visual equilibrado

2. **Espaçamento**:
   - O `gap-6 lg:gap-8` no container flex controla o espaçamento entre título e mapa
   - Não é necessário usar margens individuais
   - O gap é mais flexível e responsivo

3. **Responsividade**:
   - Em mobile, o título aparece naturalmente acima do mapa (ordem do flex-col)
   - Em desktop, título e mapa ficam na coluna esquerda
   - O `items-center` no grid garante alinhamento vertical mesmo com alturas diferentes

4. **Consistência visual**:
   - Título mantém todos os estilos atuais (fonte, tamanho, cor)
   - Apenas a posição muda
   - Cards na coluna direita não são afetados

5. **SEO e Acessibilidade**:
   - Título permanece como `<h2>` (semântico)
   - Hierarquia de headings mantida
   - Screen readers continuam identificando corretamente

---

## 🚀 Próximos Passos

1. **Revisar documentação**: Confirmar que todas as especificações estão corretas
2. **Autorizar implementação**: Aguardar aprovação para implementar
3. **Implementar código**: Seguir estrutura JSX proposta
4. **Testar**: Validar responsividade e alinhamento vertical
5. **Ajustar**: Fazer fine-tuning de espaçamentos se necessário

---

## 🆘 Troubleshooting

### Título não aparece na coluna esquerda
- ✅ Verificar se o título foi removido de cima do grid
- ✅ Confirmar que o título está dentro do container da coluna esquerda
- ✅ Verificar se não há erros de sintaxe JSX

### Título e mapa não estão centralizados verticalmente
- ✅ Confirmar que o container tem `flex flex-col justify-center items-center`
- ✅ Verificar se o grid principal tem `items-center`
- ✅ Testar removendo e readicionando as classes

### Espaçamento incorreto entre título e mapa
- ✅ Ajustar o valor do `gap` (tentar `gap-4`, `gap-6`, `gap-8`)
- ✅ Verificar se não há margens extras aplicadas
- ✅ Testar em diferentes tamanhos de tela

### Layout quebrado em mobile
- ✅ Confirmar que o grid tem `grid-cols-1` para mobile
- ✅ Verificar se o flex-col está funcionando corretamente
- ✅ Testar em diferentes dispositivos

### Colunas não alinhadas verticalmente
- ✅ Confirmar que o grid tem `items-center`
- ✅ Verificar se ambas as colunas têm altura similar
- ✅ Testar com conteúdo de alturas diferentes

---

## 📌 Referências

- **Arquivo atual**: `components/audience.tsx`
- **Documentação anterior**: `docs/11-adicionar-card.md`
- **Documentação original**: `docs/10-nova-secao.md`
- **Paleta de cores**: `app/globals.css` (linhas 84-100)

---

**Documentação criada em:** 2025-01-27  
**Seção:** 4 (Audience/Regiões Atendidas)  
**Status:** 📝 Documentação pronta - Aguardando autorização para implementação

---

## 📋 Resumo Executivo

### O que será feito:
- ✅ Remover título que está acima do grid
- ✅ Mover título para dentro da coluna esquerda
- ✅ Centralizar verticalmente título e mapa
- ✅ Manter todos os estilos do título
- ✅ Manter estrutura dos cards na coluna direita

### Arquivos a modificar:
- `components/audience.tsx` (reestruturar coluna esquerda)

### Impacto:
- ✅ Mudança de layout visual
- ✅ Melhor aproveitamento do espaço vertical
- ✅ Layout mais equilibrado e compacto
- ✅ Nenhuma mudança nos cards
- ✅ Sem breaking changes funcionais

### Mudanças técnicas:
- Remover: Título acima do grid
- Adicionar: Título dentro da coluna esquerda
- Modificar: Container da coluna esquerda para flex vertical
- Manter: Todas as classes e estilos dos cards

