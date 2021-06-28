#!/bin/bash -Ceu

# client
echo "[bundle client]"
webpack --mode production

#server
echo "[compile server]"
[ -d ./server/compiled ] && rm -rf ./server/compiled
tsc && echo "compiled successful."

# DB config
# echo "[copy DB config]"
# cd ./server/compiled
# [ -d db ] && rm -rf db
# mkdir db
# cd ..
# cp -v ./src/db/config.js ./compiled/db/config.js