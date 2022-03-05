const extract = require('@formatjs/cli');
const fg = require('fast-glob');

type Props = {
  fileGlob: string;
  ignore?: string;
};

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

export const extractDefault = async ({ fileGlob, ignore }: Props): Promise<Result> => {
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
