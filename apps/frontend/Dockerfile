FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apk update
RUN apk add --no-cache libc6-compat git
# Enable corepack to manage package managers
RUN corepack enable && corepack prepare pnpm@9 --activate

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app

COPY . .

RUN pnpm install -g turbo@^2
# Generate a partial monorepo with a pruned lockfile for a target workspace.
# Assuming "frontend" is the name entered in the project's package.json: { name: "frontend" }
RUN turbo prune frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=frontend...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/frontend/public ./apps/frontend/public

EXPOSE 3000

CMD node apps/frontend/server.js
