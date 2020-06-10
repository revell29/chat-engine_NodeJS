"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../../models/server/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "login",

    /**
     * Login User
     *
     * @param { Request, Response}
     * @return Response
     **/
    value: function () {
      var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var dataUser, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _User["default"].findOne({
                  username: req.body.username
                });

              case 3:
                dataUser = _context.sent;

                if (dataUser) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", res.status(400).send({
                  message: "The username does not exist"
                }));

              case 6:
                if (_bcrypt["default"].compareSync(req.body.password, dataUser.password)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", res.status(400).send({
                  message: "The password is invalid"
                }));

              case 8:
                token = _jsonwebtoken["default"].sign({
                  username: req.body.username
                }, _config.config.secret, {
                  expiresIn: "24h" // expires in 24 hours

                });
                res.send({
                  message: "The username and password combination is correct!",
                  token: token,
                  data: dataUser
                });
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](0);
                res.status(500).send({
                  message: _context.t0.message
                });

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 12]]);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /**
     * Register User
     *
     * @param {Request, Response}
     * @return { Response }
     **/

  }, {
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var dataUser, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                console.log(req.body);
                req.body.password = _bcrypt["default"].hashSync(req.body.password, 10);
                dataUser = new _User["default"](req.body);
                _context2.next = 6;
                return dataUser.save();

              case 6:
                result = _context2.sent;
                res.status(200).send({
                  message: "Register success",
                  status: 200,
                  data: result
                });
                _context2.next = 13;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                res.send({
                  message: _context2.t0.message
                });

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function register(_x3, _x4) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }]);

  return AuthController;
}();

var _default = AuthController;
exports["default"] = _default;