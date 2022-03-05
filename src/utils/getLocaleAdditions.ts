import { Result as ExtractResult } from './extractDefault';
const fs = require('fs');
const path = require('path');

type Props = {
  locale: string;
  extractedDefault: ExtractResult;
};

export const getLocaleAdditions = ({ locale, extractedDefault }: Props): number => {
  const file = path.resolve(__dirname, `../../locales/${locale}.json`);

  if (!fs.existsSync(file)) {
    throw new Error(`Couldn't find locale file: ${file}`);
  }

  const localeFile = JSON.parse(fs.readFileSync(file, 'utf8'));

  const additions = Object.keys(extractedDefault).reduce(
    (acc: { [key: string]: {} }, curr: string) => {
      if (!localeFile[curr]) {
        acc[curr] = extractedDefault[curr];
      }

      return acc;
    },
    {},
  );

  return Object.keys(additions).length;
};
