import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { client, urlFor } from "@/lib/sanity.client";
import { SiteSettings } from "@/lib/sanity.types";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type SiteSettingsWithSeo = SiteSettings & {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: any;
    twitterImage?: any;
    twitterHandle?: string;
    favicon?: any;
    appleTouchIcon?: any;
  };
  verification?: {
    googleSiteVerification?: string;
    bingSiteVerification?: string;
    pinterestVerification?: string;
  };
  analytics?: {
    customHeadScripts?: string;
    customBodyScripts?: string;
  };
};

// Fetch site settings for SEO
async function getSiteSettings() {
  try {
    const settings = await client.fetch<SiteSettingsWithSeo>(
      `*[_type == "siteSettings"][0]{
        seo,
        verification,
        analytics
      }`
    );
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// Generate dynamic metadata from Sanity
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const seo = settings?.seo;

  const DEFAULT_TITLE = "NE Designs | Graphic Designer & Web Developer";
  const DEFAULT_DESCRIPTION = "Portfolio of Nkosi Ndwandwe - Freelance Graphic Designer and Web Developer specializing in clean, modern design and full-stack development.";

  const defaultMetadata: Metadata = {
    metadataBase: new URL("https://nkosidesigns.com"),
    title: {
      default: DEFAULT_TITLE,
      template: "%s | NE Designs",
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [
      "graphic design",
      "web design",
      "web development",
      "portfolio",
      "freelance designer",
      "UI/UX design",
      "branding",
    ],
    authors: [{ name: "Nkosi Ndwandwe" }],
    creator: "Nkosi Ndwandwe",
    openGraph: {
      title: DEFAULT_TITLE,
      description: "Portfolio showcasing graphic design and web development projects",
      url: "https://nkosidesigns.com",
      siteName: "NE Designs",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: "Portfolio showcasing graphic design and web development projects",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  if (!seo) {
    return defaultMetadata;
  }

  // Build metadata from Sanity settings
  const ogImage = seo.ogImage ? urlFor(seo.ogImage).width(1200).height(630).url() : undefined;
  const twitterImage = seo.twitterImage ? urlFor(seo.twitterImage).width(1200).height(600).url() : ogImage;

  return {
    metadataBase: new URL("https://nkosidesigns.com"),
    title: {
      default: seo.metaTitle || DEFAULT_TITLE,
      template: "%s | NE Designs",
    },
    description: seo.metaDescription || DEFAULT_DESCRIPTION,
    keywords: seo.keywords && seo.keywords.length > 0 ? seo.keywords : defaultMetadata.keywords,
    authors: [{ name: "Nkosi Ndwandwe" }],
    creator: "Nkosi Ndwandwe",
    openGraph: {
      title: seo.metaTitle || DEFAULT_TITLE,
      description: seo.metaDescription || "Portfolio showcasing graphic design and web development projects",
      url: "https://nkosidesigns.com",
      siteName: "NE Designs",
      type: "website",
      locale: "en_US",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || DEFAULT_TITLE,
      description: seo.metaDescription || "Portfolio showcasing graphic design and web development projects",
      creator: seo.twitterHandle ? `@${seo.twitterHandle}` : undefined,
      images: twitterImage ? [twitterImage] : undefined,
    },
    icons: seo.favicon ? {
      icon: urlFor(seo.favicon).url(),
      apple: seo.appleTouchIcon ? urlFor(seo.appleTouchIcon).url() : undefined,
    } : undefined,
    verification: {
      google: settings?.verification?.googleSiteVerification,
      other: {
        'msvalidate.01': settings?.verification?.bingSiteVerification || '',
        'p:domain_verify': settings?.verification?.pinterestVerification || '',
      },
    },
    robots: defaultMetadata.robots,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        {settings?.analytics?.customHeadScripts && (
          <Script
            id="custom-head-scripts"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: settings.analytics.customHeadScripts }}
          />
        )}
      </head>
      <body className="antialiased">
        <Analytics settings={settings} />
        {children}
        {settings?.analytics?.customBodyScripts && (
          <Script
            id="custom-body-scripts"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{ __html: settings.analytics.customBodyScripts }}
          />
        )}
      </body>
    </html>
  );
}
