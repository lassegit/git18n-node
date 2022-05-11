# Git18n

Lightweight and easy to use module that handles translations management for developers using `react-intl` (formatjs.io). As simple as:

- run `yarn add -D git18n`
- get access token on https://git18n.com and set wanted languages
- run `yarn git18n` when extracting translations to server and adding them during build

## Installation

```
yarn add -D git18n
```

Or with npm:

```
npm install --save-dev git18n
```

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

_Please submit questions or bugs to: https://github.com/lassegit/git18n-node_
