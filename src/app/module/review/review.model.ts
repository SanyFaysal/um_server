import { Schema, model } from "mongoose";
import { IReview, ReviewModel } from "./review.interface";


const ReviewSchema = new Schema<IReview, ReviewModel>(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true
    }
);

export const Review = model<IReview, ReviewModel>('Review', ReviewSchema)