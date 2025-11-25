'use client';

import { useState } from 'react';

interface VimeoPlayerProps {
  url: string;
  className?: string;
  backgroundMode?: boolean; // true = autoplay muted loop, false = full controls
}

// Extract Vimeo video ID from various URL formats
function getVimeoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

export default function VimeoPlayer({ url, className = '', backgroundMode = true }: VimeoPlayerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoId = getVimeoId(url);

  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Invalid Vimeo URL</p>
      </div>
    );
  }

  // Background mode: autoplay, muted, loop, minimal controls
  // Full mode: user controls, sound enabled, autoplay
  // dnt=1 disables tracking to avoid analytics errors
  // quality=auto allows adaptive streaming to prevent freezing
  // playsinline=1 ensures smooth mobile playback
  const embedUrl = backgroundMode
    ? `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&autopause=0&controls=${isHovered ? '1' : '0'}&dnt=1&quality=auto&playsinline=1`
    : `https://player.vimeo.com/video/${videoId}?autoplay=1&autopause=0&dnt=1&quality=auto&responsive=1&playsinline=1`;

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo video player"
      />
    </div>
  );
}
