# Stage 1: Build & Dépendances
FROM node:18.20.2-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Production
FROM node:18.20.2-alpine
WORKDIR /app

# Sécurité : Exécuter l'application avec un utilisateur non-root (node préexistant dans l'image)
USER node

# Copie uniquement des fichiers nécessaires depuis l'étape précédente
COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node src/ ./src/

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', r => process.exit(r.statusCode === 200 ? 0 : 1))"

CMD ["node", "src/app.js"]