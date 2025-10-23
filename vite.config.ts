import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodeStdlibBrowser } from "vite-plugin-node-stdlib-browser";

// Import 'Buffer' from 'buffer' for the `define` section
import { Buffer } from "buffer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodeStdlibBrowser()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {
    // You can usually remove the alias section entirely now,
    // as the plugin handles standard Node modules.
  },
  define: {
    // Define the global process and Buffer to ensure full compatibility.
    // This is often still necessary for older libraries.
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    Buffer: ["buffer", "Buffer"], // Correct way to reference the Buffer export
    global: "globalThis",
  },
});
