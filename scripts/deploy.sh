#!/bin/bash

aws s3 sync . s3://artiehumphreys.com --delete \
    --exclude ".git/*" \
    --exclude ".github/*" \
    --exclude "readme.md" \
    --exclude ".DS_Store" \
    --exclude ".gitignore" \
    --exclude "scripts/*.sh"