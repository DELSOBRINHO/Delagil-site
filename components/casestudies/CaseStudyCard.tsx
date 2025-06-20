import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import { CaseStudy } from '../../types';
import { ArrowRight } from 'lucide-react';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy }) => {
  return (
    <Link to={`/cases-de-sucesso/${caseStudy.slug}`} className="group block">
      <Card hoverEffect className="h-full flex flex-col">
        <div className="relative overflow-hidden rounded-t-lg h-48">
          <img 
            src={caseStudy.imageUrl} 
            alt={`Imagem do case de sucesso: ${caseStudy.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-brand-accent text-white text-xs font-semibold px-2 py-1 rounded">
            {caseStudy.category}
          </div>
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
            {caseStudy.title}
          </h3>
          <p className="text-sm text-brand-text-secondary mb-4 flex-grow">
            {caseStudy.problemStatement.substring(0, 100)}...
          </p>
          <div className="mt-auto flex items-center text-brand-accent font-semibold">
            <span>Ver Estudo de Caso</span>
            <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CaseStudyCard; 