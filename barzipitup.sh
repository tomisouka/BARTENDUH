#!/usr/bin/env bash
set -euo pipefail

OUT="gunthers-bar-$(date +%Y%m%d-%H%M%S).zip"

zip -r "$OUT" \
  src \
  public \
  package.json \
  pnpm-lock.yaml \
  index.html \
  vite.config.js \
  tailwind.config.js \
  postcss.config.js \
  -x "*.DS_Store" \
  -x "**/node_modules/**"

echo "Created $OUT"