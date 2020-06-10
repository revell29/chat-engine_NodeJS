"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("dotenv/config");

var database = process.env.MONGO_URL;
var _default = database;
exports["default"] = _default;