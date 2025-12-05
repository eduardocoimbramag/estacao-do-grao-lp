# Documentação: Modificações nos Botões do Formulário de Contato

## Visão Geral

Esta documentação descreve as modificações solicitadas para os botões de contato na seção de formulário (`#contato`), incluindo atualização de links, funcionalidade de cópia de e-mail e adição de redes sociais.

---

## Localização do Componente

**Arquivo:** `components/contact.tsx`  
**Seção ID:** `#contato`  
**Tipo:** Componente React Client-Side (`"use client"`)

---

## Modificações Solicitadas

### 1. Adicionar Seção "Conheça nossas redes sociais" no Card "Atendimento Rápido"

**Objetivo:** Adicionar uma seção de redes sociais dentro da div "Atendimento Rápido" com links para Instagram, Facebook e Youtube, seguindo o mesmo estilo dos botões existentes (com dois conteúdos: ícone + texto).

**Localização Atual:**
- Linhas 130-133: Card "Atendimento Rápido"

**Código Atual:**
```tsx
<div className="p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl">
  <p className="font-semibold text-cream-50 mb-3 font-montserrat">Atendimento Rápido</p>
  <p className="text-cream-50 text-sm font-montserrat">Resposta em até 2 horas durante o horário comercial</p>
</div>
```

**Código Modificado:**
```tsx
<div className="p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl space-y-6">
  <div>
    <p className="font-semibold text-cream-50 mb-3 font-montserrat">Atendimento Rápido</p>
    <p className="text-cream-50 text-sm font-montserrat">Resposta em até 2 horas durante o horário comercial</p>
  </div>
  
  <div>
    <p className="font-semibold text-cream-50 mb-4 font-montserrat">Conheça nossas redes sociais</p>
    <div className="space-y-3">
      <a
        href="https://www.instagram.com/estacaodograo.eventos"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 p-4 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
      >
        <Instagram className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
        <div>
          <p className="font-semibold text-cream-50 font-montserrat">Instagram</p>
          <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat text-sm">@estacaodograo.eventos</p>
        </div>
      </a>
      
      <a
        href="https://www.facebook.com/estacaodograo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 p-4 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
      >
        <Facebook className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
        <div>
          <p className="font-semibold text-cream-50 font-montserrat">Facebook</p>
          <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat text-sm">Estação do Grão</p>
        </div>
      </a>
      
      <a
        href="https://www.youtube.com/@estacaodograo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 p-4 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
      >
        <Youtube className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
        <div>
          <p className="font-semibold text-cream-50 font-montserrat">Youtube</p>
          <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat text-sm">Estação do Grão</p>
        </div>
      </a>
    </div>
  </div>
</div>
```

**Imports Necessários:**
```tsx
import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react"
```

**Observações:**
- Os links das redes sociais são placeholders e devem ser atualizados com os links reais
- O estilo segue o mesmo padrão dos botões WhatsApp e E-mail
- Os ícones são do `lucide-react` (Instagram, Facebook, Youtube)

---

### 2. Atualizar Link do WhatsApp

**Objetivo:** Substituir o placeholder `DDDNUMERO` pelo número real do WhatsApp.

**Localização Atual:**
- Linha 107: Link do WhatsApp

**Código Atual:**
```tsx
<a
  href="https://wa.me/55DDDNUMERO?text=Olá! Quero orçamento da estação de café."
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
>
```

**Código Modificado:**
```tsx
<a
  href="https://wa.me/5581994492277?text=Olá! Quero orçamento da estação de café."
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
>
```

**Observação:** O número `5581994492277` corresponde ao formato internacional do WhatsApp (55 = Brasil, 81 = DDD de Pernambuco, 994492277 = número).

---

### 3. Alterar Funcionalidade do Botão de E-mail e Corrigir Endereço

**Objetivo:** 
- Fazer o botão copiar o endereço de e-mail ao invés de abrir o cliente de e-mail
- Corrigir o endereço de e-mail de `contato@estacaodograo.com.br` para `estacaodograo.brasil@gmail.com`

**Localização Atual:**
- Linhas 119-128: Botão de E-mail

**Código Atual:**
```tsx
<a
  href="mailto:contato@estacaodograo.com.br"
  className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group"
>
  <Mail className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
  <div>
    <p className="font-semibold text-cream-50 font-montserrat">E-mail</p>
    <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat">contato@estacaodograo.com.br</p>
  </div>
</a>
```

**Código Modificado:**
```tsx
<button
  type="button"
  onClick={() => {
    navigator.clipboard.writeText('estacaodograo.brasil@gmail.com')
    // Opcional: mostrar feedback visual
    alert('E-mail copiado para a área de transferência!')
  }}
  className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group w-full text-left"
>
  <Mail className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
  <div>
    <p className="font-semibold text-cream-50 font-montserrat">E-mail</p>
    <p className="text-coffee-500 hover:text-accent transition-colors font-montserrat">estacaodograo.brasil@gmail.com</p>
  </div>
</button>
```

**Alternativa com Feedback Visual Melhorado:**
```tsx
const [emailCopied, setEmailCopied] = useState(false)

// No JSX:
<button
  type="button"
  onClick={async () => {
    try {
      await navigator.clipboard.writeText('estacaodograo.brasil@gmail.com')
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar e-mail:', err)
      alert('Erro ao copiar e-mail. Por favor, copie manualmente: estacaodograo.brasil@gmail.com')
    }
  }}
  className="flex items-start gap-4 p-6 bg-coffee-700/40 border border-coffee-500/20 rounded-xl hover:border-coffee-500/50 hover:bg-coffee-700/60 transition-all group w-full text-left"
>
  <Mail className="w-6 h-6 text-coffee-500 flex-shrink-0 group-hover:text-accent mt-1 transition-colors" />
  <div>
    <p className="font-semibold text-cream-50 font-montserrat">E-mail</p>
    <p className={`transition-colors font-montserrat ${emailCopied ? 'text-green-400' : 'text-coffee-500 hover:text-accent'}`}>
      {emailCopied ? '✓ E-mail copiado!' : 'estacaodograo.brasil@gmail.com'}
    </p>
  </div>
</button>
```

**Observações:**
- Mudou de `<a>` para `<button>` para evitar navegação
- Usa `navigator.clipboard.writeText()` para copiar o e-mail
- Adiciona feedback visual quando o e-mail é copiado
- O estado `emailCopied` precisa ser adicionado ao componente

---

## Resumo das Alterações

### Imports
1. ✅ Adicionar `Instagram`, `Facebook`, `Youtube` aos imports do `lucide-react`

### Estados
1. ✅ Adicionar estado `emailCopied` (se usar feedback visual melhorado)

### Componentes Visuais
1. ✅ Adicionar seção "Conheça nossas redes sociais" no card "Atendimento Rápido"
2. ✅ Atualizar link do WhatsApp para `wa.me/5581994492277`
3. ✅ Converter botão de e-mail de `<a>` para `<button>` com funcionalidade de cópia
4. ✅ Atualizar endereço de e-mail para `estacaodograo.brasil@gmail.com`

---

## Estrutura Final do Card "Atendimento Rápido"

```
┌─────────────────────────────────────────┐
│  Atendimento Rápido                     │
│  Resposta em até 2 horas durante o      │
│  horário comercial                      │
│                                         │
│  Conheça nossas redes sociais           │
│  ┌─────────────────────────────────┐   │
│  │ [Instagram] Instagram            │   │
│  │          @estacaodograo.eventos │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │ [Facebook] Facebook             │   │
│  │          Estação do Grão        │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │ [Youtube] Youtube                │   │
│  │          Estação do Grão        │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Checklist de Implementação

### Fase 1: Preparação
- [ ] Verificar se os ícones `Instagram`, `Facebook`, `Youtube` estão disponíveis no `lucide-react`
- [ ] Confirmar os links reais das redes sociais (Instagram, Facebook, Youtube)
- [ ] Fazer backup do arquivo `components/contact.tsx`

### Fase 2: Imports
- [ ] Adicionar `Instagram`, `Facebook`, `Youtube` aos imports do `lucide-react`

### Fase 3: Estados
- [ ] Adicionar estado `emailCopied` (se usar feedback visual melhorado)

### Fase 4: Modificações Visuais
- [ ] Atualizar link do WhatsApp (linha 107)
- [ ] Converter botão de e-mail para funcionalidade de cópia (linhas 119-128)
- [ ] Atualizar endereço de e-mail exibido
- [ ] Adicionar seção de redes sociais no card "Atendimento Rápido" (linhas 130-133)

### Fase 5: Testes
- [ ] Testar link do WhatsApp (abre corretamente?)
- [ ] Testar cópia de e-mail (copia corretamente?)
- [ ] Testar feedback visual do e-mail (aparece e desaparece?)
- [ ] Testar links das redes sociais (abrem corretamente?)
- [ ] Testar responsividade em diferentes tamanhos de tela
- [ ] Testar em diferentes navegadores

### Fase 6: Validação
- [ ] Verificar se todos os links estão corretos
- [ ] Verificar se o e-mail está correto
- [ ] Verificar se o número do WhatsApp está correto
- [ ] Verificar se os ícones estão aparecendo corretamente
- [ ] Verificar se o estilo está consistente com os outros botões

---

## Código Completo de Referência

### Imports Atualizados

```typescript
import { Mail, Phone, Instagram, Facebook, Youtube } from "lucide-react"
```

### Estado Adicional (se usar feedback visual)

```typescript
const [emailCopied, setEmailCopied] = useState(false)
```

### Handler para Cópia de E-mail

```typescript
const handleEmailCopy = async () => {
  try {
    await navigator.clipboard.writeText('estacaodograo.brasil@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  } catch (err) {
    console.error('Erro ao copiar e-mail:', err)
    alert('Erro ao copiar e-mail. Por favor, copie manualmente: estacaodograo.brasil@gmail.com')
  }
}
```

---

## Observações Finais

1. **Links das Redes Sociais:** Os links fornecidos são placeholders. Certifique-se de atualizar com os links reais das redes sociais da Estação do Grão.

2. **Compatibilidade do Clipboard API:** A API `navigator.clipboard` requer HTTPS ou localhost. Em produção, certifique-se de que o site está servido via HTTPS.

3. **Fallback para Cópia:** Se a API de clipboard não funcionar, considere usar uma biblioteca como `react-copy-to-clipboard` ou implementar um fallback manual.

4. **Acessibilidade:** Adicione `aria-label` aos botões de redes sociais para melhor acessibilidade.

5. **Feedback Visual:** O feedback visual do e-mail copiado pode ser melhorado com uma animação ou toast notification ao invés de apenas mudar a cor do texto.

---

## Status

- 📝 **Documentação:** Completa
- ⏳ **Implementação:** Aguardando autorização
- ✅ **Pronto para implementação:** Sim

---

## Próximos Passos

1. Revisar esta documentação
2. Confirmar os links reais das redes sociais
3. Autorizar implementação
4. Executar checklist de implementação
5. Testar todas as funcionalidades
6. Validar com stakeholders

---

## Links de Referência

- **WhatsApp:** `https://wa.me/5581994492277`
- **E-mail:** `estacaodograo.brasil@gmail.com`
- **Instagram:** `https://www.instagram.com/estacaodograo.eventos` (confirmar link real)
- **Facebook:** `https://www.facebook.com/estacaodograo` (confirmar link real)
- **Youtube:** `https://www.youtube.com/@estacaodograo` (confirmar link real)

