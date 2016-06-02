'use strict';

var rule = require('../../../lib/rules/no-loose-structs.js');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-loose-structs', rule, {
  valid: [
    {
      code: [
        'var t = require("tcomb");',
        't.struct({}, { strict: true })'
      ].join('\n')
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct({}, { strict: false })'
      ].join('\n'),
      options: [{ allowExplicit: true }]
    }
  ],

  invalid: [
    {
      code: [
        'var t = require("tcomb");',
        't.struct({})'
      ].join('\n'),
      errors: [ { message: 'use of loose tcomb structs is forbidden. Add option \'{ strict: true }\'' } ],
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct({})'
      ].join('\n'),
      errors: [ { message: 'use of loose tcomb structs is forbidden. Add option \'{ strict: true }\'' } ],
      options: [{ allowExplicit: true }]
    },
    {
      code: [
        'var t = require("tcomb");',
        't.struct({}, { strict: false })'
      ].join('\n'),
      errors: [ { message: 'use of loose tcomb structs is forbidden' } ],
    }
  ]
});
