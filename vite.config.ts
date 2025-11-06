import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Buffer } from "buffer";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";

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
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "vaul@1.1.2": "vaul",
      "sonner@2.0.3": "sonner",
      "recharts@2.15.2": "recharts",
      "react-resizable-panels@2.1.7": "react-resizable-panels",
      "react-hook-form@7.55.0": "react-hook-form",
      "react-day-picker@8.10.1": "react-day-picker",
      "next-themes@0.4.6": "next-themes",
      "lucide-react@0.487.0": "lucide-react",
      "input-otp@1.4.2": "input-otp",
      "figma:asset/fb0f00bcf8c51620020e4db0c8bb0206986ff5f9.png": path.resolve(
        __dirname,
        "./src/assets/fb0f00bcf8c51620020e4db0c8bb0206986ff5f9.png"
      ),
      "figma:asset/fa3ae5b3890fd67f3f5be9ff3b1133a5d6737af0.png": path.resolve(
        __dirname,
        "./src/assets/fa3ae5b3890fd67f3f5be9ff3b1133a5d6737af0.png"
      ),
      "figma:asset/f817ef1a29b5c690b05ebfc83afb2fef863b2d0d.png": path.resolve(
        __dirname,
        "./src/assets/f817ef1a29b5c690b05ebfc83afb2fef863b2d0d.png"
      ),
      "figma:asset/f5a349d502f0b2548c4daff7615fd689e006358f.png": path.resolve(
        __dirname,
        "./src/assets/f5a349d502f0b2548c4daff7615fd689e006358f.png"
      ),
      "figma:asset/e0fc7a3bcb0e7ee9d340af0ea54cb40cd841339f.png": path.resolve(
        __dirname,
        "./src/assets/e0fc7a3bcb0e7ee9d340af0ea54cb40cd841339f.png"
      ),
      "figma:asset/d281320630ae1ba0e918dac42b556c3fae8ee616.png": path.resolve(
        __dirname,
        "./src/assets/d281320630ae1ba0e918dac42b556c3fae8ee616.png"
      ),
      "figma:asset/b7c83c690af7e81ee0445db9ad2a61484b5c13ed.png": path.resolve(
        __dirname,
        "./src/assets/b7c83c690af7e81ee0445db9ad2a61484b5c13ed.png"
      ),
      "figma:asset/aef9c1daa55ff38a78a0d6a7637be14dcce1028b.png": path.resolve(
        __dirname,
        "./src/assets/aef9c1daa55ff38a78a0d6a7637be14dcce1028b.png"
      ),
      "figma:asset/a9c11bdbcdc6e8526510a74b79878f471385a47a.png": path.resolve(
        __dirname,
        "./src/assets/a9c11bdbcdc6e8526510a74b79878f471385a47a.png"
      ),
      "figma:asset/9eb1eac55c2ecbd4007bef9f0b22323c146fa31a.png": path.resolve(
        __dirname,
        "./src/assets/9eb1eac55c2ecbd4007bef9f0b22323c146fa31a.png"
      ),
      "figma:asset/962f2baedefc981bd3cfde7f00314d5fbfc9d51a.png": path.resolve(
        __dirname,
        "./src/assets/962f2baedefc981bd3cfde7f00314d5fbfc9d51a.png"
      ),
      "figma:asset/9320316b15f577a7e6110fb00ae8788cc2cf7b99.png": path.resolve(
        __dirname,
        "./src/assets/9320316b15f577a7e6110fb00ae8788cc2cf7b99.png"
      ),
      "figma:asset/8761f9fa27a099701dcc4028a8375d1199f91dba.png": path.resolve(
        __dirname,
        "./src/assets/8761f9fa27a099701dcc4028a8375d1199f91dba.png"
      ),
      "figma:asset/87599d96af2012a1a657a0bebaa3c837b68be1b6.png": path.resolve(
        __dirname,
        "./src/assets/87599d96af2012a1a657a0bebaa3c837b68be1b6.png"
      ),
      "figma:asset/74a0b8134d2a5b09a6c280420dd36595734d22b4.png": path.resolve(
        __dirname,
        "./src/assets/74a0b8134d2a5b09a6c280420dd36595734d22b4.png"
      ),
      "figma:asset/6bd6bba476a7f5ed87bd6d809d71e64f40bed2d0.png": path.resolve(
        __dirname,
        "./src/assets/6bd6bba476a7f5ed87bd6d809d71e64f40bed2d0.png"
      ),
      "figma:asset/5d880062d4ab663b8c96bea6309e08af3936cce8.png": path.resolve(
        __dirname,
        "./src/assets/5d880062d4ab663b8c96bea6309e08af3936cce8.png"
      ),
      "figma:asset/5cb4e866c2dd11416d612df77a48f8661376c26b.png": path.resolve(
        __dirname,
        "./src/assets/5cb4e866c2dd11416d612df77a48f8661376c26b.png"
      ),
      "figma:asset/58922dcf4b54f768870e201fc765d663a083c65f.png": path.resolve(
        __dirname,
        "./src/assets/58922dcf4b54f768870e201fc765d663a083c65f.png"
      ),
      "figma:asset/54e2a4c44dfcbb0161079346ad87ca8cadae33e2.png": path.resolve(
        __dirname,
        "./src/assets/54e2a4c44dfcbb0161079346ad87ca8cadae33e2.png"
      ),
      "figma:asset/2faa9a4f373618932f8a7a9108b9c0d7cd310fed.png": path.resolve(
        __dirname,
        "./src/assets/2faa9a4f373618932f8a7a9108b9c0d7cd310fed.png"
      ),
      "figma:asset/2a5ac5b4a8c0ee8a22cd0d2b266354577118ce50.png": path.resolve(
        __dirname,
        "./src/assets/2a5ac5b4a8c0ee8a22cd0d2b266354577118ce50.png"
      ),
      "figma:asset/2332f13db23b250f1177c72a9b8e092735247cb0.png": path.resolve(
        __dirname,
        "./src/assets/2332f13db23b250f1177c72a9b8e092735247cb0.png"
      ),
      "figma:asset/1bc0387f9279e1dd829f43409095935dac3c96bb.png": path.resolve(
        __dirname,
        "./src/assets/1bc0387f9279e1dd829f43409095935dac3c96bb.png"
      ),
      "figma:asset/1b789664b4627c9848bc359d2773b3afa9ad15fd.png": path.resolve(
        __dirname,
        "./src/assets/1b789664b4627c9848bc359d2773b3afa9ad15fd.png"
      ),
      "figma:asset/1718961a2638c3581f34ef1bd88c5e12602c6e8b.png": path.resolve(
        __dirname,
        "./src/assets/1718961a2638c3581f34ef1bd88c5e12602c6e8b.png"
      ),
      "figma:asset/11300db999a790ecb9c5a97893bea6d702bf81e8.png": path.resolve(
        __dirname,
        "./src/assets/11300db999a790ecb9c5a97893bea6d702bf81e8.png"
      ),
      "embla-carousel-react@8.6.0": "embla-carousel-react",
      "cmdk@1.1.1": "cmdk",
      "class-variance-authority@0.7.1": "class-variance-authority",
      "@radix-ui/react-tooltip@1.1.8": "@radix-ui/react-tooltip",
      "@radix-ui/react-toggle@1.1.2": "@radix-ui/react-toggle",
      "@radix-ui/react-toggle-group@1.1.2": "@radix-ui/react-toggle-group",
      "@radix-ui/react-tabs@1.1.3": "@radix-ui/react-tabs",
      "@radix-ui/react-switch@1.1.3": "@radix-ui/react-switch",
      "@radix-ui/react-slot@1.1.2": "@radix-ui/react-slot",
      "@radix-ui/react-slider@1.2.3": "@radix-ui/react-slider",
      "@radix-ui/react-separator@1.1.2": "@radix-ui/react-separator",
      "@radix-ui/react-select@2.1.6": "@radix-ui/react-select",
      "@radix-ui/react-scroll-area@1.2.3": "@radix-ui/react-scroll-area",
      "@radix-ui/react-radio-group@1.2.3": "@radix-ui/react-radio-group",
      "@radix-ui/react-progress@1.1.2": "@radix-ui/react-progress",
      "@radix-ui/react-popover@1.1.6": "@radix-ui/react-popover",
      "@radix-ui/react-navigation-menu@1.2.5":
        "@radix-ui/react-navigation-menu",
      "@radix-ui/react-menubar@1.1.6": "@radix-ui/react-menubar",
      "@radix-ui/react-label@2.1.2": "@radix-ui/react-label",
      "@radix-ui/react-hover-card@1.1.6": "@radix-ui/react-hover-card",
      "@radix-ui/react-dropdown-menu@2.1.6": "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-dialog@1.1.6": "@radix-ui/react-dialog",
      "@radix-ui/react-context-menu@2.2.6": "@radix-ui/react-context-menu",
      "@radix-ui/react-collapsible@1.1.3": "@radix-ui/react-collapsible",
      "@radix-ui/react-checkbox@1.1.4": "@radix-ui/react-checkbox",
      "@radix-ui/react-avatar@1.1.3": "@radix-ui/react-avatar",
      "@radix-ui/react-aspect-ratio@1.1.2": "@radix-ui/react-aspect-ratio",
      "@radix-ui/react-alert-dialog@1.1.6": "@radix-ui/react-alert-dialog",
      "@radix-ui/react-accordion@1.2.3": "@radix-ui/react-accordion",
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
