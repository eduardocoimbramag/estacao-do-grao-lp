# Documentação: Modificações no Formulário de Contato

## Visão Geral

Esta documentação descreve as modificações solicitadas para melhorar a seção de contato (`#contato`) do formulário, incluindo alterações visuais, estruturais e de UX.

---

## Localização do Componente

**Arquivo:** `components/contact.tsx`  
**Seção ID:** `#contato`  
**Tipo:** Componente React Client-Side (`"use client"`)

---

## Modificações Solicitadas

### 1. Título da Seção em Branco

**Objetivo:** Alterar a cor do título principal da seção para branco.

**Localização Atual:**
- Linha 79: `<h2 className="text-center mb-6 font-montserrat">Leve a Estação do Grão para seu Evento</h2>`

**Modificação Necessária:**
- Adicionar classe `text-cream-50` ou `text-white` ao elemento `<h2>`

**Código Atual:**
```tsx
<h2 className="text-center mb-6 font-montserrat">Leve a Estação do Grão para seu Evento</h2>
```

**Código Modificado:**
```tsx
<h2 className="text-center mb-6 font-montserrat text-cream-50">Leve a Estação do Grão para seu Evento</h2>
```

**Observação:** A classe `text-cream-50` já é usada no projeto para texto branco/creme e mantém consistência com a paleta de cores.

---

### 2. Substituição do Campo "Empresa" por Seleção Radio (Pessoal/Empresarial)

**Objetivo:** Substituir o campo de texto "Empresa" por uma seleção radio com duas opções: "Pessoal" e "Empresarial". A seleção deve alterar dinamicamente o placeholder do campo "Descreva seu Evento".

**Localização Atual:**
- Linhas 139-152: Campo de input "Empresa"
- Linhas 186-198: Campo textarea "Descreva seu Evento"

**Modificações Necessárias:**

#### 2.1. Adicionar Estado para Tipo de Evento

**Localização:** Dentro do estado `formData` (linha 13)

**Código Atual:**
```typescript
const [formData, setFormData] = useState({
  name: "",
  company: "",  // ← Remover este campo
  phone: "",
  email: "",
  eventDescription: "",
  privacy: false,
})
```

**Código Modificado:**
```typescript
const [formData, setFormData] = useState({
  name: "",
  eventType: "" as "pessoal" | "empresarial" | "",  // ← Novo campo
  phone: "",
  email: "",
  eventDescription: "",
  privacy: false,
})
```

**Observação:** O campo `eventType` será usado para controlar o placeholder do textarea.

#### 2.2. Criar Handler para Mudança de Tipo de Evento

**Localização:** Após `handleCheckboxChange` (linha 29)

**Código a Adicionar:**
```typescript
const handleEventTypeChange = (value: "pessoal" | "empresarial") => {
  setFormData((prev) => ({ ...prev, eventType: value }))
}
```

#### 2.3. Substituir Campo "Empresa" por Radio Buttons

**Localização:** Linhas 139-152

**Código Atual:**
```tsx
<div className="space-y-2">
  <label htmlFor="company" className="block text-sm font-semibold text-cream-50 font-montserrat">
    Empresa
  </label>
  <Input
    id="company"
    name="company"
    type="text"
    placeholder="Nome da sua empresa"
    value={formData.company}
    onChange={handleChange}
    className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-700"
  />
</div>
```

**Código Modificado:**
```tsx
<div className="space-y-2">
  <label className="block text-sm font-semibold text-cream-50 font-montserrat mb-3">
    Tipo de Evento
  </label>
  <div className="flex gap-6">
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id="eventType-pessoal"
        name="eventType"
        value="pessoal"
        checked={formData.eventType === "pessoal"}
        onChange={(e) => handleEventTypeChange(e.target.value as "pessoal" | "empresarial")}
        className="w-4 h-4 text-coffee-500 bg-coffee-700/40 border-coffee-700 focus:ring-coffee-500 focus:ring-2 cursor-pointer"
      />
      <label htmlFor="eventType-pessoal" className="text-cream-50 cursor-pointer font-montserrat">
        Pessoal
      </label>
    </div>
    <div className="flex items-center gap-2">
      <input
        type="radio"
        id="eventType-empresarial"
        name="eventType"
        value="empresarial"
        checked={formData.eventType === "empresarial"}
        onChange={(e) => handleEventTypeChange(e.target.value as "pessoal" | "empresarial")}
        className="w-4 h-4 text-coffee-500 bg-coffee-700/40 border-coffee-700 focus:ring-coffee-500 focus:ring-2 cursor-pointer"
      />
      <label htmlFor="eventType-empresarial" className="text-cream-50 cursor-pointer font-montserrat">
        Empresarial
      </label>
    </div>
  </div>
</div>
```

**Observação:** Os radio buttons devem ter estilo consistente com o tema (coffee-500 para cor de seleção).

#### 2.4. Atualizar Placeholder do Campo "Descreva seu Evento" Dinamicamente

**Localização:** Linha 193

**Código Atual:**
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

**Código Modificado:**
```tsx
<Textarea
  id="eventDescription"
  name="eventDescription"
  placeholder={
    formData.eventType === "pessoal"
      ? "Tipo de evento, exemplo: Casamento, Aniversário, etc."
      : formData.eventType === "empresarial"
      ? "Tipo de evento, exemplo: Congresso, Feira, Coffee break, etc."
      : "Data, Número de convidados, Requisitos especiais, etc."
  }
  value={formData.eventDescription}
  onChange={handleChange}
  className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500 resize-none min-h-24"
/>
```

**Lógica de Placeholder:**
- Se `eventType === "pessoal"`: "Tipo de evento, exemplo: Casamento, Aniversário, etc."
- Se `eventType === "empresarial"`: "Tipo de evento, exemplo: Congresso, Feira, Coffee break, etc."
- Se nenhum tipo selecionado: "Data, Número de convidados, Requisitos especiais, etc."

**Observação:** O placeholder padrão também foi alterado conforme solicitado (item 3).

---

### 3. Alteração do Placeholder Padrão do Campo "Descreva seu Evento"

**Objetivo:** Alterar o placeholder padrão do campo "Descreva seu Evento" quando nenhum tipo de evento estiver selecionado.

**Localização:** Linha 193 (campo textarea)

**Placeholder Atual:**
```
"Tipo de evento, data, número de convidados, requisitos especiais..."
```

**Placeholder Novo:**
```
"Data, Número de convidados, Requisitos especiais, etc."
```

**Observação:** Esta alteração já está incluída na modificação do item 2.4 acima, como placeholder padrão quando nenhum tipo de evento está selecionado.

---

### 4. Alteração da Cor dos Placeholders

**Objetivo:** Alterar a cor de todos os placeholders para a cor dourada (`coffee-500`) da paleta de cores do projeto, melhorando a visibilidade.

**Localização:** Todos os campos de input e textarea do formulário

**Classe Atual:**
```
placeholder:text-coffee-700
```

**Classe Nova:**
```
placeholder:text-coffee-500
```

**Campos Afetados:**

1. **Campo Nome** (linha 135)
   ```tsx
   className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500"
   ```

2. **Campo Telefone** (linha 166)
   ```tsx
   className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500"
   ```

3. **Campo E-mail** (linha 182)
   ```tsx
   className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500"
   ```

4. **Campo Descreva seu Evento** (linha 196)
   ```tsx
   className="bg-coffee-700/40 border-coffee-700 text-cream-50 placeholder:text-coffee-500 resize-none min-h-24"
   ```

**Observação:** A cor `coffee-500` (`#a7834c`) é a cor dourada/accent da paleta de cores do projeto, definida em `app/globals.css` linha 86.

---

## Resumo das Alterações

### Estados e Handlers

1. ✅ Remover campo `company` do estado `formData`
2. ✅ Adicionar campo `eventType` ao estado `formData` (tipo: `"pessoal" | "empresarial" | ""`)
3. ✅ Criar handler `handleEventTypeChange` para atualizar o tipo de evento

### Componentes Visuais

1. ✅ Adicionar classe `text-cream-50` ao título `<h2>`
2. ✅ Substituir campo input "Empresa" por radio buttons (Pessoal/Empresarial)
3. ✅ Implementar placeholder dinâmico no campo "Descreva seu Evento"
4. ✅ Alterar cor de todos os placeholders de `text-coffee-700` para `text-coffee-500`

### Estrutura de Dados

**Estado Anterior:**
```typescript
{
  name: string
  company: string        // ← Removido
  phone: string
  email: string
  eventDescription: string
  privacy: boolean
}
```

**Estado Novo:**
```typescript
{
  name: string
  eventType: "pessoal" | "empresarial" | ""  // ← Novo
  phone: string
  email: string
  eventDescription: string
  privacy: boolean
}
```

---

## Fluxo de Interação do Usuário

### Cenário 1: Usuário seleciona "Pessoal"

1. Usuário preenche campos básicos (Nome, Telefone, E-mail)
2. Usuário seleciona radio button "Pessoal"
3. Campo "Descreva seu Evento" atualiza placeholder para: "Tipo de evento, exemplo: Casamento, Aniversário, etc."
4. Usuário preenche descrição do evento
5. Usuário marca checkbox de privacidade
6. Usuário envia formulário

### Cenário 2: Usuário seleciona "Empresarial"

1. Usuário preenche campos básicos (Nome, Telefone, E-mail)
2. Usuário seleciona radio button "Empresarial"
3. Campo "Descreva seu Evento" atualiza placeholder para: "Tipo de evento, exemplo: Congresso, Feira, Coffee break, etc."
4. Usuário preenche descrição do evento
5. Usuário marca checkbox de privacidade
6. Usuário envia formulário

### Cenário 3: Usuário não seleciona tipo de evento

1. Usuário preenche campos básicos
2. Campo "Descreva seu Evento" mostra placeholder padrão: "Data, Número de convidados, Requisitos especiais, etc."
3. Usuário pode preencher e enviar normalmente

---

## Impacto na API

**⚠️ ATENÇÃO:** Se a API `/api/submit-form` já estiver implementada, será necessário atualizar o payload esperado:

**Payload Anterior:**
```json
{
  "name": "string",
  "company": "string",  // ← Removido
  "phone": "string",
  "email": "string",
  "eventDescription": "string",
  "privacy": boolean,
  "timestamp": "string"
}
```

**Payload Novo:**
```json
{
  "name": "string",
  "eventType": "pessoal" | "empresarial" | "",  // ← Novo
  "phone": "string",
  "email": "string",
  "eventDescription": "string",
  "privacy": boolean,
  "timestamp": "string"
}
```

**Ação Necessária:** Atualizar o handler `handleSubmit` (linha 33) para enviar `eventType` ao invés de `company`:

**Código Atual (linha 48):**
```typescript
body: JSON.stringify({
  ...formData,
  timestamp: new Date().toISOString(),
}),
```

**Observação:** Como estamos usando spread operator (`...formData`), a mudança será automática quando o estado for atualizado. Apenas certifique-se de que a API esteja preparada para receber `eventType` ao invés de `company`.

---

## Estilização dos Radio Buttons

### Estilo Customizado

Os radio buttons devem seguir o tema do projeto:

**Classes Sugeridas:**
```tsx
className="w-4 h-4 text-coffee-500 bg-coffee-700/40 border-coffee-700 focus:ring-coffee-500 focus:ring-2 cursor-pointer"
```

**Explicação:**
- `w-4 h-4`: Tamanho padrão de radio button
- `text-coffee-500`: Cor de seleção (dourado)
- `bg-coffee-700/40`: Fundo consistente com outros inputs
- `border-coffee-700`: Borda consistente
- `focus:ring-coffee-500 focus:ring-2`: Anel de foco dourado
- `cursor-pointer`: Cursor pointer para melhor UX

### Alternativa: Componente UI Customizado

Se o projeto tiver um componente `RadioGroup` em `@/components/ui/radio-group`, pode ser usado:

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup
  value={formData.eventType}
  onValueChange={(value) => handleEventTypeChange(value as "pessoal" | "empresarial")}
  className="flex gap-6"
>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="pessoal" id="eventType-pessoal" />
    <label htmlFor="eventType-pessoal" className="text-cream-50 cursor-pointer font-montserrat">
      Pessoal
    </label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="empresarial" id="eventType-empresarial" />
    <label htmlFor="eventType-empresarial" className="text-cream-50 cursor-pointer font-montserrat">
      Empresarial
    </label>
  </div>
</RadioGroup>
```

**Observação:** Verificar se o componente existe antes de usar. Se não existir, usar input nativo HTML5 com estilização customizada.

---

## Checklist de Implementação

### Fase 1: Preparação
- [ ] Fazer backup do arquivo `components/contact.tsx`
- [ ] Verificar se existe componente `RadioGroup` em `@/components/ui/`
- [ ] Verificar se a API `/api/submit-form` precisa ser atualizada

### Fase 2: Modificações no Estado
- [ ] Remover campo `company` do estado `formData`
- [ ] Adicionar campo `eventType` ao estado `formData`
- [ ] Criar handler `handleEventTypeChange`

### Fase 3: Modificações Visuais
- [ ] Adicionar `text-cream-50` ao título `<h2>`
- [ ] Substituir campo "Empresa" por radio buttons
- [ ] Implementar placeholder dinâmico no textarea
- [ ] Alterar cor de todos os placeholders para `text-coffee-500`

### Fase 4: Limpeza e Reset
- [ ] Atualizar função de reset do formulário (linha 56) para incluir `eventType: ""`
- [ ] Remover referências ao campo `company` em todo o código

### Fase 5: Testes
- [ ] Testar seleção de "Pessoal" e verificar placeholder
- [ ] Testar seleção de "Empresarial" e verificar placeholder
- [ ] Testar sem seleção e verificar placeholder padrão
- [ ] Testar envio do formulário
- [ ] Verificar visibilidade dos placeholders com nova cor
- [ ] Testar responsividade em diferentes tamanhos de tela

### Fase 6: Validação
- [ ] Verificar se todos os placeholders estão com cor `coffee-500`
- [ ] Verificar se o título está em branco
- [ ] Verificar se os radio buttons estão funcionais
- [ ] Verificar se o placeholder muda corretamente ao selecionar tipo de evento

---

## Código Completo de Referência

### Estado e Handlers (seção completa)

```typescript
const [formData, setFormData] = useState({
  name: "",
  eventType: "" as "pessoal" | "empresarial" | "",
  phone: "",
  email: "",
  eventDescription: "",
  privacy: false,
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target
  setFormData((prev) => ({ ...prev, [name]: value }))
}

const handleEventTypeChange = (value: "pessoal" | "empresarial") => {
  setFormData((prev) => ({ ...prev, eventType: value }))
}

const handleCheckboxChange = (checked: boolean) => {
  setFormData((prev) => ({ ...prev, privacy: checked }))
}
```

### Reset do Formulário (atualizar linha 56)

```typescript
setFormData({
  name: "",
  eventType: "",
  phone: "",
  email: "",
  eventDescription: "",
  privacy: false,
})
```

---

## Observações Finais

1. **Consistência Visual:** Todas as modificações mantêm a consistência com o tema coffee/cream/accent do projeto.

2. **Acessibilidade:** Os radio buttons devem ter labels associados corretamente (`htmlFor` e `id`).

3. **Responsividade:** Os radio buttons devem funcionar bem em mobile e desktop.

4. **Validação:** O campo `eventType` é opcional, então não precisa ser validado no `handleSubmit`.

5. **Backward Compatibility:** Se houver dados salvos com o campo `company`, considerar migração ou mapeamento.

---

## Status

- 📝 **Documentação:** Completa
- ⏳ **Implementação:** Aguardando autorização
- ✅ **Pronto para implementação:** Sim

---

## Próximos Passos

1. Revisar esta documentação
2. Autorizar implementação
3. Executar checklist de implementação
4. Testar todas as funcionalidades
5. Validar com stakeholders

