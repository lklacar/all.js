#!/bin/sh

cp package.json src/package.json
cd src
npm publish
rm package.json
cd ..