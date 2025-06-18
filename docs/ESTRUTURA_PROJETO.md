# Estrutura do Projeto - Delagil Site

## 📁 Visão Geral

Este documento detalha a estrutura de diretórios e arquivos do projeto, explicando a organização do código e as convenções adotadas.

## 🗂️ Estrutura de Diretórios

```
delagil-site/
├── .github/                  # Configurações do GitHub e CI/CD
├── public/                   # Arquivos estáticos públicos
├── src/                      # Código-fonte da aplicação
│   ├── assets/               # Recursos estáticos (imagens, fontes, etc.)
│   ├── components/           # Componentes React reutilizáveis
│   │   ├── common/           # Componentes básicos (Button, Card, etc.)
│   │   ├── forms/            # Componentes de formulário
│   │   ├── layout/           # Componentes de layout (Header, Footer, etc.)
│   │   ├── portfolio/        # Componentes específicos do portfólio
│   │   ├── services/         # Componentes específicos de serviços
│   │   └── ui/               # Componentes de UI (Modal, Tooltip, etc.)
│   ├── config/               # Configurações da aplicação
│   ├── context/              # Contextos React
│   ├── hooks/                # Hooks personalizados
│   ├── lib/                  # Bibliotecas e utilitários
│   ├── pages/                # Componentes de página
│   ├── services/             # Serviços para comunicação com APIs
│   ├── styles/               # Estilos globais e utilitários CSS
│   ├── types/                # Definições de tipos TypeScript
│   ├── utils/                # Funções utilitárias
│   ├── App.tsx               # Componente raiz da aplicação
│   ├── main.tsx              # Ponto de entrada da aplicação
│   └── vite-env.d.ts         # Definições de tipos para Vite
├── docs/                     # Documentação do projeto
├── tests/                    # Testes automatizados
├── .env.example              # Exemplo de variáveis de ambiente
├── .eslintrc.js              # Configuração do ESLint
├── .gitignore                # Arquivos ignorados pelo Git
├── .prettierrc               # Configuração do Prettier
├── index.html                # Arquivo HTML principal
├── package.json              # Dependências e scripts
├── postcss.config.js         # Configuração do PostCSS
├── README.md                 # Documentação principal
├── tailwind.config.js        # Configuração do Tailwind CSS
├── tsconfig.json             # Configuração do TypeScript
└── vite.config.ts            # Configuração do Vite
```

## 📂 Detalhamento dos Diretórios

### 📁 src/components/

Contém todos os componentes React reutilizáveis, organizados por categorias.

#### 📁 src/components/common/

Componentes básicos que são usados em toda a aplicação.

```
common/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   └── index.ts
├── Card/
├── Divider/
├── Icon/
├── Image/
├── Link/
└── Typography/
    ├── Heading.tsx
    ├── Paragraph.tsx
    ├── Typography.test.tsx
    └── index.ts
```

#### 📁 src/components/forms/

Componentes relacionados a formulários.

```
forms/
├── ContactForm/
│   ├── ContactForm.tsx
│   ├── ContactForm.test.tsx
│   └── index.ts
├── FormField/
├── Input/
├── Select/
├── Textarea/
└── index.ts
```

#### 📁 src/components/layout/

Componentes que definem a estrutura das páginas.

```
layout/
├── Footer/
│   ├── Footer.tsx
│   └── index.ts
├── Header/
│   ├── Header.tsx
│   ├── MobileMenu.tsx
│   └── index.ts
├── MainLayout/
│   ├── MainLayout.tsx
│   └── index.ts
├── Section/
└── index.ts
```

#### 📁 src/components/portfolio/

Componentes específicos para a seção de portfólio.

```
portfolio/
├── PortfolioCard/
│   ├── PortfolioCard.tsx
│   └── index.ts
├── PortfolioFilter/
├── PortfolioGallery/
├── PortfolioModal/
└── index.ts
```

#### 📁 src/components/services/

Componentes específicos para a seção de serviços.

```
services/
├── ServiceCard/
│   ├── ServiceCard.tsx
│   └── index.ts
├── ServiceCategory/
├── ServiceFeature/
└── index.ts
```

#### 📁 src/components/ui/

Componentes de interface do usuário mais complexos.

```
ui/
├── Accordion/
├── Alert/
├── Carousel/
├── Dropdown/
├── Modal/
├── Pagination/
├── Tabs/
├── Toast/
└── index.ts
```

### 📁 src/context/

Contextos React para gerenciamento de estado global.

```
context/
├── ThemeContext.tsx
├── AuthContext.tsx
└── index.ts
```

### 📁 src/hooks/

Hooks personalizados para lógica reutilizável.

```
hooks/
├── useBreakpoint.ts
├── useClickOutside.ts
├── useForm.ts
├── useLocalStorage.ts
├── usePortfolio.ts
├── useServices.ts
└── index.ts
```

### 📁 src/lib/

Bibliotecas e integrações com serviços externos.

```
lib/
├── supabase/
│   ├── client.ts
│   └── types.ts
├── analytics.ts
└── validation.ts
```

### 📁 src/pages/

Componentes de página que representam rotas da aplicação.

```
pages/
├── AboutPage/
│   ├── AboutPage.tsx
│   └── index.ts
├── BlogPage/
│   ├── BlogPage.tsx
│   ├── BlogPostPage.tsx
│   └── index.ts
├── ContactPage/
│   ├── ContactPage.tsx
│   └── index.ts
├── HomePage/
│   ├── HomePage.tsx
│   └── index.ts
├── NotFoundPage/
│   ├── NotFoundPage.tsx
│   └── index.ts
├── PortfolioPage/
│   ├── PortfolioPage.tsx
│   └── index.ts
├── ServicesPage/
│   ├── ServiceDetailPage.tsx
│   ├── ServicesPage.tsx
│   └── index.ts
└── index.ts
```

### 📁 src/services/

Serviços para comunicação com APIs e lógica de negócios.

```
services/
├── analyticsService.ts
├── blogService.ts
├── contactService.ts
├── portfolioService.ts
├── serviceService.ts
├── supabaseService.ts
└── index.ts
```

### 📁 src/types/

Definições de tipos TypeScript para toda a aplicação.

```
types/
├── blog.ts
├── common.ts
├── contact.ts
├── portfolio.ts
├── service.ts
└── index.ts
```

### 📁 src/utils/

Funções utilitárias reutilizáveis.

```
utils/
├── date.ts
├── format.ts
├── seo.ts
├── string.ts
├── validation.ts
└── index.ts
```

## 🔄 Convenções de Nomenclatura

### 📝 Arquivos e Diretórios

- **PascalCase**: Componentes React e seus diretórios
  - `Button.tsx`, `HomePage.tsx`, `ServiceCard/`
- **camelCase**: Utilitários, hooks, serviços e outros arquivos JavaScript/TypeScript
  - `useLocalStorage.ts`, `dateUtils.ts`, `supabaseService.ts`
- **kebab-case**: Arquivos CSS e recursos estáticos
  - `button-styles.css`, `hero-image.webp`

### 🧩 Componentes

- Cada componente deve estar em seu próprio diretório
- O diretório deve ter o mesmo nome que o componente
- Deve incluir um arquivo `index.ts` para exportação
- Arquivos de teste devem ter o sufixo `.test.tsx` ou `.spec.tsx`

```
Button/
├── Button.tsx       # Implementação do componente
├── Button.test.tsx  # Testes do componente
└── index.ts         # Exportação do componente
```

Conteúdo de `index.ts`:
```typescript
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### 🪝 Hooks

- Nomes de hooks devem começar com `use`
- Cada hook deve ter uma única responsabilidade
- Hooks complexos podem ser divididos em hooks menores

```typescript
// usePortfolio.ts
export const usePortfolio = () => {
  // Implementação
};

// usePortfolioItem.ts
export const usePortfolioItem = (id: string) => {
  // Implementação
};
```

### 🔄 Serviços

- Nomes de serviços devem terminar com `Service`
- Cada serviço deve encapsular a lógica de comunicação com uma API ou recurso externo

```typescript
// portfolioService.ts
export const portfolioService = {
  getAll: async () => {
    // Implementação
  },
  getById: async (id: string) => {
    // Implementação
  },
  // ...
};
```

## 📦 Importações e Exportações

### 📤 Exportações

- Usar exportações nomeadas para componentes, hooks e utilitários
- Evitar exportações default
- Usar arquivos barrel (`index.ts`) para simplificar importações

```typescript
// Button/Button.tsx
export interface ButtonProps {
  // ...
}

export const Button: React.FC<ButtonProps> = (props) => {
  // ...
};

// components/common/index.ts
export * from './Button';
export * from './Card';
export * from './Typography';
// ...
```

### 📥 Importações

- Usar importações absolutas a partir de `src/`
- Agrupar importações por tipo (React, componentes, hooks, etc.)
- Manter ordem consistente nas importações

```typescript
// Importações externas
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Importações internas (componentes)
import { Button } from '@/components/common';
import { ServiceCard } from '@/components/services';

// Importações internas (hooks, utils, etc.)
import { useServices } from '@/hooks';
import { formatDate } from '@/utils';

// Importações de tipos
import type { Service } from '@/types';
```

## 🎨 Estilos

### 🌈 Tailwind CSS

- Usar classes Tailwind diretamente nos componentes
- Extrair classes repetitivas para componentes ou variáveis
- Usar `@apply` em casos específicos para estilos complexos

```tsx
// Uso direto de classes
<button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
  Click me
</button>

// Extração para variáveis
const buttonClasses = "px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark";
<button className={buttonClasses}>Click me</button>
```

### 🎭 Variantes de Componentes

- Usar funções utilitárias para gerar classes condicionais
- Definir variantes claras para componentes

```tsx
// Button.tsx
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  "px-4 py-2 rounded font-medium focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-dark",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        outline: "bg-transparent border border-primary text-primary hover:bg-primary/10",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  // ...
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  className, 
  ...props 
}) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
};
```

## 🧪 Testes

### 🔍 Estrutura de Testes

- Testes unitários colocados junto aos componentes
- Testes de integração em diretório separado

```
Button/
├── Button.tsx
├── Button.test.tsx  # Teste unitário
└── index.ts

tests/
├── integration/     # Testes de integração
└── e2e/             # Testes end-to-end
```

### 📝 Convenções de Testes

- Usar Testing Library para testes de componentes
- Seguir o padrão AAA (Arrange, Act, Assert)
- Testar comportamento, não implementação

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    // Arrange
    render(<Button>Click me</Button>);
    
    // Assert
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    // Act
    fireEvent.click(screen.getByText('Click me'));
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 🚀 Configuração do Projeto

### 📝 Vite

Configuração principal em `vite.config.ts`:

````typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
````

### 📝 TypeScript

Configuração em `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 📝 Tailwind CSS

Configuração em `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056b3',
          dark: '#004494',
          light: '#3378c5',
        },
        secondary: {
          DEFAULT: '#ff6b00',
          dark: '#e05f00',
          light: '#ff8c33',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### 📝 ESLint

Configuração em `.eslintrc.js`:

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jsx-a11y',
    'import',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': 'error',
  },
};
```

### 📝 Prettier

Configuração em `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

## 🚀 Scripts do Projeto

Definidos em `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "prepare": "husky install"
  }
}
```

## 🔄 Fluxo de Desenvolvimento

### 🌿 Estratégia de Branches

- `main`: Código de produção
- `develop`: Código de desenvolvimento
- `feature/*`: Novas funcionalidades
- `bugfix/*`: Correções de bugs
- `release/*`: Preparação para release

### 🔄 Processo de Pull Request

1. Criar branch a partir de `develop`
2. Desenvolver a funcionalidade
3. Executar testes e lint localmente
4. Criar Pull Request para `develop`
5. Revisão de código
6. Merge após aprovação

### 🚀 Processo de Deploy

1. Merge de `develop` para `release/vX.Y.Z`
2. Testes finais na branch de release
3. Merge de `release/vX.Y.Z` para `main`
4. Tag da versão em `main`
5. Deploy automático via GitHub Actions

## 📝 Boas Práticas

### 🧩 Componentes

- Manter componentes pequenos e focados
- Usar composição em vez de herança
- Extrair lógica complexa para hooks
- Documentar props com JSDoc

```tsx
/**
 * Botão primário com várias variantes
 * @param variant - Estilo visual do botão
 * @param size - Tamanho do botão
 * @param leftIcon - Ícone à esquerda do texto
 * @param rightIcon - Ícone à direita do texto
 * @param isLoading - Estado de carregamento
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading,
  children,
  ...props
}) => {
  // Implementação
};
```

### 🪝 Hooks

- Seguir as regras de hooks
- Manter hooks simples e reutilizáveis
- Usar memoização quando apropriado

```tsx
export const usePortfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const data = await portfolioService.getAll();
        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return { items, loading, error };
};
```

### 🔄 Estado

- Usar estado local quando possível
- Usar contexto para estado compartilhado entre componentes próximos
- Considerar bibliotecas de gerenciamento de estado para aplicações complexas

```tsx
// Contexto para tema
export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### 🧪 Testes

- Testar comportamento, não implementação
- Usar mocks para serviços externos
- Testar casos de erro e edge cases

```tsx
// Exemplo de teste com mock
jest.mock('@/services/portfolioService', () => ({
  getAll: jest.fn().mockResolvedValue([
    { id: '1', title: 'Project 1' },
    { id: '2', title: 'Project 2' },
  ]),
}));

test('displays portfolio items', async () => {
  render(<PortfolioList />);
  
  // Verificar estado de carregamento
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  // Esperar pelos itens
  const items = await screen.findAllByTestId('portfolio-item');
  expect(items).toHaveLength(2);
  expect(screen.getByText('Project 1')).toBeInTheDocument();
  expect(screen.getByText('Project 2')).toBeInTheDocument();
});
```

## 📚 Recursos Adicionais

- [Documentação do React](https://reactjs.org/docs/getting-started.html)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)
- [Documentação do Vite](https://vitejs.dev/guide/)
- [Documentação do Supabase](https://supabase.io/docs)
```