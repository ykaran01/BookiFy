import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    username: {
        type: String,
    }
}, { timestamps: true })
export const reviewModel = mongoose.model("Review", reviewSchema)