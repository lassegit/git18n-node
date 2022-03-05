// import { run } from '../src';
const fs = require('fs');

describe('blah', () => {
  it('works', () => {
    const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    console.log(event);
    console.log(event.pull_request);

    expect(1).toEqual(1);
  });
});
