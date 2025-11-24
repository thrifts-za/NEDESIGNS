import Hero from '@/components/Hero';
import GraphicDesignGallery from '@/components/GraphicDesignGallery';
import WebProjectsShowcase from '@/components/WebProjectsShowcase';
import ClientsSection from '@/components/ClientsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactForm from '@/components/ContactForm';
import {
  client,
  GRAPHIC_DESIGN_QUERY,
  WEB_PROJECT_QUERY,
  CLIENT_QUERY,
  SKILL_QUERY,
} from '@/lib/sanity.client';
import {
  GraphicDesign,
  WebProject,
  Client,
  Skill,
} from '@/lib/sanity.types';
import {
  mockGraphicDesigns,
  mockWebProjects,
  mockClients,
  mockSkills,
} from '@/lib/mockData';

async function getPortfolioData() {
  // Check if Sanity is configured
  const isSanityConfigured = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'placeholder';

  if (!isSanityConfigured) {
    console.log('Using mock data (Sanity not configured)');
    return {
      graphicDesigns: mockGraphicDesigns,
      webProjects: mockWebProjects,
      clients: mockClients,
      skills: mockSkills,
    };
  }

  try {
    const [graphicDesigns, webProjects, clients, skills] = await Promise.all([
      client.fetch<GraphicDesign[]>(GRAPHIC_DESIGN_QUERY),
      client.fetch<WebProject[]>(WEB_PROJECT_QUERY),
      client.fetch<Client[]>(CLIENT_QUERY),
      client.fetch<Skill[]>(SKILL_QUERY),
    ]);

    return { graphicDesigns, webProjects, clients, skills };
  } catch (error) {
    console.error('Error fetching portfolio data, falling back to mock data:', error);
    return {
      graphicDesigns: mockGraphicDesigns,
      webProjects: mockWebProjects,
      clients: mockClients,
      skills: mockSkills,
    };
  }
}

export default async function Home() {
  const { graphicDesigns, webProjects, clients, skills } =
    await getPortfolioData();

  return (
    <main>
      <Hero />

      <div id="work" className="scroll-mt-20">
        <GraphicDesignGallery projects={graphicDesigns} />
        <WebProjectsShowcase projects={webProjects} />
      </div>

      <div id="about">
        <ClientsSection clients={clients} />
        <SkillsSection skills={skills} />
      </div>

      <ContactForm />
    </main>
  );
}
