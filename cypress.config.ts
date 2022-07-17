import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'rrrdjw',
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts').default(on, config);
    },
    baseUrl: 'http://localhost:5173/react-todo-app-ts',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
