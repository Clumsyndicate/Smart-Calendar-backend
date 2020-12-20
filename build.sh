#!/bin/bash

# Install NPM packages for backend

cd "$(dirname $0)"

npm i --prefix backend
cd frontend/egglenderlogin
yarn
npm run build