import User from "../../models/server/User";
import Bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "./config";
class AuthController {
    /**
     * Login User
     *
     * @param { Request, Response}
     * @return Response
     **/
    static async login(req, res) {
        try {
            const dataUser = await User.findOne({ username: req.body.username });
            if (!dataUser) {
                return res.status(401).send({ message: "The username does not exist", status: 401 });
            }
            if (!Bcrypt.compareSync(req.body.password, dataUser.password)) {
                return res.status(401).send({ message: "The password is invalid", status: 401 });
            }

            let token = jwt.sign({ username: req.body.username }, config.secret, {
                expiresIn: "24h", // expires in 24 hours
            });
            res.status(200).send({ message: "The username and password combination is correct!", token: token, data: dataUser, status: 200 });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }

    /**
     * Register User
     *
     * @param {Request, Response}
     * @return { Response }
     **/
    static async register(req, res) {
        try {
            console.log(req.body);
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            const dataUser = new User(req.body);
            const result = await dataUser.save();
            res.status(200).send({ message: "Register success", status: 200, data: result });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default AuthController;
