# 2 — Alinhamento de texto (justify + recuo de parágrafo)

## Objetivo
Padronizar o **alinhamento justificado** e o **recuo de parágrafo** (text-indent) para o texto do Hero, mantendo a paleta, tipografia e responsividade já adotadas.

Trecho alvo (atual):
```html
<p class="text-cream-50/90 text-[clamp(0.98rem,0.35vw+0.95rem,1.125rem)] leading-relaxed text-center md:text-left md:max-w-none">
  Transforme o café do seu evento em uma experiência inesquecível! Levamos café espresso premium, baristas profissionais e personalização de marca para eventos corporativos, feiras, congressos e casamentos.
</p>
```

## Diretrizes
- **Alinhamento:** usar `text-justify` (Tailwind) para aplicar `text-align: justify;`.
- **Recuo de parágrafo:** usar utilitário `indent-*` do Tailwind (ex.: `indent-6`), que aplica `text-indent` (apenas a **primeira linha** é recuada).
- **Hifenização automática (opcional, recomendado):** adicionar `hyphens-auto` para evitar "rios" no texto justificado; exige atributo `lang="pt-BR"` em um ancestral (ex.: `<html lang="pt-BR">`).
- **Largura legível (opcional):** caso as linhas fiquem longas demais em telas grandes, limitar a ~`60–70ch` (ex.: `xl:max-w-[65ch]`).

## Classes Tailwind sugeridas
- `text-justify` → `text-align: justify;`
- `indent-6` → `text-indent: 1.5rem;` (ajuste fino: `indent-5`/`indent-8`)
- `hyphens-auto` → `hyphens: auto;` (requer `lang="pt-BR"`)  
- Mantém: `text-cream-50/90`, `leading-relaxed`, `text-[clamp(...)]`

## Substituição recomendada
**Antes**
```html
<p class="text-cream-50/90 text-[clamp(0.98rem,0.35vw+0.95rem,1.125rem)] leading-relaxed text-center md:text-left md:max-w-none">
  ...
</p>
```

**Depois (justify + recuo)**
```html
<p class="text-cream-50/90 text-[clamp(0.98rem,0.35vw+0.95rem,1.125rem)] leading-relaxed text-justify indent-6 hyphens-auto md:max-w-none">
  Transforme o café do seu evento em uma experiência inesquecível! Levamos café espresso premium, baristas profissionais e personalização de marca para eventos corporativos, feiras, congressos e casamentos.
</p>
```

> Observação: Removemos `text-center md:text-left` e aplicamos `text-justify` em todas as larguras. Se quiser manter centro no mobile, use `text-center sm:text-justify`.

## Boas práticas
- Garanta `<html lang="pt-BR">` para `hyphens-auto` funcionar corretamente.
- Prefira `indent-6` (1.5rem) para um recuo elegante; evite valores muito grandes.
- Em títulos ou textos curtos, **não** use justify (apenas em parágrafos).
- Teste em 4 ranges: 360–480, 768–900, 1024–1280, ≥1536 px.

## Checklist de QA
- [ ] Texto fica **justificado** em todas as larguras definidas.
- [ ] Recuo de parágrafo (primeira linha) visível e proporcional (≈ 1.5rem).
- [ ] Sem "rios" visuais em desktops grandes (se houver, ativar `xl:max-w-[65ch]`).
- [ ] Paleta e tamanho fluido (`clamp`) permanecem intactos.
- [ ] Sem regressões nos cards/slider adjacentes.

## Referência rápida (Tailwind)
- `text-justify` → `text-align: justify;`
- `indent-{n}` → `text-indent` (n de acordo com escala do Tailwind)
- `hyphens-auto` → requer suporte do navegador e `lang` adequado

