"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _message = _interopRequireDefault(require("./message"));

var _users = _interopRequireDefault(require("./users"));

var _auth = _interopRequireDefault(require("./auth"));

var _room = _interopRequireDefault(require("./room"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = _express["default"].Router();

app.use("/message", _message["default"]);
app.use("/users", _users["default"]);
app.use("/auth", _auth["default"]);
app.use("/room", _room["default"]);
var _default = app;
exports["default"] = _default;