#!/bin/bash
# https://gist.github.com/mohanpedala/1e2ff5661761d3abd0385e8223e16425?permalink_comment_id=3935570
set -euo pipefail

npm ci

echo "Building the project"
npm run build

echo "Syncing to s3://artiehumphreys.com"
aws s3 sync dist/ s3://artiehumphreys.com \
  --delete \
  --exclude "Resume_Artie_Humphreys.pdf" \
  --exclude "Summer_2025_Transcript.pdf" \
  --cache-control "public, max-age=31536000, immutable"

echo "Short caching index.html"
aws s3 cp dist/index.html s3://artiehumphreys.com/index.html \
  --cache-control "public, max-age=0, must-revalidate"