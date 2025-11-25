import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource | string) {
  // If source is a string (local path), return it directly
  if (typeof source === 'string') {
    return {
      url: () => source,
      width: () => ({ url: () => source }),
      height: () => ({ url: () => source }),
    } as any;
  }

  // If Sanity is not configured, return placeholder
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'placeholder') {
    return {
      url: () => '/placeholder.png',
      width: () => ({ url: () => '/placeholder.png' }),
      height: () => ({ url: () => '/placeholder.png' }),
    } as any;
  }

  // Use Sanity image builder
  return builder.image(source);
}

export const GRAPHIC_DESIGN_QUERY = `*[_type == "graphicDesign"] | order(order asc, _createdAt desc) {
  _id,
  title,
  slug,
  mainImage,
  vimeoUrl,
  gallery,
  category,
  description,
  client,
  year,
  featured,
  order
}`;

export const WEB_PROJECT_QUERY = `*[_type == "webProject"] | order(order asc, _createdAt desc) {
  _id,
  title,
  slug,
  description,
  mainImage,
  vimeoUrl,
  gallery,
  liveUrl,
  githubUrl,
  technologies,
  category,
  client,
  year,
  featured,
  order
}`;

export const CLIENT_QUERY = `*[_type == "client"] | order(order asc, _createdAt desc) {
  _id,
  name,
  logo,
  website,
  testimonial,
  role,
  order
}`;

export const SKILL_QUERY = `*[_type == "skill"] | order(category asc, order asc) {
  _id,
  name,
  icon,
  category,
  proficiency,
  order
}`;

export const FEATURED_PROJECTS_QUERY = `{
  "graphicDesign": *[_type == "graphicDesign" && featured == true] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    mainImage,
    category
  },
  "webProjects": *[_type == "webProject" && featured == true] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    mainImage,
    description,
    liveUrl,
    technologies
  }
}`;

export const SHOWREEL_VIDEO_QUERY = `*[_type == "showreelVideo"] | order(order asc) {
  _id,
  title,
  vimeoUrl,
  order
}`;

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  siteTitle,
  navigation {
    menuItems[] {
      label,
      href
    },
    ctaButtonText,
    ctaButtonLink
  },
  sectionTitles {
    graphicDesign {
      title,
      subtitle
    },
    webProjects {
      title,
      subtitle
    },
    clients {
      title,
      subtitle
    },
    contact {
      title,
      subtitle
    }
  },
  footer {
    description,
    socialLinks[] {
      platform,
      url
    }
  },
  sections {
    showHero,
    showGraphicDesign,
    showWebProjects,
    showClients,
    showSkills,
    showContact
  }
}`;
