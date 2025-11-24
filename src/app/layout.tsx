import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NE Designs | Graphic Designer & Web Developer",
  description: "Portfolio of Nkosi - Freelance Graphic Designer and Web Developer specializing in clean, modern design and full-stack development.",
  keywords: ["graphic design", "web design", "web development", "portfolio", "freelance designer"],
  authors: [{ name: "Nkosi" }],
  openGraph: {
    title: "NE Designs | Graphic Designer & Web Developer",
    description: "Portfolio showcasing graphic design and web development projects",
    url: "https://nkosidesigns.com",
    siteName: "NE Designs",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
