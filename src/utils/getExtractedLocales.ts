const extract = require('@formatjs/cli');
const fg = require('fast-glob');
const minimist = require('minimist');

export type Result = {
  [key: string]: {
    defaultMessage: string;
    description?: string;
    file: string;
    line: number;
    col?: number;
    end?: number;
    start?: number;
  };
};

const DEFAULT_FILES_ARG = '(components|containers|pages|src|modules)/**/*.{ts,tsx,js,jsx}';
const DEFAULT_IGNORE_ARG = '**/*.d.ts';

export const getExtractedLocales = async (): Promise<Result> => {
  const { files: fileGlob = DEFAULT_FILES_ARG, ignore = DEFAULT_IGNORE_ARG } = minimist(
    process.argv.slice(2),
  );

  try {
    const files = fg.sync(fileGlob, { ignore: ignore });

    // CLI arguments: https://formatjs.io/docs/tooling/cli/#extraction
    const result = await extract.extract(files, {
      idInterpolationPattern: '[sha512:contenthash:base64:6]',
      extractSourceLocation: true,
      removeDefaultMessage: false,
      flatten: true,
      preserveWhitespace: true,
    });
    return JSON.parse(result);
  } catch (error) {
    throw new Error(error as string);
  }
};
