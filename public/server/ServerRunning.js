"use strict";

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _mongo = _interopRequireDefault(require("../app/mongo"));

var _routes = _interopRequireDefault(require("../routes"));

require("dotenv/config");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _socket = _interopRequireDefault(require("socket.io"));

var _socket2 = require("./socket");

var _server = require("../vendor/utils/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.SERVER_PORT || 3000;
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use("/api", _routes["default"]);

var server = _http["default"].createServer(app);

var io = (0, _socket["default"])(server); // io.set("transports", ["websocket"]);

io.use(function (socket, next) {
  var token = socket.handshake.query.username;

  if (token) {
    return next();
  }

  console.log("error");
});
(0, _socket2.EventIo)(io);
var subPrefix = "➔";

_mongoose["default"].connect(_mongo["default"], {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log(subPrefix, "MongoDB connected");
})["catch"](function (err) {
  _server.SystemLogger._logs(_server.msg, "SERVER ERROR");
});

server.listen(PORT, function () {
  _server.SystemLogger._logs(_server.msg, "SERVER RUNNING");
});