import { PreCommit } from './PreCommit';

(async () => {
  const preCommit = new PreCommit();
  const { stdout: branch } = await preCommit.getCurrentBranch();

  const cleanedBranch = branch.trim().replace('\n', '');

  if (cleanedBranch === 'master' || cleanedBranch === 'main')
    preCommit.resetAndExit(
      `Oops! You are on the ${branch} branch. Please check out a non-master branch and try again.`,
    );
  /* eslint-disable no-console */ else console.info('Branch name checks out.');
})();
