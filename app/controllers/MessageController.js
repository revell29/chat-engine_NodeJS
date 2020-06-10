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
            console.log(req.body);
            const { from, to, message, author, rid } = req.body;
            const dataChat = new Message({ from: from, message: message, to: to, author: req.body.author, rid: req.body.rid });
            dataChat.save();
            ResponseMessage(200, res, "success", message);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default MessageController;
