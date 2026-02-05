import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  // Optimizations
  reactStrictMode: true,
};

export default nextConfig;
