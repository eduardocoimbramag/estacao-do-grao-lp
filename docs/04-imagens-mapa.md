# Plano de Substituição de Imagens

## 📋 Visão Geral

Este documento detalha todas as imagens presentes no site, suas resoluções atuais, resoluções recomendadas e aspect ratios para cada seção, considerando os layouts **laydesk1**, **laydesk2** e **laydesk3**.

---

## 🎯 Seção 1 - Hero (Slideshow)

### Localização
- **Componente:** `components/hero/Hero.tsx`
- **Arquivos de imagem:**
  - `/slideshow-1.jpg`
  - `/slideshow-2.jpg`
  - `/slideshow-3.jpg`
  - `/slideshow-4.jpg`

### Especificações Técnicas Atuais

#### Aspect Ratio (Responsivo)
- **Mobile (até 639px):** `aspect-[3/2.5]` = **1.2:1** (3:2.5)
- **Tablet (640px - 1023px):** `aspect-[4/3.5]` = **~1.14:1** (4:3.5)
- **Desktop (1024px+):** `aspect-[16/11]` = **~1.45:1** (16:11)

#### Sizes (Next.js Image Optimization)
```
(min-width:1536px) 720px, 
(min-width:1280px) 640px, 
(min-width:1024px) 560px, 
(min-width:768px) 50vw, 
100vw
```

### Resoluções Recomendadas

#### Para laydesk1 (1600px+ x 900px+)
- **Resolução:** **1920×1327px** (baseado em 16:11)
- **Aspect Ratio:** **16:11** (~1.45:1)
- **Formato:** JPG (otimizado, qualidade 85-90%)
- **Tamanho de arquivo:** Máximo 300KB por imagem

#### Para laydesk2 (1024px+ x 580px-899px)
- **Resolução:** **1280×885px** (baseado em 16:11)
- **Aspect Ratio:** **16:11** (~1.45:1)
- **Formato:** JPG (otimizado, qualidade 85-90%)
- **Tamanho de arquivo:** Máximo 250KB por imagem

#### Para laydesk3 (1024px+ x até 579px)
- **Resolução:** **1280×885px** (baseado em 16:11)
- **Aspect Ratio:** **16:11** (~1.45:1)
- **Formato:** JPG (otimizado, qualidade 85-90%)
- **Tamanho de arquivo:** Máximo 250KB por imagem

#### Para Mobile
- **Resolução:** **1200×1000px** (baseado em 3:2.5)
- **Aspect Ratio:** **3:2.5** (1.2:1)
- **Formato:** JPG (otimizado, qualidade 80-85%)
- **Tamanho de arquivo:** Máximo 200KB por imagem

### Recomendação Final
**Use a maior resolução que cobre todos os casos:**
- **Resolução:** **1920×1327px**
- **Aspect Ratio:** **16:11**
- **Formato:** JPG
- **Qualidade:** 85-90%
- **Tamanho máximo:** 300KB

### Notas de Implementação
- As imagens são exibidas com `object-cover`, então o foco visual deve estar no centro
- Cada imagem tem um `object-position` customizado definido no código
- A primeira imagem (`slideshow-1.jpg`) tem `priority={true}` para carregamento otimizado

---

## 🎯 Seção 2 - O que é a Estação do Grão

### Status
✅ **Nenhuma imagem presente nesta seção**

---

## 🎯 Seção 3 - Nossos Serviços (Carrossel)

### Localização
- **Componente:** `components/sections/services-carousel.tsx`
- **Dados:** `lib/data/services-carousel-cards.ts`
- **Arquivos de imagem:**
  - `/coffee-station-with-branded-logo-personalized.jpg`
  - `/espresso-machine-coffee-station-at-fair.jpg`
  - `/coffee-station-setup-at-wedding-reception.jpg`
  - `/professional-barista-making-latte-art.jpg`

### Especificações Técnicas Atuais

#### Dimensões do Container
- **Mobile:** `h-32` = **128px de altura**
- **Desktop (sm+):** `h-40` = **160px de altura**
- **Largura:** 100% do card (variável conforme breakpoint)

#### Sizes (Next.js Image Optimization)
```
(max-width: 640px) 85vw, 
(max-width: 1024px) 45vw, 
33vw
```

### Resoluções Recomendadas

#### Para laydesk1 (1600px+ x 900px+)
- **Resolução:** **800×600px**
- **Aspect Ratio:** **4:3** (1.33:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 150KB por imagem

#### Para laydesk2 (1024px+ x 580px-899px)
- **Resolução:** **800×600px**
- **Aspect Ratio:** **4:3** (1.33:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 150KB por imagem

#### Para laydesk3 (1024px+ x até 579px)
- **Resolução:** **800×600px**
- **Aspect Ratio:** **4:3** (1.33:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 150KB por imagem

#### Para Mobile
- **Resolução:** **680×510px** (baseado em 4:3)
- **Aspect Ratio:** **4:3** (1.33:1)
- **Formato:** JPG (otimizado, qualidade 80%)
- **Tamanho de arquivo:** Máximo 120KB por imagem

### Recomendação Final
**Use a maior resolução que cobre todos os casos:**
- **Resolução:** **800×600px**
- **Aspect Ratio:** **4:3**
- **Formato:** JPG
- **Qualidade:** 85%
- **Tamanho máximo:** 150KB

### Notas de Implementação
- As imagens são exibidas com `object-cover` dentro de containers de altura fixa
- O foco visual deve estar no centro da imagem
- As imagens são cortadas para caber no container, então elementos importantes devem estar centralizados

---

## 🎯 Seção 4 - Regiões Atendidas

### 4.1. Mapa

#### Localização
- **Componente:** `components/audience.tsx`
- **Arquivo de imagem:** `/mapa-estacao-grao2.png`

#### Especificações Técnicas Atuais
- **Aspect Ratio:** `aspect-square` = **1:1**
- **Largura máxima:**
  - Mobile: `max-w-[120px]` = **120px**
  - Tablet: `max-w-sm` = **384px**
  - Desktop: `max-w-[65%]` = **65% do container**

#### Sizes (Next.js Image Optimization)
```
(max-width: 1024px) 313px, 
420px
```

#### Resoluções Recomendadas

##### Para laydesk1 (1600px+ x 900px+)
- **Resolução:** **600×600px**
- **Aspect Ratio:** **1:1** (quadrado)
- **Formato:** PNG (para manter transparência se necessário) ou SVG (preferencial)
- **Tamanho de arquivo:** Máximo 200KB (PNG) ou 50KB (SVG)

##### Para laydesk2 (1024px+ x 580px-899px)
- **Resolução:** **500×500px**
- **Aspect Ratio:** **1:1** (quadrado)
- **Formato:** PNG ou SVG
- **Tamanho de arquivo:** Máximo 150KB (PNG) ou 50KB (SVG)

##### Para laydesk3 (1024px+ x até 579px)
- **Resolução:** **400×400px**
- **Aspect Ratio:** **1:1** (quadrado)
- **Formato:** PNG ou SVG
- **Tamanho de arquivo:** Máximo 120KB (PNG) ou 50KB (SVG)

##### Para Mobile
- **Resolução:** **240×240px**
- **Aspect Ratio:** **1:1** (quadrado)
- **Formato:** PNG ou SVG
- **Tamanho de arquivo:** Máximo 80KB (PNG) ou 30KB (SVG)

#### Recomendação Final
**Use SVG se possível (melhor qualidade e menor tamanho):**
- **Resolução:** **600×600px** (ou SVG vetorial)
- **Aspect Ratio:** **1:1**
- **Formato:** SVG (preferencial) ou PNG
- **Tamanho máximo:** 200KB (PNG) ou 50KB (SVG)

---

### 4.2. Botões de Navegação (Imagens de Fundo)

#### Localização
- **Componente:** `components/audience.tsx`
- **Arquivos de imagem:**
  - `/professional-barista-making-latte-art.jpg` (Botão 1: Galeria)
  - `/coffee-station-setup-at-wedding-reception.jpg` (Botão 2: Blog)

#### Especificações Técnicas Atuais
- **Aspect Ratio:** Não especificado (flexível conforme altura do botão)
- **Largura:** 50% da viewport em desktop, 100vw em mobile
- **Altura:** Flexível (conforme conteúdo)

#### Sizes (Next.js Image Optimization)
```
(max-width: 1024px) 100vw, 
50vw
```

#### Resoluções Recomendadas

##### Para laydesk1 (1600px+ x 900px+)
- **Resolução:** **960×720px**
- **Aspect Ratio:** **4:3** (1.33:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 200KB por imagem

##### Para laydesk2 (1024px+ x 580px-899px)
- **Resolução:** **800×600px**
- **Aspect Ratio:** **4:3** (1.33:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 180KB por imagem

##### Para laydesk3 (1024px+ x até 579px)
- **Resolução:** **800×600px**
- **Aspect Ratio:** **4:3** (1.33:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 180KB por imagem

##### Para Mobile
- **Resolução:** **800×600px**
- **Aspect Ratio:** **4:3** (1.33:1)
- **Formato:** JPG (otimizado, qualidade 80%)
- **Tamanho de arquivo:** Máximo 150KB por imagem

#### Recomendação Final
**Use a maior resolução que cobre todos os casos:**
- **Resolução:** **960×720px**
- **Aspect Ratio:** **4:3**
- **Formato:** JPG
- **Qualidade:** 85%
- **Tamanho máximo:** 200KB

### Notas de Implementação
- As imagens são exibidas com `object-cover` e têm overlay escuro (`bg-coffee-900/60`)
- O foco visual deve estar no centro, pois as imagens são cortadas para caber no botão
- Há efeito de hover com `scale-110` na imagem

---

## 🎯 Seção 5 - Split Screen

### 5.1. Imagens de Fundo (Background)

#### Localização
- **Componente:** `components/split-screen-content.tsx`
- **Arquivos de imagem:**
  - **Lado Esquerdo (Personalização):** `/coffee-station-with-branded-logo-personalized.jpg`
  - **Lado Direito (Poderes do Café):** `/professional-barista-making-latte-art.jpg`

#### Especificações Técnicas Atuais
- **Aspect Ratio:** Não especificado (preenche toda a altura da seção)
- **Dimensões:** 100% da altura da viewport menos header (calc(100vh-4rem))
- **Largura:** 50% cada lado em desktop

#### Resoluções Recomendadas

##### Para laydesk1 (1600px+ x 900px+)
- **Resolução:** **1920×1080px**
- **Aspect Ratio:** **16:9** (1.78:1)
- **Formato:** JPG (otimizado, qualidade 90%)
- **Tamanho de arquivo:** Máximo 400KB por imagem

##### Para laydesk2 (1024px+ x 580px-899px)
- **Resolução:** **1920×1080px**
- **Aspect Ratio:** **16:9** (1.78:1)
- **Formato:** JPG (otimizado, qualidade 90%)
- **Tamanho de arquivo:** Máximo 400KB por imagem

##### Para laydesk3 (1024px+ x até 579px)
- **Resolução:** **1920×1080px**
- **Aspect Ratio:** **16:9** (1.78:1)
- **Formato:** JPG (otimizado, qualidade 90%)
- **Tamanho de arquivo:** Máximo 400KB por imagem

##### Para Mobile
- **Resolução:** **1920×1080px**
- **Aspect Ratio:** **16:9** (1.78:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 350KB por imagem

#### Recomendação Final
**Use a maior resolução que cobre todos os casos:**
- **Resolução:** **1920×1080px**
- **Aspect Ratio:** **16:9**
- **Formato:** JPG
- **Qualidade:** 90%
- **Tamanho máximo:** 400KB

### Notas de Implementação
- As imagens são exibidas com `object-cover` e têm overlay dinâmico que muda de opacidade
- O foco visual deve estar no centro, pois as imagens são cortadas para preencher o espaço
- Há animação de overlay que muda conforme o lado expandido

---

### 5.2. Imagens dos Cards (Quando Expandido)

#### Localização
- **Componente:** `components/split-screen-content.tsx`
- **Arquivos de imagem (Lado Esquerdo - Personalização):**
  - `/coffee-station-with-branded-logo-personalized.jpg`
  - `/professional-barista-making-latte-art.jpg`
  - `/coffee-station-setup-at-wedding-reception.jpg`
  - `/guests-enjoying-gourmet-coffee-at-premium-event.jpg`
  - `/barista-serving-espresso-at-corporate-event.jpg`

- **Arquivos de imagem (Lado Direito - Poderes do Café):**
  - `/professional-barista-making-latte-art.jpg`
  - `/guests-enjoying-gourmet-coffee-at-premium-event.jpg`
  - `/espresso-machine-coffee-station-at-fair.jpg`
  - `/barista-serving-espresso-at-corporate-event.jpg`
  - `/coffee-station-setup-at-wedding-reception.jpg`

#### Especificações Técnicas Atuais

#### Dimensões do Container
- **Mobile:** `max-w-[280px] h-[120px]` = **280×120px**
- **Desktop (sm+):** `max-w-[320px] h-[140px]` = **320×140px**

#### Aspect Ratio Calculado
- **Mobile:** 280:120 = **~2.33:1** (aproximadamente 7:3)
- **Desktop:** 320:140 = **~2.29:1** (aproximadamente 16:7)

#### Sizes (Next.js Image Optimization)
```
(max-width: 640px) 280px, 
320px
```

#### Resoluções Recomendadas

##### Para laydesk1 (1600px+ x 900px+)
- **Resolução:** **640×280px**
- **Aspect Ratio:** **16:7** (~2.29:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 100KB por imagem

##### Para laydesk2 (1024px+ x 580px-899px)
- **Resolução:** **640×280px**
- **Aspect Ratio:** **16:7** (~2.29:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 100KB por imagem

##### Para laydesk3 (1024px+ x até 579px)
- **Resolução:** **640×280px**
- **Aspect Ratio:** **16:7** (~2.29:1)
- **Formato:** JPG (otimizado, qualidade 85%)
- **Tamanho de arquivo:** Máximo 100KB por imagem

##### Para Mobile
- **Resolução:** **560×240px**
- **Aspect Ratio:** **7:3** (~2.33:1)
- **Formato:** JPG (otimizado, qualidade 80%)
- **Tamanho de arquivo:** Máximo 80KB por imagem

#### Recomendação Final
**Use a maior resolução que cobre todos os casos:**
- **Resolução:** **640×280px**
- **Aspect Ratio:** **16:7** (~2.29:1)
- **Formato:** JPG
- **Qualidade:** 85%
- **Tamanho máximo:** 100KB

### Notas de Implementação
- As imagens são exibidas com `object-cover` dentro de containers de dimensões fixas
- O foco visual deve estar no centro da imagem
- As imagens são cortadas para caber no container, então elementos importantes devem estar centralizados

---

## 🎯 Seção 6 - Formulário

### Status
✅ **Nenhuma imagem presente nesta seção**

---

## 📊 Resumo Geral de Resoluções

### Tabela Comparativa

| Seção | Tipo de Imagem | Resolução Recomendada | Aspect Ratio | Formato | Tamanho Máx |
|-------|---------------|---------------------|--------------|---------|-------------|
| **Hero** | Slideshow | 1920×1327px | 16:11 | JPG | 300KB |
| **Serviços** | Cards do Carrossel | 800×600px | 4:3 | JPG | 150KB |
| **Regiões** | Mapa | 600×600px (ou SVG) | 1:1 | SVG/PNG | 200KB/50KB |
| **Regiões** | Botões | 960×720px | 4:3 | JPG | 200KB |
| **Split Screen** | Background | 1920×1080px | 16:9 | JPG | 400KB |
| **Split Screen** | Cards | 640×280px | 16:7 | JPG | 100KB |

---

## 🛠️ Instruções de Implementação

### Passo 1: Preparar as Imagens

1. **Otimizar todas as imagens** usando ferramentas como:
   - [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/) para JPG/PNG
   - [SVGOMG](https://jakearchibald.github.io/svgomg/) para SVG

2. **Renomear as imagens** seguindo o padrão atual:
   - Manter os nomes existentes ou seguir convenção clara
   - Exemplo: `slideshow-1.jpg`, `slideshow-2.jpg`, etc.

3. **Validar aspect ratios:**
   - Use uma ferramenta de edição de imagem para verificar/corrigir aspect ratios
   - Garanta que as imagens estejam no aspect ratio correto antes de otimizar

### Passo 2: Substituir Arquivos

1. **Localizar os arquivos atuais** na pasta `/public/`
2. **Fazer backup** dos arquivos originais (criar pasta `/public/backup/`)
3. **Substituir os arquivos** mantendo os mesmos nomes

### Passo 3: Verificar no Navegador

1. **Testar em diferentes resoluções:**
   - laydesk1: 1920×1080
   - laydesk2: 1366×768
   - laydesk3: 1280×720
   - Mobile: 375×667

2. **Verificar:**
   - Qualidade visual das imagens
   - Tempo de carregamento
   - Aspect ratios corretos (sem distorção)
   - Foco visual centralizado

### Passo 4: Otimização Adicional (Opcional)

1. **Implementar lazy loading** (já implementado via Next.js Image)
2. **Considerar WebP** para navegadores compatíveis (Next.js faz isso automaticamente)
3. **Verificar Core Web Vitals:**
   - LCP (Largest Contentful Paint)
   - CLS (Cumulative Layout Shift)

---

## ⚠️ Notas Importantes

1. **Aspect Ratios são críticos:** Imagens com aspect ratios incorretos podem causar distorção ou cortes indesejados
2. **Tamanhos de arquivo:** Manter os tamanhos recomendados para garantir performance
3. **Foco visual:** Sempre centralizar elementos importantes, pois `object-cover` pode cortar as bordas
4. **Formato SVG para mapa:** Se o mapa for vetorial, SVG é preferível (melhor qualidade e menor tamanho)
5. **Testes em múltiplos dispositivos:** Sempre testar em diferentes resoluções antes de finalizar

---

## 📝 Checklist de Implementação

- [ ] Preparar todas as imagens do Hero (4 imagens)
- [ ] Preparar todas as imagens dos Cards de Serviços (4 imagens)
- [ ] Preparar o Mapa (1 imagem - preferencialmente SVG)
- [ ] Preparar imagens dos Botões de Regiões (2 imagens)
- [ ] Preparar imagens de Background do Split Screen (2 imagens)
- [ ] Preparar imagens dos Cards do Split Screen (10 imagens únicas)
- [ ] Fazer backup dos arquivos originais
- [ ] Substituir arquivos na pasta `/public/`
- [ ] Testar em laydesk1 (1920×1080)
- [ ] Testar em laydesk2 (1366×768)
- [ ] Testar em laydesk3 (1280×720)
- [ ] Testar em mobile (375×667)
- [ ] Verificar performance (tempo de carregamento)
- [ ] Verificar qualidade visual
- [ ] Verificar aspect ratios (sem distorção)

---

## 🔗 Referências

- **Documentação de Layouts:** `docs/03-LAYOUTS.md`
- **Componente Hero:** `components/hero/Hero.tsx`
- **Componente Serviços:** `components/sections/services-carousel.tsx`
- **Componente Regiões:** `components/audience.tsx`
- **Componente Split Screen:** `components/split-screen-content.tsx`
- **Next.js Image Optimization:** [Documentação oficial](https://nextjs.org/docs/app/api-reference/components/image)

---

**Última atualização:** Data da criação deste documento
**Autor:** Sistema de documentação automática


