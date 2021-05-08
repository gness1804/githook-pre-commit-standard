#!/usr/bin/env zx
/* global $ */

try {
  const res = await $`git diff --staged -- . ':(exclude)package.json' | grep -B 2 'it.only'`
  if (res) {
    /* eslint-disable no-console */
    console.info('\n Oops! You have an it.only statement in your code. Please remove it. \n');
    process.exit(1);
  }
} catch(p) {
  console.error(`Exit code: ${p.exitCode}`)
  console.error(`Error: ${p.stderr}`)
}
