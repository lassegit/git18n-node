const fs = require('fs');
const path = require('path');
import { fetch } from './fetch';
import { getSecretAPIKey } from '../utils/getSecretAPIKey';

const LOCALE_DIR = path.join(process.cwd(), '.locales');

/**
 * Fetches locales from the server and writes them to the locales folder
 */
export const getAndWriteLocales = async () => {
  const accessToken = getSecretAPIKey();
  const url = `/${accessToken}`;

  // Create default .locale dir if doesn't exist
  if (!fs.existsSync(LOCALE_DIR)) {
    fs.mkdirSync(LOCALE_DIR);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const { repo, locales = [] } = await fetch(url, { method: 'GET' });

      locales.forEach((item: { locale: string; locales: [{ id: string; t?: string }] }) => {
        const { locale, locales } = item;
        const filePath = path.join(LOCALE_DIR, `${locale}.json`);

        if (!locales || !locales.length) {
          fs.writeFileSync(filePath, JSON.stringify({}));
          return;
        }

        // Format locale file for compilation
        const parsedLocales = locales.reduce((acc: { [key: string]: any }, curr) => {
          acc[curr.id] = curr.t;
          return acc;
        }, {});

        fs.writeFileSync(filePath, JSON.stringify(parsedLocales));
      });

      resolve({ repo, locales });
    } catch (error) {
      reject(error);
    }
  });
};
