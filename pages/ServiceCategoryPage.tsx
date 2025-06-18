
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Service, ServiceCategory } from '../types';
import { getServicesByCategorySlug, getServiceCategories } from '../services/supabaseService';
import ServiceCard from '../components/services/ServiceCard';
import { ArrowLeft } from 'lucide-react';

const ServiceCategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [services, setServices] = useState<Service[]>([]);
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!categorySlug) return;
      try {
        setLoading(true);
        const fetchedServices = await getServicesByCategorySlug(categorySlug);
        setServices(fetchedServices);

        const allCategories = await getServiceCategories();
        const currentCategory = allCategories.find(cat => cat.slug === categorySlug) || null;
        setCategory(currentCategory);
        
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os serviços desta categoria.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData();
  }, [categorySlug]);

  if (loading) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">Carregando serviços...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-600">{error}</div>;
  }

  if (!category) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">Categoria não encontrada.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <Link to="/servicos" className="inline-flex items-center text-brand-accent hover:underline mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Voltar para todas as soluções
        </Link>
        <h1 className="text-4xl font-extrabold text-brand-primary mb-3">{category.title}</h1>
        <p className="text-lg text-brand-text-secondary max-w-3xl">{category.description}</p>
      </header>

      {services.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} id={service.id} className="scroll-mt-24"> {/* scroll-mt for anchor links */}
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-brand-text-secondary">Nenhum serviço específico encontrado para esta categoria.</p>
      )}
    </div>
  );
};

export default ServiceCategoryPage;
