import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      include: ['src/game/logic/**/*.ts'],
      all: true,
    },
    exclude: [...configDefaults.exclude, '**/tests/e2e/**'],
  },
});
