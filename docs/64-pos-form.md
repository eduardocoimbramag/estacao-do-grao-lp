# Documentação: Inversão de Ordem do Formulário e Seção de Contato no Mobile

## 📋 Visão Geral

Esta documentação descreve a alteração para **inverter a ordem dos conteúdos** na seção de contato, **apenas na versão mobile**. No mobile, o formulário aparecerá **antes** da seção "Entre em Contato" (WhatsApp, E-mail, redes sociais), enquanto a versão desktop permanece inalterada.

---

## 🎯 Objetivo

- **Mobile**: Formulário primeiro, depois "Entre em Contato"
- **Desktop**: Manter ordem atual (sem alterações)

---

## 📍 Localização do Componente

**Arquivo:** `components/contact.tsx`  
**Seção:** Linhas 113-330 (grid com 2 colunas)

---

## 🔍 Estrutura Atual

### Layout Desktop (≥ `lg:`)
```
┌─────────────────────────────────────────┐
│  Título e Descrição                     │
└─────────────────────────────────────────┘
┌──────────────────┬──────────────────────┐
│  COLUNA 1        │  COLUNA 2            │
│  (Primeira)      │  (Segunda)          │
│                  │                      │
│  Entre em Contato│  Formulário         │
│  - WhatsApp      │  - Nome *           │
│  - E-mail        │  - Tipo Evento       │
│  - Atendimento   │  - Telefone          │
│  - Redes Sociais │  - E-mail *          │
│                  │  - Descrição         │
│                  │  - Checkbox          │
│                  │  - Botão Enviar      │
└──────────────────┴──────────────────────┘
```

### Layout Mobile Atual (`< lg`)
```
┌─────────────────────────────────────────┐
│  Título e Descrição                     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  COLUNA 1 (Primeira)                    │
│  Entre em Contato                       │
│  - WhatsApp                             │
│  - E-mail                               │
│  - Atendimento                          │
│  - Redes Sociais                        │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  COLUNA 2 (Segunda)                      │
│  Formulário                             │
│  - Nome *                               │
│  - Tipo Evento                          │
│  - Telefone                             │
│  - E-mail *                             │
│  - Descrição                            │
│  - Checkbox                             │
│  - Botão Enviar                         │
└─────────────────────────────────────────┘
```

### Layout Mobile Desejado (`< lg`)
```
┌─────────────────────────────────────────┐
│  Título e Descrição                     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  FORMULÁRIO (Primeiro)                  │
│  - Nome *                               │
│  - Tipo Evento                          │
│  - Telefone                             │
│  - E-mail *                             │
│  - Descrição                            │
│  - Checkbox                             │
│  - Botão Enviar                         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│  ENTRE EM CONTATO (Segundo)             │
│  - WhatsApp                             │
│  - E-mail                               │
│  - Atendimento                          │
│  - Redes Sociais                        │
└─────────────────────────────────────────┘
```

---

## 🛠️ Implementação Técnica

### Estratégia

Utilizar classes do Tailwind CSS para controlar a ordem dos elementos apenas no mobile, usando `order-1` e `order-2` com breakpoints responsivos.

### Método 1: Usando `order` (Recomendado)

Adicionar classes `order-2 lg:order-1` na primeira coluna (Entre em Contato) e `order-1 lg:order-2` na segunda coluna (Formulário).

**Vantagens:**
- Simples e direto
- Não altera a estrutura HTML
- Mantém desktop inalterado
- Funciona bem com grid e flex

### Método 2: Usando `flex-col-reverse` no container

Alterar o container para usar `flex flex-col-reverse lg:flex-row` ou `flex flex-col lg:grid lg:grid-cols-2`.

**Desvantagens:**
- Requer mudança na estrutura do grid
- Pode afetar outros estilos

---

## 📝 Código a Ser Modificado

### Arquivo: `components/contact.tsx`

#### Linha 113: Container Grid
**Atual:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

**Opção 1 (Recomendada):** Usar flex no mobile com order
```tsx
<div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
```

**Opção 2:** Manter grid e usar order
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```
*(Funciona porque grid também respeita `order`)*

#### Linha 115: Coluna "Entre em Contato"
**Atual:**
```tsx
<div className="space-y-4">
```

**Modificado:**
```tsx
<div className="space-y-4 order-2 lg:order-1">
```

#### Linha 186: Coluna "Formulário"
**Atual:**
```tsx
<form onSubmit={handleSubmit} className="space-y-2">
```

**Modificado:**
```tsx
<form onSubmit={handleSubmit} className="space-y-2 order-1 lg:order-2">
```

---

## ✅ Implementação Completa

### Passo 1: Modificar o Container

**Localização:** Linha 113

**Código Atual:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

**Código Modificado:**
```tsx
<div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
```

**Explicação:**
- No mobile (`< lg`): usa `flex flex-col` (coluna vertical)
- No desktop (`≥ lg`): usa `grid grid-cols-2` (2 colunas lado a lado)
- O `gap-8` funciona tanto em flex quanto em grid

### Passo 2: Adicionar `order` na Coluna "Entre em Contato"

**Localização:** Linha 115

**Código Atual:**
```tsx
{/* Contact Methods */}
<div className="space-y-4">
```

**Código Modificado:**
```tsx
{/* Contact Methods */}
<div className="space-y-4 order-2 lg:order-1">
```

**Explicação:**
- `order-2`: No mobile, esta div aparece em segundo lugar
- `lg:order-1`: No desktop, volta a aparecer primeiro (ordem padrão)

### Passo 3: Adicionar `order` no Formulário

**Localização:** Linha 186

**Código Atual:**
```tsx
{/* Contact Form */}
<form onSubmit={handleSubmit} className="space-y-2">
```

**Código Modificado:**
```tsx
{/* Contact Form */}
<form onSubmit={handleSubmit} className="space-y-2 order-1 lg:order-2">
```

**Explicação:**
- `order-1`: No mobile, o formulário aparece primeiro
- `lg:order-2`: No desktop, volta a aparecer em segundo (ordem padrão)

---

## 🎨 Resultado Visual

### Mobile (`< 1024px`)
1. **Formulário** (primeiro)
   - Nome *
   - Tipo de Evento
   - Telefone
   - E-mail *
   - Descreva seu Evento
   - Checkbox de privacidade
   - Botão "Enviar Mensagem"

2. **Entre em Contato** (segundo)
   - Título "Entre em Contato"
   - Link WhatsApp
   - Botão E-mail
   - Card "Atendimento Rápido"
   - Redes sociais (Instagram, Facebook, YouTube)

### Desktop (`≥ 1024px`)
**Sem alterações** - mantém a ordem original:
- Coluna esquerda: "Entre em Contato"
- Coluna direita: Formulário

---

## 🧪 Testes Necessários

### Checklist de Validação

- [ ] **Mobile (< 640px)**: Formulário aparece primeiro
- [ ] **Mobile (< 640px)**: "Entre em Contato" aparece depois do formulário
- [ ] **Tablet (640px - 1023px)**: Formulário aparece primeiro
- [ ] **Desktop (≥ 1024px)**: Ordem original mantida (Entre em Contato à esquerda, Formulário à direita)
- [ ] **Funcionalidade**: Formulário continua funcionando normalmente
- [ ] **Funcionalidade**: Links de WhatsApp e E-mail continuam funcionando
- [ ] **Layout**: Espaçamentos e gaps mantidos corretamente
- [ ] **Responsividade**: Transição suave entre breakpoints

---

## 📱 Breakpoints do Tailwind

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px (usado no código atual)
- `xl:` - 1280px
- `2xl:` - 1536px

**Nota:** O código atual usa `lg:` (1024px) como breakpoint principal. A inversão será aplicada em todas as telas menores que 1024px.

---

## 🔄 Alternativa: Usar Grid com Order

Se preferir manter o grid em todas as resoluções, a propriedade `order` também funciona com `grid`:

```tsx
{/* Container - mantém grid */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

{/* Entre em Contato - aparece em segundo no mobile */}
<div className="space-y-4 order-2 lg:order-1">

{/* Formulário - aparece primeiro no mobile */}
<form onSubmit={handleSubmit} className="space-y-2 order-1 lg:order-2">
```

**Vantagem:** Mantém a estrutura grid em todas as resoluções.  
**Funciona perfeitamente** porque CSS Grid também respeita a propriedade `order`.

---

## 📋 Resumo das Alterações

| Elemento | Linha | Alteração |
|----------|-------|-----------|
| Container Grid | 113 | Adicionar `flex flex-col lg:grid lg:grid-cols-2` |
| Div "Entre em Contato" | 115 | Adicionar `order-2 lg:order-1` |
| Formulário | 186 | Adicionar `order-1 lg:order-2` |

**Total de linhas modificadas:** 3  
**Impacto:** Apenas visual (ordem de exibição no mobile)  
**Desktop:** Sem alterações

---

## ⚠️ Observações Importantes

1. **Não alterar a versão desktop**: As classes `lg:order-1` e `lg:order-2` garantem que no desktop a ordem volte ao padrão.

2. **Compatibilidade**: A propriedade `order` é amplamente suportada em navegadores modernos.

3. **Acessibilidade**: A ordem visual não afeta a ordem de leitura para leitores de tela (eles seguem a ordem do DOM).

4. **Manutenção**: Se no futuro for necessário alterar a ordem novamente, basta modificar os valores de `order`.

---

## 🚀 Próximos Passos

1. Revisar esta documentação
2. Autorizar a implementação
3. Aplicar as alterações no arquivo `components/contact.tsx`
4. Testar em diferentes tamanhos de tela
5. Validar que o desktop permanece inalterado

---

**Status:** 📝 Documentação criada - Aguardando autorização para implementação

