FROM node:20-bullseye-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

# BUILDER
FROM base as builder
WORKDIR /application
COPY . .
RUN pnpm turbo prune --scope=@unique-chess/webapp --docker

# DEPENDENCIES
FROM base AS dependencies
WORKDIR /application

COPY --from=builder /application/out/json .
COPY --from=builder /application/out/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod=false

# BUILD
FROM base AS build
WORKDIR /application

ENV NODE_OPTIONS --max-old-space-size=4096

COPY --from=dependencies /application .
COPY --from=builder /application/out/full .
RUN pnpm run --filter=@unique-chess/database generate
RUN pnpm run --filter=@unique-chess/webapp build

# PRODUCTION
FROM base AS production
WORKDIR /application

COPY --from=build /application/workspaces/webapp/dist ./dist
COPY --from=build /application/workspaces/webapp/package.json ./
COPY --from=build /application/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "run", "--filter=@unique-chess/webapp", "start"]