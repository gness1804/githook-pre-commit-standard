#!/bin/bash

## verify that the user is not trying to commit to a forbidden branch (typically master or develop)

function checkBranches()
{
if test "$(git rev-parse --abbrev-ref HEAD)" == $1; then
  echo "**Oops, you are on the $1 branch. Please switch branches before you commit.**" >&2
  exit 1
fi
}

forbiddenBranches=(master develop)

echo "Checking branches..."

for i in "${forbiddenBranches[@]}"
do
  checkBranches "$i"
done

## Run any number of commands; if any fail, the commit fails.

# List of commands to execute
commands=(
    "ruff check ." # python
    # "npm run lint" # for node
    # ...Add more commands as needed
)

# Loop through the commands and execute them
for cmd in "${commands[@]}"; do
    echo "Running: $cmd"
    $cmd
    exit_status=$?

    # Check if command failed
    if [ $exit_status -ne 0 ]; then
        echo "**Command failed: $cmd**"
        exit 1
    fi
done

echo "**Successfully passed pre-commit checks.**"
exit 0
