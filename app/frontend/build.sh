#!/usr/bin/env bash 

set -e

TAG=ghcr.io/htl-leo-itp-2325-4-5bhitm/partytiga-frontend

docker build --tag=$TAG --file=docker/Dockerfile .

docker push $TAG
