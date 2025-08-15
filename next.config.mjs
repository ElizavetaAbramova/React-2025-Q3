/** @type {import('next').NextConfig} */
// import {NextConfig} from 'next';

import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        pathname: '/product-images/**',
      },
    ],
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
