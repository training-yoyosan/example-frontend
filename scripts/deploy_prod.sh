#!/bin/bash

git pull
yarn
quasar build
chown -R mpalade:mpalade .
chmod -R u+rwX,go+rX,go-w .
