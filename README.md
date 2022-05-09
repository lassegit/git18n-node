# Git18n NPM package

## How to use:

Running `npm run git18n --files '(components|pages)/**/*.ts*' --ignore '**/*.d.ts'`:

- fetches translations from the server and writes to `.locales` folder
- extract and send any new translations to server

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
