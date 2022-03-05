import { fetch } from './fetch';

type Props = {
  additions: { [key: string]: number };
  prNumber: number;
};

type Result = {
  showThrowError: boolean; // Will prevent PR to be merged
  error: string;
};

export const createPRComment = async ({ additions, prNumber }: Props): Promise<Result> => {
  const body = { additions, prNumber };
  return fetch('/create-pr-comment', { method: 'POST', body });
};
