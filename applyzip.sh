#!/usr/bin/env bash
# applyzip.sh: copy files from a zip into the project, backing up anything it overwrites.
#
# Usage (run from the project root):
#   ./applyzip.sh --dry-run    # show what would change, write nothing
#   ./applyzip.sh              # apply it
#   ZIP=other.zip ./applyzip.sh
#
# Config (override with env vars):
#   TARGET      project directory            (default: current directory)
#   ZIP         the zip to apply             (default: $TARGET/gunthers-bar-tools-hidden.zip)
#   BACKUP_DIR  where overwritten files go   (default: $TARGET/_delete/backup-<timestamp>)

set -euo pipefail

TARGET="${TARGET:-.}"
ZIP="${ZIP:-$TARGET/gunthers-bar-tools-hidden.zip}"
BACKUP_DIR="${BACKUP_DIR:-$TARGET/_delete/backup-$(date +%Y%m%d-%H%M%S)}"
DRY_RUN=0
[ "${1:-}" = "--dry-run" ] && DRY_RUN=1

# --- checks ---
[ -f "$ZIP" ] || { echo "error: zip not found: $ZIP" >&2; exit 1; }
command -v unzip >/dev/null || { echo "error: unzip is not installed" >&2; exit 1; }

# --- unpack to a temp dir (cleaned up on exit, even on error) ---
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
unzip -q "$ZIP" -d "$TMP"

# --- compare every file in the zip against the project ---
new=()
changed=()
while IFS= read -r -d '' f; do
  rel="${f#"$TMP"/}"
  if [ ! -e "$TARGET/$rel" ]; then
    new+=("$rel")
  elif ! cmp -s "$f" "$TARGET/$rel"; then
    changed+=("$rel")
  fi
done < <(find "$TMP" -type f -print0)

# --- report ---
echo "Zip:     $ZIP"
echo "Target:  $TARGET"
echo "New:     ${#new[@]}"
for rel in ${new[@]+"${new[@]}"}; do printf '  + %s\n' "$rel"; done
echo "Changed: ${#changed[@]}"
for rel in ${changed[@]+"${changed[@]}"}; do printf '  ~ %s\n' "$rel"; done

if [ $(( ${#new[@]} + ${#changed[@]} )) -eq 0 ]; then
  echo "Nothing to do: project already matches the zip."
  exit 0
fi

if [ "$DRY_RUN" -eq 1 ]; then
  echo "(dry run: nothing written)"
  exit 0
fi

# --- back up files we're about to overwrite ---
for rel in ${changed[@]+"${changed[@]}"}; do
  mkdir -p "$BACKUP_DIR/$(dirname "$rel")"
  cp -p "$TARGET/$rel" "$BACKUP_DIR/$rel"
done

# --- copy new + changed files in ---
for rel in ${changed[@]+"${changed[@]}"} ${new[@]+"${new[@]}"}; do
  mkdir -p "$TARGET/$(dirname "$rel")"
  cp "$TMP/$rel" "$TARGET/$rel"
done

echo "Done."
[ ${#changed[@]} -gt 0 ] && echo "Backups of overwritten files: $BACKUP_DIR"
echo "Next: git diff --stat   then   pnpm build"
