import Hero from '@/components/Hero';
import GraphicDesignGallery from '@/components/GraphicDesignGallery';
import InfiniteVideoScroll from '@/components/InfiniteVideoScroll';
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
  SHOWREEL_VIDEO_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/lib/sanity.client';
import {
  GraphicDesign,
  WebProject,
  Client,
  Skill,
  ShowreelVideo,
  SiteSettings,
} from '@/lib/sanity.types';
import {
  mockGraphicDesigns,
  mockWebProjects,
  mockClients,
  mockSkills,
  mockShowreelVideos,
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
      showreelVideos: mockShowreelVideos,
      settings: null,
    };
  }

  try {
    const [graphicDesigns, webProjects, clients, skills, showreelVideos, settings] = await Promise.all([
      client.fetch<GraphicDesign[]>(GRAPHIC_DESIGN_QUERY),
      client.fetch<WebProject[]>(WEB_PROJECT_QUERY),
      client.fetch<Client[]>(CLIENT_QUERY),
      client.fetch<Skill[]>(SKILL_QUERY),
      client.fetch<ShowreelVideo[]>(SHOWREEL_VIDEO_QUERY),
      client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
    ]);

    return {
      graphicDesigns,
      webProjects,
      clients,
      skills,
      showreelVideos,
      settings
    };
  } catch (error) {
    console.error('Error fetching portfolio data, falling back to mock data:', error);
    return {
      graphicDesigns: mockGraphicDesigns,
      webProjects: mockWebProjects,
      clients: mockClients,
      skills: mockSkills,
      showreelVideos: mockShowreelVideos,
      settings: null,
    };
  }
}

export default async function Home() {
  const { graphicDesigns, webProjects, clients, skills, showreelVideos, settings } =
    await getPortfolioData();

  // Default all sections to visible if no settings
  const showHero = settings?.sections?.showHero ?? true;
  const showGraphicDesign = settings?.sections?.showGraphicDesign ?? true;
  const showWebProjects = settings?.sections?.showWebProjects ?? true;
  const showClients = settings?.sections?.showClients ?? true;
  const showSkills = settings?.sections?.showSkills ?? true;
  const showContact = settings?.sections?.showContact ?? true;

  return (
    <main>
      {showHero && (
        <Hero
          title={settings?.hero?.title}
          subtitle={settings?.hero?.subtitle}
          description={settings?.hero?.description}
          primaryButtonText={settings?.hero?.primaryButtonText}
          primaryButtonLink={settings?.hero?.primaryButtonLink}
          secondaryButtonText={settings?.hero?.secondaryButtonText}
          secondaryButtonLink={settings?.hero?.secondaryButtonLink}
          scrollText={settings?.skillsScrollText}
        />
      )}

      <div id="work" className="scroll-mt-20">
        {showGraphicDesign && (
          <GraphicDesignGallery
            projects={graphicDesigns as any}
            limit={4}
            showViewMore={true}
            title={settings?.sectionTitles?.graphicDesign?.title}
            subtitle={settings?.sectionTitles?.graphicDesign?.subtitle}
          />
        )}

        {/* Video Showreel */}
        <InfiniteVideoScroll
          videos={showreelVideos as any}
          scrollText="Video Showreel"
        />

        {showWebProjects && (
          <WebProjectsShowcase
            projects={webProjects as any}
            limit={4}
            showViewMore={true}
            title={settings?.sectionTitles?.webProjects?.title}
            subtitle={settings?.sectionTitles?.webProjects?.subtitle}
          />
        )}
      </div>

      <div id="about">
        {showClients && (
          <ClientsSection
            title={settings?.sectionTitles?.clients?.title}
            subtitle={settings?.sectionTitles?.clients?.subtitle}
          />
        )}
        {showSkills && <SkillsSection skills={skills as any} />}
      </div>

      {showContact && (
        <ContactForm
          sectionTitle={settings?.sectionTitles?.contact?.title}
          sectionSubtitle={settings?.sectionTitles?.contact?.subtitle}
          ctaHeading={settings?.contactSection?.ctaHeading}
          ctaDescription={settings?.contactSection?.ctaDescription}
          ctaButtonText={settings?.contactSection?.ctaButtonText}
          ctaButtonLink={settings?.contactSection?.ctaButtonLink}
          formHeading={settings?.contactSection?.formHeading}
          formDescription={settings?.contactSection?.formDescription}
          successMessage={settings?.contactSection?.successMessage}
          errorMessage={settings?.contactSection?.errorMessage}
        />
      )}
    </main>
  );
}
