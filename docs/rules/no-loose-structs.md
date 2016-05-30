# No loose structs (no-loose-structs)

This rule prevents the definition of loose tcomb structs

tcomb structs are loose by default, unless the `{ strict: true }` option is passed.

## Rule Details

This rule checks all `t.struct(...)` calls, checking for the presence of `{ strict: true }`.
This rule is off by default.

The following patterns are considered warnings:

```js
const MyType = t.struct({ prop: t.String });
const MyType = t.struct({ prop: t.String }, { strict: false });
```

## Rule Options

```js
"no-loose-structs": [<enabled>, { "allowExplicit": [<boolean>] }]
```

### `allowExplicit`

Allow loose structs when explicitly defined.

When this option is `true`, the following pattern is not considered a warnings:

```js
const MyType = t.struct({ prop: t.String }, { strict: false });
```

## When not to use

When struct strictness is not a requirement
