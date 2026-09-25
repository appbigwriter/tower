# BFFD — Guia de Deploy em VPS Própria com Easypanel

> **Repositório Oficial:** `https://github.com/appbigwriter/tower.git`  
> **Arquitetura:** Multi-container Docker / Compose

---

## 1. Visão Geral da Arquitetura no Easypanel

O BFFD roda de forma desacoplada com 6 serviços:
1. **`postgres`:** Postgres 16 com extensão `pgvector` e migrations automáticas.
2. **`mcp-server`:** Regras de negócio, transições de voos e controle de espaço aéreo.
3. **`agent-runtime`:** Runtime Python com IA e memórias isoladas por piloto.
4. **`gateway-bot`:** Webhook de entrada do Telegram e identificação de pilotos.
5. **`scheduler`:** Agendador de rotinas (Briefing 09h, Check-in 14h, Debriefing 19h, Revisão 17h, Monitor de Turbulência).
6. **`web`:** Painel Next.js (Radar de Voos, Detalhes, Caixa de Entrada, Horizontes de Foco e Admin).

---

## 2. Passo a Passo de Deploy no Easypanel

### Opção A: Deploy via Docker Compose (Recomendada)
1. Acesse seu painel **Easypanel** (`https://painel.seudominio.com`).
2. Crie um novo **Project** chamado `tower` ou `bffd`.
3. Clique em **+ Service** → selecione **App Template** ou **Docker Compose**.
4. Cole o conteúdo de [docker-compose.yml](file:///f:/Projetos/_FBR/BFFD/docker-compose.yml).
5. Preencha as variáveis de ambiente na aba **Environment**:
   - `OPENAI_API_KEY`: sua chave de IA da OpenAI
   - `TELEGRAM_BOT_TOKEN`: token obtido no `@BotFather`
   - `TELEGRAM_WEBHOOK_URL`: URL pública apontando para seu domínio (ex: `https://tower-bot.seudominio.com/webhook`)
   - `POSTGRES_PASSWORD`: senha forte para o banco de dados
   - `SESSION_JWT_SECRET`: chave secreta aleatória (mínimo 32 caracteres)
6. Clique em **Deploy**.

---

### Opção B: Deploy por Repositório Git (Serviço Individual)
1. No Easypanel, crie um serviço apontando para o Git: `https://github.com/appbigwriter/tower.git` (branch `main`).
2. Defina o **Build Path** e **Dockerfile Path** de acordo com o serviço desejado (ex: `09-codigo/gateway-bot/Dockerfile`).
3. Configure os domínios com SSL automático (Let's Encrypt).

---

## 3. Configuração do Webhook do Telegram

Após o deploy do serviço `gateway-bot`, configure o webhook no Telegram executando uma requisição HTTP ou via curl:

```bash
curl -X POST "https://api.telegram.org/bot<SEU_TELEGRAM_BOT_TOKEN>/setWebhook?url=https://tower-bot.seudominio.com/webhook"
```

Resposta esperada:
```json
{"ok":true,"result":true,"description":"Webhook was set"}
```

---

## 4. Verificação de Saúde e Logs

- **Logs do Banco:** Verifique se as migrations foram executadas em `/docker-entrypoint-initdb.d`.
- **Logs do Bot:** Verifique a conexão com o Telegram e o MCP Server.
- **Painel Web:** Acesse `https://tower.seudominio.com` e realize o primeiro login e pareamento.
