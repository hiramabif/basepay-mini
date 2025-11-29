import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "thread-stream": false,
      };
    }
    return config;
  },
  turbopack: {},
};

export default nextConfig;
