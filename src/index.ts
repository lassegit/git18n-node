import { getAndWriteLocales } from './api/getAndWriteLocales';
import { getConfig } from './utils/getConfig';
import { getPRNumber } from './utils/getPRNumber';
import { getCLIArgs } from './utils/getCLIArgs';
import { extractDefault } from './utils/extractDefault';
import { getLocaleAdditions } from './utils/getLocaleAdditions';
import { createPRComment } from './api/createPRComment';

export function run(cliArgs?: string[]) {
  const { locales } = getConfig();
  // Todo: Add minimalist for parsing args https://www.npmjs.com/package/minimist

  (async () => {
    // Fetch locales from server
    await getAndWriteLocales({ locales });
  })();

  // Runs in the CI pipeline
  const prNumber = getPRNumber();
  if (prNumber) {
    const { files, ignore } = getCLIArgs(cliArgs);

    (async () => {
      const extractedDefault = await extractDefault({
        fileGlob: files,
        ignore,
      });

      const additions = locales.reduce((acc: { [key: string]: number }, locale) => {
        const additions = getLocaleAdditions({
          locale,
          extractedDefault,
        });
        acc[locale] = additions;
        return acc;
      }, {});

      const hasLocaleAdditions = Object.values(additions).some(item => item > 0);
      if (hasLocaleAdditions) {
        const { shouldThrowError, throwError } = await createPRComment({ additions, prNumber });

        if (shouldThrowError) {
          throw new Error(throwError);
        }
      }
    })();
  }
}
