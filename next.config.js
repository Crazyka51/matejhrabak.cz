const createNextIntlPlugin = require("next-intl/plugin")
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {},
})

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
}

module.exports = withNextIntl(withMDX(nextConfig))

