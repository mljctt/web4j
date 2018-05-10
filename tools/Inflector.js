"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function icPart(str) {
  return str.split("").map(function (c) {
    return "(?:" + c.toUpperCase() + "|" + c.toLowerCase() + ")";
  }).join("");
}

function remove(arr, elem) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elem) {
      Array.prototype.splice.call(arr, i, 1);
    }
  }
}

function hasProp(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

var instances = {};

var Inflector = function () {
  _createClass(Inflector, null, [{
    key: "getInstance",
    value: function getInstance(locale) {
      instances[locale] = instances[locale] || new Inflector();
      return instances[locale];
    }
  }]);

  function Inflector() {
    _classCallCheck(this, Inflector);

    this.plurals = [];
    this.singulars = [];
    this.uncountables = [];
    this.humans = [];
    this.acronyms = {};
    this.acronymRegex = /(?=a)b/;
  }

  _createClass(Inflector, [{
    key: "acronym",
    value: function acronym(word) {
      this.acronyms[word.toLowerCase()] = word;

      var values = [];

      for (var key in this.acronyms) {
        if (hasProp(this.acronyms, key)) {
          values.push(this.acronyms[key]);
        }
      }

      this.acronymRegex = new RegExp(values.join("|"));
    }
  }, {
    key: "plural",
    value: function plural(rule, replacement) {
      if (typeof rule === "string") {
        remove(this.uncountables, rule);
      }

      remove(this.uncountables, replacement);
      this.plurals.unshift([rule, replacement]);
    }
  }, {
    key: "singular",
    value: function singular(rule, replacement) {
      if (typeof rule === "string") {
        remove(this.uncountables, rule);
      }

      remove(this.uncountables, replacement);
      this.singulars.unshift([rule, replacement]);
    }
  }, {
    key: "irregular",
    value: function irregular(singular, plural) {
      remove(this.uncountables, singular);
      remove(this.uncountables, plural);

      var s0 = singular[0];
      var sRest = singular.substr(1);

      var p0 = plural[0];
      var pRest = plural.substr(1);

      if (s0.toUpperCase() === p0.toUpperCase()) {
        this.plural(new RegExp("(" + s0 + ")" + sRest + "$", "i"), "$1" + pRest);
        this.plural(new RegExp("(" + p0 + ")" + pRest + "$", "i"), "$1" + pRest);

        this.singular(new RegExp("(" + s0 + ")" + sRest + "$", "i"), "$1" + sRest);
        this.singular(new RegExp("(" + p0 + ")" + pRest + "$", "i"), "$1" + sRest);
      } else {
        var sRestIC = icPart(sRest);
        var pRestIC = icPart(pRest);

        this.plural(new RegExp(s0.toUpperCase() + sRestIC + "$"), p0.toUpperCase() + pRest);
        this.plural(new RegExp(s0.toLowerCase() + sRestIC + "$"), p0.toLowerCase() + pRest);
        this.plural(new RegExp(p0.toUpperCase() + pRestIC + "$"), p0.toUpperCase() + pRest);
        this.plural(new RegExp(p0.toLowerCase() + pRestIC + "$"), p0.toLowerCase() + pRest);

        this.singular(new RegExp(s0.toUpperCase() + sRestIC + "$"), s0.toUpperCase() + sRest);
        this.singular(new RegExp(s0.toLowerCase() + sRestIC + "$"), s0.toLowerCase() + sRest);
        this.singular(new RegExp(p0.toUpperCase() + pRestIC + "$"), s0.toUpperCase() + sRest);
        this.singular(new RegExp(p0.toLowerCase() + pRestIC + "$"), s0.toLowerCase() + sRest);
      }
    }
  }, {
    key: "uncountable",
    value: function uncountable() {
      for (var _len = arguments.length, words = Array(_len), _key = 0; _key < _len; _key++) {
        words[_key] = arguments[_key];
      }

      this.uncountables = this.uncountables.concat(words);
    }
  }, {
    key: "human",
    value: function human(rule, replacement) {
      this.humans.unshift([rule, replacement]);
    }
  }, {
    key: "clear",
    value: function clear() {
      var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "all";

      if (scope === "all") {
        this.plurals = [];
        this.singulars = [];
        this.uncountables = [];
        this.humans = [];
      } else {
        this[scope] = [];
      }
    }
  }]);

  return Inflector;
}();

exports.default = Inflector;