# Local Development Setup

This guide explains how to set up the Unique Chess project for local development using Docker and Infisical.

## Prerequisites

- Docker and Docker Compose
- Node.js 20+
- pnpm
- Infisical CLI

## Quick Start

1. **Start local services:**
   ```bash
   task setup-local
   ```

2. **Start development server:**
   ```bash
   task dev-local
   ```

3. **Stop services:**
   ```bash
   task stop-local
   ```

## Manual Setup

If you prefer to set up manually:

1. **Load environment variables from Infisical:**
   ```bash
   infisical export --env=dev > .env
   ```

2. **Start Docker services:**
   ```bash
   docker-compose up -d
   ```

3. **Run database migrations:**
   ```bash
   cd workspaces/database
   cp ../../.env .env
   pnpm prisma migrate deploy
   pnpm prisma generate
   cd ../..
   ```

4. **Start development:**
   ```bash
   infisical run --env=dev -- pnpm turbo dev --parallel
   ```

## Available Services

| Service | URL | Credentials |
|---------|-----|-------------|
| PostgreSQL | `localhost:5432` | `postgres/postgres` |
| pgAdmin | http://localhost:5050 | `admin@uniquechess.com/admin` |
| MinIO Console | http://localhost:9001 | `minioadmin/minioadmin123` |
| Redis | `localhost:6379` | No auth |

## Database

- **Database Name:** `unique_chess`
- **Connection String:** `postgresql://postgres:postgres@localhost:5432/unique_chess`

## MinIO Buckets

The following buckets are automatically created:
- `chess-assets` (public) - For game assets like piece models
- `user-avatars` (private) - For user profile pictures
- `game-assets` (public) - For game-related files

## Environment Variables

Local development uses Infisical with the `dev` environment slug, which contains:
- Database connection strings
- MinIO configuration
- Redis configuration
- JWT secrets for development

These variables are loaded from Infisical during setup and when running the application.

## Troubleshooting

### Services won't start
```bash
docker-compose down -v  # Remove volumes
docker-compose up -d    # Restart
```

### Database connection issues
```bash
docker-compose exec postgres pg_isready -U postgres -d unique_chess
```

### MinIO issues
```bash
curl -f http://localhost:9000/minio/health/live
```

### Reset everything
```bash
docker-compose down -v
rm -rf node_modules workspaces/*/node_modules
task setup-local
```