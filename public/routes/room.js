"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _RoomController = _interopRequireDefault(require("../app/controllers/RoomController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/", _RoomController["default"].createDirectMessage);
router.post("/list", _RoomController["default"].listConversation);
router.post("/data/:id", _RoomController["default"].get);
var _default = router;
exports["default"] = _default;