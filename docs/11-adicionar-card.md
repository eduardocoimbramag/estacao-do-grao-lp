# 11 — Adicionar Card: Regiões Específicas (Seção 4)

## 📋 Objetivo

Adicionar um **terceiro card** na Seção 4 (`components/audience.tsx`) entre os cards existentes, com informações sobre atendimento em estados específicos:
- **Posição**: Entre o card "Nordeste - 100 doses" e o card "Brasil - 3.000 doses"
- **Conteúdo**: "Atendemos Pernambuco, Paraíba e Alagoas a partir de 50 doses."
- **Padrão visual**: Idêntico aos cards existentes

---

## 🎨 Especificações de Design

### Layout Atual vs Novo

#### ANTES (2 cards)
```
┌─────────────────────────────────────────────┐
│         REGIÕES ATENDIDAS (título)          │
├──────────────────┬──────────────────────────┤
│                  │                          │
│   [IMAGEM DO     │  📍 [Card 1]             │
│    MAPA]         │  Nordeste - 100 doses    │
│                  │                          │
│                  │  🌎 [Card 2]             │
│                  │  Brasil - 3.000 doses   │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

#### DEPOIS (3 cards)
```
┌─────────────────────────────────────────────┐
│         REGIÕES ATENDIDAS (título)          │
├──────────────────┬──────────────────────────┤
│                  │                          │
│   [IMAGEM DO     │  📍 [Card 1]             │
│    MAPA]         │  Nordeste - 100 doses    │
│                  │                          │
│                  │  🧭 [Card 2 - NOVO]      │
│                  │  PE/PB/AL - 50 doses     │
│                  │                          │
│                  │  🌎 [Card 3]            │
│                  │  Brasil - 3.000 doses   │
│                  │                          │
└──────────────────┴──────────────────────────┘
```

### Estrutura do Novo Card

O card deve seguir **exatamente** o mesmo padrão dos cards existentes:

```tsx
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
```

### Cores e Estilos

- **Background do card**: `bg-coffee-900/60` (opacidade 60%)
- **Borda padrão**: `border-coffee-700`
- **Borda no hover**: `hover:border-coffee-500/50` (dourado transparente)
- **Padding**: `p-8`
- **Bordas arredondadas**: `rounded-2xl`
- **Transição**: `transition-colors`
- **Texto principal**: `text-cream-50`
- **Destaques**: `text-coffee-500` (dourado)
- **Número em destaque**: `text-coffee-500 font-bold text-xl sm:text-2xl`

### Ícone

**Sugestão**: `Navigation` do `lucide-react`
- **Tamanho**: `w-10 h-10` (igual aos outros)
- **Cor**: `text-coffee-500` (dourado)
- **Posicionamento**: `flex-shrink-0 mt-1`

**Alternativas** (caso prefira outro ícone):
- `MapPinned` - Pin de mapa fixo
- `Locate` - Localização específica
- `Map` - Mapa simples

---

## 📁 Estrutura de Arquivos

### Arquivo a Modificar

**Arquivo**: `components/audience.tsx`

**Mudanças necessárias**:
1. Adicionar import do ícone `Navigation` (ou outro escolhido)
2. Inserir o novo card entre os cards existentes
3. Manter a estrutura `space-y-8` para espaçamento consistente

---

## 💻 Implementação

### Passo 1: Atualizar Imports

```tsx
import { MapPin, Globe, Navigation } from "lucide-react"
```

### Passo 2: Adicionar o Novo Card

O card deve ser inserido **entre** o card do Nordeste e o card do Brasil, dentro da `<div className="space-y-8">`:

```tsx
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

  {/* Estados Específicos - 50 doses - NOVO */}
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
```

### Código Completo da Seção (Referência)

```tsx
import Image from "next/image"
import { MapPin, Globe, Navigation } from "lucide-react"

export default function Audience() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-coffee-900">
      <div className="max-w-7xl mx-auto">
        
        {/* Título Principal Centralizado */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-12 sm:mb-16">
          REGIÕES ATENDIDAS
        </h2>

        {/* Grid de 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Imagem do Mapa */}
          <div className="flex justify-center">
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
- Imagem aparece **acima** dos cards
- Cards empilhados verticalmente com `space-y-8`
- Espaçamento consistente entre todos os cards

### Desktop (≥ 1024px)

- Grid de **2 colunas** (`lg:grid-cols-2`)
- Imagem à **esquerda**, cards à **direita**
- 3 cards empilhados verticalmente
- Alinhamento vertical centralizado: `items-center`
- Espaçamento entre cards: `space-y-8` (32px)

**Nota**: O `space-y-8` já está aplicado no container dos cards, então o novo card será automaticamente espaçado corretamente.

---

## 🎯 Conteúdo de Texto

### Texto do Novo Card

```
Atendemos Pernambuco, Paraíba e Alagoas a partir de 50 doses.
```

**Formatação**:
- "Pernambuco, Paraíba e Alagoas" → `text-coffee-500` (dourado)
- "50 doses" → `text-coffee-500 font-bold text-xl sm:text-2xl` (dourado + negrito + tamanho maior)

### Ordem dos Cards (de cima para baixo)

1. **Card 1**: Nordeste - 100 doses (MapPin)
2. **Card 2**: Pernambuco, Paraíba e Alagoas - 50 doses (Navigation) ← **NOVO**
3. **Card 3**: Brasil - 3.000 doses (Globe)

**Lógica**: Do menor para o maior volume mínimo (50 → 100 → 3.000)

---

## 🔧 Classes Tailwind Utilizadas

### Card Container
```tsx
className="p-8 bg-coffee-900/60 border border-coffee-700 rounded-2xl hover:border-coffee-500/50 transition-colors"
```
- Padding interno: `p-8` (32px)
- Background semi-transparente: `bg-coffee-900/60`
- Borda padrão: `border-coffee-700`
- Hover effect: `hover:border-coffee-500/50`
- Transição suave: `transition-colors`
- Bordas arredondadas: `rounded-2xl`

### Container de Ícone e Texto
```tsx
className="flex items-start gap-4"
```
- Layout flex horizontal
- Alinhamento no topo: `items-start`
- Gap entre ícone e texto: `gap-4` (16px)

### Ícone
```tsx
className="w-10 h-10 text-coffee-500 flex-shrink-0 mt-1"
```
- Tamanho: `w-10 h-10` (40px)
- Cor: `text-coffee-500` (dourado)
- Não encolhe: `flex-shrink-0`
- Ajuste vertical: `mt-1` (4px)

### Texto
```tsx
className="text-base sm:text-lg lg:text-xl text-cream-50 leading-relaxed"
```
- Tamanho responsivo: `text-base sm:text-lg lg:text-xl`
- Cor: `text-cream-50` (#eff0e0)
- Espaçamento de linha: `leading-relaxed`

### Destaques no Texto
```tsx
className="text-coffee-500"
```
- Cor dourada para estados

```tsx
className="text-coffee-500 font-bold text-xl sm:text-2xl"
```
- Cor dourada + negrito + tamanho maior para número

---

## 📐 Espaçamentos

| Elemento | Valor |
|----------|-------|
| Espaçamento entre cards | `space-y-8` (32px) |
| Padding interno do card | `p-8` (32px) |
| Gap entre ícone e texto | `gap-4` (16px) |
| Margin top do ícone | `mt-1` (4px) |

**Nota**: O `space-y-8` no container `<div className="space-y-8">` aplica automaticamente 32px de espaçamento vertical entre todos os cards filhos.

---

## ♿ Acessibilidade

### Estrutura Semântica
- ✅ Uso de `<strong>` para ênfase semântica (não apenas visual)
- ✅ Hierarquia de texto clara
- ✅ Contraste adequado (cream-50 em coffee-900)

### Interatividade
- ✅ Hover effect visível (`hover:border-coffee-500/50`)
- ✅ Transição suave para feedback visual
- ✅ Layout responsivo e acessível em touch

### Conteúdo
- ✅ Texto descritivo e claro
- ✅ Números destacados visualmente
- ✅ Informação hierárquica (50 < 100 < 3.000)

---

## 🧪 Checklist de Implementação

### Antes de começar
- [ ] Fazer backup do arquivo `components/audience.tsx` atual
- [ ] Verificar se o ícone `Navigation` está disponível no `lucide-react`
- [ ] Revisar o código atual para entender a estrutura

### Implementação
- [ ] Abrir `components/audience.tsx`
- [ ] Adicionar `Navigation` ao import do `lucide-react`
- [ ] Localizar a `<div className="space-y-8">` que contém os cards
- [ ] Inserir o novo card entre o card do Nordeste e o card do Brasil
- [ ] Copiar a estrutura exata dos cards existentes
- [ ] Atualizar o texto conforme especificado
- [ ] Verificar que todas as classes estão corretas

### Testes
- [ ] Verificar se o card aparece corretamente
- [ ] Confirmar que o espaçamento está consistente (`space-y-8`)
- [ ] Testar responsividade em mobile (< 768px)
- [ ] Testar responsividade em tablet (768px - 1024px)
- [ ] Testar responsividade em desktop (> 1024px)
- [ ] Verificar hover effect no novo card
- [ ] Confirmar que "50 doses" está em dourado + negrito + maior
- [ ] Confirmar que "Pernambuco, Paraíba e Alagoas" está em dourado
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Testar navegação por teclado

### Ajustes finais
- [ ] Verificar ordem dos cards (50 → 100 → 3.000)
- [ ] Confirmar que o ícone está alinhado corretamente
- [ ] Ajustar espaçamentos se necessário
- [ ] Testar em diferentes navegadores
- [ ] Verificar que não há erros de linting

---

## 📊 Comparação: Antes vs Depois

### ANTES (2 cards)
```
Card 1: Nordeste - 100 doses
Card 2: Brasil - 3.000 doses
```

### DEPOIS (3 cards)
```
Card 1: Nordeste - 100 doses
Card 2: Pernambuco, Paraíba e Alagoas - 50 doses ← NOVO
Card 3: Brasil - 3.000 doses
```

**Mudanças principais**:
- ✅ Adiciona card intermediário com volume menor (50 doses)
- ✅ Especifica estados atendidos com menor volume mínimo
- ✅ Mantém hierarquia lógica (50 < 100 < 3.000)
- ✅ Usa ícone diferente (`Navigation`) para diferenciação visual
- ✅ Mantém padrão visual idêntico aos outros cards

---

## 🎨 Variações de Design (Opcionais)

### Opção 1: Ícone diferente

Se preferir outro ícone, opções do `lucide-react`:

```tsx
import { MapPinned } from "lucide-react"

<MapPinned className="w-10 h-10 text-coffee-500 flex-shrink-0 mt-1" />
```

### Opção 2: Destaque adicional

Se quiser destacar ainda mais o número:

```tsx
<strong className="text-coffee-500 font-bold text-2xl sm:text-3xl">50 doses</strong>
```

### Opção 3: Abreviação dos estados

Se o texto ficar muito longo em mobile:

```tsx
Atendemos <strong className="text-coffee-500">PE, PB e AL</strong> a partir de{" "}
<strong className="text-coffee-500 font-bold text-xl sm:text-2xl">50 doses</strong>.
```

---

## 📝 Notas Importantes

1. **Ordem dos cards**:
   - A ordem proposta (50 → 100 → 3.000) segue uma lógica hierárquica
   - Se preferir outra ordem, ajuste a posição no código

2. **Ícone**:
   - O ícone `Navigation` foi escolhido para diferenciar dos outros
   - Pode ser substituído por qualquer outro ícone do `lucide-react`
   - Importante manter o mesmo tamanho e estilo (`w-10 h-10 text-coffee-500`)

3. **Espaçamento**:
   - O `space-y-8` já aplicado no container garante espaçamento consistente
   - Não é necessário adicionar margens extras no novo card

4. **Consistência visual**:
   - Todas as classes devem ser idênticas aos cards existentes
   - A única diferença é o conteúdo do texto e o ícone

5. **Responsividade**:
   - O layout é totalmente responsivo
   - Em mobile, os 3 cards aparecerão empilhados abaixo da imagem
   - Em desktop, os 3 cards aparecerão empilhados ao lado da imagem

---

## 🚀 Próximos Passos

1. **Revisar documentação**: Confirmar que todas as especificações estão corretas
2. **Autorizar implementação**: Aguardar aprovação para implementar
3. **Implementar código**: Seguir estrutura JSX proposta
4. **Testar**: Validar responsividade e visual
5. **Ajustar**: Fazer fine-tuning se necessário

---

## 🆘 Troubleshooting

### Card não aparece
- ✅ Verificar se o card foi inserido dentro da `<div className="space-y-8">`
- ✅ Confirmar que não há erros de sintaxe JSX
- ✅ Verificar se o import do ícone está correto

### Espaçamento incorreto
- ✅ Confirmar que o card está dentro do container com `space-y-8`
- ✅ Verificar se não há margens extras aplicadas
- ✅ Testar removendo e readicionando o card

### Ícone não aparece
- ✅ Verificar se `Navigation` foi importado do `lucide-react`
- ✅ Confirmar que o nome do ícone está correto (case-sensitive)
- ✅ Verificar se o `lucide-react` está instalado: `pnpm list lucide-react`

### Cores não aparecem
- ✅ Verificar se tokens `coffee-*` e `cream-*` estão em `globals.css`
- ✅ Confirmar que Tailwind está compilando corretamente
- ✅ Inspecionar classes no navegador

---

## 📌 Referências

- **Arquivo atual**: `components/audience.tsx`
- **Documentação original**: `docs/10-nova-secao.md`
- **Documentação de implementação**: `docs/IMPLEMENTADO-SECAO-REGIOES.md`
- **Paleta de cores**: `app/globals.css` (linhas 84-100)
- **Biblioteca de ícones**: `lucide-react`

---

**Documentação criada em:** 2025-01-27  
**Seção:** 4 (Audience/Regiões Atendidas)  
**Status:** 📝 Documentação pronta - Aguardando autorização para implementação

---

## 📋 Resumo Executivo

### O que será feito:
- ✅ Adicionar 1 novo card na Seção 4
- ✅ Posicionar entre o card "Nordeste" e o card "Brasil"
- ✅ Texto: "Atendemos Pernambuco, Paraíba e Alagoas a partir de 50 doses."
- ✅ Ícone: `Navigation` (ou outro escolhido)
- ✅ Manter padrão visual idêntico aos cards existentes

### Arquivos a modificar:
- `components/audience.tsx` (adicionar import e novo card)

### Impacto:
- ✅ Apenas adição de conteúdo
- ✅ Nenhuma mudança estrutural
- ✅ Mantém responsividade existente
- ✅ Sem breaking changes

