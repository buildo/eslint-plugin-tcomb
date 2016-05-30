'use strict';

var rule = require('../../../lib/rules/no-unnamed-types.js');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-unnamed-types', rule, {
  valid: [
    {
      code: 't.refinement(t.Number, function () { return true }, \'MyType\')',
    },
    {
      code: 't.enums({ IT: \'IT\' }, \'MyType\')',
    },
    {
      code: 't.enums.of([\'IT\'], \'MyType\')',
    },
    {
      code: 't.maybe(t.String, \'MyType\')',
    },
    {
      code: 't.struct({}, \'MyType\')',
    },
    {
      code: 't.struct({}, { name: \'MyType\' })',
    },
    {
      code: 'Type.extend({}, \'MyType\')'
    },
    {
      code: 't.struct.extend([Type, {}], \'MyType\')'
    },
    {
      code: 't.tuple([t.Number, t.Number], \'MyType\')'
    },
    {
      code: 't.list(t.Number, \'MyType\')'
    },
    {
      code: 't.dict(t.Number, t.String, \'MyType\')'
    },
    {
      code: 't.union([A, B], \'MyType\')'
    },
    {
      code: 't.intersection([A, B], \'MyType\')'
    },
    {
      code: 't.interface({}, \'MyType\')'
    },
    {
      code: 't.interface.extend({}, \'MyType\')'
    },
    {
      code: 't.func([A], B, \'MyType\')'
    }
  ],

  invalid: [
    {
      code: 't.refinement(t.Number, function () { return true })',
      errors: [ { message: 'refinement must have a name' } ],
    },
    {
      code: 't.enums({ IT: \'IT\' })',
      errors: [ { message: 'enums must have a name' } ],
    },
    {
      code: 't.maybe(t.String)',
      errors: [ { message: 'maybe must have a name' } ],
    },
    {
      code: 't.struct({})',
      errors: [ { message: 'struct must have a name' } ],
    },
    {
      code: 't.tuple([t.Number, t.Number])',
      errors: [ { message: 'tuple must have a name' } ],
    },
    {
      code: 't.list(t.Number)',
      errors: [ { message: 'list must have a name' } ],
    },
    {
      code: 't.dict(t.Number, t.String)',
      errors: [ { message: 'dict must have a name' } ],
    },
    {
      code: 't.union([A, B])',
      errors: [ { message: 'union must have a name' } ],
    },
    {
      code: 't.intersection([A, B])',
      errors: [ { message: 'intersection must have a name' } ],
    },
    {
      code: 't.interface({})',
      errors: [ { message: 'interface must have a name' } ],
    },
    {
      code: 't.func([A], B )',
      errors: [ { message: 'func must have a name' } ],
    },
  ]
});

