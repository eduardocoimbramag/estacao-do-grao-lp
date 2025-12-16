# Como colocar o site no ar (Domínio + Hostinger) — passo a passo

## 📋 Objetivo

Este guia mostra como colocar seu projeto **Next.js** no ar usando:
- **Domínio** (comprado por você)
- **Hospedagem na Hostinger**

Com foco em um processo simples, confiável e fácil de manter.

---

## ✅ Antes de começar (o que seu projeto precisa)

Pelo que existe hoje no repositório:
- não há rotas `app/api` (ou seja, não há backend Next dentro do projeto)
- o site roda como app Next com `pnpm build` e `pnpm start`

Mesmo assim, **Next.js não é “HTML puro”** por padrão — então, para Hostinger, o caminho mais seguro é:

### Opção A (recomendada): Hospedar como **Node.js app** (Next em produção)
- funciona para qualquer projeto Next
- você não precisa converter para site estático

### Opção B (alternativa): Exportar como **site estático**
- só vale se você quiser (e se o projeto não usar SSR/rotas dinâmicas)
- exige ajustes extras e pode limitar recursos

**Neste guia vou focar na Opção A** (Node.js app), que é a mais “à prova de surpresa”.

---

## 🧭 Visão geral do fluxo

1. Comprar o domínio
2. Criar a hospedagem (Hostinger)
3. Apontar DNS do domínio para a hospedagem
4. Subir o projeto e instalar dependências
5. Build + Start em modo produção
6. Configurar SSL (HTTPS)
7. Testar formulário (Apps Script)

---

## 1) Comprar o domínio

Você pode comprar na própria Hostinger ou em qualquer registrador.

Ao comprar, você vai precisar depois:
- acesso ao painel de DNS do domínio
- capacidade de editar registros (A, CNAME)

---

## 2) Escolher o tipo de hospedagem na Hostinger (importante)

Na Hostinger normalmente existem 2 caminhos viáveis para Next.js:

### Caminho 1 — VPS (recomendado para Next.js sem dor)
Você terá um servidor Linux e roda Next como um app Node (com PM2 + Nginx).

✅ Prós:
- controle total (Node, pnpm, PM2, Nginx, SSL)
- estabilidade e performance
- ideal para Next

⚠️ Contras:
- exige um pouco mais de setup (mas é “um setup e pronto”)

### Caminho 2 — Hospedagem com suporte a Node.js (hPanel)
Alguns planos têm “Node.js” no painel, permitindo rodar apps.

✅ Prós:
- mais simples que VPS

⚠️ Contras:
- limitações de painel/portas/processos
- depende do seu plano ter Node.js disponível

> Se você tem liberdade de escolher: **VPS é a opção mais sólida para Next**.

---

## 3) Preparar o projeto para deploy

### 3.1 Subir para o GitHub (recomendado)

É o jeito mais fácil para atualizar depois.

1. Crie um repositório no GitHub (privado ou público)
2. No seu PC:
   - commit e push do projeto

Depois, no servidor, você vai fazer `git clone`.

### 3.2 Conferir o comando de produção

Seu `package.json` já tem:
- `pnpm build` (gera build)
- `pnpm start` (roda `next start`)

---

## 4) Deploy na Hostinger via VPS (passo a passo recomendado)

> Este passo a passo assume Ubuntu/Debian (padrão de VPS).

### 4.1 Acessar o VPS

1. No painel da Hostinger, pegue:
   - IP do VPS
   - usuário (geralmente `root`) e senha / chave SSH
2. Conecte via SSH:

```bash
ssh root@SEU_IP_DO_VPS
```

### 4.2 Instalar Node.js (LTS) e ferramentas

Recomendação: Node 20 LTS.

```bash
apt update -y
apt upgrade -y
```

Instale Node (exemplo com NodeSource):

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
```

Ative o Corepack (para `pnpm`):

```bash
corepack enable
corepack prepare pnpm@10.21.0 --activate
```

### 4.3 Instalar PM2 e Nginx

```bash
npm i -g pm2
apt install -y nginx
```

### 4.4 Subir o projeto no servidor

Crie uma pasta e clone:

```bash
mkdir -p /var/www/estacaodograo
cd /var/www/estacaodograo
git clone SEU_REPO_GITHUB .
```

Instale dependências e build:

```bash
pnpm install
pnpm build
```

Rode com PM2:

```bash
PORT=3000 pm2 start pnpm --name estacaodograo -- start
pm2 save
pm2 startup
```

Teste local no VPS:

```bash
curl -I http://localhost:3000
```

Se aparecer 200/302, está rodando.

### 4.5 Configurar Nginx como reverse proxy

Crie um arquivo:

```bash
nano /etc/nginx/sites-available/estacaodograo
```

Conteúdo:

```nginx
server {
  listen 80;
  server_name estacaodograo.com.br www.estacaodograo.com.br;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Ativar:

```bash
ln -s /etc/nginx/sites-available/estacaodograo /etc/nginx/sites-enabled/estacaodograo
nginx -t
systemctl reload nginx
```

Agora o site estará em HTTP (porta 80).

---

## 5) Apontar o domínio para o VPS (DNS)

No painel do seu domínio (DNS), crie:

### 5.1 Registro A (domínio raiz)
- **Tipo**: A
- **Nome/Host**: `@`
- **Valor**: IP do VPS
- **TTL**: padrão

### 5.2 Registro CNAME (www)
- **Tipo**: CNAME
- **Nome/Host**: `www`
- **Valor**: `estacaodograo.com.br` (ou `@`)

Propagação pode levar de minutos até algumas horas (às vezes 24h).

---

## 6) Ativar HTTPS (SSL) com Let’s Encrypt (Certbot)

No VPS:

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d estacaodograo.com.br -d www.estacaodograo.com.br
```

O Certbot:
- instala certificado
- configura o Nginx para HTTPS
- agenda renovação automática

Teste renovação:

```bash
certbot renew --dry-run
```

---

## 7) Validar o formulário (Google Apps Script)

Como o formulário usa Apps Script, valide:
- o site está em HTTPS (ok)
- o formulário está enviando
- a planilha recebe os dados
- o bloqueio de 24h está funcionando (IP e/ou localStorage)

Se o envio não chegar:
- confirme se a URL do Web App do Apps Script está correta no `components/contact.tsx`

---

## 8) Como atualizar o site (deploy contínuo manual)

Quando você mudar o código:

```bash
cd /var/www/estacaodograo
git pull
pnpm install
pnpm build
pm2 restart estacaodograo
```

---

## 9) Checklist final (antes de divulgar)

- [ ] Site abre em `https://seu-dominio`
- [ ] `www.seu-dominio` redireciona/abre corretamente
- [ ] Todas as imagens carregam
- [ ] Vídeo (seção OpenMenuIntro) funciona (ou fallback aparece)
- [ ] Formulário envia e grava na planilha
- [ ] Anti-spam funciona (2º envio bloqueia)

---

## 🔥 Se você quiser o caminho mais simples (sem VPS)

Se o seu plano Hostinger tiver **Node.js no hPanel**, eu posso te escrever um passo a passo específico para esse painel (porque muda bastante).  
Me diga qual é seu plano (VPS ou Web Hosting) e eu adapto o guia.


