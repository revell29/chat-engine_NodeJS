import express from "express";
import http from "http";
import database from "../app/mongo/database";
import routes from "../routes";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import socketio from "socket.io";
import morgan from "morgan";
import { EventIo } from "../server/socket";
import { msg, ResponseLogger, Logger } from "./utils/server";
import boxen from "boxen";

class Server {
  constructor() {
    dotenv.config();
    this.startupMessage();
    this.application = express();
    this.port = process.env.PORT || 3005;
    this.server = http.createServer(this.application);
    this.mongodb();
    this.socket();
    this.plugin();
    this.routes();
  }

  startupMessage() {
    console.log(boxen(msg, { padding: 1 }));
  }

  plugin() {
    this.application.use(cors());
    this.application.use(bodyParser.urlencoded({ extended: true }));
    this.application.use(bodyParser.json());
    this.application.use(ResponseLogger);
    this.application.use(express.static("public"));
  }

  socket() {
    const io = socketio(this.server);
    io.set("transports", ["websocket"]);
    io.use((socket, next) => {
      let token = socket.handshake.query.username;
      if (token) {
        return next();
      }
      Logger.error(`Socket error`);
    });
    EventIo(io);
  }

  mongodb() {
    mongoose
      .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => Logger.log(`MongoDB connected`))
      .catch((err) => {
        Logger.error(err);
      });
  }

  routes() {
    this.application.use("/api", routes);
    this.application.use("/api*", (req, res, next) => {
      res.status(400).send({ message: "Ooops! not found." });
    });
  }

  run() {
    this.server.listen(this.port, () => {
      Logger.log(`Server running on port ${this.port} ⚡️`);
    });
  }
}

export default new Server();
