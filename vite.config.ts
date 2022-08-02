import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  base: '/react-todo-app-ts/',
  publicDir: './public',
  test: {
    environment: 'jsdom',
    setupFiles: './src/vitest.setup.ts',
    include: ['src/**/*.test.{tsx,ts}'],
  },
  build: {
    outDir: 'build',
  },
});
