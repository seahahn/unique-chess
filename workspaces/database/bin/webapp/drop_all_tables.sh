#!/bin/bash
set -e

echo "Dropping all tables of database"
echo typename: $TYPENAME
echo environment: $ENVIRONMENT

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

infisical run --env=$ENVIRONMENT -- bash -c 'docker run -i -v ${PWD}:/mnt/host_mnt --rm postgres:16 psql -d "$(echo $DATABASE_URL | sed "s/unique-chess-webapp-postgres-.*\.unique-chess\.svc\.cluster\.local/host.docker.internal/g" | sed "s/:5432/:54320/g")" --port="54320" -f /mnt/host_mnt/bin/drop_all_tables.sql'

echo ✅ done with dropping all the tables on $ENVIRONMENT
