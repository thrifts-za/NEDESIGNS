import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface GraphicDesign {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: SanityImageSource;
  gallery?: SanityImageSource[];
  category: string;
  description?: string;
  client?: string;
  year?: number;
  featured?: boolean;
  order?: number;
}

export interface WebProject {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  mainImage: SanityImageSource;
  gallery?: SanityImageSource[];
  liveUrl?: string;
  githubUrl?: string;
  technologies?: string[];
  category?: string;
  client?: string;
  year?: number;
  featured?: boolean;
  order?: number;
}

export interface Client {
  _id: string;
  name: string;
  logo: SanityImageSource;
  website?: string;
  testimonial?: string;
  role?: string;
  order?: number;
}

export interface Skill {
  _id: string;
  name: string;
  icon?: SanityImageSource;
  category: string;
  proficiency?: string;
  order?: number;
}

export interface FeaturedProjects {
  graphicDesign: GraphicDesign[];
  webProjects: WebProject[];
}
