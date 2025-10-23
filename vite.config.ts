import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Buffer } from "buffer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodeStdlibBrowser()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  resolve: {},
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    Buffer: ["buffer", "Buffer"],
    global: "globalThis",
  },
});
