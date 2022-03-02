//
// CLI implementation
//
// import { getAndWriteLocales } from './getAndWriteLocales';
import { getCLIArgs } from './getCLIArgs';
// import { getConfig } from './getConfig';
import { getOwnerAndRepo } from './getOwnerAndRepo';
import { getPRNumber } from './getPRNumber';

export async function run(cliArgs?: string[]) {
  const args = getCLIArgs(cliArgs);
  console.log({ args });
  console.log(getOwnerAndRepo());

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
  // if (!args.files) {
  //   throw new Error(`
  //     Please specify the files to be translated as using --files=<file-glob>.
  //     A common use case is: --files='src/**/*.{js,jsx,tsx,ts}'.
  //     Or multiple folders can be specified: --files='(components|pages)/**/*.{js,jsx,tsx,ts}'
  //   `);
  // }

  // Pull translations from server so user can test locally
  // const config = getConfig();
  // await getAndWriteLocales(config.locales);

  //
  // Run via Github Actions
  //
  const GITHUB_ACTIONS = process.env.GITHUB_ACTIONS;
  if (!GITHUB_ACTIONS) {
    console.log('!!!');
    console.log('Not running in Github Actions, nothing more to do.');
    console.log('!!!');
    return;
  }

  const prNumber = await getPRNumber();

  // If is run on PR, compare the translations and comment on PR
  if (prNumber) {
    console.log('!!!');
    console.log(
      `Running on PR #${prNumber.number} and on ${process.env.GITHUB_REPOSITORY}, ${process.env.GITHUB_REF_NAME}`,
    );
    console.log('!!!');
    return;
  }

  // If is run on master, push new defaultLanguage git18n site
  console.log('!!!');
  console.log(`Running build on master!!!, ${process.env.GITHUB_REF_NAME}`);
  console.log('!!!');
}
