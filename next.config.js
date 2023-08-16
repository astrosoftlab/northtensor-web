/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts"],
}

const withMDX = require("@next/mdx")()
module.exports = withMDX(nextConfig)
