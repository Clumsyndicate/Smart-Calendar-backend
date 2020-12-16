#!/bin/bash

# Install NPM packages for backend

cd "$(dirname $0)"

npm i --prefix backend
npm i --prefix frontend/egglenderlogin
npm run build --prefix frontend/egglenderlogin