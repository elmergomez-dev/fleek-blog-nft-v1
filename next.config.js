// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Keep if desired

  // --- Image Optimization Configuration ---
  images: {

    // Add this remotePatterns array to allow Alchemy's CDN
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nft-cdn.alchemy.com',
        port: '', // Usually empty string for default https port 443
        pathname: '/**', // Allow any path under this hostname
      },
      // You can add more patterns here later if needed for other image sources
      // e.g., IPFS gateways if you display raw IPFS links
      // { protocol: 'https', hostname: 'ipfs.io', port: '', pathname: '/ipfs/**' },
    ],
  },
  // --- End Image Config ---

  // NO redirects needed here if blog roll is on '/' and '/blog'
};

module.exports = nextConfig;