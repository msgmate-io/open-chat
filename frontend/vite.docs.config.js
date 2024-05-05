import { mdx } from "@cyco130/vite-plugin-mdx";
import react from "@vitejs/plugin-react";
import { builtinModules } from "module";
import path from "path";
import tailwindcss from "tailwindcss";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
    base: "https://tbscode.github.io/django-vike-chat/",
    plugins: [react(), vike({
        prerender: true
    }), mdx(), tailwindcss()],
    resolve: {
        alias: {
            "@open-chat-ui": path.resolve(__dirname + "/components/src"),
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
