# 🚦 Guia de Fluxo de Trabalho Git - Delagil

## 1. **Branches Principais**
- **main**: Sempre estável, pronta para produção. Só recebe código testado e revisado.
- **develop**: Para desenvolvimento contínuo. Novas features, melhorias e correções são integradas aqui antes de irem para a main.

## 2. **Branches de Trabalho**
- **feature/nome-da-feature**: Para novas funcionalidades.
- **fix/nome-do-bug**: Para correções de bugs.
- **test/nome-do-teste**: Para experimentos ou melhorias em testes automatizados.
- **hotfix/nome-do-hotfix**: Para correções urgentes em produção.

## 3. **Fluxo de Trabalho Sugerido**

### a) Atualize sua develop local
```bash
git checkout develop
git pull origin develop
```

### b) Crie uma branch para sua tarefa
```bash
git checkout -b feature/nome-da-feature
```

### c) Faça commits pequenos e descritivos
```bash
git add .
git commit -m "feat: descrição clara da feature"
```

### d) Sincronize com o remoto regularmente
```bash
git push origin feature/nome-da-feature
```

### e) Ao terminar, abra um Pull Request (PR) para develop
- Peça revisão de código.
- Aguarde aprovação e merge.

### f) Após o merge, atualize develop e main
```bash
git checkout develop
git pull origin develop

git checkout main
git pull origin main
```

## 4. **Integração Contínua**
- Todo push/PR para develop ou main dispara os workflows do GitHub Actions:
  - Build, lint, testes, Lighthouse, acessibilidade.
- Só faça merge na main após todos os testes passarem na develop.

## 5. **Release para Produção**
- Quando a develop estiver estável e testada:
```bash
git checkout main
git merge develop
git push origin main
```
- O deploy para produção será feito automaticamente via Vercel.

## 6. **Hotfixes**
- Para bugs críticos em produção:
```bash
git checkout main
git pull origin main
git checkout -b hotfix/nome-do-hotfix
# Corrija o bug, commit, push
git push origin hotfix/nome-do-hotfix
# Abra PR para main e develop
```

## 7. **Dicas**
- Sempre escreva mensagens de commit claras e no imperativo (ex: "adiciona validação no formulário").
- Use PRs para revisão e colaboração.
- Resolva conflitos de merge localmente antes de subir para o remoto.
- Mantenha develop e main sempre atualizadas. 