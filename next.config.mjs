/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Product art ships as PNG/WEBP out of the existing apps; AVIF first keeps
    // the card grid cheap on mobile without re-exporting a single source file.
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
