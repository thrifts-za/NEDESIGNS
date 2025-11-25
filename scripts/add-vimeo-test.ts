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

async function addVimeoTest() {
  try {
    console.log('Adding test Vimeo URL to Angama project...\n');

    // Fetch the Angama project
    const project = await client.fetch(`*[_type == "graphicDesign" && slug.current == "angama-assessment"][0]`);

    if (!project) {
      console.error('Angama project not found!');
      process.exit(1);
    }

    // Update with Vimeo URL
    await client
      .patch(project._id)
      .set({
        vimeoUrl: 'https://vimeo.com/1140274315',
      })
      .commit();

    console.log('✅ Vimeo URL added to Angama project!');
    console.log('Visit: http://localhost:3000/graphic-design/angama-assessment to see it in action');
  } catch (error) {
    console.error('Error adding Vimeo URL:', error);
    process.exit(1);
  }
}

addVimeoTest();
