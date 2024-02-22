/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["4x82wfgh-3000.euw.devtunnels.ms", "localhost:3000"],
      typedRoutes: true,
    },
    swcMinify: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
