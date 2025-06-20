import React, { useState, useEffect } from 'react';
import { getCaseStudies } from '../services/supabaseService';
import { CaseStudy } from '../types';
import CaseStudyCard from '../components/casestudies/CaseStudyCard';
import SEOHead from '../components/SEOHead';
import { Search, Filter, X } from 'lucide-react';

const CaseStudiesPage: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Get unique categories from case studies
  const categories = Array.from(new Set(caseStudies.map(cs => cs.category)));

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
        setFilteredCaseStudies(data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  useEffect(() => {
    // Filter case studies based on search term and category
    let filtered = caseStudies;

    if (searchTerm) {
      filtered = filtered.filter(cs =>
        cs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cs.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cs.problemStatement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cs.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(cs => cs.category === selectedCategory);
    }

    setFilteredCaseStudies(filtered);
  }, [caseStudies, searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  const hasActiveFilters = searchTerm || selectedCategory;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4">Carregando cases de sucesso...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Cases de Sucesso - Delagil"
        description="Explore nossos cases de sucesso e veja como ajudamos empresas a alcançarem resultados extraordinários através de soluções digitais inovadoras."
        keywords="cases de sucesso, projetos, resultados, clientes, transformação digital"
        ogImage="/og-cases.jpg"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Nossos Cases de Sucesso
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Descubra como ajudamos empresas a transformarem seus desafios em oportunidades de crescimento através de soluções digitais inovadoras.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por título, cliente ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="text-gray-800">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-3 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-lg transition-colors"
                >
                  <X size={16} />
                  Limpar Filtros
                </button>
              )}
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-accent text-white text-sm rounded-full">
                    Busca: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-accent text-white text-sm rounded-full">
                    Categoria: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('')}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-white/80">
              {filteredCaseStudies.length} {filteredCaseStudies.length === 1 ? 'case encontrado' : 'cases encontrados'}
              {hasActiveFilters && ` de ${caseStudies.length} total`}
            </p>
          </div>

          {/* Case Studies Grid */}
          {filteredCaseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <Search className="mx-auto text-white/50 mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nenhum case encontrado
                </h3>
                <p className="text-white/70 mb-4">
                  {hasActiveFilters 
                    ? 'Tente ajustar os filtros ou termos de busca.'
                    : 'Não há cases de sucesso disponíveis no momento.'
                  }
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-lg transition-colors"
                  >
                    <X size={16} />
                    Limpar Filtros
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CaseStudiesPage; 