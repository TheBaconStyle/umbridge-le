/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config")

const nextConfig = {
  i18n,
  experimental: {
    serverActions: {
      allowedOrigins: ["4x82wfgh-3000.euw.devtunnels.ms", "localhost:3000"],
      typedRoutes: true,
    },
  },
}

module.exports = nextConfig
