const fs = require('fs');
const path = require('path');

//
// Get github owner and repo name.
// 1. From .git/config
// 2. GITHUB_ enviromental variables
// 3. CIRCLE_ enviromental variables
//
export const getOwnerAndRepo = (): { repo: string; owner: string } => {
  // (try/catch)
  const file = fs.readFileSync(path.resolve(process.cwd(), './.git/config'), 'utf8');

  // const match = file.match(
  //   /(?:git@|https:\/\/)(?:[^\.]+\.)?(?<owner>[^\/:]+)\.(?<repo>[^\/:]+)(?:\/[^\.]+)?/,
  // );
  // if (match) {
  //   return {
  //     owner: match.groups.owner,
  //     repo: match.groups.repo,
  //   };
  // }

  const matches = file.match(/url = (.*)/);

  if (!matches) {
    throw new Error("Can't find url in .git/config");
  }

  // Parse: "url = git@github.com:lassegit/next-i18n-test-app.git"
  const [, url] = matches;
  const ownerAndRepo = url.split(':')[1];

  const [owner, repoWithDotGit] = ownerAndRepo.split('/');
  const repo = repoWithDotGit.replace('.git', '');

  return { owner, repo };
};
