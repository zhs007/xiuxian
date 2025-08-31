import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Vitest configuration
    globals: true,
    environment: 'jsdom', // or 'happy-dom'
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      // Thresholds for coverage
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
      // Folders to include in coverage
      include: ['src/logic/**'],
      // Folders to exclude from coverage
      exclude: ['src/rendering/**', 'src/types/**', 'src/main.ts'],
    },
  },
});
