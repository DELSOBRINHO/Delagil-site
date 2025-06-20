import React from 'react';
import Header from './Header';
import Footer from './Footer';
import SkipToContent from '../a11y/SkipToContent';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-brand-background text-brand-text-primary">
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-grow" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
