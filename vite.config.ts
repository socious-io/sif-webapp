import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), wasm(), nodePolyfills()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`],
  },
  define: {
    global: 'window', // Polyfill global as window
  },
});
