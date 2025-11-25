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

// Helper function to generate unique keys for array items
function generateKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

async function fixGalleryKeys() {
  try {
    console.log('Fetching documents with galleries...\n');

    // Fetch all documents with galleries
    const docs = await client.fetch(`
      *[_type in ["graphicDesign", "webProject"] && defined(gallery)]
    `);

    console.log(`Found ${docs.length} documents with galleries\n`);

    let fixedCount = 0;
    let skippedCount = 0;

    for (const doc of docs) {
      if (doc.gallery && Array.isArray(doc.gallery)) {
        // Check if any items are missing _key
        const hasMissingKeys = doc.gallery.some((item: any) => !item._key);

        if (hasMissingKeys) {
          console.log(`Fixing ${doc._type}: ${doc.title || doc._id}`);

          // Add _key to items that don't have it
          const updatedGallery = doc.gallery.map((item: any) => ({
            ...item,
            _key: item._key || generateKey(),
          }));

          // Update the document
          await client
            .patch(doc._id)
            .set({ gallery: updatedGallery })
            .commit();

          console.log(`✓ Fixed ${doc.gallery.length} gallery items\n`);
          fixedCount++;
        } else {
          console.log(`Skipped ${doc._type}: ${doc.title || doc._id} (already has keys)`);
          skippedCount++;
        }
      }
    }

    console.log('\n✅ Migration complete!');
    console.log(`   Fixed: ${fixedCount} documents`);
    console.log(`   Skipped: ${skippedCount} documents (already had keys)`);
  } catch (error) {
    console.error('Error fixing gallery keys:', error);
    process.exit(1);
  }
}

fixGalleryKeys();
