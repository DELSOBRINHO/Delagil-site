# Esquemas do Banco de Dados Supabase - Delagil Site

## 📊 Visão Geral

Este documento detalha a estrutura do banco de dados PostgreSQL no Supabase, incluindo tabelas, colunas, relacionamentos, políticas de segurança e funções.

## 🗃️ Tabelas

### services

Armazena informações sobre os serviços oferecidos pela Delagil.

```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES service_categories(id),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_services_category ON services(category_id);
CREATE INDEX idx_services_active ON services(is_active);
```

### service_categories

Categorias para agrupar os serviços.

```sql
CREATE TABLE service_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon_name TEXT NOT NULL,
  order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_service_categories_slug ON service_categories(slug);
CREATE INDEX idx_service_categories_active ON service_categories(is_active);
```

### portfolio_items

Projetos realizados para exibição no portfólio.

```sql
CREATE TABLE portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery_images TEXT[] DEFAULT '{}',
  client_name TEXT NOT NULL,
  completion_date DATE NOT NULL,
  link TEXT,
  testimonial_id UUID REFERENCES testimonials(id),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_portfolio_items_featured ON portfolio_items(is_featured) WHERE is_featured = true;
CREATE INDEX idx_portfolio_items_active ON portfolio_items(is_active);
CREATE INDEX idx_portfolio_items_category ON portfolio_items(category);
```

### testimonials

Depoimentos de clientes.

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  client_title TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  avatar_url TEXT,
  portfolio_item_id UUID REFERENCES portfolio_items(id),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured) WHERE is_featured = true;
CREATE INDEX idx_testimonials_active ON testimonials(is_active);
```

### contacts

Mensagens enviadas através do formulário de contato.

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  service_interest UUID[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'closed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created_at ON contacts(created_at);
```

### blog_posts

Artigos do blog.

```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT NOT NULL,
  author_id UUID NOT NULL REFERENCES authors(id),
  category_id UUID NOT NULL REFERENCES blog_categories(id),
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at) WHERE published_at IS NOT NULL;
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = true;
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
```

### blog_categories

Categorias para os artigos do blog.

```sql
CREATE TABLE blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);
```

### authors

Autores dos artigos do blog.

```sql
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  email TEXT NOT NULL UNIQUE,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_authors_email ON authors(email);
```

### site_config

Configurações gerais do site (registro único).

```sql
CREATE TABLE site_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL,
  site_description TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  address TEXT,
  social_links JSONB NOT NULL DEFAULT '{}',
  google_analytics_id TEXT,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  favicon_url TEXT NOT NULL,
  primary_color TEXT NOT NULL,
  secondary_color TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = '00000000-0000-0000-0000-000000000000')
);
```

## 🔄 Relacionamentos

### Diagrama ER

```
service_categories 1──* services
authors 1──* blog_posts
blog_categories 1──* blog_posts
testimonials 0..1──0..1 portfolio_items
```

### Detalhamento

- Um `service` pertence a uma `service_category` (via `category_id`)
- Um `blog_post` pertence a um `author` (via `author_id`)
- Um `blog_post` pertence a uma `blog_category` (via `category_id`)
- Um `portfolio_item` pode ter um `testimonial` relacionado (via `testimonial_id`)
- Um `testimonial` pode estar relacionado a um `portfolio_item` (via `portfolio_item_id`)
- Um `contact` pode ter interesse em múltiplos `services` (via array `service_interest`)

## 🔄 Funções e Gatilhos

### Função para Formatação de Slug

```sql
CREATE OR REPLACE FUNCTION format_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        REGEXP_REPLACE(input_text, '[^a-zA-Z0-9\s]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;
```

### Gatilho para Geração Automática de Slug em Blog Posts

```sql
CREATE OR REPLACE FUNCTION generate_blog_post_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := format_slug(NEW.title);
  END IF;
  
  -- Verifica se o slug já existe e adiciona um sufixo numérico se necessário
  DECLARE
    base_slug TEXT := NEW.slug;
    counter INTEGER := 1;
    temp_slug TEXT := base_slug;
  BEGIN
    WHILE EXISTS (SELECT 1 FROM blog_posts WHERE slug = temp_slug AND id != NEW.id) LOOP
      temp_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;
    NEW.slug := temp_slug;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_blog_post
BEFORE INSERT OR UPDATE ON blog_posts
FOR EACH ROW EXECUTE PROCEDURE generate_blog_post_slug();
```

### Gatilho para Geração Automática de Slug em Categorias de Serviço

```sql
CREATE OR REPLACE FUNCTION generate_service_category_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := format_slug(NEW.title);
  END IF;
  
  -- Verifica se o slug já existe e adiciona um sufixo numérico se necessário
  DECLARE
    base_slug TEXT := NEW.slug;
    counter INTEGER := 1;
    temp_slug TEXT := base_slug;
  BEGIN
    WHILE EXISTS (SELECT 1 FROM service_categories WHERE slug = temp_slug AND id != NEW.id) LOOP
      temp_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;
    NEW.slug := temp_slug;
  END;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_service_category
BEFORE INSERT OR UPDATE ON service_categories
FOR EACH ROW EXECUTE PROCEDURE generate_service_category_slug();
```

### Função para Notificação de Novos Contatos

```sql
CREATE OR REPLACE FUNCTION notify_new_contact()
RETURNS TRIGGER AS $$
BEGIN
  -- Esta função enviaria um email de notificação
  -- Na implementação real, usaríamos pg_notify ou uma Edge Function
  PERFORM pg_notify('new_contact', json_build_object(
    'id', NEW.id,
    'name', NEW.name,
    'email', NEW.email,
    'created_at', NEW.created_at
  )::text);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_insert_contact
AFTER INSERT ON contacts
FOR EACH ROW EXECUTE PROCEDURE notify_new_contact();
```

### Função para Atualização Automática do Timestamp

```sql
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a todos as tabelas que têm updated_at
CREATE TRIGGER update_services_timestamp
BEFORE UPDATE ON services
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- Repetir para todas as outras tabelas
```

## 🔐 Políticas de Segurança (RLS)

### Políticas para Tabela services

```sql
-- Habilitar RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública
CREATE POLICY services_select_policy ON services
  FOR SELECT USING (is_active = true);

-- Política de escrita apenas para admins
CREATE POLICY services_insert_policy ON services
  FOR INSERT WITH CHECK (auth.role() = 'admin');

CREATE POLICY services_update_policy ON services
  FOR UPDATE USING (auth.role() = 'admin');

CREATE POLICY services_delete_policy ON services
  FOR DELETE USING (auth.role() = 'admin');
```

### Políticas para Tabela contacts

```sql
-- Habilitar RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Qualquer pessoa pode criar um contato
CREATE POLICY contacts_insert_policy ON contacts
  FOR INSERT WITH CHECK (true);

-- Apenas admins podem ler, atualizar ou excluir
CREATE POLICY contacts_select_policy ON contacts
  FOR SELECT USING (auth.role() = 'admin');

CREATE POLICY contacts_update_policy ON contacts
  FOR UPDATE USING (auth.role() = 'admin');

CREATE POLICY contacts_delete_policy ON contacts
  FOR DELETE USING (auth.role() = 'admin');
```

### Políticas para Tabela site_config

```sql
-- Habilitar RLS
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Leitura pública
CREATE POLICY site_config_select_policy ON site_config
  FOR SELECT USING (true);

-- Apenas admins podem atualizar
CREATE POLICY site_config_update_policy ON site_config
  FOR UPDATE USING (auth.role() = 'admin');

-- Ninguém pode inserir ou excluir (registro único)
```

## 📁 Armazenamento (Storage)

### Buckets

```sql
-- Bucket para imagens de portfólio
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio', 'Portfolio Images', true);

-- Bucket para imagens do blog
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog', 'Blog Images', true);

-- Bucket para avatares
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'User Avatars', true);

-- Bucket para recursos gerais do site
INSERT INTO storage.buckets (id, name, public)
VALUES ('site', 'Site Resources', true);
```

### Políticas de Storage

````sql
-- Políticas para bucket de portfólio
CREATE POLICY "Portfolio images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio');

CREATE POLICY "Only admins can upload portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'admin');

-- Políticas para bucket de blog
CREATE POLICY "Blog images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog');

CREATE POLICY "Only admins can upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog' AND auth.role() = 'admin');

-- Políticas para bucket de avatares
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Only admins can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'admin');

-- Políticas para bucket de recursos do site
CREATE POLICY "Site resources are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'site');

CREATE POLICY "Only admins can upload site resources"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'site' AND auth.role() = 'admin');
````

## 🔄 Funções de API (Edge Functions)

### Função para Envio de Email de Contato

```typescript
// /functions/send-contact-email/index.ts
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }
  
  try {
    const { name, email, phone, company, message, serviceInterest } = await req.json();
    
    // Validação básica
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Configuração do cliente SMTP
    const client = new SmtpClient();
    await client.connect({
      hostname: Deno.env.get('SMTP_HOST') || '',
      port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
      username: Deno.env.get('SMTP_USER') || '',
      password: Deno.env.get('SMTP_PASSWORD') || '',
    });
    
    // Envio do email
    await client.send({
      from: Deno.env.get('EMAIL_FROM') || '',
      to: Deno.env.get('EMAIL_TO') || '',
      subject: `Novo contato do site: ${name}`,
      content: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone || 'Não informado'}
        Empresa: ${company || 'Não informada'}
        Serviços de interesse: ${serviceInterest?.join(', ') || 'Não informados'}
        
        Mensagem:
        ${message}
      `,
    });
    
    await client.close();
    
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

### Função para Geração de Sitemap

```typescript
// /functions/generate-sitemap/index.ts
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Buscar URLs dinâmicas do banco de dados
    const [
      { data: services },
      { data: serviceCategories },
      { data: blogPosts },
      { data: blogCategories }
    ] = await Promise.all([
      supabase.from('services').select('id').eq('is_active', true),
      supabase.from('service_categories').select('slug').eq('is_active', true),
      supabase.from('blog_posts').select('slug').not('published_at', 'is', null),
      supabase.from('blog_categories').select('slug')
    ]);
    
    // URLs estáticas
    const staticUrls = [
      'https://www.delagil.com.br/',
      'https://www.delagil.com.br/sobre',
      'https://www.delagil.com.br/servicos',
      'https://www.delagil.com.br/portfolio',
      'https://www.delagil.com.br/blog',
      'https://www.delagil.com.br/contato',
    ];
    
    // URLs dinâmicas
    const dynamicUrls = [
      // Categorias de serviço
      ...(serviceCategories || []).map(cat => 
        `https://www.delagil.com.br/servicos/${cat.slug}`
      ),
      // Posts do blog
      ...(blogPosts || []).map(post => 
        `https://www.delagil.com.br/blog/${post.slug}`
      ),
      // Categorias do blog
      ...(blogCategories || []).map(cat => 
        `https://www.delagil.com.br/blog/categoria/${cat.slug}`
      ),
    ];
    
    // Combinar todas as URLs
    const allUrls = [...staticUrls, ...dynamicUrls];
    
    // Gerar XML do sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
</urlset>`;
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    return new Response('Error generating sitemap', { status: 500 });
  }
});
```

## 📊 Consultas SQL Úteis

### Obter Serviços com Categoria

```sql
SELECT 
  s.id,
  s.title,
  s.short_description,
  s.long_description,
  s.icon_name,
  s.is_active,
  sc.id as category_id,
  sc.title as category_title,
  sc.slug as category_slug
FROM services s
JOIN service_categories sc ON s.category_id = sc.id
WHERE s.is_active = true AND sc.is_active = true
ORDER BY sc.order, s.title;
```

### Obter Posts do Blog com Autor e Categoria

```sql
SELECT 
  bp.id,
  bp.title,
  bp.slug,
  bp.excerpt,
  bp.featured_image_url,
  bp.published_at,
  bp.is_featured,
  a.name as author_name,
  a.avatar_url as author_avatar,
  bc.name as category_name,
  bc.slug as category_slug
FROM blog_posts bp
JOIN authors a ON bp.author_id = a.id
JOIN blog_categories bc ON bp.category_id = bc.id
WHERE bp.published_at IS NOT NULL AND bp.published_at <= NOW()
ORDER BY bp.published_at DESC
LIMIT 10;
```

### Obter Itens de Portfólio com Depoimentos

```sql
SELECT 
  pi.id,
  pi.title,
  pi.description,
  pi.category,
  pi.image_url,
  pi.gallery_images,
  pi.client_name,
  pi.completion_date,
  pi.link,
  pi.is_featured,
  t.id as testimonial_id,
  t.client_name as testimonial_client_name,
  t.content as testimonial_content,
  t.rating as testimonial_rating
FROM portfolio_items pi
LEFT JOIN testimonials t ON pi.testimonial_id = t.id
WHERE pi.is_active = true
ORDER BY pi.is_featured DESC, pi.completion_date DESC;
```

### Estatísticas de Contato

```sql
SELECT 
  status,
  COUNT(*) as count,
  MIN(created_at) as oldest,
  MAX(created_at) as newest
FROM contacts
GROUP BY status
ORDER BY 
  CASE 
    WHEN status = 'new' THEN 1
    WHEN status = 'contacted' THEN 2
    WHEN status = 'in_progress' THEN 3
    WHEN status = 'closed' THEN 4
    ELSE 5
  END;
```

## 🔄 Migrações

As migrações são gerenciadas pelo Supabase CLI. Abaixo está um exemplo de como criar uma nova migração:

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Iniciar projeto local
supabase init

# Criar nova migração
supabase migration new add_view_count_to_blog_posts

# Editar o arquivo de migração criado
# Por exemplo: supabase/migrations/20230601120000_add_view_count_to_blog_posts.sql
```

Exemplo de arquivo de migração:

```sql
-- Adicionar coluna de contagem de visualizações aos posts do blog
ALTER TABLE blog_posts ADD COLUMN view_count INTEGER NOT NULL DEFAULT 0;

-- Criar índice para ordenação por popularidade
CREATE INDEX idx_blog_posts_views ON blog_posts(view_count DESC);

-- Criar função para incrementar visualizações
CREATE OR REPLACE FUNCTION increment_blog_post_view(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;
```

## 🔄 Backup e Restauração

### Backup Manual

```bash
# Backup completo do banco
pg_dump -h db.YOUR_PROJECT_REF.supabase.co -p 5432 -U postgres -d postgres -F c -b -v -f backup.dump

# Backup apenas de dados
pg_dump -h db.YOUR_PROJECT_REF.supabase.co -p 5432 -U postgres -d postgres --data-only -F c -b -v -f data_backup.dump
```

### Restauração

```bash
# Restaurar backup completo
pg_restore -h db.YOUR_PROJECT_REF.supabase.co -p 5432 -U postgres -d postgres -v backup.dump

# Restaurar apenas dados
pg_restore -h db.YOUR_PROJECT_REF.supabase.co -p 5432 -U postgres -d postgres --data-only -v data_backup.dump
```

## 📝 Notas de Implementação

1. **Segurança**: Todas as tabelas têm RLS (Row Level Security) habilitado
2. **Auditoria**: Timestamps automáticos para rastreamento de criação/atualização
3. **Performance**: Índices criados para consultas comuns
4. **Integridade**: Restrições de chave estrangeira para garantir relacionamentos válidos
5. **Flexibilidade**: Uso de JSONB para campos com estrutura flexível (como social_links)
```