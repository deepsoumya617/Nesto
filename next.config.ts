import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['porpoise-suitable-shad.ngrok-free.app'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
}

export default nextConfig
