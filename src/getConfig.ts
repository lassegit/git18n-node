const fs = require('fs');
const path = require('path');

export const getConfig = () => {
  const config = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), 'git18n.config.json'), 'utf8'),
  );
  return config;
};
