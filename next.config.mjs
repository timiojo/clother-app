import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-hosted on local device (no Vercel): `npm run build && npm start`
  output: "standalone",
};

export default nextConfig;
