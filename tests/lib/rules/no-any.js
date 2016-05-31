'use strict';

var rule = require('../../../lib/rules/no-any.js');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-any', rule, {
  valid: [
    {
      code: 't.struct({ bar: t.String })',
    }
  ],

  invalid: [
    {
      code: 't.struct({ foo: t.Any })',
      errors: [ { message: 'unexpected use of t.Any' } ],
    },
    {
      code: 't.maybe(t.Any)',
      errors: [ { message: 'unexpected use of t.Any' } ],
    },
    {
      code: 't.Any',
      errors: [ { message: 'unexpected use of t.Any' } ],
    }
  ]
});

