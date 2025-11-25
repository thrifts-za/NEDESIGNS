'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { WebProject } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';
import Section from './Section';
import VimeoPlayer from './VimeoPlayer';

interface WebProjectsShowcaseProps {
  projects: WebProject[];
  limit?: number;
  showViewMore?: boolean;
  title?: string;
  subtitle?: string;
}

export default function WebProjectsShowcase({
  projects,
  limit,
  showViewMore = false,
  title = 'Web Development',
  subtitle = 'Websites and web applications I\'ve designed and developed',
}: WebProjectsShowcaseProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div id="web-projects" className="w-full py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>

        {displayedProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No web projects yet.</p>
          </div>
        ) : (
          <>
            {/* 3-column grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedProjects.map((project, index) => (
                <Link
                  key={project._id}
                  href={`/web-projects/${project.slug?.current || project._id}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative overflow-hidden bg-black cursor-pointer aspect-[16/10] rounded-2xl"
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

                  {/* Gradient overlay on hover - matches graphic design cards */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2 uppercase">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-white/80 text-sm line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {showViewMore && projects.length > (limit || 0) && (
              <div className="flex justify-center mt-12">
                <Link
                  href="/web-projects"
                  className="px-10 py-4 bg-white text-black text-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 rounded-full"
                >
                  View More Work
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
