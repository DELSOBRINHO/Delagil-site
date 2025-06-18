
import React from 'react';
import { PortfolioItem } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { ExternalLink } from 'lucide-react';

interface PortfolioCardProps {
  item: PortfolioItem;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
  return (
    <Card className="flex flex-col" hoverEffect>
      <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-brand-primary mb-2">{item.title}</h3>
        <p className="text-sm text-brand-text-secondary mb-1"><span className="font-medium">Categoria:</span> {item.category}</p>
        <p className="text-sm text-brand-text-secondary mb-4 flex-grow">{item.description}</p>
        {item.link && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(item.link, '_blank')}
            rightIcon={<ExternalLink size={16}/>}
            className="mt-auto"
          >
            Ver Projeto
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PortfolioCard;
