import { getPRNumber } from '../src/utils/getPRNumber';

test('Running locally without any PR number', () => {
  const prNumer = getPRNumber();
  expect(typeof prNumer).toBe('undefined' || 'number');
});
