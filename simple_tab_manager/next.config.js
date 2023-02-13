const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  assetPrefix: isProd ? '/dist' : undefined,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
