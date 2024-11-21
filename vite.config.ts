import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["libraries/scroller"] })],
  build: {
    copyPublicDir: false,

    lib: {
      entry: resolve(__dirname, "libraries/scroller/InfiniteScroller.tsx"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
  },
});
