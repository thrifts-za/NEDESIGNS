'use client';

import { useState, useEffect } from 'react';
import { ShowreelVideo } from '@/lib/sanity.types';
import VimeoPlayer from './VimeoPlayer';

interface InfiniteVideoScrollProps {
  videos: ShowreelVideo[];
  scrollText?: string;
}

export default function InfiniteVideoScroll({
  videos,
  scrollText = 'Video Showreel',
}: InfiniteVideoScrollProps) {
  const [selectedVideo, setSelectedVideo] = useState<ShowreelVideo | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedVideo]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  if (!videos || videos.length === 0) {
    return null;
  }

  // Duplicate videos for seamless loop
  const duplicatedVideos = [...videos, ...videos];

  const handleVideoClick = (e: React.MouseEvent, video: ShowreelVideo) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedVideo(video);
  };

  const videoWidth = 400;
  const videoGap = 24;
  const totalWidth = (videoWidth + videoGap) * duplicatedVideos.length;
  const animationDuration = videos.length * 8;
  const translateDistance = (videoWidth + videoGap) * videos.length;
  const animationName = `scrollVideos-${videos.length}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ${animationName} {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${translateDistance}px);
            }
          }

          .video-scroll-track-${videos.length} {
            animation: ${animationName} ${animationDuration}s linear infinite;
          }

          .video-scroll-track-${videos.length}:hover {
            animation-play-state: paused;
          }
        `
      }} />

      <div className="w-full bg-gray-100 py-12">
        {/* Section Label */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            {scrollText}
          </h2>
        </div>

        {/* Scroll Container */}
        <div className="relative overflow-hidden">
          {/* Fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div
            className={`video-scroll-track-${videos.length} flex`}
            style={{
              width: `${totalWidth}px`,
              gap: `${videoGap}px`,
            }}
          >
            {duplicatedVideos.map((video, index) => (
              <div
                key={`${video._id}-${index}`}
                className="flex-shrink-0 cursor-pointer"
                style={{
                  width: `${videoWidth}px`,
                  aspectRatio: '16/9',
                }}
                onClick={(e) => handleVideoClick(e, video)}
              >
                <VimeoPlayer url={video.vimeoUrl || ''} className="rounded-2xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  );
}

// Video Modal with full Vimeo controls
function VideoModal({
  video,
  onClose,
}: {
  video: ShowreelVideo;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div
        className="relative w-full max-w-6xl aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <VimeoPlayer url={video.vimeoUrl || ''} backgroundMode={false} />
      </div>

      <p className="absolute bottom-4 text-center text-gray-400 text-sm">
        Press ESC or click outside to close
      </p>
    </div>
  );
}
