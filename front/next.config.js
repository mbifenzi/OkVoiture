/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["assets.example.com", "localhost:3000", "127.0.0.1:3000", ""],
  },
};

module.exports = nextConfig;
