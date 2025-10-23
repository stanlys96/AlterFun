import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-node-polyfills";

// Import 'Buffer' from 'buffer' for the `define` section
import { Buffer } from "buffer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    alias: {
      // 2. Add an alias for 'process' and 'stream' to use polyfills
      // 'process' and 'stream' are often related to Buffer usage
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      // The 'events' polyfill is also sometimes required
      events: "rollup-plugin-node-polyfills/polyfills/events",
    },
  },
  define: {
    // 3. Define the global 'Buffer' variable
    // This makes the Buffer class available globally
    global: "globalThis",
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    Buffer: [Buffer], // <-- This is the core fix
  },
});
