
#!/bin/bash

if git diff | grep describe.only >/dev/null; then
   echo "Oops! You have an describe.only in your code. Please remove it."
   echo $(git diff | grep describe.only)
   exit 1
fi
