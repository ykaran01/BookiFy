import { reviewModel } from "../modules/review.module.js";
import { ApiError } from "../utilities/apiError.js"
import Apiresponse from "../utilities/apiResponse.js"
import { asyncHandeler } from "../utilities/asyncHandler.js"
import { clerkClient, createClerkClient } from "@clerk/express";
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const reviewController = asyncHandeler(async (req, res) => {

    const { Id } = req.params;
    const { rating, comment } = req.body;


    const userId = req.user;

    if (!rating || !comment) {
        throw new ApiError(400, "Rating and comment fields are required.");
    }
    const clerkUser = await clerk.users.getUser(userId);
    const fallbackUsername = clerkUser.fullName || clerkUser.username || "Unknown User";


    const review = await reviewModel.create({
        user: userId,
        product: Id,
        rating: Number(rating),
        comment: comment.trim(),
        username: fallbackUsername
    });

    if (!review) {
        throw new ApiError(500, "Something went wrong while compiling the review document.");
    }


    return res.status(201).json(
        new Apiresponse(201, review, 'Review has been posted successfully!')
    );
});

export { reviewController };

const getProductReviews = asyncHandeler(async (req, res) => {
    const { productId } = req.params
   
    const reviews = await reviewModel.find({ product: productId }).select('-user -product')
     
    if (!reviews) {
        throw new ApiError(404, 'Reviews Not Found')
    }
    res.status(200).json(
        new Apiresponse(200, reviews, 'Reviews fetched successfully')
    )
})

const deleteReview = asyncHandeler(async (req, res) => {
    const { reviewId } = req.params
    const review = await reviewModel.findByIdAndDelete(reviewId)
    if (!review) {
        throw new ApiError(404, 'Review Not Found')
    }
    res.json(
        new Apiresponse(200, review, 'Review deleted successfully')
    )
})

export { getProductReviews, deleteReview }
