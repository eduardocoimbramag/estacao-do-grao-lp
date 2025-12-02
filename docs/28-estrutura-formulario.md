# Documentação: Estrutura e Funcionamento do Formulário de Contato

## Visão Geral

O formulário de contato está localizado na seção "Contato" (`#contato`) do site e permite que visitantes solicitem orçamentos para eventos. O componente combina um formulário web com métodos alternativos de contato (WhatsApp e E-mail).

---

## Localização do Componente

**Arquivo:** `components/contact.tsx`  
**Seção ID:** `#contato`  
**Tipo:** Componente React Client-Side (`"use client"`)

---

## Estrutura Visual

### Layout Geral

O componente utiliza um layout de **2 colunas** em telas grandes (`lg:grid-cols-2`) e **1 coluna** em telas menores:

```
┌─────────────────────────────────────────┐
│  Título: "Leve a Estação do Grão..."   │
│  Descrição introdutória                 │
└─────────────────────────────────────────┘
┌──────────────────┬──────────────────────┐
│  COLUNA 1        │  COLUNA 2            │
│  (Métodos)       │  (Formulário)       │
│                  │                      │
│  - WhatsApp      │  - Nome *            │
│  - E-mail        │  - Empresa           │
│  - Info Atend.   │  - Telefone          │
│                  │  - E-mail *          │
│                  │  - Descrição Evento  │
│                  │  - Checkbox Privacy  │
│                  │  - Botão Enviar      │
└──────────────────┴──────────────────────┘
```

---

## Estrutura de Código

### 1. Imports e Dependências

```typescript
"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone } from "lucide-react"
```

**Observações:**
- Componente client-side (usa hooks do React)
- Utiliza componentes UI customizados do projeto
- Ícones do `lucide-react`

---

### 2. Estados do Componente

#### Estado: `formData`
```typescript
const [formData, setFormData] = useState({
  name: "",              // string - obrigatório
  company: "",           // string - opcional
  phone: "",             // string - opcional
  email: "",             // string - obrigatório
  eventDescription: "",  // string - opcional
  privacy: false,        // boolean - obrigatório
})
```

**Campos:**
- **name**: Nome completo do solicitante
- **company**: Nome da empresa (opcional)
- **phone**: Telefone de contato (opcional)
- **email**: E-mail para contato (obrigatório)
- **eventDescription**: Descrição detalhada do evento (opcional)
- **privacy**: Aceite da política de privacidade (obrigatório)

#### Estado: `isSubmitting`
```typescript
const [isSubmitting, setIsSubmitting] = useState(false)
```
Controla o estado de carregamento durante o envio do formulário.

#### Estado: `submitStatus`
```typescript
const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
```
Controla o status da submissão:
- `"idle"`: Estado inicial, sem feedback
- `"success"`: Envio bem-sucedido
- `"error"`: Erro no envio ou validação

---

### 3. Handlers (Funções de Controle)

#### `handleChange`
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target
  setFormData((prev) => ({ ...prev, [name]: value }))
}
```

**Função:** Atualiza os campos de texto do formulário (name, company, phone, email, eventDescription)

**Uso:** Conectado aos inputs e textarea via `onChange`

#### `handleCheckboxChange`
```typescript
const handleCheckboxChange = (checked: boolean) => {
  setFormData((prev) => ({ ...prev, privacy: checked }))
}
```

**Função:** Atualiza o estado do checkbox de privacidade

**Uso:** Conectado ao checkbox via `onCheckedChange`

#### `handleSubmit`
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Validação
  if (!formData.name || !formData.email || !formData.privacy) {
    setSubmitStatus("error")
    return
  }
  
  setIsSubmitting(true)
  
  try {
    const response = await fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
    })
    
    if (response.ok) {
      setSubmitStatus("success")
      // Limpa o formulário
      setFormData({ ... })
      setTimeout(() => setSubmitStatus("idle"), 5000)
    } else {
      setSubmitStatus("error")
    }
  } catch (error) {
    console.error("Form submission error:", error)
    setSubmitStatus("error")
  } finally {
    setIsSubmitting(false)
  }
}
```

**Função:** Processa o envio do formulário

**Fluxo:**
1. Previne o comportamento padrão do formulário
2. Valida campos obrigatórios (name, email, privacy)
3. Se inválido, mostra erro e retorna
4. Se válido, inicia o envio
5. Faz requisição POST para `/api/submit-form`
6. Envia dados + timestamp
7. Se sucesso: limpa formulário, mostra sucesso por 5s
8. Se erro: mostra mensagem de erro
9. Sempre desativa o estado de loading

---

## Campos do Formulário

### 1. Nome (Obrigatório)

**Label:** "Nome * (obrigatório)"  
**Tipo:** `text`  
**Placeholder:** "Seu nome completo"  
**Validação:** HTML5 `required` + validação JavaScript  
**Estado:** `formData.name`

```tsx
<Input
  id="name"
  name="name"
  type="text"
  placeholder="Seu nome completo"
  value={formData.name}
  onChange={handleChange}
  required
  className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-700"
/>
```

---

### 2. Empresa (Opcional)

**Label:** "Empresa"  
**Tipo:** `text`  
**Placeholder:** "Nome da sua empresa"  
**Validação:** Nenhuma  
**Estado:** `formData.company`

```tsx
<Input
  id="company"
  name="company"
  type="text"
  placeholder="Nome da sua empresa"
  value={formData.company}
  onChange={handleChange}
  className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-700"
/>
```

---

### 3. Telefone (Opcional)

**Label:** "Telefone"  
**Tipo:** `tel`  
**Input Mode:** `tel` (otimiza teclado mobile)  
**Placeholder:** "(81) 98765-4321"  
**Validação:** Nenhuma  
**Estado:** `formData.phone`

```tsx
<Input
  id="phone"
  name="phone"
  type="tel"
  inputMode="tel"
  placeholder="(81) 98765-4321"
  value={formData.phone}
  onChange={handleChange}
  className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-700"
/>
```

**Observação:** Não há máscara de telefone implementada. O campo aceita qualquer formato.

---

### 4. E-mail (Obrigatório)

**Label:** "E-mail * (obrigatório)"  
**Tipo:** `email`  
**Placeholder:** "seu@email.com"  
**Validação:** HTML5 `required` + validação de formato de e-mail + validação JavaScript  
**Estado:** `formData.email`

```tsx
<Input
  id="email"
  name="email"
  type="email"
  placeholder="seu@email.com"
  value={formData.email}
  onChange={handleChange}
  required
  className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-700"
/>
```

---

### 5. Descrição do Evento (Opcional)

**Label:** "Descreva seu Evento"  
**Tipo:** `textarea`  
**Placeholder:** "Tipo de evento, data, número de convidados, requisitos especiais..."  
**Validação:** Nenhuma  
**Estado:** `formData.eventDescription`  
**Altura mínima:** `min-h-24` (96px)  
**Resize:** Desabilitado (`resize-none`)

```tsx
<Textarea
  id="eventDescription"
  name="eventDescription"
  placeholder="Tipo de evento, data, número de convidados, requisitos especiais..."
  value={formData.eventDescription}
  onChange={handleChange}
  className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-700 resize-none min-h-24"
/>
```

---

### 6. Checkbox de Privacidade (Obrigatório)

**Label:** "Autorizo o contato para fins comerciais conforme a Política de Privacidade *"  
**Tipo:** `checkbox`  
**Validação:** JavaScript (deve ser `true` para enviar)  
**Estado:** `formData.privacy`  
**Link:** `href="#"` (não implementado ainda)

```tsx
<Checkbox
  id="privacy"
  checked={formData.privacy}
  onCheckedChange={handleCheckboxChange}
  className="mt-1"
/>
<label htmlFor="privacy" className="text-sm text-cream-50 cursor-pointer font-montserrat">
  Autorizo o contato para fins comerciais conforme a{" "}
  <a href="#" className="text-coffee-500 hover:text-accent underline font-montserrat">
    Política de Privacidade
  </a>{" "}
  *
</label>
```

**Observação:** O link da Política de Privacidade aponta para `#` (não implementado).

---

## Botão de Envio

**Tipo:** `submit`  
**Estados:**
- Normal: "Enviar Mensagem"
- Loading: "Enviando..."
- Disabled: Quando `isSubmitting === true`

```tsx
<Button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-coffee-500 hover:bg-accent text-coffee-900 font-semibold py-3 rounded-lg transition-colors font-montserrat"
>
  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
</Button>
```

**Comportamento:**
- Desabilitado durante o envio
- Largura total (`w-full`)
- Estilo: fundo coffee-500, texto coffee-900

---

## Mensagens de Feedback

### Mensagem de Sucesso

**Exibição:** Quando `submitStatus === "success"`  
**Duração:** 5 segundos (depois volta para "idle")  
**Estilo:** Fundo verde/coffee, borda coffee-500

```tsx
{submitStatus === "success" && (
  <div className="p-4 bg-coffee-700/40 border border-coffee-500 rounded-lg text-cream-50 text-sm font-montserrat">
    ✓ Mensagem enviada com sucesso! Retornaremos em breve.
  </div>
)}
```

---

### Mensagem de Erro

**Exibição:** Quando `submitStatus === "error"`  
**Estilo:** Fundo vermelho, borda red-700

```tsx
{submitStatus === "error" && (
  <div className="p-4 bg-red-900/40 border border-red-700 rounded-lg text-cream-50 text-sm font-montserrat">
    ✗ Erro ao enviar. Verifique os campos obrigatórios.
  </div>
)}
```

**Cenários de Erro:**
1. Validação falhou (campos obrigatórios vazios)
2. Requisição HTTP falhou (status não OK)
3. Erro de rede (catch block)

---

## Métodos Alternativos de Contato

### 1. WhatsApp

**Link:** `https://wa.me/55DDDNUMERO?text=Olá! Quero orçamento da estação de café.`  
**Status:** ⚠️ **PLACEHOLDER** - Número não configurado (`DDDNUMERO`)  
**Abertura:** Nova aba (`target="_blank"`)  
**Ícone:** `Phone` (lucide-react)

```tsx
<a
  href="https://wa.me/55DDDNUMERO?text=Olá! Quero orçamento da estação de café."
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
>
  <Phone className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
  <div>
    <p className="font-semibold text-cream-50 font-montserrat">WhatsApp</p>
    <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat">
      Clique aqui para orçamento rápido
    </p>
  </div>
</a>
```

---

### 2. E-mail

**Link:** `mailto:contato@estacaodograo.com.br`  
**Status:** ✅ Configurado  
**Abertura:** Cliente de e-mail padrão  
**Ícone:** `Mail` (lucide-react)

```tsx
<a
  href="mailto:contato@estacaodograo.com.br"
  className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
>
  <Mail className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
  <div>
    <p className="font-semibold text-cream-50 font-montserrat">E-mail</p>
    <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat">
      contato@estacaodograo.com.br
    </p>
  </div>
</a>
```

---

### 3. Informação de Atendimento

**Conteúdo:** Informação sobre tempo de resposta  
**Estilo:** Card informativo

```tsx
<div className="p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl">
  <p className="font-semibold text-cream-50 mb-3 font-montserrat">Atendimento Rápido</p>
  <p className="text-cream-50 text-sm font-montserrat">
    Resposta em até 2 horas durante o horário comercial
  </p>
</div>
```

---

## API Endpoint

### Endpoint Atual

**URL:** `/api/submit-form`  
**Método:** `POST`  
**Content-Type:** `application/json`  
**Status:** ⚠️ **NÃO IMPLEMENTADO** - Rota não existe no projeto

### Payload Enviado

```json
{
  "name": "string",
  "company": "string",
  "phone": "string",
  "email": "string",
  "eventDescription": "string",
  "privacy": boolean,
  "timestamp": "2025-01-XXTXX:XX:XX.XXXZ"
}
```

### Comportamento Atual

Como a rota não existe, o formulário sempre retornará erro ao tentar enviar. O código tem um comentário indicando que é um placeholder:

```typescript
// Placeholder: Replace with your actual form submission endpoint
```

---

## Validação

### Validação HTML5

- **Nome:** `required`
- **E-mail:** `required` + `type="email"` (valida formato)

### Validação JavaScript

```typescript
if (!formData.name || !formData.email || !formData.privacy) {
  setSubmitStatus("error")
  return
}
```

**Campos validados:**
- ✅ `name` - não pode estar vazio
- ✅ `email` - não pode estar vazio
- ✅ `privacy` - deve ser `true`

**Campos não validados:**
- ❌ `company` - opcional
- ❌ `phone` - opcional (sem validação de formato)
- ❌ `eventDescription` - opcional

---

## Estilização

### Cores e Tema

- **Fundo da seção:** `bg-coffee-900`
- **Fundo dos inputs:** `bg-coffee-700/40` (40% de opacidade)
- **Bordas:** `border-coffee-700`
- **Texto:** `text-cream-50`
- **Placeholders:** `placeholder:text-coffee-700`
- **Botão:** `bg-coffee-500` com hover `hover:bg-accent`

### Tipografia

- **Fonte:** `font-montserrat` (aplicada em todos os textos)
- **Tamanhos:**
  - Título: `text-2xl` (24px)
  - Labels: `text-sm` (14px)
  - Inputs: Tamanho padrão do componente
  - Mensagens: `text-sm` (14px)

### Responsividade

- **Grid:** 1 coluna em mobile, 2 colunas em `lg` (1024px+)
- **Padding:** Responsivo (`px-4 sm:px-6 lg:px-8`)
- **Gap:** `gap-12` entre colunas

---

## Fluxo Completo do Usuário

### 1. Preenchimento

1. Usuário acessa a seção `#contato`
2. Visualiza título e descrição
3. Vê opções de contato alternativo (WhatsApp, E-mail)
4. Preenche o formulário:
   - Nome (obrigatório)
   - Empresa (opcional)
   - Telefone (opcional)
   - E-mail (obrigatório)
   - Descrição do evento (opcional)
   - Marca checkbox de privacidade (obrigatório)

### 2. Envio

1. Usuário clica em "Enviar Mensagem"
2. Validação JavaScript verifica campos obrigatórios
3. Se inválido: mostra mensagem de erro
4. Se válido:
   - Botão muda para "Enviando..."
   - Botão fica desabilitado
   - Requisição POST para `/api/submit-form`
   - Aguarda resposta

### 3. Resposta

**Cenário A: Sucesso (quando API estiver implementada)**
- Mensagem de sucesso aparece
- Formulário é limpo
- Mensagem desaparece após 5 segundos

**Cenário B: Erro**
- Mensagem de erro aparece
- Formulário mantém dados preenchidos
- Usuário pode corrigir e tentar novamente

**Cenário C: Atual (API não existe)**
- Sempre retorna erro
- Mensagem de erro aparece
- Dados são mantidos no formulário

---

## Dependências e Componentes Utilizados

### Componentes UI Customizados

- `@/components/ui/button` - Botão de envio
- `@/components/ui/input` - Campos de texto
- `@/components/ui/textarea` - Campo de descrição
- `@/components/ui/checkbox` - Checkbox de privacidade

### Bibliotecas Externas

- `lucide-react` - Ícones (Mail, Phone)
- `react` - Hooks (useState)

---

## Pontos de Atenção e Melhorias Sugeridas

### ⚠️ Problemas Identificados

1. **API Endpoint não existe**
   - Rota `/api/submit-form` não está implementada
   - Formulário sempre retornará erro
   - **Ação necessária:** Criar API route em `app/api/submit-form/route.ts`

2. **WhatsApp não configurado**
   - Link contém placeholder `DDDNUMERO`
   - **Ação necessária:** Substituir por número real

3. **Política de Privacidade não implementada**
   - Link aponta para `#`
   - **Ação necessária:** Criar página ou link para política

4. **Validação de telefone ausente**
   - Campo aceita qualquer formato
   - **Sugestão:** Adicionar máscara ou validação de formato

5. **Sem validação de e-mail no JavaScript**
   - Apenas validação HTML5
   - **Sugestão:** Adicionar validação regex no JavaScript

6. **Sem feedback visual de campos inválidos**
   - Apenas mensagem geral de erro
   - **Sugestão:** Destacar campos com erro

7. **Sem proteção contra spam**
   - Sem CAPTCHA ou rate limiting
   - **Sugestão:** Implementar proteção

---

## Estrutura de Dados Enviados

### Exemplo de Payload

```json
{
  "name": "João Silva",
  "company": "Empresa XYZ",
  "phone": "(81) 98765-4321",
  "email": "joao@empresa.com",
  "eventDescription": "Evento corporativo no dia 15/03/2025, cerca de 200 pessoas, preciso de estação personalizada com logo da empresa.",
  "privacy": true,
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## Integração com Outras Partes do Site

### Navegação

O formulário pode ser acessado via:
- Link no header: `#contato`
- Link no footer: `#contato`
- Scroll direto para a seção

### Contexto na Página

O componente `Contact` é renderizado em `app/page.tsx`:
- Após a seção `FlipCard`
- Antes do `Footer`
- Dentro do `main` com `bg-coffee-900`

---

## Status Atual

- ✅ **Estrutura HTML/JSX:** Completa
- ✅ **Estados e Handlers:** Implementados
- ✅ **Validação básica:** Funcional
- ✅ **UI/UX:** Estilizada e responsiva
- ⚠️ **API Endpoint:** Não implementado
- ⚠️ **WhatsApp:** Não configurado
- ⚠️ **Política de Privacidade:** Link não funcional

---

## Próximos Passos Recomendados

1. **Criar API Route** (`app/api/submit-form/route.ts`)
   - Receber dados do formulário
   - Validar dados
   - Enviar e-mail ou salvar em banco de dados
   - Retornar resposta apropriada

2. **Configurar WhatsApp**
   - Substituir `DDDNUMERO` por número real
   - Formato: `55DDDNUMERO` (ex: `5581987654321`)

3. **Implementar Política de Privacidade**
   - Criar página `/politica-de-privacidade`
   - Atualizar link no checkbox

4. **Melhorar Validação**
   - Adicionar máscara de telefone
   - Validação de e-mail no JavaScript
   - Feedback visual por campo

5. **Proteção contra Spam**
   - Implementar CAPTCHA (Google reCAPTCHA)
   - Rate limiting na API

---

## Conclusão

O formulário está estruturalmente completo e funcional do ponto de vista de UI/UX, mas requer implementação do backend (API route) para funcionar completamente. A estrutura atual permite fácil integração com serviços de e-mail, CRM ou banco de dados quando a API for implementada.

