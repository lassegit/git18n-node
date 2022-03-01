const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

export async function getAndWriteLocales(translations: string[]) {
  const translationFilesPromises = translations.map(async (locale: string) => {
    // const githubUser = 'git18n';
    // const githubRepo = 'git18n-translations';
    // const url = `https://git18n.com/api/v1/translations/${githubUser}/${githubRepo}/${locale}`;
    return fetch(`https://jsonplaceholder.typicode.com/posts/1?locale=${locale}`);
  });

  Promise.all(translationFilesPromises)
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => {
      data.forEach((file, index) => {
        fs.writeFileSync(
          path.resolve(`./node_modules/git18n/locales/${translations[index]}.json`),
          JSON.stringify(file, null, 2),
        );
      });
    })
    .catch(error => {
      throw new Error(error);
    });
}
