# Integração com Supabase - Delagil Site

## 🔄 Visão Geral

Este documento detalha como a aplicação se integra com o Supabase, incluindo configuração, autenticação, acesso a dados e armazenamento de arquivos.

## ⚙️ Configuração Inicial

### 📝 Variáveis de Ambiente

As credenciais do Supabase são armazenadas em variáveis de ambiente:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 🔄 Cliente Supabase

O cliente Supabase é inicializado em `src/lib/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be defined in environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
```

### 📝 Tipos Gerados

Os tipos TypeScript são gerados a partir do esquema do banco de dados:

```bash
npx supabase gen types typescript --project-id your-project-id --schema public > src/lib/supabase/types.ts
```

Exemplo de tipos gerados:

```typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          title: string
          short_description: string
          long_description: string
          icon_name: string
          category_id: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          short_description: string
          long_description: string
          icon_name: string
          category_id: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          short_description?: string
          long_description?: string
          icon_name?: string
          category_id?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      // Outras tabelas...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
```

## 🔐 Autenticação

### 🔄 Contexto de Autenticação

O estado de autenticação é gerenciado através de um contexto React:

```typescript
// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Obter sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      console.error('Login error:', err);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer logout');
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signOut, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

### 🔒 Proteção de Rotas

Componente para proteger rotas que requerem autenticação:

```typescript
// src/components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar se o usuário é admin quando necessário
  if (adminOnly && user.app_metadata?.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
```

## 📊 Acesso a Dados

### 🔄 Serviços de Dados

Os serviços encapsulam a lógica de acesso ao Supabase:

```typescript
// src/services/serviceService.ts
import { supabase } from '@/lib/supabase/client';
import type { Service, ServiceCategory } from '@/types';

export async function getServiceCategories(): Promise<ServiceCategory[]> {
  const { data, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('is_active', true)
    .order('order');

  if (error) {
    console.error('Error fetching service categories:', error);
    throw new Error('Failed to fetch service categories');
  }

  return data.map(category => ({
    id: category.id,
    title: category.title,
    description: category.description,
    slug: category.slug,
    iconName: category.icon_name,
    isActive: category.is_active,
    order: category.order,
    createdAt: new Date(category.created_at),
    updatedAt: new Date(category.updated_at),
  }));
}

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*, service_categories(title, slug)')
    .eq('is_active', true)
    .order('title');

  if (error) {
    console.error('Error fetching services:', error);
    throw new Error('Failed to fetch services');
  }

  return data.map(service => ({
    id: service.id,
    title: service.title,
    shortDescription: service.short_description,
    longDescription: service.long_description,
    iconName: service.icon_name,
    categoryId: service.category_id,
    category: {
      title: service.service_categories?.title || '',
      slug: service.service_categories?.slug || '',
    },
    isActive: service.is_active,
    createdAt: new Date(service.created_at),
    updatedAt: new Date(service.updated_at),
  }));
}

export async function getServicesByCategorySlug(slug: string): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*, service_categories!inner(title, slug)')
    .eq('service_categories.slug', slug)
    .eq('is_active', true)
    .order('title');

  if (error) {
    console.error(`Error fetching services for category ${slug}:`, error);
    throw new Error(`Failed to fetch services for category ${slug}`);
  }

  return data.map(service => ({
    id: service.id,
    title: service.title,
    shortDescription: service.short_description,
    longDescription: service.long_description,
    iconName: service.icon_name,
    categoryId: service.category_id,
    category: {
      title: service.service_categories?.title || '',
      slug: service.service_categories?.slug || '',
    },
    isActive: service.is_active,
    createdAt: new Date(service.created_at),
    updatedAt: new Date(service.updated_at),
  }));
}
```

### 🪝 Hooks de Dados

Hooks personalizados para consumir os serviços de dados:

```typescript
// src/hooks/useServices.ts
import { useState, useEffect } from 'react';
import { getServices, getServiceCategories, getServicesByCategorySlug } from '@/services/serviceService';
import type { Service, ServiceCategory } from '@/types';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getServices();
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch services'));
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
}

export function useServiceCategories() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getServiceCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch service categories'));
        console.error('Error fetching service categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

export function useServicesByCategory(slug: string) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchServicesByCategory = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await getServicesByCategorySlug(slug);
        setServices(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(`Failed to fetch services for category ${slug}`));
        console.error(`Error fetching services for category ${slug}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesByCategory();
  }, [slug]);

  return { services, loading, error };
}
```

### 🔄 Uso em Componentes

Exemplo de uso dos hooks em componentes:

```tsx
// src/pages/ServicesPage.tsx
import { useServiceCategories } from '@/hooks/useServices';
import { ServiceCategoryCard } from '@/components/services';

export const ServicesPage: React.FC = () => {
  const { categories, loading, error } = useServiceCategories();

  if (loading) {
    return <div className="container mx-auto px-4 py-12 text-center">Carregando categorias...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-600">
        Erro ao carregar categorias: {error.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Nossos Serviços</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(category => (
          <ServiceCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
```

## 📁 Armazenamento de Arquivos

### 📤 Upload de Arquivos

Função para upload de arquivos:

```typescript
// src/services/storageService.ts
import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export async function uploadFile(
  file: File,
  bucket: string,
  folder: string = ''
): Promise<string> {
  try {
    // Gerar nome de arquivo único
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;

    // Upload do arquivo
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Obter URL pública
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

export async function deleteFile(
  path: string,
  bucket: string
): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
}
```

### 📤 Componente de Upload de Imagem

Componente para upload de imagens com preview:

```tsx
// src/components/common/ImageUpload.tsx
import { useState } from 'react';
import { uploadFile } from '@/services/storageService';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { X, Upload } from 'lucide-react';

interface ImageUploadProps {
  bucket: string;
  folder?: string;
  onUploadComplete: (url: string) => void;
  initialImageUrl?: string;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  bucket,
  folder,
  onUploadComplete,
  initialImageUrl,
  className,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione uma imagem válida');
      return;
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      
      const url = await uploadFile(file, bucket, folder);
      
      setImageUrl(url);
      onUploadComplete(url);
    } catch (err) {
      setError('Erro ao fazer upload da imagem');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    onUploadComplete('');
  };

  return (
    <div className={`w-full ${className}`}>
      {imageUrl ? (
        <div className="relative">
          <img 
            src={imageUrl} 
            alt="Uploaded image" 
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            aria-label="Remove image"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center h-48"
          >
            {isUploading ? (
              <Spinner size="lg" />
            ) : (
              <>
                <Upload size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500">Clique para fazer upload de uma imagem</p>
                <p className="text-gray-400 text-sm mt-2">PNG, JPG ou WEBP (max. 5MB)</p>
              </>
            )}
          </label>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};
```

## 📝 Formulários

### 📝 Formulário de Contato

Exemplo de formulário que envia dados para o Supabase:

```tsx
// src/components/forms/ContactForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import type { Service } from '@/types';

interface ContactFormProps {
  availableServices?: Pick<Service, 'id' | 'title'>[];
  onSubmitSuccess?: () => void;
}

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  serviceInterest: z.array(z.string()).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactForm: React.FC<ContactFormProps> = ({
  availableServices = [],
  onSubmitSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Enviar dados para o Supabase
      const { error } = await supabase.from('contacts').insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          message: data.message,
          service_interest: data.serviceInterest || [],
          status: 'new',
        },
      ]);
      
      if (error) throw error;
      
      // Sucesso
      setSubmitSuccess(true);
      reset();
      
      // Callback opcional
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setSubmitError('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {submitSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Mensagem enviada com sucesso!</h3>
          <p className="text-green-700">Agradecemos seu contato. Retornaremos em breve.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSubmitSuccess(false);
              reset();
            }}
          >
            Enviar nova mensagem
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Nome"
                {...register('name')}
                error={errors.name?.message}
                required
              />
            </div>
            <div>
              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Telefone"
                {...register('phone')}
                error={errors.phone?.message}
              />
            </div>
            <div>
              <Input
                label="Empresa"
                {...register('company')}
                error={errors.company?.message}
              />
            </div>
          </div>
          
          {availableServices.length > 0 && (
            <div>
              <Select
                label="Serviços de interesse"
                multiple
                {...register('serviceInterest')}
                error={errors.serviceInterest?.message}
              >
                {availableServices.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.title}
                  </option>
                ))}
              </Select>
            </div>
          )}
          
          <div>
            <Textarea
              label="Mensagem"
              rows={5}
              {...register('message')}
              error={errors.message?.message}
              required
            />
          </div>
          
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700">
              {submitError}
            </div>
          )}
          
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            Enviar mensagem
          </Button>
        </form>
      )}
    </div>
  );
};
```

## 🔄 Tempo Real (Realtime)

### 🔄 Inscrição em Mudanças

Exemplo de uso da funcionalidade Realtime do Supabase:

```typescript
// src/hooks/useRealtimeData.ts
import { useState, useEffect } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';

export function useRealtimeData<T>(
  table: string,
  initialData: T[] = [],
  conditions?: { column: string; value: any }[]
) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let query = supabase.from(table).select('*');
    
    // Aplicar condições se fornecidas
    if (conditions) {
      conditions.forEach(condition => {
        query = query.eq(condition.column, condition.value);
      });
    }
    
    // Carregar dados iniciais
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: initialData, error } = await query;
        
        if (error) throw error;
        
        setData(initialData as T[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(`Failed to fetch ${table}`));
        console.error(`Error fetching ${table}:`, err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Configurar inscrição em tempo real
    let channel: RealtimeChannel;
    
    const setupSubscription = async () => {
      channel = supabase
        .channel(`public:${table}`)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table 
        }, payload => {
          const { eventType, new: newRecord, old: oldRecord } = payload;
          
          // Verificar se o registro atende às condições
          const meetsConditions = !conditions || conditions.every(
            condition => (newRecord as any)[condition.column] === condition.value
          );
          
          if (!meetsConditions) return;
          
          if (eventType === 'INSERT') {
            setData(current => [...current, newRecord as T]);
          } else if (eventType === 'UPDATE') {
            setData(current => 
              current.map(item => 
                (item as any).id === (newRecord as any).id ? newRecord as T : item
              )
            );
          } else if (eventType === 'DELETE') {
            setData(current => 
              current.filter(item => (item as any).id !== (oldRecord as any).id)
            );
          }
        })
        .subscribe();
    };
    
    setupSubscription();
    
    // Limpar inscrição
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [table, JSON.stringify(conditions)]);

  return { data, loading, error };
}
```

### 🔄 Uso em Componentes

Exemplo de uso do hook de tempo real:

```tsx
// src/pages/admin/TestimonialsPage.tsx
import { useRealtimeData } from '@/hooks/useRealtimeData';
import { TestimonialCard } from '@/components/testimonials';
import type { Testimonial } from '@/types';

export const TestimonialsPage: React.FC = () => {
  const { data: testimonials, loading, error } = useRealtimeData<Testimonial>(
    'testimonials',
    [],
    [{ column: 'is_active', value: true }]
  );

  if (loading) {
    return <div className="text-center py-12">Carregando depoimentos...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-12">Erro: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Depoimentos de Clientes</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
        
        {testimonials.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">
            Nenhum depoimento encontrado.
          </p>
        )}
      </div>
    </div>
  );
};
```

## 🔐 Segurança

### 🔒 Políticas de Segurança (RLS)

O Supabase utiliza Row Level Security (RLS) para controlar o acesso aos dados. Abaixo estão exemplos de políticas implementadas:

#### Tabela de Serviços

```sql
-- Permitir leitura pública
CREATE POLICY "Serviços podem ser lidos por todos" ON services
FOR SELECT USING (true);

-- Apenas administradores podem modificar
CREATE POLICY "Apenas administradores podem modificar serviços" ON services
FOR ALL USING (auth.role() = 'admin');
```

#### Tabela de Contatos

```sql
-- Apenas administradores podem ler contatos
CREATE POLICY "Apenas administradores podem ler contatos" ON contacts
FOR SELECT USING (auth.role() = 'admin');

-- Qualquer pessoa pode criar um contato
CREATE POLICY "Qualquer pessoa pode criar um contato" ON contacts
FOR INSERT WITH CHECK (true);

-- Apenas administradores podem atualizar contatos
CREATE POLICY "Apenas administradores podem atualizar contatos" ON contacts
FOR UPDATE USING (auth.role() = 'admin');
```

#### Armazenamento

```sql
-- Imagens públicas podem ser lidas por todos
CREATE POLICY "Imagens públicas podem ser lidas por todos" ON storage.objects
FOR SELECT USING (bucket_id = 'public');

-- Apenas administradores podem fazer upload
CREATE POLICY "Apenas administradores podem fazer upload" ON storage.objects
FOR INSERT WITH CHECK (auth.role() = 'admin');

-- Apenas administradores podem excluir arquivos
CREATE POLICY "Apenas administradores podem excluir arquivos" ON storage.objects
FOR DELETE USING (auth.role() = 'admin');
```

### 🔒 Middleware de Autenticação

Middleware para verificar autenticação em rotas da API:

```typescript
// src/middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase/client';

export async function authMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  // Obter token de autorização
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar token
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Adicionar usuário ao request
    (req as any).user = data.user;
    
    // Continuar
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Middleware para verificar se o usuário é admin
export async function adminMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  // Primeiro, verificar autenticação
  await authMiddleware(req, res, () => {
    // Verificar se o usuário é admin
    const user = (req as any).user;
    
    if (!user || user.app_metadata?.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    // Continuar
    next();
  });
}
```

## 📊 Funções e Gatilhos

### 📝 Funções SQL

Exemplo de função SQL para atualizar timestamps:

```sql
-- Função para atualizar o timestamp de atualização
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar a função como trigger
CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
```

Função para incrementar contadores de visualização:

```sql
-- Função para incrementar visualizações de blog
CREATE OR REPLACE FUNCTION increment_blog_view(post_slug TEXT)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;
```

### 📊 Edge Functions

Exemplo de Edge Function para envio de email após contato:

```typescript
// supabase/functions/send-contact-notification/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';

serve(async (req) => {
  try {
    // Verificar método
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Obter dados
    const { record } = await req.json();

    // Validar dados
    if (!record || !record.id || !record.name || !record.email || !record.message) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Configurar cliente SMTP
    const client = new SmtpClient();
    await client.connect({
      hostname: Deno.env.get('SMTP_HOST') || '',
      port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
      username: Deno.env.get('SMTP_USER') || '',
      password: Deno.env.get('SMTP_PASSWORD') || '',
    });

    // Enviar email
    await client.send({
      from: Deno.env.get('EMAIL_FROM') || '',
      to: Deno.env.get('EMAIL_TO') || '',
      subject: `Novo contato do site: ${record.name}`,
      content: `
        Nome: ${record.name}
        Email: ${record.email}
        Telefone: ${record.phone || 'Não informado'}
        Empresa: ${record.company || 'Não informada'}
        Serviços de interesse: ${record.service_interest?.join(', ') || 'Não informados'}
        
        Mensagem:
        ${record.message}
      `,
    });

    await client.close();

    // Atualizar status do contato
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase
      .from('contacts')
      .update({ notification_sent: true })
      .eq('id', record.id);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
```

## 📊 Webhooks

### 📝 Configuração de Webhook

Exemplo de configuração de webhook para notificações:

1. No Supabase Dashboard, vá para Database > Webhooks
2. Crie um novo webhook com as seguintes configurações:
   - Nome: `contact_notification`
   - Tabela: `contacts`
   - Eventos: `INSERT`
   - URL: `https://your-project.functions.supabase.co/send-contact-notification`

### 📝 Processamento de Webhook

Exemplo de código para processar um webhook do Supabase:

```typescript
// pages/api/webhooks/supabase.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Obter corpo da requisição como buffer
    const rawBody = await buffer(req);
    const payload = JSON.parse(rawBody.toString());

    // Verificar assinatura (se configurada)
    const signature = req.headers['x-webhook-signature'];
    if (!verifySignature(rawBody, signature as string)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Processar evento
    const { type, table, record, old_record } = payload;

    console.log(`Webhook received: ${type} on ${table}`);

    // Lógica específica para cada tipo de evento
    if (table === 'contacts' && type === 'INSERT') {
      // Processar novo contato
      await processNewContact(record);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}

// Função para verificar assinatura
function verifySignature(payload: Buffer, signature: string): boolean {
  // Implementar verificação de assinatura
  // ...
  return true; // Simplificado para o exemplo
}

// Função para processar novo contato
async function processNewContact(contact: any) {
  // Lógica para processar novo contato
  // Por exemplo, enviar notificação, criar tarefa, etc.
  console.log('Processing new contact:', contact.name);
}
```

## 📊 Migrações e Versionamento

### 📝 Migrações com Supabase CLI

Exemplo de uso do Supabase CLI para migrações:

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Iniciar projeto local
supabase init

# Criar nova migração
supabase migration new add_view_count_to_blog_posts

# Aplicar migrações localmente
supabase db reset

# Aplicar migrações em produção
supabase db push
```

### 📝 Exemplo de Migração

Exemplo de arquivo de migração:

```sql
-- Arquivo: supabase/migrations/20230601120000_add_view_count_to_blog_posts.sql

-- Adicionar coluna de contagem de visualizações
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

## 📊 Monitoramento e Logs

### 📝 Logs no Cliente

Configuração para logs no cliente:

```typescript
// src/lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Configuração de logs
const isDevelopment = import.meta.env.DEV;

export const supabase = createClient<Database>(
  supabaseUrl, 
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
    },
    // Habilitar logs apenas em desenvolvimento
    debug: isDevelopment,
  }
);
```

### 📝 Monitoramento de Erros

Função para registrar erros:

```typescript
// src/utils/errorReporting.ts
import * as Sentry from '@sentry/browser';

// Inicializar Sentry se a chave estiver disponível
if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    tracesSampleRate: 1.0,
  });
}

export function reportError(error: Error, context?: Record<string, any>) {
  console.error('Error:', error, context);
  
  // Enviar para Sentry se disponível
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.captureException(error, {
      extra: context,
    });
  }
}
```

## 📝 Boas Práticas

### 🔄 Tratamento de Erros

Padrão para tratamento de erros em operações do Supabase:

```typescript
async function fetchData() {
  try {
    const { data, error } = await supabase
      .from('table_name')
      .select('*');
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    // Registrar erro
    reportError(
      error instanceof Error ? error : new Error('Unknown error'),
      { operation: 'fetchData', table: 'table_name' }
    );
    
    // Repassar erro ou retornar valor padrão
    throw new Error('Failed to fetch data');
  }
}
```

### 🔄 Paginação

Implementação de paginação eficiente:

```typescript
// src/hooks/usePaginatedData.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { reportError } from '@/utils/errorReporting';

interface PaginationOptions {
  page: number;
  pageSize: number;
  orderBy?: { column: string; ascending?: boolean };
  filters?: { column: string; value: any }[];
}

  table: string,
  options: PaginationOptions
) {
  const [data, setData] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { page, pageSize, orderBy, filters } = options;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Calcular offset para paginação
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        
        // Construir query base
        let query = supabase
          .from(table)
          .select('*', { count: 'exact' })
          .range(from, to);
        
        // Aplicar ordenação
        if (orderBy) {
          query = query.order(orderBy.column, { 
            ascending: orderBy.ascending ?? true 
          });
        }
        
        // Aplicar filtros
        if (filters && filters.length > 0) {
          filters.forEach(filter => {
            query = query.eq(filter.column, filter.value);
          });
        }
        
        // Executar query
        const { data, error, count } = await query;
        
        if (error) throw error;
        
        setData(data as T[]);
        setTotalCount(count || 0);
        setError(null);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        reportError(error, { 
          operation: 'usePaginatedData', 
          table, 
          page, 
          pageSize 
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [table, page, pageSize, JSON.stringify(orderBy), JSON.stringify(filters)]);

  // Calcular total de páginas
  const totalPages = Math.ceil(totalCount / pageSize);

  return { 
    data, 
    loading, 
    error, 
    totalCount, 
    totalPages,
    page,
    pageSize
  };
}
```

### 🔄 Otimização de Consultas

Boas práticas para otimizar consultas:

```typescript
// Exemplo de consulta otimizada com seleção específica de colunas
async function getServiceSummary() {
  const { data, error } = await supabase
    .from('services')
    .select('id, title, short_description, icon_name') // Selecionar apenas colunas necessárias
    .eq('is_active', true)
    .order('title');
    
  if (error) throw error;
  return data;
}

// Exemplo de consulta com joins otimizados
async function getServiceWithCategory(serviceId: string) {
  const { data, error } = await supabase
    .from('services')
    .select(`
      id, 
      title, 
      short_description,
      long_description,
      icon_name,
      category:service_categories(id, title, slug)
    `) // Join com seleção específica
    .eq('id', serviceId)
    .single();
    
  if (error) throw error;
  return data;
}

// Exemplo de consulta com contagem
async function getCategoriesWithServiceCount() {
  const { data, error } = await supabase
    .from('service_categories')
    .select(`
      id,
      title,
      slug,
      services:services(count)
    `)
    .eq('is_active', true);
    
  if (error) throw error;
  
  return data.map(category => ({
    ...category,
    serviceCount: category.services.length,
  }));
}
```

### 🔄 Cache de Dados

Implementação de cache para consultas frequentes:

```typescript
// src/utils/queryCache.ts
interface CacheOptions {
  ttl: number; // Tempo de vida em milissegundos
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class QueryCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  
  async get<T>(
    key: string,
    queryFn: () => Promise<T>,
    options: CacheOptions = { ttl: 5 * 60 * 1000 } // 5 minutos padrão
  ): Promise<T> {
    const cachedItem = this.cache.get(key);
    const now = Date.now();
    
    // Verificar se o item está em cache e não expirou
    if (cachedItem && now - cachedItem.timestamp < options.ttl) {
      return cachedItem.data;
    }
    
    // Executar consulta
    const data = await queryFn();
    
    // Armazenar em cache
    this.cache.set(key, {
      data,
      timestamp: now,
    });
    
    return data;
  }
  
  invalidate(key: string): void {
    this.cache.delete(key);
  }
  
  invalidateByPrefix(prefix: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }
  
  clear(): void {
    this.cache.clear();
  }
}

export const queryCache = new QueryCache();
```

Uso do cache em serviços:

```typescript
// src/services/serviceService.ts
import { queryCache } from '@/utils/queryCache';
import { supabase } from '@/lib/supabase/client';
import type { Service } from '@/types';

export async function getServices(): Promise<Service[]> {
  return queryCache.get('services', async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('title');
      
    if (error) throw error;
    
    return data.map(mapServiceData);
  });
}

export async function getServiceById(id: string): Promise<Service | null> {
  return queryCache.get(`service:${id}`, async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return null; // Não encontrado
      throw error;
    }
    
    return mapServiceData(data);
  });
}

// Função para invalidar cache após mutações
export async function updateService(id: string, updates: Partial<Service>): Promise<void> {
  const { error } = await supabase
    .from('services')
    .update({
      title: updates.title,
      short_description: updates.shortDescription,
      long_description: updates.longDescription,
      icon_name: updates.iconName,
      category_id: updates.categoryId,
      is_active: updates.isActive,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
    
  if (error) throw error;
  
  // Invalidar cache
  queryCache.invalidate(`service:${id}`);
  queryCache.invalidate('services');
}

// Função auxiliar para mapear dados
function mapServiceData(data: any): Service {
  return {
    id: data.id,
    title: data.title,
    shortDescription: data.short_description,
    longDescription: data.long_description,
    iconName: data.icon_name,
    categoryId: data.category_id,
    isActive: data.is_active,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
}
```

## 🔄 Migração de Dados

### 📝 Importação de Dados

Script para importação de dados:

```typescript
// scripts/importData.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuração
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importData() {
  try {
    console.log('Iniciando importação de dados...');
    
    // Ler arquivo JSON
    const dataPath = path.join(__dirname, 'data.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);
    
    // Importar categorias
    if (data.categories && data.categories.length > 0) {
      console.log(`Importando ${data.categories.length} categorias...`);
      
      const { error: categoriesError } = await supabase
        .from('service_categories')
        .upsert(
          data.categories.map((category: any) => ({
            id: category.id,
            title: category.title,
            description: category.description,
            slug: category.slug,
            icon_name: category.icon_name,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })),
          { onConflict: 'id' }
        );
        
      if (categoriesError) {
        throw new Error(`Erro ao importar categorias: ${categoriesError.message}`);
      }
      
      console.log('Categorias importadas com sucesso!');
    }
    
    // Importar serviços
    if (data.services && data.services.length > 0) {
      console.log(`Importando ${data.services.length} serviços...`);
      
      const { error: servicesError } = await supabase
        .from('services')
        .upsert(
          data.services.map((service: any) => ({
            id: service.id,
            title: service.title,
            short_description: service.short_description,
            long_description: service.long_description,
            icon_name: service.icon_name,
            category_id: service.category_id,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })),
          { onConflict: 'id' }
        );
        
      if (servicesError) {
        throw new Error(`Erro ao importar serviços: ${servicesError.message}`);
      }
      
      console.log('Serviços importados com sucesso!');
    }
    
    console.log('Importação concluída com sucesso!');
  } catch (error) {
    console.error('Erro durante a importação:', error);
    process.exit(1);
  }
}

importData();
```

### 📝 Backup de Dados

Script para backup de dados:

```typescript
// scripts/backupData.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Configuração
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function backupData() {
  try {
    console.log('Iniciando backup de dados...');
    
    // Backup de categorias
    const { data: categories, error: categoriesError } = await supabase
      .from('service_categories')
      .select('*');
      
    if (categoriesError) {
      throw new Error(`Erro ao buscar categorias: ${categoriesError.message}`);
    }
    
    // Backup de serviços
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*');
      
    if (servicesError) {
      throw new Error(`Erro ao buscar serviços: ${servicesError.message}`);
    }
    
    // Backup de portfólio
    const { data: portfolio, error: portfolioError } = await supabase
      .from('portfolio')
      .select('*');
      
    if (portfolioError) {
      throw new Error(`Erro ao buscar portfólio: ${portfolioError.message}`);
    }
    
    // Backup de depoimentos
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('*');
      
    if (testimonialsError) {
      throw new Error(`Erro ao buscar depoimentos: ${testimonialsError.message}`);
    }
    
    // Criar objeto de backup
    const backupData = {
      timestamp: new Date().toISOString(),
      categories,
      services,
      portfolio,
      testimonials,
    };
    
    // Salvar em arquivo
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const backupPath = path.join(
      backupDir, 
      `backup-${new Date().toISOString().replace(/:/g, '-')}.json`
    );
    
    fs.writeFileSync(
      backupPath, 
      JSON.stringify(backupData, null, 2), 
      'utf8'
    );
    
    console.log(`Backup concluído com sucesso! Arquivo: ${backupPath}`);
  } catch (error) {
    console.error('Erro durante o backup:', error);
    process.exit(1);
  }
}

backupData();
```

## 📝 Conclusão

A integração com o Supabase oferece uma solução completa para backend, incluindo banco de dados, autenticação, armazenamento e funções serverless. Seguindo as práticas recomendadas neste documento, você pode construir aplicações robustas, seguras e escaláveis.

Para mais informações, consulte a [documentação oficial do Supabase](https://supabase.io/docs).
```

Agora vou criar o arquivo `COMPONENTES_UI.md`:

```markdown:docs/COMPONENTES_UI.md
# Componentes UI - Delagil Site

## 🎨 Visão Geral

Este documento detalha os componentes de UI disponíveis no projeto, incluindo suas propriedades, variantes e exemplos de uso.

## 🧩 Sistema de Design

O sistema de design do projeto é baseado em Tailwind CSS com componentes personalizados que seguem princípios de acessibilidade e responsividade.

### 🎨 Paleta de Cores

As cores principais do projeto são definidas no arquivo `tailwind.config.js`:

```javascript
colors: {
  'brand-primary': '#0056b3',
  'brand-primary-dark': '#004494',
  'brand-primary-light': '#3378c5',
  'brand-secondary
