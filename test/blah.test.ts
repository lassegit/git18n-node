import { run } from '../src';

describe('blah', () => {
  it('works', () => {
    console.log(process.env);
    expect(typeof run).toEqual('function');
  });
});
