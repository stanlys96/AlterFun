import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Buffer } from "buffer";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  resolve: {},
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    Buffer: [Buffer],
    global: "globalThis",
  },
});
