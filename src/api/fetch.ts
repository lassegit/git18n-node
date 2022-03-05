const nodefetch = require('node-fetch');
import { getSecretAPIKey } from '../getSecretAPIKey';

// const URL_ROOT = '';
// const IS_PROD = process.env.NODE_ENV === 'production';
// const URL_ROOT = IS_PROD
//   ? 'https://git18n.com/api/git18n-node/v1'
//   : 'http://localhost:3000/api/git18n-node/v1';
const TOKEN = getSecretAPIKey();

export const fetch = async <T>(url: string, options?: { headers?: {} }): Promise<T> => {
  const parsedUrl = `${url}`;
  const parsedOptions = {
    ...options,
    headers: {
      Accept: 'application/json',
      Authorization: `token ${TOKEN}`,
      'Content-Type': 'application/json',
      'X-Client-Type': 'git18n-node',
      ...options?.headers,
    },
  };

  return nodefetch(parsedUrl, parsedOptions)
    .then((res: { ok: any; status: string; statusText: string; json: () => any }) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .catch((error: string | undefined) => {
      throw new Error(error);
    });
};
