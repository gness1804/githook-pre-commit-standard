#!/bin/bash

if git diff -- . ':(exclude)package.json' | grep 'revert' >/dev/null; then
   echo "Oops! You have a revert statement in your code. Please remove it."
   echo $(git diff | grep 'revert')
   exit 1
fi
