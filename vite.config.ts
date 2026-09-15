import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";

export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: "electron/main.ts",
        vite: {
          build: {
            rolldownOptions: {
              external: ["file-icon"],
            },
          },
        },
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
        vite: {
          build: {
            rolldownOptions: {
              output: {
                entryFileNames: "[name].js",
                chunkFileNames: "[name].js",
              },
            },
          },
        },
      },
      renderer: {},
    }),
  ],
  build: {
    sourcemap: true,
  },
});
