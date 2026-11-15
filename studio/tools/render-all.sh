#!/bin/sh
# Renders each given episode folder to renders/<folder>.mp4 (HQ render, then the slow x264 shrink), one at a time.
# Usage (repo root): sh studio/tools/render-all.sh episodes/ep18-always-on-agents-60s-apple episodes/...
set -e
root=$(pwd)
for d in "$@"; do
  name=$(basename "$d")
  cd "$root/$d"
  mkdir -p renders
  echo "== $name $(date +%H:%M:%S)"
  npx --yes hyperframes@0.8.137 render -o "renders/$name-hq.mp4" > "renders/render.log" 2>&1 || { echo "render failed: $name (see $d/renders/render.log)"; continue; }
  ffmpeg -y -loglevel error -i "renders/$name-hq.mp4" -c:v libx264 -preset slow -crf 22 -c:a copy -movflags +faststart "renders/$name.mp4"
  rm -f "renders/$name-hq.mp4"
  a=$(ffprobe -v error -select_streams a -show_entries stream=codec_name -of csv=p=0 "renders/$name.mp4")
  t=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "renders/$name.mp4")
  echo "   done $name: ${t}s, audio=${a:-NONE}, $(du -h "renders/$name.mp4" | cut -f1)"
done
cd "$root"
