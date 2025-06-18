
import React, { useEffect, useState } from 'react';
import { PortfolioItem } from '../types';
import { getPortfolioItems } from '../services/supabaseService';
import PortfolioCard from '../components/portfolio/PortfolioCard';

const PortfolioPage: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all'); // 'all' or specific category

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const items = await getPortfolioItems();
        setPortfolioItems(items);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os itens do portfólio.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchItems();
  }, []);

  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  if (loading) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">Carregando portfólio...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4">Nosso Portfólio</h1>
        <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
          Veja alguns dos projetos e resultados que entregamos para nossos clientes.
        </p>
      </header>

      {/* Filter Options - Optional */}
      <div className="mb-8 flex justify-center space-x-2 sm:space-x-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-sm font-medium transition-colors
              ${filter === cat 
                ? 'bg-brand-primary text-brand-text-on-primary' 
                : 'bg-brand-surface text-brand-text-secondary hover:bg-gray-300'}`}
          >
            {cat === 'all' ? 'Todos' : cat}
          </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-brand-text-secondary">Nenhum projeto encontrado para esta categoria.</p>
      )}
    </div>
  );
};

export default PortfolioPage;
