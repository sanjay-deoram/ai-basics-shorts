#!/bin/sh
# Runs the GitHub CLI as the personal account (sanjay-deoram), which owns this repo, using the login git
# already saved in Git Credential Manager (no browser sign-in), and opens any --web page in Edge.
# The global gh login stays on the work account (sanjay-deoram-pvx).
#
# Usage (Git Bash, from the repo):  sh studio/tools/gh-personal.sh pr create ...   |   ... pr view --web
GH_TOKEN=$(printf 'protocol=https\nhost=github.com\nusername=sanjay-deoram\n\n' | git credential fill | sed -n 's/^password=//p')
[ -n "$GH_TOKEN" ] || { echo "No saved GitHub login for sanjay-deoram; run: git fetch (it will ask once)" >&2; exit 1; }
export GH_TOKEN
export GH_BROWSER='"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"'
exec gh "$@"
