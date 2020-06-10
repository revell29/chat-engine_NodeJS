import express from "express";
import http from "http";
import database from "../app/mongo";
import routes from "../routes";
import "dotenv/config";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import socketio from "socket.io";
import { EventIo } from "./socket";
import { msg, SystemLogger } from "../vendor/utils/server";

function ServerStartup() {
    const app = express();
    const PORT = process.env.SERVER_PORT || 3000;
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api", routes);
    const server = http.createServer(app);
    const io = socketio(server);

    // io.set("transports", ["websocket"]);
    io.use((socket, next) => {
        let token = socket.handshake.query.username;
        if (token) {
            return next();
        }
        console.log("error");
    });

    EventIo(io);
    let subPrefix = "➔";

    mongoose
        .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(subPrefix, `MongoDB connected`))
        .catch((err) => {
            SystemLogger._logs(msg, "SERVER ERROR");
        });

    server.listen(PORT, () => {
        SystemLogger._logs(msg, "SERVER RUNNING");
    });

    return server;
}

export default ServerStartup;
