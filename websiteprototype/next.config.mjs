/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com'],
  },
  // Add this configuration
  output: 'export',
  distDir: 'out',
};


export default nextConfig;
