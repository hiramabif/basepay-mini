import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            // CRITICAL: This allows embedding from Base/Warpcast domains.
            value: "frame-ancestors 'self' https://base.dev https://warpcast.com https://*.base.dev;",
          },
          {
            // Good practice for cross-origin fetching of resources
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
        ],
      },
    ];
  },
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
