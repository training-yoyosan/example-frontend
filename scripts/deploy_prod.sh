#!/bin/bash

git pull
yarn
yarn run build
sudo chown -R worker:www-data .
sudo chmod -R u+rwX,go+rX,go-w .
