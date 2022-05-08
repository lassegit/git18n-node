# Git18n NPM package

## How to use:

Running `npm run git18n --files '(components|pages)/**/*.ts*' --ignore '**/*.d.ts'`:

- fetches current translations from the server
- add new translations to server by comparing translation key _(could throw error if unable, so it can be translated?)_
- adds link to PR with link to translations for specific translation key

## API

- GET `/api/cli/locales` retrieves all translations for accessToken
- POST `/api/cli/locales` { locale, locales } creates/updates translations

## Translation format

```json
{
  "CONTENT-HASH": {
    "description": "",
    "defaultMessage": "",
    "file": "pages/index.js",
    "line": "number"
  }
}
```

_Boilerplate based on [TSDX](https://github.com/jaredpalmer/tsdx)_
