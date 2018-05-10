"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inflections;

var _isFunction = require("./isFunction");

var _isFunction2 = _interopRequireDefault(_isFunction);

var _Inflector = require("./Inflector");

var _Inflector2 = _interopRequireDefault(_Inflector);

var _defaults = require("./defaults");

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inflections(locale, fn) {
  if ((0, _isFunction2.default)(locale)) {
    fn = locale;
    locale = null;
  }

  locale = locale || "en";

  if (fn) {
    fn(_Inflector2.default.getInstance(locale));
  } else {
    return _Inflector2.default.getInstance(locale);
  }
}

for (var locale in _defaults2.default) {
  inflections(locale, _defaults2.default[locale]);
}