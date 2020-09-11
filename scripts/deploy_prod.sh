#!/bin/bash

git pull
yarn
yarn run build
chown -R mpalade:mpalade .
chmod -R u+rwX,go+rX,go-w .
