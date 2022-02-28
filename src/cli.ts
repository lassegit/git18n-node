//
// CLI implementation
//
const extract = require('@formatjs/cli');
const fg = require('fast-glob');
const path = require('path');
const fs = require('fs');
// const fetch = require('node-fetch');

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

const getSecretKey = (): string | undefined => {
  if (process.env.GIT18N_SECRET_API_KEY_ENV) {
    return process.env.GIT18N_SECRET_API_KEY_ENV;
  }

  const config = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf8');

  if (config) {
    const configArr = config.split(/\r?\n/).reduce((prev: string, curr: string) => {
      const [key, value] = curr.split('=');
      if (key && value) {
        // @ts-ignore
        prev[key] = value.replace(/"/g, '');
      }
      return prev;
    }, {});

    return configArr.GIT18N_SECRET_API_KEY;
  }

  return;
};

export async function run(cliArgs?: string[]) {
  const args = getArgs(cliArgs);
  const config = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'git18n.config.json'), 'utf8'),
  );
  const secretApiKey = getSecretKey();

  console.log({ secretApiKey, config });

  // if (!args.default) {
  //   throw new Error(`
  //     Please specify a default language using --default=<language>.
  //     Example: --default=en or --default=en_us
  //   `);
  // }
  // if (!args.translations) {
  //   throw new Error(`
  //     Please specify to which language(s) you want to translate.
  //     Example: --translations=de,fr,es or --translations=de,de_AT
  //   `);
  // }

  if (!args.files) {
    throw new Error(`
      Please specify the files to be translated as using --files=<file-glob>.
      A common use case is: --files='src/**/*.{js,jsx,tsx,ts}'.
      Or multiple folders can be specified: --files='(components|pages)/**/*.{js,jsx,tsx,ts}'
    `);
  }

  // Retrieve translated files web and save to locales
  // const { translations } = config;
  // const translationFilesPromises = translations.map(async (locale: string) => {
  //   return fetch(`https://git18n.com/api/v1/translations/${locale}`);
  // });
  // const translationFiles = await Promise.all(translationFilesPromises);
  // translationFiles.forEach((file, index) => {
  //   fs.writeFileSync(path.resolve(`locales/${translations[index]}.json`), file.text());
  // });

  // https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
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
