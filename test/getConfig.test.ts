import { getConfig } from '../src/utils/getConfig';
const mock = require('mock-fs');

test('Get config', () => {
  const config = { defaultLocale: 'en', locales: ['de', 'dk'] };
  mock({ 'git18n.config.json': JSON.stringify(config) });
  expect(getConfig()).toEqual(config);
  mock.restore();
});

test('Missing locale', () => {
  mock({ 'git18n.config.json': JSON.stringify({ defaultLocale: 'en' }) });
  expect(getConfig).toThrowError(/Missing locales in config file/);
  mock.restore();
});

test('Missing defaultLocale', () => {
  mock({ 'git18n.config.json': JSON.stringify({ locales: ['de'] }) });
  expect(getConfig).toThrowError(/Missing defaultLocale in config file/);
  mock.restore();
});

test('Missing git18n.config.json file', () => {
  expect(getConfig).toThrowError(/Couldn't find config file/);
});
