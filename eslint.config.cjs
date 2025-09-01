const path = require('path');

module.exports = [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: ['node_modules', 'dist', '.vscode', '.env', 'coverage'],
  },

  // TypeScript files configuration
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        project: [path.resolve(__dirname, './tsconfig.json')],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      ecmaVersion: 2021,
      globals: {
        window: 'readonly',
        document: 'readonly',
        NodeJS: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      // Project-specific overrides
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // Relax strict runtime-type rules to warnings for incremental fixes
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
    },
  },
];
