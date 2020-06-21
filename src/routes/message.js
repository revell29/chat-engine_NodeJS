import express from "express";
import MessageController from "../app/controllers/MessageController";
import multer from "multer";
import slugify from "slugify";
import * as path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/messages");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const router = express.Router();
const upload = multer({ storage: storage });

router.post("/", upload.single("files"), MessageController.postMessage);
router.post("/get_chat", MessageController.getChat);

export default router;
