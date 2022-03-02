import { run } from '../src';
const fs = require('fs');
describe('blah', () => {
  it('works', () => {
    // run runs the test
    run();

    const ev = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
    console.log(ev);
    const prNum = ev?.pull_request?.number;
    console.log(prNum);

    expect(typeof run).toEqual('function');
  });
});
