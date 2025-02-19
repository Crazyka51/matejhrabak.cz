import mdx from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

// Konfigurace MDX s rozšířením .mdx
const withMDX = mdx({
    extension: /\.mdx?$/,
    options: { },
});

// Konfigurace next-intl pro lokalizaci
const withNextIntl = createNextIntlPlugin({
    locales: ['en', 'cs'], // Přidejte všechny podporované jazyky
    defaultLocale: 'cs', // Výchozí jazyk
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Rozšíření stránek, které Next.js bude zpracovávat
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

// Export kombinované konfigurace Next.js s MDX a lokalizací
export default withNextIntl(withMDX(nextConfig));
