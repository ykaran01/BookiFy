import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
})
export const categoryModule = mongoose.model("Category", categorySchema)
