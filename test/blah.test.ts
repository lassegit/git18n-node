import { run } from '../src';
const fs = require('fs');

describe('blah', () => {
  it('works', () => {
    const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    console.log(event);

    expect(typeof run).toEqual('function');
  });
});
