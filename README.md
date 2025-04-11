# Hi

## What's inside?

This Turborepo includes the following apps, packages, and utilities:

### Apps

- [`frontend`](apps/frontend): a [Next.js](https://nextjs.org/) app
- [`backend`](apps/backend): a [Nest.js](https://nestjs.com/) app
- [`supabase-staging`](apps/supabase-staging): a [self-hosted](https://supabase.com/docs/guides/self-hosting/docker) [Supabase](https://supabase.com/) instance based on [our custom self-host setup](https://github.com/noahstuesser/supabase-selfhosted/)

### Packages

- [`@hijack/eslint-config`](packages/eslint-config): ESLint configuration foundations for the monorepo
- [`@hijack/typescript-config`](packages/typescript-config): `tsconfig.json` foundations for the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Setup

Unless otherwise noted, all commands and scripts should be run from the root of the repository.

### Initialization

1. Install dependencies

   ```sh
   pnpm install
   ```

2. Initialize repository locally

   ```sh
   cp .env.example .env # modify as needed

   cp apps/backend/.env.local.example apps/backend/.env.local # modify as needed
   cp apps/backend/.env.development.local.example apps/backend/.env.development.local # modify as needed
   cp apps/backend/.env.production.local.example apps/backend/.env.production.local # modify as needed

   cp apps/frontend/.env.local.example apps/frontend/.env.local # modify as needed
   cp apps/frontend/.env.development.local.example apps/frontend/.env.development.local # modify as needed
   cp apps/frontend/.env.production.local.example apps/frontend/.env.production.local # modify as needed

   cp apps/supabase-staging/.env.example apps/supabase-staging/.env # modify as needed
   ```

### Development

To develop all apps and packages, run the following commands:

```sh
pnpm run dev # develop

cd apps/supabase-staging
pnpm run supabase:dev # Run supabase locally
```

It is also possible to develop the apps and packages separately:

```sh
pnpm run frontend:dev
pnpm run backend:dev

cd apps/supabase-staging
pnpm run supabase:dev # Run supabase locally
```

#### Supabase Setup

The [`supabase-staging`](apps/supabase-staging) app was imported into the monorepo from [our custom self-host setup](https://github.com/noahstuesser/supabase-selfhosted/), and can be updated using the following command (using Git's subtree feature under the hood):

```sh
./scripts/update-supabase-app.sh
```

This copies the contents of the [root folder](https://github.com/noahstuesser/supabase-selfhosted/tree/main/) of the [`supabase-selfhosted`](https://github.com/noahstuesser/supabase-selfhosted/) repository into the [`apps/supabase-staging/`](apps/supabase-staging) directory, by making a new commit on your currently checked out branch.

Merge conflicts may arise in the process and must be resolved as needed.

### Building

This app is meant to be run in production using Docker, although non-dockerized builds are technically possible.
To build all apps and packages, run one of the following commands:

```sh
pnpm run docker:dev:build  # development build
pnpm run docker:build      # production build
```

See [`package.json`](package.json) for more details on scripts.

It's also possible to test the building process without running Docker:

```sh
pnpm run build
```

In isolation:

```sh
pnpm run frontend:build # build frontend
pnpm run backend:build  # build backend
```

### Production

[Caddy](https://caddyserver.com/) is used to serve the frontend and proxy requests to the backend, which then communicates with Supabase.

To setup the production environment, a few different steps are required. You only need to do steps 1-3 once. Run all commands relative to the root of the repository.

1. Setup your environment variables:

   ```sh
   cp .env.example .env                                                                 # modify as needed

   cp apps/backend/.env.local.example apps/backend/.env.local                           # modify as needed
   cp apps/backend/.env.production.local.example apps/backend/.env.production.local     # modify as needed
    
   cp apps/frontend/.env.local.example apps/frontend/.env.local                         # modify as needed
   cp apps/frontend/.env.production.local.example apps/frontend/.env.production.local   # modify as needed

   cp apps/supabase-staging/.env.example apps/supabase-staging/.env                   # modify as needed
   ```

2. Configure your DNS provider as needed.

3. (Re)launch all Docker containers:

   ```sh
   pnpm run docker:down          # stop containers (if any were running since your last deployment)
   pnpm run docker:build         # build containers
   pnpm run docker:up --pull     # start containers and pull newest images (for Caddy and Supabase)
   ```

## Versioning, Releases, Changelogs and Deployments

We use a reinterpretation of [Semantic Versioning](https://semver.org/) to version this user-facing application. The versioning scheme is as follows:

- **MAJOR:** For changes that introduce major new user-facing features into the application, positively disrupting existing application UX.
- **MINOR:** For changes that improve user-facing aspects of the application, without disrupting existing application UX.
- **PATCH:** For changes that fix bugs or improve stability, without modifying user-facing features.

At build-time and local development, we generate additional build-metadata that is appended to the version string and made available as environment variables. The full format thus becomes:

`<MAJOR>.<MINOR>.<PATCH>[-<PRE-RELEASE>][+[[<COMMIT_COUNT>-]<COMMIT_SHORT_HASH>][.b-<BRANCH_NAME>][.gha<GITHUB_RUN_ID>-<GITHUB_RUN_ATTEMPT>.ts<BUILD_TIMESTAMP>]]`

### Version Bumping and Changelogs

We use [`commit-and-tag-version`](https://github.com/absolute-version/commit-and-tag-version) to bump the version of the application. This tool is configured in [`package.json`](package.json) and can be run using the following command:

```sh
pnpm run release --release-as <major|minor|patch>
```

This will use the specified version bump type to generate a commit and tag for the new version, as well as update [`CHANGELOG.md`](CHANGELOG.md) with the new version.

### Releases

Releases are automatically created using GitHub Actions. To create a new release, simple push the results from `pnpm run release` to the `main` branch.

```sh
git push origin main --follow-tags
```

### Deployments

The command above will trigger the release workflow, which will [create a new release on GitHub](./.github/workflows/create-release.yml) and [deploy the application to production](./.github/workflows/deploy-production.yml).

Deployments to the staging environment are automatically triggered by pushing or merging to the `main` branch.
