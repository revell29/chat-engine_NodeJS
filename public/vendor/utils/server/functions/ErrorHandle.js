"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponseMessage = ResponseMessage;

function ResponseMessage(status, res, message) {
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  if (status === 200) {
    res.status(status).send({
      message: message,
      data: data
    });
  } else if (status === 500) {
    res.status(status).send({
      message: message,
      data: data
    });
  }
}