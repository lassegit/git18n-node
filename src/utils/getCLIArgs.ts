type Result = {
  files: string;
  ignore?: string;
};

export const defaultArgs: Result = {
  files: '(components|containers|pages|src|modules)/**/*.{ts,tsx,js,jsx}',
  ignore: '**/*.d.ts',
};

// args: ['--files=(components|pages)/**/*.ts*', '--ignore=**/*.d.ts']
export const getCLIArgs = (args?: string[]): Result => {
  if (!args || args.length === 0) {
    return defaultArgs;
  }

  const result = args.reduce((prev, curr) => {
    const matches = curr.match('--([a-zA-Z0-9]+)=(.*)');
    if (matches) {
      // @ts-ignore
      prev[matches[1]] = matches[2];
    }
    return prev;
  }, {});

  return { ...defaultArgs, ...result };
};
