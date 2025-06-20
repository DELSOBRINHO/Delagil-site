import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CaseStudy } from '../../types';
import { getCaseStudyBySlug } from '../../services/supabaseService';
import SEOHead from '../../components/seo/SEOHead';
import NotFoundPage from '../NotFoundPage';
import { CheckCircle, Briefcase, Zap, BarChart2, MessageSquare, ArrowLeft } from 'lucide-react';

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchCaseStudy = async () => {
      try {
        setLoading(true);
        const data = await getCaseStudyBySlug(slug);
        if (data) {
          setCaseStudy(data);
        } else {
          setError('Case de sucesso não encontrado.');
        }
      } catch (err) {
        setError('Falha ao carregar o case de sucesso.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20">Carregando...</div>;
  }

  if (error || !caseStudy) {
    return <NotFoundPage />;
  }

  return (
    <>
      <SEOHead
        title={`${caseStudy.title} - Delagil`}
        description={caseStudy.problemStatement}
        url={`https://delagil-site.vercel.app/cases-de-sucesso/${caseStudy.slug}`}
        image={caseStudy.imageUrl}
        type="article"
      />

      <div className="bg-white">
        {/* Header Section */}
        <div className="relative bg-brand-primary-dark text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-semibold text-brand-accent-alt">{caseStudy.category} | {caseStudy.clientName}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-2">{caseStudy.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <img 
            src={caseStudy.imageUrl} 
            alt={`Imagem principal do case ${caseStudy.title}`}
            className="rounded-lg shadow-2xl mx-auto w-full max-w-4xl object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
          <div className="prose lg:prose-xl max-w-none">
            
            <section className="mb-12">
              <h2 className="flex items-center text-3xl font-bold text-brand-primary mb-4">
                <Briefcase className="mr-3 text-brand-accent" /> O Desafio
              </h2>
              <p className="text-lg text-brand-text-secondary">{caseStudy.problemStatement}</p>
            </section>

            <section className="mb-12">
              <h2 className="flex items-center text-3xl font-bold text-brand-primary mb-4">
                <Zap className="mr-3 text-brand-accent" /> Nossa Solução
              </h2>
              <p className="text-lg text-brand-text-secondary">{caseStudy.solutionProvided}</p>
            </section>

            <section className="mb-12 bg-brand-surface p-8 rounded-lg">
              <h2 className="flex items-center text-3xl font-bold text-brand-primary mb-4">
                <BarChart2 className="mr-3 text-brand-accent" /> Resultados
              </h2>
              <ul className="space-y-4">
                {caseStudy.resultsAchieved.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-brand-text-secondary">{result}</span>
                  </li>
                ))}
              </ul>
            </section>

            {caseStudy.testimonial && (
              <section className="mb-12 border-l-4 border-brand-accent-alt pl-6 italic">
                 <MessageSquare className="text-brand-accent-alt mb-2" />
                <p className="text-xl text-brand-text-secondary">"{caseStudy.testimonial.quote}"</p>
                <p className="mt-4 font-semibold text-brand-primary text-right">— {caseStudy.testimonial.author}</p>
              </section>
            )}

            <section>
              <h3 className="text-2xl font-bold text-brand-primary mb-4">Tecnologias Utilizadas</h3>
              <div className="flex flex-wrap gap-2">
                {caseStudy.technologiesUsed.map(tech => (
                  <span key={tech} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
          
          <div className="text-center mt-16">
            <Link to="/cases-de-sucesso" className="inline-flex items-center text-brand-accent hover:underline">
              <ArrowLeft className="mr-2" />
              Voltar para Cases de Sucesso
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseStudyDetailPage; 