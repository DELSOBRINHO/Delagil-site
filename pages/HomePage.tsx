import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ContactForm from '../components/forms/ContactForm';
import SEOHead from '../components/seo/SEOHead';
import { SITE_SLOGAN } from '../constants';
import { Service, Testimonial, PortfolioItem } from '../types';
import { getServices, getTestimonials, getPortfolioItems } from '../services/supabaseService';
import * as LucideIcons from 'lucide-react';
import { ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const [highlightServices, setHighlightServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const allServices = await getServices();
        setHighlightServices(allServices.slice(0, 3)); // Show first 3 services
        const fetchedTestimonials = await getTestimonials();
        setTestimonials(fetchedTestimonials);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchHomePageData();
  }, []);

  return (
    <>
      <SEOHead 
        title="Delagil: Impulsione o seu Negócio - Marketing Digital, Consultoria e Tecnologia"
        description="Transforme seu negócio com soluções inovadoras em Marketing Digital, Consultoria Estratégica e Tecnologia. Especialistas em SEO, mídias sociais, desenvolvimento de software e cloud computing."
        keywords="marketing digital, consultoria estratégica, desenvolvimento de software, SEO, mídias sociais, aplicativos móveis, cloud computing, transformação digital"
        url="https://delagil-site.vercel.app"
      />
      <div className="space-y-16 md:space-y-24">
        {/* Hero Section */}
        <section 
          className="bg-gradient-to-r from-brand-primary to-brand-primary-dark text-brand-text-on-primary py-20 md:py-32"
          style={{ backgroundImage: "url('https://picsum.photos/seed/delagilhero/1920/600'), linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))", backgroundBlendMode: "overlay", backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-down">
              {SITE_SLOGAN}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto animate-fade-in-up">
              Soluções inovadoras em Marketing Digital, Consultoria Estratégica e Tecnologia para transformar o seu futuro.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="animate-bounce-once"
              rightIcon={<ChevronRight size={20} />}
            >
              Quero um Orçamento
            </Button>
          </div>
        </section>

        {/* Services Highlight Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-4">Nossas Especialidades</h2>
          <p className="text-center text-brand-text-secondary max-w-2xl mx-auto mb-12">
            Oferecemos um portfólio completo de serviços para atender às necessidades específicas do seu negócio e impulsionar seus resultados.
          </p>
          {highlightServices.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {highlightServices.map(service => {
                const IconComponent = LucideIcons[service.iconName] as LucideIcons.LucideIcon;
                return (
                  <Card key={service.id} className="p-6 text-center" hoverEffect>
                    {IconComponent && <IconComponent size={48} className="text-brand-accent mx-auto mb-4" />}
                    <h3 className="text-xl font-semibold text-brand-primary mb-2">{service.title}</h3>
                    <p className="text-sm text-brand-text-secondary mb-4">{service.shortDescription}</p>
                    <Link to={`/servicos/${service.categoryId}#${service.id}`}>
                       <Button variant="ghost" size="sm" rightIcon={<ChevronRight size={16}/>}>Saiba Mais</Button>
                    </Link>
                  </Card>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-brand-text-secondary">Carregando serviços...</p>
          )}
          <div className="text-center mt-12">
            <Link to="/servicos">
              <Button variant="secondary" size="lg">Ver Todos os Serviços</Button>
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <section className="bg-brand-surface py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-brand-primary mb-12">O que nossos Clientes Dizem</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(testimonial => (
                  <Card key={testimonial.id} className="p-6 bg-brand-background">
                    <p className="text-brand-text-secondary italic mb-4">"{testimonial.quote}"</p>
                    <p className="font-semibold text-brand-primary">{testimonial.author}</p>
                    <p className="text-sm text-brand-text-secondary">{testimonial.company}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Quick Contact Form Section */}
        <section id="contact-form-section" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center text-brand-primary mb-4">Fale Conosco</h2>
          <p className="text-center text-brand-text-secondary max-w-2xl mx-auto mb-12">
            Pronto para dar o próximo passo? Entre em contato conosco para uma consulta gratuita.
          </p>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
