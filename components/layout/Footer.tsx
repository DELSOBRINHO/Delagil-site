
import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_TITLE, SOCIAL_MEDIA_LINKS } from '../../constants';
import { Linkedin, Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-secondary text-gray-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-brand-text-on-primary mb-4">{SITE_TITLE}</h3>
            <p className="text-sm">Impulsionando o seu negócio com soluções inovadoras em marketing, consultoria e tecnologia.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-text-on-primary mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="hover:text-brand-accent-alt transition-colors">Sobre Nós</Link></li>
              <li><Link to="/servicos" className="hover:text-brand-accent-alt transition-colors">Serviços</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand-accent-alt transition-colors">Portfólio</Link></li>
              <li><Link to="/contato" className="hover:text-brand-accent-alt transition-colors">Contato</Link></li>
              <li><Link to="/politica-de-privacidade" className="hover:text-brand-accent-alt transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-brand-text-on-primary mb-4">Conecte-se</h3>
            <div className="flex space-x-4 mb-4">
              <a href={SOCIAL_MEDIA_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent-alt transition-colors"><Linkedin size={24} /></a>
              <a href={SOCIAL_MEDIA_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent-alt transition-colors"><Instagram size={24} /></a>
              <a href={SOCIAL_MEDIA_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent-alt transition-colors"><Facebook size={24} /></a>
            </div>
            <p className="text-sm flex items-center mb-1"><Mail size={16} className="mr-2"/> contato@delagil.com.br</p>
            <p className="text-sm flex items-center"><Phone size={16} className="mr-2"/> (XX) XXXXX-XXXX</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} {SITE_TITLE}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
