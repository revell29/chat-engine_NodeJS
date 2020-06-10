"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Room = _interopRequireDefault(require("../models/server/Room"));

var _User = _interopRequireDefault(require("../models/server/User"));

var _Message = _interopRequireDefault(require("../models/server/Message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RoomController = /*#__PURE__*/function () {
  function RoomController() {
    _classCallCheck(this, RoomController);
  }

  _createClass(RoomController, null, [{
    key: "listConversation",
    value: function () {
      var _listConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _Room["default"].find({
                  participants: {
                    $in: [req.body.authUser]
                  }
                }).select("_id, participants").exec(function (err, conversations) {
                  if (err) {
                    res.send({
                      error: err
                    });
                    return next(err);
                  }

                  return res.status(200).json(conversations);
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function listConversation(_x, _x2) {
        return _listConversation.apply(this, arguments);
      }

      return listConversation;
    }()
  }, {
    key: "createDirectMessage",
    value: function () {
      var _createDirectMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                try {
                  _Room["default"].findOne({
                    participants: {
                      $all: [req.body.from, req.body.to]
                    }
                  }, function (err, existConversation) {
                    if (err) {
                      console.log(err);
                    }

                    if (existConversation) {
                      _Message["default"].find({
                        rid: existConversation._id
                      }).then(function (messages) {
                        var data = existConversation.toJSON();
                        data.messages = messages;
                        return res.status(200).json(data);
                      });
                    } else {
                      var conversation = new _Room["default"]({
                        rid: "".concat(req.body.from).concat(req.body.to),
                        participants: [req.body.from, req.body.to]
                      });
                      conversation.save(function (err, newConversation) {
                        if (err) {
                          res.send({
                            error: err
                          });
                          return next(err);
                        }

                        newConversation.messages = [];
                        return res.status(200).json(newConversation);
                      });
                    }
                  });
                } catch (error) {
                  res.send({
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

      function createDirectMessage(_x3, _x4, _x5) {
        return _createDirectMessage.apply(this, arguments);
      }

      return createDirectMessage;
    }()
    /**
     * Get conversation
     *
     */

  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, id) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                try {
                  _Room["default"].findOne({
                    rid: req.params.id,
                    participants: {
                      $in: [req.body.from]
                    }
                  }).then(function (conversation) {
                    if (conversation) {
                      _Message["default"].find({
                        rid: conversation.rid
                      }).then(function (messages) {
                        return res.status(200).send({
                          message: "success",
                          data: messages
                        });
                      });
                    }
                  });
                } catch (error) {
                  res.status(500).send({
                    message: error.message
                  });
                }

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function get(_x6, _x7, _x8) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);

  return RoomController;
}();

var _default = RoomController;
exports["default"] = _default;