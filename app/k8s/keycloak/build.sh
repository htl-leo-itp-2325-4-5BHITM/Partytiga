#!/usr/bin/env bash 

set -e

TAG=ghcr.io/htl-leo-itp-2325-4-5bhitm/partytiga-keycloak

docker build --tag=$TAG .

docker push $TAG

#docker run --name keycloak --rm keycloak start-dev
