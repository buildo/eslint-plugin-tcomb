'use strict';

module.exports = {

  create: function (context) {

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
      if (!isTcombCombinatorCall(node)) {
        return;
      }
      var combinator = getTcombCombinator(node);
      console.log(node);

      if (!getName(combinator, node.arguments)) {
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

