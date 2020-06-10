"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _MessageController = _interopRequireDefault(require("../app/controllers/MessageController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/", _MessageController["default"].postMessage);
router.post("/get_chat", _MessageController["default"].getChat);
var _default = router;
exports["default"] = _default;