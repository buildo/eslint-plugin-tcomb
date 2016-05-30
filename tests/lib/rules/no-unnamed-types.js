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
      code: 't.dict(t.Number, t.String, \'MyType\')'
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
    // {
    //   code: 't.struct({})',
    //   errors: [ { message: 'use of loose tcomb structs is forbidden. Add option \'{ strict: true }\'' } ],
    // }
  ]
});

