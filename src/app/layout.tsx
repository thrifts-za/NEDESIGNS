import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nkosidesigns.com"),
  title: {
    default: "NE Designs | Graphic Designer & Web Developer",
    template: "%s | NE Designs",
  },
  description: "Portfolio of Nkosi Ndwandwe - Freelance Graphic Designer and Web Developer specializing in clean, modern design and full-stack development. View my graphic design work and web development projects.",
  keywords: [
    "graphic design",
    "web design",
    "web development",
    "portfolio",
    "freelance designer",
    "UI/UX design",
    "branding",
    "logo design",
    "Next.js developer",
    "React developer",
  ],
  authors: [{ name: "Nkosi Ndwandwe" }],
  creator: "Nkosi Ndwandwe",
  openGraph: {
    title: "NE Designs | Graphic Designer & Web Developer",
    description: "Portfolio showcasing graphic design and web development projects",
    url: "https://nkosidesigns.com",
    siteName: "NE Designs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NE Designs | Graphic Designer & Web Developer",
    description: "Portfolio showcasing graphic design and web development projects",
    creator: "@nedesigns",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
