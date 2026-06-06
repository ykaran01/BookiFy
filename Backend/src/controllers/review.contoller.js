// import { ApiError } from "../utilities/apiError.js"
// import Apiresponse from "../utilities/apiResponse.js"
// import { asyncHandeler } from "../utilities/asyncHandler.js"

// const reviewController = asyncHandeler(async(req,res)=>{
//     const {productId} = req.params
//     const {rating,comment} = req.body
//     const {_id} = req.user

//     const review = await reviewModel.create({
//         user:userId,
//         product:productId,
//         rating,
//         comment
//     })
//     if(!review){
//         throw new ApiError(402,'something wnet wrong')
//     }
//     res.json(
//         new  Apiresponse(201,review,'review is been created')
//     )
// })
// export {reviewController}

// const getProductReviews = asyncHandeler(async(req,res)=>{
//     const {productId} = req.params
//     const reviews = await reviewModel.find({product:productId}).populate('user','name')
//     if(!reviews){
//         throw new ApiError(404,'Reviews Not Found')
//     }   
//     res.json(
//         new Apiresponse(200,reviews,'Reviews fetched successfully')
//     )
// })

// const deleteReview = asyncHandeler(async(req,res)=>{
//     const {reviewId} = req.params
//     const review = await reviewModel.findByIdAndDelete(reviewId)
//     if(!review){
//         throw new ApiError(404,'Review Not Found')
//     }
//     res.json(
//         new Apiresponse(200,review,'Review deleted successfully')
//     )
// })

// export {getProductReviews,deleteReview}
