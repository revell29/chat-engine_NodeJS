"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Message = _interopRequireDefault(require("../models/server/Message"));

var _ErrorHandle = require("../../vendor/utils/server/functions/ErrorHandle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MessageController = /*#__PURE__*/function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "getChat",
    value: function () {
      var _getChat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, from, to, dataChat;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, from = _req$body.from, to = _req$body.to;
                _context.next = 4;
                return _Message["default"].find({
                  $or: [{
                    from: from
                  }, {
                    to: to
                  }, {
                    from: to
                  }, {
                    to: from
                  }]
                });

              case 4:
                dataChat = _context.sent;
                res.status(200).send({
                  message: "succes",
                  data: dataChat
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                res.status(500).send({
                  message: _context.t0.message
                });

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function getChat(_x, _x2) {
        return _getChat.apply(this, arguments);
      }

      return getChat;
    }()
  }, {
    key: "postMessage",
    value: function () {
      var _postMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, from, to, message, author, rid, dataChat;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                try {
                  console.log(req.body);
                  _req$body2 = req.body, from = _req$body2.from, to = _req$body2.to, message = _req$body2.message, author = _req$body2.author, rid = _req$body2.rid;
                  dataChat = new _Message["default"]({
                    from: from,
                    message: message,
                    to: to,
                    author: req.body.author,
                    rid: req.body.rid
                  });
                  dataChat.save();
                  (0, _ErrorHandle.ResponseMessage)(200, res, "success", message);
                } catch (error) {
                  res.status(500).send({
                    message: error.message
                  });
                }

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function postMessage(_x3, _x4) {
        return _postMessage.apply(this, arguments);
      }

      return postMessage;
    }()
  }]);

  return MessageController;
}();

var _default = MessageController;
exports["default"] = _default;