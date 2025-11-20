import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.espncdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.boxing-data.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;