import { PreCommit } from './PreCommit';

(async () => {
  const preCommit = new PreCommit();
  const { stdout: branch } = await preCommit.getCurrentBranch();

  const cleanedBranch = branch.trim().replace('\n', '');

  if (cleanedBranch === 'master' || cleanedBranch === 'main') preCommit.resetAndExit();
  else console.info('Branch name checks out.');
})();
