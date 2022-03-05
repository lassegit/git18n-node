import fs from 'fs';
import path from 'path';

type Result = {
  defaultLocale: string;
  locales: string[];
};

/**
 * Retrieve the default locale and the list of locales from the config file.
 */
export const getConfig = (): Result => {
  const file = path.resolve(process.cwd(), 'git18n.config.json');

  if (!fs.existsSync(file)) {
    throw new Error(`Couldn't find config file: ${file}`);
  }

  try {
    const result = JSON.parse(fs.readFileSync(file, 'utf8'));

    if (!result.defaultLocale) {
      throw new Error(`
        Missing defaultLocale in config file: ${file}.
        Example: defaultLocale: 'en'
      `);
    }

    if (!result.locales) {
      throw new Error(`
        Missing locales in config file: ${file}.
        Example: locales: ['en', 'en_US', 'de']
      `);
    }

    return result;
  } catch (error) {
    throw error;
  }
};
