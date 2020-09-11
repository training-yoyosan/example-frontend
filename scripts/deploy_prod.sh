#!/bin/bash

git pull
yarn
quasar build
cp .htaccess dist/spa
cp robots.txt dist/spa
chown -R mpalade:mpalade .
chmod -R u+rwX,go+rX,go-w .
