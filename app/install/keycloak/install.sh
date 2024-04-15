#!/usr/bin/env bash
set -e
#apt update
#apt upgrade -y
#apt install nginx

#curl -L -o keycloak.tgz https://github.com/keycloak/keycloak/releases/download/24.0.2/keycloak-24.0.2.tar.gz
#tar -xzf keycloak.tgz
#mv keycloak-* keycloak
#rm -rf /opt/keycloak/
#mv keycloak/ /opt/
#cp keycloak.service /etc/systemd/system/keycloak.service
#systemctl enable keycloak
useradd keycloak
chown -R keycloak:keycloak /opt/keycloak/


