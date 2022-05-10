import { getSecretAPIKey } from '../src/utils/getSecretAPIKey';
const mock = require('mock-fs');

afterEach(() => {
  mock.restore();
});

test('returns secret token', () => {
  const env = "GIT18N_SECRET_PROJECT_KEY='secret-token'";
  mock({ '.env': env });
  expect(getSecretAPIKey()).toBe('secret-token');
});

test('can not find secret', () => {
  const env = "GIT18N_SECRET_PROJECT='secret-token'";
  mock({ '.env': env });
  expect(getSecretAPIKey).toThrowError();
});

test('can not find secret', () => {
  mock({});
  expect(getSecretAPIKey).toThrowError();
});
