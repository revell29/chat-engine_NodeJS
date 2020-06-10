"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msg = void 0;

var info = require("../../info.json");

var msg = ["Chat Engine Version: ".concat(info.version), "     NodeJS Version: ".concat(process.versions.node, " - ").concat(process.arch), "           Platform: ".concat(process.platform), "       Process Port: ".concat(process.env.PORT), "       Author: ".concat(info.author), "Github: ".concat(info.github)];
exports.msg = msg;
exports.msg = msg = msg.join("\n");