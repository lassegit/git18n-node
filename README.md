Lightweight utility that automates translations management using `react-intl` (FormatJS).

## Installation

```
yarn add -D git18n
```

Or with npm:

```
npm install --save-dev git18n
```

## How to use:

1. Retrieve access token on [git18n.com](https://git18n.com) and set as environment variable (`GIT18N_SECRET_PROJECT_KEY="your-app-key"`)

2. Add `translate` command to `package.json`:

```json
"scripts": {
  "translate": "git18n --files 'src/**/*.js*'"
}
```

Default values for `--files` and `--ignore` are:

```
const DEFAULT_FILES_ARG = '(components|containers|pages|src|modules)/**/*.{ts,tsx,js,jsx}';
const DEFAULT_IGNORE_ARG = '**/*.d.ts';
```

Additional arguments:

- `--clean` removes translation IDs not present in code
- `--prettyLocale` formats locale files with line-breaks

3. Run `yarn translate` to add new translations (i.e. when submitting a pull request) and when deploying (as part of the build process, e.g. `yarn translate && yarn build`).

There is no need to `yarn translate` during development since it just uses the `defaultMessage` as fallback.

**Note: Full docs: https://docs.git18n.com**

_Please submit questions or bugs to: https://github.com/lassegit/git18n-node_
