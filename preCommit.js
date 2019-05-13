const util = require('util');
const { readFile } = require('fs');
const readline = require('readline');
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askUserAboutWarning = (warning, fileName) => {
  return new Promise(resolve => {
    rl.question(
      `There is one or more instance of ${warning} in ${fileName}. Continue?`,
      answer => {
        const yesRegex = /(y$|yes)/gi;
        if (yesRegex.test(answer)) {
          resolve();
        } else {
          resetAndExit('Aborting.');
        }
      },
    );
  });
};

const forbiddenBranches = ['master', 'develop'];

const getCurrentBranch = () => {
  return promisifiedExec('git rev-parse --abbrev-ref HEAD');
};

const getListOfChangedFiles = () => {
  return promisifiedExec('git diff --name-only');
};

const checkFile = async (data, name) => {
  if (data.match(/debugger/g) && data.match(/debugger/g).length) {
    await askUserAboutWarning(/debugger/g, name);
  }
  if (data.match(/console/g) && data.match(/console/g).length) {
    await askUserAboutWarning(/console/g, name);
  }
  if (data.match(/HEAD/g) && data.match(/HEAD/g).length) {
    await askUserAboutWarning(/HEAD/g, name);
  }
  if (data.match(/it.only/g) && data.match(/it.only/g).length) {
    await askUserAboutWarning(/it.only/g, name);
  }
  if (data.match(/revert/g) && data.match(/revert/g).length) {
    await askUserAboutWarning(/revert/g, name);
  }
  if (data.match(/TODO/g) && data.match(/TODO/g).length) {
    await askUserAboutWarning(/TODO/g, name);
  }
  if (data.match(/it.skip/g) && data.match(/it.skip/g).length) {
    await askUserAboutWarning(/it.skip/g, name);
  }
  rl.close();
};

const loopThroughFiles = files => {
  for (const file of files) {
    if (file) {
      promisifiedReadFile(file, 'utf-8').then(fileData =>
        checkFile(fileData, file),
      );
    }
  }
};

const checkForWarnings = () => {
  return getListOfChangedFiles()
    .then(data => data.stdout.split('\n'))
    .then(files => loopThroughFiles(files));
};

getCurrentBranch()
  .then(ret => {
    const currentBranch = ret.stdout;
    for (const branch of forbiddenBranches) {
      if (currentBranch.includes(branch)) {
        resetAndExit(
          `Oops, you are on the ${branch} branch. Please switch branches before you commit.`,
        );
      }
    }
  })
  .then(() => {
    checkForWarnings();
  })
  .then(() => {
    return promisifiedExec('npm run prettier');
  })
  .then(() => {
    return promisifiedExec('npm run lint');
  })
  .then(() => {
    return promisifiedExec('npm run stylelint');
  })
  .then(() => {
    return promisifiedExec('npm run test');
  })
  .then(() => {
    process.stdout.write('Sucessfully passed pre-commit checks.');
  })
  .catch(err => {
    const errorMessage = `Error: ${err.message || JSON.stringify(err)}`;
    resetAndExit(errorMessage);
  });
