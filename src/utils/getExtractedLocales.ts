const extract = require('@formatjs/cli');
const fg = require('fast-glob');

import { getCLIArgs } from './getCLIArgs';

export type Result = {
  [key: string]: {
    defaultMessage: string;
    description?: string;
    file: string;
    col?: number;
    end?: number;
    line?: number;
    start?: number;
  };
};

export const getExtractedLocales = async (cliArgs: string[] | undefined): Promise<Result> => {
  const { files: fileGlob, ignore } = getCLIArgs(cliArgs);

  try {
    const files = fg.sync(fileGlob, { ignore: ignore });
    const result = await extract.extract(files, {
      idInterpolationPattern: '[sha512:contenthash:base64:6]',
      extractSourceLocation: true,
      removeDefaultMessage: false,
      flatten: false,
      preserveWhitespace: true,
    });
    return JSON.parse(result);
  } catch (error) {
    throw new Error(error as string);
  }
};
