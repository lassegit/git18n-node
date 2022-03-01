import { run } from '../src';

describe('blah', () => {
  it('works', () => {
    const vars = process.env;
    console.log(process.env);

    expect(typeof run).toEqual('function');
  });
});
