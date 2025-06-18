### ServiceCategory (Categoria de Serviço)

```typescript
interface ServiceCategory {
  id: string; // UUID
  title: string; // Nome da categoria
  description: string; // Descrição da categoria
  slug: string; // URL amigável (ex: "marketing-digital")
  icon_name: string; // Nome do ícone Lucide
  order: number; // Ordem de exibição
  is_active: boolean; // Status da categoria
  created_at: string; // Data de criação
  updated_at: string; // Data de atualização
}
```

### PortfolioItem (Item de Portfólio)

```typescript
interface PortfolioItem {
  id: string; // UUID
  title: string; // Título do projeto
  description: string; // Descrição do projeto
  category: string; // Categoria do projeto (ex: "Website", "Branding")
  image_url: string; // URL da imagem principal
  gallery_images: string[]; // Array de URLs de imagens adicionais
  client_name: string; // Nome do cliente
  completion_date: string; // Data de conclusão
  link: string | null; // Link para o projeto (opcional)
  testimonial_id: string | null; // ID do depoimento relacionado (opcional)
  is_featured: boolean; // Destaque na home
  is_active: boolean; // Status do item
  created_at: string; // Data de criação
  updated_at: string; // Data de atualização
}
```

### Testimonial (Depoimento)

```typescript
interface Testimonial {
  id: string; // UUID
  client_name: string; // Nome do cliente
  client_title: string; // Cargo/Empresa do cliente
  content: string; // Texto do depoimento
  rating: number; // Avaliação (1-5)
  avatar_url: string | null; // URL da foto do cliente (opcional)
  portfolio_item_id: string | null; // ID do projeto relacionado (opcional)
  is_featured: boolean; // Destaque na home
  is_active: boolean; // Status do depoimento
  created_at: string; // Data de criação
  updated_at: string; // Data de atualização
}
```

### Contact (Contato)

```typescript
interface Contact {
  id: string; // UUID
  name: string; // Nome completo
  email: string; // Email
  phone: string | null; // Telefone (opcional)
  company: string | null; // Empresa (opcional)
  message: string; // Mensagem
  service_interest: string[]; // Array de IDs de serviços de interesse
  status: 'new' | 'contacted' | 'in_progress' | 'closed'; // Status do contato
  notes: string | null; // Notas internas (opcional)
  created_at: string; // Data de criação
  updated_at: string; // Data de atualização
}
```

### BlogPost (Post do Blog)

```typescript
interface BlogPost {
  id: string; // UUID
  title: string; // Título do post
  slug: string; // URL amigável
  excerpt: string; // Resumo curto
  content: string; // Conteúdo completo (Markdown)
  featured_image_url: string; // URL da imagem destacada
  author_id: string; // ID do autor
  category_id: string; // ID da categoria
  tags: string[]; // Array de tags
  published_at: string | null; // Data de publicação (null = rascunho)
  is_featured: boolean; // Destaque na home
  meta_title: string | null; // Título para SEO (opcional)
  meta_description: string | null; // Descrição para SEO (opcional)
  created_at: string; // Data de criação
  updated_at: string; // Data de atualização
}
```

### BlogCategory (Categoria do Blog)

```typescript
interface BlogCategory {
  id: string; // UUID
  name: string; // Nome da categoria
  slug: string; // URL amigável
  description: string | null; // Descrição (opcional)
  created_at: string; // Data de criação
  updated_at: string; // Data de atualização
}
```

### Author (Autor)

```typescript
interface Author {
  id: string; // UUID
  name: string; // Nome completo
  bio: string | null; // Biografia (opcional)
  avatar_url: string | null; // URL da foto (opcional)
  email: string; // Email
  social_links: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  } | null; // Links sociais (opcional)
  created_at: string; // Data de criação
  updated_at: string; // Data de atualização
}
```

### SiteConfig (Configurações do Site)

```typescript
interface SiteConfig {
  id: string; // UUID (sempre será apenas um registro)
  site_name: string; // Nome do site
  site_description: string; // Descrição do site
  contact_email: string; // Email de contato
  contact_phone: string; // Telefone de contato
  address: string | null; // Endereço (opcional)
  social_links: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  }; // Links de redes sociais
  google_analytics_id: string | null; // ID do Google Analytics (opcional)
  meta_title: string; // Título padrão para SEO
  meta_description: string; // Descrição padrão para SEO
  logo_url: string; // URL do logo principal
  favicon_url: string; // URL do favicon
  primary_color: string; // Cor primária (#HEX)
  secondary_color: string; // Cor secundária (#HEX)
  updated_at: string; // Data de atualização
}
```

## 🔄 Relacionamentos

### Relacionamentos Diretos

- `Service` pertence a uma `ServiceCategory` (via `category_id`)
- `PortfolioItem` pode ter um `Testimonial` relacionado (via `testimonial_id`)
- `Testimonial` pode estar relacionado a um `PortfolioItem` (via `portfolio_item_id`)
- `BlogPost` pertence a um `Author` (via `author_id`)
- `BlogPost` pertence a uma `BlogCategory` (via `category_id`)

### Relacionamentos Indiretos

- `Contact` pode ter interesse em múltiplos `Service` (via array `service_interest`)
- `BlogPost` pode ter múltiplas tags (via array `tags`)

## 📝 Mapeamento para Frontend

No frontend, estas interfaces são adaptadas para uso nos componentes React:

```typescript
// Exemplo de adaptação para o frontend
export interface Service {
  id: string;
  title: string;
  shortDescription: string; // Convertido de snake_case para camelCase
  longDescription: string;
  iconName: string;
  categoryId: string;
  isActive: boolean;
  createdAt: Date; // Convertido de string para Date
  updatedAt: Date;
}
```

## 🔐 Políticas de Segurança (RLS)

### Políticas de Leitura

- `Service`, `ServiceCategory`, `PortfolioItem`, `Testimonial`, `BlogPost`, `BlogCategory`, `Author`: Leitura pública
- `Contact`, `SiteConfig`: Leitura apenas para usuários autenticados com role 'admin'

### Políticas de Escrita

- `Contact`: Inserção pública (para o formulário de contato)
- `Service`, `ServiceCategory`, `PortfolioItem`, `Testimonial`, `BlogPost`, `BlogCategory`, `Author`, `SiteConfig`: Escrita apenas para usuários autenticados com role 'admin'

## 🔄 Funções e Gatilhos

### Funções

- `format_slug(text)`: Formata um texto para um slug URL-friendly
- `notify_new_contact()`: Envia notificação por email quando um novo contato é criado

### Gatilhos

- `before_insert_blog_post`: Gera automaticamente o slug a partir do título
- `before_insert_service_category`: Gera automaticamente o slug a partir do título
- `after_insert_contact`: Chama a função `notify_new_contact()`

## 📊 Consultas Comuns

### Obter Serviços por Categoria

```sql
SELECT s.*
FROM services s
JOIN service_categories sc ON s.category_id = sc.id
WHERE sc.slug = :categorySlug AND s.is_active = true
ORDER BY s.title;
```

### Obter Itens de Portfólio em Destaque

```sql
SELECT *
FROM portfolio_items
WHERE is_featured = true AND is_active = true
ORDER BY completion_date DESC
LIMIT 6;
```

### Obter Posts do Blog Publicados

```sql
SELECT bp.*, bc.name as category_name, a.name as author_name, a.avatar_url as author_avatar
FROM blog_posts bp
JOIN blog_categories bc ON bp.category_id = bc.id
JOIN authors a ON bp.author_id = a.id
WHERE bp.published_at IS NOT NULL AND bp.published_at <= NOW()
ORDER BY bp.published_at DESC
LIMIT :limit OFFSET :offset;
```

## 🧪 Dados de Teste

Para desenvolvimento, o banco de dados é populado com dados de teste:

- 3 categorias de serviço
- 9 serviços (3 por categoria)
- 6 itens de portfólio
- 4 depoimentos
- 2 autores
- 3 categorias de blog
- 8 posts de blog

## 📝 Notas de Implementação

1. Todos os IDs são UUIDs gerados pelo Supabase
2. Timestamps (`created_at`, `updated_at`) são gerenciados automaticamente
3. Imagens são armazenadas no Supabase Storage e referenciadas por URL
4. Conteúdo longo (como `content` em BlogPost) é armazenado em formato Markdown
5. Campos booleanos como `is_active` permitem desativar registros sem excluí-los