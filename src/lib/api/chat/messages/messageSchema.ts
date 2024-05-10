import mongoose, { Schema } from "mongoose";

const messageSchema: Schema = new Schema({
    chatId: {
        type: String,
        required: true
    },
    senderId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Message = mongoose.models?.Message || mongoose.model("Message", messageSchema)
