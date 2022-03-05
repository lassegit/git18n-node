//
// CLI implementation
//
import { getAndWriteLocales } from './api/getAndWriteLocales';
import { getConfig } from './utils/getConfig';
import { getPRNumber } from './utils/getPRNumber';
import { getCLIArgs } from './utils/getCLIArgs';
import { extractDefault } from './utils/extractDefault';
import { getLocaleAdditions } from './utils/getLocaleAdditions';
import { createPRComment } from './api/createPRComment';

export function run(cliArgs?: string[]) {
  const { locales } = getConfig();

  // Fetch locales from server
  (async () => {
    await getAndWriteLocales({ locales });
  })();

  const prNumber = getPRNumber() || 13;
  if (prNumber) {
    const { fileGlob, ignore } = getCLIArgs(cliArgs);
    (async () => {
      const extractedDefault = await extractDefault({ fileGlob, ignore });

      const additions = locales.reduce((acc: { [key: string]: number }, locale) => {
        const additions = getLocaleAdditions({ locale, extractedDefault });
        acc[locale] = additions;
        return acc;
      }, {});

      const hasLocaleAdditions = Object.values(additions).some(item => item > 0);
      if (hasLocaleAdditions) {
        const data = await createPRComment({ additions, prNumber });

        if (data.showThrowError) {
          throw new Error(data.error);
        }
      }
    })();
  }

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

  // const prNumber = await getPRNumber();
  // If is run on PR, compare the translations and comment on PR
  // if (prNumber) {
  //   console.log('!!!');
  //   console.log(
  //     `Running on PR #${prNumber.number} and on ${process.env.GITHUB_REPOSITORY}, ${process.env.GITHUB_REF_NAME}`,
  //   );
  //   console.log('!!!');
  //   return;
  // }

  // If is run on master, push new defaultLanguage git18n site
  // Compare all the generated IDs to those server side and remove any not used any more (status="merged")
  // console.log('!!!');
  // console.log(`Running build on master!!!, ${process.env.GITHUB_REF_NAME}`);
  // console.log('!!!');
}
