import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mrjxk0gk',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

const transformations = [
  {
    _type: 'transformation',
    title: 'Logo Redesign - Modern Minimalist',
    slug: {
      _type: 'slug',
      current: 'logo-redesign-minimalist',
    },
    description: 'Transformed a cluttered vintage logo into a clean, modern design that works across all platforms and sizes.',
    beforeImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-before-1',
      },
    },
    afterImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-after-1',
      },
    },
    category: 'logo',
    client: 'Tech Startup Co.',
    year: 2024,
    featured: true,
    order: 1,
  },
  {
    _type: 'transformation',
    title: 'Photo Restoration & Enhancement',
    slug: {
      _type: 'slug',
      current: 'photo-restoration-enhancement',
    },
    description: 'Restored and enhanced an old photograph, bringing it to life with modern color grading and detail recovery.',
    beforeImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-before-2',
      },
    },
    afterImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder-after-2',
      },
    },
    category: 'photo',
    client: 'Personal Project',
    year: 2024,
    featured: true,
    order: 2,
  },
];

async function uploadImage(imageUrl: string, title: string) {
  try {
    console.log(`Uploading image: ${title}...`);
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `${title}.jpg`,
    });
    console.log(`✓ Uploaded: ${title}`);
    return asset._id;
  } catch (error) {
    console.error(`Error uploading ${title}:`, error);
    return null;
  }
}

async function seedTransformations() {
  try {
    console.log('Starting transformation seeding...\n');

    // Sample placeholder images (you can replace these with actual before/after images)
    const beforeImage1 = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=800&fit=crop'; // Old style logo concept
    const afterImage1 = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=800&fit=crop'; // Modern minimal logo

    const beforeImage2 = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=800&fit=crop'; // Old photo
    const afterImage2 = 'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?w=1200&h=800&fit=crop'; // Enhanced photo

    // Upload images
    const beforeAsset1 = await uploadImage(beforeImage1, 'before-logo-redesign');
    const afterAsset1 = await uploadImage(afterImage1, 'after-logo-redesign');
    const beforeAsset2 = await uploadImage(beforeImage2, 'before-photo-restoration');
    const afterAsset2 = await uploadImage(afterImage2, 'after-photo-restoration');

    if (!beforeAsset1 || !afterAsset1 || !beforeAsset2 || !afterAsset2) {
      throw new Error('Failed to upload one or more images');
    }

    console.log('\nCreating transformation documents...\n');

    // Create first transformation
    const transformation1 = {
      ...transformations[0],
      beforeImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: beforeAsset1,
        },
      },
      afterImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: afterAsset1,
        },
      },
    };

    // Create second transformation
    const transformation2 = {
      ...transformations[1],
      beforeImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: beforeAsset2,
        },
      },
      afterImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: afterAsset2,
        },
      },
    };

    const result1 = await client.create(transformation1);
    console.log(`✓ Created: ${result1.title}`);

    const result2 = await client.create(transformation2);
    console.log(`✓ Created: ${result2.title}`);

    console.log('\n✅ Successfully seeded 2 transformations!');
    console.log('\nYou can view them at: http://localhost:3000/transformations');
    console.log('Or manage them in Sanity Studio: http://localhost:3000/studio');
  } catch (error) {
    console.error('Error seeding transformations:', error);
    process.exit(1);
  }
}

seedTransformations();
