import { fetch } from './fetch';

type Props = {
  additions: { [key: string]: number };
  prNumber: number;
};

type Result = {
  showThrowError: boolean; // Will prevent PR to be merged
  throwError: string;
};

const getGithubVars = () => Object.keys(process.env).filter(key => key.startsWith('GITHUB_'));
const getCircleCIVars = () => Object.keys(process.env).filter(key => key.startsWith('CIRCLE_'));

export const createPRComment = async ({ additions, prNumber }: Props): Promise<Result> => {
  const githubVars = getGithubVars();
  const circleCIVars = getCircleCIVars();

  const body = { additions, prNumber, githubVars, circleCIVars };
  return fetch('/post-pr-comment', { method: 'POST', body });
};
