-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  solution_provided TEXT NOT NULL,
  results_achieved TEXT[] NOT NULL,
  technologies_used TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  testimonial_quote TEXT,
  testimonial_author TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_case_studies_slug ON case_studies(slug);
CREATE INDEX IF NOT EXISTS idx_case_studies_category ON case_studies(category);
CREATE INDEX IF NOT EXISTS idx_case_studies_created_at ON case_studies(created_at DESC);

-- Enable Row Level Security
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access to all case studies
CREATE POLICY "Allow public read access to case studies" ON case_studies
  FOR SELECT USING (true);

-- Policy: Allow authenticated users to insert case studies (for admin purposes)
CREATE POLICY "Allow authenticated users to insert case studies" ON case_studies
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to update case studies
CREATE POLICY "Allow authenticated users to update case studies" ON case_studies
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Allow authenticated users to delete case studies
CREATE POLICY "Allow authenticated users to delete case studies" ON case_studies
  FOR DELETE USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_case_studies_updated_at 
  BEFORE UPDATE ON case_studies 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO case_studies (
  slug,
  title,
  client_name,
  problem_statement,
  solution_provided,
  results_achieved,
  technologies_used,
  image_url,
  category,
  testimonial_quote,
  testimonial_author
) VALUES 
(
  'aumento-de-conversoes-para-e-commerce-de-moda',
  'Aumento de 400% nas Conversões para E-commerce de Moda',
  'FashionNow',
  'O cliente enfrentava baixas taxas de conversão e um alto custo de aquisição de clientes (CAC) através de suas campanhas de marketing digital, que não estavam gerando o ROI esperado.',
  'Realizamos uma auditoria completa de SEO, reestruturamos as campanhas de Google Ads e Facebook Ads com foco em públicos de alta intenção, e implementamos uma estratégia de marketing de conteúdo para nutrir leads. Além disso, otimizamos a UX da página de checkout.',
  ARRAY[
    'Aumento de 400% na taxa de conversão em 6 meses.',
    'Redução de 60% no Custo por Aquisição (CAC).',
    'Crescimento de 150% no tráfego orgânico qualificado.',
    'Melhora de 35% na velocidade de carregamento do site.'
  ],
  ARRAY['Google Analytics', 'Google Ads', 'Facebook Ads', 'SEMrush', 'Hotjar'],
  'https://picsum.photos/seed/casestudy1/800/600',
  'Marketing Digital',
  'A parceria com a Delagil foi um divisor de águas. A expertise deles não apenas otimizou nossos investimentos, mas transformou nossa visão sobre o marketing digital.',
  'Juliana Almeida, CEO da FashionNow'
),
(
  'desenvolvimento-de-plataforma-saas-para-logistica',
  'Desenvolvimento e Lançamento de Plataforma SaaS para Logística',
  'LogisTech',
  'A LogisTech precisava desenvolver uma plataforma SaaS robusta e escalável para otimização de rotas, mas não possuía uma equipe de desenvolvimento interna com a expertise necessária em tecnologias de nuvem e arquitetura multi-tenant.',
  'Assumimos o ciclo completo de desenvolvimento, desde a arquitetura da solução em AWS até a implementação do frontend em React e backend com Node.js e PostgreSQL. Utilizamos metodologias ágeis para garantir entregas contínuas e alinhamento com o cliente.',
  ARRAY[
    'Lançamento da plataforma em 8 meses, dentro do prazo e orçamento.',
    'Arquitetura escalável que suporta mais de 1000 clientes simultâneos.',
    'Redução de 30% no tempo de processamento de rotas para os usuários finais.',
    'Plataforma premiada como a inovação do ano no setor de logística.'
  ],
  ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS (EC2, S3, RDS)', 'Docker', 'Jenkins'],
  'https://picsum.photos/seed/casestudy2/800/600',
  'Desenvolvimento de Software',
  NULL,
  NULL
),
(
  'transformacao-digital-para-empresa-de-consultoria',
  'Transformação Digital Completa para Empresa de Consultoria',
  'ConsultPro',
  'A ConsultPro, uma empresa tradicional de consultoria, precisava modernizar seus processos internos e melhorar a experiência do cliente, mas enfrentava resistência à mudança e falta de expertise em tecnologias digitais.',
  'Implementamos uma estratégia de transformação digital em fases, começando com a migração para a nuvem, automação de processos com RPA, e desenvolvimento de um portal do cliente personalizado. Também treinamos a equipe em novas tecnologias.',
  ARRAY[
    'Redução de 70% no tempo de entrega de relatórios.',
    'Aumento de 200% na satisfação do cliente.',
    'Economia de 40% em custos operacionais.',
    'Implementação de 15 processos automatizados.'
  ],
  ARRAY['AWS', 'React', 'Node.js', 'UiPath', 'Power BI', 'Salesforce'],
  'https://picsum.photos/seed/casestudy3/800/600',
  'Consultoria Estratégica',
  'A transformação digital com a Delagil revolucionou nossa operação. O que parecia impossível se tornou realidade em poucos meses.',
  'Carlos Mendes, Diretor de Operações da ConsultPro'
),
(
  'aplicativo-mobile-para-startup-de-saude',
  'Aplicativo Mobile para Startup de Saúde Mental',
  'MindCare',
  'A startup MindCare precisava desenvolver um aplicativo mobile inovador para acompanhamento de saúde mental, mas não tinha experiência em desenvolvimento mobile e precisava garantir conformidade com LGPD.',
  'Desenvolvemos um aplicativo nativo para iOS e Android com foco em privacidade e usabilidade. Implementamos criptografia end-to-end, autenticação biométrica e integração com wearables para monitoramento de sinais vitais.',
  ARRAY[
    'Lançamento em 6 meses com aprovação da ANVISA.',
    'Mais de 50.000 downloads nos primeiros 3 meses.',
    'Conformidade total com LGPD e HIPAA.',
    'Avaliação média de 4.8 estrelas nas lojas.'
  ],
  ARRAY['React Native', 'Firebase', 'AWS', 'Apple HealthKit', 'Google Fit', 'JWT'],
  'https://picsum.photos/seed/casestudy4/800/600',
  'Aplicativos Móveis',
  'O aplicativo desenvolvido pela Delagil superou todas as nossas expectativas. A qualidade técnica e atenção aos detalhes de privacidade foram excepcionais.',
  'Dra. Ana Silva, CEO da MindCare'
),
(
  'migracao-cloud-para-empresa-financeira',
  'Migração para Cloud de Empresa Financeira',
  'FinTech Solutions',
  'A FinTech Solutions precisava migrar sua infraestrutura on-premise para a nuvem para melhorar a escalabilidade e reduzir custos, mas enfrentava desafios de compliance e segurança.',
  'Planejamos e executamos uma migração em fases para AWS, implementando arquitetura de alta disponibilidade, backup automático e monitoramento 24/7. Garantimos conformidade com regulamentações financeiras.',
  ARRAY[
    'Migração concluída em 4 meses sem downtime.',
    'Redução de 60% nos custos de infraestrutura.',
    'Melhoria de 99.9% na disponibilidade.',
    'Conformidade com BACEN e LGPD.'
  ],
  ARRAY['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
  'https://picsum.photos/seed/casestudy5/800/600',
  'Infraestrutura e Cloud',
  'A migração para cloud com a Delagil foi um sucesso total. A expertise deles em compliance financeiro foi fundamental para o projeto.',
  'Roberto Santos, CTO da FinTech Solutions'
)
ON CONFLICT (slug) DO NOTHING; 