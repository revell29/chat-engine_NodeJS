import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const messageSchema = new schema(
    {
        message: {
            type: String,
            required: true,
        },
        from: String,
        to: String,
        rid: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { strict: false }
);

const Message = mongoose.model("messages", messageSchema);

export default Message;
