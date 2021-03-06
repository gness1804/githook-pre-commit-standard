#!/bin/bash

# verify that user is not trying to commit to master or develop
function checkBranches()
{
if test "$(git rev-parse --abbrev-ref HEAD)" == $1; then
  echo "Oops, you are on the $1 branch. Please switch branches before you commit." >&2
  exit 1
fi
}

if git diff | grep console >/dev/null; then
   echo "Oops! You have a console statement in your code. Please remove it."
   echo $(git diff | grep console)
   exit 1
fi

if git diff | grep it.only >/dev/null; then
   echo "Oops! You have an it.only in your code. Please remove it."
   echo $(git diff | grep it.only)
   exit 1
fi

if git diff | grep describe.only >/dev/null; then
   echo "Oops! You have an describe.only in your code. Please remove it."
   echo $(git diff | grep describe.only)
   exit 1
fi

if git diff | grep 'revert this' >/dev/null; then
   echo "Oops! You have a revert statement in your code. Please remove it."
   echo $(git diff | grep 'revert this')
   exit 1
fi

if git diff | grep 'debug' >/dev/null; then
   echo "Oops! You have a debug statement in your code. Please remove it."
   echo $(git diff | grep 'debug')
   exit 1
fi

forbiddenBranches=(master develop)

for i in "${forbiddenBranches[@]}"
do
  checkBranches "$i"
done

{
  npm run lint
  } || {
    echo  "npm run lint failed."
    exit 1
}

echo "Successfully passed pre-commit checks."
exit 0
