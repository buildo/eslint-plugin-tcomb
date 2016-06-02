'use strict';

var rule = require('../../../lib/rules/no-unnamed-types.js');
var RuleTester = require('../RuleTester');

var ruleTester = new RuleTester();
ruleTester.run('no-unnamed-types', rule, {
  valid: [
    {
      code: [
        'var t = require("tcomb");',
        'foo(\'bar\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.refinement(t.Number, function () { return true }, \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.enums({ IT: \'IT\' }, \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.enums.of([\'IT\'], \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.maybe(t.String, \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct({}, \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct({}, { name: \'MyType\' })'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        'Type.extend({}, \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct.extend([Type, {}], \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.tuple([t.Number, t.Number], \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.list(t.Number, \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.dict(t.Number, t.String, \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.union([A, B], \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.intersection([A, B], \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.interface({}, \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.interface.extend([Type, {}], \'MyType\')'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.func([A], B, \'MyType\')'
      ].join('\n')
    }
  ],

  invalid: [
    {
      code: [
        'var t = require("tcomb");',
        't.refinement(t.Number, function () { return true })'
      ].join('\n'),
      errors: [ { message: 'refinement must have a name' } ],
      options: [{ enabled: { refinement: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.enums({ IT: \'IT\' })'
      ].join('\n'),
      errors: [ { message: 'enums must have a name' } ],
      options: [{ enabled: { enums: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.enums.of({ IT: \'IT\' })'
      ].join('\n'),
      errors: [ { message: 'enums must have a name' } ],
      options: [{ enabled: { enums: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.maybe(t.String)'
      ].join('\n'),
      errors: [ { message: 'maybe must have a name' } ],
      options: [{ enabled: { maybe: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct({})'
      ].join('\n'),
      errors: [ { message: 'struct must have a name' } ],
      options: [{ enabled: { struct: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct({}, { strict: true })'
      ].join('\n'),
      errors: [ { message: 'struct must have a name' } ],
      options: [{ enabled: { struct: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct.extend([Type, {}])'
      ].join('\n'),
      errors: [ { message: 'struct must have a name' } ],
      options: [{ enabled: { struct: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.tuple([t.Number, t.Number])'
      ].join('\n'),
      errors: [ { message: 'tuple must have a name' } ],
      options: [{ enabled: { tuple: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.list(t.Number)'
      ].join('\n'),
      errors: [ { message: 'list must have a name' } ],
      options: [{ enabled: { list: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.dict(t.Number, t.String)'
      ].join('\n'),
      errors: [ { message: 'dict must have a name' } ],
      options: [{ enabled: { dict: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.union([A, B])'
      ].join('\n'),
      errors: [ { message: 'union must have a name' } ],
      options: [{ enabled: { union: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.intersection([A, B])'
      ].join('\n'),
      errors: [ { message: 'intersection must have a name' } ],
      options: [{ enabled: { intersection: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.interface({})'
      ].join('\n'),
      errors: [ { message: 'interface must have a name' } ],
      options: [{ enabled: { interface: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.interface.extend([Type, {}])'
      ].join('\n'),
      errors: [ { message: 'interface must have a name' } ],
      options: [{ enabled: { interface: true } }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.func([A], B )'
      ].join('\n'),
      errors: [ { message: 'func must have a name' } ],
      options: [{ enabled: { func: true } }]
    }
  ]
});

