# 3 — Cor de fundo da primeira seção (Hero)

## Objetivo
Definir/confirmar a cor de **fundo do Hero** como **rgb(69, 41, 17)** (hex **#452911**) e padronizar a forma de aplicar a cor dentro do projeto (Tailwind v4), mantendo consistência com a paleta (coffee/cream/accent).

> **Resumo rápido:** `rgb(69, 41, 17)` = `#452911` — é um marrom escuro que **provavelmente** corresponde a um dos tons "coffee-*" já usados. Para confirmação exata, compare com os tokens existentes (`coffee-900`, `coffee-950`, etc.). Se o valor exato não existir, adicionamos um token dedicado para o Hero.

---

## 1) Verificação de paleta (procedimento)
1. Procure no código por classes de cor "coffee-*":  
   - `bg-coffee-*`, `text-coffee-*`, `ring-coffee-*`, etc.
2. Anote os valores de cada token (se declarados no CSS/tema).  
   - Em Tailwind v4, tokens podem estar em `@theme` (ex.: `--color-coffee-900`) **ou** serem utilitários diretos.
3. Compare o tom **#452911** com os tokens existentes:
   - Se um token "coffee-900/950" bater visualmente (ou for muito próximo), **reutilize o token existente** para o Hero.
   - Se não tiver correspondência exata, siga para a seção **2.2** (criar token `coffee-hero`).

> Dica: O valor **#452911** é marrom escuro; frequentemente fica próximo de "900/950" em escalas.

---

## 2) Formas de aplicar a cor no Hero

### 2.1. (Rápida) Utilitário arbitrário do Tailwind
Sem mexer em tema, dá para aplicar direto:
```html
<section class="bg-[rgb(69,41,17)]">...</section>
```
ou com HEX:
```html
<section class="bg-[#452911]">...</section>
```
**Prós:** rápido; sem configuração.  
**Contras:** menos semântico (cor "hardcoded").

### 2.2. (Recomendado) Token dedicado no tema (Tailwind v4 — `@theme`)
No arquivo global de estilos (ex.: `app/globals.css`), declarar o token uma única vez:

```css
@theme {
  --color-coffee-hero: 69 41 17; /* rgb sem vírgulas para Tailwind v4 */
}
```

Uso:
```html
<section class="bg-coffee-hero">...</section>
```

**Prós:** semântico, reutilizável e alinhado à paleta; facilita manutenção.  
**Contras:** exige 1 alteração de tema (simples).

### 2.3. (Alternativa) Variável CSS + utilitário arbitrário
Se quiser usar variável sem `@theme`:
```css
:root {
  --coffee-hero: 69 41 17;
}
```
Uso:
```html
<section class="bg-[rgb(var(--coffee-hero))]">...</section>
```

**Prós:** funciona sem mexer em `@theme`.  
**Contras:** menos integrado ao ecossistema de tokens do Tailwind.

---

## 3) Recomendação final (projeto Estação do Grão)
- **Preferir a opção 2.2**: crie **`--color-coffee-hero`** no `@theme` e use `bg-coffee-hero` no Hero.  
- Se, após a verificação, encontrar um token `coffee-900/950` **exatamente igual** a `#452911`, **reutilize o token existente** ao invés de criar um novo.

---

## 4) Guia de aplicação (quando formos aplicar)
> **Importante:** Este documento **não aplica** mudanças. É apenas o guia.  
Quando for a hora de aplicar:
1. Adicionar o token no `@theme` **ou** decidir pelo utilitário arbitrário.
2. No componente do Hero (`components/hero/Hero.tsx`), substituir a classe de fundo atual pela classe escolhida:
   - `bg-coffee-hero` **ou** `bg-[rgb(69,41,17)]` **ou** `bg-[#452911]`.
3. Testar em 6 ranges de largura (360–480, 640–767, 768–899, 900–1100, 1200–1366, ≥1536) para validar contraste e coerência com o restante da paleta.

---

## 5) Referência rápida
- **RGB:** `rgb(69, 41, 17)`
- **HEX:** `#452911`
- **Token sugerido (Tailwind v4):** `--color-coffee-hero: 69 41 17;`
- **Classe final sugerida:** `bg-coffee-hero`

---

## 6) Checklist de QA
- [ ] A cor aplicada no Hero corresponde a **#452911** ou ao token "coffee-*" equivalente.
- [ ] O contraste com os textos "cream-*" é adequado (AA/AAA).
- [ ] Nenhum "vazamento" de cor em bordas/shadows adjacentes.
- [ ] Visual aprovado nos 6 ranges de teste.
- [ ] Sem regressões em componentes vizinhos (slider, cards compactos).

