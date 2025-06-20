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

## Checklist de Boas Práticas para Gerenciamento de Branches

- [ ] Sempre crie branches de feature a partir da branch `develop`.
- [ ] Nomeie as branches de feature de forma descritiva, ex: `feature/nome-da-feature`.
- [ ] Faça commits pequenos e frequentes, com mensagens claras.
- [ ] Antes de abrir um Pull Request, atualize sua branch com a última versão da `develop`.
- [ ] Solicite revisão de código (code review) antes de fazer merge na `develop` ou `main`.
- [ ] Após o merge da feature, delete a branch localmente e no remoto:
  - Local: `git branch -d nome-da-branch`
  - Remoto: `git push origin --delete nome-da-branch`
- [ ] Nunca trabalhe diretamente nas branches `main`, `develop` ou `stg`.
- [ ] Use Pull Requests para todo o fluxo de integração.
- [ ] Resolva conflitos de merge antes de solicitar revisão.
- [ ] Mantenha o repositório limpo, removendo branches antigas e não utilizadas.