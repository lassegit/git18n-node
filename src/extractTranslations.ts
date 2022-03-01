const extract = require('@formatjs/cli');
const fg = require('fast-glob');
const path = require('path');
const fs = require('fs');

type Props = {
  fileGlob: string;
  ignore?: string;
};

const extractTranslations = async ({ fileGlob, ignore }: Props) => {
  // https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
  try {
    const files = fg.sync(fileGlob, { ignore: ignore });
    const result = await extract.extract(files, {
      idInterpolationPattern: '[sha512:contenthash:base64:6]',
      extractSourceLocation: true,
      removeDefaultMessage: false,
      flatten: false,
      preserveWhitespace: true,
    });
    // console.log(JSON.parse(result));
    return result;
  } catch (error) {
    throw new Error(error as string);
  }
};
