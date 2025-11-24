'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { GraphicDesign } from '@/lib/sanity.types';
import { urlFor } from '@/lib/sanity.client';

interface ProjectModalProps {
  project: GraphicDesign | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combine main image with gallery images - needs to be safe for when project is null
  const allImages = project ? [
    project.mainImage,
    ...(project.gallery || []),
  ] : [];

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen || !project || allImages.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project, allImages.length]);

  // Early return AFTER all hooks
  if (!project) return null;

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="w-6 h-6 text-white" />
          </button>

          <div className="w-full max-w-6xl mx-auto">
            {/* Project Info */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {project.title}
              </h2>
              {project.description && (
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  {project.description}
                </p>
              )}
              <div className="flex items-center justify-center gap-4 mt-3 text-sm text-gray-400">
                {project.client && <span>Client: {project.client}</span>}
                {project.year && <span>•</span>}
                {project.year && <span>{project.year}</span>}
                {project.category && <span>•</span>}
                {project.category && (
                  <span className="capitalize">{project.category}</span>
                )}
              </div>
            </motion.div>

            {/* Image Viewer */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(allImages[currentImageIndex]).url()}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Navigation Arrows - Only show if more than 1 image */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <FaChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}
            </motion.div>

            {/* Thumbnail Strip - Only show if more than 1 image */}
            {allImages.length > 1 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 flex gap-3 justify-center overflow-x-auto pb-2"
              >
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                      currentImageIndex === index
                        ? 'ring-4 ring-white scale-110'
                        : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={urlFor(image).url()}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </motion.div>
            )}

            {/* Instructions */}
            <p className="text-center text-gray-500 text-sm mt-6">
              Press ESC to close • Use arrow keys to navigate
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
