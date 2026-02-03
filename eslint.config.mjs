import { FlatCompat } from '@eslint/eslintrc';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1. Inherit their original ruleset
  ...compat.extends('@3angletech/eslint-config/node'),

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    rules: {
      'capitalized-comments': 'off',
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            '^~[^/]+/[^/]+$',
            '@sendgrid/helpers',
            '@sendgrid/mail',
            'jsonwebtoken',
          ],
        },
      ],
      'jsdoc/newline-after-description': 'off',
    },
  },

  // 2. Exact Overrides from the original .eslintrc.js
  {
    files: ['*.entity.ts', '*.dto.ts'],
    rules: {
      indent: 'off',
    },
  },
  {
    files: ['src/**/*.spec.ts', 'test/**/*.ts'],
    rules: {
      'max-classes-per-file': 'off',
    },
  },

  // 3. Global Ignores (Equivalent to ignorePatterns)
  {
    ignores: ['node_modules/', 'dist/', '.eslintrc.js'],
  },
];