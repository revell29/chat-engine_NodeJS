import express from "express";
import message from "./message";
import users from "./users";
import auth from "./auth";
import room from "./room";

const app = express.Router();

app.use("/message", message);
app.use("/users", users);
app.use("/auth", auth);
app.use("/room", room);

export default app;
