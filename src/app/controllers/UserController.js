import User from "../models/server/User";
import Message from "../models/server/Message";
import bcrypt from "bcrypt";
import { ResponseMessage } from "../../vendor/utils/server/functions/ErrorHandle";

class UserController {
  static async getUser(req, res) {
    try {
      const page = req.query.page || 1;
      const per_page = req.query.per_page || 20;
      const username = req.params.username;
      const query = { username: { $ne: username } };
      console.log(page);
      User.find(query)
        .populate("messeges")
        .skip(page * per_page - per_page)
        .limit(per_page)
        .exec(async (err, data) => {
          const count = await User.find(query).count();
          const messages = await Message.find({
            to: { $ne: data.to },
          }).sort({ createdAt: -1 });
          console.log(messages);
          res.send({
            message: "success",
            data: {
              data: data,
              per_page: per_page,
              page: page,
              total_item: count,
              total_page: count / per_page,
            },
          });
        });
    } catch (error) {
      res.send({ message: error.message });
    }
  }
}

export default UserController;
