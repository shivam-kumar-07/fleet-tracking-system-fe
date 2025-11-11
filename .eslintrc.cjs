/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: { ecmaVersion: 2022, sourceType: "module" },
    env: { browser: true, node: true, es2022: true },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "next/core-web-vitals",
      "plugin:prettier/recommended" // Prettier LAST — ensures no conflicts
    ],
    settings: {
      react: { version: "detect" },
      "import/resolver": { typescript: true }
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "alphabetize": { order: "asc", caseInsensitive: true }
        }
      ]
    }
  };
  