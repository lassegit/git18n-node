import { getAndWriteLocales } from './api/getAndWriteLocales';
import { sendExtractedToServer } from './api/sendExtractedToServer';
import { getExtractedLocales } from './utils/getExtractedLocales';

export function run(cliArgs?: string[]) {
  // const { locales } = getConfig();
  // Todo: Add minimalist for parsing args https://www.npmjs.com/package/minimist

  (async () => {
    // Fetch locales from server
    await getAndWriteLocales();

    // Extract translations
    // const { locales } = getConfig();
    // const { files, ignore } = getCLIArgs(cliArgs);
    const extractedLocales = await getExtractedLocales(cliArgs);
    console.log({ extractedLocales });

    const result = await sendExtractedToServer({ extractedLocales });
    console.log({ result });

    // Check if new translations were added
    // const newLocales = await getNewLocales({ extractedLocales });
    // const additions = locales.reduce((acc: { [key: string]: number }, locale) => {
    //   const additions = getLocaleAdditions({ locale, extractedDefault });
    //   acc[locale] = additions;
    //   return acc;
    // }, {});

    // const hasLocaleAdditions = Object.values(additions).some(item => item > 0);

    // console.log({ additions, hasLocaleAdditions });
  })();

  // Runs in the CI pipeline
  // const prNumber = getPRNumber();
  // if (prNumber) {
  //   const { files, ignore } = getCLIArgs(cliArgs);

  //   (async () => {
  //     const extractedDefault = await extractDefault({
  //       fileGlob: files,
  //       ignore,
  //     });

  //     const additions = locales.reduce((acc: { [key: string]: number }, locale) => {
  //       const additions = getLocaleAdditions({
  //         locale,
  //         extractedDefault,
  //       });
  //       acc[locale] = additions;
  //       return acc;
  //     }, {});

  //     const hasLocaleAdditions = Object.values(additions).some(item => item > 0);
  //     if (hasLocaleAdditions) {
  //       const { shouldThrowError, throwError } = await createPRComment({ additions, prNumber });

  //       if (shouldThrowError) {
  //         throw new Error(throwError);
  //       }
  //     }
  //   })();
  // }
}
