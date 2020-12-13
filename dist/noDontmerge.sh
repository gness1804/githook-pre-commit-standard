#!/bin/bash

if git diff | grep dontmerge >/dev/null; then
   echo "Oops! You have a dontmerge statement in your code. Please remove it."
   echo $(git diff | grep dontmerge)
   exit 1
fi
