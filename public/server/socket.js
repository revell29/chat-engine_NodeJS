"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventIo = EventIo;

function EventIo(io) {
  // Rooms namespace
  io.on("connection", function (socket) {
    // Create a new room
    var token = socket.handshake.query.username;
    socket.on("join", function (rid) {
      socket.join(rid);
      console.log("joining room", rid);
    });
    socket.on("send message", function (data) {
      io.to(data.rid).emit("new message", data);
      console.log(data.rid);
      socket.on("received", function (data) {
        io.to(data.from).emit("received", data);
      });
    });
    socket.on("changeRoom", function (data) {
      socket.leave(data.rid);
      console.log("leave room");
    });
  });
}