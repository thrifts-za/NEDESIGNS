/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  async rewrites() {
    return [
      { source: '/kion-shopify', destination: '/kion-shopify/index.html' },
      { source: '/brida', destination: '/brida/index.html' },
      { source: '/paleohacks', destination: '/paleohacks/index.html' },
    ];
  },
};

module.exports = nextConfig;
