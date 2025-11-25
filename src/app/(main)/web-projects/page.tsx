import WebProjectsShowcase from '@/components/WebProjectsShowcase';
import { client, WEB_PROJECT_QUERY } from '@/lib/sanity.client';
import { WebProject } from '@/lib/sanity.types';
import { mockWebProjects } from '@/lib/mockData';

async function getWebProjects() {
  const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder';

  if (!isSanityConfigured) {
    return mockWebProjects;
  }

  try {
    return await client.fetch<WebProject[]>(WEB_PROJECT_QUERY);
  } catch (error) {
    console.error('Error fetching web projects:', error);
    return mockWebProjects;
  }
}

export default async function WebProjectsPage() {
  const projects = await getWebProjects();

  return (
    <main className="min-h-screen pt-20">
      <WebProjectsShowcase projects={projects as any} />
    </main>
  );
}
