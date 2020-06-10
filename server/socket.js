export function EventIo(io) {
    // Rooms namespace
    io.on("connection", function (socket) {
        // Create a new room
        let token = socket.handshake.query.username;

        socket.on("join", (rid) => {
            socket.join(rid);
            console.log("joining room", rid);
        });

        socket.on("send message", (data) => {
            io.to(data.rid).emit("new message", data);
            console.log(data.rid);

            socket.on("received", (data) => {
                io.to(data.from).emit("received", data);
            });
        });

        socket.on("changeRoom", (data) => {
            socket.leave(data.rid);
            console.log("leave room");
        });
    });
}
