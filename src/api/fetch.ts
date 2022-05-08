const nodefetch = require('node-fetch');
const minimist = require('minimist');
const { local } = minimist(process.argv.slice(2));

// CLI argument "--local true" will use localhost:3000
const URL_ROOT = local ? 'http://localhost:3000/api/cli' : 'https://cli.git18n.com/api/cli';

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Client-Type': 'git18n-node',
};

type Options = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: {};
};

export const fetch = async <T>(url: string, options?: Options): Promise<T> => {
  const parsedUrl = `${URL_ROOT}${url}`;
  const body = JSON.stringify(options?.body);
  const parsedOptions = { ...options, headers: DEFAULT_HEADERS, body };

  return nodefetch(parsedUrl, parsedOptions)
    .then((res: { ok: any; status: string; statusText: string; json: () => any }) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .catch((error: string | undefined) => {
      throw error;
    });
};
