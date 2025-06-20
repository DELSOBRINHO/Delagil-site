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

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  problemStatement: string;
  solutionProvided: string;
  resultsAchieved: string[]; // Array of strings for bullet points
  technologiesUsed: string[];
  imageUrl: string;
  category: string;
  testimonial?: {
    quote: string;
    author: string;
  };
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
