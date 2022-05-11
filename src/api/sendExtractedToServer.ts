import { fetch } from './fetch';
import { getSecretAPIKey } from '../utils/getSecretAPIKey';

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

type Response = {
  message: string;
  status: number;
};

export const sendExtractedToServer = async ({ extractedLocales }: Props) => {
  const accessToken = getSecretAPIKey();
  const url = `/${accessToken}`;
  const body = { locales: extractedLocales };

  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch<Response>(url, { method: 'POST', body });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
