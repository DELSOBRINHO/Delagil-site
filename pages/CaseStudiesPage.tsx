import React, { useState, useEffect } from 'react';
import { CaseStudy } from '../../types';
import { getCaseStudies } from '../../services/supabaseService';
import SEOHead from '../../components/seo/SEOHead';
import CaseStudyCard from '../../components/casestudies/CaseStudyCard';

const CaseStudiesPage: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (err) {
        setError('Falha ao carregar os cases de sucesso. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <>
      <SEOHead
        title="Cases de Sucesso - Delagil"
        description="Explore nossos cases de sucesso e veja como ajudamos empresas a alcançar resultados extraordinários em marketing digital, consultoria e tecnologia."
        url="https://delagil-site.vercel.app/cases-de-sucesso"
      />
      <div className="bg-brand-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-brand-primary">Nossos Cases de Sucesso</h1>
            <p className="mt-4 text-lg text-brand-text-secondary max-w-3xl mx-auto">
              Resultados reais para clientes reais. Veja na prática como as soluções da Delagil transformam negócios.
            </p>
          </div>

          {loading && <p className="text-center">Carregando...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map(cs => (
                <CaseStudyCard key={cs.id} caseStudy={cs} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseStudiesPage; 