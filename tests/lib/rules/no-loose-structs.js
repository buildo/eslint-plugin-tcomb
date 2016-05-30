'use strict';

var rule = require('../../../lib/rules/no-loose-structs.js');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-loose-structs', rule, {
  valid: [
    {
      code: 't.struct({}, { strict: true })',
    },
    {
      code: 't.struct({}, { strict: false })',
      options: [{ allowExplicit: true }]
    }
  ],

  invalid: [
    {
      code: 't.struct({})',
      errors: [ { message: 'use of loose tcomb structs is forbidden. Add option \'{ strict: true }\'' } ],
    },
    {
      code: 't.struct({})',
      errors: [ { message: 'use of loose tcomb structs is forbidden. Add option \'{ strict: true }\'' } ],
      options: [{ allowExplicit: true }]
    },
    {
      code: 't.struct({}, { strict: false })',
      errors: [ { message: 'use of loose tcomb structs is forbidden' } ],
    }
  ]
});

