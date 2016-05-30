[![Build Status](https://drone.our.buildo.io/api/badges/buildo/eslint-plugin-tcomb/status.svg)](https://drone.our.buildo.io/buildo/eslint-plugin-tcomb)

# eslint-plugin-tcomb

A set of ESLint rules for [tcomb](https://github.com/gcanti/tcomb)

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
