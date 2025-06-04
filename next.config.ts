import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "komnqzbfwzxcadiseknx.supabase.co",
        pathname: "/storage/v1/object/public/**/**",
      },
      {
        protocol: "https",
        hostname: "www.struoindia.com",
        pathname: "/wp-content/uploads/**",
      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
