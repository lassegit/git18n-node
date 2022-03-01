//
// CLI implementation
//
import { getAndWriteLocales } from './getAndWriteLocales';
import { getCLIArgs } from './getCLIArgs';
import { getSecretAPIKey } from './getSecretAPIKey';
import { getConfig } from './getConfig';

export async function run(cliArgs?: string[]) {
  const args = getCLIArgs(cliArgs);
  const config = getConfig();
  const secretApiKey = getSecretAPIKey();
  console.log({ secretApiKey });

  // if (!args.defaultLocale) {
  //   throw new Error(`
  //     Please specify a default language using --default=<language>.
  //     Example: --default=en or --default=en_us
  //   `);
  // }
  // if (!args.locales) {
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

  getAndWriteLocales(config.translations);

  //
  // Run via Github Actions
  //

  // If is run on PR, compare the translations and comment on PR
  // if () {}

  // If is run on master, push new defaultLanguage git18n site
}
