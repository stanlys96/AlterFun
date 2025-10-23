import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Buffer } from "buffer";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: {},
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    Buffer: [Buffer],
    global: "globalThis",
  },
});
