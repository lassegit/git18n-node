import { getLocaleAdditions } from '../src/utils/getLocaleAdditions';
const mock = require('mock-fs');

const locale = 'de';
const extractedDefault = {
  foo: {
    defaultMessage: 'bar',
    file: 'pages/index.ts',
  },
};

test('Returns additions and locale', () => {
  mock({ 'locales/de.json': '{}' });
  expect(getLocaleAdditions({ locale, extractedDefault })).toBe(1);
  mock.restore();
});
