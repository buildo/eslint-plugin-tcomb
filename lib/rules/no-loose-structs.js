'use strict';

module.exports = {

  create: function (context) {

    var allowExplicit = (context.options[0] || {}).allowExplicit;

    // recognize `t.struct(...)` patterns
    function isTcombStructCall(node) {
      var callee = node.callee;
      return callee.object.name === 't' && callee.property.name === 'struct'
    }

    function getStructOptions(node) {
      return node.arguments[1];
    }

    function getStrictOption(options) {
      return options.properties.filter(function (opt) { return opt.key.name === 'strict' })[0];
    }

    function reportMissingStrictOption(node) {
      context.report(node, 'use of loose tcomb structs is forbidden. Add option \'{ strict: true }\'');
    }

    function reportLoose(node) {
      context.report(node, 'use of loose tcomb structs is forbidden');
    }

    function checkTcombStruct(node) {
      if (isTcombStructCall(node)) {
        var structOptions = getStructOptions(node);

        // t.struct({})
        if (!structOptions) {
          reportMissingStrictOption(node);
          return;
        }

        var strictOption = getStrictOption(structOptions);

        // t.struct({}, {})
        if (!strictOption) {
          reportMissingStrictOption(node);
          return;
        }

        var strict = strictOption.value.value;

        // t.struct({}, { strict: false })
        if (!allowExplicit && !strict) {
          reportLoose(node);
          return;
        }
      }
    }

    return {
      CallExpression: checkTcombStruct,
    };

  }

}

