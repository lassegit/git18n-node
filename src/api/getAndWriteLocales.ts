const fs = require('fs');
const path = require('path');
import { fetch } from './fetch';
import { getSecretAPIKey } from '../utils/getSecretAPIKey';

/**
 * Fetches locales from the server and writes them to the locales folder
 */
export const getAndWriteLocales = async () => {
  const accessToken = getSecretAPIKey();
  const url = `/${accessToken}`;

  return new Promise(async (resolve, reject) => {
    try {
      const { repo, locales } = await fetch(url, { method: 'GET' });

      locales.forEach((item: { locale: string; locales: {} }) => {
        const { locale, locales } = item;
        const filePath = path.join(__dirname, '../locales', `${locale}.json`);
        fs.writeFileSync(filePath, JSON.stringify(locales, null, 2));
      });

      resolve({ repo, locales });
    } catch (error) {
      reject(error);
    }
  });
};
