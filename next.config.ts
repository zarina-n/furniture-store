import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/catalog',
        destination: '/catalog/all',
        permanent: true, 
      },
    ];
  },};

export default nextConfig;
