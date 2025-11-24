'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GraphicDesign } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';
import Section from './Section';
import ProjectModal from './ProjectModal';

interface GraphicDesignGalleryProps {
  projects: GraphicDesign[];
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
}: GraphicDesignGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<GraphicDesign | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
        setSelectedProject(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const handleProjectClick = (project: GraphicDesign) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for animation
  };

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <Section
      id="graphic-design"
      title="Graphic Design"
      subtitle="A showcase of my creative design work across various mediums"
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

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No projects in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project)}
              className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-square cursor-pointer"
            >
              <Image
                src={urlFor(project.mainImage).url()}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  {project.description && (
                    <p className="text-sm text-gray-200 mb-3">
                      {project.description}
                    </p>
                  )}
                  <p className="text-sm text-gray-300 font-medium">
                    Click to view {project.gallery ? project.gallery.length + 1 : 1} image{project.gallery && project.gallery.length > 0 ? 's' : ''}
                  </p>
                  {project.client && (
                    <p className="text-xs text-gray-400 mt-2">
                      Client: {project.client}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </Section>
  );
}
