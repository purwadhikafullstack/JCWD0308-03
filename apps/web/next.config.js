/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'akcdn.detik.net.id',
      },
      {
        protocol: 'https',
        hostname: 'assets.promediateknologi.id',
      },
      {
        protocol: 'https',
        hostname: 'tourbandung.id',
      },
      {
        protocol: 'https',
        hostname: 'asset-a.grid.id',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/public/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
