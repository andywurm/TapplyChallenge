/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: ".next",
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
