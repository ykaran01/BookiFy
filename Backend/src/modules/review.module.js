import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    username:{
        type:String,

    }
},{timestamps:true})
export default mongoose.model("Review", reviewSchema)