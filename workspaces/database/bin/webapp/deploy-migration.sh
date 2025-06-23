#!/bin/bash
set -eo pipefail

echo "Deploying migration to the database"
echo typename: $TYPENAME
echo environment: $ENVIRONMENT

# If $ENVIRONMENT is 'local', use the local database URL
if [ "$ENVIRONMENT" == "local" ]; then
  infisical run --env=$ENVIRONMENT -- bash -c 'export DATABASE_URL="$(echo $DATABASE_URL | sed "s/unique-chess-postgres/localhost/g")" && bun run db:deploy-migration'
  echo ✅ done the deploying migration locally
  exit 0
fi

remoteport=5432

kubectl port-forward --namespace unique-chess $TYPENAME 54320:$remoteport >/dev/null 2>&1 &
echo Created port-forward

pid=$!

# kill the port-forward regardless of how this script exits
trap '{
    # echo killing $pid
    kill $pid
}' EXIT

# wait for 54320 to become available
while ! nc -vz localhost 54320 >/dev/null 2>&1; do
  # echo sleeping
  sleep 0.1
done

# Run the migration command
infisical run --env=$ENVIRONMENT -- bash -c 'export DATABASE_URL="$(echo $DATABASE_URL | sed "s/unique-chess-webapp-postgres-.*\.unique-chess\.svc\.cluster\.local/localhost/g" | sed "s/:5432/:54320/g")" && bun run db:deploy-migration'

echo ✅ done the deploying migration
