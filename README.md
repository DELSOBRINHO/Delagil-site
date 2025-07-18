# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Desenvolvimento com Dev Container (VS Code)

Este projeto suporta [Dev Containers](https://containers.dev/) para garantir um ambiente de desenvolvimento padronizado.

### Como usar

1. Instale a extensão [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) no VS Code.
2. Clone o repositório e abra a pasta no VS Code.
3. Clique em "Reabrir em Container" quando solicitado, ou pressione F1 e selecione `Dev Containers: Reopen in Container`.
4. Aguarde a configuração automática do ambiente (Node, Playwright, Supabase CLI, etc.).
5. Configure seu `.env` a partir do `.env.example`.
6. Use os scripts npm normalmente (`npm run dev`, `npm run test:cases`, etc.).

### Vantagens
- Ambiente idêntico para todos os devs
- Playwright e browsers já instalados
- Supabase CLI disponível para testes locais
- Extensões recomendadas já instaladas

Se tiver dúvidas, consulte `.devcontainer/README.md` ou peça suporte no time.
#   T e s t e   d e   d e p l o y   n a   d e v e l o p  
 