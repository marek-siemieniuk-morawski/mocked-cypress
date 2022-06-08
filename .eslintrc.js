module.exports = {
    env: {
      browser: true,
      es2021: true,
      "jest/globals": true,
    },
    extends: ["airbnb-base", "prettier", "plugin:import/typescript"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "import", "jest"],
    rules: {
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
      "semi": "off",
      "@typescript-eslint/semi": ["error"]
    },
  };
