'use strict';

module.exports = {

  create: function (context) {

    function getName(combinatorArgs) {
      return 'name'; //WIP
    }

    function checkName(node) {
      if (!getName(node)) {
        context.report(node, 'Type declarations without names are not allowed');
      }
    }

    return {
      CallExpression: checkName
    };

  }

}

