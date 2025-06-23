FROM node:20-bullseye-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

ENV NODE_ENV=production

RUN yarn global add turbo pnpm@9.15.5

# BUILDER
FROM base as builder
WORKDIR /application
COPY . .
RUN turbo prune --scope=@unique-chess/webapp --docker

# DEPENDENCIES
FROM base AS dependencies
WORKDIR /application

COPY --from=builder /application/out/json .
COPY --from=builder /application/out/package-lock.yaml\* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod=false


# BUILD
FROM base AS build
WORKDIR /application

ENV NODE_OPTIONS --max-old-space-size=26384

COPY --from=dependencies /application .
COPY --from=builder /application/out/full .
RUN pnpm run --filter=@unique-chess/database generate
RUN pnpm run --filter=@unique-chess/webapp build


# PRODUCTION
FROM base AS production
WORKDIR /application

RUN yarn cache clean
COPY --from=build /application .

CMD ["pnpm", "run", "--filter=@unique-chess/webapp", "start"]