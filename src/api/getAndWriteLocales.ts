import { fetch } from './fetch';
import { getSecretAPIKey } from '../utils/getSecretAPIKey';
import { ExtractedLocales } from '../utils/types';
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const { prettyLocale } = minimist(process.argv.slice(2));

const LOCALE_DIR = path.join(process.cwd(), '.locales');

type Props = {
  extractedLocales: ExtractedLocales;
};

type Response = {
  repo: {};
  locales: Array<{ locale: string; locales?: Array<{ id: string; t?: string }> }>;
};

/**
 * Fetches locales from the server and writes them to the locales folder
 */
export const getAndWriteLocales = async ({ extractedLocales }: Props) => {
  const accessToken = getSecretAPIKey();
  const url = `/${accessToken}`;

  // Create default .locale dir if doesn't exist
  if (!fs.existsSync(LOCALE_DIR)) {
    fs.mkdirSync(LOCALE_DIR);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const { repo, locales = [] } = await fetch<Response>(url, { method: 'GET' });

      locales.forEach(item => {
        const { locale, locales } = item;
        const filePath = path.join(LOCALE_DIR, `${locale}.json`);

        if (!locales || !locales.length) {
          fs.writeFileSync(filePath, JSON.stringify({}));
          return;
        }

        // Format locale file for compilation
        const parsedLocales = locales.reduce((acc: { [key: string]: string }, curr) => {
          // Don't add it to locale unless it exists in present extraction
          if (!extractedLocales[curr.id]) {
            return acc;
          }

          acc[curr.id] = curr.t || '';

          return acc;
        }, {});

        // Option to pretty print locale files
        const replacer = undefined;
        const space = prettyLocale ? 2 : undefined;
        fs.writeFileSync(filePath, JSON.stringify(parsedLocales, replacer, space));
      });

      resolve({ repo, locales });
    } catch (error) {
      reject(error);
    }
  });
};
