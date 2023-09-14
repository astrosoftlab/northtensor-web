/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')()

const nextConfig = {
  pageExtensions: ['page.tsx', 'api.ts'],
  webpack5: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  }
}
module.exports = withMDX(nextConfig)
