#!/bin/bash

aws s3 sync . s3://artiehumphreys.com \
    --exclude ".git/*" \
    --exclude ".github/*" \
    --exclude "README.md" \
    --exclude ".DS_Store" \
    --exclude ".gitignore" \
    --exclude "eslint.config.mjs" \
    --exclude "node_modules/*" \
    --exclude "scripts/*.sh" \
    --exclude "package.json" \
    --exclude "package-lock.json" \