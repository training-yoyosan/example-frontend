#!/bin/bash

git pull
yarn
quasar build
sudo chown -R worker:www-data .
sudo chmod -R u+rwX,go+rX,go-w .
