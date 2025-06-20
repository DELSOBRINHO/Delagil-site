import React, { useState, FormEvent } from 'react';
import { ContactFormData, Service } from '../../types';
import Button from '../ui/Button';
import { submitContactForm } from '../../services/supabaseService';

interface ContactFormProps {
  availableServices?: Pick<Service, 'id' | 'title'>[];
  onSubmitSuccess?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ availableServices, onSubmitSuccess }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: [],
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentInterests = prev.serviceInterest || [];
      if (checked) {
        return { ...prev, serviceInterest: [...currentInterests, value] };
      } else {
        return { ...prev, serviceInterest: currentInterests.filter(interest => interest !== value) };
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        setFormData({ name: '', email: '', phone: '', company: '', serviceInterest: [], message: '' });
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        setError(result.error || 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-brand-surface p-8 rounded-lg shadow-xl">
      {error && <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}
      {success && <div className="p-3 bg-green-100 text-green-700 rounded-md">{success}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-text-secondary">Nome Completo *</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-brand-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text-secondary">E-mail *</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-brand-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-text-secondary">Telefone</label>
          <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-brand-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-brand-text-secondary">Empresa</label>
          <input type="text" name="company" id="company" value={formData.company} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-brand-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
        </div>
      </div>

      {availableServices && availableServices.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-brand-text-secondary">Serviços de Interesse</label>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {availableServices.map(service => (
              <label key={service.id} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  name="serviceInterest"
                  value={service.id}
                  checked={formData.serviceInterest?.includes(service.id)}
                  onChange={handleServiceInterestChange}
                  className="h-4 w-4 text-brand-accent border-gray-300 rounded focus:ring-brand-accent"
                />
                <span className="text-sm text-brand-text-secondary">{service.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-text-secondary">Mensagem *</label>
        <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-brand-border rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary sm:text-sm"></textarea>
      </div>

      <div>
        <Button type="submit" variant="primary" size="lg" isLoading={isLoading} className="w-full md:w-auto">
          Enviar Mensagem
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
