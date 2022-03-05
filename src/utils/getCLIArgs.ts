type Result = {
  fileGlob: string;
  ignore?: string;
};

const defaultResult: Result = {
  fileGlob: '(components|pages|src|modules)/**/*.{ts,tsx,js,jsx}',
  ignore: '**/*.d.ts',
};

export const getCLIArgs = (args?: string[]): Result => {
  if (!args || args.length === 0) {
    return defaultResult;
  }

  const result = args.reduce((prev, curr) => {
    const matches = curr.match('--([a-zA-Z0-9]+)=(.*)');
    if (matches) {
      // @ts-ignore
      prev[matches[1]] = matches[2];
    }
    return prev;
  }, {});

  return { ...result, ...defaultResult };
};
