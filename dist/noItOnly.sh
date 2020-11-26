#!/bin/bash

if git diff | grep it.only >/dev/null; then
   echo "Oops! You have an it.only in your code. Please remove it."
   echo $(git diff | grep it.only)
   exit 1
fi
