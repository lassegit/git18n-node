import { run } from '../src';

describe('blah', () => {
  it('works', () => {
    run();
    expect(typeof run).toEqual('function');
  });
});
