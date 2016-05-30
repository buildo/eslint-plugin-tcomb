/**
 * @fileoverview A set of rules for tcomb
 * @author gabro
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + '/rules');

module.exports.configs = {
  recommended: {
    rules: {
      'tcomb/no-unnamed-types': ['error', { disabled: {
        maybe: true,
        list: true,
        union: true,
        intersection: true,
        func: true
      }}]
    }
  }
}



