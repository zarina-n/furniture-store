import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettierPlugin from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import eslintRecommended from '@eslint/js'
import typescriptEslintRecommended from '@typescript-eslint/eslint-plugin'

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    eslintRecommended,
    typescriptEslintRecommended,
  },
})

const eslintConfig = [
  {
    ignores: [
      '.next/',
      'dist/',
      'build/',
      'public/',
      'node_modules/',
      '*.config.js',
      'yarn.lock',
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // Ensure Prettier is last
  ),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error', { semi: false, singleQuote: true }],
      'prefer-const': 'warn',
      'no-var': 'warn',
      'object-shorthand': 'warn',
      'quote-props': ['warn', 'as-needed'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-console': 'warn',
    },
  },
]

export default eslintConfig
