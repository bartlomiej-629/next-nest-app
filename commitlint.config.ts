import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const types = [
  "feat", // new user-facing feature (must have (or may introduce a new) scope)
  "enha", // enhancement of any kind (must have a scope)
  "fix", // bug fix (must have a scope)
  "docs", // documentation enhancement (same as 'enha(docs)')
  "style", // code style enhancement (same as 'enha(style)')

  "refactor", // refactoring code enhancement (must have a scope)

  "perf", // performance improvement enhancement (must have a scope)
  "test", // testing enhancement (must have a scope)
  "build", // build enhancement
  "ci", // ci enhancement
  "chore", // Relating to repository maintenance
  "revert", // reverting a previous commit
];

const typesRequiringScope = ["feat", "enha", "fix", "refactor", "perf", "test"];

/**
 * Scopes are used to describe the area of the project that the commit affects.
 * They are used to group commits together and to provide context to the commit
 * message.
 *
 * The scopes are divided into two categories: areas and topics. Areas are
 * broader categories that describe the area of the project that the commit
 * affects, while topics are more specific categories that describe the
 * functionality or purpose of the commit.
 *
 * For example, commits that add a new feature to the frontend user interface
 * might look like this:
 *
 *   - `feat(ui,auth): add forgot password functionality ...`
 *   - `feat(ui,automation): Implement IG automation nodes ...`
 *
 * Another example might be a commit that adds a new feature to the backend API related to
 * user authentication:
 *
 *   `feat(api,auth): add new endpoint for user authentication ...`
 *
 */
const scopes = {
  areas: [
    /* Frontend */
    "fe", // generic frontend changes
    "ui", // UI related changes

    /* Backend */
    "be", // generic backend changes
    "api", // REST API related changes
    "db", // DB related changes

    /* Others */
    "docs", // documentation changes
    "style", // code style changes
    "webserver", // webserver and proxying changes
    "version", // version bumping
  ],
  topics: [
    "auth",
    "analytics",
    "automation",
    "billing",
    "chat",
    "crm",
    "roles",
    "settings",
  ],
};

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-case": [RuleConfigSeverity.Error, "always", "lower-case"],
    "type-empty": [RuleConfigSeverity.Error, "never"],
    "type-enum": [RuleConfigSeverity.Error, "always", types],
    "subject-case": [RuleConfigSeverity.Disabled, "always", "lower-case"],
    "subject-empty": [RuleConfigSeverity.Error, "never"],
    "subject-outer-whitespace": [RuleConfigSeverity.Error, "always"],
    "scope-rich": [RuleConfigSeverity.Error, "always"],
  },
  plugins: [
    {
      rules: {
        "scope-rich": (commit, when) => {
          const errorMessages: string[] = [
            "scope is required for commit of type" +
              `[${typesRequiringScope.join(", ")}]`,
            `scope must be one of the areas [${scopes.areas.join(", ")}], ` +
              "optionally paired with one of the topics " +
              `[${scopes.topics.join(", ")}], ` +
              "all separated by a comma (no spaces)",
          ];

          const scope = commit.scope ?? "";
          const scopeRequired = typesRequiringScope.includes(commit.type!);

          if (when !== "always" || !scopeRequired) return [true, undefined];

          if (scopeRequired && !scope.length) {
            return [false, errorMessages[0]];
          }

          if (scope.includes(",")) {
            // area must be provided and valid, and if topics are provided,
            // they must be valid
            const [area, ...topics] = scope.split(",");
            if (
              !scopes.areas.includes(area) ||
              topics.some((topic) => !scopes.topics.includes(topic))
            ) {
              return [false, errorMessages[1]];
            }
          } else if (!scopes.areas.includes(scope)) {
            return [false, errorMessages[1]];
          }

          return [true, undefined];
        },
        "subject-outer-whitespace": (commit, when) => {
          const errorMessages: string[] = [
            "subject must not have more than one preceding whitespace character",
          ];

          if (when !== "always" || !commit.subject) return [true, undefined];

          if ([" ", "\t", "\n", "\r"].includes(commit.subject[0])) {
            return [false, errorMessages[0]];
          }

          return [true, undefined];
        },
      },
    },
  ],
};

export default Configuration;
