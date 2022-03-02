import { run } from '../src';

describe('blah', () => {
  it('works', () => {
    // run runs the test
    run();

    expect(typeof run).toEqual('function');
  });
});
