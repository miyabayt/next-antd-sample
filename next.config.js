/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#styled-components
    styledComponents: true,
    // https://nextjs.org/docs/advanced-features/compiler#remove-console
    removeConsole: {
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
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
        // ex. http://localhost:8080
        destination: `${process.env.API_BASE_URL}/:match*`,
      },
    ]
  },
}

module.exports = nextConfig
