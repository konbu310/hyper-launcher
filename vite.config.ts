import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  root: "./src",
  base: "./",
  build: {
    outDir: "../dist",
  },
  plugins: [react(), vanillaExtractPlugin()],
});
