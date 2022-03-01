const fs = require('fs');
const path = require('path');

export const getGithubInfo = (): { repo: string; owner: string } => {
  const file = fs.readFileSync(path.resolve(process.cwd(), './.git/config'), 'utf8');
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
