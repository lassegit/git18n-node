const fs = require('fs');
const path = require('path');

const { GIT18N_SECRET_PROJECT_KEY } = process.env;

/**
 * Reads the project specific access token from either the process.env or .env file
 */
export const getSecretAPIKey = (): string | undefined => {
  if (GIT18N_SECRET_PROJECT_KEY) {
    return GIT18N_SECRET_PROJECT_KEY;
  }

  const file = path.resolve(process.cwd(), '.env');

  if (!fs.existsSync(file)) {
    throw new Error(`Couldn't find .env: ${file}`);
  }

  try {
    const result = fs.readFileSync(file, 'utf8');
    const lines = result.toString().split('\n');
    const line = lines.find((line: string) => {
      const match = line.match(/^([^=:#]+?)[=:](.*)/);
      return match && match[1].includes('GIT18N_SECRET_PROJECT_KEY');
    });

    if (!line) {
      throw new Error(`Couldn't find GIT18N_SECRET_PROJECT_KEY in ${file}`);
    }

    const variable = line
      .match(/^([^=:#]+?)[=:](.*)/)[2]
      .trim()
      .replace(/"/g, '')
      .replace(/'/g, '');

    if (!variable) {
      throw new Error(`Couldn't parse GIT18N_SECRET_PROJECT_KEY correctly from ${file}`);
    }

    return variable;
  } catch (error) {
    throw error;
  }
};
