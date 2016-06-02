[![Build Status](https://drone.our.buildo.io/api/badges/buildo/eslint-plugin-tcomb/status.svg)](https://drone.our.buildo.io/buildo/eslint-plugin-tcomb) [![npm](https://img.shields.io/npm/v/eslint-plugin-tcomb.svg?maxAge=2592000)](https://www.npmjs.com/package/eslint-plugin-tcomb)

# eslint-plugin-tcomb

A set of [ESLint](http://eslint.org) rules for [tcomb](https://github.com/gcanti/tcomb)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-tcomb`:

```
$ npm install eslint-plugin-tcomb --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-tcomb` globally.

## Usage

Add `tcomb` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "tcomb"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "tcomb/rule-name": 2
    }
}
```

## Supported Rules

* [`no-loose-structs`](docs/rules/no-loose-structs.md): disallow loose structs
* [`no-unnamed-types`](docs/rules/no-unnamed-types.md): disallow types without names
* [`no-any`](docs/rules/no-any.md): disallow use of `t.Any`

## Namespace detection
In order to recognize `tcomb` patterns, this plugin detects the name of the imported `tcomb` library.

Example:

```js
import foo from 'tcomb';

const MyType = foo.Any; // this triggers the no-any rule
```

In the example above `foo` is identified as the *`tcomb` namespace*;

Both ES2015 modules and `require` are supported, in any of the following forms:

```js
import anything from 'tcomb';
import { t } from 'tcomb-react';
import { t as anything } from 'tcomb-react';
const anything = require('tcomb');
const anything = require('tcomb-react').t
```

`tcomb` can be exported by any module; the recommended configuration (see below), provides
out-of-the-box support for the following modules:

- `tcomb`
- `tcomb-validation`
- `tcomb-form`,
- `tcomb-form-native`,
- `tcomb-react`,
- `redux-tcomb`

If you want your own custom module to be recognized, simply add this to your eslint config:

```json
{
  "settings": {
    "additionalTcombModules": [{
      "name": "my-module",
      "defaultExport": true
    }, {
      "name": "my-other-module",
      "defaultExport": false,
      "exportName": "t"
    }]
  }
}
```

where:
- `name` is the module name
- `defaultExport` indicates whether `tcomb` is exported as the module default
- `exportName` is the name under which `tcomb` is exported if `defaultExport` is `false`

## Recommended configuration

This plugin exports a `recommended` configuration that enforce a disciplined tcomb use.

To enable this configuration use the `extends` property in your `.eslintrc` config file:

```js
{
  "plugins": [
    "tcomb"
  ],
  "extends": ["eslint:recommended", "plugin:tcomb/recommended"]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

The rules enabled in this configuration are:

* [`no-unnamed-types`](docs/rules/no-unnamed-types.md)
* [`no-any`](docs/rules/no-any.md)
