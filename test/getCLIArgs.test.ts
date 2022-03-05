import { defaultArgs, getCLIArgs } from '../src/utils/getCLIArgs';

test('Returns custom args', () => {
  const args = ['--files=(components|pages)/**/*.js*', '--ignore=**/*.js'];
  const result = { files: '(components|pages)/**/*.js*', ignore: '**/*.js' };
  expect(getCLIArgs(args)).toEqual(result);
});

test('Missing cli args returns default', () => {
  expect(getCLIArgs()).toEqual(defaultArgs);
});

test('Missing files but ignores', () => {
  const args = ['--ignore=**/*.js'];
  expect(getCLIArgs(args)).toEqual({ ...defaultArgs, ignore: '**/*.js' });
});

test('Missing ignore but files', () => {
  const args = ['--files=(components|pages)/**/*.ts*'];
  expect(getCLIArgs(args)).toEqual({ ...defaultArgs, files: '(components|pages)/**/*.ts*' });
});
