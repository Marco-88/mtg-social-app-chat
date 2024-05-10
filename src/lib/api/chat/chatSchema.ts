import mongoose, { Schema } from "mongoose";

const chatSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 25
    },
    members: {
        type: Array,
        required: true,
        default: []
    },
}, {timestamps: true})

export const Chat = mongoose.models?.Chat || mongoose.model("Chat", chatSchema)