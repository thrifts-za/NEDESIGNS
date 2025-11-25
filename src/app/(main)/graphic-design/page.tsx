import GraphicDesignGallery from '@/components/GraphicDesignGallery';
import { client, GRAPHIC_DESIGN_QUERY } from '@/lib/sanity.client';
import { GraphicDesign } from '@/lib/sanity.types';
import { mockGraphicDesigns } from '@/lib/mockData';

async function getGraphicDesigns() {
  const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder';

  if (!isSanityConfigured) {
    return mockGraphicDesigns;
  }

  try {
    return await client.fetch<GraphicDesign[]>(GRAPHIC_DESIGN_QUERY);
  } catch (error) {
    console.error('Error fetching graphic designs:', error);
    return mockGraphicDesigns;
  }
}

export default async function GraphicDesignPage() {
  const projects = await getGraphicDesigns();

  return (
    <main className="min-h-screen pt-20">
      <GraphicDesignGallery projects={projects as any} />
    </main>
  );
}
