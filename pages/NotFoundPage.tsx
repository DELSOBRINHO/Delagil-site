
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]"> {/* Adjust min-h based on header/footer height */}
      <AlertTriangle size={64} className="text-brand-accent-alt mb-8" />
      <h1 className="text-6xl font-extrabold text-brand-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-brand-secondary mb-6">Página Não Encontrada</h2>
      <p className="text-lg text-brand-text-secondary mb-10 max-w-md">
        Oops! Parece que a página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          Voltar para a Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
