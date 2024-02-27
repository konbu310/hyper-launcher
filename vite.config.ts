import reactPlugin from "@vitejs/plugin-react";
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
  plugins: [reactPlugin()],
});
