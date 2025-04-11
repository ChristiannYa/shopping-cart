import type { NextConfig } from "next";
import type { Configuration as WebpackConfig } from "webpack";

const nextConfig: NextConfig = {
  webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }) => {
    // Don't attempt to bundle Node.js modules on the client side
    if (!isServer) {
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        dns: false,
        net: false,
        tls: false,
        child_process: false,
        "mapbox-node-pre-gyp": false,
        "@mapbox/node-pre-gyp": false,
      };
    }

    return config;
  },
};

export default nextConfig;
