'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import InfiniteSkillsScroll from './InfiniteSkillsScroll';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
            NEDESIGNS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            Graphic Designer & Web Developer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
          >
            Creating clean, modern designs and building powerful web experiences
            for clients and brands worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#work"
              className="px-8 py-4 bg-black text-white rounded-full text-base font-medium hover:bg-gray-800 transition-colors"
            >
              View My Work
            </Link>
            <Link
              href="https://calendly.com/nedesigns/nedesigns-intro"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-black text-black rounded-full text-base font-medium hover:bg-black hover:text-white transition-all"
            >
              Book a Call
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 text-center"
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
        <InfiniteSkillsScroll />
      </div>
    </section>
  );
}
