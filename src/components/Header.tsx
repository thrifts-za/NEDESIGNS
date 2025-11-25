'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

interface HeaderProps {
  siteTitle?: string;
  menuItems?: Array<{ label: string; href: string }>;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

export default function Header({
  siteTitle = 'NEDESIGNS',
  menuItems = [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
  ctaButtonText = 'Book a Call',
  ctaButtonLink = 'https://calendly.com/nedesigns/nedesigns-intro',
}: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Check if we're on a project page (black background)
  const isProjectPage = pathname?.includes('/graphic-design/') || pathname?.includes('/web-projects/');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || isProjectPage
          ? 'bg-white/90 backdrop-blur-md shadow-sm text-black'
          : 'bg-transparent text-black'
      )}
    >
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity"
          >
            {siteTitle}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={ctaButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                isScrolled || isProjectPage
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border-2 border-black bg-transparent text-black hover:bg-black hover:text-white"
              )}
            >
              {ctaButtonText}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
