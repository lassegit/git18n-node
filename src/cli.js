const extract = require('@formatjs/cli');
const fg = require('fast-glob');

const getArgs = args => {
  return args.reduce((prev, curr) => {
    const matches = curr.match('--([a-zA-Z0-9]+)=(.*)');
    console.log({ matches });
    if (matches) {
      prev[matches[1]] = matches[2];
    }
    return prev;
  }, {});
};

async function run(argsCLI) {
  const args = getArgs(argsCLI);

  if (!args.default) {
    throw new Error(`
      Please specify a default language using --default=<language>.
      Example: --default=en or --default=en_us
    `);
  }

  if (!args.translations) {
    throw new Error(`
      Please specify to which language(s) you want to translate.
      Example: --translations=de,fr,es or --translations=de,de_AT
    `);
  }

  if (!args.files) {
    throw new Error(`
      Please specify the files to be translated as using --files=<file-glob>.
      A common use case is: --files='src/**/*.{js,jsx,tsx,ts}'.
      Or multiple folders can be specified: --files='(components|pages)/**/*.{js,jsx,tsx,ts}'
    `);
  }

  try {
    const files = fg.sync(args.files, { ignore: args.ignore });
    const result = await extract.extract(files, {
      idInterpolationPattern: '[sha512:contenthash:base64:6]',
      extractSourceLocation: true,
      removeDefaultMessage: false,
      flatten: false,
      preserveWhitespace: true,
    });
    console.log(JSON.parse(result));
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { run };
