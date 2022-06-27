import { fetch } from './fetch';
import { getSecretAPIKey } from '../utils/getSecretAPIKey';
import { ExtractedLocales } from '../utils/types';
const minimist = require('minimist');
const { clean } = minimist(process.argv.slice(2));

type Props = {
  extractedLocales: ExtractedLocales;
};

type Response = {
  message: string;
  status: number;
};

export const sendExtractedToServer = async ({ extractedLocales }: Props) => {
  const accessToken = getSecretAPIKey();
  const url = `/${accessToken}`;
  const body = { locales: extractedLocales, clean };

  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch<Response>(url, { method: 'POST', body });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
