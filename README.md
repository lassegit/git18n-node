# Git18n NPM package

## `git18n.config.json` format

```json
{
  "defaultLanguage": "en",
  "translations": ["de", "fr", "dk"],
  "idInterpolationPattern": "[sha512:contenthash:base64:6]" // Not sure is needed.
}
```

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
