import { getAndWriteLocales } from './api/getAndWriteLocales';
import { sendExtractedToServer } from './api/sendExtractedToServer';
import { getExtractedLocales } from './utils/getExtractedLocales';

export function run() {
  (async () => {
    try {
      // Fetch locales from server
      console.log('Fetching locales from server...');
      await getAndWriteLocales();

      // Extract translations
      console.log('Extracting translations...');
      const extractedLocales = await getExtractedLocales();

      // Send extracted locales to server
      console.log('Sending extracted locales to server...');
      await sendExtractedToServer({ extractedLocales });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();
}
