#!/bin/bash
set -eo pipefail

echo "Creating a dump of the database"
echo typename: $TYPENAME
echo environment: $ENVIRONMENT

# Extract and parse DATABASE_URL from Infisical
eval $(infisical run --env=$ENVIRONMENT -- bash -c '
  parsed_url=$(echo "$DATABASE_URL" | sed "s/unique-chess-webapp-postgres-.*\.unique-chess\.svc\.cluster\.local/localhost/g" | sed "s/:5432/:5432/g")
  echo "export MODIFIED_DB_URL=\"$parsed_url\""
')
# echo "Modified DB URL: $MODIFIED_DB_URL" # e.g. postgresql://username:password@localhost:5432/database

# Execute dump directly inside the pod
kubectl exec -n unique-chess $TYPENAME -- bash -c "
  pg_dump -d \"$MODIFIED_DB_URL\" \
    --lock-wait-timeout=300000 \
    --no-acl \
    --no-owner \
    -n public \
    --blobs \
    -v \
    -Fc \
    -f /tmp/data_dump.sql
"

echo "✅ Successfully created the dump. Copying to local..."

# Copy dump file to local
kubectl cp --retries=5 -n unique-chess $TYPENAME:/tmp/data_dump.sql ./data_dump.sql

echo "✅ Successfully copied the dump to local. Cleaning up the dump file in the pod..."

# Clean up the dump file in the pod
kubectl exec -n unique-chess $TYPENAME -- rm -f /tmp/data_dump.sql

echo "✅ Successfully completed the dump"
