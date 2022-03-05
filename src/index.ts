//
// CLI implementation
//
// import { getAndWriteLocales } from './getAndWriteLocales';
// import { getCLIArgs } from './getCLIArgs';
// import { getConfig } from './getConfig';
import { getPRNumber } from './getPRNumber';
import { getOwnerAndRepo } from './utils/getOwnerAndRepo';
import { getAndWriteLocales } from './api/getAndWriteLocales';

export async function run(_cliArgs?: string[]) {
  // const args = getCLIArgs(cliArgs);
  // console.log({ args });

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

  const { owner, repo } = getOwnerAndRepo();
  const data = await getAndWriteLocales({ owner, repo, locales: ['en', 'de'] });
  console.log({ data });

  // Pull translations from server so user can test locally
  // const config = getConfig();
  // await getAndWriteLocales(config.locales);

  // `yarn git18n update` updates the translations files on the server and removes all unused translations
  // if (args.update) {
  //   // const config = getConfig();
  //   // await updateTranslations(config.locales);
  // }

  //
  // Run via Github Actions
  //
  // const GITHUB_ACTIONS = process.env.GITHUB_ACTIONS; // Potentially CIRCLE_PR_NUMBER https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables
  // if (!GITHUB_ACTIONS) {
  //   console.log('!!!');
  //   console.log('Not running in Github Actions, nothing more to do.');
  //   console.log('!!!');
  //   return;
  // }

  // When a PR is merged add new translations (don't remove)
  // When on master branch, extract required IDs, download json files containing all translations and pull out the needed ones, generating new translation files

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
  // Compare all the generated IDs to those server side and remove any not used any more (status="merged")
  // console.log('!!!');
  // console.log(`Running build on master!!!, ${process.env.GITHUB_REF_NAME}`);
  // console.log('!!!');
}
