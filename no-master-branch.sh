#!/bin/bash

if test "$(git rev-parse --abbrev-ref HEAD)" == "master"; then
  echo "Oops, you are on the master branch. Please switch branches before you commit." >&2
  exit 1
fi
