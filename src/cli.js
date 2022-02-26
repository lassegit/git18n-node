const extract = require('@formatjs/cli');
const fg = require('fast-glob');

const getArgs = args => {
  return args.reduce((prev, curr) => {
    const matches = curr.match('--([a-zA-Z0-9]+)=(.*)');
    if (matches) {
      prev[matches[1]] = matches[2];
    }
    return prev;
  }, {});
};

async function run(args) {
  const arguments = getArgs(args);

  if (!arguments.default) {
    throw new Error(`
      Please specify a default language using --default=<language>.
      Example: --default=en or --default=en_us
    `);
  }

  if (!arguments.translations) {
    throw new Error(`
      Please specify to which language(s) you want to translate.
      Example: --translations=de,fr,es or --translations=de,de_AT
    `);
  }

  if (!arguments.files) {
    throw new Error(`
      Please specify the files to be translated as using --files=<file-glob>.
      A common use case is: --files='src/**/*.{js,jsx,tsx,ts}'.
      Or multiple folders can be specified: --files='(components|pages)/**/*.{js,jsx,tsx,ts}'
    `);
  }

  try {
    const files = fg.sync(arguments.files, { ignore: arguments.ignore });
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
