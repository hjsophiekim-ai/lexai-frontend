import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 프로젝트 루트를 lexai-web으로 고정 (상위 lockfile로 인한 node_modules 경로 혼동 방지)
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
