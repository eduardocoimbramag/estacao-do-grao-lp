# 06 — Ajustes (laydesk2) + Organização do `app/globals.css` (comentários, ordem e limpeza)

## Objetivo

1. **Laydesk2 (apenas)**: corrigir o enquadramento do carrossel do Hero para a imagem **ficar menor (~30%) e caber melhor** no card, sem impactar os outros layouts.
2. **Organização do `app/globals.css`**: colocar o arquivo em **ordem correta**, com comentários padronizados por **layout** e por **seção**, e remover conteúdo **repetido/desnecessário** (quando seguro).

> **Importante:** esta documentação é **somente para orientar implementação**.  
> **Não implementar nada** sem você autorizar.

---

## Parte A — Ajuste da imagem do Hero no laydesk2 (slideshow à esquerda) (reduzir ~30%)

### Problema atual

No laydesk2, o tamanho da seção ficou perfeito, mas a **imagem principal do Hero (slideshow à esquerda)** está “grande demais” e não “encaixa” como você quer.

> Observação importante: no código, essa imagem é renderizada dentro do componente `Hero` como um **slideshow (Embla)**. Ou seja, tecnicamente é o “carrossel do Hero”, mas aqui estamos falando do **bloco visual da imagem do Hero** (o painel esquerdo do Hero), como no seu print.

O CSS que foi tentado antes mexeu no **aspect-ratio** do frame, o que pode **deixar a imagem parecer maior** (porque aumenta a área útil do frame).

### Resultado desejado

- A imagem do Hero (slideshow) **~30% menor** dentro do bloco esquerdo.
- Mantendo o comportamento atual de `object-cover` e `object-position` dos slides.
- **Exclusivo laydesk2**: somente dentro do media query `laydesk2`.

### Implementação recomendada (CSS) — Laydesk2

No media query do laydesk2:

```css
@media (min-width: 1024px) and (min-height: 580px) and (max-height: 899px) {
  /* ... outros estilos ... */
}
```

#### Opção 1 (recomendada): reduzir o bloco da imagem do Hero por escala (30%)

Aplicar `transform: scale(0.7)` no wrapper do carousel e **compensar o layout** mantendo o centro:

```css
/* Laydesk2: diminuir o bloco da imagem do Hero ~30% sem mexer no resto do layout */
.laydesk3-hero-section [aria-roledescription="carousel"] > div {
  transform: scale(0.7) !important;
  transform-origin: center center !important;
}
```

**Observação:** como escala reduz a área visual, pode ser necessário compensar “sobra” horizontal com `max-width`/`margin`, mas normalmente o centro já fica correto.

#### Opção 2: limitar o tamanho por largura máxima (30%) (sem transform)

Reduzir `max-width` do wrapper do carrossel para 70% do que ele era:

```css
/* Reduzir o "card" visual do slideshow do Hero */
.laydesk3-hero-section [aria-roledescription="carousel"] > div {
  max-width: 392px !important; /* 560px * 0.70 ≈ 392px */
  width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
```

**Quando usar:** se você preferir reduzir “de verdade” o bloco sem transform (mais previsível para clique/hover).

#### Opção 3: ajustar aspect-ratio do frame (mexe no enquadramento)

Se o problema for “corte/zoom” e você preferir ajustar o enquadramento, dá para mudar o **aspect-ratio do frame** do slide (o `div` que hoje usa `aspect-[3/2.5]` e no `lg` vira `aspect-[16/11]`).

Exemplo (apenas laydesk2):

```css
/* Deixa o frame mais estreito/mais baixo, reduzindo a presença visual */
.laydesk3-hero-section [aria-roledescription="carousel"] .lg\:aspect-\[16\/11\] {
  aspect-ratio: 16 / 12 !important; /* experimente: 16/12, 16/13, 4/3 */
}
```

> Nota: **aspect-ratio não “reduz 30%” exatamente** — ele muda a proporção do frame e como a imagem é recortada pelo `object-cover`.  
> Se sua intenção é “ficar menor”, Opção 1 ou 2 é mais previsível.

#### O que remover/evitar no laydesk2

- Remover o override atual que tenta trocar o `aspect-ratio` via seletor Tailwind escapado:

```css
.laydesk3-hero-section [aria-roledescription="carousel"] .lg\:aspect-\[16\/11\] { ... }
```

Isso tende a “mexer no enquadramento” de um jeito pouco intuitivo e pode aumentar a presença visual do carrossel.

---

## Parte B — Organização do `app/globals.css` (ordem correta + comentários)

### Ponto importante: CSS **não suporta** comentários `//`

O padrão que você escreveu (com `//INICIO ... //`) **quebraria** o CSS.  
O equivalente correto em CSS é usar `/* ... */`.

### Padrão de comentário sugerido (válido no CSS)

```css
/* =========================
   INICIO LAYDESK2
   ========================= */

/* +++ INICIO SECAO HERO +++ */
/* ... conteúdo ... */
/* +++ FIM SECAO HERO +++ */

/* +++ INICIO SECAO SERVICOS +++ */
/* ... conteúdo ... */
/* +++ FIM SECAO SERVICOS +++ */

/* =========================
   FIM LAYDESK2
   ========================= */
```

### Ordem recomendada do arquivo

1. **Base / Tokens / Reset**
2. **LAYOUTS MOBILE**
3. **LAYOUTS DESKTOP**
   - laydesk1
   - laydesk2
   - laydesk3
4. **Estilos globais pós-layout** (tipografia, scrollbars) — apenas se não conflitar com os layouts

### Mapeamento atual (para reorganizar)

O arquivo já tem esses blocos principais:
- `LAYOUTS MOBILE`
  - laymob1
  - laymob2
- `LAYOUTS DESKTOP`
  - laydesk1
  - laydesk2
    - **SEÇÃO 1 (Hero)**
    - **SEÇÃO "NOSSOS SERVIÇOS"**
    - **SEÇÃO "O QUE É A ESTAÇÃO DO GRÃO?"**
    - **SEÇÃO "REGIÕES ATENDIDAS"**
    - **SEÇÃO "SPLIT SCREEN"**
    - **SEÇÃO "FORMULÁRIO DE CONTATO"**
  - laydesk3
    - **SEÇÃO 1 (Hero)**
    - **SEÇÃO 2 (apresentacao)**
    - **SEÇÃO 3 (nossos-servicos)**
    - **SEÇÃO 4 (Regiões Atendidas)**
    - **SEÇÃO "FORMULÁRIO DE CONTATO"**

### Limpeza (redundâncias/desnecessários) — checklist

Ao reorganizar, procurar e remover com cuidado:
- **Regras duplicadas** (mesmos seletores repetidos em laydesk2 + laydesk3 com valores iguais).
- **Comentários contraditórios** (ex.: comentário “até 767px” mas media query mudou para `579px`).
- **Seletores frágeis** baseados em `nth-child` ou dependentes de Tailwind gerado (preferir classes do componente).
- **Overrides globais perigosos** dentro de layout (ex.: `div { max-width: 100% !important; }` fora de mobile).

> Importante: remover “repetido” só quando estiver 100% claro que não muda o comportamento em nenhum layout.

---

## Plano de execução (quando você autorizar)

1. **Laydesk2 / Hero (imagem)**
   - Trocar o ajuste atual por **redução ~30%** usando Opção 1 (scale) ou Opção 2 (max-width).
   - Validar em 1366×768 @100% sem overflow.

2. **Reorganizar `app/globals.css`**
   - Inserir comentários padronizados por layout e seção (padrão acima).
   - Corrigir comentários desatualizados.
   - Deduplicar regras com cuidado.

3. **Checklist final**
   - Validar laymob1/laymob2
   - Validar laydesk1
   - Validar laydesk2
   - Validar laydesk3
   - Confirmar “1 tela − menu” em todas seções alvo (sem overflow)


