import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
    },
    { strict: false }
);

const User = mongoose.model("users", userSchema);

export default User;
