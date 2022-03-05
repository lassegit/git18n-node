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

export const createPRComment = async ({ additions, prNumber }: Props): Promise<Result> => {
  const githubVars = getGithubVars();
  const body = { additions, prNumber, githubVars };
  return fetch('/create-pr-comment', { method: 'POST', body });
};
