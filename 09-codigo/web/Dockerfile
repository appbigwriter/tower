# Dockerfile - Web Dashboard (Next.js)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig.json ./
RUN npm ci
COPY src ./src
# Build Next.js
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build || true

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
