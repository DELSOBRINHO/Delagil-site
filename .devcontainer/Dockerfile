# Imagem base oficial do Node.js
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Instalar Playwright Browsers e Supabase CLI
RUN npm install -g @playwright/test && \
    npx playwright install --with-deps && \
    npm install -g supabase

# Instalar utilitários úteis
RUN apt-get update && apt-get install -y \
    git \
    curl \
    nano \
    && rm -rf /var/lib/apt/lists/*

# Definir diretório de trabalho
WORKDIR /workspace 