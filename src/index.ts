import { getAndWriteLocales } from './api/getAndWriteLocales';
import { sendExtractedToServer } from './api/sendExtractedToServer';
import { getExtractedLocales } from './utils/getExtractedLocales';

export function run() {
  (async () => {
    // Fetch locales from server
    await getAndWriteLocales();

    // Extract translations
    const extractedLocales = await getExtractedLocales();

    // Send extracted locales to server
    await sendExtractedToServer({ extractedLocales });
  })();
}
