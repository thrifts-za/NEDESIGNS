'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { WebProject } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';
import Section from './Section';

interface WebProjectsShowcaseProps {
  projects: WebProject[];
}

export default function WebProjectsShowcase({
  projects,
}: WebProjectsShowcaseProps) {
  return (
    <Section
      id="web-projects"
      title="Web Development"
      subtitle="Websites and web applications I've designed and developed"
      className="bg-gray-50"
    >
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No web projects yet.</p>
        </div>
      ) : (
        <div className="space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={urlFor(project.mainImage).url()}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{project.description}</p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        Visit Website
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black rounded-full font-medium hover:bg-black hover:text-white transition-all"
                      >
                        <FaGithub className="w-4 h-4" />
                        View Code
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}
