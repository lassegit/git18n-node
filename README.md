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
    "isMerged": "true | false", // When build all "true" can potentially be removed, since it means it isn't a new translation not merged yet. "false" means this is a translation used in an open PR
    "file": "pages/index.js"
  }
}
```

_Boilerplate based on [TSDX](https://github.com/jaredpalmer/tsdx)_
