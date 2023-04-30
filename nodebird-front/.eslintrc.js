module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "standard-with-typescript",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["import", "react-hooks", "react"],
  rules: {},
};
