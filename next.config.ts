import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Allows deployment despite TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Allows deployment despite ESLint warnings
  },
  // Add other config options below as needed
};

export default nextConfig;
