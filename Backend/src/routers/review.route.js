
import { reviewController,getProductReviews, deleteReview} from "../controllers/review.contoller.js";
import { Router } from "express";
import { requireAuth } from "../middleware/Authentication.js";
const review = Router()

review.use(requireAuth)
review.post('/:Id',reviewController)
review.get('/getreview/:productId',getProductReviews)
review.delete('/deletereview/:reviewId', deleteReview)
export default review

