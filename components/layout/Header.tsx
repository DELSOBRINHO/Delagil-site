import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAVIGATION_LINKS, SITE_TITLE } from '../../constants';
import { Menu, X, Rocket } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-brand-primary shadow-lg sticky top-0 z-50" role="banner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-brand-text-on-primary hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-primary rounded"
            aria-label={`${SITE_TITLE} - Página inicial`}
          >
            <Rocket size={32} className="text-brand-accent" aria-hidden="true" />
            <span className="text-2xl font-bold">{SITE_TITLE}</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6" role="navigation" aria-label="Navegação principal">
            {NAVIGATION_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-primary
                   ${isActive 
                      ? 'bg-brand-primary-light text-brand-text-on-primary' 
                      : 'text-gray-300 hover:bg-brand-primary-dark hover:text-brand-text-on-primary'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="text-gray-300 hover:text-brand-text-on-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-text-on-primary p-2 rounded-md"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-brand-primary-dark"
          role="navigation"
          aria-label="Menu móvel"
        >
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAVIGATION_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleMenuClose}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-primary-dark
                   ${isActive 
                      ? 'bg-brand-primary-light text-brand-text-on-primary' 
                      : 'text-gray-300 hover:bg-brand-primary hover:text-brand-text-on-primary'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
