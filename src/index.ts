// Parse local enviromental variables

// Extract new.json file using https://github.com/formatjs/formatjs/tree/main/packages/cli

// Download current.json used and compare with new.json to see if there are any changes

// If translations are required, upload new default.json to server

// Compile translations file in wished language defined in enviromental variable

//
// CLI implementation
//
const extract = require('@formatjs/cli');
const fg = require('fast-glob');

const getArgs = (args?: string[]): { [key: string]: string | undefined } => {
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

export async function run(cliArgs?: string[]) {
  const args = getArgs(cliArgs);

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
    throw new Error(error as string);
  }
}
