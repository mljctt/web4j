"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunc;
var toString = Object.prototype.toString;

function isFunc(obj) {
  return toString.call(obj) === "[object Function]";
}