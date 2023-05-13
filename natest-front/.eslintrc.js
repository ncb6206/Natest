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
    "airbnb",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["import", "react-hooks", "react"],
  rules: {
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-console": "off",
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-one-expression-per-line": "off",
    "object-curly-newline": "off",
    "linebreak-style": "off",
    "no-param-reassign": "off",
  },
};
