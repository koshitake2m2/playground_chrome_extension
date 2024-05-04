import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { join, resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        background: join(__dirname, "src/background/service_worker.ts"),
        content_scripts: join(__dirname, "src/content_scripts/index.ts"),
        content_scripts_main: join(__dirname, "src/content_scripts/main.tsx"),
        popup: join(__dirname, "src/popup/popup.html"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/chunk-[hash].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
