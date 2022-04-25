// const fs = require('fs');
// const path = require('path');
import { getConfig } from './getConfig';

type Props = {
  extractedLocales: {
    [key: string]: {
      defaultMessage: string;
      description?: string;
      file: string;
      col?: number;
      end?: number;
      line?: number;
      start?: number;
    };
  };
};
type Result = {};

export const getNewLocales = ({ extractedLocales }: Props): Result => {
  const { locales } = getConfig();

  if (!locales) {
    // throw new Error('No locales found in config');
    return {};
  }

  // const newLocales = locales.reduce((acc, curr) => {
  //   const file = path.resolve(__dirname, `../../locales/${curr}.json`);
  //   if (!fs.existsSync(file)) {
  //     return { ...acc, [curr]: {} };
  //   }

  //   const localeFile = JSON.parse(fs.readFileSync(file, 'utf8'));
  // }, {});

  return {};
};
