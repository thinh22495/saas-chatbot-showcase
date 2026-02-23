import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: "export" to support API routes on Vercel
  // Cloudflare Pages will use /functions instead
};

export default nextConfig;
