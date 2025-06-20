# Fluxo de Branch Staging (stg)

## Objetivo
Separar o ambiente de testes (staging) do desenvolvimento (`develop`) e da produção (`main`).

## Fluxo sugerido

1. **Branches principais:**
   - `main`: produção
   - `develop`: desenvolvimento
   - `stg`: staging/testes

2. **Como funciona:**
   - Desenvolvedores trabalham em feature branches a partir de `develop`.
   - Quando uma feature está pronta, faz merge em `develop`.
   - Periodicamente, faz merge de `develop` em `stg` para rodar testes integrados e de aceitação.
   - Após aprovação em `stg`, faz merge em `main` para produção.

3. **Deploy automatizado:**
   - Cada branch pode ter seu próprio ambiente (Vercel, Supabase, etc).
   - Workflows do GitHub Actions podem usar variáveis de ambiente específicas para cada branch.

4. **Vantagens:**
   - Isola testes de aceitação e QA.
   - Evita que código instável vá para produção.
   - Permite que a equipe de testes trabalhe sem impactar o desenvolvimento.

## Exemplo de comandos git

```sh
# Atualizar branch stg com develop
git checkout stg
git merge develop

# Após testes, merge para main
git checkout main
git merge stg
``` 