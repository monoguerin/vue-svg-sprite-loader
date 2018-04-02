var xml2js = require('xml2js');
var compiler = require('vue-template-compiler');
var loaderUtils = require('loader-utils');

module.exports = function (content) {
  this.cacheable && this.cacheable(true);
  this.addDependency(this.resourcePath);
  var cb = this.async();
  var query = loaderUtils.getOptions(this) || {};

  var iconRequested = this._module.rawRequest.substring(this._module.rawRequest.lastIndexOf('?')  + 1);

  var finalString = "module.exports = {";
  var closeTag = "};";

  function convertToVueRender(symbol) {
    var key = symbol && symbol.$ && symbol.$.id;
    var viewBox = symbol && symbol.$ && symbol.$.viewBox;
    var xmlns = (symbol && symbol.$ && symbol.$.xmlns) || "http://www.w3.org/2000/svg";
    var path = symbol && symbol.path && symbol.path[0] && symbol.path[0].$ && symbol.path[0].$.d;

    if (!!key && !!viewBox && !!xmlns && !!path) {
      var openTag = "<svg xmlns='" + xmlns + "' aria-labelledby='" + key + "' viewBox='" + viewBox + "'>";
      var titleTag = query.removeTitle ? "" : "<title>" + key + "</title>";
      var pathTag = '';
      for (let i = 0; i < symbol.path.length; i++) {
        if (symbol.path[i].$ && symbol.path[i].$.d) {
          pathTag += "<path d='" + symbol.path[i].$.d + "' />\n";
        }
      }
      var closeTag = "</svg>";
      var template = openTag + titleTag + pathTag + closeTag;
      var compiled = compiler.compileToFunctions(template, {preserveWhitespace: false});

      var finalObj = 'render:' + compiled.render;

      return finalObj;
    }
  }

  xml2js.parseString(content, function (err, result) {
    if (err) {
      return cb(err);
    }

    var symbols = result && result.svg && result.svg.symbol;

    if (Array.isArray(symbols)) {
      var currentSymbol = symbols.filter(symbol => symbol && symbol.$ && symbol.$.id === iconRequested);

      if (currentSymbol.length) {
        finalString += convertToVueRender(currentSymbol[0]);
      }
    }

    // Adding closing tag
    finalString += closeTag;

    cb(null, finalString);
  });
};
