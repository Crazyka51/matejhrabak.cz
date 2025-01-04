/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Přidání statického exportu
  images: {
    unoptimized: true, // Ošetření obrázků kvůli statickému exportu
  },
  basePath: '', // Ujisti se, že basePath není nastaven pro subdoménu
  trailingSlash: true, // Důležité pro GitHub Pages
};

export default nextConfig;
