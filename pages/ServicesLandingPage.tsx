
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ServiceCategory } from '../types';
import { getServiceCategories } from '../services/supabaseService';
import Card from '../components/ui/Card';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const ServicesLandingPage: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await getServiceCategories();
        setCategories(fetchedCategories);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar as categorias de serviços.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchCategories();
  }, []);

  if (loading) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">Carregando categorias...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4">Nossas Soluções</h1>
        <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
          Explore nossas áreas de especialização e descubra como podemos ajudar seu negócio a alcançar novos patamares.
        </p>
      </header>

      {categories.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => {
            const IconComponent = LucideIcons[category.iconName] as LucideIcons.LucideIcon;
            return (
              <Link key={category.id} to={`/servicos/${category.slug}`} className="block group">
                <Card className="p-8 h-full flex flex-col items-center text-center transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:-translate-y-2">
                  {IconComponent && <IconComponent size={56} className="text-brand-accent mb-6 transition-transform duration-300 group-hover:scale-110" />}
                  <h2 className="text-2xl font-semibold text-brand-primary mb-3">{category.title}</h2>
                  <p className="text-brand-text-secondary text-sm mb-6 flex-grow">{category.description}</p>
                  <span className="flex items-center text-brand-accent font-medium group-hover:underline">
                    Ver Serviços <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-brand-text-secondary">Nenhuma categoria de serviço encontrada.</p>
      )}
    </div>
  );
};

export default ServicesLandingPage;
