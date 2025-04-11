// reuse ignore patterns from base config if exists
const baseIgnorePatterns =
  require("@hijack/eslint-config/next.js").ignorePatterns;

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@hijack/eslint-config/next.js"],
  ignorePatterns: [...(baseIgnorePatterns ?? []), "src/components/ui"],
};
