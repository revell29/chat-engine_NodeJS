"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemLogger = exports.Logger = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

var _chalk = _interopRequireDefault(require("chalk"));

var _underscore2 = _interopRequireDefault(require("underscore.string"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Logger = /*#__PURE__*/function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: "makeABox",
    value: function makeABox(message, title) {
      if (!_underscore["default"].isArray(message)) {
        message = message.split("\n");
      }

      var len = 0;
      len = Math.max.apply(null, message.map(function (line) {
        return line.length;
      }));
      var topLine = "+--".concat(_underscore2["default"].pad("", len, "-"), "--+");
      var separator = "|  ".concat(_underscore2["default"].pad("", len, ""), "  |");
      var lines = [];
      lines.push(topLine);

      if (title) {
        lines.push("|  ".concat(_underscore2["default"].lrpad(title, len), "  |"));
        lines.push(topLine);
      }

      lines.push(separator);
      lines = [].concat(_toConsumableArray(lines), _toConsumableArray(message.map(function (line) {
        return "|  ".concat(_underscore2["default"].rpad(line, len), "  |");
      })));
      lines.push(separator);
      lines.push(topLine);
      return lines;
    }
  }, {
    key: "_logs",
    value: function _logs(message, title) {
      var box = this.makeABox(message, title);
      var subPrefix = "➔";
      box.forEach(function (line) {
        console.log(subPrefix, _chalk["default"].cyan(line));
      });
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;
var SystemLogger = new Logger();
exports.SystemLogger = SystemLogger;