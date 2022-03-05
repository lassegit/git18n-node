import { fetch } from './fetch';

type Props = {
  additions: { [key: string]: number };
  prNumber: number;
};

export const createPRComment = async ({ additions, prNumber }: Props) => {
  const body = { additions, prNumber };
  return fetch('/create-pr-comment', { method: 'POST', body });
};
