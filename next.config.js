import mdx from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: { },
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default withNextIntl(withMDX(nextConfig));
=======
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

>>>>>>> 0e42c8dfe75e176848d288e0a9ba00171ec69ae4
