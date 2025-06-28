/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure output is not set to 'export' to allow dynamic API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;