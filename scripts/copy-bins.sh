#!/usr/bin/env bash

frontmost_app="./node_modules/frontmost-app/frontmost-app"
dist="./dist"

mkdir "dist"

chmod +x "$frontmost_app"

cp "$frontmost_app" "$dist"/frontmost-app