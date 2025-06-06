import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import wasm from "vite-plugin-wasm";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), wasm(), nodePolyfills()],
  optimizeDeps: {
    exclude: [`@ionic/pwa-elements/loader`],
  },
  define: {
    global: 'window', // Polyfill global as window
  },
});
