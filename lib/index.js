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
      'tcomb/no-unnamed-types': ['error', { enabled: {
        struct: true,
        refinement: true,
        interface: true,
        tuple: true,
        enums: true,
        dict: true
      }}]
    }
  }
}



