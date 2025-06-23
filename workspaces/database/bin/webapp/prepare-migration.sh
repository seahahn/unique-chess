#!/bin/bash
set -eo pipefail

echo "Preparing migration of the database"
echo environment: $ENVIRONMENT

infisical run --env=$ENVIRONMENT -- bash -c 'export DATABASE_URL="$(echo $DATABASE_URL | sed "s/unique-chess-postgres/localhost/g")" && bun run db:prepare-migration'

echo ✅ done the preparing migration
