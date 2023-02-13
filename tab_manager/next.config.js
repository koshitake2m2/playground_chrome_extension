/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
