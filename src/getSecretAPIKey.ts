const fs = require('fs');
const path = require('path');

export const getSecretAPIKey = (): string | undefined => {
  if (process.env.GIT18N_SECRET_API_KEY_ENV) {
    return process.env.GIT18N_SECRET_API_KEY_ENV;
  }

  const config = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf8');

  if (config) {
    const configArr = config.split(/\r?\n/).reduce((prev: string, curr: string) => {
      const [key, value] = curr.split('=');
      if (key && value) {
        // @ts-ignore
        prev[key] = value.replace(/"/g, '');
      }
      return prev;
    }, {});

    return configArr.GIT18N_SECRET_API_KEY;
  }

  return;
};
