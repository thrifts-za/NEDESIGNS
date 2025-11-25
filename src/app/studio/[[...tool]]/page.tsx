'use client';

import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from '@/../sanity/schemas';

const config = defineConfig({
  name: 'default',
  title: 'NE Designs Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mrjxk0gk',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
