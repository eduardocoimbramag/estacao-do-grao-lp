# Documentação: Atualização de Conteúdo - FlipCard Lado 1 (Personalização)

## Objetivo

Atualizar os textos descritivos dos 5 cards da seção "PERSONALIZAÇÃO PARA SEU EVENTO" no componente FlipCard, mantendo os títulos e estrutura visual, mas substituindo as descrições por textos mais elaborados e impactantes.

---

## Arquivo a Modificar

**Caminho:** `components/flipcard.tsx`

**Seção:** Array `side1Items` (linhas 15-51)

---

## Mudanças Detalhadas

### Card 1: Logo Personalizado

**Localização:** `side1Items[0].description` (linha 19)

**Texto Atual:**
```
'Adicione a identidade da sua empresa ou evento em copos, guardanapos e estações de café.'
```

**Texto Novo:**
```
'O Branding no Centro da Experiência. Transforme a coffee station em uma extensão visual da sua marca. Garantimos que seu logo e identidade estejam presentes em copos, guardanapos e no design da estação. Um toque sutil, mas constante, que reforça a lembrança da sua empresa e o profissionalismo do evento.'
```

**Status:** ✅ Título mantido: "Logo Personalizado"  
**Status:** ✅ Imagem mantida: `/coffee-station-with-branded-logo-personalized.jpg`  
**Status:** ✅ Posição mantida: `imagePosition: 'left'`

---

### Card 2: Cardápio Exclusivo

**Localização:** `side1Items[1].description` (linha 26)

**Texto Atual:**
```
'Crie um menu de cafés especiais sob medida para o perfil e preferências dos seus convidados.'
```

**Texto Novo:**
```
'Um Menu de Cafés Criado Sob Medida. Desenvolvemos um cardápio especial que reflete o perfil do seu público e o tema do evento. Seleção de bebidas premium e acompanhamentos finos. Surpreenda com uma bebida signature, pensada para encantar e tornar a experiência sensorial verdadeiramente exclusiva.'
```

**Status:** ✅ Título mantido: "Cardápio Exclusivo"  
**Status:** ✅ Imagem mantida: `/professional-barista-making-latte-art.jpg`  
**Status:** ✅ Posição mantida: `imagePosition: 'right'`

---

### Card 3: Decoração Temática

**Localização:** `side1Items[2].description` (linha 33)

**Texto Atual:**
```
'Estação de café decorada e harmonizada com a identidade visual do seu evento.'
```

**Texto Novo:**
```
'Harmonia Visual para um Ambiente Cativante. Nossa estrutura móvel se adapta e se harmoniza com a decoração do seu evento. Garantimos que a estação esteja em sintonia com a identidade visual da sua festa ou stand. Criamos um ponto de encontro sofisticado que complementa o alto padrão estético do seu espaço.'
```

**Status:** ✅ Título mantido: "Decoração Temática"  
**Status:** ✅ Imagem mantida: `/coffee-station-setup-at-wedding-reception.jpg`  
**Status:** ✅ Posição mantida: `imagePosition: 'left'`

---

### Card 4: Copos Personalizados

**Localização:** `side1Items[3].description` (linha 40)

**Texto Atual:**
```
'Copos exclusivos com nome do evento, logo ou mensagem especial para cada convidado.'
```

**Texto Novo:**
```
'Detalhes que se Tornam Lembranças Vivas. Personalizamos copos com o nome do evento, logo ou mensagem especial. É um toque de cuidado máximo que agrada o convidado e transforma o copo em uma lembrança de valor. Estenda a ativação da sua marca para além do momento do evento.'
```

**Status:** ✅ Título mantido: "Copos Personalizados"  
**Status:** ✅ Imagem mantida: `/guests-enjoying-gourmet-coffee-at-premium-event.jpg`  
**Status:** ✅ Posição mantida: `imagePosition: 'right'`

---

### Card 5: Atendimento Exclusivo

**Localização:** `side1Items[4].description` (linha 47)

**Texto Atual:**
```
'Baristas profissionais treinados para proporcionar uma experiência premium e memorável.'
```

**Texto Novo:**
```
'Baristas Certificados: Técnica, Carisma e Padrão Premium. Nossa equipe é treinada para proporcionar uma experiência memorável. Eles garantem a extração perfeita e interagem com profissionalismo. Conte com a expertise de quem atende a eventos corporativos de alto padrão e alto fluxo com agilidade e excelência.'
```

**Status:** ✅ Título mantido: "Atendimento Exclusivo"  
**Status:** ✅ Imagem mantida: `/barista-serving-espresso-at-corporate-event.jpg`  
**Status:** ✅ Posição mantida: `imagePosition: 'left'`

---

## Resumo das Alterações

| Card | Título | Descrição Atual (caracteres) | Descrição Nova (caracteres) | Mudança |
|------|--------|------------------------------|----------------------------|---------|
| 1 | Logo Personalizado | 90 | 231 | +141 caracteres |
| 2 | Cardápio Exclusivo | 90 | 243 | +153 caracteres |
| 3 | Decoração Temática | 70 | 240 | +170 caracteres |
| 4 | Copos Personalizados | 85 | 240 | +155 caracteres |
| 5 | Atendimento Exclusivo | 85 | 268 | +183 caracteres |

**Total de caracteres adicionados:** ~800 caracteres

---

## Instruções de Implementação

### Passo 1: Abrir o arquivo
```
components/flipcard.tsx
```

### Passo 2: Localizar o array `side1Items`
O array está localizado nas linhas 15-51 do arquivo.

### Passo 3: Substituir as descrições
Para cada item do array, substituir apenas a propriedade `description` mantendo:
- ✅ O `id` original
- ✅ O `title` original
- ✅ O `image` original
- ✅ O `imagePosition` original

### Passo 4: Verificar a formatação
Garantir que:
- As strings estejam entre aspas simples (`'`)
- A vírgula após cada objeto esteja presente
- A indentação esteja consistente com o resto do código

---

## Código Completo do Array `side1Items` (Após Alterações)

```typescript
// Dados do Lado 1: Personalização
const side1Items = [
  {
    id: 1,
    title: 'Logo Personalizado',
    description: 'O Branding no Centro da Experiência. Transforme a coffee station em uma extensão visual da sua marca. Garantimos que seu logo e identidade estejam presentes em copos, guardanapos e no design da estação. Um toque sutil, mas constante, que reforça a lembrança da sua empresa e o profissionalismo do evento.',
    image: '/coffee-station-with-branded-logo-personalized.jpg',
    imagePosition: 'left'
  },
  {
    id: 2,
    title: 'Cardápio Exclusivo',
    description: 'Um Menu de Cafés Criado Sob Medida. Desenvolvemos um cardápio especial que reflete o perfil do seu público e o tema do evento. Seleção de bebidas premium e acompanhamentos finos. Surpreenda com uma bebida signature, pensada para encantar e tornar a experiência sensorial verdadeiramente exclusiva.',
    image: '/professional-barista-making-latte-art.jpg',
    imagePosition: 'right'
  },
  {
    id: 3,
    title: 'Decoração Temática',
    description: 'Harmonia Visual para um Ambiente Cativante. Nossa estrutura móvel se adapta e se harmoniza com a decoração do seu evento. Garantimos que a estação esteja em sintonia com a identidade visual da sua festa ou stand. Criamos um ponto de encontro sofisticado que complementa o alto padrão estético do seu espaço.',
    image: '/coffee-station-setup-at-wedding-reception.jpg',
    imagePosition: 'left'
  },
  {
    id: 4,
    title: 'Copos Personalizados',
    description: 'Detalhes que se Tornam Lembranças Vivas. Personalizamos copos com o nome do evento, logo ou mensagem especial. É um toque de cuidado máximo que agrada o convidado e transforma o copo em uma lembrança de valor. Estenda a ativação da sua marca para além do momento do evento.',
    image: '/guests-enjoying-gourmet-coffee-at-premium-event.jpg',
    imagePosition: 'right'
  },
  {
    id: 5,
    title: 'Atendimento Exclusivo',
    description: 'Baristas Certificados: Técnica, Carisma e Padrão Premium. Nossa equipe é treinada para proporcionar uma experiência memorável. Eles garantem a extração perfeita e interagem com profissionalismo. Conte com a expertise de quem atende a eventos corporativos de alto padrão e alto fluxo com agilidade e excelência.',
    image: '/barista-serving-espresso-at-corporate-event.jpg',
    imagePosition: 'left'
  }
]
```

---

## Impacto Visual Esperado

### Considerações de Layout
- Os textos novos são significativamente mais longos (2-3x o tamanho original)
- O componente já possui classes responsivas que devem lidar bem com textos maiores
- A classe `text-justify` já está aplicada, garantindo alinhamento adequado
- O `leading-relaxed` já está configurado para melhor legibilidade

### Responsividade
O componente já possui breakpoints configurados:
- Mobile: `text-sm`
- Tablet: `text-base`
- Desktop: `text-lg`

Os textos mais longos devem se adaptar naturalmente a esses tamanhos.

---

## Testes Recomendados

Após a implementação, verificar:

1. ✅ **Renderização**: Todos os 5 cards aparecem corretamente
2. ✅ **Responsividade**: Textos se ajustam bem em mobile, tablet e desktop
3. ✅ **Legibilidade**: Textos são fáceis de ler em todos os tamanhos de tela
4. ✅ **Alinhamento**: O `text-justify` funciona corretamente
5. ✅ **Espaçamento**: O espaçamento entre cards permanece adequado
6. ✅ **Flip Animation**: A animação de flip continua funcionando normalmente
7. ✅ **Imagens**: Todas as imagens continuam carregando corretamente

---

## Observações Importantes

1. **Nenhuma mudança estrutural**: Apenas o conteúdo textual está sendo alterado
2. **Títulos preservados**: Todos os títulos permanecem exatamente iguais
3. **Imagens preservadas**: Nenhuma imagem será alterada
4. **Posicionamento preservado**: A ordem alternada (left/right) dos cards permanece
5. **Estilos preservados**: Todas as classes CSS permanecem inalteradas

---

## Status

- 📝 **Documentação criada**: ✅
- ⏳ **Aguardando autorização**: ⏸️
- 🔧 **Implementação**: Pendente

---

## Próximos Passos

1. Revisar esta documentação
2. Autorizar a implementação
3. Aplicar as mudanças no arquivo `components/flipcard.tsx`
4. Testar a renderização e responsividade
5. Validar visualmente em diferentes dispositivos

