
import React from 'react';
import ContactForm from '../components/forms/ContactForm';
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS } from '../constants';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-brand-primary mb-4">Entre em Contato</h1>
        <p className="text-xl text-brand-text-secondary max-w-3xl mx-auto">
          Estamos prontos para ouvir sobre seus desafios e discutir como podemos ajudar.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">Informações de Contato</h2>
            <div className="space-y-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center text-brand-text-secondary hover:text-brand-accent transition-colors">
                <Mail size={20} className="mr-3 text-brand-primary" />
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:${CONTACT_PHONE.replace(/\D/g, '')}`} className="flex items-center text-brand-text-secondary hover:text-brand-accent transition-colors">
                <Phone size={20} className="mr-3 text-brand-primary" />
                {CONTACT_PHONE}
              </a>
              {COMPANY_ADDRESS && (
                <p className="flex items-start text-brand-text-secondary">
                  <MapPin size={20} className="mr-3 mt-1 text-brand-primary flex-shrink-0" />
                  {COMPANY_ADDRESS}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-brand-primary mb-3">Horário de Atendimento</h3>
            <p className="text-brand-text-secondary">Segunda a Sexta: 9:00 - 18:00</p>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8">
             <h3 className="text-xl font-semibold text-brand-primary mb-3">Nossa Localização</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg shadow-md flex items-center justify-center">
              {/* Replace with embedded map iframe if needed */}
              <p className="text-gray-500">Mapa de localização (Google Maps)</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-brand-primary mb-6">Envie-nos uma Mensagem</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
