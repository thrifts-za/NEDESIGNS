'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { GraphicDesign } from '@/lib/sanity.types';
import { urlFor, client } from '@/lib/sanity.client';
import VimeoPlayer from '@/components/VimeoPlayer';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GraphicDesignProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const [project, setProject] = useState<GraphicDesign | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<GraphicDesign[]>([]);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        // Fetch the project by slug
        const foundProject = await client.fetch<GraphicDesign>(
          `*[_type == "graphicDesign" && slug.current == $slug][0]{
            _id,
            title,
            slug,
            description,
            mainImage,
            vimeoUrl,
            gallery,
            category,
            client,
            year,
            featured,
            order
          }`,
          { slug }
        );
        setProject(foundProject);

        // Fetch related projects - prioritize same category
        if (foundProject) {
          const related = await client.fetch<GraphicDesign[]>(
            `*[_type == "graphicDesign" && _id != $id] | order(order asc)[0...2]{
              _id,
              title,
              slug,
              mainImage,
              client,
              category
            }`,
            { id: foundProject._id }
          );
          setRelatedProjects(related);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    }

    fetchProject();
  }, [slug]);

  // Handle ESC key to close fullscreen
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenImage) {
        setFullscreenImage(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [fullscreenImage]);

  if (!project) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-gray-500">Project not found</p>
      </main>
    );
  }

  // Combine main image with gallery
  const allImages = [project.mainImage, ...(project.gallery || [])];

  return (
    <main className="min-h-screen pt-20 bg-black border-b-4 border-gray-800">
      {/* Project Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {project.title}
          </h1>
          {project.description && (
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-6">
              {project.description}
            </p>
          )}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            {project.client && <span>Client: {project.client}</span>}
            {project.year && <span>•</span>}
            {project.year && <span>{project.year}</span>}
            {project.category && <span>•</span>}
            {project.category && (
              <span className="capitalize">{project.category}</span>
            )}
          </div>
        </motion.div>

        {/* Vimeo Video (if available) */}
        {project.vimeoUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 max-w-5xl mx-auto"
          >
            <VimeoPlayer url={project.vimeoUrl} className="rounded-lg overflow-hidden" />
          </motion.div>
        )}

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {allImages.map((image, index) => {
            if (!image) return null;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setFullscreenImage(typeof image === 'string' ? image : urlFor(image).url())}
                className="relative aspect-video bg-gray-900 cursor-pointer group overflow-hidden rounded-2xl"
              >
                <Image
                  src={typeof image === 'string' ? image : urlFor(image).url()}
                  alt={`${project.title} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* You May Also Like Section */}
        {relatedProjects.length > 0 && (
          <div className="border-t border-gray-800 pt-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              YOU MAY ALSO LIKE
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((relatedProject) => {
                if (!relatedProject.mainImage) return null;
                return (
                  <Link
                    key={relatedProject._id}
                    href={`/graphic-design/${relatedProject.slug?.current || relatedProject._id}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="group relative overflow-hidden bg-gray-900 aspect-video cursor-pointer rounded-2xl"
                    >
                      <Image
                        src={urlFor(relatedProject.mainImage).url()}
                        alt={relatedProject.title || 'Related project'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-white text-2xl md:text-3xl font-bold">
                          {relatedProject.title}
                        </h3>
                        {relatedProject.client && (
                          <p className="text-white/80 text-lg mt-2">
                            {relatedProject.client}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Image Viewer */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
            onClick={() => setFullscreenImage(null)}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close fullscreen"
            >
              <FaTimes className="w-6 h-6 text-white" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={fullscreenImage}
                alt="Fullscreen view"
                fill
                className="object-contain"
                priority
              />
            </div>

            <p className="absolute bottom-4 text-center text-gray-400 text-sm">
              Press ESC or click anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
