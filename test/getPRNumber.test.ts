import { getPRNumber } from '../src/utils/getPRNumber';

test('Running locally without any PR number', () => {
  expect(getPRNumber()).toBe(undefined);
});
