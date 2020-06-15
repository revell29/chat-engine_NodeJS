import Message from "../models/server/Message";
import { ResponseMessage } from "../../vendor/utils/server/functions/ErrorHandle";

class MessageController {
    static async getChat(req, res) {
        try {
            const { from, to } = req.body;
            const dataChat = await Message.find({ $or: [{ from: from }, { to: to }, { from: to }, { to: from }] });
            res.status(200).send({ message: "succes", data: dataChat });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    static async postMessage(req, res) {
        try {
            const { from, to, message, author, rid } = req.body;
            const files = req.file ? req.file.filename : null;

            const dataChat = new Message({
                from: from,
                message: message,
                to: to,
                author: author,
                rid: rid,
                files: files,
            });
            dataChat.save();
            res.status(200).send({ message: "success", data: dataChat });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default MessageController;
