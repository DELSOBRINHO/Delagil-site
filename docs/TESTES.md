# Testes - Delagil Site

## 📋 Visão Geral

Este documento descreve a estratégia de testes implementada para o site da Delagil, incluindo testes de acessibilidade, performance e qualidade.

## 🧪 Tipos de Testes

### 1. Testes de Acessibilidade

#### Playwright + Axe-Core
- **Arquivo**: `tests/accessibility.spec.js`
- **Comando**: `npm run test:accessibility`
- **Descrição**: Testes automatizados de acessibilidade usando Playwright e axe-core

#### Testes Implementados:
- Verificação de violações WCAG 2.1 AA
- Estrutura de cabeçalhos (h1, h2, h3...)
- Texto alternativo em imagens
- Indicadores de foco visíveis
- Contraste de cores
- Labels em formulários
- ARIA labels
- Navegação por teclado

#### Lighthouse Accessibility
- **Configuração**: `lighthouserc.js`
- **Comando**: `npm run lighthouse`
- **Descrição**: Auditoria de acessibilidade via Lighthouse CI

### 2. Testes de Performance

#### Lighthouse CI
- **Configuração**: `lighthouserc.js`
- **Comando**: `npm run lighthouse`
- **Métricas**:
  - First Contentful Paint (FCP) < 2s
  - Largest Contentful Paint (LCP) < 2.5s
  - Cumulative Layout Shift (CLS) < 0.1
  - Total Blocking Time (TBT) < 300ms

### 3. Testes de Qualidade

#### ESLint
- **Comando**: `npm run lint`
- **Descrição**: Análise estática de código TypeScript/React

## 🚀 Executando os Testes

### Localmente

```bash
# Instalar dependências
npm install

# Testes de acessibilidade
npm run test:accessibility

# Todos os testes
npm run test

# Testes com interface visual
npm run test:ui

# Testes com navegador visível
npm run test:headed

# Lighthouse CI
npm run lighthouse
```

### No CI/CD

Os testes são executados automaticamente no GitHub Actions:

1. **Build e Lint**: Verifica se o código compila e segue padrões
2. **Deploy**: Faz deploy para Vercel
3. **Lighthouse CI**: Executa auditorias de performance e acessibilidade
4. **Testes de Acessibilidade**: Executa testes Playwright + axe-core

## 📊 Relatórios

### Playwright
- **HTML**: `playwright-report/index.html`
- **JSON**: `test-results/results.json`
- **JUnit**: `test-results/results.xml`

### Lighthouse
- **Artefatos**: Uploadados automaticamente no GitHub Actions
- **Storage**: Temporary public storage para análise

## 🔧 Configuração

### Playwright
- **Arquivo**: `playwright.config.js`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Base URL**: `http://localhost:4173` (Vite preview)

### Lighthouse CI
- **Arquivo**: `lighthouserc.js`
- **URLs**: `https://delagil-site.vercel.app`
- **Runs**: 3 execuções por teste
- **Thresholds**: Definidos para performance, acessibilidade, best practices e SEO

## 📈 Métricas de Qualidade

### Acessibilidade
- **Score mínimo**: 90/100
- **Padrão**: WCAG 2.1 AA
- **Ferramentas**: axe-core, Lighthouse

### Performance
- **Score mínimo**: 80/100
- **Core Web Vitals**: Otimizados
- **Ferramentas**: Lighthouse CI

### SEO
- **Score mínimo**: 80/100
- **Meta tags**: Dinâmicas via SEOHead
- **Sitemap**: Automático
- **Robots.txt**: Configurado

## 🐛 Solução de Problemas

### Testes Falhando

1. **Acessibilidade**:
   - Verificar contraste de cores
   - Adicionar alt text em imagens
   - Verificar estrutura de cabeçalhos
   - Testar navegação por teclado

2. **Performance**:
   - Otimizar imagens
   - Implementar lazy loading
   - Reduzir bundle size
   - Otimizar CSS/JS

3. **SEO**:
   - Verificar meta tags
   - Atualizar sitemap
   - Verificar robots.txt

### Comandos Úteis

```bash
# Debug de testes
npm run test:headed

# Ver relatório detalhado
npm run test:ui

# Executar apenas um teste
npx playwright test tests/accessibility.spec.js --grep "should have proper heading structure"

# Lighthouse local
npx lighthouse https://delagil-site.vercel.app --output html --output-path ./lighthouse-report.html
```

## 🔄 Integração Contínua

### GitHub Actions

1. **test-and-build**: Build e lint
2. **deploy**: Deploy para Vercel
3. **lighthouse-ci**: Auditorias Lighthouse
4. **accessibility-test**: Testes Playwright
5. **performance-monitoring**: Monitoramento de performance

### Triggers
- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`

## 📝 Próximos Passos

1. **Testes Unitários**: Implementar com Vitest
2. **Testes de Integração**: Testes de formulários e navegação
3. **Testes E2E**: Fluxos completos de usuário
4. **Monitoramento**: Integração com Vercel Analytics
5. **Alertas**: Notificações para falhas críticas

## 📞 Suporte

Para dúvidas sobre testes:
- Consulte a documentação do Playwright
- Verifique os relatórios de erro no GitHub Actions
- Entre em contato com a equipe de desenvolvimento 