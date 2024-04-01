import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { ReviewServices } from "./review.service";
import sendResponse from "../../../utils/sendResponse";
import { IReview } from "./review.interface";
import httpStatus from "http-status";

const createReview = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await ReviewServices.createReview(data);

    return sendResponse<IReview>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Review created successful',
        data: result
    })
});


const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewServices.getAllReviews();
    return sendResponse<IReview[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reviews retrieve successful',
        data: result
    })
});



export const ReviewController = {
    createReview,
    getAllReviews
}