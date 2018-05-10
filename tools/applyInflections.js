"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = applyInflections;

var _inflections = require("./inflections");

var _inflections2 = _interopRequireDefault(_inflections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function applyInflections(word, rules) {
  var result = "" + word,
      rule,
      regex,
      replacement;

  if (result.length === 0) {
    return result;
  } else {
    var match = result.toLowerCase().match(/\b\w+$/);

    if (match && (0, _inflections2.default)().uncountables.indexOf(match[0]) > -1) {
      return result;
    } else {
      for (var i = 0, ii = rules.length; i < ii; i++) {
        rule = rules[i];

        regex = rule[0];
        replacement = rule[1];

        if (result.match(regex)) {
          result = result.replace(regex, replacement);
          break;
        }
      }

      return result;
    }
  }
}