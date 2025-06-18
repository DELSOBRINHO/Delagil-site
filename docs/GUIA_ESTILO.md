# Guia de Estilo - Delagil

## 🎨 Cores

### Paleta Principal

| Nome | Hex | Uso |
|------|-----|-----|
| **Brand Primary** | `#0F4C81` | Cor principal da marca, usada em cabeçalhos, botões primários e elementos de destaque |
| **Brand Primary Dark** | `#083457` | Variação mais escura da cor principal, usada para hover states e gradientes |
| **Brand Secondary** | `#2A7DE1` | Cor secundária, usada para acentos e elementos interativos secundários |
| **Brand Accent** | `#FF6B35` | Cor de destaque, usada para call-to-actions e elementos que precisam chamar atenção |
| **Brand Accent Alt** | `#38B2AC` | Cor de destaque alternativa, usada para elementos de sucesso e confirmação |

### Tons Neutros

| Nome | Hex | Uso |
|------|-----|-----|
| **Brand Text Primary** | `#1A202C` | Texto principal, alta legibilidade |
| **Brand Text Secondary** | `#4A5568` | Texto secundário, parágrafos e descrições |
| **Brand Text Tertiary** | `#718096` | Texto terciário, informações menos importantes |
| **Brand Background** | `#F7FAFC` | Fundo principal do site |
| **Brand Background Alt** | `#EDF2F7` | Fundo alternativo para cards e seções |
| **Brand Border** | `#E2E8F0` | Bordas e separadores |

### Cores de Estado

| Nome | Hex | Uso |
|------|-----|-----|
| **Success** | `#38A169` | Mensagens de sucesso, confirmações |
| **Warning** | `#DD6B20` | Alertas, avisos |
| **Error** | `#E53E3E` | Erros, problemas críticos |
| **Info** | `#3182CE` | Informações, dicas |

## 🖋️ Tipografia

### Fontes

| Família | Uso | Importação |
|---------|-----|------------|
| **Inter** | Principal, UI, texto | `import '@fontsource/inter/400.css';`<br>`import '@fontsource/inter/500.css';`<br>`import '@fontsource/inter/600.css';`<br>`import '@fontsource/inter/700.css';` |
| **Montserrat** | Títulos, cabeçalhos | `import '@fontsource/montserrat/700.css';`<br>`import '@fontsource/montserrat/800.css';` |

### Hierarquia

| Elemento | Tamanho | Peso | Família | Classe Tailwind |
|----------|---------|------|---------|-----------------|
| H1 | 2.5rem (40px) | 800 | Montserrat | `text-4xl font-extrabold` |
| H2 | 2rem (32px) | 700 | Montserrat | `text-3xl font-bold` |
| H3 | 1.5rem (24px) | 700 | Montserrat | `text-2xl font-bold` |
| H4 | 1.25rem (20px) | 600 | Inter | `text-xl font-semibold` |
| H5 | 1.125rem (18px) | 600 | Inter | `text-lg font-semibold` |
| H6 | 1rem (16px) | 600 | Inter | `text-base font-semibold` |
| Body | 1rem (16px) | 400 | Inter | `text-base` |
| Body Small | 0.875rem (14px) | 400 | Inter | `text-sm` |
| Caption | 0.75rem (12px) | 400 | Inter | `text-xs` |

### Espaçamento de Linha

| Elemento | Line Height | Classe Tailwind |
|----------|-------------|-----------------|
| Headings | 1.2 | `leading-tight` |
| Body | 1.5 | `leading-relaxed` |
| Small Text | 1.4 | `leading-normal` |

## 🧩 Componentes

### Botões

#### Variantes

| Variante | Uso | Estilo |
|----------|-----|--------|
| **Primary** | Ações principais | Fundo `brand-primary`, texto branco, hover `brand-primary-dark` |
| **Secondary** | Ações secundárias | Fundo `brand-secondary`, texto branco, hover mais escuro |
| **Outline** | Ações terciárias | Borda `brand-primary`, texto `brand-primary`, hover fundo claro |
| **Ghost** | Ações sutis | Sem borda, texto `brand-primary`, hover fundo muito claro |

#### Tamanhos

| Tamanho | Padding | Texto | Classe |
|---------|---------|-------|--------|
| **Small** | `px-3 py-1.5` | `text-sm` | `size="sm"` |
| **Medium** | `px-4 py-2` | `text-base` | `size="md"` (padrão) |
| **Large** | `px-6 py-3` | `text-lg` | `size="lg"` |

#### Estados

- **Normal**: Estilo base
- **Hover**: Mudança de cor/opacidade
- **Focus**: Anel de foco acessível
- **Active**: Ligeiramente mais escuro/transformado
- **Disabled**: Opacidade reduzida, cursor não permitido
- **Loading**: Spinner, opacidade reduzida

### Cards

#### Variantes

| Variante | Uso | Estilo |
|----------|-----|--------|
| **Basic** | Conteúdo simples | Fundo branco, sombra leve, borda arredondada |
| **Interactive** | Cards clicáveis | Como Basic + hover effect (sombra maior, leve transformação) |
| **Featured** | Conteúdo destacado | Como Basic + borda colorida ou acento visual |

#### Anatomia

- **Container**: `rounded-lg shadow-md bg-white overflow-hidden`
- **Image Container**: `w-full h-48 overflow-hidden`
- **Content Padding**: `p-6`
- **Title**: `text-xl font-semibold text-brand-primary mb-2`
- **Description**: `text-brand-text-secondary mb-4`
- **Footer**: `mt-auto pt-4 border-t border-brand-border`

### Formulários

#### Inputs

| Elemento | Estilo Base | Estilo Focus | Estilo Error |
|----------|-------------|--------------|--------------|
| **Text Input** | `w-full px-4 py-2 border border-brand-border rounded-md` | `+ ring-2 ring-brand-primary/20 border-brand-primary` | `border-error ring-error/20` |
| **Select** | Como Text Input + ícone de seta | Como Text Input | Como Text Input |
| **Checkbox** | `h-4 w-4 rounded border-brand-border` | `ring-2 ring-brand-primary/20` | `border-error` |
| **Radio** | `h-4 w-4 rounded-full border-brand-border` | Como Checkbox | Como Checkbox |
| **Textarea** | Como Text Input + `min-h-[100px]` | Como Text Input | Como Text Input |

#### Labels

- **Default**: `block text-sm font-medium text-brand-text-secondary mb-1`
- **Required**: Adicionar `<span className="text-error">*</span>`
- **Error**: `text-error`

#### Mensagens

- **Helper**: `mt-1 text-xs text-brand-text-tertiary`
- **Error**: `mt-1 text-xs text-error`
- **Success**: `mt-1 text-xs text-success`

## 📱 Responsividade

### Breakpoints

| Nome | Tamanho | Classe Tailwind |
|------|---------|-----------------|
| **Mobile** | < 640px | (padrão) |
| **Small** | ≥ 640px | `sm:` |
| **Medium** | ≥ 768px | `md:` |
| **Large** | ≥ 1024px | `lg:` |
| **Extra Large** | ≥ 1280px | `xl:` |
| **2XL** | ≥ 1536px | `2xl:` |

### Containers

- **Default**: `container mx-auto px-4 sm:px-6 lg:px-8`
- **Narrow**: `max-w-3xl mx-auto px-4 sm:px-6`
- **Wide**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Grids

- **1 Coluna (Mobile)**: `grid grid-cols-1 gap-6`
- **2 Colunas (Tablet+)**: `grid grid-cols-1 md:grid-cols-2 gap-6`
- **3 Colunas (Desktop)**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **4 Colunas (Large Desktop)**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`

### Tipografia Responsiva

- **H1**: `text-3xl md:text-4xl lg:text-5xl`
- **H2**: `text-2xl md:text-3xl lg:text-4xl`
- **H3**: `text-xl md:text-2xl lg:text-3xl`
- **Body**: `text-base`

## 🖼️ Imagens e Ícones

### Imagens

- **Aspect Ratios**:
  - 16:9 (Paisagem): `aspect-video`
  - 4:3 (Paisagem): `aspect-4/3`
  - 1:1 (Quadrado): `aspect-square`
  - 3:4 (Retrato): `aspect-3/4`
  
- **Tratamento**:
  - Arredondamento: `rounded-md` (padrão), `rounded-full` (avatares)
  - Sombra: `shadow-md` (opcional)
  - Objeto: `object-cover` (padrão), `object-contain` (preservar proporção)

### Ícones

- **Biblioteca**: Lucide Icons
- **Tamanhos**:
  - Small: `size={16}`
  - Medium: `size={20}` (padrão)
  - Large: `size={24}`
  - Extra Large: `size={32}`
  
- **Cores**:
  - Primary: `className="text-brand-primary"`
  - Secondary: `className="text-brand-text-secondary"`
  - Accent: `className="text-brand-accent"`

## 🎭 Animações e Transições

### Transições

| Elemento | Duração | Timing | Propriedades |
|----------|---------|--------|--------------|
| **Botões** | 150ms | ease-in-out | background, transform, shadow |
| **Links** | 100ms | ease | color |
| **Cards** | 200ms | ease-out | transform, shadow |
| **Modals** | 300ms | ease-in-out | opacity, transform |
| **Menus** | 200ms | ease | opacity, transform |

### Animações

- **Fade In**: `animate-fade-in` (`opacity-0` → `opacity-100` em 300ms)
- **Slide Up**: `animate-slide-up` (transform: `translateY(10px)` → `translateY(0)` em 300ms)
- **Pulse**: `animate-pulse` (para estados de loading)
- **Bounce**: `animate-bounce` (para chamar atenção)
- **Spin**: `animate-spin` (para loaders circulares)

## 📏 Espaçamento

### Sistema de Espaçamento

| Tamanho | Valor | Classe Tailwind | Uso |
|---------|-------|-----------------|-----|
| **2XS** | 0.25rem (4px) | `p-1`, `m-1` | Espaçamento mínimo |
| **XS** | 0.5rem (8px) | `p-2`, `m-2` | Espaçamento pequeno |
| **SM** | 1rem (16px) | `p-4`, `m-4` | Espaçamento padrão |
| **MD** | 1.5rem (24px) | `p-6`, `m-6` | Espaçamento médio |
| **LG** | 2rem (32px) | `p-8`, `m-8` | Espaçamento grande |
| **XL** | 3rem (48px) | `p-12`, `m-12` | Espaçamento extra grande |
| **2XL** | 4rem (64px) | `p-16`, `m-16` | Espaçamento máximo |

### Seções

- **Padding Vertical**: `py-12 md:py-16 lg:py-20`
- **Margin Bottom**: `mb-8 md:mb-12 lg:mb-16`
- **Gap entre Elementos**: `gap-6 md:gap-8`

## 🌗 Modo Escuro (Futuro)

### Cores - Modo Escuro

| Nome | Hex (Light) | Hex (Dark) | Classe Tailwind |
|------|-------------|------------|-----------------|
| **Brand Background** | `#F7FAFC` | `#1A202C` | `bg-brand-background dark:bg-gray-900` |
| **Brand Text Primary** | `#1A202C` | `#F7FAFC` | `text-brand-text-primary dark:text-white` |
| **Brand Border** | `#E2E8F0` | `#2D3748` | `border-brand-border dark:border-gray-700` |

### Implementação

```jsx
// Exemplo de componente com suporte a modo escuro
<div className="bg-white dark:bg-gray-800 text-brand-text-primary dark:text-white">
  <h2 className="text-brand-primary dark:text-brand-secondary">Título</h2>
  <p className="text-brand-text-secondary dark:text-gray-300">Conteúdo</p>
</div>
```

## 🧠 Boas Práticas

### Consistência

- Usar sempre os tokens de design definidos neste guia
- Evitar valores arbitrários de cores, tamanhos ou espaçamentos
- Manter a hierarquia visual consistente em todas as páginas

### Acessibilidade

- Garantir contraste adequado (WCAG AA no mínimo)
- Incluir estados de foco visíveis para todos os elementos interativos
- Usar semântica HTML apropriada
- Incluir atributos ARIA quando necessário

### Performance

- Otimizar imagens (WebP, dimensões apropriadas)
- Lazy load para imagens abaixo da dobra