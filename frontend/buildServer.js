import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

esbuild.build({
    entryPoints: [path.join(__dirname, 'server', 'index.js')],
    bundle: true,
    platform: 'node',
    outfile: 'server-entry.cjs',
    external: ['lightningcss'],//['vite', 'express', 'sirv', 'compression', 'cookie-parser'], // Add other externals as needed
    format: 'cjs',
    minify: false,
    //minify: true,
    define: {
        'process.env.NODE_ENV': '"production"',
        'process.env.CLIENT_ROOT': `"${__dirname}/dist/client"`,
    }
}).then(() => {
    console.log('Build successful');
}).catch((error) => {
    console.error('Build failed:', error);
    process.exit(1);
});