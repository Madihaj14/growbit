/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true 
  },
  webpack: (config, { dev, isServer }) => {
    // Disable caching in development to prevent ENOENT errors
    if (dev) {
      config.cache = false;
    }
    return config;
  }
};

module.exports = nextConfig;