#!/bin/bash

# sub_dirs=("egglender-class" "egglender-friends" "egglenderlogin")

# for sub_dir in ${sub_dirs[@]}; do
#     prefix_dir="$PWD/frontend/$sub_dir"
#     echo $prefix_dir
#     npm run build --prefix $prefix_dir
# done

# Install NPM packages for backend

cd "$(dirname $0)"

npm i --prefix backend
npm i --prefix frontend/egglenderlogin
npm run build --prefix frontend/egglenderlogin