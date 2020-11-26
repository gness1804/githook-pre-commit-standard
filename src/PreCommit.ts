const { exec } = require('child_process');
const util = require('util');
const promisifiedExec = util.promisify(exec);

interface CurrBranchRes {
  stdout: string;
  stderr: string;
}

export class PreCommit {
  getCurrentBranch(): Promise<CurrBranchRes> {
    return promisifiedExec('git rev-parse --abbrev-ref HEAD');
  }

  resetAndExit(message?: string): void {
    if (message) console.error(message);
    else console.error('Pre-Commit failed.');
    process.exit(1);
  }
}
