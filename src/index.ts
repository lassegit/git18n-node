import { getAndWriteLocales } from './api/getAndWriteLocales';
import { sendExtractedToServer } from './api/sendExtractedToServer';
import { getExtractedLocales } from './utils/getExtractedLocales';

// Todo: Add minimalist for parsing args https://www.npmjs.com/package/minimist

export function run(cliArgs?: string[]) {
  (async () => {
    // Fetch locales from server
    await getAndWriteLocales();

    // Extract translations
    const extractedLocales = await getExtractedLocales(cliArgs);

    // Send extracted locales to server
    await sendExtractedToServer({ extractedLocales });
  })();
}
