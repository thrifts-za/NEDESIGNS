'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
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
            NEDESIGNS
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://calendly.com/nedesigns/nedesigns-intro"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                isScrolled
                  ? "bg-black text-white hover:bg-gray-800"
                  : "border-2 border-black bg-transparent text-black hover:bg-black hover:text-white"
              )}
            >
              Book a Call
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
