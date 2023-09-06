module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['@3angletech/eslint-config/node'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "capitalized-comments": "off",
    "import/no-unresolved": [
      "error",
      {
        "ignore": [
          "^~[^/]+/[^/]+$",
          "@sendgrid/helpers",
          "@sendgrid/mail",
          "jsonwebtoken",
        ]
      }
    ],
    "jsdoc/newline-after-description": "off",
  },
  overrides: [
    {
      files: [ "*.entity.ts", "*.dto.ts" ],
      rules: {
        "indent": "off",
      }
    }
  ]
};
