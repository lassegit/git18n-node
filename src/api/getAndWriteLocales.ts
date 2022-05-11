const fs = require('fs');
const path = require('path');
import { fetch } from './fetch';
import { getSecretAPIKey } from '../utils/getSecretAPIKey';

const LOCALE_DIR = path.join(process.cwd(), '.locales');

type Response = {
  repo: {};
  locales: [{ locale: string; locales?: [{ id: string; t?: string }] }];
};

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
      const { repo, locales = [] } = await fetch<Response>(url, { method: 'GET' });

      console.log(locales);

      locales.forEach(item => {
        const { locale, locales } = item;
        const filePath = path.join(LOCALE_DIR, `${locale}.json`);

        if (!locales || !locales.length) {
          fs.writeFileSync(filePath, JSON.stringify({}));
          return;
        }

        // Format locale file for compilation
        const parsedLocales = locales.reduce((acc: { [key: string]: string }, curr) => {
          acc[curr.id] = curr.t || '';
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
