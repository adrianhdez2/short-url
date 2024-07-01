import mongoose from "mongoose";
const { Schema } = mongoose

const shortUrlSchema = new Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

export const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema)