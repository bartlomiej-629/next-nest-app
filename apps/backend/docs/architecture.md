# Architecture

- [Architecture](#architecture)
  - [`.github/workflows`](#githubworkflows)
    - [`lint.yml`](#lintyml)
  - [`docs`](#docs)
  - [`src`](#src)
    - [`common`](#common)
    - [`database`](#database)
      - [`factories`](#factories)
      - [`seeds`](#seeds)
    - [`decorators`](#decorators)
    - [`filters`](#filters)
    - [`guards`](#guards)
    - [`i18n`](#i18n)
    - [`interceptors`](#interceptors)
    - [`interfaces`](#interfaces)
    - [`providers`](#providers)
    - [`shared`](#shared)
    - [`modules`](#modules)
    - [`app.module.ts`](#appmodulets)
    - [`boilerplate.polyfill.ts`](#boilerplatepolyfillts)
  - [`tests`](#tests)
  - [`.dockerignore`](#dockerignore)
  - [`.env`](#env)
  - [`.eslintrc.js`](#eslintrcjs)
  - [`docker-compose.yml`](#docker-composeyml)
  - [`Dockerfile`](#dockerfile)

## `.github/workflows`

Here you can create and store yml files for each github action.

### `lint.yml`

Github action to run and show linter errors on each Pull request, by default it scans every pull request and push to main, develop or master branches.

## `docs`

You found me! :wink:

## `src`

Where we keep all our source files.

### `common`

Where we keep common typescript files, e.g. constants and DTOs.

### `database`

Folder to store files which are connected only to database.

#### `factories`

Factories are used to create entities which will be used in seeds.

#### `seeds`

Folder to store application seeds, it adds necessary data for the development.

### `decorators`

This folder contains all global [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html).

### `filters`

In this folder you can find app level [filters](https://docs.nestjs.com/exception-filters).

### `guards`

You can store all guards here.

### `i18n`

Internalization JSON files are storied here.

### `interceptors`

Where we are keep [interceptors](https://docs.nestjs.com/interceptors).

### `interfaces`

This folder contains typescript [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

### `providers`

These are utility functions you may want to share between many files in your application. They will always be pure and never have side effects, meaning if you provide a function the same arguments, it will always return the same result.

### `shared`

Shared module with global singleton services.

### `modules`

Where all our NestJS modules lives. See [NestJS modules documentation](https://docs.nestjs.com/modules) for more.

### `app.module.ts`

The root application module.

### `boilerplate.polyfill.ts`

We extend built in classes so you can use helper function anywhere.

```typescript
const users: UserEntity[] = ...;

const userDtos = users.toDtos();
```

## `tests`

Folder where we keep all our e2e test files.

## `.dockerignore`

List a files which will be ignored during the docker build.

## `.env`

Environment variables which will load before app start and will be stored in `process.env`, (*) is a env name (development, test, staging, production)

## `.eslintrc.js`

Eslint configuration file, See [the eslint doc](https://eslint.org/) for more.

## `docker-compose.yml`

Docker compose configuration file, See [the docker docs](https://docs.docker.com/compose/compose-file/) for more.

## `Dockerfile`

basic Dockerfile configuration to build the app, See [the docker docs](https://docs.docker.com/engine/reference/builder/) for more.
