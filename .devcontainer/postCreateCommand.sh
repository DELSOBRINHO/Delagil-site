#!/bin/bash
set -e

# Instalar dependências do projeto
npm install

# Instalar browsers do Playwright
npx playwright install --with-deps

# Mensagem de sucesso
echo "Dev container pronto! Abra o VS Code e comece a desenvolver." 