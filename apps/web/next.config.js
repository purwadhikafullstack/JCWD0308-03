/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
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
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/public/images/**',
      },
=======
    domains: [
      'akcdn.detik.net.id',
      'assets.promediateknologi.id',
      'tourbandung.id',
      'images.unsplash.com',
>>>>>>> 7fc432d2fb2e0b975a71e061e7c3fdd3ef76ec39
    ],
  },
};

module.exports = nextConfig;