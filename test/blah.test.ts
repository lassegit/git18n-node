import { run } from '../src';

describe('blah', () => {
  it('works', () => {
    console.log('GITHUB_ACTION', process.env.GITHUB_ACTION);
    console.log('GITHUB_ACTIONS', process.env.GITHUB_ACTIONS);
    console.log('GITHUB_HEAD_REF', process.env.GITHUB_HEAD_REF);
    console.log('GITHUB_REF', process.env.GITHUB_REF);
    console.log('GITHUB_REF_NAME', process.env.GITHUB_REF_NAME);
    console.log('GITHUB_REPOSITORY', process.env.GITHUB_REPOSITORY);
    console.log('GITHUB_BASE_REF', process.env.GITHUB_BASE_REF);

    expect(typeof run).toEqual('function');
  });
});
