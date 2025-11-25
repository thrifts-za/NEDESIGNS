'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraphicDesign } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';
import Section from './Section';
import VimeoPlayer from './VimeoPlayer';

interface GraphicDesignGalleryProps {
  projects: GraphicDesign[];
  limit?: number;
  showViewMore?: boolean;
  title?: string;
  subtitle?: string;
}

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Branding', value: 'branding' },
  { label: 'Logo Design', value: 'logo' },
  { label: 'Print Design', value: 'print' },
  { label: 'Social Media', value: 'social' },
  { label: 'Illustration', value: 'illustration' },
  { label: 'UI/UX Design', value: 'uiux' },
];

export default function GraphicDesignGallery({
  projects,
  limit,
  showViewMore = false,
  title = 'Graphic Design',
  subtitle = 'A showcase of my creative design work across various mediums',
}: GraphicDesignGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects;

  return (
    <Section
      id="graphic-design"
      title={title}
      subtitle={subtitle}
      titleClassName="text-white"
    >
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.value
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {displayedProjects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No projects in this category yet.</p>
        </div>
      ) : (
        <>
          <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedProjects.map((project, index) => (
              <Link
                key={project._id}
                href={`/graphic-design/${project.slug?.current || project._id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative overflow-hidden bg-black cursor-pointer aspect-video rounded-2xl"
                >
                {project.vimeoUrl ? (
                  <VimeoPlayer url={project.vimeoUrl} />
                ) : project.mainImage ? (
                  <Image
                    src={urlFor(project.mainImage).url()}
                    alt={project.title || 'Project'}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : null}

                {/* Simple overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2 uppercase">
                      {project.title}
                    </h3>
                    {project.client && (
                      <p className="text-white/80 text-lg">
                        {project.client}
                      </p>
                    )}
                  </div>
                </div>

                {/* Minimal label always visible */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
                  <p className="text-white text-xs font-medium capitalize">
                    {project.category}
                  </p>
                </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {showViewMore && projects.length > (limit || 0) && (
            <div className="flex justify-center mt-12">
              <Link
                href="/graphic-design"
                className="px-10 py-4 bg-white text-black text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 rounded-full"
              >
                View More Work
              </Link>
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </Section>
  );
}
