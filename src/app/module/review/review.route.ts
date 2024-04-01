import express from 'express';
import { ReviewController } from './review.controller';


const router = express.Router();

router.route('/')
    .post(ReviewController.createReview)
    .get(ReviewController.getAllReviews);

export const ReviewRoutes = router;