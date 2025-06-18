# Arquitetura do Sistema - Delagil Site

## 🏗️ Visão Geral

Este documento descreve a arquitetura técnica do site da Delagil, detalhando as tecnologias utilizadas, padrões de design, fluxo de dados e decisões arquiteturais.

## 🧩 Stack Tecnológico

### Frontend

- **Framework**: React 18
- **Linguagem**: TypeScript 5
- **Build Tool**: Vite 4
- **Roteamento**: React Router 6
- **Estilização**: Tailwind CSS 3
- **Ícones**: Lucide Icons
- **Formulários**: React Hook Form
- **Validação**: Zod
- **Testes**: Vitest + Testing Library

### Backend

- **Plataforma**: Supabase
- **Banco de Dados**: PostgreSQL
- **Autenticação**: Supabase Auth
- **Storage**: Supabase Storage
- **Funções Serverless**: Supabase Edge Functions (Deno)

### DevOps

- **Versionamento**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Hospedagem**: Vercel
- **Monitoramento**: Vercel Analytics + Sentry

## 📐 Padrões Arquiteturais

### Arquitetura Geral

O projeto segue uma arquitetura de **Single Page Application (SPA)** com componentes React organizados em uma estrutura modular. A comunicação com o backend é feita através da API do Supabase.

```
┌─────────────────────────────────────┐
│              Frontend               │
│  ┌─────────┐  ┌─────────────────┐   │
│  │   UI    │  │     Páginas     │   │
│  │Components│  │                 │   │
│  └─────────┘  └─────────────────┘   │
│        │              │             │
│  ┌─────────┐  ┌─────────────────┐   │
│  │  Hooks  │  │    Services     │   │
│  │         │  │                 │   │
│  └─────────┘  └─────────────────┘   │
└──────────────────┬──────────────────┘
                  │
┌──────────────────▼──────────────────┐
│            API Gateway              │
│         (Supabase Client)           │
└──────────────────┬──────────────────┘
                  │
┌──────────────────▼──────────────────┐
│              Backend                │
│  ┌─────────┐  ┌─────────────────┐   │
│  │PostgreSQL│  │  Edge Functions │   │
│  │         │  │                 │   │
│  └─────────┘  └─────────────────┘   │
│  ┌─────────┐  ┌─────────────────┐   │
│  │  Auth   │  │     Storage     │   │
│  │         │  │                 │   │
│  └─────────┘  └─────────────────┘   │
└─────────────────────────────────────┘
```

### Padrões de Design

1. **Component-Based Architecture**: A UI é construída a partir de componentes reutilizáveis e compostos.

2. **Container/Presentational Pattern**: Separação entre componentes que gerenciam estado (containers) e componentes que apenas renderizam UI (presentational).

3. **Custom Hooks**: Lógica reutilizável extraída para hooks personalizados.

4. **Context API**: Para gerenciamento de estado global quando necessário.

5. **Service Layer**: Abstração para comunicação com APIs externas.

## 🔄 Fluxo de Dados

### Diagrama de Fluxo

```
┌─────────┐      ┌─────────┐      ┌─────────┐
│  User   │─────▶│   UI    │─────▶│  State  │
│ Action  │      │Component│      │ (Hooks) │
└─────────┘      └─────────┘      └────┬────┘
                                      │
                                      ▼
┌─────────┐      ┌─────────┐      ┌─────────┐
│ Render  │◀─────│Component│◀─────│ Service │
│  UI     │      │ Update  │      │  Layer  │
└─────────┘      └─────────┘      └────┬────┘
                                      │
                                      ▼
                                 ┌─────────┐
                                 │Supabase │
                                 │   API   │
                                 └─────────┘
```

### Descrição do Fluxo

1. **Ação do Usuário**: O usuário interage com um componente da UI (clique, input, etc.)
2. **Atualização de Estado**: O componente chama um handler que atualiza o estado via hooks
3. **Chamada de Serviço**: Se necessário, o hook chama um serviço para buscar/enviar dados
4. **Comunicação com API**: O serviço se comunica com a API do Supabase
5. **Atualização de UI**: O estado atualizado causa uma re-renderização dos componentes

## 📊 Gerenciamento de Estado

### Tipos de Estado

1. **Estado Local**: Gerenciado com `useState` para dados específicos de um componente
  ```jsx
  const [isOpen, setIsOpen] = useState(false);
  ```

2. **Estado de Formulário**: Gerenciado com React Hook Form
  ```jsx
  const { register, handleSubmit, errors } = useForm();
  ```

3. **Estado Global**: Gerenciado com Context API para dados compartilhados
  ```jsx
  const { theme, toggleTheme } = useTheme();
  ```

4. **Estado de Servidor**: Dados buscados de APIs, gerenciados com hooks customizados
  ```jsx
  const { data, loading, error } = useServices();
  ```

### Estratégia de Caching

- Dados frequentemente acessados são armazenados em cache na memória
- Implementação de stale-while-revalidate para manter dados frescos
- Invalidação de cache quando necessário

## 🔐 Segurança

### Autenticação e Autorização

- **Autenticação**: Implementada via Supabase Auth
- **Autorização**: Baseada em Row Level Security (RLS) no PostgreSQL
- **Proteção de Rotas**: Componentes de rota protegidos para áreas administrativas

### Proteção de Dados

- **Validação**: Todos os inputs são validados tanto no cliente quanto no servidor
- **Sanitização**: Dados são sanitizados antes de serem armazenados
- **CORS**: Configurado para permitir apenas origens confiáveis
- **Headers de Segurança**: Implementados via Vercel

## 🚀 Performance

### Estratégias de Otimização

1. **Code Splitting**: Carregamento sob demanda de componentes e rotas
  ```jsx
  const HomePage = lazy(() => import('@/pages/HomePage'));
  ```

2. **Lazy Loading**: Imagens e componentes carregados apenas quando necessário
  ```jsx
  <img loading="lazy" src="/image.jpg" alt="Description" />
  ```

3. **Memoização**: Prevenção de re-renderizações desnecessárias
  ```jsx
  const MemoizedComponent = React.memo(ExpensiveComponent);
  ```

4. **Otimização de Assets**:
  - Imagens em formato WebP
  - Minificação de CSS e JavaScript
  - Tree-shaking para eliminar código não utilizado

### Métricas de Performance

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s

## 🧪 Estratégia de Testes

### Níveis de Teste

1. **Testes Unitários**: Testam componentes e funções isoladamente
  ```jsx
  test('Button renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  ```

2. **Testes de Integração**: Testam a interação entre componentes
  ```jsx
  test('Form submission works', async () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('Thank you!')).toBeInTheDocument();
    });
  });
  ```

3. **Testes E2E**: Testam fluxos completos de usuário (planejados para o futuro)

### Cobertura de Testes

Meta de cobertura:
- Componentes UI: 80%
- Hooks e Serviços: 90%
- Utilitários: 95%

## 📱 Responsividade e Acessibilidade

### Estratégia Mobile-First

- Design iniciado pela versão mobile e expandido para desktop
- Uso de media queries para adaptar layouts
- Componentes flexíveis que se ajustam a diferentes tamanhos de tela

### Acessibilidade (A11y)

- Conformidade com WCAG 2.1 nível AA
- Uso semântico de HTML5
- Suporte a navegação por teclado
- Atributos ARIA quando necessário
- Contraste de cores adequado
- Textos alternativos para imagens

## 🔄 CI/CD

### Pipeline de Integração Contínua

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│   Git   │───▶│  Lint   │───▶│  Build  │───▶│  Test   │
│  Push   │    │         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                                 │
┌─────────┐    ┌─────────┐    ┌─────────┐        │
│Production│◀───│  E2E    │◀───│ Deploy  │◀───────┘
│ Deploy   │    │  Tests  │    │ Preview │
└─────────┘    └─────────┘    └─────────┘
```

### Ambientes

1. **Desenvolvimento**: Local, para trabalho dos desenvolvedores
2. **Preview**: Gerado automaticamente para cada PR
3. **Staging**: Para testes antes de produção
4. **Produção**: Ambiente live para usuários finais

## 📦 Dependências Externas

### Principais Bibliotecas

| Biblioteca | Versão | Propósito |
|------------|--------|-----------|
| React | 18.x | Framework UI |
| TypeScript | 5.x | Tipagem estática |
| React Router | 6.x | Roteamento |
| Tailwind CSS | 3.x | Estilização |
| Lucide Icons | 0.x | Ícones |
| React Hook Form | 7.x | Gerenciamento de formulários |
| Zod | 3.x | Validação de esquemas |
| Supabase JS | 2.x | Cliente Supabase |

### Gestão de Dependências

- Uso de `package.json` para listar dependências
- Versões fixas para garantir consistência
- Atualizações regulares para segurança
- Análise de vulnerabilidades com GitHub Dependabot

## 🔍 SEO e Análise

### Estratégia de SEO

- Meta tags dinâmicas por página
- Estrutura de URL semântica
- Sitemap XML
- Dados estruturados (JSON-LD)
- Otimização de Core Web Vitals

### Análise e Monitoramento

- **Vercel Analytics**: Para métricas de performance e uso
- **Google Analytics**: Para comportamento do usuário
- **Sentry**: Para monitoramento de erros
- **Logs**: Armazenados para auditoria e debugging

## 🔄 Escalabilidade

### Estratégias para Crescimento

1. **Modularidade**: Componentes e serviços isolados que podem ser expandidos
2. **Lazy Loading**: Carregamento sob demanda para reduzir o impacto de novos recursos
3. **Microservices**: Possibilidade de migrar para uma arquitetura de microserviços no futuro
4. **Internacionalização**: Estrutura preparada para suportar múltiplos idiomas

### Limites Técnicos

- **Supabase Free Tier**: Limitações de armazenamento e operações
- **Vercel Hobby**: Limitações de build e bandwidth
- **Bundle Size**: Monitoramento para evitar crescimento excessivo

## 📝 Decisões Arquiteturais

### Por que React?

React foi escolhido por sua popularidade, ecossistema maduro, e facilidade de encontrar desenvolvedores. A combinação com TypeScript proporciona um desenvolvimento mais seguro e manutenível.

### Por que Supabase?

Supabase oferece uma solução completa de backend-as-a-service com PostgreSQL, autenticação, storage e funções serverless, permitindo desenvolvimento rápido sem necessidade de criar um backend customizado.

### Por que Tailwind CSS?

Tailwind CSS foi escolhido pela produtividade que oferece, permitindo estilização rápida e consistente diretamente nos componentes, sem necessidade de alternar entre arquivos CSS.

### Por que Vite?

Vite proporciona uma experiência de desenvolvimento significativamente mais rápida que outras ferramentas de build, com hot module replacement instantâneo e build otimizado para produção.

## 🔮 Evolução Futura

### Roadmap Técnico

1. **Curto Prazo (3 meses)**
  - Implementação completa de testes automatizados
  - Otimização de performance e Core Web Vitals
  - Implementação de PWA básico

2. **Médio Prazo (6 meses)**
  - Sistema de CMS para conteúdo dinâmico
  - Internacionalização (i18n)
  - Implementação de testes E2E

3. **Longo Prazo (12 meses)**
  - Migração para arquitetura de micro-frontends
  - Implementação de recursos avançados de PWA
  - Sistema de analytics avançado

### Dívida Técnica

Áreas identificadas para melhoria:
- Cobertura de testes incompleta
- Otimização de imagens manual
- Falta de documentação detalhada de componentes
- Necessidade de refatoração de alguns componentes legados