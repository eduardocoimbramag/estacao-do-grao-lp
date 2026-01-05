/** @type {import('next').NextConfig} */
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  // Fix Turbopack picking the wrong workspace root when multiple lockfiles exist.
  // This ensures edits in this project actually trigger recompiles in dev.
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
