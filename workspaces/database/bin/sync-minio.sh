#!/bin/bash
set -e

echo "Syncing minio"
echo environment: $FROM_ENVIRONMENT
echo to environment: $TO_ENVIRONMENT


FROM_MINIO_ACCESS_KEY=$(infisical secrets get MINIO_ACCESS_KEY --raw-value --silent --env=$FROM_ENVIRONMENT)
FROM_MINIO_ENDPOINT=$(infisical secrets get MINIO_ENDPOINT --raw-value --silent --env=$FROM_ENVIRONMENT)
FROM_MINIO_SECRET_KEY=$(infisical secrets get MINIO_SECRET_KEY --raw-value --silent --env=$FROM_ENVIRONMENT)

TO_MINIO_ACCESS_KEY=$(infisical secrets get MINIO_ACCESS_KEY --raw-value --silent --env=$TO_ENVIRONMENT)
TO_MINIO_ENDPOINT=$(infisical secrets get MINIO_ENDPOINT --raw-value --silent --env=$TO_ENVIRONMENT)
TO_MINIO_SECRET_KEY=$(infisical secrets get MINIO_SECRET_KEY --raw-value --silent --env=$TO_ENVIRONMENT)

echo "from https://$FROM_MINIO_ENDPOINT $FROM_MINIO_ACCESS_KEY $FROM_MINIO_SECRET_KEY"
echo "to https://$TO_MINIO_ENDPOINT $TO_MINIO_ACCESS_KEY $TO_MINIO_SECRET_KEY"

docker run -e localport="$localport" -e toLocalport="$toLocalport" --rm --entrypoint=/bin/sh  minio/mc:latest -c "
    mc alias set $FROM_ENVIRONMENT https://$FROM_MINIO_ENDPOINT $FROM_MINIO_ACCESS_KEY $FROM_MINIO_SECRET_KEY
    mc alias set $TO_ENVIRONMENT https://$TO_MINIO_ENDPOINT $TO_MINIO_ACCESS_KEY $TO_MINIO_SECRET_KEY
    mc alias list
    mc mirror $FROM_ENVIRONMENT/ $TO_ENVIRONMENT/
"


echo ✅ done the sync