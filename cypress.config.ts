import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: process.env.VITE_APP_URL,
    setupNodeEvents(on, config) {
      config.env.VITE_ENV = process.env.VITE_ENV || 'development';
      return config;
    },
    env: {
      VITE_ENV: 'test',
    },
    supportFile: 'cypress/support/e2e.ts',
  },
});
