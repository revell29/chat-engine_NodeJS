import User from "../models/server/User";
import bcrypt from "bcrypt";
import { ResponseMessage } from "../../vendor/utils/server/functions/ErrorHandle";

class UserController {
    static async getUser(req, res) {
        try {
            const username = req.params.username;
            const dataChat = await User.find({ username: { $ne: username } });
            res.send({ message: "success", data: dataChat });
        } catch (error) {
            res.send({ message: error.message });
        }
    }
}

export default UserController;
