
import React from 'react';
import { Service } from '../../types';
import Card from '../ui/Card';
import * as LucideIcons from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const IconComponent = LucideIcons[service.iconName] as LucideIcons.LucideIcon;

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center mb-4">
        {IconComponent && <IconComponent size={36} className="text-brand-primary mr-4" />}
        <h3 className="text-xl font-semibold text-brand-primary">{service.title}</h3>
      </div>
      <p className="text-brand-text-secondary text-sm mb-3 flex-grow">{service.shortDescription}</p>
      <p className="text-brand-text-secondary text-sm">{service.longDescription}</p>
    </Card>
  );
};

export default ServiceCard;
