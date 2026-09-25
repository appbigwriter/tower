# Dockerfile para Easypanel no path /09-codigo
FROM node:20-alpine AS builder

WORKDIR /app

# Copia e instala dependências do web app
COPY web/package*.json web/tsconfig.json ./
RUN npm ci

COPY web/src ./src

# Build Next.js para produção
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY web/package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/src ./src

EXPOSE 3000
CMD ["npm", "start"]
