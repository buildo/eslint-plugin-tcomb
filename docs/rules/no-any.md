# No unnamed types (no-unnamed-types)

`t.Any` is a dangerous type as it's equivalent to not having a type constraint.

This rule prevents use of `t.Any`.

## Rule Details

This rule checks for instances of `t.Any`.
This rule is on by default.

The following patterns are considered warnings:

```js
const MyType = t.struct({ prop: t.Any });
const MyType = t.maybe(t.Any);
...
```

## When not to use

t.Any can be theoretically always be avoided, however it may be useful to use it
as a placeholder while developing.
