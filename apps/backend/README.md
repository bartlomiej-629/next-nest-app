# Hijack: Backend

A NestJS backend based on the [Awesome NestJS Boilerplate](https://github.com/NarHakobyan/awesome-nest-boilerplate), with [Drizzle ORM](https://orm.drizzle.team/) for interacting with a PostgreSQL database.

> [!NOTE]
> **Since this is part of a monorepo, prefer using the root [README.md](../../README.md) file for general information.**

## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Interacting with Drizzle

```bash
# migrations
pnpm run db:migrate

# studio
pnpm run db:studio

# push data to db
pnpm run db:push

# generate types
pnpm run db:generate
```

## Testing

```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```
