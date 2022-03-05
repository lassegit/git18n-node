import { Result as ExtractResult } from './extractDefault';

type Props = {
  locale: string;
  extractedDefault: ExtractResult;
};

export const getLocaleAdditions = ({ locale, extractedDefault }: Props): number => {
  const localeFile = require(`../locales/${locale}.json`);

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
