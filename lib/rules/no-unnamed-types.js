'use strict';

module.exports = {

  create: function (context) {

    var disabled = (context.options[0] || {}).disabled || {};

    var sourceCode = context.getSourceCode();

    var combinators = {
      refinement:   { nameArgPosition: 2 },
      enums:        { nameArgPosition: 1 },
      maybe:        { nameArgPosition: 1 },
      struct:       { nameArgPosition: 1 },
      tuple:        { nameArgPosition: 1 },
      list:         { nameArgPosition: 1 },
      dict:         { nameArgPosition: 2 },
      union:        { nameArgPosition: 1 },
      intersection: { nameArgPosition: 1 },
      interface:    { nameArgPosition: 1 },
      func:         { nameArgPosition: 2 }
    };

    function isTcombCombinator(name) {
      return Object.keys(combinators).indexOf(name) !== -1;
    }

    function isTcombUtilityFunction(node) {
      var object = node.callee.object.object;
      var property = node.callee.object.property;
      if (object && property) {
        return (
          object.name === 't' &&
          isTcombCombinator(property.name) &&
          ['of', 'extend'].indexOf(node.callee.property.name) !== -1
        );
      }
    }

    function getUtilityFunctionCombinator(node) {
      return node.callee.object.property.name;
    }

    function isTcombCombinatorCall(node) {
      return node.callee.object.name === 't' && isTcombCombinator(node.callee.property.name);
    }

    function getTcombCombinator(node) {
      return node.callee.property.name;
    }

    function getName(combinator, combinatorArgs) {
      return combinatorArgs[combinators[combinator].nameArgPosition];
    }

    function checkName(node) {
      if (!isTcombCombinatorCall(node) && !isTcombUtilityFunction(node)) {
        return;
      }

      var combinator;
      if (isTcombUtilityFunction(node)) {
        combinator = getUtilityFunctionCombinator(node);
      } else {
        combinator = getTcombCombinator(node);
      }

      if (disabled[combinator]) {
        return;
      }

      var name = getName(combinator, node.arguments);
      var hasName = !!name;
      if (name && name.type === 'ObjectExpression') {
        hasName = name.properties.filter(function (prop) { return prop.key.name === 'name' })[0];
      }

      if (!hasName) {
        context.report({
          node: node,
          message: '{{ combinator }} must have a name',
          data: {
            combinator: combinator
          }
        });
      }
    }

    return {
      CallExpression: checkName
    };

  }

}

