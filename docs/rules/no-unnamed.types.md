# No unnamed types (no-unnamed-types)

All tcomb combinators accept a name, which is very useful for debugging.

This rule enforces the presence of a name when declaring a new type.

## Rule Details

This rule checks all combinators calls, checking for the presence of the name parameter.
This rule is on by default.

The following patterns are considered warnings:

```js
const MyType = t.struct({ prop: t.String });
const MyType = t.interface({ prop: t.String });
...
```

## Rule Options

```js
"no-loose-structs": [<enabled>, { "enabled": { disabled: <boolean> } }]
```

### `disabled`

Disables the name checking on specific combinators

E.g. with `{ disabled: { struct: true }}` the following pattern is **not** considered a warning:

```js
const MyType = t.struct({ prop: t.String });
```

## When not to use

When having named types is not important or impractical to achieve.
