import { mdx } from "@cyco130/vite-plugin-mdx";
import react from "@vitejs/plugin-react";
import { builtinModules } from "module";
import path from "path";
import tailwindcss from "tailwindcss";
import { vavite } from "vavite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    mdx(),
    tailwindcss(),
    vavite({
      handlerEntry: './dist/client',
      serverEntry: './dist/server'
    }),
  ],
  resolve: {
    alias: {
      "#open-chat-ui": path.resolve(__dirname + "/components/src"),
      "#open-chat-api": path.resolve(__dirname + "/_api"),
      "#assets": path.resolve(__dirname + "/assets"),
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  buildSteps: [
    {
      name: "client",
      config: {
        build: {
          outDir: "dist2/client",
        },
      },
    },
    {
      name: "server",
      config: {
        build: {
          outDir: "dist2/server",
        },
      },
    },
  ],
  build: {
    rollupOptions: {
      external: [
        ...builtinModules,
        /^node:/,
      ],
    },
  },
  server: {
    fs: {
      exclude: [
        path.resolve(__dirname, 'components/node_modules')
      ]
    },
  },
});