#!/usr/bin/env bash

file_icon="./node_modules/file-icon/file-icon"
frontmost_app="./node_modules/frontmost-app/frontmost-app"
dist="./dist"

mkdir "dist"

chmod +x "$file_icon"
chmod +x "$frontmost_app"

cp "$file_icon" "$dist"/file-icon
cp "$frontmost_app" "$dist"/frontmost-app