# Formulário + Anti-spam (24h/IP) — visão completa

## Objetivo

O formulário de orçamento deve:
- coletar dados do usuário
- gravar em **Google Sheets** via **Google Apps Script (Web App)**
- enviar e-mail de notificação (opcional)
- reduzir spam: **1 envio a cada 24h por IP** (backend) + **bloqueio UX no mesmo navegador** (frontend)

---

## Arquivos envolvidos

### Frontend
- `components/contact.tsx` — UI + validação + envio
- `hooks/useIPDetection.ts` — detecta IP via serviço externo
- `utils/formRateLimit.ts` — rate-limit local (24h) via localStorage

### Backend (Google)
- `docs/scriptdogoogle.md` — Apps Script (cole no Apps Script do Web App)
- Google Sheets:
  - aba `pag1` (dados de leads)
  - aba `ControleIPs` (log e bloqueio por IP)

---

## Campos enviados e regra “todos obrigatórios”

O frontend valida e exige:
- Nome
- Tipo de Evento (pessoal/empresarial)
- Telefone
- E-mail
- Descrição do evento
- Aceite da privacidade (checkbox)

O envio manda também:
- `timestamp` (ISO)
- `userIP` (detectado no frontend)

---

## Fluxo de validação + envio (frontend)

Arquivo: `components/contact.tsx`

1) **Bloqueio local (UX)**  
Antes de validar campos e antes do `fetch`, roda:
- `isFormBlockedNow()` (24h)
Se bloqueado:
- `submitStatus = "rate_limit"`
- retorna sem enviar

2) **Validação de campos obrigatórios**
Monta `camposFaltantes[]` e, se existir:
- `submitStatus = "validation_error"`
- mostra lista de campos faltantes

3) **Envio**
Chama o Web App do Apps Script com:
- `method: 'POST'`
- `mode: 'no-cors'`
- `Content-Type: application/json`
- body JSON com os campos + `userIP`

4) **Sucesso (assumido)**
Por conta de `no-cors`, o navegador não permite ler `response.ok/status/json`.  
Então o frontend considera sucesso se não houver erro de rede e:
- `markFormSubmittedNow()` (grava timestamp no localStorage)
- `submitStatus = "success"`
- limpa o formulário

---

## Por que usamos `no-cors` (e o impacto)

Google Apps Script como Web App frequentemente exige `no-cors` em fetch do browser.

Impacto:
- o frontend **não consegue** ler retorno JSON do Apps Script (`RATE_LIMIT`, erros, etc.)
- isso impede feedback perfeito do backend no navegador

Por isso existe a camada UX do `localStorage` para a mensagem correta no cenário mais comum (mesmo navegador).

---

## Detecção de IP (frontend)

Arquivo: `hooks/useIPDetection.ts`

O hook faz `fetch('https://api.ipify.org?format=json')` e retorna:
- `ip` (string)
- `loading` (boolean)
- `error` (boolean)

Se falhar:
- define `ip = 'IP_UNAVAILABLE'`

O `contact.tsx` envia:
- `userIP: ip || 'IP_UNAVAILABLE'`

---

## Rate-limit local 24h (UX)

Arquivo: `utils/formRateLimit.ts`

Chave:
- `estacao_form_last_submission`

Funções:
- `isFormBlockedNow()`: true se dentro de 24h
- `markFormSubmittedNow()`: salva `Date.now()`
- `getRemainingHours()`: calcula horas restantes (arredonda pra cima)

Mensagem exibida no form (`submitStatus === "rate_limit"`):
- “Solicitação já registrada… você poderá enviar um novo orçamento em até X hora(s)…”

Observação:
- Esse bloqueio vale por **navegador**. Se o usuário trocar de navegador/aba anônima, não haverá essa camada UX.

---

## Apps Script (backend) — como funciona

Arquivo: `docs/scriptdogoogle.md`

Constantes principais:
- `SHEET_ID`: id da planilha
- `SHEET_NAME`: `pag1`
- `IP_LOG_SHEET`: `ControleIPs`
- `EMAIL_DESTINO`: e-mail que recebe notificações
- `LIMITE_HORAS`: 24

### Regra anti-spam (backend)
1) obtém IP com `obterIP(e, data)`:
   - prioridade: `data.userIP` se não for `IP_UNAVAILABLE`
   - fallback: tentativas em `e.parameter[...]` (normalmente não funciona em POST)
2) `verificarBloqueioIP(ip)`:
   - consulta `ControleIPs` e checa se o IP já existe nas últimas 24h
   - se bloqueado: retorna resposta `{ error: 'RATE_LIMIT' }`
3) se permitido:
   - escreve a linha na aba `pag1` incluindo IP
   - registra IP em `ControleIPs`
   - envia e-mail (se `EMAIL_DESTINO` existir)

### Estrutura de `pag1` (ordem gravada)
O script grava:
1. Nome
2. E-mail
3. Telefone
4. Social/Corporativo (derivado de eventType)
5. Tipo de Evento (texto livre)
6. Descrição
7. Data/hora formatada
8. IP
9. Campo vazio (reserva)

---

## Setup recomendado (Google)

### 1) Planilha
- Aba `pag1` existente com colunas na ordem acima
- Aba `ControleIPs` (o script cria automaticamente se não existir)

### 2) Web App
Em “Gerenciar implantações”:
- Tipo: Web App
- Executar como: **Você**
- Acesso: **Qualquer pessoa / qualquer pessoa com link**

### 3) URL do Web App no frontend
Em `components/contact.tsx`, a constante `SCRIPT_URL` deve ser a URL ativa do Web App (`.../exec`).

---

## Troubleshooting (rápido)

### Nada chega na planilha
- conferir se `SCRIPT_URL` no frontend é o Web App ativo
- conferir Apps Script → “Execuções”
- conferir permissão do usuário “executar como” na planilha do `SHEET_ID`

### IP aparece como `IP_UNAVAILABLE`
- usuário/rede bloqueou `api.ipify.org`
- o anti-spam ainda funciona, mas o IP vira um “bucket” comum (não ideal)

### Mensagem errada no site quando backend bloqueia
- esperado com `no-cors` (frontend não consegue ler `RATE_LIMIT`)
- UX localStorage cobre o cenário do mesmo navegador

---

## Hardening (se quiser feedback perfeito do backend)

Para feedback 100% correto em qualquer cenário (anônimo/outro device):
- criar uma rota `Next.js` (`/api/quote`) que chama o Apps Script server-to-server
- frontend chama `/api/quote` (mesma origem, sem CORS) e lê JSON com status real


