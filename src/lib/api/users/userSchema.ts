import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 50
    },
    password: {
        type: String,
        // required: true,
        // min: 6
    },
    image: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {timestamps: true})

export const User = mongoose.models?.User || mongoose.model("User", userSchema)