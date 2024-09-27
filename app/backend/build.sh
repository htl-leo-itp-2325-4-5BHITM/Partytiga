#!/usr/bin/env bash 

set -e

TAG=ghcr.io/htl-leo-itp-2325-4-5bhitm/partytiga-backend

docker build --tag=$TAG --file=Dockerfile .

docker push $TAG
