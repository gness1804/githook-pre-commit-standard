#!/usr/bin/env zx
/* global $ */

const res = await $`git diff --staged -- . ':(exclude)package.json' | grep 'console'`
if (res) {
  //eslint-disable-next-line no-console
  console.log('sanity check');
  console.info('\n Oops! You have a console statement in your code. Please remove it. \n');
  process.exit(1);
}
