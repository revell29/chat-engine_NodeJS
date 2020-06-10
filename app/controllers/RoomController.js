import Room from "../models/server/Room";
import User from "../models/server/User";
import Message from "../models/server/Message";

class RoomController {
    static async listConversation(req, res) {
        Room.find({ participants: { $in: [req.body.authUser] } })
            .select("_id, participants")
            .exec((err, conversations) => {
                if (err) {
                    res.send({ error: err });
                    return next(err);
                }

                return res.status(200).json(conversations);
            });
    }

    static async createDirectMessage(req, res, next) {
        try {
            Room.findOne({ participants: { $all: [req.body.from, req.body.to] } }, (err, existConversation) => {
                if (err) {
                    console.log(err);
                }

                if (existConversation) {
                    Message.find({ rid: existConversation._id }).then((messages) => {
                        const data = existConversation.toJSON();
                        data.messages = messages;
                        return res.status(200).json(data);
                    });
                } else {
                    const conversation = new Room({
                        rid: `${req.body.from}${req.body.to}`,
                        participants: [req.body.from, req.body.to],
                    });

                    conversation.save((err, newConversation) => {
                        if (err) {
                            res.send({ error: err });
                            return next(err);
                        }

                        newConversation.messages = [];

                        return res.status(200).json(newConversation);
                    });
                }
            });
        } catch (error) {
            res.send({ message: error.message });
        }
    }

    /**
     * Get conversation
     *
     */
    static async get(req, res, id) {
        try {
            Room.findOne({
                rid: req.params.id,
                participants: {
                    $in: [req.body.from],
                },
            }).then((conversation) => {
                if (conversation) {
                    Message.find({ rid: conversation.rid }).then((messages) => {
                        return res.status(200).send({ message: "success", data: messages });
                    });
                }
            });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
}

export default RoomController;
