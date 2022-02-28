// Parse local enviromental variables

// Extract new.json file using https://github.com/formatjs/formatjs/tree/main/packages/cli

// Download current.json used and compare with new.json to see if there are any changes

// If translations are required, upload new default.json to server

// Compile translations file in wished language defined in enviromental variable

// const path = require('path');
// const fs = require('fs');

export function getMessages(): { [key: string]: string } {
  // const config = JSON.parse(
  //   fs.readFileSync(path.resolve(process.cwd(), 'git18n.config.json'), 'utf8'),
  // );

  // console.log(config);

  // if (!config.translations) {
  //   throw new Error(`
  //     Please speify the translations in the git18n.config.json file.
  //     Example: {
  //       "translations": ["en", "en_us", "de"]
  //     }
  //   `);
  // }

  // console.log(config.translations);

  // const messages = config.translations.reduce((prev: string, curr: string) => {
  //   const file = fs.readFileSync(path.resolve(`${curr}.json`), 'utf8');
  //   // @ts-ignore
  //   prev[curr] = JSON.parse(file);
  //   return prev;
  // }, {});

  // Load all .json files in the translations folder
  return {};
}

// const env = process.env;

// console.log({ env });
