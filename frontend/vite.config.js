import path from "path";
import react from "@vitejs/plugin-react";
import { builtinModules } from "module";
import tailwindcss from "tailwindcss";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), vike({}), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  alias: {
    resolve: {
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    rollupOptions: {
      external: [...builtinModules, /^node:/],
    },
  },
  server: {},
});
