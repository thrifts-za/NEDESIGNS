'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import InfiniteSkillsScroll from './InfiniteSkillsScroll';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  scrollText?: string;
}

export default function Hero({
  title = 'NEDESIGNS',
  subtitle = 'Graphic Designer & Web Developer',
  description = 'Creating clean, modern designs and building powerful web experiences for clients and brands worldwide.',
  primaryButtonText = 'View My Work',
  primaryButtonLink = '#work',
  secondaryButtonText = 'Book a Call',
  secondaryButtonLink = 'https://calendly.com/nedesigns/nedesigns-intro',
  scrollText = 'Technologies I Work With',
}: HeroProps = {}) {
  return (
    <section className="h-screen flex items-start justify-center px-4 pt-32 bg-gradient-to-b from-gray-100 to-gray-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(0_0_0_/_0.05)_1px,_transparent_0)] [background-size:40px_40px]"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight text-black"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={primaryButtonLink}
              className="px-8 py-4 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              {primaryButtonText}
            </Link>
            <Link
              href={secondaryButtonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-black text-black rounded-full text-base font-medium hover:bg-black hover:text-white transition-all"
            >
              {secondaryButtonText}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-8 text-center"
        >
          <Link href="#work" className="inline-block animate-bounce">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Infinite Skills Scroll Banner */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <InfiniteSkillsScroll scrollText={scrollText} />
      </div>
    </section>
  );
}
