import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      ".next/",
      "dist/",
      "build/",
      "public/",
      "node_modules/",
      "*.config.js",
      "yarn.lock",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ),
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "prefer-const": "warn",
      "no-var": "warn",
      "object-shorthand": "warn",
      "quote-props": ["warn", "as-needed"],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];

export default eslintConfig;
