const util = require('util');
const { readFile } = require('fs');
const { exec } = require('child_process');

const promisifiedExec = util.promisify(exec);
const promisifiedReadFile = util.promisify(readFile);

const resetAndExit = message => {
  promisifiedExec('git reset HEAD .')
    .then(() => {
      process.stderr.write(message);
    })
    .then(() => {
      process.exit(1);
    });
};

const forbiddenBranches = ['master', 'develop'];

const getCurrentBranch = () => promisifiedExec('git rev-parse --abbrev-ref HEAD');

const getListOfChangedFiles = () => promisifiedExec('git diff --name-only');

const checkFile = async (data) => {
  if (data.match(/debugger/g) && data.match(/debugger/g).length) {
    resetAndExit('Error: debugger. Exiting.');
  }
  if (data.match(/console/g) && data.match(/console/g).length) {
    resetAndExit('Error: console statement. Exiting.');
  }
  if (data.match(/it.only/g) && data.match(/it.only/g).length) {
    resetAndExit('Error: it.only. Exiting.');
  }
  if (data.match(/revert/g) && data.match(/revert/g).length) {
    resetAndExit('Error: revert. Exiting.');
  }
};

const loopThroughFiles = files => {
  for (const file of files) {
    if (file) {
      promisifiedReadFile(file, 'utf-8').then(fileData => checkFile(fileData));
    }
  }
};

const checkForWarnings = () => getListOfChangedFiles()
  .then(data => data.stdout.split('\n'))
  .then(files => loopThroughFiles(files));

getCurrentBranch()
  .then(ret => {
    const currentBranch = ret.stdout.trim().replace('\n', '');
    return forbiddenBranches.find(branch => branch === currentBranch);
  })
  .then((ret) => ret ? resetAndExit(`Oops, you are on the ${ret} branch. Please switch branches before you commit.`) : undefined)
  .then(() => {
    checkForWarnings();
  })
  .then(() => promisifiedExec('npm run prettier'))
  .then(() => promisifiedExec('npm run lint'))
  .then(() => promisifiedExec('npm run stylelint'))
  .then(() => promisifiedExec('npm run test'))
  .then(() => {
    process.stdout.write('Sucessfully passed pre-commit checks.');
    process.exit(0);
  })
  .catch(err => {
    const errorMessage = `Error: ${err.message || JSON.stringify(err)}`;
    resetAndExit(errorMessage);
  });
