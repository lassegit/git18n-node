const fs = require('fs');
const path = require('path');
import { fetch } from './fetch';

type Props = {
  locales: string[];
};

/**
 * Fetches locales from the server and writes them to the locales folder
 */
export const getAndWriteLocales = async ({ locales }: Props) => {
  const localePromises = locales.map(async (locale: string) => {
    return {
      locale,
      content: await fetch(`/get-locales/${locale}`, { method: 'GET' }),
    };
  });

  return new Promise((resolve, reject) => {
    Promise.all(localePromises)
      .then(data => {
        data.forEach(({ locale, content }) => {
          fs.writeFileSync(
            path.resolve(`./node_modules/git18n/locales/${locale}.json`),
            JSON.stringify(content),
            'utf-8',
            (error: any) => {
              if (error) {
                reject(new Error(error));
              }
            },
          );
        });

        resolve(data);
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};
