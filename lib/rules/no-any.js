'use strict';

var tcombNamespace = require('../utils/tcombNamespace');

module.exports = {

  create: function (context) {

    function checkAny(node) {
      var t = tcombNamespace(context);
      if (node.object.name === t && node.property.name == 'Any') {
        context.report({
          node: node,
          message: 'unexpected use of t.Any'
        });
      }
    }

    return {
      MemberExpression: checkAny,
    };

  }

}

