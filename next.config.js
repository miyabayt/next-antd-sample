const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/disabling-x-powered-by
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#remove-console
    removeConsole: PHASE_DEVELOPMENT_SERVER
      ? false
      : {
          exclude: ['error'],
        },
    //https://nextjs.org/docs/advanced-features/compiler#remove-react-properties
    reactRemoveProperties:
      process.env.NODE_ENV === 'production'
        ? { properties: ['^data-testid$'] }
        : false,
  },
  async rewrites() {
    return [
      {
        // ex. /api/proxy
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`,
        // ex. http://localhost:8080
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ]
  },
}

module.exports = withVanillaExtract(nextConfig)
