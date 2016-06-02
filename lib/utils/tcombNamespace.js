module.exports = function (context) {

  var settings = context.settings || {};
  var tcombModules = (settings.tcombModules || []).concat(settings.additionalTcombModules || []);
  var config = {
    tcombModules: tcombModules
  };

  function defaultExportedModules(config) {
    return config.tcombModules
    .filter(function (m) { return m.defaultExport })
    .map(function (m) { return m.name });
  }

  function namedExportedModules(config) {
    return config.tcombModules.filter(function (m) { return !m.defaultExport });
  }

  function detectedDefaultRequire(node) {
    var calleeName = node.init.callee.name;
    if (calleeName !== 'require') return;
    var defaultExports = defaultExportedModules(config);
    return defaultExports.indexOf(node.init.arguments[0].value) !== -1;
  }

  function detectedNamedRequire(node) {
    if (node.init.object.type !== 'CallExpression') return;
    if (node.init.object.callee.name !== 'require') return;
    var namedModules = namedExportedModules(config);
    var namedModule = namedModules.filter(function (m) {
      return m.name === node.init.object.arguments[0].value;
    })[0];
    return node.init.property.name === (namedModule || {}).exportName;
  }

  function detectedRequire(node) {
    switch (node.init.type) {
      case 'CallExpression': return detectedDefaultRequire(node);
      case 'MemberExpression': return detectedNamedRequire(node);
    }
  }

  function findTcombImports(scope, config) {
    var definitions = Array.from(scope.set.values()).map(function (v) { return v.defs[0] });
    return definitions.reduce(function (tcomb, def) {
      if (!def || def.type !== 'ImportBinding') return;
      if (def.parent.type !== 'ImportDeclaration') return;
      switch (def.node.type) {
        case 'ImportDefaultSpecifier':
          var defaultExports = defaultExportedModules(config);
          if (defaultExports.indexOf(def.parent.source.value) !== -1) {
            return { name: def.parent.source.value }
          };
        case 'ImportSpecifier':
          var namedModules = namedExportedModules(config);
          return namedModules.reduce(function (tcomb, m) {
            if (tcomb) return tcomb;
            var specifier = def.parent.specifiers.filter(function (s) {
              return s.imported.name === m.exportName;
            })[0];
            if (specifier) {
              return { name: specifier.local.name };
            }
          }, null);
      }
    }, null);
  }

  function findInScope(scope, config) {
    var x = findTcombImports(scope, config);
    if (x) return x;

    var y = scope.variables.filter(function (vv) {
      var defnNode = (vv.defs[0] || {}).node;
      if (!defnNode || !defnNode.init) return;
      return detectedRequire(defnNode);
    })[0];
    if (y) return y;
    if (!scope.upper) return;
    return findInScope(scope.upper, config);
  }

  var tcombDefinition = findInScope(context.getScope(), config);
  if (tcombDefinition && tcombDefinition.name) {
    return tcombDefinition.name;
  } else {
    context.report({
      message: 'unable to find tcomb import or require',
      loc: {
        line: 1
      }
    });
  }
};
