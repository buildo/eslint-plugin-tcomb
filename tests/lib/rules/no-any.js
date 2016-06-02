'use strict';

var rule = require('../../../lib/rules/no-any.js');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('no-any', rule, {
  valid: [
    {
      code: [
        'var t = require("tcomb");',
        't.struct({ foo: t.String });'
      ].join('\n'),
    },
    {
      code: [
        'import t from "tcomb"',
        't.struct({ foo: t.String });'
      ].join('\n'),
      parser: 'babel-eslint'
    }
  ],

  invalid: [
    {
      code: [
        'var t = require("tcomb");',
        't.struct({ foo: t.Any });'
      ].join('\n'),
      errors: [ { message: 'unexpected use of t.Any' } ],
    },
    {
      code: [
        'var t = require("tcomb");',
        't.maybe(t.Any);'
      ].join('\n'),
      errors: [ { message: 'unexpected use of t.Any' } ],
    },
    {
      code: [
        'var t = require("tcomb");',
        't.Any;'
      ].join('\n'),
      errors: [ { message: 'unexpected use of t.Any' } ],
    }
  ]
});

