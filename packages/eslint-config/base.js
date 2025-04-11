/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "turbo",
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [
    ".*.js",
    "*.setup.js",
    "*.config.js",
    ".turbo/",
    "dist/",
    "coverage/",
    "node_modules/",
  ],
  rules: {
    "turbo/no-undeclared-env-vars": [
      "error",
      {
        allowList: [
          "^DB_\\w+$",
          "^DATABASE_\\w+$",
          "^NODE_ENV$",
          "PORT",
          "API_VERSION",
          "^SUPABASE_\\w+$",
          "^AWS_\\w+$",
          "^NATS_\\w+$",
          "^REDIS_\\w+$",
          "^POSTGRES_\\w+$",
          "^PG_?\\w+$",
        ],
      },
    ],
  },
};
