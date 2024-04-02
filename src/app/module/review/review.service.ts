import { Review } from "./review.model";
import { IReview } from "./review.interface";

const createReview = async (payload: IReview): Promise<IReview> => {
    const result = await Review.create(payload);
    return result;
}
const getAllReviews = async (): Promise<IReview[]> => {
    const result = await Review.find();
    return result
}


export const ReviewServices = {
    createReview,
    getAllReviews
}