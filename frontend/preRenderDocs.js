import { prerender } from 'vike/prerender'
import { builtinModules } from "module";

prerender({
    viteConfig: {
        base: 'https://tbscode.github.io/django-vike-chat/',
        build: {
            rollupOptions: {
                external: [...builtinModules, /^node:/],
            },
        },
    }
})
