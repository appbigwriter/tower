# Dockerfile na raiz do repositório para Easypanel
FROM node:20-alpine AS builder

WORKDIR /app

# Copia e instala dependências do web app
COPY 09-codigo/web/package*.json 09-codigo/web/tsconfig.json ./
RUN npm ci

COPY 09-codigo/web/src ./src

# Build Next.js para produção
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY 09-codigo/web/package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src ./src

EXPOSE 3000
CMD ["npm", "start"]
