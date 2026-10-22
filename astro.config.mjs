import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "static",
  build: { format: "file" },
  vite: { plugins: [tailwindcss()] },
  adapter: cloudflare(),
});