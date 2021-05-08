#!/usr/bin/env zx
/* global $ */

const res = await $`git diff --staged -- . ':(exclude)package.json' | grep 'revert'`
if (res) {
  //eslint-disable-next-line no-console
  console.info('\n Oops! You have a revert statement in your code. Please remove it. \n');
  process.exit(1);
}
