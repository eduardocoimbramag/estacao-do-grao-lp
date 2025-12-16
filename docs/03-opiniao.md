# Opinião (pronta pra “rodar” agora?) — Estação do Grão

## Minha opinião direta

Sim: **o site está funcional e dá para colocar no ar agora**, seguindo a filosofia “primeiro a gente começa, depois melhora”.

O que você já tem hoje é suficiente para rodar um MVP forte:
- landing page completa (seções, copy, imagens, vídeo)
- formulário funcionando com integração Google
- anti-spam por IP/24h + camada UX no navegador

Mas existem **alguns pontos críticos** (não impedem o deploy tecnicamente, mas podem te dar dor de cabeça/reputação/SEO), e eu recomendo corrigir **antes ou imediatamente após** o primeiro deploy.

---

## ✅ Está pronto e funcional? (o que eu considero “ok para lançamento”)

### O que está OK para rodar
- **Frontend**: navegação por seções, layout responsivo e assets existem (imagens e `public/videos/estacao.mp4`).
- **Formulário**: valida campos obrigatórios e envia para o Apps Script.
- **Anti-spam**: já bloqueia por 24h no mesmo navegador (UX) e o script já registra IP (backend).

Se o seu objetivo agora é **começar a rodar e validar demanda**, eu colocaria no ar.

---

## ⚠️ Pontos críticos (eu recomendo ajustar para não te prejudicar)

### 1) `favicon.ico` apontado, mas não existe

No `app/layout.tsx`, está:
- `icons: { icon: "/favicon.ico" }`

Só que no `public/` não existe `favicon.ico` (existem `icon.svg` e pngs).

**Impacto:**
- navegadores e alguns crawlers podem registrar 404 de favicon
- não “derruba” o site, mas é um detalhe de polimento e SEO/branding

**Recomendação:**
- adicionar `public/favicon.ico` ou ajustar `icons.icon` para um arquivo existente (ex.: `/icon.svg`).

### 2) JSON-LD com placeholders (telefone e WhatsApp)

No JSON-LD (ProfessionalService) em `app/layout.tsx`:
- `telephone: "+55 (81) XXXX-XXXX"`
- `sameAs` contém `"https://wa.me/55DDDNUMERO"`

**Impacto:**
- passa uma impressão ruim (dados falsos) e pode confundir robôs de SEO
- não derruba o site, mas é bem visível em auditorias/validação

**Recomendação:**
- trocar por telefone real e link real do WhatsApp.

### 3) Build pode “passar com erro” de TypeScript

Em `next.config.mjs`:
- `typescript.ignoreBuildErrors: true`

**Impacto:**
- você pode deployar com erro de TS sem perceber
- risco maior de bug em produção

**Recomendação (mínima para rodar agora):**
- manter por enquanto, mas **rodar `pnpm lint` e `pnpm build` antes do deploy** sempre.

**Recomendação (melhor prática):**
- remover `ignoreBuildErrors` quando entrar no modo “produção sério”.

### 4) Formulário com `mode: 'no-cors'` (limitação de feedback)

O formulário usa `no-cors`. Isso é comum com Apps Script, mas significa:
- o frontend não consegue confirmar status real do backend
- “sucesso” é assumido se não houver erro de rede

Você já mitigou isso com a **mensagem de bloqueio via localStorage** (ótimo para UX no mesmo navegador).

**Recomendação para maturidade:**
- criar uma rota `/api` no Next para mediar e retornar JSON ao frontend (feedback perfeito).

---

## ✅ O que NÃO parece te impedir de rodar agora

- `images.unoptimized: true`: não impede, só impacta otimização/score.
- vídeo: existe `public/videos/estacao.mp4` então a seção roda.
- ausência de variáveis de ambiente: hoje o projeto está bem “hardcoded” e funciona.

---

## Minha recomendação de “plano de lançamento” (prático)

### Para colocar no ar hoje (ordem que eu faria)
1. **Garantir formulário**: fazer 2 testes reais (um envio ok + bloqueio 24h).
2. **Corrigir o básico de branding/SEO** (rápido):
   - favicon
   - telefone/WhatsApp no JSON-LD
3. Deploy (Vercel, por exemplo) e monitorar.

### Primeiras melhorias “imediatas” pós-deploy
- remover `ignoreBuildErrors` quando estiver estável
- implementar rota `/api` para feedback real do Apps Script (sem `no-cors`)
- adicionar logs/monitoramento (ex.: Vercel Analytics já existe como dependência)

---

## Conclusão (opinião final)

Se sua meta é **começar a rodar logo**, eu diria: **vai sem medo**, com dois cuidados:

- **ajustar favicon + JSON-LD placeholders** (muito rápido e melhora a percepção)
- **sempre rodar `pnpm build` e `pnpm lint` antes do deploy** enquanto `ignoreBuildErrors` existir

Não vejo nada “crítico” que te impeça de colocar no ar agora — o projeto está bem encaminhado e já tem as proteções mais importantes do formulário.


