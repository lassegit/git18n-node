export const getCLIArgs = (args?: string[]): { [key: string]: string | undefined } => {
  if (!args || args.length === 0) {
    return {};
  }

  return args.reduce((prev, curr) => {
    const matches = curr.match('--([a-zA-Z0-9]+)=(.*)');
    if (matches) {
      // @ts-ignore
      prev[matches[1]] = matches[2];
    }
    return prev;
  }, {});
};
