/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: '**.ipfs.w3s.link',
      },
    ],
  },
};

module.exports = nextConfig;