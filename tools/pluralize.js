"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluralize;

var _applyInflections = require("./applyInflections");

var _applyInflections2 = _interopRequireDefault(_applyInflections);

var _inflections = require("./inflections");

var _inflections2 = _interopRequireDefault(_inflections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pluralize(word) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "en";

  return (0, _applyInflections2.default)(word, (0, _inflections2.default)(locale).plurals);
}