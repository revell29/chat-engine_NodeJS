import express from "express";
import RoomController from "../app/controllers/RoomController";

const router = express.Router();

router.post("/", RoomController.createDirectMessage);
router.post("/list", RoomController.listConversation);
router.post("/data/:id", RoomController.get);

export default router;
