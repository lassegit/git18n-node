# Git18n NPM package

## How to use:

Running `npm run git18n --files 'src/**/*.ts*' --ignore '**/*.d.ts'`:

- fetches translations from the server and writes to `.locales` folder in the root of the directory
- extract and send any new translations to server

An easy integration is to add it to the `package.json` scripts:

```json
"scripts": {
  "translate": "git18n --files 'src/**/*.js*'"
}
```

Default values for `--files` and `--ignore` is:

```
const DEFAULT_FILES_ARG = '(components|containers|pages|src|modules)/**/*.{ts,tsx,js,jsx}';
const DEFAULT_IGNORE_ARG = '**/*.d.ts';
```

Then run `yarn translate` to add new translations (when submitting a pull request) and when deploying (as part of the build, e.g. `yarn translate && yarn build`).

There is no need to `yarn translate` during development, which is likely done in `defaultLocale`. Furthermore `defaultLocale` (usually English) is used as fallback when translation isn't provided.

_Boilerplate based on [TSDX](https://github.com/jaredpalmer/tsdx)_
