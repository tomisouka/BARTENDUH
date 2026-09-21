#!/usr/bin/env bash
set -euo pipefail

name="bartending-$(date +%Y%m%d-%H%M%S).zip"

zip -r "$name" . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x "_delete/*" \
  -x "*.zip"

echo "created $name"