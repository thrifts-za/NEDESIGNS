import { createClient } from '@sanity/client';
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

async function updateHeroSettings() {
  try {
    console.log('Updating Site Settings with hero content...\n');

    // Fetch existing site settings
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`);

    if (!settings) {
      console.error('No site settings found. Please run the seed script first.');
      process.exit(1);
    }

    // Update with hero content
    await client
      .patch(settings._id)
      .set({
        hero: {
          title: 'NEDESIGNS',
          subtitle: 'Graphic Designer & Web Developer',
          description: 'Creating clean, modern designs and building powerful web experiences for clients and brands worldwide.',
          primaryButtonText: 'View My Work',
          primaryButtonLink: '#work',
          secondaryButtonText: 'Book a Call',
          secondaryButtonLink: 'https://calendly.com/nedesigns/nedesigns-intro',
        },
      })
      .commit();

    console.log('✅ Site Settings updated with hero content!');
  } catch (error) {
    console.error('Error updating site settings:', error);
    process.exit(1);
  }
}

updateHeroSettings();
