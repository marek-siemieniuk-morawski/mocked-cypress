module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:import/typescript",
    "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "cypress"],
  rules: {
    "no-undef": "off",
    "max-len": [
      "error",
      { ignoreComments: true, ignoreTemplateLiterals: true },
    ],
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
      },
    ],
    semi: "off",
    "@typescript-eslint/semi": ["error"],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx"],
        moduleDirectory: ["src", "node_modules"],
      },
    },
  },
};
