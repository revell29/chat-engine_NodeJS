import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const roomSchema = new schema(
    {
        participants: [{ type: Schema.Types.ObjectId, ref: "Users" }],
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { strict: false }
);

const Room = mongoose.model("rooms", roomSchema);

export default Room;
