# Implementação: Página "Em Construção" e Redirecionamento de Botões

## Objetivo

Criar uma página "Em Construção" para redirecionar os botões "Galeria de experiências" e "Blog" da seção "Regiões Atendidas", exibindo uma mensagem apropriada com ícones visuais e um botão para voltar.

**Requisitos:**
- ✅ Criar página "Em Construção" com design consistente com o tema do site
- ✅ Incluir mensagem "Em Construção"
- ✅ Ícone representando construção (ferramentas/engrenagem)
- ✅ Ícone de xícara de café (tema do site)
- ✅ Botão "Voltar" para retornar à página inicial
- ✅ Atualizar links dos botões "Galeria" e "Blog" para redirecionar para essa página

---

## Análise da Situação Atual

### Botões na Seção "Regiões Atendidas"

**Arquivo:** `components/audience.tsx`

**Botão 1 - Galeria de experiências (linha 78-96):**
```tsx
<Link
  href="#galeria"
  className="..."
>
  Galeria de experiências
</Link>
```
- **Problema:** Aponta para `#galeria` (anchor na mesma página), mas não há uma seção de galeria visível na página principal
- **Comportamento atual:** Leva ao topo da página

**Botão 2 - Blog (linha 98-117):**
```tsx
<Link
  href="/blog"
  className="..."
>
  Blog
</Link>
```
- **Problema:** Aponta para `/blog`, mas essa rota não existe
- **Comportamento atual:** Resulta em erro 404

### Estrutura de Páginas Atual

```
app/
  layout.tsx
  page.tsx       (página principal - landing page)
  globals.css
```

**Observação:** O projeto usa Next.js App Router, então novas páginas devem ser criadas em `app/[nome-da-rota]/page.tsx`

---

## Solução Proposta

### Estrutura da Solução

1. **Criar nova página:** `app/em-construcao/page.tsx`
2. **Atualizar links:** Modificar `components/audience.tsx` para apontar para `/em-construcao`

### Design da Página "Em Construção"

**Elementos a incluir:**
- Fundo: Mesma paleta do site (`bg-coffee-900`)
- Layout: Centralizado vertical e horizontalmente
- Mensagem principal: "Em Construção"
- Ícones:
  - Ícone de construção (ex: `Wrench`, `Hammer` ou `Settings` do lucide-react)
  - Ícone de xícara de café (`Coffee` do lucide-react)
- Botão "Voltar": Link para página inicial (`/`)

**Estilo:**
- Tipografia: Montserrat (padrão do projeto)
- Cores: Paleta coffee (coffee-900, coffee-500, cream-50)
- Layout responsivo: Mobile-first

---

## Implementação Detalhada

### 1. Criar Página "Em Construção"

**Arquivo:** `app/em-construcao/page.tsx` (novo arquivo)

**Estrutura proposta:**
```tsx
import Link from "next/link"
import { Coffee, Wrench, ArrowLeft } from "lucide-react"

export default function EmConstrucaoPage() {
  return (
    <div className="min-h-screen bg-coffee-900 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Ícones */}
        <div className="flex justify-center items-center gap-6">
          <Wrench className="w-16 h-16 sm:w-20 sm:h-20 text-coffee-500" />
          <Coffee className="w-16 h-16 sm:w-20 sm:h-20 text-coffee-500" />
        </div>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream-50 font-montserrat">
          Em Construção
        </h1>

        {/* Mensagem */}
        <p className="text-lg sm:text-xl text-cream-50/80 font-montserrat">
          Esta página está sendo elaborada. Em breve teremos novidades!
        </p>

        {/* Botão Voltar */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-coffee-500 text-coffee-900 font-semibold rounded-xl hover:bg-coffee-700 hover:text-white transition-colors font-montserrat"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
      </div>
    </div>
  )
}
```

**Observações:**
- Usa ícones do `lucide-react` (já presente no projeto)
- Layout centralizado com flexbox
- Responsivo (mobile-first)
- Botão com ícone de seta para melhor UX

---

### 2. Atualizar Links dos Botões

**Arquivo:** `components/audience.tsx`

**Mudança 1: Botão "Galeria de experiências"**

**Linha 79 - ANTES:**
```tsx
<Link
  href="#galeria"
  className="..."
>
```

**Linha 79 - DEPOIS:**
```tsx
<Link
  href="/em-construcao"
  className="..."
>
```

---

**Mudança 2: Botão "Blog"**

**Linha 100 - ANTES:**
```tsx
<Link
  href="/blog"
  className="..."
>
```

**Linha 100 - DEPOIS:**
```tsx
<Link
  href="/em-construcao"
  className="..."
>
```

---

## Escolha de Ícones

### Opções de Ícones de Construção (lucide-react)

As opções disponíveis no lucide-react para representar "em construção":

1. **`Wrench`** ⚙️ - Chave inglesa (recomendado, visual claro)
2. **`Hammer`** 🔨 - Martelo (também representativo)
3. **`Settings`** ⚙️ - Engrenagem (mais genérico)
4. **`Tool`** 🔧 - Ferramenta genérica

**Recomendação:** Usar `Wrench` para melhor representação visual de "em construção"

### Ícone de Café

- **`Coffee`** ☕ - Já utilizado no projeto, perfeito para o tema

### Ícone do Botão Voltar

- **`ArrowLeft`** ← - Seta para esquerda, padrão para botões de voltar

---

## Estrutura de Arquivos Resultante

Após a implementação:

```
app/
  layout.tsx
  page.tsx
  globals.css
  em-construcao/
    page.tsx          ← NOVO ARQUIVO

components/
  audience.tsx        ← MODIFICADO (2 linhas)
```

---

## Testes Recomendados

Após a implementação, verificar:

1. **Navegação:**
   - [ ] Botão "Galeria de experiências" redireciona para `/em-construcao`
   - [ ] Botão "Blog" redireciona para `/em-construcao`
   - [ ] Acesso direto a `/em-construcao` funciona corretamente

2. **Página "Em Construção":**
   - [ ] Layout centralizado (vertical e horizontal)
   - [ ] Ícones visíveis e bem posicionados
   - [ ] Texto legível e bem formatado
   - [ ] Botão "Voltar" funcional e visível
   - [ ] Botão "Voltar" retorna para página inicial (`/`)

3. **Responsividade:**
   - [ ] Layout funciona bem no mobile
   - [ ] Ícones dimensionados corretamente em diferentes telas
   - [ ] Texto responsivo (tamanhos adequados)
   - [ ] Botão acessível em todas as resoluções

4. **Estilo Visual:**
   - [ ] Cores consistentes com o tema do site
   - [ ] Tipografia Montserrat aplicada
   - [ ] Hover states funcionando no botão
   - [ ] Transições suaves

5. **Acessibilidade:**
   - [ ] Links com texto descritivo
   - [ ] Contraste de cores adequado
   - [ ] Navegação por teclado funcional

---

## Considerações de Design

### Paleta de Cores

Usar as mesmas cores do tema coffee:
- **Fundo:** `bg-coffee-900` (marrom escuro)
- **Texto principal:** `text-cream-50` (branco/creme)
- **Texto secundário:** `text-cream-50/80` (branco com opacidade)
- **Ícones:** `text-coffee-500` (marrom médio)
- **Botão:** `bg-coffee-500 text-coffee-900` (marrom médio com texto escuro)
- **Botão hover:** `hover:bg-coffee-700 hover:text-white`

### Espaçamento

- Espaçamento entre elementos: `space-y-8` (32px)
- Padding da página: `px-4 py-8` (mobile) e `px-6 py-12` (desktop opcional)
- Padding do botão: `px-6 py-3` (confortável para toque)

### Tipografia

- **Título:** `text-3xl sm:text-4xl lg:text-5xl` (responsivo, destaque)
- **Mensagem:** `text-lg sm:text-xl` (legível mas não concorrente)
- **Botão:** `font-semibold` (destaque)

---

## Alternativas Consideradas

### ❌ Alternativa 1: Usar página `/blog` existente
**Por que não:** Não existe, criaria inconsistência

### ❌ Alternativa 2: Manter `#galeria` e criar seção oculta
**Por que não:** Não resolve o problema do Blog e não atende ao requisito de "Em Construção"

### ❌ Alternativa 3: Página modal/overlay
**Por que não:** Mais complexo, página dedicada é mais simples e SEO-friendly

### ❌ Alternativa 4: Usar `/construcao` ao invés de `/em-construcao`
**Por que não:** `/em-construcao` é mais descritivo e claro em português

---

## Metadados da Página (Opcional)

Para melhor SEO e experiência, pode-se adicionar metadados específicos da página:

```tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Em Construção | Estação do Grão",
  description: "Esta página está sendo elaborada. Em breve teremos novidades!",
  robots: "noindex, nofollow", // Evitar indexação da página temporária
}
```

**Observação:** Isso é opcional, mas recomendado para evitar que a página seja indexada pelo Google.

---

## Riscos e Mitigações

### Risco 1: Quebrar links externos que apontam para `/blog`
**Mitigação:** Se houver links externos, a página "Em Construção" informa claramente o status, melhor que um 404.

### Risco 2: UX confusa se o usuário esperava conteúdo
**Mitigação:** Mensagem clara e botão de voltar visível resolve a situação.

### Risco 3: Página não responsiva
**Mitigação:** Usar classes Tailwind responsivas (`sm:`, `lg:`) seguindo o padrão do projeto.

### Risco 4: Inconsistência visual com o restante do site
**Mitigação:** Usar mesmas cores, tipografia e padrões de design já estabelecidos.

---

## Resumo das Mudanças

| Item | Tipo | Descrição |
|------|------|-----------|
| **Arquivo novo** | `app/em-construcao/page.tsx` | Página "Em Construção" completa |
| **Arquivo modificado** | `components/audience.tsx` | Linha 79: `href="#galeria"` → `href="/em-construcao"` |
| **Arquivo modificado** | `components/audience.tsx` | Linha 100: `href="/blog"` → `href="/em-construcao"` |
| **Dependências** | Nenhuma | Ícones já presentes via `lucide-react` |

---

## Checklist de Implementação

### Fase 1: Criar Página
- [ ] Criar diretório `app/em-construcao/`
- [ ] Criar arquivo `page.tsx`
- [ ] Implementar layout com ícones, título, mensagem e botão
- [ ] Aplicar estilos responsivos
- [ ] Testar visualmente em diferentes resoluções

### Fase 2: Atualizar Links
- [ ] Atualizar link "Galeria" em `components/audience.tsx`
- [ ] Atualizar link "Blog" em `components/audience.tsx`
- [ ] Verificar que não há outros links quebrados

### Fase 3: Testes
- [ ] Testar navegação dos botões
- [ ] Testar botão "Voltar"
- [ ] Verificar responsividade
- [ ] Testar acessibilidade (navegação por teclado)
- [ ] Validar que não há erros no console

---

## Conclusão

Esta implementação cria uma página "Em Construção" profissional e consistente com o design do site, resolvendo os problemas de links quebrados (404) e navegação incorreta, mantendo uma experiência de usuário positiva mesmo quando o conteúdo não está disponível.

**Total de arquivos novos:** 1  
**Total de arquivos modificados:** 1  
**Total de linhas modificadas:** 2  
**Risco de regressão:** Muito baixo (mudanças isoladas e bem definidas)

