# Delagil - Site Corporativo

## Visão Geral

O site da Delagil é uma aplicação web moderna desenvolvida em React com TypeScript, focada em apresentar os serviços da empresa nas áreas de Marketing Digital, Consultoria Estratégica e Tecnologia.

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Roteamento**: React Router DOM
- **Backend**: Supabase (PostgreSQL)
- **Ícones**: Lucide React
- **Build**: Vite

## 📋 Funcionalidades Principais

- ✅ **Página Inicial** com hero section e destaques
- ✅ **Catálogo de Serviços** organizados por categorias
- ✅ **Portfólio** de projetos realizados
- ✅ **Formulário de Contato** integrado
- ✅ **Página de Contato** com informações da empresa
- ✅ **Política de Privacidade**
- ✅ **Design Responsivo** para todos os dispositivos
- ✅ **Sistema de Componentes** reutilizáveis

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── forms/          # Formulários
│   ├── portfolio/      # Componentes do portfólio
│   ├── services/       # Componentes de serviços
│   └── ui/            # Componentes de interface
├── pages/             # Páginas da aplicação
├── services/          # Serviços e integrações
├── types/            # Definições de tipos TypeScript
└── utils/            # Utilitários e constantes
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Execute em modo desenvolvimento
npm run dev
```

### Variáveis de Ambiente
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## 📦 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza build de produção
- `npm run lint` - Executa linting do código

## 🌐 Deploy

O projeto está configurado para deploy em plataformas como:
- Vercel
- Netlify
- AWS Amplify

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos canais oficiais da Delagil.

## 📄 Licença

Este projeto é propriedade da Delagil. Todos os direitos reservados.
```

```markdown:docs/USER_GUIDE.md
# Guia do Usuário - Site Delagil

## 📖 Introdução

Este guia explica como navegar e utilizar todas as funcionalidades do site da Delagil.

## 🏠 Página Inicial

### Hero Section
- **Slogan principal** da empresa
- **Botão de CTA** que direciona para o formulário de contato
- **Background visual** atrativo com gradiente

### Seções Principais
1. **Serviços em Destaque** - Mostra os 3 principais serviços
2. **Depoimentos** - Feedback de clientes satisfeitos
3. **Chamada para Ação** - Incentiva o contato

## 🛠️ Página de Serviços

### Navegação por Categorias
- **Marketing Digital**
- **Consultoria Estratégica** 
- **Tecnologia**

### Funcionalidades
- **Cards informativos** para cada categoria
- **Ícones representativos** usando Lucide Icons
- **Descrições detalhadas** dos serviços
- **Navegação intuitiva** entre categorias

### Página de Categoria Específica
- **Lista completa** de serviços da categoria
- **Descrições curtas e longas** de cada serviço
- **Botão de retorno** para página principal de serviços

## 🎨 Portfólio

### Visualização de Projetos
- **Grid responsivo** de projetos
- **Filtros por categoria** para facilitar navegação
- **Cards com informações** de cada projeto:
  - Título do projeto
  - Categoria
  - Descrição
  - Link externo (quando disponível)

### Filtros Disponíveis
- **"Todos"** - Mostra todos os projetos
- **Por categoria** - Filtra projetos específicos

## 📞 Contato

### Página de Contato
**Informações da Empresa:**
- Email de contato
- Telefone
- Endereço físico
- Horário de atendimento

**Mapa de Localização:**
- Placeholder para integração futura com Google Maps

### Formulário de Contato

**Campos Obrigatórios:**
- Nome completo
- Email
- Telefone
- Empresa (opcional)
- Mensagem

**Campos Especiais:**
- **Serviços de Interesse** - Checkboxes múltiplas
- **Validação em tempo real**
- **Feedback visual** de envio

**Estados do Formulário:**
- ⏳ **Carregando** - Durante envio
- ✅ **Sucesso** - Mensagem enviada
- ❌ **Erro** - Falha no envio

## 🔍 Navegação Geral

### Menu Principal
- **Home** - Página inicial
- **Serviços** - Catálogo completo
- **Portfólio** - Projetos realizados
- **Contato** - Informações e formulário

### Recursos de UX
- **Design responsivo** para mobile, tablet e desktop
- **Loading states** em todas as páginas
- **Error handling** com mensagens amigáveis
- **Navegação breadcrumb** em páginas internas

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptações Mobile
- **Menu hamburger** (se implementado)
- **Cards empilhados** em tela pequena
- **Formulários otimizados** para touch
- **Imagens responsivas**

## 🎨 Sistema de Design

### Cores da Marca
- **Primary**: Cor principal da marca
- **Secondary**: Cor secundária
- **Accent**: Cor de destaque
- **Text**: Variações para textos

### Componentes Reutilizáveis
- **Button** - 4 variantes (primary, secondary, outline, ghost)
- **Card** - Com efeito hover opcional
- **Form Fields** - Campos padronizados

## ⚠️ Páginas de Erro

### 404 - Página Não Encontrada
- **Ícone visual** de alerta
- **Mensagem explicativa** amigável
- **Botão de retorno** para home
- **Design consistente** com o resto do site

## 🔒 Privacidade

### Política de Privacidade
- **Informações coletadas** pelo site
- **Uso dos dados** pessoais
- **Cookies e rastreamento**
- **Direitos do usuário**
- **Conformidade com LGPD**

## 💡 Dicas de Uso

1. **Performance**: O site carrega rapidamente graças ao Vite
2. **SEO**: Títulos e descrições otimizados
3. **Acessibilidade**: Componentes seguem boas práticas
4. **Manutenção**: Código modular facilita atualizações

## 🆘 Solução de Problemas

### Problemas Comuns
- **Formulário não envia**: Verificar conexão com internet
- **Imagens não carregam**: Aguardar carregamento completo
- **Página em branco**: Recarregar navegador

### Suporte Técnico
Em caso de problemas persistentes, entre em contato através dos canais oficiais da Delagil.
```

```markdown:docs/ARQUITETURA.md
# Arquitetura do Sistema - Delagil Site

## 🏗️ Visão Geral da Arquitetura

O site da Delagil segue uma arquitetura moderna de SPA (Single Page Application) com separação clara de responsabilidades e componentes reutilizáveis.

## 📁 Estrutura de Pastas Detalhada

```
delagil-site/
├── public/                     # Arquivos estáticos
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/             # Componentes reutilizáveis
│   │   ├── forms/             # Componentes de formulário
│   │   │   └── ContactForm.tsx
│   │   ├── portfolio/         # Componentes do portfólio
│   │   │   └── PortfolioCard.tsx
│   │   ├── services/          # Componentes de serviços
│   │   │   └── ServiceCard.tsx
│   │   └── ui/               # Componentes base de UI
│   │       └── Button.tsx
│   ├── pages/                # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   ├── ServicesLandingPage.tsx
│   │   ├── ServiceCategoryPage.tsx
│   │   ├── PortfolioPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── PrivacyPolicyPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/             # Camada de serviços
│   │   └── supabaseService.ts
│   ├── types/               # Definições TypeScript
│   │   ├── service.ts
│   │   ├── portfolio.ts
│   │   ├── contact.ts
│   │   └── testimonial.ts
│   ├── utils/              # Utilitários e constantes
│   │   └── constants.ts
│   ├── App.tsx            # Componente raiz
│   └── main.tsx          # Ponto de entrada
├── docs/                 # Documentação
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🔧 Stack Tecnológico

### Frontend
- **React 18**: Biblioteca principal para UI
- **TypeScript**: Tipagem estática
- **Vite**: Build tool e dev server
- **Tailwind CSS**: Framework CSS utilitário
- **React Router DOM**: Roteamento SPA

### Backend & Dados
- **Supabase**: Backend-as-a-Service
  - PostgreSQL database
  - Authentication (futuro)
  - Real-time subscriptions (futuro)
  - Storage (futuro)

### Bibliotecas Auxiliares
- **Lucide React**: Ícones SVG
- **React Hook Form**: Gerenciamento de formulários (futuro)

## 🏛️ Padrões Arquiteturais

### 1. Component-Based Architecture
```typescript
// Estrutura típica de componente
interface ComponentProps {
  // Props tipadas
}

const Component: React.FC<ComponentProps> = ({ props }) => {
  // Lógica do componente
  return (
    // JSX
  );
};
```

### 2. Container/Presentational Pattern
- **Pages**: Containers que gerenciam estado e lógica
- **Components**: Apresentacionais, recebem props

### 3. Service Layer Pattern
```typescript
// services/supabaseService.ts
export const getServices = async (): Promise<Service[]> => {
  // Lógica de acesso a dados
};
```

## 🔄 Fluxo de Dados

### 1. Carregamento de Página
```
Page Component → useEffect → Service Layer → Supabase → State Update → Re-render
```

### 2. Interação do Usuário
```
User Action → Event Handler → State Update → Component Re-render
```

### 3. Formulário de Contato
```
Form Input → State Update → Validation → Submit → Service Layer → Feedback
```

## 🎨 Sistema de Design

### Tokens de Design (Tailwind)
```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'brand-primary': '#...',
      'brand-secondary': '#...',
      'brand-accent': '#...',
    }
  }
}
```

### Componentes Base
- **Button**: 4 variantes, 3 tamanhos
- **Card**: Container reutilizável com hover effects
- **Form Fields**: Inputs padronizados

## 🗄️ Modelagem de Dados

### Entidades Principais

#### Service
```typescript
interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  categoryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### ServiceCategory
```typescript
interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  slug: string;
  iconName: string;
  sortOrder: number;
  isActive: boolean;
}
```

#### PortfolioItem
```typescript
interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link?: string;
  isActive: boolean;
  createdAt: Date;
}
```

## 🔐 Segurança

### Validação
- **Frontend**: Validação de formulários em tempo real
- **Backend**: Validação no Supabase via RLS (Row Level Security)

### Sanitização
- **Inputs**: Sanitização de dados de entrada
- **XSS Protection**: Escape automático do React

## 📱 Responsividade

### Breakpoints Tailwind
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Estratégia Mobile-First
```css
/* Base: Mobile */
.component { /* mobile styles */ }

/* Tablet e acima */
@media (min-width: 768px) {
  .component { /* tablet styles */ }
}
```

## ⚡ Performance

### Otimizações Implementadas
- **Code Splitting**: Lazy loading de rotas (futuro)
- **Image Optimization**: Lazy loading de imagens
- **Bundle Optimization**: Tree shaking automático do Vite

 4. **PWA**: Service workers e offline support
 5. **Internationalization**: Suporte multi-idioma
 
- ### Melhorias de Performance
- 1. **Image Optimization**: WebP e lazy loading
- 2. **Code Splitting**: Rotas dinâmicas
- 3. **Caching**: Service workers
- 4. **Bundle Analysis**: Otimização de tamanho
- ```
+ 
+ - [ ] Prettier setup
+ - [ ] Husky pre-commit hooks
+ - [ ] Editor config
- ````markdown:docs/PLANO_DEV.md
- - # Plano de Desenvolvimento - Delagil Site
- + 
- + ### CI/CD
- + - [ ] GitHub Actions workflow
- + - [ ] Vercel deployment
- + - [ ] Automated testing
- - ## 📋 Status Atual do Projeto
- + ### Monitoramento
- + - [ ] Error tracking (Sentry)
- + - [ ] Performance monitoring
- + - [ ] Uptime monitoring
- - ### ✅ Funcionalidades Implementadas
- + ## 📝 Documentação
- - #### 🏗️ Estrutura Base
- - - [x] Configuração inicial do projeto com Vite + React + TypeScript
- - - [x] Configuração do Tailwind CSS
- - - [x] Estrutura de pastas organizada
- - - [x] Sistema de roteamento com React Router
- - - [x] Configuração do Supabase (mockado)
- + 
- + ### Documentação Técnica
- + - [ ] Arquitetura do sistema
- + - [ ] Padrões de código
- + - [ ] Fluxos de dados
- + - [ ] API documentation
- - #### 🎨 Componentes UI
- - - [x] **Button Component**
- -   - [x] 4 variantes (primary, secondary, outline, ghost)
- -   - [x] 3 tamanhos (sm, md, lg)
- -   - [x] Suporte a ícones (left/right)
- -   - [x] Estado de loading
- - - [x] **Card Component**
- -   - [x] Efeito hover opcional
- -   - [x] Padding e styling consistente
- + 
- + ### Documentação de Usuário
- + - [ ] Manual do administrador
- + - [ ] Guias de uso
- + - [ ] FAQs
- - #### 📄 Páginas Principais
- - - [x] **HomePage**
- -   - [x] Hero section com CTA
- -   - [x] Seção de serviços em destaque
- -   - [x] Seção de depoimentos
- -   - [x] Design responsivo
- - - [x] **ServicesLandingPage**
- -   - [x] Grid de categorias de serviços
- -   - [x] Cards com ícones Lucide
- -   - [x] Loading e error states
- - - [x] **ServiceCategoryPage**
- -   - [x] Listagem de serviços por categoria
- -   - [x] Breadcrumb navigation
- -   - [x] Integração com parâmetros de URL
- - - [x] **PortfolioPage**
- -   - [x] Grid responsivo de projetos
- -   - [x] Sistema de filtros por categoria
- -   - [x] Cards com informações detalhadas
- - - [x] **ContactPage**
- -   - [x] Informações de contato
- -   - [x] Placeholder para mapa
- -   - [x] Layout responsivo
- - - [x] **PrivacyPolicyPage**
- -   - [x] Conteúdo estruturado
- -   - [x] Typography consistente
- - - [x] **NotFoundPage (404)**
- -   - [x] Design amigável
- -   - [x] Botão de retorno
- + 
- + ## 🎯 Objetivos de Qualidade
- - #### 📝 Formulários
- - - [x] **ContactForm**
- -   - [x] Campos obrigatórios e opcionais
- -   - [x] Validação básica
- -   - [x] Checkboxes para serviços de interesse
- -   - [x] Estados de loading/success/error
- -   - [x] Simulação de envio
- + 
- + ### Performance
- + - [ ] Lighthouse Score > 90
- + - [ ] First Contentful Paint < 1.5s
- + - [ ] Time to Interactive < 3s
- + ### Produção
- + - [ ] Deploy automatizado
- + - [ ] Rollback strategy
- + - [ ] Monitoramento pós-deploy
- + ### Segurança
- + - [ ] Penetration testing
- + - [ ] Security headers
- + - [ ] Rate limiting
- + - [ ] DDoS protection
+