import fs from 'fs';
import path from 'path';

type Result = {
  defaultLanguage: string;
  locales: string[];
};

export const getConfig = (): Result => {
  const file = path.resolve(process.cwd(), 'git18n.config.json');

  if (!fs.existsSync(file)) {
    throw new Error(`Couldn't find config file: ${file}`);
  }

  try {
    const result = JSON.parse(fs.readFileSync(file, 'utf8'));

    if (!result.defaultLanguage) {
      throw new Error(`
        Missing defaultLanguage in config file: ${file}.
        Example: defaultLanguage: 'en'
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
    throw new Error(error);
  }
};
