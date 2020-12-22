#!/bin/bash

if git diff -- . ':(exclude)package.json' | grep console >/dev/null; then
   echo "Oops! You have a console statement in your code. Please remove it."
   echo $(git diff | grep console)
   exit 1
fi
