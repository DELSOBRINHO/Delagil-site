import { createClient } from '@supabase/supabase-js';
import { Service, ServiceCategory, PortfolioItem, Testimonial, ContactFormData, CaseStudy } from '../types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service Categories
export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching service categories:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getServiceCategories:', error);
    // Fallback to mock data if Supabase is not available
    return [
      { id: 'marketing', slug: 'marketing-digital', title: 'Marketing Digital', description: 'Estratégias completas para aumentar sua presença online, engajar seu público e gerar mais leads e vendas.', iconName: 'Megaphone' },
      { id: 'consultoria', slug: 'consultoria-gestao', title: 'Consultoria e Gestão Estratégica', description: 'Análise de negócios, planejamento estratégico e otimização de processos para impulsionar o crescimento sustentável.', iconName: 'Briefcase' },
      { id: 'software', slug: 'solucoes-software', title: 'Soluções de Software e Inovação', description: 'Desenvolvimento de software sob medida, aplicativos móveis e soluções tecnológicas inovadoras para transformar sua operação.', iconName: 'Cpu' },
      { id: 'projetos', slug: 'gestao-projetos', title: 'Gestão de Projetos', description: 'Metodologias ágeis e tradicionais para garantir a entrega de projetos no prazo, escopo e orçamento definidos.', iconName: 'ClipboardCheck' },
      { id: 'infra', slug: 'infraestrutura-cloud', title: 'Infraestrutura e Cloud', description: 'Soluções de computação em nuvem, segurança de dados e infraestrutura de TI robusta e escalável para suportar seu negócio.', iconName: 'CloudCog' },
    ];
  }
};

// Services
export const getServices = async (): Promise<Service[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('id');

    if (error) {
      console.error('Error fetching services:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getServices:', error);
    // Fallback to mock data
    return [
      { id: 's1', categoryId: 'marketing', title: 'SEO e Otimização de Sites', shortDescription: 'Melhore seu ranking nos motores de busca.', longDescription: 'Análise completa de SEO on-page e off-page, pesquisa de palavras-chave, link building e otimização técnica para aumentar a visibilidade orgânica do seu site.', iconName: 'Search' },
      { id: 's2', categoryId: 'marketing', title: 'Gestão de Mídias Sociais', shortDescription: 'Engaje seu público e construa sua marca.', longDescription: 'Criação de conteúdo estratégico, gerenciamento de perfis, campanhas de engajamento e monitoramento de resultados nas principais plataformas de mídia social.', iconName: 'ThumbsUp' },
      { id: 's3', categoryId: 'marketing', title: 'Marketing de Conteúdo', shortDescription: 'Atraia e converta com conteúdo de valor.', longDescription: 'Planejamento, criação e distribuição de conteúdo relevante (blog posts, e-books, infográficos, vídeos) para atrair, educar e converter seu público-alvo.', iconName: 'FileText' },
      { id: 's4', categoryId: 'consultoria', title: 'Planejamento Estratégico', shortDescription: 'Defina o rumo do seu negócio.', longDescription: 'Análise de mercado, definição de metas e objetivos, desenvolvimento de planos de ação e acompanhamento de KPIs para garantir o sucesso a longo prazo.', iconName: 'Target' },
      { id: 's5', categoryId: 'consultoria', title: 'Otimização de Processos', shortDescription: 'Aumente a eficiência e reduza custos.', longDescription: 'Mapeamento de processos, identificação de gargalos, implementação de melhorias e automação para otimizar a operação da sua empresa.', iconName: 'Zap' },
      { id: 's6', categoryId: 'software', title: 'Desenvolvimento Web Personalizado', shortDescription: 'Sistemas e plataformas web sob medida.', longDescription: 'Criação de websites, e-commerces, sistemas web complexos e APIs utilizando as tecnologias mais modernas e adequadas às suas necessidades.', iconName: 'Code' },
      { id: 's7', categoryId: 'software', title: 'Aplicativos Móveis (iOS e Android)', shortDescription: 'Leve seu negócio para o bolso do cliente.', longDescription: 'Desenvolvimento de aplicativos nativos e híbridos para iOS e Android, com foco em usabilidade, performance e design intuitivo.', iconName: 'Smartphone' },
      { id: 's8', categoryId: 'projetos', title: 'Gerenciamento Ágil de Projetos (Scrum/Kanban)', shortDescription: 'Entregas rápidas e adaptáveis.', longDescription: 'Implementação de metodologias ágeis como Scrum e Kanban para gerenciamento de projetos de software e outras iniciativas, garantindo flexibilidade e entregas de valor contínuas.', iconName: 'Repeat' },
      { id: 's9', categoryId: 'infra', title: 'Migração para Nuvem (AWS, Azure, GCP)', shortDescription: 'Modernize sua infraestrutura de TI.', longDescription: 'Planejamento e execução de projetos de migração para as principais plataformas de nuvem (Amazon Web Services, Microsoft Azure, Google Cloud Platform), otimizando custos e escalabilidade.', iconName: 'Server' },
    ];
  }
};

export const getServicesByCategorySlug = async (slug: string): Promise<Service[]> => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        service_categories!inner(slug)
      `)
      .eq('service_categories.slug', slug)
      .order('id');

    if (error) {
      console.error('Error fetching services by category:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getServicesByCategorySlug:', error);
    // Fallback to mock data
    const allServices = await getServices();
    const categories = await getServiceCategories();
    const category = categories.find(cat => cat.slug === slug);
    if (!category) return [];
    return allServices.filter(service => service.categoryId === category.id);
  }
};

// Portfolio
export const getPortfolioItems = async (): Promise<PortfolioItem[]> => {
  try {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching portfolio items:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPortfolioItems:', error);
    // Fallback to mock data
    return [
      { id: 'p1', title: 'Website Institucional para TechSolutions', description: 'Desenvolvimento de um website moderno e responsivo para uma empresa de tecnologia, focado em UX e geração de leads.', imageUrl: 'https://picsum.photos/seed/project1/400/300', category: 'Desenvolvimento Web', link: '#' },
      { id: 'p2', title: 'Campanha de Marketing Digital para E-commerce de Moda', description: 'Estratégia completa de marketing digital que resultou em aumento de 150% nas vendas online.', imageUrl: 'https://picsum.photos/seed/project2/400/300', category: 'Marketing Digital', link: '#' },
      { id: 'p3', title: 'Aplicativo Móvel para Startup de Logística', description: 'Criação de um aplicativo móvel inovador para otimização de rotas e acompanhamento de entregas em tempo real.', imageUrl: 'https://picsum.photos/seed/project3/400/300', category: 'Aplicativos Móveis', link: '#' },
      { id: 'p4', title: 'Consultoria Estratégica para Expansão de Mercado', description: 'Análise de mercado e plano de expansão para uma empresa do setor alimentício, resultando na entrada em duas novas regiões.', imageUrl: 'https://picsum.photos/seed/project4/400/300', category: 'Consultoria Estratégica' },
    ];
  }
};

// Testimonials
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching testimonials:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getTestimonials:', error);
    // Fallback to mock data
    return [
      { id: 't1', quote: 'A Delagil transformou nossa presença online! Resultados incríveis em pouco tempo.', author: 'João Silva', company: 'CEO da InovaTech' },
      { id: 't2', quote: 'Profissionalismo e expertise definem a equipe Delagil. Recomendo fortemente!', author: 'Maria Oliveira', company: 'Diretora de Marketing da ModaStore' },
      { id: 't3', quote: 'O novo sistema desenvolvido pela Delagil otimizou nossos processos e reduziu custos significativamente.', author: 'Carlos Pereira', company: 'Gerente de Operações da LogExpress' },
    ];
  }
};

// Contact Form Submission
export const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service_interest: data.serviceInterest || [],
        message: data.message,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in submitContactForm:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro ao enviar formulário. Tente novamente.' 
    };
  }
};

// Mock Case Studies Data
const caseStudiesData: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'aumento-de-conversoes-para-e-commerce-de-moda',
    title: 'Aumento de 400% nas Conversões para E-commerce de Moda',
    clientName: 'FashionNow',
    problemStatement: 'O cliente enfrentava baixas taxas de conversão e um alto custo de aquisição de clientes (CAC) através de suas campanhas de marketing digital, que não estavam gerando o ROI esperado.',
    solutionProvided: 'Realizamos uma auditoria completa de SEO, reestruturamos as campanhas de Google Ads e Facebook Ads com foco em públicos de alta intenção, e implementamos uma estratégia de marketing de conteúdo para nutrir leads. Além disso, otimizamos a UX da página de checkout.',
    resultsAchieved: [
      'Aumento de 400% na taxa de conversão em 6 meses.',
      'Redução de 60% no Custo por Aquisição (CAC).',
      'Crescimento de 150% no tráfego orgânico qualificado.',
      'Melhora de 35% na velocidade de carregamento do site.'
    ],
    technologiesUsed: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'SEMrush', 'Hotjar'],
    imageUrl: 'https://picsum.photos/seed/casestudy1/800/600',
    category: 'Marketing Digital',
    testimonial: {
      quote: 'A parceria com a Delagil foi um divisor de águas. A expertise deles não apenas otimizou nossos investimentos, mas transformou nossa visão sobre o marketing digital.',
      author: 'Juliana Almeida, CEO da FashionNow'
    }
  },
  {
    id: 'cs2',
    slug: 'desenvolvimento-de-plataforma-saas-para-logistica',
    title: 'Desenvolvimento e Lançamento de Plataforma SaaS para Logística',
    clientName: 'LogisTech',
    problemStatement: 'A LogisTech precisava desenvolver uma plataforma SaaS robusta e escalável para otimização de rotas, mas não possuía uma equipe de desenvolvimento interna com a expertise necessária em tecnologias de nuvem e arquitetura multi-tenant.',
    solutionProvided: 'Assumimos o ciclo completo de desenvolvimento, desde a arquitetura da solução em AWS até a implementação do frontend em React e backend com Node.js e PostgreSQL. Utilizamos metodologias ágeis para garantir entregas contínuas e alinhamento com o cliente.',
    resultsAchieved: [
      'Lançamento da plataforma em 8 meses, dentro do prazo e orçamento.',
      'Arquitetura escalável que suporta mais de 1000 clientes simultâneos.',
      'Redução de 30% no tempo de processamento de rotas para os usuários finais.',
      'Plataforma premiada como a inovação do ano no setor de logística.'
    ],
    technologiesUsed: ['React', 'Node.js', 'PostgreSQL', 'AWS (EC2, S3, RDS)', 'Docker', 'Jenkins'],
    imageUrl: 'https://picsum.photos/seed/casestudy2/800/600',
    category: 'Desenvolvimento de Software',
  }
];

// Case Studies
export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching case studies:', error);
      throw error;
    }

    // Transform Supabase data to match our interface
    const transformedData: CaseStudy[] = (data || []).map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      clientName: item.client_name,
      problemStatement: item.problem_statement,
      solutionProvided: item.solution_provided,
      resultsAchieved: item.results_achieved,
      technologiesUsed: item.technologies_used,
      imageUrl: item.image_url,
      category: item.category,
      testimonial: item.testimonial_quote && item.testimonial_author ? {
        quote: item.testimonial_quote,
        author: item.testimonial_author
      } : undefined
    }));

    return transformedData;
  } catch (error) {
    console.error('Error in getCaseStudies:', error);
    // Fallback to mock data
    return caseStudiesData;
  }
};

export const getCaseStudyBySlug = async (slug: string): Promise<CaseStudy | null> => {
  try {
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching case study by slug:', error);
      throw error;
    }

    if (!data) return null;

    // Transform Supabase data to match our interface
    const transformedData: CaseStudy = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      clientName: data.client_name,
      problemStatement: data.problem_statement,
      solutionProvided: data.solution_provided,
      resultsAchieved: data.results_achieved,
      technologiesUsed: data.technologies_used,
      imageUrl: data.image_url,
      category: data.category,
      testimonial: data.testimonial_quote && data.testimonial_author ? {
        quote: data.testimonial_quote,
        author: data.testimonial_author
      } : undefined
    };

    return transformedData;
  } catch (error) {
    console.error('Error in getCaseStudyBySlug:', error);
    // Fallback to mock data
    const caseStudy = caseStudiesData.find(cs => cs.slug === slug);
    return caseStudy || null;
  }
};
