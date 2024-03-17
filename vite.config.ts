import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { hash } from './src/utils/hash.ts';

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: `[name]` + hash + `.js`,
  //       chunkFileNames: `[name]` + hash + `.js`,
  //       assetFileNames: `[name]` + hash + `.[ext]`
  //     }
  //   }
  // },

  plugins: [
    react(),
  ],
});
