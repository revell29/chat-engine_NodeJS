import express from "express";
import MessageController from "../app/controllers/MessageController";

const router = express.Router();

router.post("/", MessageController.postMessage);
router.post("/get_chat", MessageController.getChat);

export default router;
