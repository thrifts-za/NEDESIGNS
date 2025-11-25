import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Initialize Sanity client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Helper function to generate unique keys for array items
function generateKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to upload image to Sanity
async function uploadImage(imagePath: string): Promise<any> {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`Image not found: ${fullPath}`);
      return null;
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath),
    });

    return {
      _key: generateKey(),
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Error uploading image ${imagePath}:`, error);
    return null;
  }
}

// Helper function to upload multiple images
async function uploadImages(imagePaths: string[]): Promise<any[]> {
  const images = [];
  for (const imagePath of imagePaths) {
    const image = await uploadImage(imagePath);
    if (image) {
      images.push(image);
    }
  }
  return images;
}

// Helper function to get image files from a directory
function getImagesFromFolder(folderPath: string, limit: number = 20): string[] {
  try {
    const fullPath = path.join(process.cwd(), 'public', folderPath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`Folder not found: ${fullPath}`);
      return [];
    }

    const files = fs.readdirSync(fullPath);
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file))
      .sort()
      .slice(0, limit)
      .map(file => path.join(folderPath, file).replace(/\\/g, '/'));

    return imageFiles;
  } catch (error) {
    console.error(`Error reading folder ${folderPath}:`, error);
    return [];
  }
}

// Seed Graphic Design Projects
async function seedGraphicDesigns() {
  console.log('Seeding Graphic Design Projects...');

  const projects = [
    {
      _id: 'graphicDesign-angama-assessment',
      _type: 'graphicDesign',
      title: 'Angama Assessment Project',
      slug: { current: 'angama-assessment' },
      mainImage: '/portfolio/graphic/Angama_Assessment_Nkosi/1.jpg',
      vimeoUrl: 'https://vimeo.com/1140274315',
      gallery: [
        '/portfolio/graphic/Angama_Assessment_Nkosi/2.jpg',
        '/portfolio/graphic/Angama_Assessment_Nkosi/3.jpg',
        '/portfolio/graphic/Angama_Assessment_Nkosi/4.jpg',
        '/portfolio/graphic/Angama_Assessment_Nkosi/5.jpg',
        '/portfolio/graphic/Angama_Assessment_Nkosi/6.jpg',
        '/portfolio/graphic/Angama_Assessment_Nkosi/7.jpg',
        '/portfolio/graphic/Angama_Assessment_Nkosi/8.jpg',
        '/portfolio/graphic/Angama_Assessment_Nkosi/9.jpg',
        '/portfolio/graphic/Angama_Assessment_Nkosi/10.jpg',
      ],
      category: 'branding',
      description: 'Comprehensive brand identity and assessment project featuring modern design principles',
      client: 'Angama',
      year: 2024,
      featured: true,
      order: 1,
    },
    {
      _id: 'graphicDesign-vertex-design',
      _type: 'graphicDesign',
      title: 'Vertex Design Project',
      slug: { current: 'vertex-design' },
      mainImage: '/portfolio/graphic/Vertex_Nkosi/1.jpg',
      gallery: [
        '/portfolio/graphic/Vertex_Nkosi/2.jpg',
        '/portfolio/graphic/Vertex_Nkosi/3.jpg',
        '/portfolio/graphic/Vertex_Nkosi/4.jpg',
        '/portfolio/graphic/Vertex_Nkosi/5.jpg',
        '/portfolio/graphic/Vertex_Nkosi/6.jpg',
        '/portfolio/graphic/Vertex_Nkosi/7.jpg',
        '/portfolio/graphic/Vertex_Nkosi/8.jpg',
      ],
      category: 'branding',
      description: 'Modern brand identity design with clean lines and contemporary aesthetics',
      client: 'Vertex',
      year: 2024,
      featured: true,
      order: 2,
    },
    {
      _id: 'graphicDesign-my-soul-knows-book',
      _type: 'graphicDesign',
      title: 'My Soul Knows - Book Design',
      slug: { current: 'my-soul-knows-book' },
      mainImage: '/portfolio/graphic/My Soul Knows Book/18.jpg',
      gallery: ['/portfolio/graphic/My Soul Knows Book/19.jpg'],
      category: 'print',
      description: 'Book cover and layout design featuring elegant typography and spiritual themes',
      year: 2024,
      featured: false,
      order: 3,
    },
    {
      _id: 'graphicDesign-electrocom-x',
      _type: 'graphicDesign',
      title: 'Electrocom X Campaign',
      slug: { current: 'electrocom-x' },
      mainImage: '/portfolio/graphic/X Submission/Electrocom X/1.jpg',
      gallery: [
        '/portfolio/graphic/X Submission/Electrocom X/2.jpg',
        '/portfolio/graphic/X Submission/Electrocom X/3.jpg',
        '/portfolio/graphic/X Submission/Electrocom X/4.jpg',
        '/portfolio/graphic/X Submission/Electrocom X/5.jpg',
        '/portfolio/graphic/X Submission/Electrocom X/6.jpg',
        '/portfolio/graphic/X Submission/Electrocom X/7.jpg',
        '/portfolio/graphic/X Submission/Electrocom X/8.jpg',
      ],
      category: 'social',
      description: 'Social media campaign design for Electrocom with bold visuals and engaging content',
      client: 'Electrocom',
      year: 2024,
      featured: true,
      order: 4,
    },
    {
      _id: 'graphicDesign-x-submission',
      _type: 'graphicDesign',
      title: 'X Submission Portfolio',
      slug: { current: 'x-submission' },
      mainImage: '/portfolio/graphic/X Submission/1.jpg',
      gallery: [
        '/portfolio/graphic/X Submission/2.jpg',
        '/portfolio/graphic/X Submission/3.jpg',
        '/portfolio/graphic/X Submission/4.jpg',
        '/portfolio/graphic/X Submission/5.jpg',
        '/portfolio/graphic/X Submission/6.jpg',
        '/portfolio/graphic/X Submission/7.jpg',
        '/portfolio/graphic/X Submission/8.jpg',
        '/portfolio/graphic/X Submission/9.jpg',
        '/portfolio/graphic/X Submission/10.jpg',
      ],
      category: 'uiux',
      description: 'Diverse portfolio submission showcasing various design styles and techniques',
      year: 2024,
      featured: false,
      order: 5,
    },
    {
      _id: 'graphicDesign-12-rock',
      _type: 'graphicDesign',
      title: '12 Rock',
      slug: { current: '12-rock' },
      mainImage: '/portfolio/graphic/12 Rock/1.jpg',
      gallery: getImagesFromFolder('/portfolio/graphic/12 Rock', 20).slice(1),
      category: 'logo',
      description: 'Logo design and brand identity featuring bold typography and contemporary aesthetics',
      client: '12 Rock',
      year: 2024,
      featured: false,
      order: 6,
    },
    {
      _id: 'graphicDesign-apparel',
      _type: 'graphicDesign',
      title: 'Apparel Design Collection',
      slug: { current: 'apparel-design' },
      mainImage: '/portfolio/graphic/Apparel/1.jpg',
      gallery: getImagesFromFolder('/portfolio/graphic/Apparel', 20).slice(1),
      category: 'print',
      description: 'T-shirt and apparel designs featuring embroidered logos and modern streetwear aesthetics',
      client: 'Diesel Innovations',
      year: 2023,
      featured: false,
      order: 7,
    },
    {
      _id: 'graphicDesign-books',
      _type: 'graphicDesign',
      title: 'Book Cover Designs',
      slug: { current: 'book-covers' },
      mainImage: '/portfolio/graphic/Books/1.jpg',
      gallery: getImagesFromFolder('/portfolio/graphic/Books', 20).slice(1),
      category: 'print',
      description: 'Book cover and layout designs with elegant typography and compelling visual narratives',
      year: 2024,
      featured: false,
      order: 8,
    },
    {
      _id: 'graphicDesign-diesel-innovation',
      _type: 'graphicDesign',
      title: 'Diesel Innovation',
      slug: { current: 'diesel-innovation' },
      mainImage: '/portfolio/graphic/Diesel Innovation/1.jpg',
      gallery: getImagesFromFolder('/portfolio/graphic/Diesel Innovation', 20).slice(1),
      category: 'logo',
      description: 'Modern logo design and brand identity system for Diesel Innovation',
      client: 'Diesel Innovation',
      year: 2023,
      featured: false,
      order: 9,
    },
    {
      _id: 'graphicDesign-hearts-c-psychology',
      _type: 'graphicDesign',
      title: 'Hearts C Psychology Clinic',
      slug: { current: 'hearts-c-psychology' },
      mainImage: '/portfolio/graphic/Hearts C Psychology Clinic X/Asset 1.svg',
      gallery: getImagesFromFolder('/portfolio/graphic/Hearts C Psychology Clinic X', 20).slice(1),
      category: 'branding',
      description: 'Comprehensive brand identity package for Hearts C Psychology Clinic featuring modern design and professional aesthetics',
      client: 'Hearts C Psychology Clinic',
      year: 2023,
      featured: false,
      order: 10,
    },
    {
      _id: 'graphicDesign-nueva-modo',
      _type: 'graphicDesign',
      title: 'Nueva Modo',
      slug: { current: 'nueva-modo' },
      mainImage: '/portfolio/graphic/Nueva Modo/1.jpg',
      gallery: getImagesFromFolder('/portfolio/graphic/Nueva Modo', 20).slice(1),
      category: 'print',
      description: 'Product photography and catalog design work featuring clean layouts and contemporary styling',
      client: 'Nueva Modo',
      year: 2021,
      featured: false,
      order: 11,
    },
    {
      _id: 'graphicDesign-paddington',
      _type: 'graphicDesign',
      title: 'Paddington',
      slug: { current: 'paddington' },
      mainImage: '/portfolio/graphic/Paddington/1.jpg',
      gallery: getImagesFromFolder('/portfolio/graphic/Paddington', 20).slice(1),
      category: 'illustration',
      description: 'Vibrant illustration work and sticker designs featuring playful characters and creative brand applications',
      client: 'Paddington',
      year: 2023,
      featured: false,
      order: 12,
    },
    {
      _id: 'graphicDesign-print-collection',
      _type: 'graphicDesign',
      title: 'Print Design Collection',
      slug: { current: 'print-collection' },
      mainImage: '/portfolio/graphic/Print/1.jpg',
      gallery: getImagesFromFolder('/portfolio/graphic/Print', 20).slice(1),
      category: 'print',
      description: 'Diverse print design work including book covers and promotional materials',
      year: 2021,
      featured: false,
      order: 13,
    },
    {
      _id: 'graphicDesign-random',
      _type: 'graphicDesign',
      title: 'Creative Portfolio',
      slug: { current: 'creative-portfolio' },
      mainImage: '/portfolio/graphic/Random/1.jpg',
      gallery: getImagesFromFolder('/portfolio/graphic/Random', 20).slice(1),
      category: 'other',
      description: 'A diverse collection showcasing various design styles, techniques, and creative explorations',
      year: 2024,
      featured: false,
      order: 14,
    },
    {
      _id: 'graphicDesign-special-sundays',
      _type: 'graphicDesign',
      title: 'Special Sundays',
      slug: { current: 'special-sundays' },
      mainImage: '/portfolio/graphic/Special Sundays/Asset 1.png',
      gallery: getImagesFromFolder('/portfolio/graphic/Special Sundays', 20).slice(1),
      category: 'branding',
      description: 'Complete brand identity and logo design for Special Sundays, featuring modern typography and vibrant visual elements',
      client: 'Special Sundays',
      year: 2023,
      featured: false,
      order: 15,
    },
    {
      _id: 'graphicDesign-njoy',
      _type: 'graphicDesign',
      title: "n'joy Juice Packaging",
      slug: { current: 'njoy-packaging' },
      mainImage: "/portfolio/graphic/n'joy/1.jpg",
      gallery: getImagesFromFolder("/portfolio/graphic/n'joy", 20).slice(1),
      category: 'branding',
      description: "Complete packaging design and brand identity for n'joy juice products featuring vibrant colors and fresh, modern aesthetics",
      client: "n'joy",
      year: 2023,
      featured: true,
      order: 16,
    },
  ];

  for (const project of projects) {
    console.log(`Uploading ${project.title}...`);

    // Upload main image
    const mainImage = await uploadImage(project.mainImage);

    // Upload gallery images
    const gallery = await uploadImages(project.gallery);

    // Create document
    await client.createOrReplace({
      ...project,
      mainImage,
      gallery,
    } as any);

    console.log(`✓ ${project.title} uploaded`);
  }
}

// Seed Web Projects
async function seedWebProjects() {
  console.log('\nSeeding Web Projects...');

  const projects = [
    {
      _id: 'webProject-protenders',
      _type: 'webProject',
      title: 'ProTenders South Africa',
      slug: { current: 'protenders' },
      description: 'Comprehensive government tenders platform connecting businesses with over 48,000 tender opportunities across South Africa. Built with modern web technologies and optimized user experience.',
      mainImage: '/portfolio/website/ProTenders.co.za/Screenshot 2025-11-24 at 14-16-08 Government Tenders South Africa 48 000 Opportunities ProTenders.png',
      gallery: [
        '/portfolio/website/ProTenders.co.za/Screenshot 2025-11-24 at 14-16-20 Government Tenders South Africa 48 000 Opportunities ProTenders.png',
        '/portfolio/website/ProTenders.co.za/Screenshot 2025-11-24 at 14-16-33 Government Tenders South Africa 48 000 Opportunities ProTenders.png',
      ],
      liveUrl: 'https://protenders.co.za',
      technologies: ['WordPress', 'PHP', 'MySQL', 'JavaScript', 'Custom API Integration'],
      category: 'webapp',
      client: 'ProTenders',
      year: 2024,
      featured: true,
      order: 1,
    },
    {
      _id: 'webProject-sweet-peach-club',
      _type: 'webProject',
      title: 'The Sweet Peach Club',
      slug: { current: 'sweet-peach-club' },
      description: 'E-commerce Shopify store for The Sweet Peach Club, featuring modern design, seamless shopping experience, and optimized product displays for online retail.',
      mainImage: '/portfolio/website/The Sweet Peach Club Shopify/1.png',
      gallery: getImagesFromFolder('/portfolio/website/The Sweet Peach Club Shopify', 18).slice(1),
      technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'E-commerce'],
      category: 'ecommerce',
      client: 'The Sweet Peach Club',
      year: 2024,
      featured: true,
      order: 2,
    },
    {
      _id: 'webProject-zibastyles',
      _type: 'webProject',
      title: 'ZibaStyles',
      slug: { current: 'zibastyles' },
      description: 'Modern Shopify e-commerce platform for ZibaStyles, featuring clean product layouts, intuitive navigation, and seamless checkout experience.',
      mainImage: '/portfolio/website/ZibaStyles Shopify/1.png',
      gallery: getImagesFromFolder('/portfolio/website/ZibaStyles Shopify', 16).slice(1),
      technologies: ['Shopify', 'Liquid', 'JavaScript', 'CSS', 'E-commerce'],
      category: 'ecommerce',
      client: 'ZibaStyles',
      year: 2024,
      featured: false,
      order: 3,
    },
  ];

  for (const project of projects) {
    console.log(`Uploading ${project.title}...`);

    const mainImage = await uploadImage(project.mainImage);
    const gallery = await uploadImages(project.gallery);

    await client.createOrReplace({
      ...project,
      mainImage,
      gallery,
    } as any);

    console.log(`✓ ${project.title} uploaded`);
  }
}

// Seed Skills
async function seedSkills() {
  console.log('\nSeeding Skills...');

  const skills = [
    {
      _id: 'skill-wordpress',
      _type: 'skill',
      name: 'WordPress',
      icon: '/logos/wordpress-seeklogo.png',
      category: 'development',
      proficiency: 'expert',
      order: 1,
    },
    {
      _id: 'skill-woocommerce',
      _type: 'skill',
      name: 'WooCommerce',
      icon: '/logos/woocommerce-seeklogo.png',
      category: 'plugins',
      proficiency: 'expert',
      order: 2,
    },
    {
      _id: 'skill-shopify',
      _type: 'skill',
      name: 'Shopify',
      icon: '/logos/shopify-seeklogo.png',
      category: 'development',
      proficiency: 'advanced',
      order: 3,
    },
    {
      _id: 'skill-memberpress',
      _type: 'skill',
      name: 'MemberPress',
      icon: '/logos/memberpress-seeklogo.png',
      category: 'plugins',
      proficiency: 'advanced',
      order: 4,
    },
    {
      _id: 'skill-adobe-creative-cloud',
      _type: 'skill',
      name: 'Adobe Creative Cloud',
      icon: '/logos/Adobe_Creative_Cloud_rainbow_icon.svg.png',
      category: 'design',
      proficiency: 'expert',
      order: 5,
    },
    {
      _id: 'skill-figma',
      _type: 'skill',
      name: 'Figma',
      icon: '/logos/figma-seeklogo.svg',
      category: 'design',
      proficiency: 'expert',
      order: 6,
    },
    {
      _id: 'skill-nextjs',
      _type: 'skill',
      name: 'Next.js',
      icon: '/logos/next-js-seeklogo.png',
      category: 'frameworks',
      proficiency: 'advanced',
      order: 7,
    },
  ];

  for (const skill of skills) {
    console.log(`Uploading ${skill.name}...`);

    let icon = null;
    if (skill.icon) {
      icon = await uploadImage(skill.icon);
    }

    await client.createOrReplace({
      ...skill,
      icon,
    });

    console.log(`✓ ${skill.name} uploaded`);
  }
}

// Seed Site Settings
async function seedSiteSettings() {
  console.log('\nSeeding Site Settings...');

  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'NEDESIGNS',
    hero: {
      title: 'NEDESIGNS',
      subtitle: 'Graphic Designer & Web Developer',
      description: 'Creating clean, modern designs and building powerful web experiences for clients and brands worldwide.',
      primaryButtonText: 'View My Work',
      primaryButtonLink: '#work',
      secondaryButtonText: 'Book a Call',
      secondaryButtonLink: 'https://calendly.com/nedesigns/nedesigns-intro',
    },
    sections: {
      showHero: true,
      showGraphicDesign: true,
      showWebProjects: true,
      showClients: true,
      showSkills: true,
      showContact: true,
    },
  });

  console.log('✓ Site Settings created');
}

// Main function
async function main() {
  try {
    console.log('Starting Sanity data seeding...\n');

    await seedGraphicDesigns();
    await seedWebProjects();
    await seedSkills();
    await seedSiteSettings();

    console.log('\n✅ All data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

main();
