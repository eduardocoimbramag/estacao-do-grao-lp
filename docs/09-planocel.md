# Plano de Correção Mobile (Celular) — Overflow e Enquadramento

**Status:** Implementação aplicada (apenas laymob1 e laymob2; layouts desktop inalterados).

---

## Objetivo

Este documento descreve um **plano de implementação** para corrigir os problemas observados ao abrir o site no celular:

1. **Overflow** em quase todas as seções (conteúdo saindo da tela ou scroll horizontal indesejado).
2. **Falta de enquadramento** (conteúdo sem contenção adequada dentro da viewport mobile).

As correções devem ser feitas nos **layouts mobile** do projeto, denominados **laymob1** e **laymob2** (conforme `docs/03-LAYOUTS.md`).

> **Importante:** Este é apenas o plano/documentação. Nenhuma alteração de código deve ser aplicada sem autorização prévia.

---

## Referência: Layouts Mobile (laymobs)

| Nome    | Condição CSS                          | Uso                                      |
|---------|----------------------------------------|------------------------------------------|
| **laymob1** | `max-width: 639px`                  | Smartphones pequenos                      |
| **laymob2** | `min-width: 640px` e `max-width: 767px` | Smartphones grandes e tablets pequenos |

- **Arquivo de estilos:** `app/globals.css` — seção "SISTEMA DE LAYOUTS RESPONSIVOS" (blocos `laymob1` e `laymob2`).
- **Nomenclatura de classes:** `.{layout}-{elemento}` (ex.: `.laymob1-hero-container`, `.laymob2-section-padding`).

---

## Seções a Auditar e Corrigir

Com base na composição da home (`app/page.tsx`), as seções abaixo devem ser verificadas em **laymob1** e **laymob2** para overflow e enquadramento:

| # | Seção / Componente        | Arquivo principal              | Pontos a verificar |
|---|---------------------------|--------------------------------|---------------------|
| 1 | **Header**                | `components/header.tsx`        | Largura, logo, menu, possíveis elementos que estouram (ex.: itens de nav). |
| 2 | **Hero**                  | `components/hero/Hero.tsx`     | Container, título, subtítulo, vídeo/slideshow, botões; altura e largura dentro da viewport. |
| 3 | **OpenMenuIntro** (vídeo) | `components/OpenMenuIntro.tsx`  | Container do vídeo, texto, CTA; overflow horizontal/vertical. |
| 4 | **Nossos Serviços** (carrossel) | `app/page.tsx` + `components/sections/services-carousel.tsx` | Altura da section, container, cards do carrossel, setas/bullets; scroll horizontal indesejado. |
| 5 | **Audience**              | `components/audience.tsx`       | Grid/lista, textos, imagens; contenção e padding. |
| 6 | **SplitScreenContent**    | `components/split-screen-content.tsx` | Layout em coluna no mobile, imagens e textos; overflow. |
| 7 | **Contact** (formulário)  | `components/contact.tsx`       | Form, inputs, botão; largura e margens. |
| 8 | **Footer**                | `components/footer.tsx`        | Links, texto, possíveis múltiplas colunas que quebram mal no mobile. |

---

## Situação Atual (Resumo)

- Em `app/globals.css`, no bloco **laymob1**, existe uma correção “agressiva”:
  - `* { max-width: 100vw !important; }` e `html`/`body` com `max-width: 100vw` e `overflow-x: hidden`.
- Essa abordagem pode **quebrar layouts** (ex.: flex/grid que dependem de largura total) e não resolve de forma cirúrgica o overflow por seção.
- Os ajustes detalhados de overflow e enquadramento existentes em `globals.css` estão voltados principalmente para **laydesk1, laydesk2 e laydesk3** (desktop), não para **laymob1/laymob2**.

Conclusão: é necessário um plano **por seção** e **por laymob**, com contenção e, quando fizer sentido, revisão da correção global em laymob1.

---

## Plano de Implementação (Ordem Sugerida)

### Fase 0 — Preparação (sem mudar comportamento visual)

1. **Documentar o estado atual**
   - Listar, por seção, onde ocorre overflow ou desenquadramento no celular (laymob1 e, se aplicável, laymob2).
   - Anotar dispositivos/larguras testadas (ex.: 375px, 390px, 414px).

2. **Definir padrão de contenção mobile**
   - Container padrão: por exemplo `max-width: 100%`, `width: 100%`, `box-sizing: border-box`, `padding-left/right` consistente (ex.: `px-4` ou valor em `globals.css` para laymob1/laymob2).
   - Decidir se o `* { max-width: 100vw !important; }` em laymob1 será mantido, suavizado ou substituído por regras por seção/componente.

### Fase 1 — Base global (laymob1 e laymob2)

3. **Revisar em `app/globals.css`:**
   - Bloco **laymob1:** avaliar remoção ou restrição do `* { max-width: 100vw !important; }`; garantir `html`/`body` com `overflow-x: hidden` e `max-width: 100%` (ou 100vw) sem efeitos colaterais.
   - Bloco **laymob2:** garantir regras semelhantes de contenção, se necessário.
   - Garantir que `main` (ex.: em `app/page.tsx`) tenha `overflow-x: hidden` e largura controlada em mobile.

### Fase 2 — Seção por seção (laymob1 primeiro, depois laymob2)

4. **Header**  
   - Aplicar classes/estilos laymob1 (e laymob2) para container, logo e menu.  
   - Garantir que nada ultrapasse a largura da viewport; evitar scroll horizontal.

5. **Hero**  
   - Container com largura e padding adequados; título/subtítulo com `word-break`/`overflow` se necessário; mídia (vídeo/slideshow) com `max-width: 100%` e altura controlada.

6. **OpenMenuIntro**  
   - Mesmos critérios: container, vídeo e textos contidos; padding consistente.

7. **Nossos Serviços (carrossel)**  
   - Section e container com altura/largura adequadas em laymob; carrossel sem overflow horizontal além do intencional (slides); setas/bullets dentro da área visível.

8. **Audience**  
   - Grid/lista responsivos; imagens e textos com max-width e padding.

9. **SplitScreenContent**  
   - Em mobile, coluna única; imagens e textos contidos; padding lateral.

10. **Contact**  
    - Form e inputs com `width: 100%` e `box-sizing: border-box`; margens laterais consistentes.

11. **Footer**  
    - Colunas/links empilhados; texto e links sem estourar a largura.

### Fase 3 — Validação e ajuste fino

12. **Testes em dispositivos reais ou emulação**
    - Testar em pelo menos 2–3 larguras (ex.: 320px, 375px, 414px) para laymob1.
    - Testar 640px–767px para laymob2.
    - Verificar rotação portrait/landscape se relevante.

13. **Checklist final por seção**
    - [ ] Sem scroll horizontal.
    - [ ] Conteúdo com padding/margem lateral consistente.
    - [ ] Textos e imagens dentro dos limites da viewport.
    - [ ] Botões e CTAs acessíveis e visíveis.

---

## Onde Fazer as Alterações

| Tipo de alteração              | Onde |
|--------------------------------|------|
| Estilos globais mobile (html, body, main, contenção) | `app/globals.css` — blocos `laymob1` e `laymob2` |
| Estilos específicos por seção (ex.: .laymob1-hero-*)  | `app/globals.css` — dentro dos mesmos blocos |
| Classes nos componentes        | Componentes em `components/` e seção em `app/page.tsx` (ex.: adicionar `laymob1-*`, `laymob2-*`) |
| Ajustes de estrutura (wrapper, divs) | Nos próprios arquivos dos componentes |

---

## Padrão de Nomenclatura (consistente com 03-LAYOUTS.md)

- **laymob1:** `.laymob1-{seção}-{elemento}` (ex.: `.laymob1-hero-container`, `.laymob1-servicos-section`).
- **laymob2:** `.laymob2-{seção}-{elemento}` (ex.: `.laymob2-contact-form`).

Uso nos componentes: adicionar as classes correspondentes nos elementos que precisarem de ajuste (ex.: `className="... laymob1-hero-container laymob2-hero-container"`).

---

## Próximos Passos (após autorização)

1. Obter autorização para iniciar a Fase 0 e, em seguida, Fase 1.
2. Implementar Fase 1 (base global) e validar se o scroll horizontal some sem quebrar layout.
3. Seguir Fase 2 na ordem sugerida (Header → Hero → … → Footer), com commit (ou etapa) por seção, se desejado.
4. Executar Fase 3 (testes e checklist) e documentar eventuais ajustes em este arquivo ou em 03-LAYOUTS.md.

---

## Referências

- **Layouts e breakpoints:** `docs/03-LAYOUTS.md`
- **Visão geral do projeto:** `docs/00-OVERALL.md`
- **Composição da home:** `app/page.tsx`
- **Estilos globais e laymobs:** `app/globals.css` (seção "SISTEMA DE LAYOUTS RESPONSIVOS")
