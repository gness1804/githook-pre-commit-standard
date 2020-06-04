#!/usr/bin/env node

const { exec } = require('child_process');
/* eslint-disable */
const util = require('util');

const promisifiedExec = util.promisify(exec);

const getCurrentBranch = () => promisifiedExec('git rev-parse --abbrev-ref HEAD');

getCurrentBranch()
.then(res => {
	const regex = /(^wip:?-)|(^exp-)/i;
	if (regex.test(res.stdout)) {
		console.error('Error: cannot push branches starting with "wip" or "exp".')
		process.exit(1);
	} else {
		console.info('Successfully passed pre-push tests.');
		process.exit(0);
	}
})
.catch((err) => {
  console.err(`Error with pre-push hook: ${err}`);
})
