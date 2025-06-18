
import { LucideIcon } from 'lucide-react';

export interface NavLinkItem {
  label: string;
  path: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  iconName: keyof typeof import('lucide-react'); // To be mapped to actual icon component
}

export interface Service {
  id: string;
  categoryId: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  iconName: keyof typeof import('lucide-react'); // To be mapped to actual icon component
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link?: string; // Optional link to live project or case study
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  serviceInterest?: string[]; // Array of service IDs or names
  message: string;
}

// Represents the structure of grounding chunks from Google Search if it were used
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  retrievedContext?: {
    uri: string;
    title: string;
  };
}
