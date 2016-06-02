var RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  settings: {
    tcombModules: require('../../lib/utils/defaultTcombModules')
  }
});

module.exports = RuleTester;
