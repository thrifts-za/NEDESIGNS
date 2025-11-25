'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  alt?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  alt = 'Before and After comparison',
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-video overflow-hidden select-none cursor-col-resize ${className}`}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={afterImage}
          alt={`${alt} - After`}
          fill
          className="object-cover"
          draggable={false}
          priority
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${alt} - Before`}
          fill
          className="object-cover"
          draggable={false}
          priority
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-black/70 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
          BEFORE
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="px-3 py-1 bg-white/90 text-black text-sm font-semibold rounded-full backdrop-blur-sm">
          AFTER
        </span>
      </div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20"
        style={{ left: `${sliderPosition}%` }}
        animate={{ opacity: isDragging ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
          {/* Left Arrow */}
          <svg
            className="absolute left-2 w-3 h-3 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {/* Right Arrow */}
          <svg
            className="absolute right-2 w-3 h-3 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </motion.div>

      {/* Instruction hint (only on first load) */}
      {sliderPosition === 50 && !isDragging && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="px-4 py-2 bg-black/70 text-white text-sm rounded-full backdrop-blur-sm">
            ← Drag to compare →
          </span>
        </motion.div>
      )}
    </div>
  );
}
