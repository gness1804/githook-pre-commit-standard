#!/bin/bash

if git diff -- . ':(exclude)package.json' | grep 'debug' >/dev/null; then
   echo "Oops! You have a debug statement in your code. Please remove it."
   echo $(git diff | grep 'debug')
   exit 1
fi
