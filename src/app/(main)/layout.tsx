import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client, SITE_SETTINGS_QUERY } from '@/lib/sanity.client';
import { SiteSettings } from '@/lib/sanity.types';

async function getSettings() {
  try {
    const settings = await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <>
      <Header
        siteTitle={settings?.siteTitle}
        menuItems={settings?.navigation?.menuItems as any}
        ctaButtonText={settings?.navigation?.ctaButtonText}
        ctaButtonLink={settings?.navigation?.ctaButtonLink}
      />
      {children}
      <Footer
        siteTitle={settings?.siteTitle}
        description={settings?.footer?.description}
        socialLinks={settings?.footer?.socialLinks as any}
      />
    </>
  );
}
