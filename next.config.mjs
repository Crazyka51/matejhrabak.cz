/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Export projektu jako statický web
  images: {
    unoptimized: true, // Obrázky budou nezávislé na optimalizaci serveru
  },
  basePath: '', // Žádná specifická cesta
  trailingSlash: true, // Přidá koncové lomítko pro všechny URL
};

export default nextConfig;
