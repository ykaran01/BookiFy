import reviewModule from "../modules/review.module.js";
import { ApiError } from "../utilities/apiError.js"
import Apiresponse from "../utilities/apiResponse.js"
import { asyncHandeler } from "../utilities/asyncHandler.js"
import { clerkClient, createClerkClient } from "@clerk/express";
const reviewController = asyncHandeler(async(req,res)=>{
    
    const {Id} = req.params
    const {rating,comment} = req.body
    const userId = req.user
    const clerk = await createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
     const user = await clerk.users.getUser(req.user);
    const review = await reviewModel.create({
        user:userId,
        product:Id,
        rating,
        comment,
        username:user.fullName || "Unknown"
    })
    if(!review){
        throw new ApiError(402,'something wnet wrong')
    }
    res.json(
        new  Apiresponse(201,review,'review is been created')
    )
})
export {reviewController}

const getProductReviews = asyncHandeler(async(req,res)=>{
    const {productId} = req.params
    const reviews = await reviewModel.find({product:productId}).select("-user")  || []
    if(!reviews){
        throw new ApiError(404,'Reviews Not Found')
    }   
    res.json(
        new Apiresponse(200,reviews,'Reviews fetched successfully')
    )
})

const deleteReview = asyncHandeler(async(req,res)=>{
    const {reviewId} = req.params
    const review = await reviewModel.findByIdAndDelete(reviewId)
    if(!review){
        throw new ApiError(404,'Review Not Found')
    }
    res.json(
        new Apiresponse(200,review,'Review deleted successfully')
    )
})

export {getProductReviews,deleteReview}
