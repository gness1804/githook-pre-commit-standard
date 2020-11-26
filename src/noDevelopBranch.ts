import { PreCommit } from './PreCommit';

(async () => {
  const preCommit = new PreCommit();
  const { stdout: branch } = await preCommit.getCurrentBranch();

  const cleanedBranch = branch.trim().replace('\n', '');

  if (cleanedBranch === 'develop')
    preCommit.resetAndExit(
      `Oops! You are on the ${branch} branch. Please check out a non-develop branch and try again.`,
    );
  else console.info('Branch name checks out.');
})();
