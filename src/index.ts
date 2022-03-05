import { getAndWriteLocales } from './api/getAndWriteLocales';
import { getConfig } from './utils/getConfig';
import { getPRNumber } from './utils/getPRNumber';
import { getCLIArgs } from './utils/getCLIArgs';
import { extractDefault } from './utils/extractDefault';
import { getLocaleAdditions } from './utils/getLocaleAdditions';
import { createPRComment } from './api/createPRComment';

export function run(cliArgs?: string[]) {
  const { locales } = getConfig();

  (async () => {
    // Fetch locales from server
    await getAndWriteLocales({ locales });
  })();

  const prNumber = getPRNumber();
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
        const { showThrowError, throwError } = await createPRComment({ additions, prNumber });

        if (showThrowError) {
          throw new Error(throwError);
        }
      }
    })();
  }
}
