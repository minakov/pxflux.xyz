import esbuild from 'esbuild';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

esbuild
  .build({
    plugins: [NodeModulesPolyfillPlugin()],
    platform: 'browser',
    conditions: ['node'],
    entryPoints: ['./worker/index.ts'],
    sourcemap: true,
    bundle: true,
    minify: true,
    outfile: './dist/client/_worker.js',
    logLevel: 'warning',
    format: 'esm',
    target: 'es2020',
  })
  .catch(() => process.exit(1));
