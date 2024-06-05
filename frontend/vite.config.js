import { mdx } from "@cyco130/vite-plugin-mdx";
import react from "@vitejs/plugin-react";
import { builtinModules } from "module";
import path from "path";
import tailwindcss from "tailwindcss";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    vike({
      prerender: true,
      hydrationCanBeAborted: true,
    }),
    mdx(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "#/assets": path.resolve(__dirname + "/assets"),
      "@open-chat/open-chat-ui": path.resolve(__dirname + "/components/src"),
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  build: {
    build: {
      terserOptions: {
        compress: {
          drop_console: false, // TODO: do in prod
        },
      },
    },
    rollupOptions: {
      external: [
        ...builtinModules,
        /^node:/,
      ],
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});